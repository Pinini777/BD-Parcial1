'use strict';

/* ═══════════════════════════════════════════════
   CATALOGO — IDs definidos en db.js
═══════════════════════════════════════════════ */
const EXAMS_CATALOG = ['parcial-3k9', 'parcial-1-2', 'parcial-1-3', 'parcial-1-4', 'parcial-1-5', 'parcial-1-6', 'parcial-1-7'];

/* Paleta de colores — uno por parcial, estilo neo-brutalista */
const EXAM_COLORS = [
  '#1B4FFF', // 3K9   — azul clásico
  '#E63946', // 1.2   — rojo intenso
  '#2DC653', // 1.3   — verde
  '#FF7C00', // 1.4   — naranja
  '#7B2FBE', // 1.5   — púrpura
  '#0096C7', // 1.6   — celeste
  '#F4A261', // 1.7   — sándalos/arena
];

/* ═══════════════════════════════════════════════
   SVG ICONS — sin emojis
═══════════════════════════════════════════════ */
const SVG = {
  check: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 9l4.5 4.5L15 5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  cross: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,
  trophy: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <path d="M18 8h20v18a10 10 0 01-20 0V8z" stroke="#1B4FFF" stroke-width="3" fill="#e8eeff"/>
    <path d="M8 10h10v10A10 10 0 018 10z" stroke="#1B4FFF" stroke-width="2.5" fill="none"/>
    <path d="M48 10H38v10a10 10 0 0010-10z" stroke="#1B4FFF" stroke-width="2.5" fill="none"/>
    <rect x="22" y="36" width="12" height="4" rx="1" fill="#1B4FFF"/>
    <rect x="16" y="40" width="24" height="4" rx="1" fill="#1B4FFF"/>
  </svg>`,
  target: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <circle cx="28" cy="28" r="22" stroke="#1B4FFF" stroke-width="3" fill="#e8eeff"/>
    <circle cx="28" cy="28" r="14" stroke="#1B4FFF" stroke-width="2.5" fill="none"/>
    <circle cx="28" cy="28" r="6" fill="#1B4FFF"/>
  </svg>`,
  clock: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <circle cx="28" cy="28" r="22" stroke="#FF3B30" stroke-width="3" fill="#ffe8e6"/>
    <path d="M28 16v12l8 6" stroke="#FF3B30" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,
  warn: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <path d="M28 8L50 46H6L28 8z" stroke="#ffb300" stroke-width="3" fill="#fff8e1"/>
    <rect x="26" y="22" width="4" height="12" rx="2" fill="#ffb300"/>
    <circle cx="28" cy="38" r="2.5" fill="#ffb300"/>
  </svg>`,
};

/* ═══════════════════════════════════════════════
   UTILIDADES
═══════════════════════════════════════════════ */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const $  = id => document.getElementById(id);
const pad = n => String(n).padStart(2, '0');

/* Manejo de display — inline styles para ser infalible frente al CSS */
function showView(id) {
  ['view-home', 'view-quiz', 'view-results'].forEach(v => {
    const el = $(v);
    if (el) el.style.display = 'none';
  });
  const target = $(id);
  if (target) target.style.display = 'block';
  window.scrollTo(0, 0);
}

/* ═══════════════════════════════════════════════
   ESTADO GLOBAL
═══════════════════════════════════════════════ */
const state = {
  exams:            [],
  currentExamIndex: null,
  shuffledQs:       [],
  currentQ:         0,
  score:            0,
  useTimer:         false,
  timerInterval:    null,
  timerSeconds:     600,
  pendingExamIdx:   null,
  answers:          [],   // [{ answered, correct, selectedIdx }]
};

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
function init() {
  // Mostrar home con inline style (primer render)
  showView('view-home');

  state.exams = EXAMS_CATALOG.map(id => EXAMS_DB[id]).filter(Boolean);

  if (!state.exams.length) {
    console.error('[Quiz] No se encontraron exámenes en EXAMS_DB.');
    return;
  }

  renderHome();
  wireButtons();
}

function wireButtons() {
  $('btn-home').addEventListener('click', goHome);
  $('btn-next').addEventListener('click', nextQuestion);
  $('btn-finish').addEventListener('click', finishQuiz);
  $('btn-retry').addEventListener('click', retryQuiz);
  $('btn-home-result').addEventListener('click', goHome);
  $('btn-timer-yes').addEventListener('click', () => startWithTimer(true));
  $('btn-timer-no').addEventListener('click',  () => startWithTimer(false));
}

/* ═══════════════════════════════════════════════
   HOME
═══════════════════════════════════════════════ */
function renderHome() {
  const grid = $('exams-grid');
  grid.innerHTML = '';

  state.exams.forEach((exam, idx) => {
    const hasImg = exam.questions.some(q => q.imageId);
    const hasSel = exam.questions.some(q => q.type === 'select');
    const hasTF  = exam.questions.some(q => q.type === 'truefalse');

    const tags = [
      `<span class="exam-tag">${exam.questions.length} preguntas</span>`,
      hasImg ? `<span class="exam-tag tag-img">Imagenes</span>` : '',
      hasSel ? `<span class="exam-tag tag-select">Desplegable</span>` : '',
      hasTF  ? `<span class="exam-tag">V / F</span>` : '',
    ].join('');

    const color = EXAM_COLORS[idx % EXAM_COLORS.length];
    const card = document.createElement('div');
    card.className = 'exam-card';
    card.style.setProperty('--card-accent', color);
    card.innerHTML = `
      <div class="exam-card-number">${pad(idx + 1)}</div>
      <div class="exam-card-title">${exam.label}</div>
      <p style="font-size:.82rem;color:#555;line-height:1.4">${exam.description}</p>
      <div class="exam-card-meta">${tags}</div>`;
    card.addEventListener('click', () => openTimerModal(idx));
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════
   MODAL TIMER
═══════════════════════════════════════════════ */
function openTimerModal(idx) {
  state.pendingExamIdx = idx;
  $('modal-timer').style.display = 'flex';
}

function startWithTimer(useTimer) {
  $('modal-timer').style.display = 'none';
  state.useTimer = useTimer;
  loadExam(state.pendingExamIdx);
}

/* ═══════════════════════════════════════════════
   LOAD & START
═══════════════════════════════════════════════ */
function loadExam(idx) {
  state.currentExamIndex = idx;
  state.shuffledQs = shuffle(state.exams[idx].questions).map(q => ({
    ...q,
    options: q.type !== 'select' ? shuffle(q.options) : q.options,
  }));
  state.currentQ  = 0;
  state.score     = 0;
  state.answers   = state.shuffledQs.map(() => ({ answered: false, correct: false, selectedIdx: -1 }));

  clearInterval(state.timerInterval);
  state.timerSeconds = 600;

  $('quiz-name').textContent = state.exams[idx].label;

  // Aplicar color del parcial al topbar
  const examColor = EXAM_COLORS[idx % EXAM_COLORS.length];
  document.querySelector('.quiz-topbar').style.setProperty('--exam-color', examColor);

  updateScore();
  showView('view-quiz');

  if (state.useTimer) {
    $('timer-wrapper').style.display = 'flex';
    updateTimerDisplay();
    state.timerInterval = setInterval(tickTimer, 1000);
  } else {
    $('timer-wrapper').style.display = 'none';
  }

  renderNavigator();
  renderQuestion();
}

/* ═══════════════════════════════════════════════
   TIMER
═══════════════════════════════════════════════ */
function tickTimer() {
  state.timerSeconds--;
  updateTimerDisplay();
  if (state.timerSeconds <= 0) {
    clearInterval(state.timerInterval);
    finishQuiz(true);
  }
}

function updateTimerDisplay() {
  const m  = Math.floor(state.timerSeconds / 60);
  const s  = state.timerSeconds % 60;
  const el = $('timer-display');
  el.textContent = `${pad(m)}:${pad(s)}`;
  el.className   = 'timer-badge' + (state.timerSeconds <= 120 ? ' urgent' : '');
}

/* ═══════════════════════════════════════════════
   NAVIGATOR PILLS
═══════════════════════════════════════════════ */
function renderNavigator() {
  const nav = $('quiz-navigator');
  nav.innerHTML = '';
  state.shuffledQs.forEach((_, idx) => {
    const ans      = state.answers[idx];
    const isCurrent = idx === state.currentQ;

    const pill = document.createElement('div');
    pill.className = 'nav-pill';
    if (isCurrent)    pill.classList.add('current');
    if (ans.answered) pill.classList.add('answered', ans.correct ? 'pill-correct' : 'pill-incorrect');
    pill.textContent = idx + 1;
    pill.title = `Pregunta ${idx + 1}`;

    if (ans.answered && !isCurrent) {
      pill.addEventListener('click', () => { state.currentQ = idx; renderQuestion(); });
    }
    nav.appendChild(pill);
  });
}

/* ═══════════════════════════════════════════════
   RENDER QUESTION
═══════════════════════════════════════════════ */
function renderQuestion() {
  const q     = state.shuffledQs[state.currentQ];
  const total = state.shuffledQs.length;
  const ans   = state.answers[state.currentQ];

  $('progress-bar').style.width  = `${Math.round((state.currentQ / total) * 100)}%`;
  $('progress-label').textContent = `${state.currentQ + 1} / ${total}`;
  $('question-number').textContent = `Pregunta ${pad(state.currentQ + 1)}`;
  $('question-text').textContent   = q.text;

  // Imagen
  const imgWrapper = $('question-image-wrapper');
  imgWrapper.innerHTML = '';
  if (q.imageId) {
    const img = document.createElement('img');
    img.className = 'question-image';
    img.alt = `Diagrama MER ${q.imageId}`;
    img.onerror = () => {
      imgWrapper.innerHTML = `<div class="img-missing">
        <strong>Imagen ${q.imageId} no disponible</strong><br>
        <span>Consulta el PDF original para ver el diagrama.</span>
      </div>`;
    };
    img.src = `images/${q.imageId}.PNG`;
    imgWrapper.appendChild(img);
    imgWrapper.style.display = 'block';
  } else {
    imgWrapper.style.display = 'none';
  }

  // Reset contenedores
  $('options-container').innerHTML = '';
  $('options-container').style.display = 'flex';
  $('select-container').innerHTML  = '';
  $('select-container').style.display = 'none';

  const fb = $('feedback-banner');
  fb.style.display = 'none';
  fb.className = 'feedback-banner';
  fb.innerHTML = '';

  $('btn-next').style.display   = 'none';
  $('btn-finish').style.display = 'none';

  if (q.type === 'select') renderSelectQ(q);
  else                      renderMultipleQ(q);

  if (ans.answered) restoreAnswered(q, ans);

  renderNavigator();

  const card = $('question-card');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = 'slideIn .25s ease'; });
}

/* ═══════════════════════════════════════════════
   MULTIPLE CHOICE
═══════════════════════════════════════════════ */
function renderMultipleQ(q) {
  const c = $('options-container');
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `opt-${idx}`;
    btn.innerHTML = `<span class="option-letter">${opt.key.charAt(0).toUpperCase()}</span><span class="option-text">${opt.label}</span>`;
    btn.addEventListener('click', () => handleMultiple(q, opt, idx));
    c.appendChild(btn);
  });
}

function handleMultiple(q, selectedOpt, selectedIdx) {
  if (state.answers[state.currentQ].answered) return;

  const buttons    = document.querySelectorAll('.option-btn');
  const correctKey = q.correct.toLowerCase().trim();
  const isCorrect  = selectedOpt.key.toLowerCase() === correctKey ||
                     selectedOpt.label.toLowerCase() === correctKey;

  buttons.forEach(b => b.disabled = true);
  document.getElementById(`opt-${selectedIdx}`).classList.add(isCorrect ? 'correct' : 'incorrect');

  if (!isCorrect) {
    buttons.forEach((btn, idx) => {
      const opt = q.options[idx];
      if (opt.key.toLowerCase() === correctKey || opt.label.toLowerCase() === correctKey)
        btn.classList.add('correct');
    });
  }

  state.answers[state.currentQ] = { answered: true, correct: isCorrect, selectedIdx };
  if (isCorrect) state.score++;
  updateScore();
  showFeedback(isCorrect, q);
  showNextBtn();
  renderNavigator();
}

/* ═══════════════════════════════════════════════
   SELECT
═══════════════════════════════════════════════ */
function renderSelectQ(q) {
  $('options-container').style.display = 'none';
  const c = $('select-container');
  c.style.display = 'flex';

  if (!q.options?.length) {
    c.innerHTML = '<p style="color:#999">Sin opciones disponibles para esta pregunta.</p>';
    showNextBtn();
    return;
  }

  const allAnswers = shuffle([...new Set(q.options.map(p => p.answer))]);
  q.options.forEach((pair, idx) => {
    const row = document.createElement('div');
    row.className = 'select-row';

    const lbl = document.createElement('label');
    lbl.htmlFor = `sel-${idx}`;
    lbl.textContent = pair.stem;

    const sel = document.createElement('select');
    sel.className = 'select-dropdown';
    sel.id = `sel-${idx}`;
    sel.dataset.correct = pair.answer;

    const def = document.createElement('option');
    def.value = ''; def.textContent = '— elegí —';
    sel.appendChild(def);

    allAnswers.forEach(a => {
      const op = document.createElement('option');
      op.value = a; op.textContent = a;
      sel.appendChild(op);
    });

    row.appendChild(lbl);
    row.appendChild(sel);
    c.appendChild(row);
  });

  const checkBtn = document.createElement('button');
  checkBtn.className = 'select-btn-check';
  checkBtn.textContent = 'Verificar';
  checkBtn.addEventListener('click', () => handleSelect(q, checkBtn));
  c.appendChild(checkBtn);
}

function handleSelect(q, checkBtn) {
  if (state.answers[state.currentQ].answered) return;
  const selects = $('select-container').querySelectorAll('.select-dropdown');
  if ([...selects].some(s => !s.value)) {
    showFeedbackRaw('Completa todos los campos antes de verificar.', false, true);
    return;
  }

  checkBtn.disabled = true;
  selects.forEach(s => s.disabled = true);

  let correct = 0;
  selects.forEach(s => {
    const ok = s.value.toLowerCase().trim() === s.dataset.correct.toLowerCase().trim();
    s.style.borderColor = ok ? 'var(--green)' : 'var(--red)';
    s.style.background  = ok ? 'var(--green-light)' : 'var(--red-light)';
    if (ok) correct++;
  });

  const isCorrect = correct === selects.length;
  state.answers[state.currentQ] = { answered: true, correct: isCorrect, selectedIdx: -1 };
  if (isCorrect) state.score++;
  updateScore();
  showFeedbackRaw(
    isCorrect ? 'Correcto. Todos los blancos correctos.' : `Incorrecto. Acertaste ${correct} de ${selects.length}.`,
    isCorrect
  );
  showNextBtn();
  renderNavigator();
}

/* ═══════════════════════════════════════════════
   RESTAURAR PREGUNTA YA RESPONDIDA
═══════════════════════════════════════════════ */
function restoreAnswered(q, ans) {
  if (q.type === 'select') {
    $('select-container').querySelectorAll('select, button').forEach(el => el.disabled = true);
    showFeedbackRaw(ans.correct ? 'Correcto.' : 'Incorrecto.', ans.correct);
  } else {
    const buttons    = document.querySelectorAll('.option-btn');
    const correctKey = q.correct.toLowerCase().trim();
    buttons.forEach(b => b.disabled = true);
    buttons.forEach((btn, idx) => {
      const opt = q.options[idx];
      const isCorrOpt = opt.key.toLowerCase() === correctKey || opt.label.toLowerCase() === correctKey;
      if (idx === ans.selectedIdx) btn.classList.add(ans.correct ? 'correct' : 'incorrect');
      if (isCorrOpt && !ans.correct) btn.classList.add('correct');
    });
    showFeedback(ans.correct, q);
  }
  showNextBtn();
}

/* ═══════════════════════════════════════════════
   FEEDBACK CON SVG
═══════════════════════════════════════════════ */
function showFeedback(isCorrect, q) {
  const label = isCorrect
    ? 'Correcto.'
    : `Incorrecto. La respuesta era: "${q.correct.toUpperCase()}"`;
  const extra = q.feedback ? ` / ${q.feedback}` : '';
  showFeedbackRaw(label + extra, isCorrect);
}

function showFeedbackRaw(msg, isCorrect, isWarn = false) {
  const fb = $('feedback-banner');
  fb.className = 'feedback-banner';

  if (isWarn) {
    fb.innerHTML = `<span class="fb-icon">${SVG.warn.replace('56', '20').replace('56', '20')}</span> ${msg}`;
    fb.style.background  = '#fff8e1';
    fb.style.borderColor = '#ffb300';
    fb.style.color       = '#5d4037';
  } else {
    const icon = isCorrect ? SVG.check : SVG.cross;
    fb.innerHTML = `<span class="fb-icon">${icon}</span> ${msg}`;
    fb.classList.add(isCorrect ? 'correct-fb' : 'incorrect-fb');
    fb.style.background  = '';
    fb.style.borderColor = '';
    fb.style.color       = '';
  }
  fb.style.display = 'flex';
}

/* ═══════════════════════════════════════════════
   NAVEGACION
═══════════════════════════════════════════════ */
function showNextBtn() {
  const isLast = state.currentQ >= state.shuffledQs.length - 1;
  $('btn-next').style.display   = isLast ? 'none' : 'inline-flex';
  $('btn-finish').style.display = isLast ? 'inline-flex' : 'none';
}

function nextQuestion() {
  if (state.currentQ + 1 < state.shuffledQs.length) {
    state.currentQ++;
    renderQuestion();
  }
}

function updateScore() {
  const total = state.shuffledQs.length || 0;
  $('score-display').textContent = `${state.score} / ${total}`;
}

/* ═══════════════════════════════════════════════
   RESULTADOS
═══════════════════════════════════════════════ */
function finishQuiz(arg) {
  try {
    const timeout = (arg === true);
    clearInterval(state.timerInterval);

    const total = state.shuffledQs.length;
    const pct   = total ? Math.round((state.score / total) * 100) : 0;

    // Icono SVG segun resultado
    let icon = SVG.warn;
    if (timeout)      icon = SVG.clock;
    else if (pct >= 70) icon = SVG.trophy;
    else if (pct >= 40) icon = SVG.target;

    $('result-icon').innerHTML  = icon;
    $('result-title').textContent = timeout ? 'Se acabo el tiempo' : 'Resultado Final';
    $('result-score-big').textContent = `${state.score} / ${total}`;
    $('result-percent').textContent   = `${pct}% de respuestas correctas`;

    const exam = state.exams[state.currentExamIndex];
    $('result-breakdown').innerHTML = `
      <strong>Parcial:</strong> ${exam ? exam.label : '—'}<br>
      <strong>Correctas:</strong> ${state.score}<br>
      <strong>Incorrectas:</strong> ${total - state.score}<br>
      <strong>Nota estimada:</strong> ${(pct / 10).toFixed(1)} / 10
    `;

    showView('view-results');
  } catch (err) {
    console.error('[finishQuiz] Error:', err);
    alert('Error al mostrar resultados. Revisa la consola (F12).');
  }
}

function retryQuiz() { loadExam(state.currentExamIndex); }

function goHome() {
  clearInterval(state.timerInterval);
  showView('view-home');
}

/* ═══════════════════════════════════════════════
   BOOTSTRAP
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', init);

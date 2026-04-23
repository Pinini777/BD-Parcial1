# Cuestionarios Interactivos - Base de Datos 2

Plataforma Single Page Application (SPA) para repasar los cuestionarios del primer parcial de la materia Base de Datos 2 (UTN).

## Arquitectura

El proyecto es una aplicación Vanilla JS sin dependencias externas ni frameworks, diseñada bajo un estilo visual Neo-Brutalista ("Whiteboard"). Toda la lógica se maneja de forma local.

La información de los exámenes (preguntas, opciones, imágenes asociadas) se centraliza en `db.js`. El renderizado dinámico, la navegación y el sistema de evaluación (estado global) residen en `app.js`.

### Tipos de Preguntas

El motor de evaluación soporta tres estructuras dinámicas basadas en los exámenes originales:

1. **Multiple Choice**: Selección única tradicional.
2. **True/False**: Validación binaria.
3. **Select (Desplegable)**: Enunciados con múltiples campos de respuesta por completar.

## Características

* Navegación fluida (SPA).
* Sistema de progreso ("pills" de navegación) que permite saltar entre preguntas y revisar el estado visual de las respuestas.
* Cronómetro opcional de 15 minutos para simular condiciones de examen.
* Reporte final detallado con desglose por pregunta, mostrando visualmente las opciones elegidas versus las correctas.
* Diseño totalmente responsive y estilizado en alto contraste.

## Ejecución Local

Dado que la aplicación realiza importación local de módulos y recursos, debe ejecutarse levantando un servidor local para evitar bloqueos de CORS.

Desde la raíz del proyecto, utilizar Python (disponible en la mayoría de los sistemas):

```bash
python -m http.server 8787
```

Luego, acceder desde el navegador a `http://localhost:8787`.

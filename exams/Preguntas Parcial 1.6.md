# Preguntas Parcial 1.6 — Solo preguntas únicas

<!-- Eliminadas 30 preguntas que se repiten en los parciales 1.2, 1.3, 1.4, 1.5 y 1.7:
     Q1, Q2, Q4, Q8, Q11, Q12, Q14, Q15, Q16, Q19, Q20, Q21, Q24, Q25, Q26,
     Q27, Q28, Q30, Q31, Q32, Q33, Q35, Q36, Q44, Q45, Q46
     + Q34 duplicado interno de Q23
     + Q10 (atributos generan tablas [4], presente en 1.2/1.5)
     Total eliminadas: 30 preguntas. Quedan 16 únicas.
-->

## **Pregunta 1** (ex Q5)

En el modelo relacional correspondiente al siguiente MER, se generan dos claves foráneas en una tabla proveniente de la relación "actuación":

[4]

Seleccione una:

* Verdadero
* Falso

- Respuesta Correcta: Verdadero

## **Pregunta 2** (ex Q6 / Q23 / Q34)

En el siguiente MER:

[4]

indicar cuáles de los siguientes atributos pueden ser multivaluados:

Seleccione una:

a. inicio

b. direccion

c. habs

d. direct

e. tfno

- Respuesta Correcta: e

## **Pregunta 3** (ex Q7 / Q17 / Q25 / Q32)

Observe el siguiente gráfico E/R. A continuación indique cuál es la descripción correcta del mismo:

[4]

Seleccione una:

a. Todas incompletas

b. Una ONG desea elaborar una base de datos para llevar el seguimiento de todos sus proyectos. La ONG tiene diversas sedes en varios países que se encargan de gestionar y coordinar los proyectos en ese país, cada uno de los cuales puede afectar a una o varias poblaciones. Sobre la Población se desea mantener un nombre, identificador para poder diferenciarla, país y cantidad de habitantes. Cada sede gestiona un conjunto de proyectos, con un código, un título, fechas de inicio y finalización, el presupuesto asignado y el nombre del responsable. De cada proyecto es necesario conocer qué actuaciones se realizan en cada población, almacenando el nombre, país y nº de habitantes y un identificador para diferenciarlas. Además se desea la inversión del proyecto que corresponde a la población y una pequeña descripción de la actuación.

c. Ninguna

d. Una ONG desea elaborar una base de datos para llevar el seguimiento de todos sus proyectos. La ONG tiene diversas sedes en un países que se encargan de gestionar y coordinar los proyectos en ese país, cada uno de los cuales puede afectar a una o varias Sedes. Sobre la sedes se desea mantener un identificador, la ciudad y país en el que se encuentra, junto con su dirección, un teléfono de contacto y el nombre del director. Cada sede gestiona un conjunto de proyectos, con un código, un título, fechas de inicio y finalización, el presupuesto asignado y el nombre del responsable. De cada proyecto es necesario conocer qué actuaciones se realizan en cada población, almacenando el nombre, país y nº de habitantes y un identificador para diferenciarlas. Además se desea la inversión del proyecto que corresponde a la población y una pequeña descripción de la actuación.

e. Una ONG desea elaborar una base de datos para llevar el seguimiento de todos sus proyectos. La ONG tiene diversas sedes en varios países que se encargan de gestionar y coordinar los proyectos en ese país, cada proyecto puede afectar a una o varias poblaciones. Sobre la sedes se desea mantener un identificador, la ciudad y país en el que se encuentra, junto con su dirección, un teléfono de contacto y el nombre del director. Cada sede gestiona un conjunto de proyectos, con un código, un título, fechas de inicio y finalización, el presupuesto asignado y el nombre del responsable. De cada proyecto es necesario conocer qué actuaciones se realizan en cada población, de las cuales se almacena el nombre, país y nº de habitantes y un identificador para diferenciarlas. Además se desea la inversión del proyecto que corresponde a la población y una pequeña descripción de la actuación.

- Respuesta Correcta: e

## **Pregunta 4** (ex Q9 — versión con Profesor 1:N, marcada incorrecta)

[select]

Determinar la categoría de las siguientes relaciones binarias (1:1, 1:N, N:M):

Manager representa Jugador de Fútbol: 1:N

Profesor dicta Materia: N:M

Persona apuesta a número de quiniela: N:M

Hombre está casado con Mujer, en una sociedad monogámica: 1:1

- Respuesta Correcta: 1:N / N:M / N:M / 1:1

## **Pregunta 5** (ex Q13 / Q22)

En el siguiente MER:

[4]

indicar la cantidad de claves foráneas al pasarlo al Modelo Relacional:

Seleccione una:

a. 2

b. 4

c. ninguna

d. 1

e. 3

- Respuesta Correcta: e

## **Pregunta 6** (ex Q18 — select motor: SGBD / Oracle)

[select]

Un motor de base de datos es un: SGBD

Un ejemplo del mismo puede ser: Oracle

Cuando el motor está instalado y funcionando, normalmente inicia un: servicio propio del motor

- Respuesta Correcta: SGBD / Oracle / servicio propio del motor

## **Pregunta 7** (ex Q29 / Q43 — select motor con respuestas variantes)

[select]

Un motor de base de datos es un: DBMS

Un ejemplo del mismo puede ser: DB2

Cuando el motor está instalado y funcionando, normalmente inicia un: servicio propio del motor

- Respuesta Correcta: DBMS / DB2 / servicio propio del motor

## **Pregunta 8** (ex Q3 / Q27 / Q28 — tablas totales MER [4])

Observe el siguiente gráfico MER:

[4]

Indique cuántas tablas se generan al pasarlo al modelo relacional:

Seleccione una:

a. 3

b. Más de 5

c. 2

d. 5

e. 4

- Respuesta Correcta: e

## **Pregunta 9** (ex Q37 — tablas totales MER [5])

Observe el siguiente gráfico E/R:

[5]

Indique cuántas tablas se generan al pasarlo al modelo relacional:

Seleccione una:

a. Más de 5

b. 3

c. 4

d. 2

e. 5

- Respuesta Correcta: c

## **Pregunta 10** (ex Q38 — atributos generan tablas [5])

Observe el siguiente gráfico E/R:

[5]

Indique cuántas tablas generan los atributos al pasarlo al modelo relacional:

Seleccione una:

a. 1

b. 2

c. 4

d. 3

e. Ninguna

f. 1 tabla por cada atributo

- Respuesta Correcta: e

## **Pregunta 11** (ex Q39 — clientes por vehículo [5])

En el siguiente MER:

[5]

La cantidad de clientes que puede tener cada vehículo puede ser mayor a 1:

Seleccione una:

* Verdadero
* Falso

- Respuesta Correcta: Verdadero

## **Pregunta 12** (ex Q40 — relaciones generan tablas [5])

Al pasar el siguiente MER al Modelo relacional:

[5]

¿Cuántas tablas generan las relaciones?

Seleccione una:

a. 1

b. ninguna en este ejemplo

c. 2

d. Las relaciones nunca generan tablas

- Respuesta Correcta: a

## **Pregunta 13** (ex Q41 — atributos en tabla vehiculo [5])

Al pasar el siguiente MER al Modelo relacional:

[5]

¿Cuántos atributos quedarán en la tabla vehiculo?

Seleccione una:

a. 9

b. 10

c. 8

d. 7

- Respuesta Correcta: a

## **Pregunta 14** (ex Q42 — atributos derivados [5])

En el siguiente MER:

[5]

indicar cuál de los siguientes atributos puede ser derivado:

Seleccione una:

a. tfno

b. seguro

c. direccion

d. edad

e. plazas

- Respuesta Correcta: d

## **Pregunta 15** (ex Q43 — select motor: DBMS/DB2/sysdba — respuesta 3ra incorrecta)

[select]

Un motor de base de datos es un: DBMS

Un ejemplo del mismo puede ser: DB2

Cuando el motor está instalado y funcionando, normalmente inicia un: servicio propio del motor

- Respuesta Correcta: DBMS / DB2 / servicio propio del motor

<!-- NOTA: En el examen original, el alumno respondio "sysdba" en el tercer blanco, lo cual fue incorrecto.
     La respuesta correcta es "servicio propio del motor". Esta pregunta es casi identica a Q7,
     pero se conserva por ser una variante de opciones de respuesta en el select. -->

## **Pregunta 16** (ex Q46 — descripcion empresa alquiler [5], variante distinta a 1.5)

Observe el siguiente gráfico. A continuación indique cuál es la descripción completa del mismo:

[5]

Seleccione una:

a. Una empresa de alquiler de vehículos desea conocer en todo momento el estado de su flota. La empresa tiene diversas oficinas repartidas por todo el territorio argentino. Cada oficina se identifica por un código único y se caracteriza por la ciudad en la que se encuentra y su dirección completa (calle, número y código postal) y teléfono. En cada oficina hay disponible un conjunto de coches, de los cuales se conoce su patente, el grupo al que pertenece: A, B, C, D, E, F o G (depende del tipo y tamaño del vehículo), la marca, el modelo, el color de puertas, el número de plazas, la capacidad del maletero y la edad mínima exigida para el alquiler. Los clientes pueden alquilar el vehiculo en sólo una oficina. Para llevar el control del estado de cada vehículo, la empresa mantiene un registro de todos los alquileres que ha sufrido, indicando para cada uno de ellos el nombre del conductor, su DNI, su dirección, un teléfono de contacto y un número de tarjeta de crédito sobre la que realizar los cargos correspondientes. Además de esta información de los clientes, para cada alquiler se almacena su duración (en días), el tipo de seguro contratado y el precio total.

b. Todas incompletas

c. Una empresa de alquiler de vehículos desea conocer en todo momento el estado de su flota. La empresa tiene diversas oficinas repartidas por todo el territorio argentino. Cada oficina se identifica por un código único y se caracteriza por la ciudad en la que se encuentra y su dirección completa (calle, número y código postal) y teléfono. En cada oficina hay disponible un conjunto de coches, de los cuales se conoce su matrícula, el grupo al que pertenece: A, B, C, D, E, F o G (depende del tipo y tamaño del vehiculo), la marca, el modelo, el número de puertas, el número de plazas, la capacidad del maletero y la edad minima exigida para el alquiler. Los clientes pueden alquilar en cualquier oficina. Para llevar el control del estado de cada vehículo, la empresa mantiene un registro de todos los alquileres que ha sufrido, indicando para cada uno de ellos el nombre del conductor, su DNI, su dirección, un celular de contacto, y un número de tarjeta de crédito sobre la que realizar los cargos correspondientes. Además de esta información de los clientes, para cada alquiler se almacena su duración (en días), el tipo de seguro contratado y el precio total.

d. Una empresa de alquiler de vehículos desea conocer en todo momento el estado de su flota. La empresa tiene diversas oficinas repartidas por todo el territorio argentino. Cada oficina se identifica por un código único y se caracteriza por la ciudad en la que se encuentra y su dirección completa (calle, número y código postal) y teléfono. En cada oficina hay disponible un conjunto de coches, de los cuales se conoce su matrícula, el grupo al que pertenece: A, B, C, D, E, F o G (depende del tipo y tamaño del vehículo), la marca, el modelo, el número de puertas, el número de plazas, la capacidad del maletero y la edad mínima exigida para el alquiler. Los clientes pueden alquilar el vehículo en sólo una oficina. Para llevar el control del estado de cada vehículo, la empresa mantiene un registro de todos los alquileres que ha sufrido, indicando para cada uno de ellos el nombre del conductor, su DNI, su dirección, un teléfono de contacto y un número de tarjeta de crédito sobre la que realizar los cargos correspondientes. Además de esta información de los clientes, para cada alquiler se almacena su duración (en días), el tipo de seguro contratado y el precio total.

e. Ninguna

- Respuesta Correcta: d

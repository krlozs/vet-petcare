# Veterinaria PetCare - Angular

Aplicación web desarrollada en Angular y TypeScript para el parcial de Desarrollo de Interfaces 3.

El sistema permite digitalizar parte del proceso de atención de una clínica veterinaria: registro de mascotas, agenda de citas y consulta de historial de atenciones.

## Contexto del problema

La clínica veterinaria realiza sus citas por llamadas telefónicas y no cuenta con un control digital de horarios ni un historial ordenado por mascota. Esto genera demoras, pérdida de citas y dificultad para revisar atenciones anteriores.

## Necesidades identificadas

- Registrar mascotas junto con los datos básicos de su dueño.
- Agendar citas desde una interfaz web.
- Visualizar citas registradas y próximas atenciones.
- Consultar el historial de atención por mascota.
- Reducir el uso de registros manuales o llamadas para organizar citas.

## Usuarios principales

- Personal de la clínica: registra mascotas, agenda citas y revisa historiales.
- Clientes: brindan datos de sus mascotas y solicitan citas.

## Funcionalidades

- Login simple con usuario fijo.
- Dashboard con resumen de mascotas, citas e historiales.
- Registro de mascotas con formulario reactivo y validaciones.
- Agenda de citas con selector de mascota, fecha, hora, motivo y notas.
- Edición, eliminación, finalización y seguimiento de citas.
- Historial generado desde las citas completadas o enviadas a seguimiento.
- Búsqueda y filtros básicos en mascotas e historial.
- Pipe personalizado para mostrar el estado de la cita.
- Directiva personalizada para resaltar citas próximas.

## Credenciales de acceso

```text
Usuario: drgarcia
Contraseña: 123456
```

## Estructura del proyecto

```text
src/app
├── core
│   ├── guards
│   ├── models
│   └── services
├── pages
│   ├── login
│   ├── dashboard
│   ├── mascotas
│   ├── citas
│   └── historial
└── shared
    ├── directives
    └── pipes
```

## Flujos principales

### Registro de mascota

1. Iniciar sesión.
2. Ir a `Mascotas`.
3. Presionar `Registrar Mascota`.
4. Completar datos de mascota y dueño.
5. Guardar y verificar que aparece en la tabla.

### Agenda de cita

1. Registrar al menos una mascota.
2. Ir a `Citas`.
3. Seleccionar mascota, motivo, fecha y hora.
4. Guardar la cita.
5. Revisar que aparezca en próximas citas y en el resumen del inicio.

### Historial

1. Ir a `Citas`.
2. En una cita registrada, presionar completar o seguimiento.
3. Ir a `Historial`.
4. Verificar que la atención aparece como completada o en seguimiento.

## Instalación

```bash
pnpm install
```

## Ejecución

```bash
ng serve
```

Abrir en el navegador:

```text
http://localhost:4200
```

## Pruebas manuales sugeridas

- Iniciar sesión con `drgarcia / 123456`.
- Intentar entrar a `/mascotas` sin sesión y confirmar redirección al login.
- Registrar una mascota.
- Buscar la mascota registrada.
- Agendar una cita para esa mascota.
- Editar la cita y verificar que conserva las notas.
- Completar la cita y confirmar que aparece en historial.
- Cerrar sesión con el botón `Salir`.

## Tecnologías utilizadas

- Angular
- TypeScript
- ReactiveForms
- Servicios con estado en memoria
- Pipes personalizados
- Directivas personalizadas

## Integrantes

- Carlos E. Ventura Mori
- Mister Abad Gonza
- Eddi Cordova Nuñez

# Roadmap Altiva

## Fase 1: Proyecto de Titulo

- Pagina unica en `/`.
- Limpieza visual de la pagina unica.
- Subida de archivos a Supabase Storage si Supabase esta configurado.
- Lista de archivos desde `thesis_files` si hay sesion.
- Diagnostico V1 basado en metadata y categorias.
- Modulo APUs V1 deterministico en `/apus`.
- Arquitectura visual de Cubicar en `/cubicar`.
- Arquitectura visual de Documentacion tecnica en `/documentacion-tecnica`.
- Arquitectura visual de Documentacion administrativa en `/documentacion-administrativa`.
- Fallback mock si faltan variables.
- Chat IA flotante integrado.
- Login basico opcional cuando Supabase esta configurado.
- Esquema para `thesis_files`, `thesis_sources` y bucket `thesis-files`.
- Redireccion de rutas antiguas a `/`.

## Fase 2: Login y almacenamiento

- Endurecer login y manejo de sesion.
- Ejecutar y validar schema en Supabase.
- Endurecer politicas de Storage.
- Persistencia de fuentes.
- Persistencia de entregables.
- Permisos basicos por usuario.
- Edicion y eliminacion segura de archivos.

## Fase 3: IA con documentos autorizados

- Extraccion de texto desde documentos autorizados.
- IA leyendo fuentes/documentos autorizados.
- Generacion guiada de informes y documentacion.
- Checklist contra rubrica.
- Deteccion de informacion faltante desde archivos reales.
- Historial de conversaciones.
- Separacion de datos reales, supuestos y faltantes en borradores.

## Fase 4: Desarrollo tecnico del proyecto

- APUs V1 base desde itemizado y formato Excel.
- Completar APUs con recursos, rendimientos, precios y validacion tecnica.
- Cubicar con lectura controlada de planos, criterios de medicion y respaldo auditable.
- Documentacion tecnica con fuentes citadas y validacion de requisitos.
- Documentacion administrativa con deteccion de campos, faltantes y checklist documental.
- Presupuesto.
- Cronograma MS Project.
- Reportes tecnicos.
- Trazabilidad entre fuentes, calculos y entregables.

## Fase 5: Integraciones y posible uso profesional

- Drive si conviene para archivos.
- Notion si conviene para tareas o seguimiento.
- Uso profesional o clientes solo si vuelve a ser necesario.
- Roles, permisos y auditoria avanzada.

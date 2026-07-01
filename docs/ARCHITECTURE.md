# Arquitectura

## Enfoque actual

Altiva se enfoca por ahora en una sola pagina: Proyecto de Titulo.

La experiencia visible ya no es un portafolio, no muestra workspaces multiples y no presenta modulos de clientes. La ruta `/` concentra subida/listado de archivos del Proyecto de Titulo, diagnostico de faltantes, proximo paso, estado, herramientas de entregables y chat IA flotante.

Si Supabase esta configurado, `components/auth/project-auth-gate.tsx` exige login antes de mostrar la pagina. Si faltan variables de Supabase, el gate deja pasar a modo demo para no romper Vercel ni desarrollo local.

## Rutas

- `app/(public)/page.tsx`: pagina unica Proyecto de Titulo.
- `app/(public)/apus/page.tsx`: modulo "Generar APUs con Itemizado".
- `app/(public)/cubicar/page.tsx`: arquitectura futura del modulo Cubicar.
- `app/(public)/documentacion-tecnica/page.tsx`: arquitectura futura de documentacion tecnica.
- `app/(public)/documentacion-administrativa/page.tsx`: arquitectura futura de documentacion administrativa.
- `app/(public)/layout.tsx`: layout simple sin header ni footer de portafolio.
- `app/api/assistant/route.ts`: endpoint backend del asistente.
- `components/auth/project-auth-gate.tsx`: login basico opcional con Supabase Auth.
- `components/thesis/thesis-file-upload.tsx`: subida real a Supabase Storage cuando hay sesion.
- `components/thesis/thesis-file-list.tsx`: lista archivos reales desde `thesis_files` o mock si no hay Supabase.
- `components/thesis/thesis-files-panel.tsx`: une subida y listado.
- `components/thesis/thesis-readiness-panel.tsx`: diagnostico visual de archivos y faltantes.
- `components/thesis/thesis-project-workspace.tsx`: layout principal de dos columnas.
- `components/apus/apu-generator-workspace.tsx`: flujo cliente para cargar itemizado, mapear columnas, revisar preview y descargar APUs.
- `components/apus/apu-file-upload.tsx`: input reutilizable para itemizado y formato APU.
- `components/apus/apu-preview-table.tsx`: tabla de revision y exclusion de filas.
- `components/modules/module-action-card.tsx`: tarjeta reutilizable para accesos a modulos desde `/`.
- `components/modules/module-grid.tsx`: grilla reutilizable para renderizar herramientas desde data centralizada.
- `components/modules/coming-soon-module.tsx`: plantilla reutilizable para modulos futuros.
- `components/modules/module-step-list.tsx`: lista reutilizable de pasos del flujo.
- `data/project-modules.ts`: catalogo central de modulos disponibles y futuros.
- `lib/apus/itemized-parser.ts`: lectura local de `.xlsx`, `.xls` y `.csv`, deteccion de columnas y generacion de preview.
- `lib/apus/apu-generator.ts`: generacion local del Excel final.
- `lib/thesis/readiness.ts`: calculo reutilizable del diagnostico.
- `next.config.ts`: redirige rutas antiguas a `/`.
- `app/sitemap.ts`: expone `/`, `/apus` y rutas futuras visibles.
- `app/robots.ts`: bloquea rutas antiguas y privadas.

Rutas redirigidas a `/`:

- `/sobre-mi`
- `/servicios`
- `/proyectos`
- `/proyectos/:slug`
- `/contacto`
- `/login`
- `/app`
- `/app/*`

## Datos

Los datos demo del Proyecto de Titulo viven en `data/thesis-project-mock.ts`.

Incluyen:

- Datos generales del proyecto.
- Categorias de archivos.
- Archivos mock.
- Fuentes mock para contexto futuro.
- Entregables mock para contexto futuro.
- Alertas mock.
- Preguntas sugeridas para la IA.

`data/mock.ts` queda como respaldo heredado para pantallas antiguas, pero no forma parte de la experiencia principal.

## Supabase

La base Supabase esta separada en:

- `lib/db/supabase.ts`: lectura de `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `lib/db/supabase-browser.ts`: cliente de navegador para login.
- `lib/db/supabase-admin.ts`: cliente server-side futuro con `SUPABASE_SERVICE_ROLE_KEY`.
- `lib/db/thesis-schema.ts`: bucket, tablas y SQL sugerido.
- `lib/db/thesis-storage.ts`: preparacion de metadata y rutas de archivo.
- `lib/db/thesis-files.ts`: lectura e insercion de metadata en `thesis_files`.

Tablas preparadas:

- `thesis_files`
- `thesis_sources`

Bucket preparado:

- `thesis-files`

La clave `SUPABASE_SERVICE_ROLE_KEY` no se importa desde componentes cliente y debe usarse solo en backend.

Flujo de subida:

1. El usuario inicia sesion con Supabase Auth.
2. Selecciona archivo, categoria y observacion.
3. El cliente crea una ruta segura `{user_id}/{timestamp}-{safe_filename}`.
4. El archivo se sube al bucket privado `thesis-files`.
5. La metadata se guarda en `thesis_files`.
6. La lista se actualiza con los archivos del usuario autenticado.

## Diagnostico V1

El diagnostico recibe una lista de `ThesisFileMetadata` y devuelve:

- `status`
- `score`
- `foundCategories`
- `missingCategories`
- `criticalMissing`
- `nextStep`
- `warnings`

La logica compara categorias presentes contra un conjunto base: instrucciones, rubricas, formatos, planos, EETT, bases, contratos, itemizado, presupuesto, APUs, cronograma, informes, normativa y fuentes tecnicas.

Los faltantes criticos actuales son:

- Instrucciones del ramo.
- Rubricas.
- Formatos.
- EETT.
- Itemizado.
- Planos.
- Bases tecnicas.

Este diagnostico no analiza contenido documental. Solo usa metadata y categorias registradas.

## APUs V1

El modulo `/apus` es una herramienta practica local para transformar un itemizado en APUs base.

Flujo:

1. El navegador lee un itemizado `.xlsx`, `.xls` o `.csv` con `xlsx`.
2. `lib/apus/itemized-parser.ts` detecta columnas frecuentes para empresa, proyecto, codigo/item, actividad, unidad, cantidad y observaciones.
3. Si la actividad no se detecta, la UI exige mapeo manual.
4. El usuario puede excluir filas en la vista previa.
5. `lib/apus/apu-generator.ts` genera `APUs_generados.xlsx`.
6. El Excel contiene una hoja `Resumen` y hojas `APU 001`, `APU 002`, etc.

El formato APU puede incluir:

- `{{EMPRESA}}`
- `{{PROYECTO}}`
- `{{CODIGO}}`
- `{{ITEM}}`
- `{{ACTIVIDAD}}`
- `{{UNIDAD}}`
- `{{CANTIDAD}}`
- `{{OBSERVACIONES}}`
- `{{FECHA}}`
- `{{NUMERO_APU}}`

Si el formato no contiene placeholders, se genera una base interna. La V1 no usa IA, no guarda archivos, no lee Supabase, no calcula precios y no completa recursos ni rendimientos.

## Modulos futuros

Los modulos `Cubicar`, `Documentacion tecnica` y `Documentacion administrativa` comparten estructura en `data/project-modules.ts`.

Cada modulo declara:

- `id`
- `title`
- `href`
- `description`
- `status`
- `isAvailable`
- `badge`
- `primaryActionLabel`
- `requirements`
- `relatedSources`
- `steps`
- `futureOutputs`
- `expectedOutputs`
- `warning`

Esto deja preparada la arquitectura para conectar IA mas adelante sin rehacer navegacion ni estructura visual.

La capa visual usa clases globales ligeras en `app/globals.css`:

- `altiva-page`: fondo tecnico con grilla sutil.
- `altiva-hero`: hero oscuro para pantallas principales.
- `altiva-surface`: superficie elevada para paneles principales.
- `altiva-surface-soft`: superficie secundaria para paneles de apoyo.

Estado actual:

- `/cubicar`: visualiza el flujo futuro para planos, deteccion de partidas, criterios de medicion, cubicacion y respaldo.
- `/documentacion-tecnica`: visualiza el flujo futuro para fuentes tecnicas, requisitos, faltantes, borrador y validacion.
- `/documentacion-administrativa`: visualiza el flujo futuro para bases, formularios, campos requeridos, faltantes, borrador y revision.

Estas rutas no ejecutan IA real, no leen planos, no hacen OCR, no conectan Supabase, no generan entregables finales y no exportan documentos. APUs es el unico modulo funcional de generacion actual.

## Chat IA flotante

El chat integrado vive en `components/chat/floating-assistant.tsx`.

Flujo:

1. El usuario abre el icono flotante desde `/`.
2. El componente llama a `POST /api/assistant`.
3. La API valida mensaje y modo.
4. `lib/ai/provider.ts` selecciona proveedor.
5. OpenAI se usa solo si `AI_PROVIDER=openai` y existe `OPENAI_API_KEY`.
6. Si falta configuracion o falla OpenAI, se usa `mockAssistantProvider`.

El asistente se enfoca en:

- Interpretar instrucciones.
- Ordenar fuentes.
- Preparar entregables.
- Detectar informacion faltante.
- Revisar archivos disponibles y faltantes antes de proponer entregables.
- Estructurar informes contra pauta o rubrica.
- Preparar APUs, presupuesto, cronograma, cubicaciones y documentacion mas adelante.
- Reconocer que Cubicar, Documentacion tecnica y Documentacion administrativa son roadmap y no capacidades activas.

## Capas futuras mantenidas

Se mantienen las carpetas para evolucionar sin rehacer arquitectura:

- `lib/ai`
- `lib/db`
- `lib/drive`
- `lib/notion`

Estas integraciones no se muestran como modulos activos en la UI.

## Riesgos antes de datos reales

Antes de usar documentos para IA hay que implementar:

- Politicas RLS verificadas.
- Validacion de documentos autorizados.
- Extraccion de texto o lectura controlada de archivos.
- Auditoria minima de acciones sensibles.
- Validacion tecnica antes de usar APUs generados como entregable profesional.
- Separacion clara entre datos reales, supuestos y faltantes antes de generar documentacion con IA.

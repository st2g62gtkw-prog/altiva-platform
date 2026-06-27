# Arquitectura

## Enfoque actual

Altiva se enfoca por ahora en una sola pagina: Proyecto de Titulo.

La experiencia visible ya no es un portafolio, no muestra workspaces multiples y no presenta modulos de clientes. La ruta `/` concentra archivos mock, fuentes mock, entregables mock y chat IA flotante.

Si Supabase esta configurado, `components/auth/project-auth-gate.tsx` exige login antes de mostrar la pagina. Si faltan variables de Supabase, el gate deja pasar a modo demo para no romper Vercel ni desarrollo local.

## Rutas

- `app/(public)/page.tsx`: pagina unica Proyecto de Titulo.
- `app/(public)/layout.tsx`: layout simple sin header ni footer de portafolio.
- `app/api/assistant/route.ts`: endpoint backend del asistente.
- `components/auth/project-auth-gate.tsx`: login basico opcional con Supabase Auth.
- `next.config.ts`: redirige rutas antiguas a `/`.
- `app/sitemap.ts`: expone solo `/`.
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

Los datos visibles del Proyecto de Titulo viven en `data/thesis-project-mock.ts`.

Incluyen:

- Datos generales del proyecto.
- Categorias de archivos.
- Archivos mock.
- Fuentes mock.
- Entregables mock.
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

Tablas preparadas:

- `thesis_files`
- `thesis_sources`

Bucket preparado:

- `thesis-files`

La clave `SUPABASE_SERVICE_ROLE_KEY` no se importa desde componentes cliente y debe usarse solo en backend.

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
- Estructurar informes contra pauta o rubrica.
- Preparar APUs, presupuesto, cronograma y reportes mas adelante.

## Capas futuras mantenidas

Se mantienen las carpetas para evolucionar sin rehacer arquitectura:

- `lib/ai`
- `lib/db`
- `lib/drive`
- `lib/notion`

Estas integraciones no se muestran como modulos activos en la UI.

## Riesgos antes de datos reales

Antes de subir archivos reales hay que implementar:

- Almacenamiento persistente.
- Consultas reales a Supabase.
- Politicas RLS verificadas.
- Validacion de documentos autorizados.
- Separacion entre datos privados y datos de prueba.
- Auditoria minima de acciones sensibles.

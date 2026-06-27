# Arquitectura

## Enfoque actual

Altiva se enfoca por ahora en una sola pagina: Proyecto de Titulo.

La experiencia visible ya no es un portafolio, no muestra workspaces multiples y no presenta modulos de clientes. La ruta `/` concentra archivos mock, fuentes mock, entregables mock y chat IA flotante.

## Rutas

- `app/(public)/page.tsx`: pagina unica Proyecto de Titulo.
- `app/(public)/layout.tsx`: layout simple sin header ni footer de portafolio.
- `app/api/assistant/route.ts`: endpoint backend del asistente.
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

- Login.
- Almacenamiento persistente.
- Permisos por usuario.
- Validacion de documentos autorizados.
- Separacion entre datos privados y datos de prueba.
- Auditoria minima de acciones sensibles.

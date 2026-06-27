# Arquitectura

## Principio general

Altiva separa rutas, componentes, datos, integraciones y tipos para evitar que la primera version quede como una maqueta dificil de escalar.

## Rutas

- `app/(public)/`: sitio publico y portafolio.
- `app/(private)/app/`: sistema interno.
- `app/(auth)/login/`: pantalla visual de login futuro.
- `app/sitemap.ts`: sitemap publico.
- `app/robots.ts`: robots con bloqueo de rutas privadas.
- `proxy.ts`: punto de proteccion futura. En Next 16 reemplaza la antigua convencion `middleware.ts`.

## Espacios de trabajo

Altiva se organiza por espacios para que la version personal actual pueda crecer sin mezclar responsabilidades:

- Public Site: portafolio, proyectos publicos, servicios y contacto. Rutas principales: `/`, `/sobre-mi`, `/servicios`, `/proyectos`, `/contacto`.
- Personal Workspace: notas, tareas, estudio, tests, habitos, ideas e IA personal. Rutas principales: `/app/personal`, `/app/personal/notas`, `/app/personal/tareas`, `/app/personal/estudio`, `/app/personal/tests`, `/app/personal/habitos`.
- Technical Workspace: proyectos de construccion, documentos, presupuestos, reportes, riesgos y estados de avance. Rutas principales: `/app/technical`, `/app/technical/proyectos`, `/app/technical/documentos`, `/app/technical/presupuestos`, `/app/technical/reportes`.
- Future External Workspace: clientes, empresas, permisos, colaboracion y roles externos. Esta capa queda documentada, pero no implementada en V1.

`/app` funciona como entrada interna y muestra las tarjetas principales de cada espacio. Las rutas antiguas tecnicas (`/app/proyectos`, `/app/documentos`, `/app/presupuestos`, `/app/reportes`) redirigen a las nuevas rutas bajo `/app/technical`.

## Componentes

- `components/layout`: estructura general.
- `components/public`: tarjetas publicas.
- `components/dashboard`: tablas, alertas y resumen de proyectos.
- `components/chat`: interfaz del asistente.
- `components/workspace`: tarjetas y estados visuales para espacios de trabajo.
- `components/ui`: piezas reutilizables pequenas.

## Altiva Assistant V1

El asistente esta separado en capas para que la UI no conozca proveedores externos ni claves:

- `components/chat/chat-panel.tsx`: UI del chat, modos visuales y envio de mensajes.
- `app/api/assistant/route.ts`: entrada backend interna para procesar consultas.
- `lib/ai/types.ts`: contratos `AssistantMessage`, `AssistantMode`, `AssistantContext`, `AssistantProvider` y respuestas.
- `lib/ai/assistant-config.ts`: configuracion de proveedor, modelo y modos disponibles.
- `lib/ai/assistant-prompts.ts`: prompt base del sistema, prompts por modo y ejemplos de uso.
- `lib/ai/mock-assistant.ts`: proveedor mock, sin llamadas externas.
- `lib/ai/openai-provider.ts`: proveedor OpenAI opcional, solo server-side.
- `lib/ai/runtime-config.ts`: lectura server-side de `AI_PROVIDER`, `AI_MODEL` y `OPENAI_API_KEY`.
- `lib/ai/provider.ts`: selector de proveedor y fallback seguro.

El flujo actual es:

1. El usuario escribe en `/app/asistente`.
2. La UI llama a `POST /api/assistant`.
3. La ruta normaliza el modo y contexto.
4. `getAssistantResponse` usa el proveedor configurado.
5. Si `AI_PROVIDER=openai` y existe `OPENAI_API_KEY`, responde OpenAI.
6. Si no hay clave, el proveedor no es OpenAI, o la llamada falla, responde `mockAssistantProvider`.

No se exponen claves al cliente. `OPENAI_API_KEY` se lee solo en backend desde `lib/ai/runtime-config.ts`.
`AI_PROVIDER=mock` mantiene el comportamiento local y seguro.

Antes de conectar datos reales hay que resolver permisos, auditoria, sanitizacion de documentos y control de informacion sensible por usuario/proyecto.

## Datos

Los mocks viven en `data/mock.ts`. Incluyen datos publicos, datos tecnicos y datos personales de referencia. Las pantallas no deberian definir datos propios salvo constantes de UI muy locales.

Cuando Supabase exista, la migracion esperada es:

1. Mantener los tipos en `types/`.
2. Crear funciones de lectura en `lib/db`.
3. Reemplazar imports desde `data/mock.ts` por servicios tipados.
4. Mantener los componentes visuales sin conocer detalles de Supabase.

Antes de usar datos reales se debe activar autenticacion, permisos por usuario, politicas de acceso, auditoria y separacion clara entre datos personales, tecnicos y externos.

## URLs

`lib/utils/urls.ts` centraliza la URL base:

- usa `NEXT_PUBLIC_SITE_URL` si existe.
- usa `VERCEL_URL` en Vercel.
- usa `http://localhost:3000` en desarrollo.

## Autenticacion

`lib/auth` y `proxy.ts` dejan preparada la proteccion de `/app`.

Hoy `AUTH_PROTECTION_ENABLED=false` permite usar la demo sin login. Cuando Supabase Auth este implementado, se debe validar la sesion real en middleware o en una capa server-side equivalente.

## SEO

`config/metadata.ts` genera metadata por pagina, Open Graph, canonical y noindex cuando corresponde. Las rutas privadas y login no se indexan.

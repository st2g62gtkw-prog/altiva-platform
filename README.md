# Altiva

Altiva queda enfocada por ahora en una sola experiencia: una pagina unica para el Proyecto de Titulo.

La ruta principal es `/` y muestra una base limpia para ordenar el estado del proyecto, el proximo paso, archivos/fuentes mock, entregables mock y un chat IA flotante.

No hay portafolio publico activo, servicios, contacto, workspaces personales, workspace tecnico general ni modulo de clientes en la experiencia visible actual.

## Stack

- Next.js 16 con App Router.
- React 19.
- TypeScript 6.
- Tailwind CSS 4.
- ESLint.
- Arquitectura preparada para Vercel, Supabase, Storage/Drive, Notion y OpenAI.

## Rutas

Ruta activa:

- `/`: pagina unica Proyecto de Titulo.

Rutas antiguas redirigidas a `/`:

- `/sobre-mi`
- `/servicios`
- `/proyectos`
- `/proyectos/:slug`
- `/contacto`
- `/login`
- `/app`
- `/app/*`

## Contenido actual

La pagina `/` contiene:

- Header del Proyecto de Titulo.
- Estado del proyecto.
- Proximo paso.
- Resumen compacto de archivos y fuentes.
- Resumen compacto de entregables.
- Nota breve para no subir informacion sensible.
- Chat IA flotante integrado en la misma pagina.

Esta version evita tablas largas y modulos visuales que parezcan funciones activas antes de implementar almacenamiento real.

## Chat IA

El chat flotante vive en `components/chat/floating-assistant.tsx`.

Flujo:

1. El usuario abre el icono flotante.
2. El panel envia consultas a `POST /api/assistant`.
3. La API usa `lib/ai/provider.ts`.
4. Si `AI_PROVIDER=openai` y existe `OPENAI_API_KEY`, se usa OpenAI server-side.
5. Si no hay clave, el proveedor no es OpenAI o falla, se usa mock.

La clave `OPENAI_API_KEY` nunca debe ir en frontend.

## Datos mock

Los datos principales del Proyecto de Titulo estan en:

- `data/thesis-project-mock.ts`

Incluye:

- Datos generales del proyecto.
- Archivos mock.
- Categorias de archivos.
- Fuentes mock.
- Entregables mock.
- Alertas mock.
- Preguntas sugeridas para la IA.

## Variables de entorno

Copia `.env.example` a `.env.local` para desarrollo. No subas `.env.local` a GitHub.

Variables preparadas:

```txt
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_APP_NAME=Altiva

OPENAI_API_KEY=
AI_PROVIDER=mock
AI_MODEL=

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

NOTION_TOKEN=
NOTION_DATABASE_ID=

AUTH_PROTECTION_ENABLED=false
```

## Instalacion local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abre `http://localhost:3000`.

## Validacion

```bash
pnpm lint
pnpm build
```

## Que sigue

Antes de usar archivos o datos reales falta:

- Login real.
- Supabase.
- Almacenamiento real con Supabase Storage o Google Drive.
- Persistencia de fuentes y entregables.
- Permisos por usuario.
- IA leyendo documentos autorizados.
- Checklist contra rubrica.

## Subir a GitHub/Vercel

```bash
git status
git add .
git commit -m "Focus Altiva on thesis project page"
git push
```

Vercel actualizara la web cuando reciba el push en la rama conectada.

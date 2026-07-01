# Altiva

Altiva queda enfocada por ahora en una sola experiencia: una pagina unica para el Proyecto de Titulo.

La ruta principal es `/` y muestra una base simple para subir archivos del Proyecto de Titulo, ver archivos registrados, revisar el proximo paso, abrir el generador de APUs V1 y usar un chat IA flotante.

Si Supabase esta configurado, `/` pide login antes de mostrar el area del proyecto. Si Supabase no esta configurado, la pagina sigue funcionando en modo demo con datos mock.

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
- `/apus`: generador local de APUs base desde itemizado y formato Excel.

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
- Subida de archivo.
- Lista de archivos subidos.
- Proximo paso.
- Diagnostico de archivos y faltantes.
- Estado del proyecto.
- Recordatorio de seguridad.
- Acceso al modulo "Generar APUs con Itemizado".
- Chat IA flotante integrado en la misma pagina.
- Login basico opcional cuando existen variables de Supabase.

Si Supabase esta configurado y el usuario inicio sesion, la subida guarda el archivo en Storage y metadata en `thesis_files`. Si Supabase no esta configurado, se muestra una lista demo y la subida queda deshabilitada.

## Diagnostico V1

El diagnostico de archivos y faltantes vive en `components/thesis/thesis-readiness-panel.tsx` y usa la logica de `lib/thesis/readiness.ts`.

Estado actual:

- Analiza metadata y categorias de archivos.
- Calcula un nivel simple de preparacion.
- Muestra categorias encontradas.
- Muestra documentos faltantes.
- Destaca faltantes criticos.
- Recomienda un proximo paso.

Todavia no lee contenido de PDFs, Word, Excel, planos ni documentos tecnicos. La siguiente etapa sera IA documental real con extraccion de texto, fuentes verificadas y controles de permisos.

## APUs V1

El modulo `/apus` genera un Excel descargable llamado `APUs_generados.xlsx`.

Flujo:

- El usuario sube un itemizado `.xlsx`, `.xls` o `.csv`.
- El usuario sube un formato APU `.xlsx` con placeholders, si lo tiene.
- Altiva detecta columnas comunes y permite ajustar el mapeo manualmente.
- El usuario revisa la vista previa y excluye filas que sean titulos o subtitulos.
- Altiva crea una hoja `Resumen` y una hoja por cada APU: `APU 001`, `APU 002`, etc.

Columnas detectadas:

- Empresa: `Empresa`, `Constructora`, `Mandante`.
- Proyecto: `Proyecto`.
- Codigo/item: `Codigo`, `Item`, `N`, `Nro`, `Numero`.
- Actividad: `Actividad`, `Descripcion`, `Partida`, `Nombre partida`, `Tarea`, `Glosa`.
- Unidad: `Unidad`, `Und`, `U.M.`, `UM`, `Un`.
- Cantidad: `Cantidad`, `Cant.`, `Cubicacion`, `Metrado`.
- Observaciones: `Observacion`, `Observaciones`, `Nota`, `Notas`.

Placeholders soportados en el formato APU:

```txt
{{EMPRESA}}
{{PROYECTO}}
{{CODIGO}}
{{ITEM}}
{{ACTIVIDAD}}
{{UNIDAD}}
{{CANTIDAD}}
{{OBSERVACIONES}}
{{FECHA}}
{{NUMERO_APU}}
```

APUs V1 es deterministico y funciona en el navegador. No usa IA, no sube archivos a Supabase, no completa recursos, no inventa rendimientos, no inventa precios y no calcula totales. El resultado es una base ordenada para revision profesional posterior.

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

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
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

## Supabase

Para activar login basico:

1. Crear un proyecto en Supabase.
2. Activar Auth con email/password.
3. Crear un usuario desde Supabase Auth.
4. Copiar `Project URL` en `NEXT_PUBLIC_SUPABASE_URL`.
5. Copiar `anon public key` en `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6. Guardar `service_role key` en `SUPABASE_SERVICE_ROLE_KEY` solo para backend futuro.

Para preparar archivos reales:

1. Crear bucket privado `thesis-files`.
2. Crear tabla `thesis_files`.
3. Crear tabla `thesis_sources`.
4. Activar Row Level Security.
5. Usar politicas por `auth.uid() = user_id`.
6. Crear politicas de Storage para que cada usuario use solo su carpeta `{user_id}/`.

El SQL sugerido vive en `lib/db/thesis-schema.ts`.

La subida real vive en `components/thesis/thesis-file-upload.tsx`. El listado vive en `components/thesis/thesis-file-list.tsx`. La preparacion de metadata y ruta de storage vive en `lib/db/thesis-storage.ts`.

## Que sigue

Antes de usar archivos o datos reales falta:

- Persistencia de fuentes y entregables.
- Edicion o eliminacion de metadata.
- IA leyendo documentos autorizados.
- Extraccion de texto y validacion de fuentes.
- Checklist contra rubrica.
- Completar APUs con recursos, rendimientos, precios y validacion tecnica.

## Subir a GitHub/Vercel

```bash
git status
git add .
git commit -m "Add thesis readiness diagnosis"
git push
```

Vercel actualizara la web cuando reciba el push en la rama conectada.

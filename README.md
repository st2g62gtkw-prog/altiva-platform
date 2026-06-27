# Altiva

Altiva es una base real de plataforma web para un Constructor Civil. Incluye una web publica tipo portafolio y una app interna inicial organizada por espacios: personal, tecnico, asistente y configuracion.

La prioridad de esta version es dejar una fundacion ordenada, escalable y lista para desplegarse en Vercel, no una maqueta local aislada.

## Stack

- Next.js 16 con App Router.
- React 19.
- TypeScript 6.
- Tailwind CSS 4.
- ESLint.
- Preparacion para Vercel, Supabase, Google Drive, Notion y OpenAI.

## Requisitos

- Node.js `>=20.9.0`.
- pnpm recomendado.
- Cuenta de GitHub para alojar el repositorio.
- Cuenta de Vercel para desplegar.

## Estructura principal

```txt
app/
  (public)/              rutas publicas
  (private)/app/         app interna
  (auth)/login/          login visual futuro
components/
  chat/                  UI del asistente
  dashboard/             piezas de la app interna
  layout/                headers, footers y shell privado
  public/                componentes del portafolio
  ui/                    componentes reutilizables
  workspace/             tarjetas y estados de espacios
config/                  metadata, navegacion y constantes
data/                    datos mock centralizados
docs/                    documentacion tecnica y roadmap
lib/
  ai/                    interfaz y asistente simulado
  auth/                  capa futura de autenticacion
  db/                    preparacion Supabase
  drive/                 preparacion Google Drive
  notion/                preparacion Notion
  utils/                 URLs, formato y utilidades
types/                   tipos compartidos
public/                  assets publicos
```

## Instalacion local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abre `http://localhost:3000`.

Rutas principales:

- `/`
- `/sobre-mi`
- `/servicios`
- `/proyectos`
- `/proyectos/mejoramiento-sede-comunitaria`
- `/contacto`
- `/login`
- `/app`
- `/app/personal`
- `/app/personal/notas`
- `/app/personal/tareas`
- `/app/personal/estudio`
- `/app/personal/tests`
- `/app/personal/habitos`
- `/app/technical`
- `/app/technical/proyectos`
- `/app/technical/presupuestos`
- `/app/technical/documentos`
- `/app/technical/reportes`
- `/app/asistente`
- `/app/configuracion`

## Build y validacion

```bash
pnpm lint
pnpm build
```

El build debe ejecutarse sin depender de rutas locales ni secretos reales.

## Variables de entorno

Copia `.env.example` a `.env.local` para desarrollo. No subas `.env.local` a GitHub.

Variables preparadas:

```txt
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_APP_NAME=Altiva
OPENAI_API_KEY=
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

`NEXT_PUBLIC_SITE_URL` debe ser:

- Desarrollo: `http://localhost:3000`.
- Vercel: la URL final del deployment.
- Dominio propio: `https://tudominio.cl`.

Si queda vacia, la utilidad de URLs usa `VERCEL_URL` en produccion o `http://localhost:3000` en desarrollo.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Initial Altiva platform"
git branch -M main
git remote add origin https://github.com/tu-usuario/altiva-platform.git
git push -u origin main
```

Antes de subir:

- Revisa que `.env.local` no este versionado.
- Revisa `.gitignore`.
- Ejecuta `pnpm build`.

## Despliegue en Vercel

1. Entra a Vercel.
2. Importa el repositorio desde GitHub.
3. Framework: Next.js.
4. Install command: `pnpm install`.
5. Build command: `pnpm build`.
6. Output directory: dejar vacio, Vercel detecta Next.js.
7. Agrega las variables de entorno necesarias.
8. Ejecuta el primer deployment.
9. Revisa las rutas publicas y `/app`.

Vercel creara preview deployments para cada rama o pull request.

## Dominio propio

Debes comprar el dominio fuera del proyecto, por ejemplo en un registrador de dominios. Luego:

1. En Vercel, abre el proyecto y entra a Domains.
2. Agrega el dominio.
3. Sigue las instrucciones DNS de Vercel.
4. Actualiza `NEXT_PUBLIC_SITE_URL` con `https://tudominio.cl`.
5. Redeploy.
6. Verifica sitemap, robots, metadata y enlaces canonicos.

## Supabase futuro

La base esta preparada en `lib/db`.

Tablas futuras sugeridas:

- `users`
- `projects`
- `public_projects`
- `documents`
- `budgets`
- `reports`
- `tasks`
- `integrations`
- `ai_messages`

Siguiente paso tecnico:

1. Crear proyecto Supabase.
2. Definir esquema SQL.
3. Instalar `@supabase/supabase-js`.
4. Reemplazar datos de `data/mock.ts` por consultas tipadas.
5. Activar login real y proteger `/app`.

## Google Drive futuro

La capa esta en `lib/drive`.

Funciones preparadas:

- listar documentos.
- subir documento.
- obtener metadata.
- asociar documento a proyecto.

Falta implementar OAuth, permisos y persistencia de relaciones en Supabase.

## Notion futuro

La capa esta en `lib/notion`.

Funciones preparadas:

- listar tareas.
- crear tarea.
- sincronizar proyecto.
- leer base de datos.

Falta configurar una integracion de Notion, compartir la base de datos con esa integracion y mapear propiedades.

## IA futura

La capa esta en `lib/ai`.

Hoy el chat usa proveedor mock por defecto y OpenAI opcional solo desde backend. Para activar IA real:

1. Configura `OPENAI_API_KEY`.
2. Define `AI_PROVIDER=openai`.
3. Define `AI_MODEL` si quieres usar un modelo especifico.
4. Manten las claves fuera del frontend.
5. Guarda conversaciones en `ai_messages` cuando exista Supabase.
6. Agrega lectura de documentos cuando Drive/Supabase existan.

## Archivos para revisar primero

- `app/(public)/page.tsx`: portada publica.
- `app/(private)/app/page.tsx`: entrada interna por espacios.
- `app/(private)/app/personal/page.tsx`: dashboard personal.
- `app/(private)/app/technical/page.tsx`: dashboard tecnico.
- `data/mock.ts`: datos simulados.
- `lib/ai/mock-assistant.ts`: asistente simulado.
- `lib/utils/urls.ts`: URLs por entorno.
- `proxy.ts`: proteccion futura de `/app`.
- `docs/ROADMAP.md`: plan por fases.

## Proximos pasos recomendados

1. Subir a GitHub y desplegar en Vercel.
2. Ajustar textos reales del perfil y servicios.
3. Definir el esquema Supabase.
4. Implementar login real.
5. Migrar mocks a base de datos.
6. Conectar Drive y Notion.
7. Conectar IA real y lectura documental.

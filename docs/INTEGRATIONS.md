# Integraciones futuras

Por ahora Altiva no conecta Drive, Notion ni lectura real de documentos. Supabase queda preparado para login basico y futuro almacenamiento, pero los archivos/fuentes visibles siguen siendo mock hasta implementar consultas reales.

## IA

Carpeta: `lib/ai`

Variables:

```txt
AI_PROVIDER=mock
AI_MODEL=
OPENAI_API_KEY=
```

Estado actual:

- El chat visible vive en `components/chat/floating-assistant.tsx`.
- El chat llama a `POST /api/assistant`.
- La ruta backend usa `lib/ai/provider.ts`.
- El proveedor mock vive en `lib/ai/mock-assistant.ts`.
- El proveedor OpenAI opcional vive en `lib/ai/openai-provider.ts`.
- `OPENAI_API_KEY` solo se lee server-side.
- Si falta clave o falla OpenAI, se usa mock.

Activar OpenAI localmente:

```txt
AI_PROVIDER=openai
AI_MODEL=gpt-5-mini
OPENAI_API_KEY=sk-...
```

Activar OpenAI en Vercel:

1. Ir al proyecto en Vercel.
2. Abrir Settings > Environment Variables.
3. Agregar `AI_PROVIDER=openai`.
4. Agregar `AI_MODEL`.
5. Agregar `OPENAI_API_KEY`.
6. Redeploy.

Volver a modo mock:

```txt
AI_PROVIDER=mock
AI_MODEL=
OPENAI_API_KEY=
```

## Supabase

Carpeta: `lib/db`

Variables:

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Estado actual:

- Login basico desde `components/auth/project-auth-gate.tsx`.
- Fallback demo si faltan variables.
- Cliente de navegador en `lib/db/supabase-browser.ts`.
- Cliente admin server-side preparado en `lib/db/supabase-admin.ts`.
- SQL sugerido en `lib/db/thesis-schema.ts`.
- Helpers de storage en `lib/db/thesis-storage.ts`.

`SUPABASE_SERVICE_ROLE_KEY` solo debe usarse server-side.

Crear proyecto Supabase:

1. Crear proyecto en Supabase.
2. Ir a Project Settings > API.
3. Copiar Project URL a `NEXT_PUBLIC_SUPABASE_URL`.
4. Copiar anon public key a `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Copiar service_role key a `SUPABASE_SERVICE_ROLE_KEY` solo en entornos backend.
6. En Authentication, habilitar email/password.
7. Crear el usuario inicial desde Auth > Users.

Variables en Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Tablas sugeridas:

- `thesis_files`
- `thesis_sources`

Bucket sugerido:

- `thesis-files` privado.

## Almacenamiento de archivos

Opciones futuras:

- Supabase Storage.
- Google Drive.

Antes de habilitar subida real hay que definir:

- Usuario autenticado.
- Carpeta o bucket.
- Permisos.
- Limites de tamano y tipo de archivo.
- Metadata de categoria, estado y entregable relacionado.

Metadata preparada para `thesis_files`:

- `id`
- `user_id`
- `name`
- `category`
- `file_type`
- `status`
- `notes`
- `storage_path`
- `created_at`
- `updated_at`

Metadata preparada para `thesis_sources`:

- `id`
- `user_id`
- `title`
- `source_type`
- `status`
- `expected_use`
- `related_deliverable`
- `notes`
- `created_at`
- `updated_at`

## Google Drive futuro

Carpeta: `lib/drive`

Variables:

```txt
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
```

Drive no esta activo en la UI. Podria usarse mas adelante para almacenar o leer documentos autorizados del Proyecto de Titulo.

## Notion futuro

Carpeta: `lib/notion`

Variables:

```txt
NOTION_TOKEN=
NOTION_DATABASE_ID=
```

Notion no esta activo en la UI. Solo podria volver a considerarse si ayuda al seguimiento de tareas o fuentes.

## Riesgos antes de conectar datos reales

- Subir informacion privada sin login.
- Enviar documentos a IA sin permiso claro.
- Mezclar fuentes oficiales con referencias no validadas.
- Generar informes inventando datos faltantes.
- Exponer claves en frontend.
- No tener trazabilidad entre pauta, rubrica, fuentes y entregables.

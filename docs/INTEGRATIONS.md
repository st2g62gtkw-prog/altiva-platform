# Integraciones futuras

## Supabase

Carpeta: `lib/db`

Variables:

```txt
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Tablas sugeridas:

- `users`
- `projects`
- `public_projects`
- `documents`
- `budgets`
- `reports`
- `tasks`
- `integrations`
- `ai_messages`

Notas:

- `SUPABASE_SERVICE_ROLE_KEY` solo debe usarse server-side.
- No exponer claves privadas al navegador.
- Usar Row Level Security cuando existan usuarios reales.

## Google Drive

Carpeta: `lib/drive`

Variables:

```txt
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
```

Funciones preparadas:

- `listDriveDocuments`
- `uploadDriveDocument`
- `getDriveDocumentMetadata`
- `attachDriveDocumentToProject`

Pasos futuros:

1. Crear credenciales OAuth en Google Cloud.
2. Configurar redirect URI para desarrollo y Vercel.
3. Guardar tokens de forma segura.
4. Asociar archivos a proyectos en Supabase.

## Notion

Carpeta: `lib/notion`

Variables:

```txt
NOTION_TOKEN=
NOTION_DATABASE_ID=
```

Funciones preparadas:

- `listNotionTasks`
- `createNotionTask`
- `syncProjectWithNotion`
- `readNotionDatabase`

Pasos futuros:

1. Crear una integracion en Notion.
2. Compartir la base de datos con la integracion.
3. Mapear propiedades de proyecto, responsable, fecha y estado.
4. Resolver conflictos entre Notion y Supabase.

## IA

Carpeta: `lib/ai`

Variable:

```txt
OPENAI_API_KEY=
```

La UI usa `components/chat/chat-panel.tsx`. La logica simulada vive en `lib/ai/mock-assistant.ts`.

Pasos futuros:

1. Crear una API route server-side.
2. Llamar al proveedor de IA desde servidor.
3. Guardar mensajes en `ai_messages`.
4. Conectar contexto desde proyectos, documentos y presupuestos.
5. Agregar controles de permisos antes de entregar informacion sensible.

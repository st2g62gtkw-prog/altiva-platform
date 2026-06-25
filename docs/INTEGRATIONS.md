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

Variables:

```txt
AI_PROVIDER=mock
AI_MODEL=altiva-mock-v1
OPENAI_API_KEY=
```

Estado actual:

- La UI vive en `components/chat/chat-panel.tsx`.
- La UI llama a `POST /api/assistant`.
- La ruta backend usa `lib/ai/provider.ts`.
- El proveedor actual es `lib/ai/mock-assistant.ts`.
- El prompt base vive en `lib/ai/assistant-prompts.ts`.
- Los modos disponibles se definen en `lib/ai/assistant-config.ts`.
- No se llama a OpenAI ni a ningun proveedor externo.

Modos preparados:

- General.
- Oficina tecnica.
- Presupuestos.
- Documentos.
- Reportes.
- Estudio PMP/ITO.
- Gestion de proyectos.

Pasos futuros:

1. Mantener `components/chat/chat-panel.tsx` sin claves ni SDKs externos.
2. Crear un proveedor OpenAI server-side y conectarlo en `lib/ai/provider.ts`.
3. Usar `altivaSystemPrompt` como prompt base y agregar contexto autorizado.
4. Guardar mensajes en `ai_messages` cuando exista Supabase.
5. Conectar contexto desde proyectos, documentos y presupuestos solo con permisos.
6. Agregar controles de permisos antes de entregar informacion sensible.

Riesgos antes de conectar IA real:

- Exponer informacion privada de proyectos o clientes.
- Enviar documentos sin permisos claros.
- Mezclar datos de distintos proyectos o usuarios.
- Aceptar respuestas inventadas sin trazabilidad.
- Usar claves en el cliente en lugar del backend.

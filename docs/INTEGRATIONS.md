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
AI_MODEL=
OPENAI_API_KEY=
```

Estado actual:

- La UI vive en `components/chat/chat-panel.tsx`.
- La UI llama a `POST /api/assistant`.
- La ruta backend usa `lib/ai/provider.ts`.
- El proveedor actual es `lib/ai/mock-assistant.ts`.
- El proveedor OpenAI opcional vive en `lib/ai/openai-provider.ts`.
- La lectura de variables server-side vive en `lib/ai/runtime-config.ts`.
- El prompt base vive en `lib/ai/assistant-prompts.ts`.
- Los modos disponibles se definen en `lib/ai/assistant-config.ts`.
- OpenAI solo se usa si `AI_PROVIDER=openai` y existe `OPENAI_API_KEY`.
- Si falta la clave, el proveedor no es `openai`, o OpenAI falla, Altiva vuelve al mock.
- `OPENAI_API_KEY` nunca debe exponerse en frontend ni usar prefijo `NEXT_PUBLIC_`.

Activar OpenAI localmente:

```txt
AI_PROVIDER=openai
AI_MODEL=gpt-5-mini
OPENAI_API_KEY=sk-...
```

Activar OpenAI en Vercel:

1. Entrar al proyecto en Vercel.
2. Ir a Settings > Environment Variables.
3. Agregar `AI_PROVIDER=openai`.
4. Agregar `AI_MODEL` con el modelo elegido.
5. Agregar `OPENAI_API_KEY` como secreto.
6. Redeploy.

Volver al modo mock:

```txt
AI_PROVIDER=mock
AI_MODEL=
OPENAI_API_KEY=
```

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
2. Mantener proveedores externos solo en backend.
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

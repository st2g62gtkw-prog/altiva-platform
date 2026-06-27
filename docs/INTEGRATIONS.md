# Integraciones futuras

Por ahora Altiva no conecta Supabase, Drive, Notion ni lectura real de documentos. La UI muestra solo la pagina Proyecto de Titulo con datos mock y chat IA flotante.

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

## Supabase futuro

Carpeta: `lib/db`

Variables:

```txt
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Uso esperado:

- Login.
- Persistencia de archivos registrados.
- Persistencia de fuentes.
- Persistencia de entregables.
- Historial de conversaciones.
- Permisos por usuario.

`SUPABASE_SERVICE_ROLE_KEY` solo debe usarse server-side.

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

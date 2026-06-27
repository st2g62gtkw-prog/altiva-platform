# Roadmap Altiva

## Fase 1: Base desplegable

- Web publica.
- App privada sin login real.
- Datos mock centralizados.
- Altiva Assistant V1 con API interna, prompt base, modos, proveedor mock y OpenAI opcional server-side.
- Deploy en Vercel.
- Documentacion de arquitectura e integraciones.

## Fase 2: Supabase y autenticacion

- Crear proyecto Supabase.
- Crear tablas iniciales.
- Implementar Supabase Auth.
- Proteger `/app`.
- Persistir proyectos.
- Persistir documentos, presupuestos y reportes.

## Fase 3: Drive y Notion

- Configurar OAuth de Google.
- Listar documentos desde Drive.
- Asociar documentos a proyectos.
- Configurar integracion Notion.
- Sincronizar tareas.
- Registrar estado de integraciones.

## Fase 4: IA real

- Activar OpenAI por entorno cuando exista clave real.
- Mantener fallback mock para desarrollo y errores controlados.
- Guardar conversaciones.
- Analizar presupuestos.
- Leer documentos autorizados.
- Preparar reportes automaticos.
- Agregar busqueda inteligente.
- Agregar evaluaciones de seguridad antes de usar documentos reales o datos de clientes.

## Fase 5: Plataforma profesional

- Multiples usuarios.
- Clientes y permisos.
- Roles por proyecto.
- Auditoria de cambios.
- Paneles por cliente.
- Escalabilidad operativa y seguridad avanzada.

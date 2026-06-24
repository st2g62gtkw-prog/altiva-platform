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

## Componentes

- `components/layout`: estructura general.
- `components/public`: tarjetas publicas.
- `components/dashboard`: tablas, alertas y resumen de proyectos.
- `components/chat`: interfaz del asistente.
- `components/ui`: piezas reutilizables pequenas.

## Datos

Los mocks viven en `data/mock.ts`. Las pantallas no deberian definir datos propios salvo constantes de UI muy locales.

Cuando Supabase exista, la migracion esperada es:

1. Mantener los tipos en `types/`.
2. Crear funciones de lectura en `lib/db`.
3. Reemplazar imports desde `data/mock.ts` por servicios tipados.
4. Mantener los componentes visuales sin conocer detalles de Supabase.

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

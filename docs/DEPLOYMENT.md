# Despliegue

## Local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Build

```bash
pnpm lint
pnpm build
```

## GitHub

```bash
git init
git add .
git commit -m "Initial Altiva platform"
git branch -M main
git remote add origin https://github.com/tu-usuario/altiva-platform.git
git push -u origin main
```

No subas `.env`, `.env.local` ni claves reales.

## Vercel

- Importar repositorio desde GitHub.
- Framework: Next.js.
- Install command: `pnpm install`.
- Build command: `pnpm build`.
- Output directory: vacio.
- Agregar variables de entorno.
- Deploy.

## Variables de entorno en Vercel

Configura primero:

```txt
NEXT_PUBLIC_SITE_URL=https://tu-proyecto.vercel.app
NEXT_PUBLIC_APP_NAME=Altiva
AUTH_PROTECTION_ENABLED=false
```

Agrega las demas variables solo cuando implementes cada integracion.

## Dominio propio

1. Compra el dominio en un registrador.
2. Agregalo en Vercel > Project > Domains.
3. Aplica los registros DNS indicados por Vercel.
4. Cambia `NEXT_PUBLIC_SITE_URL` al dominio final.
5. Ejecuta redeploy.
6. Revisa `/sitemap.xml`, `/robots.txt`, metadata y rutas publicas.

## Checklist de produccion inicial

- Build correcto.
- Rutas publicas cargan.
- `/app` carga en modo demo.
- `.env.local` no esta en git.
- `NEXT_PUBLIC_SITE_URL` apunta al dominio correcto.
- No hay claves reales en el codigo.
- Robots bloquea `/app` y `/login`.

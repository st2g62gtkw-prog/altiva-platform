import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/app",
        destination: "/",
        permanent: false
      },
      {
        source: "/app/:path*",
        destination: "/",
        permanent: false
      },
      {
        source: "/sobre-mi",
        destination: "/",
        permanent: false
      },
      {
        source: "/servicios",
        destination: "/",
        permanent: false
      },
      {
        source: "/contacto",
        destination: "/",
        permanent: false
      },
      {
        source: "/proyectos",
        destination: "/",
        permanent: false
      },
      {
        source: "/proyectos/:path*",
        destination: "/",
        permanent: false
      },
      {
        source: "/login",
        destination: "/",
        permanent: false
      }
    ];
  }
};

export default nextConfig;

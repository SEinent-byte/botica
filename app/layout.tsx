import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova Salud - Sistema de Gestión",
  description: "Sistema de gestión de inventario y ventas para botica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100">{children}</body>
    </html>
  );
}

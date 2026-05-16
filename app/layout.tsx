import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "P.M.O-STARTER | Da ideia ao PRD em minutos",
  description: "Ferramenta unificada de prototipagem e documentação para Product Managers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased bg-background">
        {children}
      </body>
    </html>
  );
}

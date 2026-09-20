import "./globals.css";

export const metadata = {
  title: "Suno Bénin 🇧🇯",
  description: "Crée ta chanson avec l'intelligence artificielle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
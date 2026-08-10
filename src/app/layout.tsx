import "./globals.css";
@import "tailwindcss";

export const metadata = {
  title: "TechPulse Studios",
  description: "Web & Mobile App Development Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
export const metadata = {
  title: "PaceKeeper",
  description: "A simple running log — track runs, distance, and pace over time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

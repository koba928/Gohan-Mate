import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gohan Mate",
  description: "気分でごはんを決めよう",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "react-graphiql-client",
  description: "react-graphiql-client rs_school react202434"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

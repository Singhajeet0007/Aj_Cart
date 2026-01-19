import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Provider";


export const metadata: Metadata = {
  title: "AJ_CART",
  description: "Aj-Vender e-commerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}

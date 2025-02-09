import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import {redirect} from "next/navigation";

const open_Sans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "everfit-test",
  description: "test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${open_Sans.variable}`}>
        {children}
      </body>
    </html>
  );
}

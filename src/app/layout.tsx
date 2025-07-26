import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-providers";
import Header from "./(public)/components/header/header";


export const metadata: Metadata = {
  title: "CommunityEvent ",
  description: "Community Event - A platform to create and manage community events",
  icons: {
    icon: '/iconsitepng.png', // caminho relativo ao `public/`
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning
    >

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

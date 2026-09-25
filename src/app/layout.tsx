import "./heritage-theme.css";
import "./globals.css";

import ThemeProvider from "@/components/theme/ThemeProvider";
import AuthSessionProvider from "@/components/auth/SessionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <AuthSessionProvider>
            {children}
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
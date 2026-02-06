import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/data/site";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | GIPP F.C.",
    default: `${SITE.name}`,
  },
  description: SITE.tagline,
  keywords: [
    "GIPP",
    "Good Intent Poor Product",
    "soccer",
    "football",
    "Brooklyn",
    "amateur soccer",
    "Group Stage NYC",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {/* Skip to content link for keyboard/screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

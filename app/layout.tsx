import type { Metadata } from "next";
import { DM_Mono, Libre_Baskerville, Manrope } from "next/font/google";
import "./globals.css";

const libre = Libre_Baskerville({ variable: "--font-libre", weight: ["400", "700"], subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const dmMono = DM_Mono({ variable: "--font-dm-mono", weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tone Lab — bookchaowalit",
  description: "An honest sentiment-analysis interface before the model is connected.",
  keywords: ["sentiment analyzer", "bookchaowalit", "language interface"],
  authors: [{ name: "bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "bookchaowalit",
  metadataBase: new URL("https://bookchaowalit.com"),
  alternates: { canonical: "https://bookchaowalit.com" },
  openGraph: { type: "website", locale: "en_US", url: "https://bookchaowalit.com", title: "Tone Lab — bookchaowalit", description: "An honest sentiment-analysis interface before the model is connected.", siteName: "Tone Lab", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Tone Lab" }] },
  twitter: { card: "summary_large_image", title: "Tone Lab — bookchaowalit", description: "An honest sentiment-analysis interface before the model is connected.", images: ["/og-image.png"], creator: "@bookchaowalit" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${libre.variable} ${manrope.variable} ${dmMono.variable}`}>{children}</body></html>;
}

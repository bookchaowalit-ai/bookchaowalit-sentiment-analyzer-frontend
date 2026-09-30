import type { Metadata } from "next";
import { DM_Mono, Libre_Baskerville, Manrope } from "next/font/google";
import "./globals.css";

const libre = Libre_Baskerville({ variable: "--font-libre", weight: ["400", "700"], subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const dmMono = DM_Mono({ variable: "--font-dm-mono", weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tone Lab — bookchaowalit",
  description: "A transparent, lexicon-based sentiment bench that runs in the browser.",
  keywords: ["sentiment analyzer", "bookchaowalit", "language interface"],
  authors: [{ name: "bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "bookchaowalit",
  metadataBase: new URL("https://bookchaowalit.com"),
  openGraph: { type: "website", locale: "en_US", title: "Tone Lab — bookchaowalit", description: "A transparent, lexicon-based sentiment bench that runs in the browser.", siteName: "Tone Lab" },
  twitter: { card: "summary", title: "Tone Lab — bookchaowalit", description: "A transparent, lexicon-based sentiment bench that runs in the browser.", creator: "@bookchaowalit" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${libre.variable} ${manrope.variable} ${dmMono.variable}`}>{children}</body></html>;
}

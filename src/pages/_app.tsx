import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <DefaultSeo
        title="KyotoType - Uji Kecepatan Mengetik Anda"
        description="Uji kecepatan mengetik Anda dengan tes typing interaktif. Bandingkan kecepatan mengetik Anda dan tingkatkan keterampilan mengetik Anda."
        openGraph={{
          type: 'website',
          url: 'https://kyoto-type.vercel.app/',
          title: 'Typing Speed Test',
          description: 'Uji kecepatan mengetik Anda dengan tes typing interaktif.',
          // images: [
          //   {
          //     url: 'https://example.com/og-image.jpg',
          //     width: 1200,
          //     height: 630,
          //     alt: 'Typing Speed Test',
          //   },
          // ],
        }}
      />
      <Component {...pageProps} />
    </main>

  )
}

import metadata from "@/metadata";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

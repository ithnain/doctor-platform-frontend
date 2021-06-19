import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preload" href="/assets/fonts/GOTHICB.ttf" as="font" crossOrigin="" />
                    <link rel="preload" href="/assets/fonts/GOTHIC.ttf" as="font" crossOrigin="" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

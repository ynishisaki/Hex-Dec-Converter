import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet='utf-8' />
                    <title>Hex-Dec Converter</title>
                    <meta
                        name='description'
                        content='Conversion tool between hexadecimal and decimal. It supports unsigned integers and signed integers.'
                    />
                    <meta
                        name='google-site-verification'
                        content='QCMAUI4zWwgmC1eVBN1F1WtdAIgZlYkqhl2Mj9X4mKA'
                    />
                    <meta name='author' content='monyo'></meta>
                    {/* set favicon */}
                    <link
                        rel='apple-touch-icon'
                        sizes='180x180'
                        href='/apple-touch-icon.png'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        sizes='32x32'
                        href='/favicon-32x32.png'
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        sizes='16x16'
                        href='/favicon-16x16.png'
                    />
                    <link rel='manifest' href='/site.webmanifest' />
                    <link
                        rel='mask-icon'
                        href='/safari-pinned-tab.svg'
                        color='#5bbad5'
                    />
                    <meta name='msapplication-TileColor' content='#da532c' />
                    <meta name='theme-color' content='#ffffff' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

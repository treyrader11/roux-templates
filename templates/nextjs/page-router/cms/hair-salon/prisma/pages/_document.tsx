import { Html, Head, Main, NextScript } from "next/document";

// Apply the stored theme before hydration to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var s=localStorage.getItem('lumiere-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

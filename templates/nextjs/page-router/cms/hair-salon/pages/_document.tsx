import { Html, Head, Main, NextScript } from "next/document";

// Apply the stored theme before hydration to avoid a flash.
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('rg-theme');
    var isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

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

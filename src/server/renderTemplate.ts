import { generateCsp } from 'Server/csp/csp';
import { APP_TITLE } from 'Config/config';

interface TemplateParams {
  cssPath: string;
  jsPath: string;
  content: string;
  data?: string;
}

function renderTemplate({
  cssPath, jsPath, content = '', data = '',
}: TemplateParams) {
  const sw = `        <script>
        function startServiceWorker() {
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then((registration) => {
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch((error) => {
              console.log('Client ServiceWorker registration failed: ', error);
            });
          });
        }
}

startServiceWorker();

        </script>
`;
  const [csp, nonce] = generateCsp();

  const useCSP = `
        <meta property="csp-nonce" content="${nonce}" />
        <meta http-equiv="Content-Security-Policy" content="${csp}" />
  `;

  return `<!DOCTYPE html>
  <html lang="en">
  <base href="/" />
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="Yandex Praktikum Middle frontend project. Arcanoid game. Nairobi crew. Aleh Belanouski & Nikolay Sidorov">
        <link rel="manifest" href="manifest.webmanifest">
        ${useCSP}
        <link rel="stylesheet" href="/${cssPath}" />

        <title>${APP_TITLE}</title>
      </head>
      <body>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${content}</div>

        <script nonce="${nonce}" type="application/json" id="data">${data.replace(/</g, '&lt;')}</script>
        <script src="/${jsPath}"></script>
        ${sw}
      </body>
  </html>`;
}

export default renderTemplate;

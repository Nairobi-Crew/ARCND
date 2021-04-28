interface TemplateParams {
  cssPath: string;
  jsPath: string;
  content: string;
  data?: string;
}

function renderTemplate({
  cssPath, jsPath, content = '', data = '',
}: TemplateParams) {
  return `<!DOCTYPE html>
  <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="/${cssPath}"/>

        <title>Sprint 7</title>
      </head>
      <body>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${content}</div>

        <script type="application/json" id="data">${data.replace(/</g, '&lt;')}</script>
        <script src="/${jsPath}"></script>
        <script>
        function startServiceWorker() {
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('client/service-worker.js').then((registration) => {
              // eslint-disable-next-line no-console
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch((error) => {
              // eslint-disable-next-line no-console
              console.log('Client ServiceWorker registration failed: ', error);
            });
          });
        }
}

startServiceWorker();

        </script>
      </body>
  </html>`;
}

export default renderTemplate;
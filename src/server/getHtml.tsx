// import { renderToStaticMarkup } from 'react-dom/server';
// import { bundleParams } from 'Server/types';
// import { STATIC_URL } from 'Config/config';
// import htmlescape from 'htmlescape';
// import React from 'react';
//
// export const getHtml = (params: bundleParams): string => {
//   const { name, html, data } = params;
//   const baseUrl = STATIC_URL;
//   const bundleFilePath = `${baseUrl}${name}.bundle`;
//   const vendorsFilePath = `${baseUrl}_/${vendorsMeta.name}`;
//
//   const htmlTemplate = renderToStaticMarkup(
//     <html>
//       <head>
//         <link rel="icon" type="image/png" href="/favicons/favicon.png" />
//         <link rel="stylesheet" href={`${bundleFilePath}.css`} />
//         <title>App</title>
//         {vendorsMeta.hasCss && <link rel="stylesheet" href={`${vendorsFilePath}.css`} />}
//       </head>
//       <body>
//       {/* eslint-disable-next-line react/no-danger */}
//         <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
//         {vendorsMeta.hasJs && <script src={`${vendorsFilePath}.js`} />}
//         <script src={`${bundleFilePath}.ru.js`} />
//         <script
//           {/* eslint-disable-next-line react/no-danger */}
//           dangerouslySetInnerHTML={{
//             __html: `Client.default(${htmlescape(data)});`,
//           }}
//         />
//       </body>
//     </html>,
//   );
//
//   return `<!doctype html>${htmlTemplate}`;
// };

import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const publicDir = new URL("../.output/public", import.meta.url).pathname;
const assetsDir = join(publicDir, "assets");


const files = readdirSync(assetsDir);
const css = files.find((f) => f.endsWith(".css")) ?? "";
const js1 = files.find((f) => f.startsWith("index-C") && f.endsWith(".js")) ?? "";
const js2 = files.find((f) => f.startsWith("index-D") && f.endsWith(".js")) ?? "";

const html = `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <title>CoachSpace</title>
    <link rel="stylesheet" href="/assets/${css}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${js1}"></script>
    <script type="module" src="/assets/${js2}"></script>
  </body>
</html>
`;

writeFileSync(join(publicDir, "index.html"), html);
console.log(`✅ index.html generated (css: ${css}, js: ${js1}, ${js2})`);

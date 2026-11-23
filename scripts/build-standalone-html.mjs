import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const assetsDir = path.join(distDir, 'assets');
const srcImagesDir = path.join(rootDir, 'src', 'assets', 'images');
const publicDir = path.join(rootDir, 'public');

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

function generateStandaloneHtml() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error('dist/index.html not found. Run vite build first.');
  }

  let html = fs.readFileSync(indexHtmlPath, 'utf-8');
  const assetFiles = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : [];

  const cssFiles = assetFiles.filter((f) => f.endsWith('.css'));
  const jsFiles = assetFiles.filter((f) => f.endsWith('.js'));
  const distImageFiles = assetFiles.filter((f) =>
    ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(
      path.extname(f).toLowerCase()
    )
  );

  // Map all dist/assets images -> data:<mime>;base64,...
  const imageDataMap = new Map();
  for (const imgFile of distImageFiles) {
    const fullPath = path.join(assetsDir, imgFile);
    const base64 = fs.readFileSync(fullPath).toString('base64');
    const mime = getMimeType(imgFile);
    const dataUri = `data:${mime};base64,${base64}`;
    imageDataMap.set(`/assets/${imgFile}`, dataUri);
    imageDataMap.set(`./assets/${imgFile}`, dataUri);
    imageDataMap.set(`assets/${imgFile}`, dataUri);
  }

  // Also map all src/assets/images/* paths as a fallback safety net
  if (fs.existsSync(srcImagesDir)) {
    const srcImgs = fs.readdirSync(srcImagesDir).filter((f) =>
      ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(
        path.extname(f).toLowerCase()
      )
    );
    for (const imgFile of srcImgs) {
      const fullPath = path.join(srcImagesDir, imgFile);
      const base64 = fs.readFileSync(fullPath).toString('base64');
      const mime = getMimeType(imgFile);
      const dataUri = `data:${mime};base64,${base64}`;
      imageDataMap.set(`/src/assets/images/${imgFile}`, dataUri);
      imageDataMap.set(`src/assets/images/${imgFile}`, dataUri);
    }
  }

  // Combine CSS
  let combinedCss = '';
  for (const cssFile of cssFiles) {
    let cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
    for (const [assetRef, dataUri] of imageDataMap.entries()) {
      cssContent = cssContent.split(assetRef).join(dataUri);
    }
    combinedCss += `\n/* ${cssFile} */\n` + cssContent;
  }

  // Combine JS and replace all image asset paths with inline base64 data URIs
  let combinedJs = '';
  for (const jsFile of jsFiles) {
    let jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8');
    for (const [assetRef, dataUri] of imageDataMap.entries()) {
      jsContent = jsContent.split(assetRef).join(dataUri);
    }
    // Escape "</script" inside JS strings so inline <script> tag never closes prematurely
    jsContent = jsContent.replace(/<\/script/gi, '<\\/script');
    combinedJs += `\n// ${jsFile}\n` + jsContent;
  }

  // Remove external <link rel="stylesheet" ... href="/assets/..."> and <script ... src="/assets/...">
  html = html.replace(
    /<link[^>]+rel=["']stylesheet["'][^>]+href=["']\.?\/?assets\/[^"']+["'][^>]*>/gi,
    ''
  );
  html = html.replace(
    /<script[^>]+src=["']\.?\/?assets\/[^"']+["'][^>]*><\/script>/gi,
    ''
  );

  // Inject inline <style> before </head> and inline <script type="module"> before </body>
  const styleBlock = `<style id="asa-standalone-styles">${combinedCss}</style>\n</head>`;
  html = html.replace('</head>', () => styleBlock);

  const scriptBlock = `<script type="module" id="asa-standalone-bundle">${combinedJs}</script>\n</body>`;
  html = html.replace('</body>', () => scriptBlock);

  const outPublicPath = path.join(publicDir, 'Asa_Luxury_Portal_Standalone.html');
  const outDistPath = path.join(distDir, 'Asa_Luxury_Portal_Standalone.html');

  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(outPublicPath, html, 'utf-8');
  fs.writeFileSync(outDistPath, html, 'utf-8');

  // Verify no un-inlined .jpg references remain
  const remainingJpgs = html.match(/["'][^"']*\.jpg["']/g) || [];
  const dataUriCount = (html.match(/data:image\/jpeg;base64,/g) || []).length;
  const sizeKb = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);

  console.log(
    `Standalone HTML generated: public/Asa_Luxury_Portal_Standalone.html (${sizeKb} KB)`
  );
  console.log(
    `Inlined Base64 JPEG count: ${dataUriCount} | Remaining external .jpg refs: ${remainingJpgs.length}`
  );
}

generateStandaloneHtml();

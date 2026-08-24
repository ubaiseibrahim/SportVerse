import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'privacy/index.html',
  'match/index.html',
  'tournament/index.html',
  'terms/index.html',
  'turf/index.html',
  'blog/index.html',
  'search/index.html',
  'dashboard/index.html',
  'player/index.html'
];

const pwaHeadTags = `
    <!-- PWA / Apple iOS Meta Tags -->
    <meta name="theme-color" content="#FFD400" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="ScoreVerse" />
    <link rel="apple-touch-icon" href="/playstore-icon.png" />
`;

const swScript = `
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker registration failed: ', err);
          });
        });
      }
    </script>
`;

filesToUpdate.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace old icon
  content = content.replace(/href="\/SportVerse\.png"/g, 'href="/playstore-icon.png"');
  
  // Add PWA head tags if not present
  if (!content.includes('apple-mobile-web-app-capable')) {
    content = content.replace('</head>', pwaHeadTags + '</head>');
  }
  
  // Add SW script if not present
  if (!content.includes('serviceWorker')) {
    content = content.replace('</body>', swScript + '</body>');
  }
  
  fs.writeFileSync(filePath, content);
  console.log('Updated', file);
});

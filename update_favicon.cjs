const fs = require('fs');
const path = require('path');

const files = [
  'player/index.html',
  'dashboard/index.html',
  'blog/index.html',
  'turf/index.html',
  'terms/index.html',
  'search/index.html',
  'match/index.html',
  'privacy/index.html',
  'tournament/index.html',
  'index.html'
];

for (const file of files) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<link rel="icon" type="image\/png" href="\/playstore-icon.png" \/>/g, '<link rel="icon" type="image/png" href="/favicon-round.png" />');
    fs.writeFileSync(filePath, content, 'utf8');
  }
}
console.log('Replaced playstore-icon with favicon-round in icon links');

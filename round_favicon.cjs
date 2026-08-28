const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'public/playstore-icon.png');
const outputPath = path.join(__dirname, 'public/favicon-round.png');

async function createRoundFavicon() {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  // Create a circular SVG mask
  const width = metadata.width;
  const height = metadata.height;
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2;

  const circleSvg = `<svg width="${width}" height="${height}">
    <circle cx="${cx}" cy="${cy}" r="${r}" />
  </svg>`;

  await image
    .composite([{ input: Buffer.from(circleSvg), blend: 'dest-in' }])
    .png()
    .toFile(outputPath);
    
  console.log('Created round favicon successfully');
}

createRoundFavicon().catch(console.error);

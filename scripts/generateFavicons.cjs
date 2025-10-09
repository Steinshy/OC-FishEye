const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, '../assets/favicons/logo.png');
const BASE = path.join(__dirname, '../assets/favicons');

const configs = [
  { dir: 'standard', sizes: [16, 32, 48, 96, 192, 512], prefix: 'favicon', bg: { r: 0, g: 0, b: 0, alpha: 0 } },
  { dir: 'apple', sizes: [57, 60, 72, 76, 114, 120, 144, 152, 180], prefix: 'apple-touch-icon', bg: { r: 255, g: 255, b: 255, alpha: 1 } },
  {
    dir: 'microsoft',
    tiles: [
      { w: 70, h: 70 },
      { w: 144, h: 144 },
      { w: 150, h: 150 },
      { w: 310, h: 310 },
      { w: 310, h: 150 },
    ],
    bg: { r: 144, g: 28, b: 28, alpha: 1 },
  },
];

const generate = async (w, h, bg, output) =>
  await sharp(SOURCE).resize(w, h, { fit: 'contain', background: bg }).png().toFile(output);

(async () => {
  if (!fs.existsSync(SOURCE)) {
    console.error(`❌ Source not found: ${SOURCE}`);
    process.exit(1);
  }

  try {
    for (const config of configs) {
      const dir = path.join(BASE, config.dir);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      if (config.sizes) {
        for (const size of config.sizes) {
          await generate(size, size, config.bg, path.join(dir, `${config.prefix}-${size}x${size}.png`));
        }
      } else if (config.tiles) {
        for (const tile of config.tiles) {
          await generate(tile.w, tile.h, config.bg, path.join(dir, `mstile-${tile.w}x${tile.h}.png`));
        }
      }
      console.log(`✅ Generated ${config.dir}`);
    }
    console.log('\n✨ Complete! Check assets/favicons/');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();

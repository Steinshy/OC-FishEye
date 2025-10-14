// Generate favicon images in multiple sizes and formats

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Source logo file path
const SOURCE = path.join(__dirname, '../assets/favicons/logo.png');

// Output directory for favicons
const BASE = path.join(__dirname, '../assets/favicons');

// Favicon configuration for different platforms
const CONFIGS = [
  {
    dir: 'standard',
    sizes: [16, 32, 48, 96, 192, 512],
    prefix: 'favicon',
    bg: { r: 0, g: 0, b: 0, alpha: 0 }
  },
  {
    dir: 'apple',
    sizes: [57, 60, 72, 76, 114, 120, 144, 152, 180],
    prefix: 'apple-touch-icon',
    bg: { r: 255, g: 255, b: 255, alpha: 1 }
  },
  {
    dir: 'microsoft',
    tiles: [
      { w: 70, h: 70 },
      { w: 144, h: 144 },
      { w: 150, h: 150 },
      { w: 310, h: 310 },
      { w: 310, h: 150 }
    ],
    bg: { r: 144, g: 28, b: 28, alpha: 1 }
  }
];

// Generate single favicon with specified dimensions
const generateFavicon = async (width, height, background, outputPath) => {
  await sharp(SOURCE)
    .resize(width, height, { fit: 'contain', background })
    .png()
    .toFile(outputPath);
};

// Create output directory if it does not exist
const ensureDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Process single configuration
const processConfig = async (config) => {
  const outputDir = path.join(BASE, config.dir);
  ensureDirectory(outputDir);

  if (config.sizes) {
    // Generate square icons
    for (const size of config.sizes) {
      const filename = `${config.prefix}-${size}x${size}.png`;
      await generateFavicon(size, size, config.bg, path.join(outputDir, filename));
    }
  } else if (config.tiles) {
    // Generate Microsoft tiles with custom dimensions
    for (const tile of config.tiles) {
      const filename = `mstile-${tile.w}x${tile.h}.png`;
      await generateFavicon(tile.w, tile.h, config.bg, path.join(outputDir, filename));
    }
  }

  console.log(`✅ Generated ${config.dir}`);
};

// Main execution function
const main = async () => {
  // Check if source file exists
  if (!fs.existsSync(SOURCE)) {
    console.error(`❌ Source not found: ${SOURCE}`);
    process.exit(1);
  }

  try {
    for (const config of CONFIGS) {
      await processConfig(config);
    }
    console.log('\n✨ Complete! Check assets/favicons/');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

main();

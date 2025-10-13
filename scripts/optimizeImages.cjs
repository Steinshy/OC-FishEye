const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  quality: { webp: 90, jpeg: 90 },
  desktop: { maxWidth: 1920, maxHeight: 1920 },
  mobile: { maxWidth: 768, maxHeight: 768 },
  supportedFormats: /\.(webp|jpg|jpeg)$/i
};

const stats = {
  desktop: { processed: 0, errors: 0, totalOriginalSize: 0, totalOptimizedSize: 0 },
  mobile: { processed: 0, errors: 0, totalOriginalSize: 0, totalOptimizedSize: 0 }
};

function formatBytes(bytes) {
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

async function optimizeImage(inputPath, outputPath, version) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const format = path.extname(inputPath).toLowerCase().replace('.', '');
    const config = version === 'mobile' ? CONFIG.mobile : CONFIG.desktop;

    let pipeline = image;

    if (metadata.width > config.maxWidth || metadata.height > config.maxHeight) {
      pipeline = pipeline.resize(config.maxWidth, config.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    if (format === 'webp') {
      await pipeline.webp({ quality: CONFIG.quality.webp }).toFile(outputPath);
    } else if (format === 'jpg' || format === 'jpeg') {
      await pipeline.jpeg({ quality: CONFIG.quality.jpeg, mozjpeg: true }).toFile(outputPath);
    } else {
      return null;
    }

    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;

    stats[version].processed++;
    stats[version].totalOriginalSize += originalSize;
    stats[version].totalOptimizedSize += optimizedSize;

    return { originalSize, optimizedSize };
  } catch (error) {
    stats[version].errors++;
    return null;
  }
}

async function processDirectory(directory, version) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath, version);
    } else if (entry.isFile() && CONFIG.supportedFormats.test(entry.name)) {
      const dir = path.dirname(fullPath);
      const ext = path.extname(fullPath);
      const name = path.basename(fullPath, ext);

      const outputPath = version === 'mobile'
        ? path.join(dir, `${name}.mobile${ext}`)
        : fullPath;

      const tempPath = `${outputPath}.tmp`;
      const result = await optimizeImage(fullPath, tempPath, version);

      if (result && fs.existsSync(tempPath)) {
        fs.renameSync(tempPath, outputPath);
      }
    }
  }
}

async function main() {
  const photographersDir = path.join(__dirname, '..', 'assets', 'photographers');
  const version = process.argv[2] || 'desktop';

  if (!['desktop', 'mobile'].includes(version)) {
    console.error('Usage: node optimizeImages.cjs [desktop|mobile]');
    process.exit(1);
  }

  console.log(`Optimizing images for ${version}...\n`);

  const startTime = Date.now();
  await processDirectory(photographersDir, version);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  const versionStats = stats[version];
  const saved = versionStats.totalOriginalSize - versionStats.totalOptimizedSize;
  const percent = versionStats.totalOriginalSize > 0
    ? ((saved / versionStats.totalOriginalSize) * 100).toFixed(1)
    : 0;

  console.log(`\nDone in ${duration}s`);
  console.log(`${versionStats.processed} images | ${formatBytes(saved)} saved (${percent}%)`);
  if (versionStats.errors > 0) console.log(`${versionStats.errors} errors`);
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});

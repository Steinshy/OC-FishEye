// Optimize images for desktop and mobile versions

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Image optimization configuration
const CONFIG = {
  quality: { webp: 90, jpeg: 90 },
  desktop: { maxWidth: 1920, maxHeight: 1920 },
  mobile: { maxWidth: 768, maxHeight: 768 },
  supportedFormats: /\.(webp|jpg|jpeg)$/i,
  validVersions: ['desktop', 'mobile']
};

// Processing statistics tracker
const stats = {
  desktop: { processed: 0, errors: 0, totalOriginalSize: 0, totalOptimizedSize: 0 },
  mobile: { processed: 0, errors: 0, totalOriginalSize: 0, totalOptimizedSize: 0 }
};

// Format bytes to readable size
const formatBytes = (bytes) => {
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

// Get file size in bytes
const getFileSize = (filePath) => fs.statSync(filePath).size;

// Update statistics for processed image
const updateStats = (version, originalSize, optimizedSize) => {
  stats[version].processed++;
  stats[version].totalOriginalSize += originalSize;
  stats[version].totalOptimizedSize += optimizedSize;
};

// Optimize single image file
const optimizeImage = async (inputPath, outputPath, version) => {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const format = path.extname(inputPath).toLowerCase().replace('.', '');
    const config = CONFIG[version];

    // Resize if needed
    let pipeline = image;
    const needsResize = metadata.width > config.maxWidth || metadata.height > config.maxHeight;

    if (needsResize) {
      pipeline = pipeline.resize(config.maxWidth, config.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Save with appropriate format and quality
    if (format === 'webp') {
      await pipeline.webp({ quality: CONFIG.quality.webp }).toFile(outputPath);
    } else if (format === 'jpg' || format === 'jpeg') {
      await pipeline.jpeg({ quality: CONFIG.quality.jpeg, mozjpeg: true }).toFile(outputPath);
    } else {
      return null;
    }

    // Update statistics
    const originalSize = getFileSize(inputPath);
    const optimizedSize = getFileSize(outputPath);
    updateStats(version, originalSize, optimizedSize);

    return { originalSize, optimizedSize };
  } catch (error) {
    stats[version].errors++;
    return null;
  }
};

// Get output path for optimized image
const getOutputPath = (filePath, version) => {
  if (version !== 'mobile') return filePath;

  const directory = path.dirname(filePath);
  const extension = path.extname(filePath);
  const basename = path.basename(filePath, extension);
  return path.join(directory, `${basename}.mobile${extension}`);
};

// Process single image file
const processImageFile = async (filePath, version) => {
  const outputPath = getOutputPath(filePath, version);
  const tempPath = `${outputPath}.tmp`;

  const result = await optimizeImage(filePath, tempPath, version);

  if (result && fs.existsSync(tempPath)) {
    fs.renameSync(tempPath, outputPath);
  }
};

// Process all images in directory recursively
const processDirectory = async (directory, version) => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath, version);
    } else if (entry.isFile() && CONFIG.supportedFormats.test(entry.name)) {
      await processImageFile(fullPath, version);
    }
  }
};

// Calculate and format savings statistics
const calculateSavings = (versionStats) => {
  const saved = versionStats.totalOriginalSize - versionStats.totalOptimizedSize;
  const percent = versionStats.totalOriginalSize > 0
    ? ((saved / versionStats.totalOriginalSize) * 100).toFixed(1)
    : 0;
  return { saved, percent };
};

// Display processing results
const displayResults = (duration, versionStats) => {
  const { saved, percent } = calculateSavings(versionStats);

  console.log(`\nDone in ${duration}s`);
  console.log(`${versionStats.processed} images | ${formatBytes(saved)} saved (${percent}%)`);

  if (versionStats.errors > 0) {
    console.log(`${versionStats.errors} errors`);
  }
};

// Main execution function
const main = async () => {
  const photographersDir = path.join(__dirname, '..', 'assets', 'photographers');
  const version = process.argv[2] || 'desktop';

  // Validate version argument
  if (!CONFIG.validVersions.includes(version)) {
    console.error(`Usage: node optimizeImages.cjs [${CONFIG.validVersions.join('|')}]`);
    process.exit(1);
  }

  console.log(`Optimizing images for ${version}...\n`);

  // Process all images and track time
  const startTime = Date.now();
  await processDirectory(photographersDir, version);
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  // Display results
  displayResults(duration, stats[version]);
};

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});

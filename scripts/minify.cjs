#!/usr/bin/env node

// Minify JS CSS or HTML files

const fs = require('fs');
const path = require('path');
const { minify } = require('minify');
const glob = require('glob');

// File patterns for each type
const PATTERNS = {
  js: 'assets/js/**/*.js',
  css: 'assets/css/**/*.css',
  html: '*.html'
};

// Valid file types
const VALID_TYPES = Object.keys(PATTERNS);

// Get minified filename (place next to source file)
const getMinifiedPath = (filePath) => {
  const extension = path.extname(filePath);
  const basename = path.basename(filePath, extension);
  const dirname = path.dirname(filePath);
  return path.join(dirname, `${basename}.min${extension}`);
};

// Check if file should be excluded
const shouldExclude = (filePath) => {
  return filePath.includes('.min.');
};

// Minify single file
const minifyFile = async (filePath, outputPath) => {
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const minified = await minify(filePath);
  fs.writeFileSync(outputPath, minified);
};

// Main execution function
const main = async () => {
  const target = process.argv[2];

  // Validate target argument
  if (!VALID_TYPES.includes(target)) {
    console.error(`Usage: node scripts/minify.cjs <${VALID_TYPES.join('|')}>`);
    process.exit(1);
  }

  try {
    // Find all files matching pattern
    const files = glob
      .sync(PATTERNS[target])
      .filter(file => !shouldExclude(file));

    if (!files.length) {
      console.log(`No ${target} files found`);
      return;
    }

    // Minify each file
    for (const file of files) {
      const outputPath = getMinifiedPath(file);
      await minifyFile(file, outputPath);
    }

    console.log(`✅ Minified ${files.length} ${target} file(s)`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

main();

#!/usr/bin/env node

/* eslint-env node */
const fs = require('fs');
const path = require('path');
const { minify } = require('minify');
const glob = require('glob');

const target = process.argv[2];
if (!['js', 'html'].includes(target)) {
  console.error('Usage: node scripts/minify.cjs <js|html>');
  process.exit(1);
}

const minifyFiles = async (pattern, outputDir) => {
  const files = glob.sync(pattern).filter(file => !file.includes('.min.') && !file.includes('minified/'));

  if (!files.length) {
    console.log(`No ${target} files found`);
    return;
  }

  console.log(`Minifying ${files.length} ${target} file(s)...`);

  for (const file of files) {
    try {
      const outputPath = path.join(outputDir, path.basename(file, path.extname(file)) + '.min' + path.extname(file));
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      const result = await minify(file);
      fs.writeFileSync(outputPath, result);

      console.log(`✓ ${file} → ${outputPath}`);
    } catch (error) {
      console.error(`✗ ${file}: ${error.message}`);
    }
  }
};

(async () => {
  try {
    if (target === 'js') {
      await minifyFiles('assets/js/**/*.js', 'assets/js/minified/');
    } else {
      await minifyFiles('*.html', 'minified/');
    }
    console.log(`✅ ${target.toUpperCase()} minification completed!`);
  } catch (error) {
    console.error('Minification failed:', error.message);
    process.exit(1);
  }
})();

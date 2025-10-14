#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { minify } = require('minify');
const glob = require('glob');

const [, , target] = process.argv;
const patterns = {
  js: 'assets/js/**/*.js',
  css: 'assets/css/**/*.css',
  html: '*.html'
};
const outputDirs = {
  js: 'assets/minified/js/',
  css: 'assets/minified/css/',
  html: 'assets/minified/html/'
};

if (!patterns[target]) {
  console.error('Usage: node scripts/minify.cjs <js|css|html>');
  process.exit(1);
}

(async () => {
  try {
    const files = glob.sync(patterns[target]).filter(f => !f.includes('.min.') && !f.includes('minified/'));
    if (!files.length) return console.log(`No ${target} files found`);

    for (const file of files) {
      const output = path.join(outputDirs[target], path.basename(file, path.extname(file)) + '.min' + path.extname(file));
      fs.mkdirSync(path.dirname(output), { recursive: true });
      fs.writeFileSync(output, await minify(file));
    }
    console.log(`✅ Minified ${files.length} ${target} file(s)`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();

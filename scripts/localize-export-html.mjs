import fs from "node:fs";
import path from "node:path";

const englishRoot = path.join(process.cwd(), "out", "en");

function htmlFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(target) : entry.name.endsWith(".html") ? [target] : [];
  });
}

const files = htmlFiles(englishRoot);
for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const localized = source.replace('<html lang="zh-CN"', '<html lang="en"');
  if (localized === source) throw new Error(`English export is missing the expected html language marker: ${file}`);
  fs.writeFileSync(file, localized);
}

console.log(`Localized ${files.length} English HTML files with lang=en.`);

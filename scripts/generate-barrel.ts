import { Project } from "ts-morph";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMPONENTS_DIR = resolve(__dirname, "../src/components");
const OUTPUT_FILE = join(COMPONENTS_DIR, "index.tsx");

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, "../tsconfig.json"),
});

const files = project.addSourceFilesAtPaths(`${COMPONENTS_DIR}/**/index.tsx`);

let output = `// Auto-generated with ts-morph. Do not edit manually.\n\n`;

for (const file of files) {
  const relativePath = path
    .relative(COMPONENTS_DIR, file.getFilePath())
    .replace(/\\/g, "/")
    .replace(/\/index\.tsx$/, "");

  const exportSymbols = file.getExportSymbols();

  if (exportSymbols.length > 0) {
    const names = exportSymbols.map((s) => s.getName());

    const defaultExport = names.find((n) => n === "default");
    const namedExports = names.filter((n) => n !== "default");

    if (defaultExport) {
      const name = path.basename(relativePath);
      output += `export { default as ${name} } from './${relativePath}';\n`;
    }

    if (namedExports.length > 0) {
      output += `export { ${namedExports.join(", ")} } from './${relativePath}';\n`;
    }
  } else {
    output += `// TODO: No exports found in './${relativePath}'\n`;
  }
}

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`Barrel file generated at ${OUTPUT_FILE}`);

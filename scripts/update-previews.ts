import {createElement, type ComponentType} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {StudioHeading, MetricCard, ProjectCard, StudioNotice, StudioLink} from '../src/components/demo.tsx';

// This is an explicit authoring script. Piny itself only reads the generated HTML.
const root = fileURLToPath(new URL('../', import.meta.url));
const check = process.argv.slice(2).includes('--check');
if (process.argv.slice(2).some(argument => argument !== '--check')) throw new Error('Use update-previews.ts [--check].');
const relative = (file: string) => path.join(root, file);
const manifest = JSON.parse(await readFile(relative('.piny/components.json'), 'utf8'));
const exports: Record<string, ComponentType<any>> = {StudioHeading, MetricCard, ProjectCard, StudioNotice, StudioLink};
const context = (card: boolean) => `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FORMA component preview</title><link rel="stylesheet" href="/src/style.css"><style>html,body{margin:0;min-height:100%;background:#f7f7f2}body{padding:${card ? '20px' : '28px'};box-sizing:border-box}#preview-stage{width:100%;max-width:100%}.metric-card{max-width:320px}.studio-heading{padding:0}</style></head><body class="forma-preview"><div id="preview-stage"></div></body></html>
`;
const output = new Map<string, string>([
  ['.piny/previews/context.html', context(false)],
  ['.piny/previews/card-context.html', context(true)],
]);
for (const component of Object.values(manifest.components) as any[]) {
  if (!component.examples) continue;
  const implementation = exports[component.source.export];
  if (!implementation) throw new Error(`No preview implementation for ${component.source.export}.`);
  for (const [id, example] of Object.entries(component.examples) as [string, any][]) {
    const preset = Object.values(component.presets || {}).find((candidate: any) => candidate.preview === id) as any;
    if (id !== 'default' && !preset) throw new Error(`Example ${component.source.export}/${id} needs an explicit preset.`);
    const props = {...component.insert.props, ...preset?.props};
    output.set(example.html, renderToStaticMarkup(createElement(implementation, props)) + '\n');
  }
}

const hash = (bytes: Buffer | string) => createHash('sha256').update(bytes).digest('hex');
const inputs = ['src/components/demo.tsx', 'src/components/ui/button.tsx', 'src/components/ui/card.tsx', 'src/style.css',
  'piny.project.json', '.piny/components.json', 'scripts/update-previews.ts', 'registry-sources.json',
  'public/images/casa-luma.jpg', 'public/images/form-objects.jpg', 'public/images/atelier-no-4.jpg'];
const inputHashes: Record<string, string> = {};
for (const file of inputs) inputHashes[file] = hash(await readFile(relative(file)));
const provenance = {
  version: 1,
  recipe: 'node --import tsx scripts/update-previews.ts',
  purpose: 'Reproducible static Library illustrations; these hashes are not a metadata review or runtime verification.',
  inputSha256: inputHashes,
  outputSha256: Object.fromEntries([...output].map(([file, html]) => [file, hash(html)])),
};
output.set('.piny/previews/provenance.json', JSON.stringify(provenance, null, 2) + '\n');
let changed = 0;
for (const [file, content] of output) {
  const existing = await readFile(relative(file), 'utf8').catch(() => null);
  if (existing === content) continue;
  changed++;
  if (check) {console.error(`Outdated static preview: ${file}`); continue;}
  await mkdir(path.dirname(relative(file)), {recursive: true});
  await writeFile(relative(file), content);
}
if (check && changed) process.exitCode = 1;
console.log(check ? `${output.size} static preview files checked; ${changed} outdated.` : `${output.size} static preview files generated; ${changed} updated.`);

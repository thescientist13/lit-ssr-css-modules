import fs from 'node:fs/promises';
import { render, html } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import './components/greeting/greeting.js';

const OUTPUT_DIR = new URL('./public/', import.meta.url);
const OUTPUT_FILE = new URL('./index.html', OUTPUT_DIR);

// assumes OUTPUT DIR does not already exist
await fs.mkdir(OUTPUT_DIR);

const greetingResult = html`
  <simple-greeting></simple-greeting>
  <simple-greeting name="SSR"></simple-greeting>
`;
const greetingHtml = await collectResult(render(greetingResult));

console.log({ greetingHtml });

await fs.writeFile(OUTPUT_FILE, greetingHtml);
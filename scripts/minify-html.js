import { default as htmlnano } from 'htmlnano';

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const { max } = htmlnano.presets;

const htmlnanoOptions = {};
const postHtmlOptions = {};

async function getHtmlFilePath(dirPath, filter) {
	if (!filter) {
		filter = (filePath) => {
			return filePath.endsWith('.html');
		};
	}

	return readdir(dirPath, { encoding: 'utf-8', withFileTypes: true, recursive: true })
		.then((filePaths) => {
			const res = [];
			for (const filePath of filePaths) {
				const fullPath = join(filePath.parentPath, filePath.name);
				if (filePath.isFile() && filter(fullPath)) {
					res.push(fullPath);
				}
			}
			return res;
		})
		.catch((err) => {
			console.error(`Error reading path: ${dirPath}:`, err);
		});
}

const htmlFiles = await getHtmlFilePath('build');

console.log(htmlFiles);

let logTable = [];
let pms = [];
for (const filePath of htmlFiles) {
	if (filePath.endsWith('.html')) {
		pms.push(
			readFile(filePath, { encoding: 'utf8' }).then((oldHtml) => {
				console.log('reading file:', filePath);
				return htmlnano.process(oldHtml, max, htmlnanoOptions, postHtmlOptions).then((result) => {
					console.log(`htmlnano processing: ${filePath}`, result.messages);
					const newHtml = result.html;
					return writeFile(filePath, newHtml)
						.then((res) => {
							if (!res) {
								console.log(`Writen to ${filePath}`);
							}
						})
						.catch((err) => {
							console.err(`Failed to write ${filePath}`, err);
						})
						.finally(() => {
							logTable.push({
								path: filePath,
								oldLength: oldHtml.length,
								newLength: newHtml.length,
								LengthChange: newHtml.length - oldHtml.length
							});
						});
				});
			})
		);
	}
}
await Promise.all(pms).finally(() => {
	console.table(logTable);
});

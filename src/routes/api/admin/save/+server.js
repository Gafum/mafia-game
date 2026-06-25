import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

// Get all existing Lucide Icon
import * as AllLucideIcons from 'lucide-svelte';

function updateIconRegistry(iconFilePath, bigDescriptionList) {
	let customImportLines = [];
	let customIconKeys = [];

	// Get all existing Lucide Icon names
	const validLucideNames = new Set(Object.keys(AllLucideIcons));

	// Read existing file and extract only valid custom imports
	if (fs.existsSync(iconFilePath)) {
		const currentContent = fs.readFileSync(iconFilePath, 'utf-8');
		const lines = currentContent.split('\n');

		for (const line of lines) {
			const trimmed = line.trim();

			// Check if it's a valid import statement
			if (
				trimmed.startsWith('import ') &&
				trimmed.includes('from') &&
				!trimmed.includes("from 'lucide-svelte'") &&
				!trimmed.includes('from "lucide-svelte"')
			) {
				customImportLines.push(line);

				const defaultMatch = trimmed.match(/^import\s+(\w+)\s+from\s+/);
				if (defaultMatch) {
					customIconKeys.push(defaultMatch[1]);
				}
			}
		}
	}

	// Collect icons from bigDescriptionList
	const iconNamesFromData = new Set();

	for (const roleKey of Object.keys(bigDescriptionList)) {
		const icon = bigDescriptionList[roleKey]?.icon;
		if (icon && typeof icon === 'string' && icon.trim()) {
			iconNamesFromData.add(icon.trim());
		}
	}

	if (iconNamesFromData.size > 0) {
		iconNamesFromData.add('CircleQuestionMark');
	}

	// PROTECT: Lucide block includes:
	// - NOT custom components
	// - Icons that EXIST in lucide-svelte (protection from non-existent cards)
	const lucideIconNames = [...iconNamesFromData]
		.filter(name => !customIconKeys.includes(name) && validLucideNames.has(name))
		.sort((a, b) => a.localeCompare(b));

	// Log in server console if admin entered non-existent icon
	const invalidIcons = [...iconNamesFromData].filter(name => !customIconKeys.includes(name) && !validLucideNames.has(name));
	if (invalidIcons.length > 0) {
		console.warn(`[Admin Server] Warning! These icons do not exist in Lucide and were ignored:`, invalidIcons);
	}

	// Generate file content from scratch
	const header = [
		'// src/lib/components/icons.js',
		'// ─────────────────────────────────────────────────────────────────────────────',
		'// CENTRALIZED ICON REGISTRY — auto-updated by the admin save endpoint.',
		'// ─────────────────────────────────────────────────────────────────────────────\n'
	].join('\n');

	const lucideImport = lucideIconNames.length > 0
		? `import {\n${lucideIconNames.map(name => `\t${name == 'CircleQuestionMark' ? name + ', //Default import - ID' : name.toString()}`).join(',\n')}\n} from 'lucide-svelte';\n`
		: `// No Lucide icons used currently\n`;

	const customImportsBlock = customImportLines.length > 0
		? '\n// ── Custom SVG icon components ──────────────────────────────────────────────\n' + customImportLines.join('\n') + '\n'
		: '\n// ── No custom SVG icons registered ──────────────────────────────────────────\n';

	const allExportKeys = Array.from(new Set([...lucideIconNames, ...customIconKeys])).sort((a, b) => a.localeCompare(b));

	const exportBlock = `\nexport const Icons = {\n${allExportKeys.map(name => `\t${name},`).join('\n')}\n};`;

	const newContent = header + lucideImport + customImportsBlock + exportBlock;

	fs.writeFileSync(iconFilePath, newContent, 'utf-8');
	console.log(
		`[Admin Server] Icon registry updated. Lucide: ${lucideIconNames.length}, Custom: ${customIconKeys.length}`
	);
}

export async function POST({ request, url }) {
	const isDevelopment = process.env.NODE_ENV === 'development' || import.meta.env?.DEV;
	const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';

	if (!isDevelopment || !isLocalhost) {
		return json({ error: 'Forbidden. Local development environment only.' }, { status: 403 });
	}

	try {
		const formData = await request.formData();

		const cardRulesConstStr = formData.get('cardRulesConst');
		const cardListStr = formData.get('cardList');
		const bigDescriptionListStr = formData.get('bigDescriptionList');

		// Dynamic absolute paths calculated relative to the runtime project execution root
		const dataDir = path.resolve(process.cwd(), 'src/lib/data');
		const assetsDir = path.resolve(process.cwd(), 'static/assets/cards');
		const iconFilePath = path.resolve(process.cwd(), 'src/lib/components/icons.js');

		// Create directory if it does not exist
		if (!fs.existsSync(assetsDir)) {
			fs.mkdirSync(assetsDir, { recursive: true });
		}

		// 1. Process and save freshly uploaded images
		for (const [key, value] of formData.entries()) {
			if (key.startsWith('file_') && value instanceof File) {
				const filename = key.replace('file_', '');
				const buffer = Buffer.from(await value.arrayBuffer());
				const targetImagePath = path.join(assetsDir, `${filename}.png`);
				fs.writeFileSync(targetImagePath, buffer);
			}
		}

		// 2. Overwrite local master json configurations
		if (cardRulesConstStr) {
			fs.writeFileSync(
				path.join(dataDir, 'cardRulesConst.json'),
				JSON.stringify(JSON.parse(cardRulesConstStr), null, 2)
			);
		}

		if (cardListStr) {
			const parsedCardList = JSON.parse(cardListStr);
			fs.writeFileSync(
				path.join(dataDir, 'cardList.json'),
				JSON.stringify(parsedCardList, null, 2)
			);

			// 3. CLEANUP ENGINE: Delete physical files that are no longer referenced in cardList
			const activeImageNames = new Set(parsedCardList.map((card) => `${card.myImg}.png`));

			if (fs.existsSync(assetsDir)) {
				const filesOnDisk = fs.readdirSync(assetsDir);
				filesOnDisk.forEach((file) => {
					if (file.endsWith('.png') && !activeImageNames.has(file)) {
						try {
							fs.unlinkSync(path.join(assetsDir, file));
							console.log(`[Server] Deleted orphaned card image from disk: ${file}`);
						} catch (err) {
							console.error(`[Server] Failed to delete file ${file}:`, err);
						}
					}
				});
			}
		}

		if (bigDescriptionListStr) {
			const parsedBigDescriptionList = JSON.parse(bigDescriptionListStr);

			// 4. Save the JSON data
			fs.writeFileSync(
				path.join(dataDir, 'bigDescriptionList.json'),
				JSON.stringify(parsedBigDescriptionList, null, 2)
			);

			// 5. Auto-update the icon registry to include all role icons
			try {
				updateIconRegistry(iconFilePath, parsedBigDescriptionList);
			} catch (iconErr) {
				// Non-fatal: log the error but don't fail the whole save operation
				console.error('[Admin Server] Failed to update icon registry:', iconErr);
			}
		}

		return json({ success: true, message: 'Конфігурацію збережено, застарілі фото видалено.' });
	} catch (error) {
		console.error('[Admin Server Error]:', error);
		return json({ error: `Помилка обробки: ${error.message}` }, { status: 500 });
	}
}

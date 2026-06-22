import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

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
			fs.writeFileSync(
				path.join(dataDir, 'bigDescriptionList.json'),
				JSON.stringify(JSON.parse(bigDescriptionListStr), null, 2)
			);
		}

		return json({ success: true, message: 'Конфігурацію збережено, застарілі фото видалено.' });
	} catch (error) {
		console.error('[Admin Server Error]:', error);
		return json({ error: `Помилка обробки: ${error.message}` }, { status: 500 });
	}
}

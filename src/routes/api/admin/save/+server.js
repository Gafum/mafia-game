import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export async function POST({ request, url }) {
	const isDevelopment = process.env.NODE_ENV === 'development' || import.meta.env?.DEV;
	const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';

	if (!isDevelopment || !isLocalhost) {
		return json({ error: 'Forbidden. Admin access is strictly local development only.' }, { status: 403 });
	}

	try {
		const data = await request.json();
		
		const dataDir = path.resolve(process.cwd(), 'src/lib/data');

		if (data.cardRulesConst) {
			fs.writeFileSync(path.join(dataDir, 'cardRulesConst.json'), JSON.stringify(data.cardRulesConst, null, 2));
		}
		if (data.cardList) {
			fs.writeFileSync(path.join(dataDir, 'cardList.json'), JSON.stringify(data.cardList, null, 2));
		}
		if (data.bigDescriptionList) {
			fs.writeFileSync(path.join(dataDir, 'bigDescriptionList.json'), JSON.stringify(data.bigDescriptionList, null, 2));
		}
		if (data.gameRules) {
			fs.writeFileSync(path.join(dataDir, 'gameRules.json'), JSON.stringify(data.gameRules, null, 2));
		}

		return json({ success: true, message: 'Files overwritten successfully.' });
	} catch (error) {
		console.error('Failed to save admin data:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

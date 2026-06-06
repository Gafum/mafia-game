import {
	Shield,
	Crosshair,
	HeartPulse,
	UserCheck,
	Briefcase,
	Bomb,
	HatGlasses,
	User,
	Drama,
	Brain
} from 'lucide-svelte';

// Standard data for the game with all roles. It contains max value for mans and mafias
export const cardRulesConst = {
	mans: 24, // max amount of mans is 24
	mafias: 20, // max amount of mafias is 20
	cop: true,
	doctor: true,
	kamikaze: false,
	maniac: false,
	security: false,
	lawyer: false,
	agent: false,
	idiot: false
};

// All possible Cards data. Here you can add or change cards
// Sprites in the static folder must have the same word as in this list, also tags must be the same as in the cardRulesConst
export const cardList = [
	{
		description: 'Ти коли таким бандитом став?',
		myImg: 'Man1',
		tag: 'mans'
	},
	{
		description: 'Квасний Сас',
		myImg: 'Man2',
		tag: 'mans'
	},
	{
		description: 'Та я мирний мен',
		myImg: 'Man3',
		tag: 'mans'
	},
	{
		description: 'Майнкрафт - топ!!!',
		myImg: 'Man4',
		tag: 'mans'
	},
	{
		description: 'Вабшето це я Глеб!',
		myImg: 'Man5',
		tag: 'mans'
	},
	{
		description: 'Якщо тобі не сподобається стрижка, то ...',
		myImg: 'Mafia1',
		tag: 'mafias'
	},
	{
		description: 'Ільящер',
		myImg: 'Mafia2',
		tag: 'mafias'
	},
	{
		description: 'Мото-мото в клубі',
		myImg: 'Mafia3',
		tag: 'mafias'
	},
	{
		description: 'Sangre por sangre',
		myImg: 'Mafia4',
		tag: 'mafias'
	},
	{
		description: 'Вам пора в дурку',
		myImg: 'Doctor',
		tag: 'doctor'
	},
	{
		description: 'Чорний плащ! Чооорний плащ',
		myImg: 'Commissar',
		tag: 'cop'
	},
	{
		description: 'Я йду за тобою!',
		myImg: 'Maniac',
		tag: 'maniac'
	},
	{
		description: 'Завжди було цікаво - що якщо зʼїсти корсар 1',
		myImg: 'Kamikaze',
		tag: 'kamikaze'
	},
	{
		description: 'Тобі потрібно більше тренуватися!',
		myImg: 'Security',
		tag: 'security'
	},
	{
		description: 'Better call Saul',
		myImg: 'Lawyer',
		tag: 'lawyer'
	},
	{
		description: 'Я Глєбік, чесно чесно!',
		myImg: 'Agent',
		tag: 'agent'
	},
	{
		description: 'ЕЕЕЕЕЕ',
		myImg: 'Idiot',
		tag: 'idiot'
	}
];

// All possible roles of cards with description and icons. Here you can change description and icons
export const bigDescriptionList = {
	mans: {
		description:
			'Персонажі, що виживають у боротьбі з мафією і намагаються вивести її на чисту воду. Відбір кандидатів на роль мафії відбувається під час денного голосування.',
		icon: User,
		name: 'Мирний'
	},
	mafias: {
		description:
			'Злочинці, що діють у нічний час та скоюють вбивства городян. Вдень персонаж зливається з натовпом і виглядає як звичайний мешканець. Знаком пробудження гангстерів стає фраза ведучого «місто засинає, прокидається «мафія» чи його аналоги. Після її виголошення члени мафіозного клану знайомляться між собою та домовляються про майбутні жертви.',
		icon: HatGlasses,
		name: 'Мафія'
	},
	cop: {
		description:
			'Персонаж прокидається вночі, щоб визначити серед учасників мафію. Ця інформація допомагає йому вплинути на рішення громадян у денному голосуванні. Втім, героєві не можна видати себе, щоб мафія не обрала його наступною нічною жертвою.',
		icon: Shield,
		name: 'Шериф'
	},
	doctor: {
		description:
			'Персонаж із числа мирних жителів, здатний вилікувати вибраного містянина. Прокидається він після дій мафії і здатний спасти від гибелі одного з гравців у разі вдалого попадання. Одного персонажа не можна лікувати дві ночі підряд!',
		icon: HeartPulse,
		name: 'Лікар'
	},
	kamikaze: {
		description:
			'Якщо Камікадзе був вбитий мафією або вилучений під час голосування, то він вибирає одного з інших гравців, якого забере із собою на той світ.',
		icon: Bomb,
		name: 'Камікадзе'
	},
	maniac: {
		description:
			'Вбиває учасників, але не належить до жодного угруповання. Вночі обирає собі жертву як серед мафії, і серед городян.',
		icon: Crosshair,
		name: 'Маньяк'
	},
	security: {
		description:
			'Гравець, який обирає і захищає іншого гравця від можливої атаки мафії. Якщо Охоронець правильно вибере ціль мафії, то він сам гине, а обрана ним жертва залишається живою.',
		icon: UserCheck,
		name: 'Охоронець'
	},
	lawyer: {
		description:
			'Він може вказати на іншого гравця протягом ночі, вибраний гравець не може бути обрана жертвою на наступний день пíд час голосування. Адвокат здатний забезпечити безпеку, дозволяючи іншому вижити вíд лінчування та продовжити гру. Одного персонажа не можна захищати двi ночі підряд!',
		icon: Briefcase,
		name: 'Адвокат'
	},
	agent: {
		description:
			'Агент під прикриттям прокидається вночі разом із мафією, знає їх у обличчя та бачить, кого вони обирають жертвою. При цьому мафіозі вважають його своїм, бо не знають, що він агент. Йому потрібно тонко маніпулювати голосуванням на користь мирних. *Для комісара це мафія',
		icon: Drama,
		name: 'Агент'
	},
	idiot: {
		description:
			'Це роль мирного жителя, якого неможливо вбити вночі, бо «він нікому не відчиняє двері». Єдиний спосіб прибрати його з гри - це вигнати на денному голосуванні загальним рішенням міста.',
		icon: Brain,
		name: 'Дурачок'
	}
};

// All game rules. Here you can change rules or add new ones
export const gameRules = [
	'Розподіл ролей: Почнемо з того, що всі гравці отримують свої ролі. Є дві основні групи ролей: мафія і мирні мешканці. Мафія діє у таємниці та намагається залишати свою ідентичність прихованою, в той час як мирні мешканці намагаються розкрити мафію.',
	'Нічні раунди: Гра складається з нічних і денних раундів. У нічному раунді мафія збирається і вибирає свою жертву. Решта гравців ролі не розкривають і спостерігають, що відбувається під час ночі.',
	'Денні раунди: Денний час гравці обговорюють події, які сталися під час ночі, та вирішують, кого вони вважають членом мафії. Голосування проводиться з метою виключити гравця з гри. Особа з найбільшою кількістю голосів вилучається з гри, і її роль розкривається.',
	'Перемога: Гра триває до тих пір, поки одна з груп не переможе. Якщо мафія зможе видалити всіх мирних мешканців, вони переможуть. Якщо мирні мешканці викривають всіх членів мафії, вони переможуть.Гра завершується, коли досягається ця умова.'
];

export const iconMap = {
	Shield,
	Crosshair,
	HeartPulse,
	UserCheck,
	Briefcase,
	Bomb,
	HatGlasses,
	User,
	Drama,
	Brain
};

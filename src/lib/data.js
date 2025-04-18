export const gameRules = [
   {
      title: "Розподіл ролей",
      description: "Почнемо з того, що всі гравці отримують свої ролі. Є дві основні групи ролей: мафія і мирні мешканці. Мафія діє у таємниці та намагається залишати свою ідентичність прихованою, в той час як мирні мешканці намагаються розкрити мафію."
   },
   {
      title: "Нічні раунди",
      description: "Гра складається з нічних і денних раундів. У нічному раунді мафія збирається і вибирає свою жертву. Решта гравців ролі не розкривають і спостерігають, що відбувається під час ночі.",
   },
   {
      title: "Денні раунди",
      description: " денний час гравці обговорюють події, які сталися під час ночі, та вирішують, кого вони вважають членом мафії. Голосування проводиться з метою виключити гравця з гри. Особа з найбільшою кількістю голосів вилучається з гри, і її роль розкривається."
   },
   {
      title: "Перемога",
      description: "Гра триває до тих пір, поки одна з груп не переможе. Якщо мафія зможе видалити всіх мирних мешканців, вони переможуть.Якщо мирні мешканці викривають всіх членів мафії, вони переможуть.Гра завершується, коли досягається ця умова."
   }
]

export const bigDescriptionList = {
   mans: "Персонажі, що виживають у боротьбі з мафією і намагаються вивести її на чисту воду. Відбір кандидатів на роль мафії відбувається під час денного голосування.",
   mafias: "Злочинці, що діють у нічний час та скоюють вбивства городян. Вдень персонаж зливається з натовпом і виглядає як звичайний мешканець. Знаком пробудження гангстерів стає фраза ведучого «місто засинає, прокидається «мафія» чи його аналоги. Після її виголошення члени мафіозного клану знайомляться між собою та домовляються про майбутні жертви.",
   doctor: "Персонаж із числа мирних жителів, здатний вилікувати вибраного горожанина. Прокидається він після дій мафії і здатний спасти від гибелі одного з гравців у разі вдалого попадання. Одного персонажа не можна лікувати дві ночі підряд!",
   cop: "Персонаж прокидається вночі, щоб визначити серед учасників мафію. Ця інформація допомагає йому вплинути на рішення громадян у денному голосуванні. Втім, героєві не можна видати себе, щоб мафія не обрала його наступною нічною жертвою.",
   maniac: "Вбиває учасників, але не належить до жодного угруповання. Вночі обирає собі жертву як серед мафії, і серед городян.",
   kamikaze: "Якщо Камікадзе був вбитий мафією або вилучений під час голосування, то він вибирає одного з інших гравців, якого забере із собою на той світ.",
   security: "Гравець, який обирає і захищає іншого гравця від можливої атаки мафії. Якщо Охоронець правильно вибере ціль мафії, то він сам гине, а обрана ним жертва залишається живою.",
   lawyer: "Він може вказати на іншого гравця протягом ночі, вибраний гравець не може бути обрана жертвою на наступний день під час голосування. Адвокат здатний забезпечити безпеку, дозволяючи іншому вижити від лінчування та продовжити гру. Одного персонажа не можна захищати дві ночі підряд!"
}

export const cardList =
   //Spreites in the static folder must have the same work as in this list, also tags must be the same as in the bigDescriptionList
   [
      {
         name: 'Мирний',
         description: 'Квасний Сас',
         myImg: 'Man1',
         tag: "mans"
      },
      {
         name: 'Мирний',
         description: 'Ти коли таким бандитом став?',
         myImg: 'Man2',
         tag: "mans"
      },
      {
         name: 'Мирний',
         description: 'Та я мириний мен',
         myImg: 'Man3',
         tag: "mans"
      },
      {
         name: 'Мирний',
         description: 'Майнкрафт - топ!!!',
         myImg: 'Man4',
         tag: "mans"
      },
      {
         name: 'Мирний',
         description: 'Гра-мафія за 3 дня!',
         myImg: 'Man5',
         tag: "mans"
      },
      {
         name: 'Мафія',
         description: 'Якщо тобі не сподобається стрижка, то ...',
         myImg: 'Mafia1',
         tag: "mafias"
      },
      {
         name: 'Мафія',
         description: 'Ільящер',
         myImg: 'Mafia2',
         tag: "mafias"
      },
      {
         name: 'Мафія',
         description: 'Мото-мото в клубі',
         myImg: 'Mafia3',
         tag: "mafias"
      },
      {
         name: 'Мафія',
         description: 'Sangre por sangre',
         myImg: 'Mafia4',
         tag: "mafias"
      },
      {
         name: 'Лікар',
         description: 'Вам пора в дурка',
         myImg: 'Doctor',
         tag: "doctor"
      },
      {
         name: 'Коміссар',
         description: 'Чорний плащ! Чооорний плащ',
         myImg: 'Commissar',
         tag: "cop"
      },
      {
         name: 'Маньяк',
         description: 'Я йду за тобою!',
         myImg: 'Maniac',
         tag: "maniac"
      },
      {
         name: 'Камікадзе',
         description: 'Завжди було цікаво - що якщо зʼїсти карсар 1',
         myImg: 'Kamikaze',
         tag: "kamikaze"
      },
      {
         name: 'Охоронець',
         description: 'Тобі потрібно більше тренеруватися!',
         myImg: 'Security',
         tag: "security"
      },
      {
         name: 'Адвокат',
         description: 'Better call Saul',
         myImg: 'Lawyer',
         tag: "lawyer"
      },
   ];
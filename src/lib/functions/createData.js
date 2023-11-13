import { cardList } from "$lib/data";
import Randomizer from "$lib/Servises/Randomizer.servise";

export default function createArray({ mans, mafias, withDoctor, withCop, withKamikaze, withManiac, withSecurity, withLawyer }) {

   let result = [];

   for (let i = 0; i < mans; i++) {
      const mansList = cardList.filter(element => element.tag === 'mans');
      if (mansList.length > 0) {
         result.push(mansList[Randomizer.randomInteger(0, mansList.length - 1)]);
      }
   }

   for (let i = 0; i < mafias; i++) {
      const mafiaList = cardList.filter(element => element.tag === 'mafias');
      if (mafiaList.length > 0) {
         result.push(mafiaList[Randomizer.randomInteger(0, mafiaList.length - 1)]);
      }
   }

   const tagsToInclude = {
      doctor: withDoctor,
      cop: withCop,
      kamikaze: withKamikaze,
      maniac: withManiac,
      security: withSecurity,
      lawyer: withLawyer,
   };

   result = [...result, ...cardList.filter(element => tagsToInclude[element.tag])];

   return Randomizer.shuffleArray(result);
}

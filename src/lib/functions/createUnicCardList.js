import { cardList, bigDescriptionList } from "$lib/data";
import Randomizer from "$lib/Servises/Randomizer.servise";


export default function createUniqueCardList() {
   const tagMap = {};

   for (const card of cardList) {
      if (!tagMap[card.tag]) {
         tagMap[card.tag] = [];
      }
      tagMap[card.tag].push(card);
   }

   return Object.entries(tagMap).map(([tag, cards]) => {
      const selectedElement = cards[Randomizer.randomInteger(0, cards.length - 1)];
      return {
         ...selectedElement,
         bigDescription: bigDescriptionList[tag],
      };
   });
}
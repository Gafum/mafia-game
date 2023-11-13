import { cardList, bigDescriptionList } from "$lib/data";
import Randomizer from "$lib/Servises/Randomizer.servise";


export default function createUnicCardList() {
   const uniqueTags = {};
   let filteredList = [];

   cardList.forEach((card) => {
      card.bigDescription = bigDescriptionList[card.tag]
      if (!uniqueTags[card.tag]) {
         uniqueTags[card.tag] = true;
         filteredList.push(card);
      } else {
         if (Randomizer.randomInteger(0, 10) > 6) {
            filteredList[filteredList.length - 1] = card;
         }
      }
   });

   return filteredList;
}
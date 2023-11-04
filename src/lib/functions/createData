import { cardList } from "$lib/data";
import Randomizer from "$lib/Servises/Randomizer.servise";

export default function createArray({ mans, mafias, withDoctor, withCop, withKamikaze, withManiac, withSecurity, withLawyer }) {

   let result = [];

   let mansList = cardList.filter((element) => {
      if (element.tag == "mans") {
         return element;
      }
   })

   for (let i = 0; i < mans; i++) {
      result.push(mansList[Randomizer.randomInteger(0, mansList.length - 1)]);
   }

   let mafiaList = cardList.filter((element) => {
      if (element.tag == "mafias") {
         return element;
      }
   })

   for (let i = 0; i < mafias; i++) {
      result.push(mafiaList[Randomizer.randomInteger(0, mafiaList.length - 1)]);
   }

   if (withDoctor) {
      result.push(cardList.find((element) => {
         if (element.tag == "doctor") {
            return element;
         }
      }));
   }

   if (withCop) {
      result.push(cardList.find((element) => {
         if (element.tag == "cop") {
            return element;
         }
      }));
   }

   if (withKamikaze) {
      result.push(cardList.find((element) => {
         if (element.tag == "kamikaze") {
            return element;
         }
      }));
   }

   if (withManiac) {
      result.push(cardList.find((element) => {
         if (element.tag == "maniac") {
            return element;
         }
      }));
   }

   if (withSecurity) {
      result.push(cardList.find((element) => {
         if (element.tag == "security") {
            return element;
         }
      }));
   }

   if (withLawyer) {
      result.push(cardList.find((element) => {
         if (element.tag == "lawyer") {
            return element;
         }
      }));
   }

   return Randomizer.shuffleArray(result);
}

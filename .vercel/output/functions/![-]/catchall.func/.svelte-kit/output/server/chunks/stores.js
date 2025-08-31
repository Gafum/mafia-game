import { w as writable } from "./index.js";
const cardRules = writable({
  mans: 4,
  mafias: 1,
  withDoctor: true,
  withCop: true,
  withKamikaze: false,
  withManiac: false,
  withSecurity: false,
  withLawyer: false
});
export {
  cardRules as c
};

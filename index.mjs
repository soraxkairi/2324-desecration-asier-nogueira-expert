import apiData from "./gameService.mjs";
import { getVillain,getSuperHero,getDado100C,getDado20C,getDado3C} from "./functions.mjs";
import { Erudito } from "./eruditoClass.mjs";
import { gameStart } from "./gameController.mjs";

const villainZarate = getVillain(apiData);

const superHero = getSuperHero(apiData);

const ElErudito = new Erudito("El Erudito X.G",0);
console.log(ElErudito);

const D100C = getDado100C();
const D20C = getDado20C();
const D3C = getDado3C();

gameStart(villainZarate,superHero,D100C,D20C,D3C,ElErudito);
// console.log(D100C);
// console.log(D20C);
// console.log(D3C);


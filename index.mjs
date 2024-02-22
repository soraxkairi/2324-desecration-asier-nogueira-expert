import { getVillain, getSuperHero } from "./functions.mjs";
import { gameStart } from "./gameController.mjs";
import { getData } from "./gameService.mjs";

async function initializeGame() {
    try {
        const data = await getData();
        const villainZarate = getVillain(data);
        const superHero = getSuperHero(data);

        gameStart(villainZarate, superHero);
    } catch (error) {
        // Manejar errores, por ejemplo, imprimir en la consola
        console.error('Error al inicializar el juego:', error);
    }
}

initializeGame();
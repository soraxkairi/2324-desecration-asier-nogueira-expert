import { getDado } from "./functions.mjs";
import { Erudito } from "./eruditoClass.mjs";

let turn = 0;
let eruditoIsDead = false;

function gameStart(villain, superHero) {
    console.log(`${villain.name} VS ${superHero.name}`);
    console.log("--------------------------------------------------");
    const players = [];
    let round = 1;
    let property = 0;

    let eruditoTurn = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
    if (villain.powerstats.intelligence > superHero.powerstats.intelligence) {
        players.push(villain);
        players.push(superHero);
    }
    else {
        players.push(superHero);
        players.push(villain);
    }

    let valueEruditoHitpoints = getDado(20);
    let EruditoCreated = new Erudito("El erudito X.G", property, valueEruditoHitpoints);
    console.log(EruditoCreated);

    while (villain.powerstats.hitpoints > 0 && superHero.powerstats.hitpoints > 0) {
        console.log("-----------------------------------------");
        console.log(`ROUND: ${round}`);

        if (eruditoTurn === round && eruditoIsDead === false) {

            eruditoTurn += (Math.random() * (6 - 3 + 1)) + 3;
            console.log("El erudito ha aparecido");
            EruditoCreated.angerLevel = getDado(20);
            angerMode(EruditoCreated, players);


        }
        else {

            if (turn === 0) {
                console.log(`El ASALTO ES DE: ${players[turn].name}`);
                throwDices(players);

                turn = 1;
            }
            else if (turn === 1) {

                console.log(`EL ASALTO ES DE: ${players[turn].name}`);

                throwDices(players);
                turn = 0;
            }
        }
        round++;



    }

    players.forEach((element) => {
        if (element.powerstats.hitpoints < 0) {
            console.log(`${element.name} HA SIDO DERROTADO`)
        }
    })


}



function throwDices(player) {
    let diceValue = getDado(100);
    console.log(`Valor del dado: ${diceValue}`);
    if (diceValue <= player[turn].powerstats.combat) {
        console.log("Exito al lanzar dado");
        dice20C(player);

        return player;
    }
    else {
        console.log("Fallo, el dado tiene un valor mas alto que tu combate, cambio de turno");
        return player;

    }
}

function angerMode(erudito, player) {
    const dice10C = getDado(10);
    const diceValue = getDado(20);
    console.log(erudito);
    if (erudito.angerLevel > 0 && erudito.angerLevel < 4) {
        console.log("PIFIA ATAQUE ")
        player[turn].powerstats.hitpoints -= diceValue;
        player[turn].powerstats.strength = Math.floor(player[turn].powerstats.strength / 2);
        console.log(`${player[turn].name} ha recibido el daño `);
        console.log(`${player[turn].powerstats}`);


    }
    else if (erudito.angerLevel > 3 && erudito.angerLevel < 7) {
        console.log("PIFIA ATAQUE ")
        player[turn].powerstats.hitpoints -= diceValue;
        player[turn].powerstats.strength = Math.floor(player[turn].powerstats.strength / 2);
        console.log(`${player[turn].name} ha recibido el daño `);
        console.log(`${player[turn].powerstats}`);


    }
    else if (erudito.angerLevel > 6 && erudito.angerLevel < 10) {
        console.log("CAOS no ha pasado nada");

    }
    else if (erudito.angerLevel > 9 && erudito.angerLevel < 14) {
        console.log("AULLIDO");
        let diceValue = getDado(10);
        erudito.hitpointsNoGlass -= diceValue;
        if (erudito.hitpointsNoGlass < 0)
        {
            console.log(`${erudito.name} ha recibido el daño: ${erudito.hitpointsNoGlass}`);
            console.log("EL ERUDITO A MUERTO");
            eruditoIsDead = true;
        }


    }
    else if (erudito.angerLevel > 13 && erudito.angerLevel < 17) {
        console.log("GRANUJA");
        if (turn === 0) {
            player[turn + 1].powerstats.gafas = true;
            player[turn].powerstats.gafas = false;
        }
        else {
            player[turn - 1].powerstats.gafas = true;
            player[turn].powerstats.gafas = false;
        }
        player.forEach((element) => {
            if (element.powerstats.gafas === true)
            {
                console.log(`${element.name} se ha llevado las gafas`);
                console.log(element.powerstats);
            }
        })

    }
    else if (erudito.angerLevel > 16 && erudito.angerLevel < 19) {
        console.log("PERSPICAZ");
        let diceValue = dice10C;
        erudito.hitpointsNoGlass -= diceValue;
        console.log(`${erudito.name} ha recibido el daño}`);
        console.log(`${erudito}`);


        if (erudito.hitpointsNoGlass < 0) {
            console.log("EL ERUDITO A MUERTO");
            eruditoIsDead = true;
        }
    }
    else {
        console.log("ENDEMONIADO");
        console.log("EL ERUDITO A MUERTO POR LO QUE SUS GAFAS DESAPARECEN Y EL JUGADOR QUE LAS LLEVA LAS PERDERA");
        eruditoIsDead = true;
        player.forEach((element) => {
            if (element.gafas === true) {
                element.gafas = false;
            }
            console.log(element.name);
            console.log(element.powerstats);
        })


    }

}


function dice20C(player) {
    let diceValue = getDado(20);;
    let damage = 0;
    let indexDice = 0;
    let dice3Cvalue = 0;
    let dice5Cvalue = 0;
    console.log(`El jugador obtiene un valor de: ${diceValue}`);


    if (diceValue > 0 && diceValue < 3) {
        console.log("PIFIA EL JUGADOR ACTUAL RECIBIRA EL DAÑO");

        if (diceValue === 1) {
            while (indexDice < 1) {
                dice3Cvalue += getDado(3);
                indexDice++;
            }
            damage = Math.floor(player[turn].powerstats.speed / dice3Cvalue);

            console.log(`${player[turn].name} received damage: HITPOINTS: ${player[turn].powerstats.hitpoints}`);
            player.forEach((element) => {
                console.log(element.name);
                console.log(element.powerstats);
            })
            return player;

        }

        else {
            while (indexDice < 4) {
                dice3Cvalue += getDado(3);
                indexDice++;
            }
            damage = Math.floor(player[turn].powerstats.speed / dice3Cvalue);

            player[turn].powerstats.hitpoints -= damage;
            console.log("DAMAGE:", damage);

            console.log(`${player[turn].name} received damage: HITPOINTS: ${player[turn].powerstats.hitpoints}`);
            player.forEach((element) => {
                console.log(element.name);
                console.log(element.powerstats);
            })



            return player;


        }

    }
    else if (diceValue > 2 && diceValue < 18) {
        console.log("NORMAL");
        if (turn === 0) {
            damage = Math.floor((player[turn].powerstats.strength + player[turn].powerstats.power) * (diceValue / 100));
            player[turn + 1].powerstats.hitpoints -= damage;
            console.log("DAMAGE:", damage);
            console.log(`${player[turn + 1].name} received damage: HITPOINTS: ${player[turn + 1].powerstats.hitpoints}`);
            player.forEach((element) => {
                console.log(element.name);
                console.log(element.powerstats);
            })

            return player;

        }
        else {
            damage = (player[turn].powerstats.strength + player[turn].powerstats.power) * diceValue;
            player[turn - 1].powerstats.hitpoints -= damage;
            console.log("DAMAGE:", damage);

            console.log(`${player[turn - 1].name} received damage: HITPOINTS: ${player[turn - 1].powerstats.hitpoints}`);
            player.forEach((element) => {
                console.log(element.name);
                console.log(element.powerstats);
            })

            return player;

        }
    }
    else {
        console.log("DAÑO CRITICO");
        switch (diceValue) {
            case 18:
                while (indexDice < 1) {
                    dice3Cvalue = getDado(3);
                    indexDice++;
                }
                damage = Math.floor((player[turn].powerstats.intelligence * player[turn].powerstats.durability * dice3Cvalue) / 100);
                if (turn === 0) {
                    player[turn + 1].powerstats.hitpoints -= damage;

                    console.log("DAMAGE:", damage);
                    console.log(`${player[turn + 1].name} received damage: HITPOINTS: ${player[turn + 1].powerstats.hitpoints}`);
                    player.forEach((element) => {
                        console.log(element.name);
                        console.log(element.powerstats);
                    })
                }
                else {

                    player[turn - 1].powerstats.hitpoints -= damage;
                    console.log("DAMAGE:", damage);
                    console.log(`${player[turn - 1].name} received damage: HITPOINTS: ${player[turn - 1].powerstats.hitpoints}`);
                    player.forEach((element) => {
                        console.log(element.name);
                        console.log(element.powerstats);
                    })


                }
                return player;


            case 19:
                while (indexDice < 2) {
                    dice3Cvalue = + getDado(3);;
                    indexDice++;
                }
                damage = Math.floor((player[turn].powerstats.intelligence * player[turn].powerstats.durability * dice3Cvalue) / 100);

                if (turn === 0) {
                    player[turn + 1].powerstats.hitpoints -= damage;
                    console.log("DAMAGE:", damage);

                    console.log(`${player[turn + 1].name} received damage: HITPOINTS: ${player[turn + 1].powerstats.hitpoints}`);

                    player.forEach((element) => {
                        console.log(element.name);
                        console.log(element.powerstats);
                    })
                }
                else {
                    player[turn - 1].powerstats.hitpoints -= damage;
                    console.log("DAMAGE:", damage);

                    console.log(`${player[turn - 1].name} received damage: HITPOINTS: ${player[turn - 1].powerstats.hitpoints}`);

                    player.forEach((element) => {
                        console.log(element.name);
                        console.log(element.powerstats);
                    })

                }
                return player

            case 20:
                while (indexDice < 3) {
                    dice5Cvalue = + getDado(5);
                    indexDice++;
                }
                damage = Math.floor((player[turn].powerstats.intelligence * player[turn].powerstats.durability * dice5Cvalue) / 100);

                if (turn === 0) {
                    player[turn + 1].powerstats.hitpoints -= damage;
                    console.log("DAMAGE:", damage);

                    console.log(`${player[turn + 1].name} received damage: HITPOINTS: ${player[turn + 1].powerstats.hitpoints}`);
                    player.forEach((element) => {
                        console.log(element.name);
                        console.log(element.powerstats);
                    })

                }
                else {
                    player[turn - 1].powerstats.hitpoints -= damage;
                    console.log("DAMAGE:", damage);

                    console.log(`${player[turn - 1].name} received damage: HITPOINTS: ${player[turn - 1].powerstats.hitpoints}`);
                    player.forEach((element) => {
                        console.log(element.name);
                        console.log(element.powerstats);
                    })
                    turn--;

                }
                return player

        }
    }

}

export {
    gameStart,
}
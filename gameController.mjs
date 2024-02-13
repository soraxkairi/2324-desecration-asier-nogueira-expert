import { getDado5C } from "./functions.mjs";

let turn = 0;

function gameStart(villain, superHero, D100C, D20C, D3C) {
    console.log(`${villain.name} VS ${superHero.name}`);
    console.log("--------------------------------------------------");
    const players = [];
    let round = 1;
    if (villain.powerstats.intelligence > superHero.powerstats.intelligence) {
        players.push(villain);
        players.push(superHero);
    }
    else {
        players.push(superHero);
        players.push(villain);
    }

    while (villain.powerstats.hitpoints > 0 && superHero.powerstats.hitpoints > 0) {
        
        console.log(`ROUND: ${round}`);
        
        if (turn === 0) {
            console.log(`TURNO DE ${players[turn].name}`);
            throwDices(D100C, D20C, D3C, players);

            turn = 1;
            round++;
        }
        else if (turn === 1){

            console.log(`TURNO DE ${players[turn].name}`);

            throwDices(D100C, D20C, D3C, players);
            turn = 0;
            round++;
        }
    }

    players.forEach( (element) => {
        if (element.powerstats.hitpoints < 0)
        {
            console.log(`${element.name} HA PERDIDO EL COMBATE`)
        }
    })
    players.forEach ( (element) => {
        if (element.powerstats.hitpoints > 0)
        {
            console.log(`${element.name} HA GANADO EL COMBATE`)
        } 
    })
}



function throwDices(D100C, D20C, D3C, player) {
    let diceValue = D100C[Math.floor(Math.random() * D100C.length)];
    console.log(`Valor del dado 100 caras: ${diceValue}`);
    if (diceValue <= player[turn].powerstats.combat) {
        console.log("Exito al lanzar dado de 100 caras");
        dice20C(D20C, player, D3C);

        return player;
    }
    else {
        console.log("Fallo, el dado tiene un valor mas alto que tu combate");
        return player;

    }
}




function dice20C(D20C, player, D3C) {
    let diceValue = D20C[Math.floor(Math.random() * D20C.length)];
    let damage = -1;
    let indexDice = 0;
    let dice3Cvalue = 0;
    let dice5Cvalue = 0;
    console.log(`Valor del dado de 20 caras: ${diceValue}`);



    const dice5C = getDado5C();

    if (diceValue > 0 && diceValue < 3) {
        console.log("PIFIA EL JUGADOR ACTUAL RECIBIRA EL DAÑO");

        if (diceValue === 1) {
            while (indexDice < 1) {
                dice3Cvalue += D3C[Math.floor(Math.random() * D3C.length)]
                indexDice++;
            }
            damage = Math.floor(player[turn].powerstats.speed / dice3Cvalue);

            console.log(`${player[turn].name} received damage: HITPOINTS: ${player[turn].powerstats.hitpoints}`);
            return player;


        }

        else {
            while (indexDice < 4) {
                dice3Cvalue += D3C[Math.floor(Math.random() * D3C.length)]
                indexDice++;
            }
            damage = Math.floor(player[turn].powerstats.speed / dice3Cvalue);

            player[turn].powerstats.hitpoints -= damage;
            console.log("DAMAGE", damage);

            console.log(`${player[turn].name} received damage: HITPOINTS: ${player[turn].powerstats.hitpoints}`);

            return player;


        }

    }
    else if (diceValue > 2 && diceValue < 18) {
        console.log("NORMAL");
        if (turn === 0) {
            damage = (player[turn].powerstats.strength + player[turn].powerstats.power) * (diceValue / 100);
            player[turn + 1].powerstats.hitpoints -= damage;
            console.log("DAMAGE", damage);
            console.log(`${player[turn + 1].name} received damage: HITPOINTS: ${player[turn + 1].powerstats.hitpoints}`);

            return player;

        }
        else {
            damage = (player[turn].powerstats.strength + player[turn].powerstats.power) * diceValue;
            player[turn - 1].powerstats.hitpoints -= damage;
            console.log("DAMAGE", damage);

            console.log(`${player[turn - 1].name} received damage: HITPOINTS: ${player[turn - 1].powerstats.hitpoints}`);

            return player;

        }
    }
    else {
        console.log("DAÑO CRITICO");
        switch (diceValue) {
            case 18:
                while (indexDice < 1) {
                    dice3Cvalue = D3C[Math.floor(Math.random() * D3C.length)]
                    indexDice++;
                }
                damage = (player[turn].powerstats.intelligence * player[turn].powerstats.durability * dice3Cvalue) / 100;
                if (turn === 0) {
                    player[turn + 1].powerstats.hitpoints -= damage;

                    console.log("DAMAGE", damage);
                    console.log(`${player[turn + 1].name} received damage: HITPOINTS: ${player[turn + 1].powerstats.hitpoints}`);

                }
                else {
                    player[turn - 1].powerstats.hitpoints -= damage;

                    console.log(`${player[turn - 1].name} received damage: HITPOINTS: ${player[turn - 1].powerstats.hitpoints}`);


                }
                return player;


            case 19:
                while (indexDice < 2) {
                    dice3Cvalue = + D3C[Math.floor(Math.random() * D3C.length)];
                    indexDice++;
                }
                damage = (player[turn].powerstats.intelligence * player[turn].powerstats.durability * dice3Cvalue) / 100;

                if (turn === 0) {
                    player[turn + 1].powerstats.hitpoints -= damage;

                    console.log(`${player[turn + 1].name} received damage: HITPOINTS: ${player[turn + 1].powerstats.hitpoints}`);

                }
                else {
                    player[turn - 1].powerstats.hitpoints -= damage;

                    console.log(`${player[turn - 1].name} received damage: HITPOINTS: ${player[turn - 1].powerstats.hitpoints}`);


                }
                return player

            case 20:
                while (indexDice < 3) {
                    dice5Cvalue = + dice5C[Math.floor(Math.random() * dice5C.length)];
                    indexDice++;
                }
                damage = (player[turn].powerstats.intelligence * player[turn].powerstats.durability * dice5Cvalue) / 100;

                if (turn === 0) {
                    player[turn + 1].powerstats.hitpoints -= damage;
                    console.log(`${player[turn + 1].name} received damage: HITPOINTS: ${player[turn + 1].powerstats.hitpoints}`);
                }
                else {
                    player[turn - 1].powerstats.hitpoints -= damage;
                    console.log(`${player[turn - 1].name} received damage: HITPOINTS: ${player[turn - 1].powerstats.hitpoints}`);
                    turn--;
                    

                }
                return player

        }
    }

}

export {
    gameStart,
}
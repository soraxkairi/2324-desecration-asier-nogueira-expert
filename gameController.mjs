import { getDado5C,getDado10C } from "./functions.mjs";
import { Erudito } from "./eruditoClass.mjs";

let turn = 0;

function gameStart(villain, superHero, D100C, D20C, D3C,ElErudito) {
    console.log(`${villain.name} VS ${superHero.name}`);
    console.log("--------------------------------------------------");
    const players = [];
    let round = 1;
    let eruditoChances = 0;
    let eruditoIsCreated = false;
    let property = -1;
    let EruditoCreated;
    
    if (villain.powerstats.intelligence > superHero.powerstats.intelligence) {
        players.push(villain);
        players.push(superHero);
    }
    else {
        players.push(superHero);
        players.push(villain);
    }
    
    players.forEach((element) => {
        element.powerstats.gafas = false;
        console.log(element);
    });
    while (villain.powerstats.hitpoints > 0 && superHero.powerstats.hitpoints > 0) {
        
        if (turn === 0) {

            console.log(`ROUND: ${round}`);
            console.log(`TURNO DE ${players[turn].name}`);
            if (players[turn].powerstats.gafas === true)
            {
                console.log("El jugador ha queado mareado y se ha quitado las gafas");
                console.log("El erudito ha recuperado las gafas y desaparecera");
                EruditoCreated = null;
                continue;
            }
            if (eruditoChances >= 3 && eruditoIsCreated != null) {
                let chance = Math.floor(Math.random() * 3 + 1);
                if (chance === 2 || eruditoChances > 5)
                {
                    console.log("EL ERUDITO HA APARECIDO ESTE TURNO NO SE ACTUA");
                    property = dice20CErudito(D20C);
                    if (!eruditoIsCreated)
                    {
                        let eruditoGlasses = property + 1;
                        EruditoCreated = new Erudito("El erudito X.G",property,eruditoGlasses);
                        console.log(EruditoCreated);
                    }
                    angerMode(EruditoCreated,property,players);
                    eruditoChances  = 0;
                    if (turn === 0)
                    {
                        turn = 1;
                    }
                    else if (turn === 1) {
                        turn = 0;
                    }
                }
            }
            throwDices(D100C, D20C, D3C, players);

            turn = 1;
            round++;
            eruditoChances++;
        }
        else if (turn === 1){
            console.log(`ROUND: ${round}`);
            console.log(`TURNO DE ${players[turn].name}`);
            if (players[turn].powerstats.gafas === true)
            {
                console.log("El jugador ha queado mareado y se ha quitado las gafas");
                console.log("El erudito ha recuperado las gafas y desaparecera");
                EruditoCreated = null;
                continue;
            }
            if (eruditoChances >= 3 && eruditoIsCreated != null) {
                let chance = Math.floor(Math.random() * 3 + 1);
                if (chance === 2 || eruditoChances > 5)
                {
                    console.log("EL ERUDITO HA APARECIDO ESTE TURNO NO SE ACTUA");
                    property = dice20CErudito(D20C);
                    if (!eruditoIsCreated)
                    {
                        let eruditoGlasses = property + 1;
                        EruditoCreated = new Erudito("El erudito X.G",property,eruditoGlasses);
                    }
                    angerMode(EruditoCreated,property,players);
                    eruditoChances  = 0;
                    if (turn === 0)
                    {
                        turn = 1;
                    }
                    else if (turn === 1) {
                        turn = 0;
                    }
                }
            }


            throwDices(D100C, D20C, D3C, players);
            turn = 0;
            round++;
            eruditoChances++;
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


function angerMode(erudito, diceValue,player){
    const dice10C = getDado10C();
    console.log(erudito);
    
    if (erudito.angerLevel > 0 && erudito.angerLevel < 4)
    {
        console.log("PIFIA ATAQUE ")
        player[turn].powerstats.hitpoints -= diceValue;
        player[turn].powerstats.strength =  Math.floor(player[turn].powerstats.strength/2);
        console.log(`${player[turn].name} ha recibido el daño ${player[turn].powerstats}`);

    }
    else if (erudito.angerLevel > 3 && erudito.angerLevel < 7)
    {
        console.log("PIFIA ATAQUE ")
        player[turn].powerstats.hitpoints -= diceValue;
        player[turn].powerstats.strength =  Math.floor(player[turn].powerstats.strength/2);
        console.log(`${player[turn].name} ha recibido el daño ${player[turn].powerstats}`);

    }
    else if (erudito.angerLevel > 6 && erudito.angerLevel < 10)
    {
        console.log("CAOS no ha pasado nada");

    }
    else if (erudito.angerLevel > 9 && erudito.angerLevel < 14)
    {
        console.log("AULLIDO");
        let diceValue = dice10C[Math.floor(Math.random() * dice10C.length)];
        erudito.hitpointsNoGlass -= diceValue;
        if (erudito.hitpointsNoGlass < 0)
        console.log(`${erudito.name} ha recibido el daño: ${erudito.hitpointsNoGlass}`);
        {
            console.log("EL ERUDITO A MUERTO");
        }


    }
    else if (erudito.angerLevel > 13 && erudito.angerLevel < 17)
    {
        console.log("GRANUJA");
        if (turn === 0)
        {
            player[turn + 1].powerstats.gafas = true;
            player[turn - 1].powerstats.gafas = false;

        }
        else {
        player[turn - 1].powerstats.gafas = true;
        player[turn + 1].powerstats.gafas = false;
        }
        console.log("El adversario se ha llevado las gafas");
    }
    else if (erudito.angerLevel > 16 && erudito.angerLevel < 19)
    {
        console.log("PERSPICAZ");
        let diceValue = dice10C[Math.floor(Math.random() * dice10C.length)];
        erudito.hitpointsNoGlass -= diceValue;
        console.log(`${erudito.name} ha recibido el daño: ${erudito.hitpointsNoGlass}`);

        if (erudito.hitpointsNoGlass < 0)
        {
            console.log("EL ERUDITO A MUERTO");
        }
    }
    else {
        console.log("ENDEMONIADO");
        console.log("EL ERUDITO A MUERTO POR LO QUE SUS GAFAS DESAPARECEN");
        player.forEach((element) => {
            if (element.gafas === true)
            {
                element.gafas = false;
            }
        })


    }

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


function dice20CErudito(D20C) {
    let diceValue = D20C[Math.floor(Math.random() * D20C.length)];
    console.log(`Valor del dado de 20 caras : ${diceValue}`);
    return diceValue;

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
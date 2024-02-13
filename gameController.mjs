


function gameStart(villain, superHero, D100C, D20C, D3C) {
    let player1 = -1;
    let player2 = -1;
    let turn = player1;
    if (villain.powerstats.intelligence > superHero.powerstats.intelligence)
    {
        player1 = villain;
        player2 = superHero;
    }
    else {
        player1 = superHero;
        player2 = villain;
    }
    while (villain.powerstats.hitpoints >= 0 || superHero.powerstats.hitpoints >= 0) {
        switch (turn) {
            case player1:
                console.log("El Villano falla su ataque.");
                break;
            case player2:
                const villainAttack = Math.floor(Math.random() * villain.powerstats.strength) + 1;
                superHero.powerstats.hitpoints -= villainAttack;
                console.log(`Villano ataca al Superhéroe causando ${villainAttack} puntos de daño.`);
                break;
        }
    }
}


export {
    gameStart,
}
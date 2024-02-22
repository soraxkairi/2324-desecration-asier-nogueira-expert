
function getVillain(data){
    let villain = data.find(element => element.name === "Junkpile");
    villain.powerstats.hitpoints = villain.powerstats.strength * 10;
    return villain
}

function getSuperHero(data){
    let superHero = -1;
    superHero = data[Math.floor(Math.random() * data.length)];
    superHero.powerstats.hitpoints = superHero.powerstats.strength * 10;
    if (superHero.powerstats.hitpoints > 666)
    {
        superHero.powerstats.hitpoints = 666;
    }
    return superHero;
    
}

function getDado(index){
    let value = Math.floor(Math.random() * index) + 1;
    return value
}

export {
    getVillain,
    getSuperHero,
    getDado,
}
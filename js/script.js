let hour = new Date().getHours();

if (hour < 12) {
    document.getElementById("greeting").innerHTML = "Good morning. Maomao is already sorting herbs.";
} else if (hour < 18) {
    document.getElementById("greeting").innerHTML = "Good afternoon. The consorts are asking for remedies.";
} else {
    document.getElementById("greeting").innerHTML = "Good evening. The palace lamps are lit, and Maomao is still working.";
}

let hasGinger = false;
let hasLicorice = false;
let hasGinseng = false;
let hasLily = false;

function showHerb(herb) {
    if (herb === "ginger") {
        document.getElementById("herbLabel").innerHTML = "Ginger: warms the body and settles the stomach.";
    } else if (herb === "licorice") {
        document.getElementById("herbLabel").innerHTML = "Licorice: sweet, and it softens bitter medicine.";
    } else if (herb === "ginseng") {
        document.getElementById("herbLabel").innerHTML = "Ginseng: for strength after a long illness.";
    } else if (herb === "lily") {
        document.getElementById("herbLabel").innerHTML = "Lily bulb: calms the mind. Careful with the flower.";
    }
}

function hideHerb() {
    document.getElementById("herbLabel").innerHTML = "Hover over a drawer to read its label.";
}

function toggleHerb(herb) {
    if (herb === "ginger") {
        hasGinger = !hasGinger;
        setDrawer("ginger", hasGinger);
    } else if (herb === "licorice") {
        hasLicorice = !hasLicorice;
        setDrawer("licorice", hasLicorice);
    } else if (herb === "ginseng") {
        hasGinseng = !hasGinseng;
        setDrawer("ginseng", hasGinseng);
    } else if (herb === "lily") {
        hasLily = !hasLily;
        setDrawer("lily", hasLily);
    }

    updateBowl();
}

function setDrawer(id, isChosen) {
    if (isChosen === true) {
        document.getElementById(id).className = "drawer chosen";
    } else {
        document.getElementById(id).className = "drawer";
    }
}

function countHerbs() {
    let count = 0;

    if (hasGinger === true) {
        count = count + 1;
    }
    if (hasLicorice === true) {
        count = count + 1;
    }
    if (hasGinseng === true) {
        count = count + 1;
    }
    if (hasLily === true) {
        count = count + 1;
    }

    return count;
}

function updateBowl() {
    let list = [];

    if (hasGinger === true) {
        list.push("Ginger");
    }
    if (hasLicorice === true) {
        list.push("Licorice");
    }
    if (hasGinseng === true) {
        list.push("Ginseng");
    }
    if (hasLily === true) {
        list.push("Lily bulb");
    }

    if (list.length === 0) {
        document.getElementById("bowl").innerHTML = "In the bowl: nothing yet";
    } else {
        document.getElementById("bowl").innerHTML = "In the bowl: " + list.join(", ");
    }
}

function brewRemedy() {
    let herbCount = countHerbs();
    let result = document.getElementById("brewResult");

    if (herbCount === 0) {
        result.innerHTML = "The bowl is empty. Choose at least one herb first.";
        result.className = "result neutral";
    } else if (herbCount === 4) {
        result.innerHTML = "Every drawer at once? Far too strong. The patient has fainted.";
        result.className = "result bad";
    } else if (hasGinger === true && hasLicorice === true && herbCount === 2) {
        result.innerHTML = "A warming remedy for a cold. The patient stops coughing by evening.";
        result.className = "result good";
    } else if (hasGinseng === true && hasLily === true && herbCount === 2) {
        result.innerHTML = "A calming tonic. The tired consort finally sleeps through the night.";
        result.className = "result good";
    } else if (herbCount === 1) {
        result.innerHTML = "One herb alone is too weak. Maomao says it needs a partner.";
        result.className = "result neutral";
    } else {
        result.innerHTML = "Maomao frowns. These herbs do not belong together.";
        result.className = "result bad";
    }
}

function emptyBowl() {
    hasGinger = false;
    hasLicorice = false;
    hasGinseng = false;
    hasLily = false;

    setDrawer("ginger", false);
    setDrawer("licorice", false);
    setDrawer("ginseng", false);
    setDrawer("lily", false);

    updateBowl();

    document.getElementById("brewResult").innerHTML = "The patient is waiting.";
    document.getElementById("brewResult").className = "result";
}

let tastesTaken = 0;

function tasteSoup() {
    let answer = confirm("Taste the consort's soup?");
    let result = document.getElementById("poisonResult");

    if (answer === false) {
        result.innerHTML = "You refused. The consort sends the soup back, annoyed.";
        result.className = "result bad";
        return;
    }

    tastesTaken = tastesTaken + 1;

    if (tastesTaken === 1) {
        result.innerHTML = "Her lips go numb and the room spins. There was definitely something in it.";
        result.className = "result bad";
    } else if (tastesTaken <= 3) {
        result.innerHTML = "Only a slight tingle this time. Her tolerance is building.";
        result.className = "result neutral";
    } else if (tastesTaken <= 5) {
        result.innerHTML = "She hardly feels it. Maomao looks almost disappointed.";
        result.className = "result good";
    } else {
        result.innerHTML = "Nothing at all. Maomao asks the kitchen for something stronger.";
        result.className = "result good";
    }

    updateTolerance();
}

function updateTolerance() {
    let percent = tastesTaken * 20;

    if (percent > 100) {
        percent = 100;
    }

    document.getElementById("toleranceBar").style.width = percent + "%";
    document.getElementById("tasteCount").innerHTML = "Soups tasted today: " + tastesTaken;
}

function newDay() {
    tastesTaken = 0;
    updateTolerance();

    document.getElementById("poisonResult").innerHTML = "A new day. Her tolerance has worn off.";
    document.getElementById("poisonResult").className = "result neutral";
}

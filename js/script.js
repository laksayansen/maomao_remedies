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
    } else if (hasGinger === true && hasLicorice === true && herbCount === 2) {
        result.innerHTML = "A warming remedy for a cold. The patient stops coughing by evening.";
    } else {
        result.innerHTML = "Maomao frowns. These herbs do not belong together.";
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
}
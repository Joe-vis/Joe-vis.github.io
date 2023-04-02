// ====== Variables ======

// 5th edition D&D exp table
var levelRequirement = [
    0,
    300,
    900,
    2700,
    6500,
    14000,
    23000,
    34000,
    48000,
    64000,
    85000,
    100000,
    120000,
    140000,
    165000,
    195000,
    225000,
    265000,
    305000,
    355000
];
var currentExp = 0;
var level = 1;

// ====== EXP System ======
function AddEXP(amount = 100) {
    currentExp += Number(amount);
    console.log(`Current EXP: ${currentExp}`);
    UpdateEXP();
}

function RemoveEXP(amount = 100) {
    currentExp -= Number(amount);
    console.log(`Current EXP: ${currentExp}`);
    UpdateEXP();
}

function LevelUp() {
    if (currentExp < levelRequirement[level]) return;

    currentExp -= levelRequirement[level];
    level++;
    console.log(`Level Up!`);
    console.log(`Current Level: ${level}`);
    console.log(`Current EXP: ${currentExp}`);
    UpdateEXP();
}

function UpdateEXP() {
    document.getElementById(
        "expSlot"
    ).innerHTML = `Level: ${level} EXP: ${currentExp} / ${levelRequirement[level]}`;
    document.getElementById("level-progress").max = levelRequirement[level];
    document.getElementById("level-progress").value = currentExp;

    if (currentExp >= levelRequirement[level]) {
        document.getElementById("exp-system").classList.add("level-up");
    } else {
        document.getElementById("exp-system").classList.remove("level-up");
    }
} UpdateEXP();

// ====== --- ======

function ChangeWeaponAmount(weapon, element, amount) {
    weapon.amount += amount;
    element.innerHTML = `Type: ${weapon.type} &nbsp; | &nbsp; Amount: ${weapon.amount}`;
}

function ChangeWeaponHealth(weapon, element, heartIndex) {
    var tempHealth = 0;
    var hearts = element.querySelectorAll("input[type='checkbox']");
    hearts.forEach((heart, index) => {
        if(index == heartIndex) {
            if(heart.checked) {
                tempHealth++;
            }
        } else
        if (index <= heartIndex) {
            heart.checked = true;
            tempHealth++;
        } else {
            heart.checked = false;
        }
    });
    weapon.health = tempHealth;
    ShowDiscount(weapon, element.parentElement.parentElement.parentElement.querySelector(".blob-cost-reduction"));
}

function ShowDiscount(weapon, element) {
    var discount = WeaponPricing(weapon.cost, weapon.health);
    if(discount == weapon.cost) { 
        element.innerHTML = "";
        return;
    }
    element.innerHTML = `${discount} (-${Math.floor((1 - (discount / weapon.cost)) * 100)}%)`;
}

function VanishWeapon(weapon, element) {
    AddEXP(WeaponPricing(weapon.cost, weapon.health));
    Weapons.splice(Weapons.indexOf(weapon), 1);
    element.remove();
}

let WeaponPricing = (price, health) => {
    switch (health) {
        case 0:
            return 0;
            break;
        case 1:
            return Math.ceil(price * 0.75);
            break;
        default:
        case 2:
            return price;
            break;
    }
}

// ====== Blob Creation ======
function weaponFormSubmit(ev) {
    ev.preventDefault();
    var name = document.getElementById("weapon-name").value != "" ? document.getElementById("weapon-name").value : "Unnamed Blob";
    var damage = document.getElementById("weapon-damage").value != "" ? document.getElementById("weapon-damage").value : 0;
    var type = document.getElementById("weapon-type").value != "" ? document.getElementById("weapon-type").value : "item";
    var cost = document.getElementById("weapon-cost").value != "" ? document.getElementById("weapon-cost").value : 0;
    

    CreateWeapon(name, damage, type, cost);
}

var Weapons = [];
function CreateWeapon(name, damage = 0, type = "item", cost = 0, amount = 1, health = 2) {
    if (currentExp < cost) { 
        Message("Not enough EXP", "error");
        return;
    }
    RemoveEXP(cost);
    var weapon = {
        name: name,
        damage: damage,
        type: type,
        cost: cost,
        amount: amount,
        health: health
    };
    Weapons.push(weapon);
    CreateCard(weapon);
    UpdateEXP();
}

function CreateCard(weapon) {
    var temp = document.getElementsByTagName("template")[0];
    var clone = temp.content.cloneNode(true);

    const names = clone.querySelectorAll(".blob-name");
    names.forEach(name => {
        name.innerHTML = weapon.name;
    });

    clone.querySelector(".blob-cost").innerHTML = `${weapon.cost} EXP`;
    clone.querySelector(".badge").innerHTML = `${weapon.damage}`;
    clone.querySelector(".vanish-button").onclick = function() {VanishWeapon(weapon, this.parentElement.parentElement.parentElement.parentElement)};
    var bagohearts = clone.querySelector(".hearts");
    bagohearts.querySelectorAll("input[type='checkbox']").forEach((heart, index) => {
        heart.onclick = function() {ChangeWeaponHealth(weapon, bagohearts, index)};
        if (index < weapon.health) {
            heart.checked = true;       
        }
    });
    var footer = clone.querySelector(".card-footer");
    footer.innerHTML = `Type: ${weapon.type} &nbsp; | &nbsp; Amount: ${weapon.amount}`;
    clone.querySelector("#increase").onclick = function() {ChangeWeaponAmount(weapon, footer, 1)};
    clone.querySelector("#decrease").onclick = function() {ChangeWeaponAmount(weapon, footer, -1)};
    ShowDiscount(weapon, clone.querySelector(".blob-cost-reduction"));
    document.getElementById("blobs").appendChild(clone);
}

const SetVisibility = (id, visibility) => document.getElementById(id).style.visibility = visibility;


// ====== Save System ======

function CreateSaveFile() {
    var saveFile = {
        currentExp: currentExp,
        level: level,
        weapons: Weapons
    };
    var saveFileString = JSON.stringify(saveFile);
    download(saveFileString, 'save.json', 'text/plain');
    Message("Save File Created", "success");


}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function LoadSaveFile() {
    const reader = new FileReader();
    var file = document.getElementById("save-file").files[0];
    reader.readAsText(file);
    reader.onload = function() {
        LoadSaveFileString(reader.result);
    };
}

function LoadSaveFileString(saveFileString) {
    ClearCurrentProfile();
    var saveFile = JSON.parse(saveFileString);
    currentExp = saveFile.currentExp;
    level = saveFile.level;
    Weapons = saveFile.weapons;
    Weapons.forEach(weapon => {
        CreateCard(weapon);
    });
    UpdateEXP();
    Message("Save File Loaded", "success");
}

function ClearCurrentProfile() {
    currentExp = 0;
    level = 1;
    Weapons = [];
    document.getElementById("blobs").innerHTML = "";
    UpdateEXP();
}

let dropArea = document.getElementById('drop-area')

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}
  

;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('highlight')
}
  

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  document.getElementById("save-file").files = files;
}

document.querySelectorAll('input[type=submit]').forEach(inputElement => {
    inputElement.addEventListener('click', preventDefaults, false)
})

// ====== Message System ======
let timer
function Message(message, type = "info") {
    document.getElementById("message").innerHTML = message;
    SetVisibility("message", "visible");
    switch (type) {
        default:
        case "info":
            document.documentElement.style.setProperty('--message-color', '#ffffff');
            break;
        case "error":
            document.documentElement.style.setProperty('--message-color', '#ff2414');
            break;
        case "success":
            document.documentElement.style.setProperty('--message-color', '#20c997');
            break;
    }
    clearTimeout(timer);
    timer = setTimeout(() => SetVisibility("message", "hidden"), 2000);
}

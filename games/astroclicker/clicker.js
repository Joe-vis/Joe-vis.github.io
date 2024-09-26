 function changetab(name) {

    if(document.getElementById(name).classList.contains("open")) {
        document.getElementById("pointshop").style.left= -210;
        document.getElementById("utab").classList.remove("open")
        document.getElementById("ctab").classList.remove("open")
        document.getElementById("dtab").classList.remove("open")

    } else {
        document.getElementById("pointshop").style.left=0;
        document.getElementById("utab").classList.remove("open")
        document.getElementById("ctab").classList.remove("open")
        document.getElementById("dtab").classList.remove("open")
        document.getElementById(name).classList.add("open")
    }


    Array.prototype.forEach.call(document.getElementsByClassName("shoptab"), element => {
        element.style.display = "none"
        console.log(element.id)

    });

    switch(name){
        default:
        case "utab":
            document.getElementById("pointshop").style.backgroundColor = "#2D2D2D"
            document.getElementsByClassName("shoptab")[0].style.display = "block"
            break;

        case "ctab":
            document.getElementById("pointshop").style.backgroundColor = "gold"
            document.getElementsByClassName("shoptab")[1].style.display = "block"
            break;

        case "dtab":
            document.getElementById("pointshop").style.backgroundColor = "#722aa1"
            document.getElementsByClassName("shoptab")[2].style.display = "block"

            break;
        case "shiptab":
            break;

    }

    }



    var header = document.getElementById("btns");
    var btns = header.getElementsByClassName("btn");

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }


    function lbswitch(){

        if(document.getElementById("clickyboi").style.display == "none"){
            document.getElementById("lb").style.display = "none";
            document.getElementById("clickyboi").style.display = "unset";
        } else {
            document.getElementById("lb").style.display = "flex";
            document.getElementById("clickyboi").style.display = "none";

        }



    }





(function(){

    var meteorHealth = 100
    var meteorResistance = 0;
    var points = 0;
    var totalPoints = 0;
    var multiplier = 1;
    var click = 0.1;
    var mp = 1;
    var timeout;
    var value = document.getElementById("cost");
    var msg = document.getElementById("message");
    var merchanttxt = ["You need credits for that", "You can't afford that", "Try again when you have some creds"];
    var spiritualisttxt = ["DON'T TOUCH THAT", "Careful with that", "That could curse you"];
    var thebook = false;

    var itemList = [{
        itemName: "multiplier",
        // cost: 100 * (1.15 ** currentAmount * currentAmount),
        maxAmount: 100,
        currentAmount: 1
    }]
    //Robot

    var robotisactive = false;
    var passivetime;
    var powertime;
    var passiveClick = 10;
    var partscost = 100;


    // Heads
    var ownskimihead = false;
    var ownskrohead = false;
    var ownsostrighead = false;
    var head = "./images/apple.png";


    // MP change
    document.getElementsByClassName("btn")[0].onclick = function() {mpchange()};
    document.getElementsByClassName("btn")[1].onclick = function() {mpchange(1)};


    // On click
    document.getElementById("click").onclick = function() {pointup()};
    document.getElementById("mup").onclick = function() {multup(mp), cost(1)};
    document.getElementById("cup").onclick = function() {clickup(mp), cost(2)};
    document.getElementById("kro").onclick = function() {kro(), cost(4)};
    document.getElementById("ostrig").onclick = function() {ostrig(), cost(5)};
    document.getElementById("price").onclick = function() {thegoldenclock()};
    document.getElementById("robot").onclick = function() {activaterobot()};
    document.getElementById("robotparts").onclick = function() {robotparts(mp), cost(8)};
    document.getElementById("BOS").onclick = function() {bookofSacrifice()};


    // On Hover
    document.getElementById("mup").onmouseover  = function() {cost(1)};
    document.getElementById("cup").onmouseover  = function() {cost(2)};
    document.getElementById("price").onmouseover  = function() {cost(6)};
    document.getElementById("robot").onmouseover = function() {cost(7)};
    document.getElementById("robotparts").onmouseover = function() {cost(8)};
    document.getElementById("BOS").onmouseover = function() {cost(9)};

    // Cosmetic
    document.getElementById("kro").onmouseover  = function() {cost(4)};
    document.getElementById("ostrig").onmouseover  = function() {cost(5)};
    // On Hover Exit
    document.getElementById("mup").onmouseleave = function(){cost()};
    document.getElementById("cup").onmouseleave  = function() {cost()};
    document.getElementById("kro").onmouseleave  = function() {cost()};
    document.getElementById("ostrig").onmouseleave  = function() {cost()};
    document.getElementById("price").onmouseleave  = function() {cost()};
    document.getElementById("robot").onmouseleave = function() {cost()};
    document.getElementById("robotparts").onmouseleave = function() {cost()};
    document.getElementById("BOS").onmouseleave = function() {cost()};


    function mpchange(x) {
        switch(x){
            default:
                mp = 1;
                break;

            case 1:
                mp = 25;
                break;
        }
    }

    function cost(item) {
        value.style.padding= "12px 16px 12px 16px"
        switch(item){
            default:
                value.style.padding= "0"
                value.innerHTML = "";
                break;
            case 1:
                if(multiplier >= 80){
                    value.innerHTML = "Already at max";
                } else { value.innerHTML = "cost: " + ~~(100 * (1.15 ** multiplier * multiplier)); }
                console.log(~~(100 * (1.05 * multiplier)))
                break;
            case 2:
                if(click >= 50){
                    value.innerHTML = "Already at max";
                } else{ value.innerHTML = "cost: " + ~~(400 * (1.25 ** click * click)); }
                break;

            case 3:
                value.innerHTML = "cost: " + 500;
                break;

            case 4:
                value.innerHTML = "cost: " + 10000;
                break;

            case 5:
                value.innerHTML = "cost: " + 1000000;
                break;

            case 6:
                value.innerHTML = "cost: " + "Y̴̡̧̩̜̼̠̝̙͇͇̦͚̯̰̦͇̣̓̐͊ō̷̭̹͂̉̇ȕ̴͎̰̭̫̐̄̏͒̎̀̕͜r̴͓̘̺̄̐̈́̔̀̋̾̍̈́́́͒̐͒ ̶̡̢͇̬͕̘̫̩͈̣͖͎͖͖̙͗́̽̾l̸̦̣͈͎͕̭̟̅͛̽͛̆̆́͊̈́͗̌i̴̡̱̗̟̣̥̠̠͕͐̉̾f̴̺̼̜̭̲̺̺̻̞͊̿ͅë̶̤́́̎̄̑̽́̽͛̌̍̑͐̃͝͝͝";
                break;

            case 7:
                value.innerHTML = "cost: " + 1000;
                break;

            case 8:
                if(passiveClick >= 70){
                value.innerHTML = "Already at max";
                } else { value.innerHTML = "cost: " + partscost; }
                break;

            case 9:
                value.innerHTML = "Inspect the book";
                break;

        }

    }

    function merchantstext(option){
        clearTimeout(timeout);
        msg.style.opacity = 1;
        timeout = setTimeout(function(){  msg.style.opacity = 0; }, 6000);

        switch(option) {
            case 1:
                // msg.innerHTML = "Merchant: " + merchanttxt[~~(Math.random() * 3)];
                msg.innerHTML = thisShouldBeJSON[0].speaker + ": " + thisShouldBeJSON[0].text
                break;

            case 3:
                msg.innerHTML = "Merchant: Thats not for sale";
                break;

            case 4:
                msg.innerHTML = "Merchant: Sorry can't sell you that";
                break;

           case 5:
                msg.innerHTML = "Merchant: Just remember to recharge it";
                break;

            case 6:
                msg.innerHTML = "Merchant: A strange looking book, isn't it";
                break;

            case 7:
                msg.innerHTML = "I need the robot first";
                break;

            case 8:
                msg.innerHTML = "The robot is complete";
                break;
        }

        }





    function spiritualisttext(option){
        clearTimeout(timeout);
        msg.style.opacity = 1;
        timeout = setTimeout(function(){  msg.style.opacity = 0; }, 6000);
            switch(option) {
                default:
                case 1:
                    msg.innerHTML = "Spiritualist: " + spiritualisttxt[~~(Math.random() * 3)];
                    break;
            }

        }


    function updatePoints() {
        points = (Math.round((points + Number.EPSILON) * 10) / 10)
        document.getElementById("points").innerHTML = "Credits: " + Math.floor(points).toLocaleString("en-US");

    }

    function pointup() {
        if(multiplier > 80){multiplier = 80;}
        if(click > 50){click = 50;}

        var pointGain = click * multiplier
        totalPoints += pointGain
        points += pointGain
        meteorHealth -= 10 * (1-meteorResistance)
        document.getElementById("meteor_health").value = meteorHealth
        if(meteorHealth <= 0)
            destroyMeteor()
        updatePoints()
    }

    function destroyMeteor(){
        var pointGain = 10 * multiplier
        totalPoints += pointGain
        points += pointGain
        meteorHealth = 100
        meteorResistance = Math.random() * (0.99 - 0) + 0;
        document.getElementById("meteor_health").value = meteorHealth

    }

    function multup(mp) {
        for (i = 1; i <= mp; i++) {

            if (multiplier <= 79){
                if(points >= 100 * (1.15 ** multiplier * multiplier)) {
                    points -= ~~(100 * (1.15 ** multiplier * multiplier));
                    multiplier += .2
                    document.getElementById("mup").innerHTML = "Ore Locator: " + Math.round((multiplier + Number.EPSILON) * 100) / 100;
                    updatePoints()
                }
            else {merchantstext(1); break;}
            } else {break;}
        }
    }

    function clickup(mp) {
        for (i = 1; i <= mp; i++) {
            if (multiplier <= 49){
                pointCost = ~~(400 * (1.25 ** click * click))
                if(points >= pointCost) {
                    points -= pointCost;
                    click += 0.1
                    document.getElementById("cup").innerHTML = "Drill Bit: " + Math.round((click + Number.EPSILON) * 100) / 100;
                    updatePoints()
                }
                else {merchantstext(1); break;}
        } else {merchantstext(1); break;}

        }


    }



    function activaterobot() {

        if(points >= 1000 && robotisactive == false){
            robotisactive = true;
            points -= 1000;
            passivetime = setInterval(passive, 1000);
            merchantstext(5);
            updatePoints()
            activateRobotItems()
        } else{merchantstext(4)}

    }

    function activateRobotItems() {
        document.getElementById("robot").style.display = "none";
        document.getElementById("robotparts").style.display = "";

    }

    function robotparts(mp) {
        if(robotisactive == true) {
            for (i = 1; i <= mp; i++) {
                if(points >=  partscost && passiveClick <= 60){
                    points -= partscost
                    partscost = ~~(partscost ** 1.25)
                    passiveClick += 10;
                } else if(passiveClick >= 70) {merchantstext(8); break;
                } else{merchantstext(1); break;}
            }

        }else {merchantstext(7);}

        updatePoints();

    }

    function passive() {
        points += passiveClick;
        updatePoints()
    }

    // Not sure if ill keep the cosmetics
    function changeCosmetic() {

        if(ownskimihead) {

            if(head != "../images/kimihead.png") {
                head = "../images/kimihead.png"
            } else {head = "../images/apple.png"}

        } else {
            if(points >= 500) {
                points -= 500;
                head = "../images/kimihead.png"
                updatePoints()
                ownskimihead = true;
                msg.innerHTML = "The apple mutated"
                merchantstext(2)

            } else{merchantstext(1)}

        }
        document.getElementById("click").src = head;

    }



    // Demonic
    function thegoldenclock() {
        if(points >= 9999999999){
            points=0;
            multiplier = 1;
            click = 1;
            updatePoints()
            msg.innerHTML = "huh? Just a normal clock"
            merchantstext(2)
        } else {spiritualisttext(1)}

    }

    function bookofSacrifice(){
        console.log("book")
        msg.innerHTML ="Spirits whisper from the book"
        merchantstext(2)
    }

})();
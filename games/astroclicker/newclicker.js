(function(){
    let points = 0;
    let multiplier = 1;
    let click = 1;
    let mp = 1;


    var timeout;
    var value = document.getElementById("cost");
    var msg = document.getElementById("message");
    var merchanttxt = ["You need points for that", "You can't afford that", "You need more points"];
    var spiritualisttxt = ["DON'T TOUCH THAT", "Careful with that", "That could curse you"];

    var thebook = false;

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
    var head = "../images/apple.png";

    setInterval(savyboe, 600000)

    // MP change
    document.getElementsByClassName("btn")[0].onclick = function() {mpchange()};
    document.getElementsByClassName("btn")[1].onclick = function() {mpchange(1)};


    // On click 
    document.getElementById("click").onclick = function() {pointup()};
    document.getElementById("mup").onclick = function() {multup(mp), cost(1)};
    document.getElementById("cup").onclick = function() {clickup(mp), cost(2)};
    document.getElementById("kimihead").onclick = function() {kimihead(), cost(3)};
    document.getElementById("kro").onclick = function() {kro(), cost(4)};
    document.getElementById("ostrig").onclick = function() {ostrig(), cost(5)};
    document.getElementById("price").onclick = function() {thegoldenclock()};
    document.getElementById("robot").onclick = function() {activaterobot()};
    document.getElementById("robotparts").onclick = function() {robotparts(mp), cost(8)};
    document.getElementById("BOS").onclick = function() {bookofSacrifice()};



    // On Hover
    document.getElementById("mup").onmouseover  = function() {cost(1)};
    document.getElementById("cup").onmouseover  = function() {cost(2)};
    document.getElementById("kimihead").onmouseover  = function() {cost(3)};
    document.getElementById("kro").onmouseover  = function() {cost(4)};
    document.getElementById("ostrig").onmouseover  = function() {cost(5)};
    document.getElementById("price").onmouseover  = function() {cost(6)};
    document.getElementById("robot").onmouseover = function() {cost(7)};
    document.getElementById("robotparts").onmouseover = function() {cost(8)};
    document.getElementById("BOS").onmouseover = function() {cost(9)};


    // On Hover Exit
    onmouseleave = function(){cost()};
    // document.getElementById("mup").onmouseleave = function(){cost()};
    // document.getElementById("cup").onmouseleave  = function() {cost()};
    // document.getElementById("kimihead").onmouseleave  = function() {cost()};
    // document.getElementById("kro").onmouseleave  = function() {cost()};
    // document.getElementById("ostrig").onmouseleave  = function() {cost()};
    // document.getElementById("price").onmouseleave  = function() {cost()};
    // document.getElementById("robot").onmouseleave = function() {cost()};
    // document.getElementById("robotparts").onmouseleave = function() {cost()};
    // document.getElementById("BOS").onmouseleave = function() {cost()};


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
        switch(item){
            default:
            value.style.padding= "0"
            value.innerHTML = "";
            break;
            case 1:
            value.style.padding= "12px 16px 12px 16px"
            if(multiplier >= 80){
            value.innerHTML = "Already at max";
            } else { value.innerHTML = "cost: " + ~~(100 * (1.15 ** multiplier * multiplier)); }
            console.log(~~(100 * (1.05 * multiplier)))   
            break;
            case 2:
            if(click >= 50){
            value.innerHTML = "Already at max";
            } else{ value.innerHTML = "cost: " + ~~(200 * (1.25 ** click * click)); }
            value.style.padding= "12px 16px 12px 16px"
            break;
            case 3:
            value.style.padding= "12px 16px 12px 16px"
            value.innerHTML = "cost: " + 500;
            break;
            case 4:
            value.style.padding= "12px 16px 12px 16px"
            value.innerHTML = "cost: " + 10000;
            break;
            case 5:
            value.style.padding= "12px 16px 12px 16px"
            value.innerHTML = "cost: " + 1000000;
            break;
            case 6:
            value.style.padding= "12px 16px 12px 16px"
            value.innerHTML = "cost: " + "Y̴̡̧̩̜̼̠̝̙͇͇̦͚̯̰̦͇̣̓̐͊ō̷̭̹͂̉̇ȕ̴͎̰̭̫̐̄̏͒̎̀̕͜r̴͓̘̺̄̐̈́̔̀̋̾̍̈́́́͒̐͒ ̶̡̢͇̬͕̘̫̩͈̣͖͎͖͖̙͗́̽̾l̸̦̣͈͎͕̭̟̅͛̽͛̆̆́͊̈́͗̌i̴̡̱̗̟̣̥̠̠͕͐̉̾f̴̺̼̜̭̲̺̺̻̞͊̿ͅë̶̤́́̎̄̑̽́̽͛̌̍̑͐̃͝͝͝";
            break;
            case 7:
            value.style.padding= "12px 16px 12px 16px"
            value.innerHTML = "cost: " + 1000;
            break;
            case 8:
            value.style.padding= "12px 16px 12px 16px"
            if(passiveClick >= 70){
            value.innerHTML = "Already at max";
            } else { value.innerHTML = "cost: " + partscost; }

            
            break;
            case 9:
            value.style.padding= "12px 16px 12px 16px"
            value.innerHTML = "Inspect the book";
            break;
        }
    }
    function merchantstext(option){   
        switch(option) {
            case 1:
                clearTimeout(timeout);
                msg.innerHTML = "Merchant: " + merchanttxt[~~(Math.random() * 3)];
                msg.style.opacity = 1;
                timeout = setTimeout(function(){  msg.style.opacity = 0; }, 6000);
                break;
            case 2:
                clearTimeout(timeout);
                msg.style.opacity = 1;
                timeout = setTimeout(function(){  msg.style.opacity = 0; }, 6000);
                break;
            case 3:
                clearTimeout(timeout);
                msg.innerHTML = "Merchant: Thats not for sale";
                msg.style.opacity = 1;
                timeout = setTimeout(function(){  msg.style.opacity = 0; }, 6000);
                break;
            case 4:
                clearTimeout(timeout);
                msg.innerHTML = "Merchant: Sorry can't sell you that";
                msg.style.opacity = 1;
                timeout = setTimeout(function(){  msg.style.opacity = 0; }, 6000);
                break;
           case 5:
                clearTimeout(timeout);
                msg.innerHTML = "Merchant: Just remember to recharge it";
                msg.style.opacity = 1;
                timeout = setTimeout(function(){  msg.style.opacity = 0; }, 6000);
                break;
            case 6:
                clearTimeout(timeout);
                msg.innerHTML = "Merchant: A strange looking book, isn't it";
                msg.style.opacity = 1;
                timeout = setTimeout(function(){  msg.style.opacity = 0; }, 6000);
                break;
            case 7:
                clearTimeout(timeout);
                msg.innerHTML = "I need the robot first";
                msg.style.opacity = 1;
                timeout = setTimeout(function(){  msg.style.opacity = 0; }, 6000);
                break;
            case 8:
                clearTimeout(timeout);
                msg.innerHTML = "The robot is complete";
                msg.style.opacity = 1;
                timeout = setTimeout(function(){  msg.style.opacity = 0; }, 6000);
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



    function saveData() {
        console.log("saved")
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            console.log("saved, points: " + this.responseText)
        }
        xhttp.open("GET", "../external/clicker_save.php?points=" + points + "&multiplier=" + multiplier + "&click=" + click + "&kimi=" + ownskimihead + "&krow=" + ownskrohead,  true);
        xhttp.send();
    }

    function getData() {
        console.log("saved")
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            let data = JSON.parse(this.responseText);
            console.log("data: " + this.responseText)
            console.log(data[0].username)
            points = parseInt(data[0].score);
            click = parseInt(data[0].click);
            multiplier = parseFloat(data[0].mult);
            updatePoints()
            document.getElementById("mup").innerHTML = "multiplier: " + Math.round((multiplier + Number.EPSILON) * 100) / 100;
            document.getElementById("cup").innerHTML = "points per click: " + Math.round((click + Number.EPSILON) * 100) / 100;
        }
        xhttp.open("GET", "../external/clicker_getdata.php", true);
        xhttp.send();
    }


    function updatePoints() {
        points = (Math.round((points + Number.EPSILON) * 10) / 10)
        document.getElementById("points").innerHTML = "points: " + points.toLocaleString("en-US");
    }
    
    function pointup() {
        if(multiplier > 80){multiplier = 80;}
        if(click > 50){click = 50;}
        points += click * multiplier;
        updatePoints()

    }
 
    function multup(mp) {

        for (i = 1; i <= mp; i++) {
            if (multiplier <= 79){
            if(points >= 100 * (1.15 ** multiplier * multiplier)) {

                points -= ~~(100 * (1.15 ** multiplier * multiplier));
                multiplier += .2
                document.getElementById("mup").innerHTML = "multiplier: " + Math.round((multiplier + Number.EPSILON) * 100) / 100;
                updatePoints()
            }
            else {merchantstext(1); break;}
            } else {break;}
        }
        //saveData
    }


    function clickup(mp) {
        for (i = 1; i <= mp; i++) {
            if (multiplier <= 49){
            if(points >= 200 * (1.25 ** click * click)) {

                points -= ~~(200 * (1.25 ** click * click));
                click += 1
                document.getElementById("cup").innerHTML = "points per click: " + Math.round((click + Number.EPSILON) * 100) / 100;
                updatePoints()
            }
            else {merchantstext(1); break;}
        } else {merchantstext(1); break;}
        }
        //saveData
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



    function kimihead() {
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

    function kro() {
        if(ownskrohead) {
            if(head != "../images/dog.png") {
                head = "../images/dog.png"
            } else {head = "../images/apple.png"}
            
        } else {
        
            if(points >= 10000) {
                points -= 10000;
                head = "../images/dog.png"
                updatePoints()
                ownskrohead = true;
                msg.innerHTML = "You found a... Dog?"
                merchantstext(2)
            } else{merchantstext(1)}
        }

        document.getElementById("click").src = head;
    }


    function ostrig() {
        if(ownsostrighead) {
            if(head != "../images/ostrig.png") {
                head = "../images/ostrig.png"
            } else {head = "../images/apple.png"}
            
        } else {
        
            if(points >= 1000000) {
                points -= 1000000;
                head = "../images/ostrig.png"
                updatePoints()
                ownsostrighead = true;
                msg.innerHTML = "Kill it with fire"
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
    




    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function savyboe() {
        saveData()
    }

    window.onload = function() {
        getData();
    }


    window.onbeforeunload = function() {
        saveData()
    }

})();
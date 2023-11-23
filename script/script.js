const classPlayer = {
    "Mage": { name: "Mage", pv : 100, def : 0.1, att : 20, 
        sp : function mageAttSpecial(player, otherplayer) {
        otherplayer.pv -= 40
        UpdatePV() 
    }},
    "Guerrier": { name: "Guerrier",  pv : 120, def : 0.2, att : 15, 
        sp : function guerrierAttSpecial(player, otherplayer) {
        player.def = 0.3
        player.att = 25
        console.log("att despi");
        UpdatePV()
    }},
    "Pretre": { name: "Pretre", pv : 80, def : 0.3, att : 10, 
        sp : function pretreAttSpecial(player, otherplayer) {
        let newpv = player.pv + 30
        if (newpv < 80){
            player.pv = newpv
        }
        if (player.pv == 80){
            compteurDeTour --
        }
        else {
            let diffpv = newpv - 80
            player.pv = newpv - diffpv
        }
        console.log(player.pv);
        UpdatePV()
    }},
    "Archer": { name: "Archer", pv : 90, def : 0.15, att : 18, 
        sp : function archerAttSpecial(player, otherplayer) {
        random5 = Math.floor(Math.random() * 4) + 2
        for (let i = 0; i < random5; i++){
            otherplayer.pv -= 12 
        }
        UpdatePV()
    }},
}
let game = false
let player1 = { name: "", pv : 1, def : 1, att : 1, sp : ""}
let player2 = { name: "", pv : 1, def : 1, att : 1, sp : ""}
let pvJ1initial 
let pvJ2initial
let compteurDeTour = 0
let tourPrecedent = 0
let compteurSP1 = 2
let compteurSP2 = 2
let selectNameJ1 = document.querySelector("#selectNameJ1")
let selectNameJ2 = document.querySelector("#selectNameJ2")
let nameJ1
let nameJ2

const start = document.querySelector("#start")
const startPage = document.querySelector(".startPage")
const choiceJ1 = document.querySelector(".choiceJ1")
const choiceJ2 = document.querySelector(".choiceJ2")
const gamePage = document.querySelector(".gamePage")
const btnChoiceJ1 = document.querySelectorAll(".choiceJ1 button") 
const btnChoiceJ2 = document.querySelectorAll(".choiceJ2 button")
const joueur1 = document.querySelector(".joueur1")
const joueur2 = document.querySelector(".joueur2") 
const afficheNameJ1 = document.querySelector("#afficheNameJ1")
const afficheNameJ2 = document.querySelector("#afficheNameJ2")
const etatJ1 = document.querySelector(".etatJ1")
const etatJ2 = document.querySelector(".etatJ2")
const attChoiceJ1 = document.querySelectorAll(".joueur1 button")
const attChoiceJ2 = document.querySelectorAll(".joueur2 button")
const pvJ1 = document.querySelector(".barrepvJ1")
const pvJ2 = document.querySelector(".barrepvJ2")
const attSP = document.querySelector("#Attaque-Speciale")
const attSP2 = document.querySelector("#Attaque-Speciale2")
const gameOver = document.querySelector(".gameOver")
const Winner =  document.querySelector("#winner")
const afficheClassJ1 = document.querySelector("#afficheClassJ1")
const afficheClassJ2 = document.querySelector("#afficheClassJ2")


start.addEventListener("click", () => {
    startPage.style.display = "none"
    choiceJ1.style.display = "flex"
//    console.log("start");
})

btnChoiceJ1.forEach(button => {
    button.addEventListener("click", () => {
 //       console.log(button.id);
        for (let key in classPlayer[button.id]) {
            player1[key] = classPlayer[button.id][key];
        }
        nameJ1 = selectNameJ1.value
        afficheNameJ1.innerHTML = nameJ1 
        afficheClassJ1.innerHTML = player1.name

        // player1 = classPlayer[button.id]
        choiceJ1.style.display = "none"
        choiceJ2.style.display = "flex"
  //      console.log(`joueur 1 classe choisie est: ${player1.name}`);
        pvJ1initial = player1.pv

    });
});

btnChoiceJ2.forEach(button => {
    button.addEventListener("click", () => {
  //      console.log(button.id);
        for (let key in classPlayer[button.id]) {
            player2[key] = classPlayer[button.id][key];
        }
        nameJ2 = selectNameJ2.value
        afficheNameJ2.innerHTML = nameJ2 
        afficheClassJ2.innerHTML = player2.name


  //      player2 = classPlayer[button.id]
        choiceJ2.style.display = "none"
        gamePage.style.display = "flex"        
  //      console.log(`joueur 2 classe choisie est: ${player2.name}`);
        pvJ2initial = player2.pv
        UpdatePV()
    });
});

attChoiceJ1.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id == "Attaque-Normal"){
            player2.pv -= (player1.att - (player1.att * player2.def)) ;
            if (player1.name != "Guerrier") {
                if (compteurSP1 != 3){
                    compteurSP1 ++
                }
                if (compteurSP1 == 3){
                    attSP.disabled = false
                }
            } else {
                if (compteurSP1 != 6){
                    compteurSP1 ++
                }
                if (compteurSP1 == 3) {
                    player1.att = 15
                    player1.def = 0.2
                }
                if (compteurSP1 == 6){
                    attSP.disabled = false
                }
            }
        }
        if (button.id == "Attaque-Speciale"){
            player1.sp(player1,player2)
            attSP.disabled = true
            compteurSP1 = 0
            console.log(compteurSP1);
            console.log(button.id + " et "+ player2.pv);
            if (player1.name == "Guerrier") {
                compteurDeTour --
            }
        }
        console.log(player1);
        compteurDeTour += 1
        console.log("Tour" + compteurDeTour);

        UpdatePV()
        if (compteurDeTour > tourPrecedent){    
            tourPrecedent = compteurDeTour        
            joueur1.style.display = "none"
            joueur2.style.display = "flex"
            etatJ1.style.backgroundColor = "red"
            etatJ2.style.backgroundColor = "white"}

    });
});

attChoiceJ2.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id == "Attaque-Normal"){
            player1.pv -= (player2.att - (player2.att * player1.def)) 
            if (player2.name != "Guerrier") {
                if (compteurSP2 != 3){
                    compteurSP2 ++
                }
                if (compteurSP2 == 3){
                    attSP.disabled = false
                }
            } else {
                if (compteurSP2 != 7){
                    compteurSP2 ++
                }
                if (compteurSP2 == 4) {
                    player2.att = 15
                    player2.def = 0.2
                }
                if (compteurSP2 == 7){
                    attSP2.disabled = false
                }
            }
        }
        if (button.id == "Attaque-Speciale2"){
            player2.sp(player2,player1)
            attSP2.disabled = true
            compteurSP2 = 0
            console.log(compteurSP2);
            console.log(button.id + " et "+ player1.pv);
            if (player2.name == "Guerrier") {
                compteurDeTour --
            }
        }
        console.log(player2);
        compteurDeTour += 1
        console.log("Tour" + compteurDeTour);

        UpdatePV()
        if (compteurDeTour > tourPrecedent){    
            tourPrecedent = compteurDeTour  
            joueur2.style.display = "none"
            joueur1.style.display = "flex"
            etatJ2.style.backgroundColor = "red"
            etatJ1.style.backgroundColor = "white"
        }
    });
});


//console.log(player1);

function UpdatePV() {
    if (player1.pv > 0 && player2.pv > 0 ) {
        pourcentagePvJ1 = (player1.pv / pvJ1initial)*100 
        pvJ1.innerHTML = player1.pv
        pvJ1.style.width = `${pourcentagePvJ1}%`  
        pourcentagePvJ2 = (player2.pv / pvJ2initial)*100
        pvJ2.innerHTML = player2.pv
        pvJ2.style.width = `${pourcentagePvJ2}%`   
    //    console.log(player1.pv +','+ pvJ1initial +','+ pourcentagePvJ1);
    //    console.log(player2.pv +','+ pvJ2initial +','+ pourcentagePvJ2);
    }
    else if(player1.pv < 0) {
        pvJ1.style.width = `0%`
        gamePage.style.display = "none"
        gameOver.style.display = "flex"
        Winner.innerHTML = nameJ1 + " a gagné la partie"
    }
    else if(player2.pv < 0) {
        pvJ2.style.width = `0%`
        gamePage.style.display = "none"
        gameOver.style.display = "flex"
        Winner.innerHTML = nameJ2 + " a gagné la partie"
    }
}

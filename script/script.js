let classPlayer = {
    "Mage": { name: "Mage", pv : 80, def : 0.1, att : 20, 
        sp : function mageAttSpecial(player, otherplayer) {
        otherplayer.pv -= 50
        compteurDeTour += 1   
        UpdatePV() 
    }},
    "Guerrier": { name: "Guerrier",  pv : 120, def : 0.2, att : 15, 
        sp : function guerrierAttSpecial(player) {
        // player.def = 80
        // player.att = 30
        console.log("att despi");
        UpdatePV()
    }},
    "Pretre": { name: "Pretre", pv : 150, def : 0.3, att : 10, 
        sp : function pretreAttSpecial(player) {
        player.pv += 100
        compteurDeTour += 1
        UpdatePV()
    }},
    "Archer": { name: "Archer", pv : 80, def : 0.15, att : 5, 
        sp : function archerAttSpecial(player, otherplayer) {
        random5 = Math.floor(Math.random() * 5) + 1
        for (let i = 0; i < random5; i++){
            otherplayer.pv -= 7 
        }
        compteurDeTour += 1
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
let compteurSP = 2

const start = document.querySelector("#start")
const startPage = document.querySelector(".startPage")
const choiceJ1 = document.querySelector(".choiceJ1")
const choiceJ2 = document.querySelector(".choiceJ2")
const gamePage = document.querySelector(".gamePage")
const btnChoiceJ1 = document.querySelectorAll(".choiceJ1 button") 
const btnChoiceJ2 = document.querySelectorAll(".choiceJ2 button")
const joueur1 = document.querySelector(".joueur1")
const joueur2 = document.querySelector(".joueur2") 
const etatJ1 = document.querySelector(".etatJ1")
const etatJ2 = document.querySelector(".etatJ2")
const attChoiceJ1 = document.querySelectorAll(".joueur1 button")
const attChoiceJ2 = document.querySelectorAll(".joueur2 button")
const pvJ1 = document.querySelector(".barrepvJ1")
const pvJ2 = document.querySelector(".barrepvJ2")
const attSP = document.querySelector("#Attaque-Speciale")


start.addEventListener("click", () => {
    startPage.style.display = "none"
    choiceJ1.style.display = "flex"
//    console.log("start");
})

btnChoiceJ1.forEach(button => {
    button.addEventListener("click", () => {
 //       console.log(button.id);
        player1 = classPlayer[button.id]
        choiceJ1.style.display = "none"
        choiceJ2.style.display = "flex"
  //      console.log(`joueur 1 classe choisie est: ${player1.name}`);
        pvJ1initial = player1.pv

    });
});

btnChoiceJ2.forEach(button => {
    button.addEventListener("click", () => {
  //      console.log(button.id);
        player2 = classPlayer[button.id]
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
            player2.pv -= player1.att
    //        console.log(button.id + " et "+ player2.pv);
            if (compteurSP != 2){
                compteurSP ++
                console.log(compteurSP);
            }
            if (compteurSP == 2){
                attSP.disabled = false
            }
        }
        if (button.id == "Attaque-Speciale"){
            player1.sp(player1,player2)
            button.disabled = true
            compteurSP = 0
    //        console.log(button.id + " et "+ player2.pv);
        }
        compteurDeTour += 1

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
            player1.pv -= player2.att 
            if (compteurSP != 2){
                compteurSP ++
                console.log(compteurSP);
            }
            if (compteurSP == 2){
                attSP.disabled = false
            }
 //           console.log(button.id + " et "+ player1.pv);
        }
        if (button.id == "Attaque-Speciale"){
            player2.sp(player2,player1)
            button.disabled = true
            compteurSP = 0
 //           console.log(button.id + " et "+ player1.pv);
        }
        compteurDeTour += 1
        UpdatePV()
        if (compteurDeTour > tourPrecedent){    
            tourPrecedent = compteurDeTour  
            joueur2.style.display = "none"
            joueur1.style.display = "flex"
            etatJ2.style.backgroundColor = "red"
            etatJ1.style.backgroundColor = "white"}
    });
});


//console.log(player1);

function UpdatePV() {
    if (player1.pv > 0 && player2.pv > 0 ) {
        pourcentagePvJ1 = (player1.pv / pvJ1initial)*100 
        pvJ1.style.width = `${pourcentagePvJ1}%`  
        pourcentagePvJ2 = (player2.pv / pvJ2initial)*100
        pvJ2.style.width = `${pourcentagePvJ2}%`   
    //    console.log(player1.pv +','+ pvJ1initial +','+ pourcentagePvJ1);
    //    console.log(player2.pv +','+ pvJ2initial +','+ pourcentagePvJ2);
    }
    else if(player1.pv > 0) {
        pvJ1.style.width = `0%`
    }
    else if(player2.pv > 0) {
        pvJ2.style.width = `0%`
    }
}

console.log("Hello World!");
let currentClick = null;
//console.log(document.getElementById("C1").textContent);

function clickCard(cardID){
    currentClick = cardID;
    let element = document.getElementById(cardID);
    element.firstChild.style.display = "inline";
    console.log("Currently clicked ID: " + document.getElementById(cardID).id);

}

function printContentToConsole(text){
    console.log(text);
}

function getAllCardIDs() {
    let IDsArr = [];
    let GameGrid = document.getElementById("CardGrid");
    let children = GameGrid.children;
    for (let index = 0; index < children.length; index++) {
        const element = children[index];
        IDsArr.push(element.id);
    };
    console.log("IDsArr: "+ IDsArr);
    return IDsArr;
}

function createOnClick(ID) {
    document.getElementById(ID).onclick = function() {
        clickCard(ID);
    };

}

function assignOnClickToAllCards(cardIDs){
    cardIDs.forEach(createOnClick);
}

let CardIDs = getAllCardIDs();


class GameConductor {
    constructor(){
        this.firstClicked = null;
        this.secondClicked = null;
        this.matchesRequired = null;
        this.matchesCurrently = null;
    }
    startGame(){
        while(this.matchesCurrently < this.matchesRequired){
            if(currentClick == null){
                
            }
            else {
                if(this.firstClicked == null){
                    this.firstClicked = currentClick;
                }
                else {
                    if(this.secondClicked == null){

                    }
                    
                }
            }
        }
    }
}

let GameEngine = new GameConductor();
let cardIDs = getAllCardIDs();
assignOnClickToAllCards(CardIDs);

/*
let CID = "C1";
let C1 = document.getElementById(CID);
document.getElementById(CID).onclick = function() {
    clickCard(CID);
};
*/
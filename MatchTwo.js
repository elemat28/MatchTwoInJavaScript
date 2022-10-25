console.log("Hello World!");
let currentClick = null;
let firstClicked = null;
let secondClicked = null;
let matchesRequired = 6;
let matchesCurrently = 0;
let timeout = null;
//console.log(document.getElementById("C1").textContent);

function clickCard(cardID){
    //ignore the click if card already facing up
    if(document.getElementById(cardID).firstChild.style.display == "inline"){
        return;
    }
    //unflip cards if next click happens before previously clicked cards dissapear on their own
    if(secondClicked != null){
        clearTimeout(timeout);
        unflipCards();
    }
    currentClick = cardID;
    let element = document.getElementById(cardID);
    element.firstChild.style.display = "inline";
    console.log("Currently clicked ID: " + document.getElementById(cardID).id);
    if(firstClicked == null){
        firstClicked = currentClick;
        console.log("First Clicked updated");
        currentClick = null;
    }
    else {
        if(secondClicked == null){
            secondClicked = currentClick;
            currentClick = null;
            if(document.getElementById(firstClicked).textContent == document.getElementById(secondClicked).textContent){
                //if first and second clicked tiles contain the same emoji
                //add a match and clear history of clicks
                matchesCurrently +=1;
                console.log("Current Number Of matches: "+matchesCurrently);
                firstClicked = secondClicked = null;
                
            } else {
                console.log("Create Timeout")
                timeout = setTimeout(unflipCards, 1500);
            }
            
        }
        
        
    }
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

function unflipCards(){
    document.getElementById(firstClicked).firstChild.style.display = "none";
    document.getElementById(secondClicked).firstChild.style.display = "none";
    firstClicked = secondClicked = null;
    
}



let cardIDs = getAllCardIDs();
assignOnClickToAllCards(CardIDs);

/*
let CID = "C1";
let C1 = document.getElementById(CID);
document.getElementById(CID).onclick = function() {
    clickCard(CID);
};
*/


//setTimeout(this.updateLogic(), 100);
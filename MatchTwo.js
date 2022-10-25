console.log("Hello World!");
//console.log(document.getElementById("C1").textContent);

function clickCard(cardID){
    console.log(document.getElementById(cardID).textContent);
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
assignOnClickToAllCards(CardIDs);





/*
let CID = "C1";
let C1 = document.getElementById(CID);
document.getElementById(CID).onclick = function() {
    clickCard(CID);
};
*/
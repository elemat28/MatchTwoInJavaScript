console.log("Hello World!");
let currentClick = null;
let firstClicked = null;
let secondClicked = null;
let numOfCards = 0;
let matchesRequired = 6;
let matchesCurrently = 0;
let timeout = null;
let timeoutMs = 1500;
let GameGrid = document.getElementById("CardGrid");
let defaultTheme = {start: 128512,
                    end: 128580};
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
                firstClicked = secondClicked = null;
                
            } else {
                console.log("Create Timeout")
                timeout = setTimeout(unflipCards, timeoutMs);
            }
            
        }
        

    }
    
}

function getArrayOfEmojis(numberOfEmojis, theme = defaultTheme){
    let arrayOfEmojis = [];
    if(theme == defaultTheme){
        let range = (defaultTheme.end+1) - defaultTheme.start;
        while(arrayOfEmojis.length < numberOfEmojis){
            let candidateEmoji = Math.floor(Math.random()*range) + defaultTheme.start;
            /* If emoji isn't alerady in the list(is't a duplicate), add it to the list of emojis to use */
            console.log(arrayOfEmojis);
            if(arrayOfEmojis.indexOf(candidateEmoji) == -1){
                arrayOfEmojis.push(candidateEmoji);
            }
            
        }
    }
    console.log("Emojis chosen(len["+arrayOfEmojis.length+"]): "+arrayOfEmojis);
    return arrayOfEmojis;
}

function checkIfWon(){
    window.alert("You won!");
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
        console.log("matches currently vs required: "+ matchesCurrently + " : " + matchesRequired);
        if(matchesCurrently == matchesRequired) {
            timeout = setTimeout(checkIfWon, 75);
        }
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


function createGameBoard(size = 'm', difficulty = 'm'){
    //setup game board size
    if(size == 'm'){
        numOfCards = 12;
    }
    for (let index = 0; index < numOfCards; index++) {
        //const element = array[index];
        let card = document.createElement("card");
        card.id = 'C' + index;
        let cardContent = document.createElement("cardImage");
        card.appendChild(cardContent);
        GameGrid.appendChild(card);
    }

    //set up game difficulty
    let cardIDs = getAllCardIDs();
    let numOfImgs = 0;
    if(difficulty == 'm'){
        matchesRequired = cardIDs.length/2;
        numOfImgs = cardIDs.length/2;
    }
    //Assign emoji images to each of the cards
    let emojisToUse = getArrayOfEmojis(numOfImgs);
    
    for (let index = 0; index < emojisToUse.length; index++) {
        console.log("Assigning emoji: '"+ String.fromCodePoint(emojisToUse[index]) +"' to: ");
        var cardIndex = Math.floor(Math.random()*cardIDs.length);
        var tempID = cardIDs[cardIndex];
        console.log(tempID);
        document.getElementById(tempID).firstElementChild.textContent = String.fromCodePoint(emojisToUse[index]);
        cardIDs.splice(cardIndex, 1);
        cardIndex = Math.floor(Math.random()*cardIDs.length);
        tempID = cardIDs[cardIndex];
        console.log("and: ");
        console.log(tempID);
        document.getElementById(tempID).firstElementChild.textContent = String.fromCodePoint(emojisToUse[index]);
        cardIDs.splice(cardIndex, 1);
        //https://www.delftstack.com/howto/javascript/javascript-pick-random-from-array/#:~:text=Pick%20a%20Random%20Value%20From%20an%20Array%20Using,of%200%20to%20the%20length%20of%20the%20array.
        
        
    }
}
createGameBoard();
let cardIDs = getAllCardIDs();
assignOnClickToAllCards(cardIDs);

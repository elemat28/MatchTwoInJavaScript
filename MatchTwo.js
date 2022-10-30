console.log("Hello World!");
let boardSize = 'm';
let gameDifficulty = 'm';
let currentClick = null;
let firstClicked = null;
let secondClicked = null;
let numOfCards = 0;
let matchesRequired = 6;
let matchesCurrently = 0;
let timeout = null;
let timeoutMs = 1500;
let gameTime = 0;
let interval;
let intervalStep = 100;
let clicksThisRound = 0;
let GameGrid = document.getElementById("CardGrid");
let timerBox = document.getElementById("timerBox");
let numOfClicksBox = document.getElementById("numOfClicksBox");
let defaultTheme = {start: 128512,
                    end: 128580};

let mediumBoardScores = {
    medium: {
        1:{
            time: 30000,
            clicks: 20,
            nickname: "MMM"
        }
    }
}

function clickCard(cardID){
    
    //ignore the click if card already facing up
    if(document.getElementById(cardID).firstChild.style.display == "inline"){
        return;
    }

    clicksThisRound +=1;
    numOfClicksBox.lastElementChild.textContent = clicksThisRound;

    if(interval == null) {
        interval = setInterval(updateTimer, intervalStep, intervalStep);
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

function msToMinAndSecAndMillisec(ms){
    let minutes = Math.floor(ms/60000); //1minute == 60,000ms
    ms = ms%60000;
    let seconds = Math.floor(ms/1000);
    ms = ms%1000;
    let tenthsOfASeconds = Math.floor(ms/100);
    ms = ms%100;
    return [ms, tenthsOfASeconds, seconds, minutes];
}

function updateTimer(intervalStep){
    gameTime += intervalStep;
    let humanReadableTime = msToMinAndSecAndMillisec(gameTime);
    if(humanReadableTime[3] < 10){
        humanReadableTime[3] = "0"+humanReadableTime[3];

    }
    if(humanReadableTime[2] < 10){
        humanReadableTime[2] = "0"+humanReadableTime[2];

    }
    timerBox.lastElementChild.textContent = humanReadableTime[3]+":"+humanReadableTime[2]+"."+humanReadableTime[1];

}


function endTheGame(){
    window.alert("You won!");
    clearInterval(interval);
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
            timeout = setTimeout(endTheGame, 75);
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
    if (size == 's'){
        GameGrid.style.gridTemplateColumns = "1fr 1fr 1fr";
        numOfCards = 6;
    }
    else if(size == 'm'){
        GameGrid.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
        numOfCards = 12;
    }
    else if(size == 'l'){
        GameGrid.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr";
        numOfCards = 20;
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
createGameBoard(boardSize, gameDifficulty);

let cardIDs = getAllCardIDs();
assignOnClickToAllCards(cardIDs);

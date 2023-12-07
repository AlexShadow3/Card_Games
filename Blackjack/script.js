const valueOfCard = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const typeOfCard = ['C', 'D', 'H', 'S'];

let player = {
    name: 'Player',
    score: 0,
    cards: [],
    money: 100
};

let dealer = {
    name: 'Dealer',
    score: 0,
    cards: []
};

let tableBoard = document.getElementById('tableBoard');

function getCard() {
    let card = [valueOfCard[Math.floor(Math.random() * 13)], typeOfCard[Math.floor(Math.random() * 4)]];
    return card;
}

function launchGame() {
    playGame.style.display = 'none';
    let playerCard1 = getCard();
    let playerCard2 = getCard();
    console.log(playerCard1);
    console.log(playerCard2);
    let playerCard1Img = new Image();
    let playerCard2Img = new Image();
    playerCard1Img.src = `../images/cards/${playerCard1[1]}/${playerCard1[0]}${playerCard1[1]}.png`;
    playerCard2Img.src = `../images/cards/${playerCard2[1]}/${playerCard2[0]}${playerCard2[1]}.png`;
    playerCard1Img.classList.add('card');
    playerCard2Img.classList.add('card');
    tableBoard.appendChild(playerCard1Img);
    tableBoard.appendChild(playerCard2Img);
}
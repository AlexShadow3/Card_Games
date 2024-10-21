const valueOfCard = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const typeOfCard = ['C', 'D', 'H', 'S'];

let player = [],
    dealer = [],
    deck = [];

let nbOfDeck = 4;

let isPlayerOver = false;

let gamerBoard = document.getElementById('gamerBoard'),
    dealerBoard = document.getElementById('dealerBoard'),
    hitBtn = document.getElementById('hitBtn'),
    doubleBtn = document.getElementById('doubleBtn'),
    standBtn = document.getElementById('standBtn'),
    splitBtn = document.getElementById('splitBtn'),
    popUp = document.getElementById('popUp');

let playerScoreHTML = document.getElementById('playerScore'),
    dealerScoreHTML = document.getElementById('dealerScore');

let gamerCards = document.getElementById('gamerCards'),
    dealerCards = document.getElementById('dealerCards');

function initializeDeck() {
    for (let deckCount = 0; deckCount < nbOfDeck; deckCount++) {    
        for (const value of valueOfCard) {
            for (const type of typeOfCard) {
                deck.push([value, type]);
            }
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function getCard() {
    if (deck.length === 0) {
        console.log('Le deck est vide. Réinitialisation du jeu.');
        initializeDeck();
        shuffleDeck();
        console.log('Deck initialisé et mélangé !');
    }
    return deck.pop();
}

function checkScore(cards) {
    let score = 0;

    for (let i = 0; i < cards.length; i++) {
        if (cards[i][0] === 'A' && score <= 10) {
            score += 11;
        } else if (cards[i][0] === 'A' && score > 10) {
            score += 1; 
        } else if (cards[i][0] === 'J' || cards[i][0] === 'Q' || cards[i][0] === 'K') {
            score += 10;
        } else {
            score += parseInt(cards[i][0]);
        }
    }
    return score;
}

function launchGame() {
    popUp.style.display = 'none';
    playGame.style.display = 'none';
    gamerBoard.style.visibility = 'visible';
    gamerBoard.style.opacity = '1';
    gamerBoard.style.display = 'block';
    dealerBoard.style.display = 'block';
    player = [];
    dealer = [];

    if (deck.length === 0) {
        initializeDeck();
        shuffleDeck();
        console.log('Deck initialisé et mélangé !');
    }

    console.log('Taille du deck : ', deck.length)

    // Initialisation des cartes

    let playerCard1 = getCard();
    let playerCard2 = getCard();
    let dealerCard = getCard();

    // Initialisation du joueur

    if (playerCard1[0] != playerCard2[0]) {
        disableButton(splitBtn);
    }

    player.push(playerCard1, playerCard2);
    
    let playerScore = checkScore(player);

    setTimeout(() => {
        if (playerScore === 21) {
            isPlayerOver = false;
            dealerTurn();
        }
    }, 2000);

    playerScoreHTML.innerHTML = `Votre score: ${playerScore}`;

    // Initialisation du dealer
    
    dealer.push(dealerCard);

    let dealerScore = checkScore(dealer);

    dealerScoreHTML.innerHTML = `Score du dealer: ${dealerScore}`;

    // Affichage des cartes

    let playerCard1HTML = document.createElement('img');
    printTheCard(playerCard1, playerCard1HTML, gamerCards);

    let playerCard2HTML = document.createElement('img');
    printTheCard(playerCard2, playerCard2HTML, gamerCards);

    let dealerCardHTML = document.createElement('img');
    printTheCard(dealerCard, dealerCardHTML, dealerCards);

    let dealerCardBackHTML = document.createElement('img');
    dealerCardBackHTML.src = `../images/cards/cardBack.png`;
    dealerCardBackHTML.classList.add('reverseCard');
    dealerCards.appendChild(dealerCardBackHTML);

    setTimeout(() => {
        playerCard1HTML.style.transform = 'rotateY(0) translateY(0)';
        playerCard2HTML.style.transform = 'rotateY(0) translateY(0)';
        dealerCardHTML.style.transform = 'rotateY(0) translateY(0)';
        dealerCardBackHTML.style.transform = 'rotateY(0) translateY(0)';
    }, 100);
}

function printTheCard(variableName, variableNameHTML, playerDeck) {
    variableNameHTML.src = `../images/cards/${variableName[1]}/${variableName[0]}${variableName[1]}.png`;
    variableNameHTML.classList.add('card');
    playerDeck.appendChild(variableNameHTML);
}

function hit() {
    let playerCard = getCard();
    player.push(playerCard);
    let playerScore = checkScore(player);
    
    playerScoreHTML.innerHTML = `Votre score: ${playerScore}`;

    let playerCardHTML = document.createElement('img');
    printTheCard(playerCard, playerCardHTML, gamerCards);

    setTimeout(() => {
        playerCardHTML.style.transform = 'rotateY(0) translateY(0)';
    }, 100);

    if (playerScore > 21) {
        isPlayerOver = true;
        dealerTurn();
    }
}

function double() {
    //TODO Ajouter ici la logique pour doubler la mise du joueur
}

function stand() {
    isPlayerOver = false;
    dealerTurn();
}

function dealerTurn() {
    disableButton(hitBtn);
    disableButton(doubleBtn);
    disableButton(standBtn);
    disableButton(splitBtn);
    let dealerCard = getCard();
    dealer.push(dealerCard);

    let dealerCardHTML = dealerCards.lastElementChild;
    dealerCardHTML.remove();

    dealerCardHTML = document.createElement('img');
    printTheCard(dealerCard, dealerCardHTML, dealerCards);

    setTimeout(() => {
        dealerCardHTML.style.transform = 'rotateY(0) translateY(0)';
    }, 100);

    let dealerScore = checkScore(dealer);
    dealerScoreHTML.innerHTML = `Score du dealer: ${dealerScore}`;
    
    if (isPlayerOver) {
        printResults('Vous avez perdu...');
    } else if (dealerScore >= 17) {
        checkResults();
    } else {
        const dealerInterval = setInterval(() => {
            whileDealerCards();
            if (checkScore(dealer) >= 17) {
                clearInterval(dealerInterval);
                checkResults();
            }
        }, 2000);
    }
}

function checkResults() {
    if ((checkScore(dealer) > 21) || (checkScore(dealer) < checkScore(player))) {
        printResults('Vous avez gagné ! 🎉');
    } else if (checkScore(dealer) > checkScore(player)) {
        printResults('Vous avez perdu...');
    } else if (checkScore(dealer) === checkScore(player)) {
        printResults('Egalité !');
    }
}

//! NOUVELLE FONCTION
function printResults(txtContent) {
    popUp.style.display = 'block';
    resetGame.style.display = 'inline';
    resetGame.style.marginTop = '10px';
    const h2Element = popUp.querySelector("h2");
    h2Element.textContent = txtContent;
}

function whileDealerCards() {
    let dealerCard = getCard();
    dealer.push(dealerCard);
    let dealerScore = checkScore(dealer);
    
    let dealerCardHTML = document.createElement('img');
    printTheCard(dealerCard, dealerCardHTML, dealerCards);

    setTimeout(() => {
        dealerCardHTML.style.transform = 'rotateY(0) translateY(0)';
    }, 100);

    dealerScoreHTML.innerHTML = `Score du dealer: ${dealerScore}`;
}


function split() {
    //TODO Ajoutez ici la logique pour gérer le split
}

const disableButton = (button) => {
    button.disabled = true;
    button.style.opacity = '0.5';
}

const enableButton = (button) => {
    button.disabled = false;
    button.style.opacity = '1';
}

function eraseGame() {
    enableButton(hitBtn);
    enableButton(doubleBtn);
    enableButton(standBtn);
    enableButton(splitBtn);
    gamerCards.innerHTML = '';
    dealerCards.innerHTML = '';
    launchGame();
}
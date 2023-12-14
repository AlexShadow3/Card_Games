const valueOfCard = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const typeOfCard = ['C', 'D', 'H', 'S'];

let player = [];
let dealer = [];
let deck = [];

let nbOfDeck = 4;

let isPlayerOver = false;

// let tableBoard = document.getElementById('tableBoard');
let gamerBoard = document.getElementById('gamerBoard');
let dealerBoard = document.getElementById('dealerBoard');
let hitBtn = document.getElementById('hitBtn');
let doubleBtn = document.getElementById('doubleBtn');
let standBtn = document.getElementById('standBtn');
let splitBtn = document.getElementById('splitBtn');

let playerScoreHTML = document.getElementById('playerScore');
let dealerScoreHTML = document.getElementById('dealerScore');

let gamerCards = document.getElementById('gamerCards');
let dealerCards = document.getElementById('dealerCards');

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
        console.error('Le deck est vide. Réinitialisez le jeu.');
        return null;
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
    resetGame.style.display = 'none';
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

    playerScoreHTML.innerHTML = `Votre score: ${playerScore}`;

    // Initialisation du dealer
    
    dealer.push(dealerCard);

    let dealerScore = checkScore(dealer);

    dealerScoreHTML.innerHTML = `Score du dealer: ${dealerScore}`;

    // Affichage des cartes

    let playerCard1HTML = document.createElement('img');
    playerCard1HTML.src = `../images/cards/${playerCard1[1]}/${playerCard1[0]}${playerCard1[1]}.png`
    playerCard1HTML.classList.add('card');
    gamerCards.appendChild(playerCard1HTML);

    let playerCard2HTML = document.createElement('img');
    playerCard2HTML.src = `../images/cards/${playerCard2[1]}/${playerCard2[0]}${playerCard2[1]}.png`;
    playerCard2HTML.classList.add('card');
    gamerCards.appendChild(playerCard2HTML);

    let dealerCardHTML = document.createElement('img');
    dealerCardHTML.src = `../images/cards/${dealerCard[1]}/${dealerCard[0]}${dealerCard[1]}.png`;
    dealerCardHTML.classList.add('card');
    dealerCards.appendChild(dealerCardHTML);

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

    setTimeout(() => {
        if (playerScore === 21) {
            console.log('Blackjack !');
            dealerTurn();
        }
    }, 2000);
}

function hit() {
    let playerCard = getCard();
    player.push(playerCard);
    let playerScore = checkScore(player);
    
    playerScoreHTML.innerHTML = `Votre score: ${playerScore}`;
    let playerCardHTML = document.createElement('img');
    playerCardHTML.src = `../images/cards/${playerCard[1]}/${playerCard[0]}${playerCard[1]}.png`;
    playerCardHTML.classList.add('card');
    gamerCards.appendChild(playerCardHTML);

    setTimeout(() => {
        playerCardHTML.style.transform = 'rotateY(0) translateY(0)';
    }, 100);

    if (playerScore > 21) {
        console.log('Le joueur a dépassé 21. Il a perdu !');
        isPlayerOver = true;
        dealerTurn();
    }
}

function double() {
    console.log('Non disponible pour le moment.')
    // // console.log('Mise doublée !');

    // Ajouter ici la logique pour doubler la mise du joueur

    // let playerCard = getCard();
    // player.push(playerCard);
    // // console.log(`Carte tirée : ${playerCard}`);

    // let playerScore = checkScore(player);
    // console.log(`Score du joueur : ${playerScore}`);

    // playerScoreHTML.innerHTML = `Votre score: ${playerScore}`;

    // let playerCardHTML = document.createElement('img');
    // playerCardHTML.src = `../images/cards/${playerCard[1]}/${playerCard[0]}${playerCard[1]}.png`;
    // playerCardHTML.classList.add('card');
    // gamerCards.appendChild(playerCardHTML);

    // setTimeout(() => {
    //     playerCardHTML.style.transform = 'rotateY(0) translateY(0)';
    // }, 100);

    // if (playerScore > 21) {
    //     console.log('Le joueur a dépassé 21. Il a perdu !');
    //     isPlayerOver = true;
    //     dealerTurn();
    // }

    // stand();
}

function stand() {
    console.log("Le joueur a décidé de s'arrêter.");
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
    dealerCardHTML.src = `../images/cards/${dealerCard[1]}/${dealerCard[0]}${dealerCard[1]}.png`;
    dealerCardHTML.classList.add('reverseCard2');
    dealerCards.appendChild(dealerCardHTML);

    setTimeout(() => {
        dealerCardHTML.style.transform = 'rotateY(0) translateY(0)';
    }, 100);

    let dealerScore = checkScore(dealer);
    dealerScoreHTML.innerHTML = `Score du dealer: ${dealerScore}`;

    if (dealerScore >= 17) {
        checkResults();
    }
    else if (isPlayerOver) {
        console.log('Le joueur a dépassé 21. Le dealer retourne sa carte et gagne.');
    } else {
        const dealerInterval = setInterval(() => {
            whileDealerCards();
            let canReset = false;
            if (checkScore(dealer) >= 17) {
                clearInterval(dealerInterval);
                checkResults();
                canReset = true;
            }
        }, 2000);
    }
}

function checkResults() {
    if (checkScore(dealer) > 21) {
        console.log('Le dealer a dépassé 21. Le joueur a gagné !');
        resetGame.style.display = 'inline';
        resetGame.style.marginTop = '10px';
    } else if (checkScore(dealer) > checkScore(player)) {
        console.log('Le dealer a un meilleur score que le joueur. Le dealer a gagné !');
        resetGame.style.display = 'inline';
        resetGame.style.marginTop = '10px';
    } else if (checkScore(dealer) < checkScore(player)) {
        console.log('Le joueur a un meilleur score que le dealer. Le joueur a gagné !');
        resetGame.style.display = 'inline';
        resetGame.style.marginTop = '10px';
    }
}

function whileDealerCards() {
    let dealerCard = getCard();
    dealer.push(dealerCard);
    let dealerScore = checkScore(dealer);
    
    let dealerCardHTML = document.createElement('img');
    dealerCardHTML.src = `../images/cards/${dealerCard[1]}/${dealerCard[0]}${dealerCard[1]}.png`;
    dealerCardHTML.classList.add('card');
    setTimeout(() => {
        dealerCardHTML.style.transform = 'rotateY(0) translateY(0)';
    }, 100);
    dealerCards.appendChild(dealerCardHTML);
    
    dealerScoreHTML.innerHTML = `Score du dealer: ${dealerScore}`;
}


function split() {
    console.log('Non disponible pour le moment.')
    // console.log('Le joueur a décidé de splitter.');
    // Ajoutez ici la logique pour gérer le split
    
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

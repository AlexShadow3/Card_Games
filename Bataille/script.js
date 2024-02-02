const valueOfCard = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const typeOfCard = ['C', 'D', 'H', 'S'];

let playerDeck = [];
let dealer = [];
let deck = [];

let nbOfDeck = 1;
let nbOfPlayers = 1;

// let tableBoard = document.getElementById('tableBoard');
let gamerBoard = document.getElementById('gamerBoard');
let dealerBoard = document.getElementById('dealerBoard');
let hitBtn = document.getElementById('hitBtn');

let playerScoreHTML = document.getElementById('playerScore');
let dealerScoreHTML = document.getElementById('dealerScore');

let playerCards = document.getElementById('playerCards');
let dealerCards = document.getElementById('dealerCards');

function initializeGameDecks() {
    initializeDeck();
    shuffleDeck(deck);
    const cardsPerPlayer = Math.floor(deck.length / (nbOfPlayers + 1));
    playerDeck = deck.slice(0, cardsPerPlayer);
    dealerDeck = deck.slice(cardsPerPlayer, 2 * cardsPerPlayer);
}

function initializeDeck() {
    for (let deckCount = 0; deckCount < nbOfDeck; deckCount++) {
        for (const value of valueOfCard) {
            for (const type of typeOfCard) {
                deck.push([value, type]);
            }
        }
    }
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function getCard(deck) {
    if (deck.length === 0) {
        console.error('Le deck est vide. Réinitialisez le jeu.');
        return null;
    }
    return deck.pop();
}

function launchGame() {
    // resetGame.style.display = 'none'; //! HERE
    playGame.style.display = 'none';
    gamerBoard.style.visibility = 'visible';
    gamerBoard.style.opacity = '1';
    gamerBoard.style.display = 'block';
    dealerBoard.style.display = 'block';

    player = [];
    dealer = [];

    if (deck.length === 0) {
        initializeGameDecks();
        console.log('Decks initialisés et mélangé !');
    }

    console.log('Taille des deck : ', playerDeck.length)

    playerScoreHTML.innerHTML = `Votre score: 0`;
    dealerScoreHTML.innerHTML = `Score du dealer: 0`;

    // Affichage des cartes retournées

    let playerCardBackHTML = document.createElement('img');
    playerCardBackHTML.src = `../images/cards/cardBack.png`;
    playerCardBackHTML.classList.add('reverseCard');
    playerCards.appendChild(playerCardBackHTML);

    let dealerCardBackHTML = document.createElement('img');
    dealerCardBackHTML.src = `../images/cards/cardBack.png`;
    dealerCardBackHTML.classList.add('reverseCard');
    dealerCards.appendChild(dealerCardBackHTML);

    setTimeout(() => {
        playerCardBackHTML.style.transform = 'rotateY(0) translateY(0)';
        dealerCardBackHTML.style.transform = 'rotateY(0) translateY(0)';
    }, 100);

}

function timeToPlay() {
    let playerCardHTML = playerCards.lastElementChild;
    playerCardHTML.remove();

    let dealerCardHTML = dealerCards.lastElementChild;
    dealerCardHTML.remove();
    
    hit();
}

function checkResults(player, dealer) {
    if (player < dealer) {
        console.log('Le dealer a gagné !');
        // resetGame.style.display = 'inline'; //! HERE
        // resetGame.style.marginTop = '10px'; //! HERE
        disableButton(hitBtn);
        setTimeout(() => {
            eraseGame();
        }, 4000);
    } else if (player > dealer) {
        console.log('Le joueur a gagné !');
        // resetGame.style.display = 'inline'; //! HERE
        // resetGame.style.marginTop = '10px'; //! HERE
        disableButton(hitBtn);
        setTimeout(() => {
            eraseGame();
        }, 4000);
    }
}

function checkScore(cards) {
    let lastCard = cards[cards.length - 1];
    let cardValue = lastCard[0];
    let score = 0;

    if (cardValue === 'J') {
        score += 11;
    } else if (cardValue === 'Q') {
        score += 12;
    } else if (cardValue === 'K') {
        score += 13;
    } else if (cardValue === 'A') {
        score += 14;
    } else {
        score += parseInt(cardValue);
    }
    return score;
}


function hit() {
    let playerCard = getCard(playerDeck);
    player.push(playerCard);

    let dealerCard = getCard(dealerDeck);
    dealer.push(dealerCard);

    let playerScore = checkScore(player);
    let dealerScore = checkScore(dealer);
    
    playerScoreHTML.innerHTML = `Votre score: ${playerScore}`;
    let playerCardHTML = document.createElement('img');
    playerCardHTML.src = `../images/cards/${playerCard[1]}/${playerCard[0]}${playerCard[1]}.png`;
    playerCardHTML.classList.add('card');
    playerCards.appendChild(playerCardHTML);

    dealerScoreHTML.innerHTML = `Score du dealer: ${dealerScore}`;
    let dealerCardHTML = document.createElement('img');
    dealerCardHTML.src = `../images/cards/${dealerCard[1]}/${dealerCard[0]}${dealerCard[1]}.png`;
    dealerCardHTML.classList.add('card');
    dealerCards.appendChild(dealerCardHTML);

    setTimeout(() => {
        playerCardHTML.style.transform = 'rotateY(0) translateY(0)';
        dealerCardHTML.style.transform = 'rotateY(0) translateY(0)';
    }, 100);

    checkResults(playerScore, dealerScore)
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
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';
    launchGame();
}

// FIREBASE

// let userCreds = JSON.parse(sessionStorage.getItem("user-creds"));
// let userInfo = JSON.parse(sessionStorage.getItem("user-info"));

// let msgHead = document.getElementById("msg");
// let greetHead = document.getElementById("greet");
// let signOutBtn = document.getElementById("signOut");

// let signOut = () => {
//     sessionStorage.removeItem("user-creds");
//     sessionStorage.removeItem("user-info");
//     window.location.href = "../firebase/login.html";
// }

// let checkCred = () => {
//     if (!sessionStorage.getItem("user-creds")) {
//         window.location.href = "../firebase/login.html";
//     } else {
//         msgHead.innerText = `User with email "${userCreds.email}" logged in`; 
//         greetHead.innerText = `Hello ${userInfo.pseudo}`;
//         // console.log(`user with email "${userCreds.email}" logged in`);
//         // console.log(`Hello ${userInfo.pseudo}`);
//     }
// }

// window.addEventListener("load", checkCred);
// signOutBtn.addEventListener("click", signOut);

// TOKENS


let player = {
    name: "",
    chips: 50,
    bet: 0
}

let cards = []
let dealerCards = []
let sum = 0
let dealerSum = 0

let hasBlackJack = false
let isAlive = false
let message = ""
const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const playerEl = document.getElementById("player-el")
const dealerEl = document.getElementById("dealer-el")
const dealerCardsEl = document.getElementById("dealerCards-el")
const dealerSumEl = document.getElementById("dealerSum-el")
const resultEl = document.getElementById("result-el")
const nameEl = document.getElementById("name-el")
const playerChipsEl = document.getElementById("player_chips-el")
const betAmountEl = document.getElementById("bet_amt-el")
const pagePcEl = document.getElementById("page_pc-el")

const newGameEl = document.getElementById("newGame-el")
const hitEl = document.getElementById("hit-el")
const standEl = document.getElementById("stand-el")
const placeBetsEl = document.getElementById("place_bets-el")
const chipChangesEl = document.getElementById("saveChipChanges-el")
const savePlayerNameEl = document.getElementById("savePlayerName-el")
const betEl = document.getElementById("bet-el")


function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

newGameEl.addEventListener('click', function () {

    pagePcEl.textContent = player.chips
    hasBlackJack = false

    isAlive = true
    resultEl.textContent = ""
    dealerCardsEl.textContent = "Cards:"
    dealerSumEl.textContent = "Sum: "

    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard

    dealerAlive = true
    let firstDealerCard = getRandomCard()
    let secondDealerCard = getRandomCard()
    dealerCards = [firstDealerCard, secondDealerCard]
    dealerSum = firstDealerCard + secondDealerCard

    renderGame()
})

function renderGame() {
    cardsEl.textContent = "Cards: "
    dealerCardsEl.textContent = "Cards: "

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
        if (i == 0) {
            dealerCardsEl.textContent += dealerCards[i] + " "
        }
    }
    sumEl.textContent = "Sum: " + sum

    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        dealerWin(betAmountEl)
        message = "bust"
        dealerSumEl.textContent += dealerSum
    }
    messageEl.textContent = message
}

hitEl.addEventListener('click', function () {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
})

function displayDealerCard() {
    dealerCardsEl.textContent = "Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
}

standEl.addEventListener('click', function () {
    console.log("Dealer sum: ", dealerSum)
    console.log("Player sum: ", sum)

    if (isAlive === true) {
        while (dealerSum < 17) {
            let dealerCard = getRandomCard()
            dealerCards.push(dealerCard)

            displayDealerCard()
            dealerSum += dealerCard
        }

        // dealer is now standing
        dealerSumEl.textContent = "Sum: " + dealerSum
        if (dealerSum > 21) {
            playerWin(betAmountEl)
        }

        else if (sum > dealerSum) {
            playerWin(betAmountEl)
        }
        else if (sum === dealerSum) {
            displayDealerCard()
            resultEl.textContent = "tie"
            message = "Game over"
            messageEl.textContent = message
        }
        else if (sum < dealerSum) {
            dealerWin(betAmountEl)
        }
    }
    else {
        dealerWin(betAmountEl)
    }
})

savePlayerNameEl.addEventListener('click', function () {
    player.name = nameEl.value
    playerEl.textContent = player.name
    nameEl.value = ""
})

placeBetsEl.addEventListener('click', function () {
    playerChipsEl.textContent = player.chips
    pagePcEl.textContent = player.chips
  
})

chipChangesEl.addEventListener('click', function () {
    playerChipsEl.textContent = player.chips
    pagePcEl.textContent = player.chips
    betEl.textContent = betAmountEl.value
})

function dealerWin(betAmountEl) {
    displayDealerCard()
    resultEl.textContent = "dealer wins"
    if (Number.isInteger(parseInt(betAmountEl.value))) {
        player.chips = player.chips - parseInt(betAmountEl.value)
    }
    message = "Game over"
    messageEl.textContent = message
    isAlive = false
}

function playerWin(betAmountEl) {
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()

    displayDealerCard()
    resultEl.textContent = "player wins"

    if (Number.isInteger(parseInt(betAmountEl.value))) {
        player.chips = player.chips + parseInt(betAmountEl.value)
    }
    message = "Game over"
    messageEl.textContent = message
    isAlive = false
}

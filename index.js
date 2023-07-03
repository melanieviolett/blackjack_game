let player = {
    name: "",
    chips: 50
}

let cards = []
let dealerCards = []
let sum = 0
let dealerSum = 0


let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")
let dealerCardsEl = document.getElementById("dealerCards-el")
let dealerSumEl = document.getElementById("dealerSum-el")
let resultEl = document.getElementById("result-el")
let nameEl = document.getElementById("name-el")
let playerChipsEl = document.getElementById("player_chips-el")
let betAmountEl = document.getElementById("bet_amt-el")
// above line used to add     + ": $" + player.chips

let pagePcEl = document.getElementById("page_pc-el")


function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    pagePcEl.textContent = player.chips

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
}

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
       message  = "You're out of the game!"
        isAlive = false
        resultEl.textContent = "dealer wins"
        message = "bust"
        player.chips = player.chips - parseInt(betAmountEl.value)
        dealerCardsEl.textContent += dealerCards[1] 
        dealerSumEl.textContent += dealerSum
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function displayDealerCard() {
    dealerCardsEl.textContent = "Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
}


function stand() {
    console.log("Dealer sum: ", dealerSum)
    console.log("Player sum: ", sum)

    if (isAlive === true)
    {
        while (dealerSum < 17)
        {
            let dealerCard = getRandomCard()
            dealerCards.push(dealerCard)

            displayDealerCard()
            dealerSum += dealerCard
        }

        // dealer is now standing
        dealerSumEl.textContent = "Sum: " + dealerSum
        if (dealerSum > 21)
        {
            displayDealerCard()
            resultEl.textContent = "player wins"
            player.chips = player.chips + parseInt(betAmountEl.value)
            message = "Game over"
        }

        else if (sum > dealerSum)
        {
            displayDealerCard()
            resultEl.textContent = "player wins"
            player.chips = player.chips + parseInt(betAmountEl.value)
            message = "Game over"
        }
        else if (sum === dealerSum)
        {
            displayDealerCard()
            resultEl.textContent = "tie"
            message = "Game over"
        }
        else if (sum < dealerSum)
        {
            displayDealerCard()
            resultEl.textContent = "dealer wins"
            player.chips = player.chips - parseInt(betAmountEl.value)
            message = "Game over"
        }
        // game is over
        messageEl.textContent = message
    }
    else
    {
        resultEl.textContent = "dealer wins"
        player.chips = player.chips - parseInt(betAmountEl.value)
        message = "Game over"
        dealerCardsEl.textContent += dealerCards[1] 
        messageEl.textContent = message
    }
}

function savePlayerName() {
    player.name = nameEl.value 
    playerEl.textContent = player.name
    nameEl.value = "" 
}

function savePlayerChips() {
    playerChipsEl.textContent = player.chips
    pagePcEl.textContent = player.chips
}

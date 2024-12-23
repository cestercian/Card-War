let deckId
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerWinCount = document.getElementById("Computer Wins")
const userWinCount = document.getElementById("You Win")

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            deckId = data.deck_id
            console.log(deckId)
            drawCardBtn.disabled = false
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card"  alt=""/>
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card"  alt=""/>
            `
            header.textContent = determineCardWinner(data.cards[0], data.cards[1])


            if (data.remaining === 0) {
                drawCardBtn.disabled = true
                if(scoreOfComputer > scoreOfUser){
                    header.innerHTML = `You win !`
                }else{
                    header.innerHTML = `Computer wins !`}
            }
        })
})


let scoreOfComputer = 0
let scoreOfUser = 0

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
        "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        scoreOfComputer++
        computerWinCount.innerHTML = `Computer Wins ${scoreOfComputer}`
        console.log(scoreOfComputer)
        return "Computer ki maa ka bhosda"
    } else if (card1ValueIndex < card2ValueIndex) {
        scoreOfUser++
        userWinCount.innerHTML = `Your Wins ${scoreOfUser}`
        return "You win"
    } else {
        return "War!"
    }
}

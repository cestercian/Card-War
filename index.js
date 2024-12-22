let deckId
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            deckId = data.deck_id
            console.log(deckId)
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
            header.textContent = winO(data.cards[0].value, data.cards[1].value)
        })
})


function winO (card1, card2){
    const rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]

    let c1 = rank.indexOf(card1);  // c1 is now a number (index of card1)
    let c2 = rank.indexOf(card2);  // c2 is now a number (index of card2)

    if(c1>c2){
        return("Computer ki maa ka bhosda")
    }else if (c2>c1){
        return("You win")
    }else{
        return("draw")
    }
}

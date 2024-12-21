let deckId
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card"  alt=""/>
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card"  alt=""/>
            `
            winO(data.cards[0].value, data.cards[1].value)
        })
})


function winO (card1, card2){
    const rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]

    let c1 = rank.indexOf(card1);  // c1 is now a number (index of card1)
    let c2 = rank.indexOf(card2);  // c2 is now a number (index of card2)

    if(c1>c2){
        console.log("Computer ki maa ka bhosda")
    }else if (c2>c1){
        console.log("You win")
    }else{
        console.log("draw")
    }
}


var Horizontal = 4;
var Vertical = 3;

function setCards(Horizontal, Vertical) {

    for(var i = 0; i < Horizontal * Vertical; i += 1) {

        var card = document.createElement('div');
        card.className = 'card';

        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';


        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        card.appendChild(cardInner);

        (function(c){

            c.addEventListener('click', function(){

                c.classList.toggle('flipped');
            });

        } (card));
        

        document.body.appendChild(card);
    }

}

setCards(Horizontal, Vertical);
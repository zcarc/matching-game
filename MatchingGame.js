
var Horizontal = 4;
var Vertical = 3;

var candidate_colors = ['red', 'red', 'orange', 'orange', 'green', 'green',  'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var colors = [];

// 카드가 뒤집히고 있을 때 클릭하는 것을 방지하기 위해서 플래그를 생성한다.
var clickFlag = true;

for(var i = 0; candidate_colors.length > 0; i += 1) {
    colors = colors.concat(candidate_colors.splice(Math.floor(Math.random() * candidate_colors.length), 1));
}

console.log(colors);


function setCards(Horizontal, Vertical) {

    // 카드를 세팅할 때는 클릭 할 수 없게 한다.
    clickFlag = false;

    for(var i = 0; i < Horizontal * Vertical; i += 1) {

        var card = document.createElement('div');
        card.className = 'card';

        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = colors[i];


        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        card.appendChild(cardInner);

        (function(c){

            c.addEventListener('click', function(){

                // 클릭플래그가 true인 경우만 클릭이 가능하게 설정.
                if(clickFlag){
                    c.classList.toggle('flipped');
                }
                
            });

        } (card));
        

        document.body.appendChild(card);
    }

    // 이렇게 하면 한번에 뒤집힘
    // document.querySelectorAll('.card').forEach(function (card, index){
    //     card.classList.add('flipped');
    // });

    // 인덱스 마다 하나씩 순차적으로 뒤집히게 만듦.
    // 이렇게 순차적으로 보여주고 이 시간동안 유저가 카드 색깔의 짝들을 외울시간을 준다.
    document.querySelectorAll('.card').forEach(function (card, index){

        setTimeout(function() {
            card.classList.add('flipped');
        }, 1000 + 100 * index);

    });

    // 그리고 유저가 맞추기 위해 5초 뒤에 다시 뒤집는다.
    setTimeout(function() {

        document.querySelectorAll('.card').forEach(function (card, index){
            card.classList.remove('flipped');
        });

        // 카드 세팅이 끝난 상태이므로 클릭플래그를 true로 만든다.
        clickFlag = true;

    }, 5000);


}

setCards(Horizontal, Vertical);
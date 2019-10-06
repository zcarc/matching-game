
var Horizontal = 4;
var Vertical = 3;

var candidate_colors = ['red', 'red', 'orange', 'orange', 'green', 'green',  'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];

// 배열과 참조 관계를 끊기 위해서 slice()를 사용한다.
// slice()를 사용하지 않으면 candadate_colors가 변하면 temp_colors로 변하게 된다.
var temp_colors = candidate_colors.slice();
var colors = [];

// 카드가 뒤집히고 있을 때 클릭하는 것을 방지하기 위해서 플래그를 생성한다.
var clickFlag = true;

// 하나 눌렀을 때 반응없고, 두개를 눌렀을 때 반응이 일어나야함
var clickCards = [];

var sameCards = [];

var startTime;


function shuffle() {

    for(var i = 0; candidate_colors.length > 0; i += 1) {
        colors = colors.concat(candidate_colors.splice(Math.floor(Math.random() * candidate_colors.length), 1));
    }
    

}



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

                // 클릭플래그가 true인 경우와 해당 카드가 sameCards에 없는 경우 실행
                if( clickFlag  && !sameCards.includes(c) ){
                    c.classList.toggle('flipped');

                    clickCards.push(c);
                    if(clickCards.length === 2) {
                        // console.log(clickCards[0].querySelector('.card-back').style.backgroundColor)
                        // console.log(clickCards[1].querySelector('.card-back').style.backgroundColor)
                        

                        if(clickCards[0].querySelector('.card-back').style.backgroundColor === clickCards[1].querySelector('.card-back').style.backgroundColor) {

                            sameCards.push(clickCards[0]);
                            sameCards.push(clickCards[1]);
                            clickCards = [];

                            if(sameCards.length === 12) {
                                var endTime = new Date();
                                alert("성공" + (endTime - startTime) / 1000 + '초 걸렸습니다.');

                                // 내부 태그들을 전부 지운다.
                                document.querySelector('#wrapper').innerHTML = '';

                                temp_colors = candidate_colors.slice();
                                colors = [];
                                sameCards = [];
                                startTime;
                                shuffle();
                                setCards(Horizontal, Vertical);
                            }
                          
                        } else { // 두 카드의 색상이 다르면  

                            clickFlag = false;

                            setTimeout(function() {
                                clickCards[0].classList.remove('flipped');
                                clickCards[1].classList.remove('flipped');
                                clickFlag = true;

                                // 비워야 다음에 클릭하는 것을 저장한다.
                                clickCards = [];
                            }, 1000);
                        }

                    }
                }
                
            });

        } (card));

        document.querySelector('#wrapper').appendChild(card);


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

        startTime = new Date();

    }, 5000);


}

shuffle();
setCards(Horizontal, Vertical);


// 원시 값은 값을 대입하면 자동적으로 복사가 된다.
// 하지만 객체나 배열 같은 원시 값이 아닌 것들은 대입할 때 참조가 된다.

// 원시변수
var name01 = "kacy";
var name02 = name01;

// 이 경우 name02를 바꿔도 name01에는 아무런 영향이 없다.
name02 = "hannah";

console.log('name01: ', name01, ", name02: ", name02);


// 배열
var arr = ["apple", "orange", "grape"];
var copyArr = arr;

// 이 경우는 참조관계이기 때문에 arr 배열에도 영향을 끼친다.
copyArr[0] = "tangerine";

console.log('arr: ', arr, ", copyArr: ", copyArr);


// 객체
var obj01 = {
	name: "kacy"
}

var obj02 = obj01

// 이 경우도 참조관계이기 때문에 obj01 객체에도 영향을 끼친다.
obj02.name = "hannah"

console.log('obj01: ', obj01, ", obj02: ", obj02);
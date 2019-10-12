
var Horizontal = 4;
var Vertical = 3;

var candidate_colors = ['red', 'red', 'orange', 'orange', 'green', 'green',  'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];

// 배열과 참조 관계를 끊기 위해서 slice()를 사용한다.
// slice()를 사용하지 않으면 candadate_colors가 변하면 temp_colors로 변하게 된다.

var temp_colors = candidate_colors.slice();

// 아래와 같이 사용해도 깊은 복사가 된다.
// var temp_colors = JSON.parse(JSON.stringify(candidate_colors));

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

                                // 아래와 같이 사용해도 깊은 복사가 된다.
                                // temp_colors = JSON.parse(JSON.stringify(candidate_colors));

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


// 객체 복사

var obj = {a:1, b:2};
var obj2 = {};

// 원시적인 방법: 객체의 변수를 각각 대입
obj2.a = obj.a;
obj2.b = obj.b;


// Object.keys()를 사용하는 방법
var obj = { a: 111, b: 222, c: 333 };

// 이 메소드에 객체를 넣으면 객체가 배열로 반환된다.
// 그래서 [0]:"a", [1]:"b", [2]:"c"
// Object.keys(obj);

// 여기서 obj2는 객체인데
// 배열에서 접근하는 것 처럼 obj2[] 이런식으로 접근해도 객체의 첫번째 값으로 인식한다.
// obj2가 빈 객체인 상태에서 obj2.a = 123; 이런식으로 대입하면 객체 변수 a가 자동으로 생성되고
// a에 123 이라는 integer 값이 들어간다.
// 그래서 아래와 같은 코드는 key만 넣어도 그 key를 자동으로 생성하고 그 key의 값을 obj에서 불러온다.
// 왼쪽 obj2[key] 는 변수를 받는다는 의미이고 오른쪽 obj[key]는 해당 객체에서 값을 호출한다는 의미이다.
var obj2 = {};
Object.keys(obj).forEach(function(key) {
    obj2[key] = obj[key];
})


// 객체 간에 참조 관계를 확인하는 방법
// 이렇게 객체 간에 같은 지 확인하고 true가 나온다면 서로 참조관계이다.
console.log(obj === obj2);


// 같은 값을 지닌 객체들은 서로 같을까?
var obj1 = {a:1, b:2};
var obj2 = {a:1, b:2};

// 객체의 값이 같더라도 서로 참조관계는 아니다.
console.log( obj1 === obj2 );

// 이렇게 참조를 한다면 그 순간부터 참조관계가 된다.
obj2 = obj1;
console.log( obj1 === obj2 );


// 위에서 설명한 아래의 코드는 완벽하게 참조가 아닌 복사를 할 수 있는 코드가 아니다.
var obj2 = {};
Object.keys(obj).forEach(function(key) {
    obj2[key] = obj[key];
})



var obj = { a:111, b: { c: 555 } };
var obj2 = {};

Object.keys(obj).forEach(function(key){
    obj2[key] = obj[key];
});

// 위 코드로서 obj2에 obj 객체의 값들이 복사되었을 것이다.
// obj2.a = 333; 을 변경하면 obj.a의 값은 111을 계속 유지한다.
// 여기서 obj.b는 객체를 담고있다
// obj2.b는 {c :555} 라는 객체를 담고있다.
// 앞에서 객체간에 대입은 복사가 아니라 참조가 된다.
// 그래서 obj2[b] = obj[b] 는 원시 값이 아니라 객체 값이기 때문에
// 참조관계가 되어 obj2.b.c = 777; 로 변경했을 때
// obj.b.c의 값도 777로 변경된다.



// 얕은 복사, 깊은 복사가 있는데 그게 바로 "참조", "복사"라고 생각하면 된다.

// 얕은 복사: 참조
// 깊은 복사: 복사
// JSON은 언어에 독립적이라 어떤 언어에서도 사용 가능하다.
// JSON.parse() : string 객체를 json 객체로 변환
// JSON.stringify() : json 객체를 string 객체로 변환

// slice() 메소드를 사용하면 겉에는 깊은 복사처럼 보이지만 속은 얕은 복사이다.


// 정리
var obj1 = {a:111, b:222, c:333};
var obj2 = {};

Object.keys(obj1).forEach(function(key) {

    obj2[key] = obj1[key];

}); // 1단계만 복사, 나머지는 참조


var arr1 = [1,2,3];
var arr2 = arr1.slice(); // 1단계만 복사, 나머지는 참조

var obj3 = JSON.parse(JSON.stringify(obj1));
var arr3 = JSON.parse(JSON.stringify(arr1));

// slice() 메소드나 Object.key() 메소드는 값이 1단계만 있을 때 사용한다.
// 1단계는 var obj1 = {a:111, b:222, c:333}; 이런식으로 key의 value가 객체가 아닌 원시 값일 때를 의미한다.
// 2단계: var arr1 = [ 555, 666, [777] ]
// 3단계: var obj1 = {a:111, b:222, c: { b: {c: 333} }};

// 2단계나 3단계일 때는 아래를 사용한다.
// 아래는 최대한 안쓰는게 좋다. 이유는 성능이 매우 안좋다.
// var obj3 = JSON.parse(JSON.stringify(obj1));
// var arr3 = JSON.parse(JSON.stringify(arr1));
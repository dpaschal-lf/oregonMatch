var cardClickSound = new Audio();
cardClickSound.src = 'soundFX/card_clicked.wav';
cardClickSound.volume = 0.2;

var noMatchSound = new Audio();
noMatchSound.src = 'soundFX/no_match.wav';
noMatchSound.volume = .6;

var cardMatchSound = new Audio();
cardMatchSound.src = 'soundFX/match-made.wav';
cardMatchSound.volume = .6;

var themeSong = new Audio();
themeSong.src = 'soundFX/main_song.mp3';
themeSong.volume = .5;

var ailmentSound = new Audio();
ailmentSound.src = 'soundFX/ailment.wav';

var winSound = new Audio();
winSound.src = 'soundFX/win_sound.wav';

var cardTypeArray = ['exhaustion','exhaustion','dysentery','dysentery','typhoid','typhoid','measles','measles','freshWater','freshWater','heartyFood','heartyFood','restStop','restStop','oxen','oxen','river','river','tree','tree','rifle','rifle','cactus','cactus','bovineSkull','bovineSkull','deer','deer','tumbleweed','tumbleweed'];
var cardMemory = null;
var cardsCurrentlyFlipped = 0;
var winCondition = 0;
var timerBarDepletionCounter = -1;
var totalWins = 0;
var totalDeaths = 0;


$(document).ready(dealCards);

Array.prototype.cardShuffle = function () {

    var arrayValue = this.length;
    var randomNumber;
    var tempValue;
    while (--arrayValue > 0) {
        randomNumber = Math.floor(Math.random() * (arrayValue + 1));
        tempValue = this[arrayValue];
        this[arrayValue] = this[randomNumber];
        this[randomNumber] = tempValue;
    }
};

function dealCards() {
    console.log('Dealing Cards ...');
    var card = "";
    var timerBar = "";
    cardTypeArray.cardShuffle();
    for (i = 0; i < cardTypeArray.length; i++) {
        card = ($('<div>', {
            class: "card",
            type: cardTypeArray[i],
            onclick: 'revealCardFace(this)'
        }));

        $('#gameBody').append(card);
        console.log('the ' + i + ' card was created');
    }
    for (i = 0; i < (cardTypeArray.length * 3); i++) {
        timerBar = ($('<div class="timerBar">'));
        $('#rightSideBar').append(timerBar);
    }
    themeSong.pause();
    themeSong.play();
}

function revealCardFace(clickInput) {
    var clickedCard = $(clickInput);
    var cardType = $(clickInput).attr('type');
    console.log('Card Clicked');
    cardsCurrentlyFlipped++;
    clickedCard.addClass(cardType).removeClass('card');
    cardClickSound.play();
    var time = document.getElementsByClassName('timerBar');

    if (cardMemory === null && cardsCurrentlyFlipped === 1) {
        cardMemory = [];
        cardMemory.push(cardType);
        console.log('First card ' + cardType + ' was added to memory.');
        clickedCard.addClass('disableClick');

    }else if (cardMemory !== null && cardsCurrentlyFlipped === 2) {
        console.log('Second card ' + cardType + ' was added to memory.');
        cardMemory.push(cardType);
        console.log('checking to see if ' + cardMemory[0] + ' === ' +cardMemory[1]);

        if(cardMemory[0] !== cardMemory[1]){
            console.log('No Match');
            $('.card').addClass('disableClick');
            setTimeout (function() {
                noMatchSound.play();
                $('.card').removeClass('disableClick');
                var firstCard = cardMemory[0];
                var secondCard = cardMemory[1];
                $("[type='" + firstCard + "']").removeClass('disableClick exhaustion dysentery typhoid measles freshWater heartyFood restStop oxen river tree rifle cactus bovineSkull deer tumbleweed').addClass('card');
                $("[type='" + secondCard + "']").removeClass('disableClick exhaustion dysentery typhoid measles freshWater heartyFood restStop oxen river tree rifle cactus bovineSkull deer tumbleweed').addClass('card');
                cardMemory = null;
                cardsCurrentlyFlipped = 0;
                for(i=0;i<2;i++) {
                    timerBarDepletionCounter++;
                    $(time[timerBarDepletionCounter]).addClass('depleted');
                }

                $('#accuracy').text('ACCURACY : ' + Math.round(60 / timerBarDepletionCounter) + '%');
            }, 600);
        }

        if (cardMemory[0] === cardMemory[1]) {
            console.log('Its a Match!');
            $("[type='" + cardMemory[0] + "']").addClass('disableClick');
            $("[type='" + cardMemory[1] + "']").addClass('disableClick');

            if (cardMemory[0] === "exhaustion" && cardMemory[1] === "exhaustion"){
                console.log('You Are Exhausted...');
                $('#mainText').text('You Are Exhausted...');
                ailmentSound.play();
                for(i=0;i<6;i++) {
                    timerBarDepletionCounter++;
                    $(time[timerBarDepletionCounter]).addClass('depleted');
                }
            }

            else if(cardMemory[0]  === "dysentery" && cardMemory[1] === "dysentery"){
                console.log('You Have Dysentery...');
                $('#mainText').text('You Have Dysentery...');
                ailmentSound.play();
                for(i=0;i<8;i++) {
                    timerBarDepletionCounter++;
                    $(time[timerBarDepletionCounter]).addClass('depleted');
                }
            }

            else if(cardMemory[0] === "typhoid" && cardMemory[1] === "typhoid"){
                console.log('You Have Typhoid...');
                $('#mainText').text('You Have Typhoid...');
                ailmentSound.play();
                for(i=0;i<6;i++) {
                    timerBarDepletionCounter++;
                    $(time[timerBarDepletionCounter]).addClass('depleted');
                }
            }

            else if(cardMemory[0] === "measles" && cardMemory[1] === "measles"){
                console.log('You Have Measles...');
                $('#mainText').text('You Have Measles...');
                ailmentSound.play();
                for(i=0;i<8;i++) {
                    timerBarDepletionCounter++;
                    $(time[timerBarDepletionCounter]).addClass('depleted');
                }
            }

            else if(cardMemory[0] === "freshWater" && cardMemory[1] === "freshWater"){
                console.log('Hydration');
                $('#mainText').text('You Feel Hydrated!');
                cardMatchSound.play();
                for(i=0;i<4;i++) {
                    $(time[timerBarDepletionCounter]).removeClass('depleted');
                    timerBarDepletionCounter--;
                }
            }

            else if(cardMemory[0] === "heartyFood" && cardMemory[1] === "heartyFood"){
                console.log('Yummy Food');
                $('#mainText').text('You Feel Full!');
                cardMatchSound.play();
                for(i=0;i<4;i++) {
                    $(time[timerBarDepletionCounter]).removeClass('depleted');
                    timerBarDepletionCounter--;
                }
            }

            else if(cardMemory[0] === "restStop" && cardMemory[1] === "restStop"){
                console.log('Yummy Food');
                $('#mainText').text('You Feel Rested!');
                cardMatchSound.play();
                for(i=0;i<4;i++) {
                    $(time[timerBarDepletionCounter]).removeClass('depleted');
                    timerBarDepletionCounter--;
                }
            }

            else if(cardMemory[0] === "rifle" && cardMemory[1] === "rifle"){
                console.log('Yummy Food');
                $('#mainText').text('You Gain Food From Your Hunt!');
                cardMatchSound.play();
                for(i=0;i<4;i++) {
                    $(time[timerBarDepletionCounter]).removeClass('depleted');
                    timerBarDepletionCounter--;
                }
            }

            cardMatchSound.play();
            cardMemory = null;
            cardsCurrentlyFlipped = 0;
            winCondition++;
            winGame();
        }
    }

    if (timerBarDepletionCounter >= cardTypeArray.length * 3) {
        console.log('You Lose');
        $('#mainText').text('You Have Died...');
        $('.card').addClass('disableClick');
        totalDeaths++;
        $('#totalDeaths').text('DEATHS : ' + totalDeaths);
        ailmentSound.play();
    }
}

function winGame(){
    if(winCondition === 15){
        console.log('You Win');
        winSound.play();
        $('#mainText').text('You Made It to Oregon!');
        totalWins++;
        $('#totalWins').text('WINS : ' + totalWins);
        $('#accuracy').text('ACCURACY : ' + Math.round(60 / timerBarDepletionCounter) + '%');
    }
}

function resetGame(){
    $('#gameBody').empty();
    $('#rightSideBar').empty();
    cardsCurrentlyFlipped = 0;
    cardMemory = null;
    timerBarDepletionCounter = -1;
    winCondition = 0;
    $('#mainText').text('Match The Cards!');
    dealCards();

}

function openTheAboutModal(){
    var aboutMeModal = $('.aboutModal');
    var openModal = $('#aboutMeButton');
    aboutMeModal.addClass('modalVisibility');
    $('.card').addClass('disableClick')

}

function closeTheModal() {
    var aboutMeModal = $('.aboutModal');
    var closeModal = $('#closeModalButton');
    aboutMeModal.removeClass('modalVisibility');
    $('.card').removeClass('disableClick');

}
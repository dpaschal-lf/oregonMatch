var cardsToUse = 9;

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
// themeSong.src = 'soundFX/main_song.mp3';
// themeSong.volume = .5;
// themeSong.onpause = function(){
//     this.play();
// }
$(document).ready(initializeApplication);
var defaultMethods = {
    onClick: ()=>{},
    onMatch: ()=>{},
    onMissmatch: ()=>{
        shiftLifeIndicator(-3);
    },
    onFirstclick: ()=>{},
    onSecondclick: ()=>{}
}
function initializeApplication(){
    var cards = dealCards(cardTypes, cardsToUse);
    $('#cardContainer').append(cards);
    var timerBars = populateTimerBar(cards);
    $('#rightSideBar').append(timerBars);
    initializeHealthData(timerBars);
    applyDefaultsToAllCardData(cardTypes, defaultMethods);

}


var healthData;
function initializeHealthData(segments){
    var reversedSegments = [];
    for(var segmentIndex=segments.length-1; segmentIndex>=0; segmentIndex--){
        reversedSegments.push( segments[segmentIndex]);
    }
    healthData = {
        segments: reversedSegments,
        currentHealth: reversedSegments.length
    }    
}
var ailmentSound = new Audio();
ailmentSound.src = 'soundFX/ailment.wav';

var winSound = new Audio();
winSound.src = 'soundFX/win_sound.wav';

var cardTypeArray = ['exhaustion','exhaustion','dysentery','dysentery','typhoid','typhoid','measles','measles','freshWater','freshWater','heartyFood','heartyFood','restStop','restStop','oxen','oxen','river','river','tree','tree','rifle','rifle','cactus','cactus','bovineSkull','bovineSkull','deer','deer','tumbleweed','tumbleweed'];

var cardTypes = {
    exhaustion: {
        name: 'exhaustion',
        count: 2, 
        image: 'exhaustion.png',
        onClick: function(){
            displayEffect('ruh roh!');
        },
        onMatch: function(){
            shiftLifeIndicator(-5);
            ailmentSound.play();
            displayEffect('You are exhausted');
        },
    },
    dysentery: {
        name: 'dysentery',
        count: 2, 
        image: 'dysentery.png',
        onfirstclick: function(){
            displayEffect('Ugh, that water was foul...');
        },
        onMatch: function(){
            shiftLifeIndicator(-5);
            drainLife(-10, function(){
                displayEffect('thank god that\'s over')
            });
            ailmentSound.play();
            displayEffect('You Have Dysentery...');
        },

    },
    typhoid: {
        name: 'typhoid',
        count: 2, 
        image: 'tyhpoid.png',
        onFirstclick: function(){
            displayEffect('You might have a fever');
        },
        onMatch: function(){
            drainLife(-20, function(){
                displayEffect('your fever has broken!');
            });
            ailmentSound.play();
            displayEffect('You Have Typhoid...');
        },
    },
    measles: {
        name: 'measles',
        count: 2, 
        image: 'measles.png',
        onFirstclick: function(){
            displayEffect('You don\'t feel so good...');
        },
        onMatch: function(){
            drainLife(-10, function(){
                displayEffect( chooseRandom(['a passerby offers you a cure','you feel better','a witchdoctor heals you!']));
            });
            ailmentSound.play();
            displayEffect('You Have Measles...');
        },
    },
    freshWater: {
        name: 'freshWater',
        count: 2, 
        image: 'freshWater.png',
        onFirstclick: function(){
            displayEffect(chooseRandom(['Is that a well?','something glimmers ahead', 'is that water?', 'you have a good feeling']));
        },
        onMatch: function(){
            shiftLifeIndicator(10);
            cardMatchSound.play();
            displayEffect('You Feel Hydrated!');
        },
    },
    heartyFood: {
        name: 'heartyFood',
        count: 2, 
        image: 'heartyFood.png',
        onFirstclick: function(){
            displayEffect(chooseRandom(['Looks like a cubby hole!','you discover something...','something smells good...']));
        },
        onMatch: function(){
            shiftLifeIndicator(5);
            cardMatchSound.play();
            displayEffect('You Feel Full!');
        },
    },
    restStop: {
        name: 'restStop',
        count: 2, 
        image: 'restStop.png',
        onFirstclick: function(){
            displayEffect(chooseRandom(['This looks promising','this might be a safe place...','a nap here couldn\'t hurt, right?']));
        },
        onMatch: function(){
            shiftLifeIndicator(5);
            cardMatchSound.play();
            displayEffect('You Feel Rested!');
        },
    },
    oxen: {
        name: 'oxen',
        count: 2, 
        image: 'oxen.png',
        onFirstclick: function(){
            displayEffect('A quadraped is in the distance');
        },
        onMatch: function(){
            displayEffect('You see oxen');
        },
    },
    river: {
        name: 'river',
        count: 2, 
        image: 'river.png',
        onFirstclick: function(){
            displayEffect(chooseRandom(['A band of silver glistens in the distance', 'you hear the sound of running water', 'might be a river ahead']));
        },
        onMatch: function(){
            displayEffect('You encounter a muddy river');
        },
    },
    tree: {
        name: 'tree',
        count: 2, 
        image: 'tree.png',
        onFirstclick: function(){
            displayEffect('A slender thing stands in the distance');
        },
        onMatch: function(){
            displayEffect('You encounter a lone tree');
        },
    },
    rifle: {
        name: 'rifle',
        count: 2, 
        image: 'rifle.png',
        onFirstclick: function(){
            displayEffect('This area seems to have game');
        },
        onMatch: function(){
            shiftLifeIndicator(10);
            cardMatchSound.play();
            displayEffect('You Gain Food From Your Hunt!');
        },
    },
    cactus: {
        name: 'cactus',
        count: 2, 
        image: 'cactus.png',
        onFirstclick: function(){
            displayEffect('A forked thing stands in the distance');
        },
        onMatch: function(){
            displayEffect('You see a lone cactus');
        },
    },
    bovineSkull: {
        name: 'bovineSkull',
        count: 2, 
        image: 'bovineSkull.png',
        onFirstclick: function(){
            displayEffect('Death lingers here...');
        },
        onMatch: function(){
            displayEffect('a bovine critter died here');
        },
    },
    deer: {
        name: 'deer',
        count: 2, 
        image: 'deer.png',
        onFirstclick: function(){
            displayEffect('This seems promising...');
        },
        onMatch: function(){
            displayEffect('You spot a deer far in the distance');
        },
    },
    tumbleweed: {
        name: 'tumbleweed',
        count: 2, 
        image: 'tumbleweed.png',
        onFirstclick: function(){
            displayEffect('Tumbleweed tumbleweed tumbleweed');
        },
        onMatch: function(){
            displayEffect('A tumbleweed rolls in the distance');
        },
    },
}
function applyDefaultsToAllCardData(data, defaults){
    for(var key in data){
        applyDefaultsToObjects(data[key], defaults);
    }
}
function applyDefaultsToObjects(object, defaultVals){
    for(var key in defaultVals){
        if(object[key]=== undefined){
            object[key] = defaultVals[key];
        }
    }
}
function chooseRandom(array){
    return array[ Math.floor(Math.random() * array.length)];
}



function playSound(src, volume=1, repeat=false){
    var sound = new Audio();
    sound.src=src;
    sound.volume=volume;
    var pause = false;
    if(repeat){
        sound.onpause = function(){
            if(!pause){
                sound.play();
            }
        }
    }
    sound.play();

    function stopSound(){
        pause = true;
        sound.pause();
    }
    return stopSound;
}


function displayEffect(message){
    $('#mainText').text(message);
}
function shiftLifeIndicator(amount){
    var startingPoint = healthData.currentHealth;
    var endingPoint = healthData.currentHealth+amount;

    if(amount<0){
        var action='addClass';
        var direction = -1;
        playSound('http://www.pacdv.com/sounds/domestic_sound_effects/can-to-table-1.wav', .2);
    } else {
        var action='removeClass';
        direction = 1;
        playSound('http://www.soundjay.com/appliances/sounds/coffee-pot-pick-up-1.mp3', .2);
    }
    for(healthIndex = startingPoint; healthIndex!=endingPoint; healthIndex+=direction){
        $(healthData.segments[healthIndex-1])[action]('depleted');
    }
    //$(time[timerBarDepletionCounter]).addClass('depleted');
    healthData.currentHealth+=amount;
    checkForDeath();
}
function drainLife(totalAmount, callback, timerPerTick=1000){
    if(callback===undefined){
        callback = function(){};
    }
    var totalAbs = Math.abs(totalAmount);
    var shiftDirection = totalAmount / totalAbs;
    var timer = null;
    var heartbeatStopFunction = playSound('http://depts.washington.edu/physdx/audio/normal.mp3', .6, true);
    function drainLifePerInterval(){
        shiftLifeIndicator(shiftDirection);
        totalAbs--;
        console.log(totalAbs);
        if(totalAbs===0 || healthData.currentHealth<=0){
            clearInterval(timer);
            heartbeatStopFunction();
            callback();
        }
    }
    drainLifePerInterval();
    timer = setInterval(drainLifePerInterval, timerPerTick);
}


var cardMemory = null;
var cardsCurrentlyFlipped = 0;
var winCondition = 0;
var timerBarDepletionCounter = -1;
var totalWins = 0;
var totalDeaths = 0;
var cardClicksDisabled = false;


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
function populateTimerBar(cardArray){
    var timerBars = [];
    for (i = 0; i < (cardArray.length * 3); i++) {
        timerBars.push($('<div class="timerBar">'));
    }
    return timerBars;
}

function dealCards(cardData, cardTypeCount) {
    var card = null;
    var cardTypeArray = Object.keys(cardData);
    cardTypeArray.cardShuffle();
    cardTypeArray = cardTypeArray.slice(cardTypeCount);
    var cardsToAppend = [];
    for (let i = 0; i < cardTypeArray.length; i++) {
        var thisCardName = cardTypeArray[i];
        var thisCardData = cardData[thisCardName];
        for(let cardCount=0; cardCount<thisCardData.count; cardCount++){
            card = $('<div>', {
                class: "card",
                type: cardTypeArray[i],
                on:{
                    click: handleCardClick,
                }
            });  
            cardsToAppend.push(card);          
        }


        
        console.log('the ' + i + ' card was created');
    }
    playSound('soundFX/main_song.mp3', .3, true);
    return cardsToAppend;
    
    
}

function handleCardClick() {
    var clickElement = this;
    if(cardClicksDisabled){
        return;
    }
    var clickedCard = $(clickElement);
    var cardType = clickedCard.attr('type');
    cardsCurrentlyFlipped++;
    clickedCard.addClass(cardType).removeClass('card');
    cardClickSound.play();

    if (cardMemory === null && cardsCurrentlyFlipped === 1) {
        cardMemory = [];
        cardMemory.push(cardType);
        clickedCard.addClass('disableClick');
        cardTypes[clickedCard.attr('type')].onFirstclick();

    }else if (cardMemory !== null && cardsCurrentlyFlipped === 2) {
        cardTypes[clickedCard.attr('type')].onSecondclick();
        cardMemory.push(cardType);

        if(cardMemory[0] !== cardMemory[1]){
            displayEffect('pick a card!');
            cardTypes[clickedCard.attr('type')].onMissmatch();

            $('.card').addClass('disableClick');
            cardClicksDisabled=true;
            setTimeout (function() {
                cardClicksDisabled=false;
                noMatchSound.play();
                $('.card').removeClass('disableClick');
                var firstCard = cardMemory[0];
                var secondCard = cardMemory[1];
                $("[type='" + firstCard + "']").removeClass('disableClick exhaustion dysentery typhoid measles freshWater heartyFood restStop oxen river tree rifle cactus bovineSkull deer tumbleweed').addClass('card');
                $("[type='" + secondCard + "']").removeClass('disableClick exhaustion dysentery typhoid measles freshWater heartyFood restStop oxen river tree rifle cactus bovineSkull deer tumbleweed').addClass('card');
                cardMemory = null;
                cardsCurrentlyFlipped = 0;

                $('#accuracy').text('ACCURACY : ' + Math.round(60 / timerBarDepletionCounter) + '%');
            }, 600);
        }

        else if (cardMemory[0] === cardMemory[1]) {
            cardTypes[clickedCard.attr('type')].onMatch();
            console.log('Its a Match!');
            $("[type='" + cardMemory[0] + "']").addClass('disableClick');
            $("[type='" + cardMemory[1] + "']").addClass('disableClick');

            //cardData[cardMemory[0]].onClick(time, timerBarDepletionCounter);

            

            cardMatchSound.play();
            cardMemory = null;
            cardsCurrentlyFlipped = 0;
            winCondition++;
            winGame();
        }
    }


}

function checkForDeath(){
    debugger;
    if (healthData.currentHealth <= 0) {

        displayEffect('You Have Died...');
        $('.card').addClass('disableClick');
        totalDeaths++;
        $('#totalDeaths').text('DEATHS : ' + totalDeaths);
        playSound('soundFX/WilhelmScream.wav');
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
var cardsToUse = 9;
var audioOn = true;
var cardsMatched = null;
var cardsToMatch = null;
var gamePlaying = true;
var backgroundStopper = null;
var healthData;
var matchAttempts=null;



var playingSounds = {};
var waitingClears = {};

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
    addEventHandlers();
    backgroundStopper = playBackgroundSounds();
    animateBackground();
    cycleOxen()
}
var animateBackground = initiateAnimateBackground;
function initiateAnimateBackground(){
    var headerBackgroundSize = null;
    var headerBackgroundPercent = 0;
    function successiveAnimateBackground(){
        
        function moveBackground(){
            headerBackgroundPercent++;

            var pixelConversion = (headerBackgroundPercent/100) * headerBackgroundSize+'px';
            $("header").css('background-position', pixelConversion+ " bottom");
        }
        setInterval(moveBackground, 300);
    }
    headerBackgroundSize = $("header").width();
    animateBackground = successiveAnimateBackground;
    animateBackground();

}

function cycleOxen(){
    var frames = [0, -116];
    var currentFrame = 0;

    function nextFrame(){
        currentFrame = 1 - currentFrame;
        $("#oxen").css('background-position', frames[currentFrame]+'px 0px');
    }
    setInterval(nextFrame, 500);
}

function addObjectToBackgroundAnimation( newImage ){
    var newImage = $("<img>",{
        src: newImage,
        class: 'backgroundImage',
        css: {
            right: '100%'
        }
    });
    $("header").append(newImage);
    newImage.animate({
        right: '-50%'
    }, 25000, 'linear', function(){
        newImage.remove();
    })
}


function getCurrentAccuracy(possibleRight,attempts){
    return ((possibleRight / attempts)*100).toFixed(2);
}
function addEventHandlers(){
    $("#aboutMeButton").click(function(){ openTheAboutModal() });
    $("#gameResetButton").click(resetGame);
    $("#audioToggle").click(function(){ toggleAudio() });
}

function playClickSound(){
    playSound('soundFX/card_clicked.wav', .2);
}
function playAilmentSound(){
    playSound('soundFX/ailment.wav');
}
function playWinSound(){
    playSound('soundFX/win_sound.wav')
}
function playMatchSound(){
    playSound('soundFX/match-made.wav', .5);
}
function playNoMatchSound(){
    playSound('soundFX/no_match.wav');
}



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

function toggleAudio(forceOff=false){
    
    var audioText = '';
    if(forceOff){
        audioOn = false;
    } else {
        audioOn = !audioOn;
    }
    if(audioOn){
        backgroundStopper = playBackgroundSounds();
        audioText = 'Mute';
    } else {
        stopAllSounds();
        audioText = 'Unmute';
    }
    $("#audioToggle > span").text( audioText);
    
}
function stopAllSounds(){
    for(var soundPlayers in playingSounds){
        if(playingSounds[soundPlayers].constructor === HTMLAudioElement){
            playingSounds[soundPlayers].pause();
        }
    }
}
function terminateAllTimers(){
    for(var stopFunction in waitingClears){
        if(typeof waitingClears[stopFunction] === 'function'){
            waitingClears[stopFunction]();
        }
    }

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
function playBackgroundSounds(){
    return playSound('soundFX/main_song.mp3', .3, true);
}


function playSound(src, volume=1, repeat=false){
    if(!audioOn){
        return;
    }
    var sound = new Audio();
    var currentTimestamp = Date.now();
    playingSounds[currentTimestamp] = sound;
    sound.oncanplay = function(){
        if(audioOn && !pause){
            sound.play()
        }
    }
    sound.src=src;
    sound.volume=volume;
    var pause = false;
    sound.onpause = function(){
        if(repeat && !pause && audioOn){
            sound.play();
        } else {
            if(playingSounds[currentTimestamp] && 
                playingSounds[currentTimestamp].constructor===HTMLAudioElement){
                delete playingSounds[currentTimestamp];
            }
        }
    }

    function stopSound(){
        pause = true;
        console.log('test');
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
    if(totalAmount<0){
        $("#rightSideBar").addClass('ailing');
    } else {
        $("#rightSideBar").addClass('healing');
    }
    var heartbeatStopFunction = playSound('http://depts.washington.edu/physdx/audio/normal.mp3', .6, true);
    var now = Date.now();
    function terminateTimer(useCallback=true){
            delete waitingClears[now];
            clearInterval(timer);
            heartbeatStopFunction();
            $("#rightSideBar").removeClass('ailing healing');
            if(useCallback){
                callback();
            }       
    }
    waitingClears[now] = terminateTimer;
    function drainLifePerInterval(){
        shiftLifeIndicator(shiftDirection);
        totalAbs--;
        if(!gamePlaying || totalAbs===0 || healthData.currentHealth<=0){
            terminateTimer(true);
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
    cardTypeArray = cardTypeArray.slice(0,cardTypeCount);
    var cardsToAppend = [];
    for (let i = 0; i < cardTypeArray.length; i++) {
        var thisCardName = cardTypeArray[i];
        var thisCardData = cardData[thisCardName];
        for(let cardCount=0; cardCount<thisCardData.count; cardCount++){
            cardsToMatch++;
            card = $('<div>', {
                class: "card",
                type: cardTypeArray[i],
                on:{
                    click: handleCardClick,
                }
            });  
            cardsToAppend.push(card);          
        }
    }
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
    clickedCard.addClass(cardType);
    playClickSound();
    matchAttempts++;
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
                playNoMatchSound();
                $('.card').removeClass('disableClick');
                var firstCard = cardMemory[0];
                var secondCard = cardMemory[1];
                $("[type='" + firstCard + "']").removeClass('disableClick exhaustion dysentery typhoid measles freshWater heartyFood restStop oxen river tree rifle cactus bovineSkull deer tumbleweed').addClass('card');
                $("[type='" + secondCard + "']").removeClass('disableClick exhaustion dysentery typhoid measles freshWater heartyFood restStop oxen river tree rifle cactus bovineSkull deer tumbleweed').addClass('card');
                cardMemory = null;
                cardsCurrentlyFlipped = 0;

            }, 600);
        }

        else if (cardMemory[0] === cardMemory[1]) {
            cardTypes[clickedCard.attr('type')].onMatch();
            console.log('Its a Match!');
            $("[type='" + cardMemory[0] + "']").addClass('disableClick');
            $("[type='" + cardMemory[1] + "']").addClass('disableClick');

            //cardData[cardMemory[0]].onClick(time, timerBarDepletionCounter);

            

            playMatchSound();
            cardMemory = null;
            cardsCurrentlyFlipped = 0;
            cardsMatched+=2;
            winGameCheck(cardsMatched, cardsToMatch);
        }
    }
    $('#accuracy').text('ACCURACY : ' + getCurrentAccuracy(cardsMatched, matchAttempts));



}

function checkForDeath(){
    if (healthData.currentHealth <= 0) {

        displayEffect('You Have Died...');
        $('.card').addClass('disableClick');
        totalDeaths++;
        displayEffect('DEATHS : ' + totalDeaths);
        playSound('soundFX/WilhelmScream.wav');
    }    
}

function winGameCheck(currentCards, totalCardPairs){
    if(currentCards === totalCardPairs){
        var previousAudio = audioOn;
        terminateAllTimers();
        console.log('about to toggle audio');
        stopAllSounds();
        //toggleAudio(true);
        //toggleAudio(previousAudio);
        playWinSound();
        var text = `You made it to Oregon<br>
        WINS: ${totalWins}<br>
        ACCURACY: ${getCurrentAccuracy(cardsMatched, matchAttempts)}`;
        openTheAboutModal(text);
        totalWins++;
    }
}

function resetGame(){
    gamePlaying=true;
    var previousAudio = audioOn;
    cardsMatched = null;
    cardsToMatch = null;
    toggleAudio(true);
    terminateAllTimers();
    $('#cardContainer').empty();
    $('#rightSideBar').empty();
    cardsCurrentlyFlipped = 0;
    cardMemory = null;
    displayEffect('Match The Cards!');  
    var cards = dealCards(cardTypes, cardsToUse);
    $('#cardContainer').append(cards);
    var timerBars = populateTimerBar(cards);
    $('#rightSideBar').append(timerBars);
    initializeHealthData(timerBars);
    applyDefaultsToAllCardData(cardTypes, defaultMethods);
    toggleAudio(!previousAudio);
    backgroundStopper = playBackgroundSounds();

}

function openTheAboutModal(content = $("#aboutTemplate>*").clone()){
    var aboutMeModal = $('#aboutModal');
    var openModal = $('#aboutMeButton');
    aboutMeModal.addClass('modalVisibility');
    $('.card').addClass('disableClick');
    $("#modalBody").empty().append(content);
}

function closeTheModal() {
    var aboutMeModal = $('#aboutModal');
    var closeModal = $('#closeModalButton');
    aboutMeModal.removeClass('modalVisibility');
    $('.card').removeClass('disableClick');

}
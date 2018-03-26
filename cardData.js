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
            playAilmentSound();
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
            playAilmentSound();
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
            playAilmentSound();
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
            playAilmentSound();
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
            playMatchSound();
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
            playMatchSound();
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
            playMatchSound();
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
            addObjectToBackgroundAnimation('images/oxen.png');
            setTimeout(addObjectToBackgroundAnimation, 1000, 'images/oxen.png')
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
            addObjectToBackgroundAnimation('images/river.png')
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
            addObjectToBackgroundAnimation('images/tree.png')
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
            playMatchSound();
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
            addObjectToBackgroundAnimation('images/cactus.png')
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
            addObjectToBackgroundAnimation('images/oxen.png');
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
            addObjectToBackgroundAnimation('images/deer.png')
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
            addObjectToBackgroundAnimation('images/tumbleweed.png')
        },
    },
}
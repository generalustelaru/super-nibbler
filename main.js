function init(){
    state.connect()
    modal.display('intro')
}
const state = {
    defaultData : {
        difficulty : 'easy',
        sound : 'mute',
        isGameData : false,
        score : 0,
        multiplier : 1,
        bonusBarFill : 0,
        abilities : { 
            descendants : 0,
            shedding : false,
            improvedMetabolism : false,
            heightenedSenses : false,
            fasterSynapses : false,
            toughEpiderm : false
        },
        wurmState : [],
        food : { 
            count: 0,
            top : 0,
            left : 0,
        }
    },
    data : {
        difficulty : 'easy',
        sound : 'mute',
        isGameData : false,
        score : 0, 
        multiplier : 1,
        bonusBarFill : 0,
        abilities : { 
            descendants : 0,
            shedding : false,
            improvedMetabolism : false,
            heightenedSenses : false,
            fasterSynapses : false,
            toughEpiderm : false
        },
        wurmState : [], //TODO: centralise & connect wurm

        food : { //TODO: centralise & connect food
            count: 0,
            top : 0,
            left : 0,
        }
    },
    ////////////////////////////////
    connect : function() {
        if (localStorage.getItem('superNibblerData')) {
            this.retreiveData()
        } else {
            this.saveData()
        }
        console.log(this.data)
    },
    saveData : function() {
        const stringData = JSON.stringify(this.data)
        localStorage.setItem('superNibblerData', stringData)
    },
    retreiveData : function() {
        const stringData = localStorage.getItem('superNibblerData')
        this.data = JSON.parse(stringData)
        if (this.data.score != 0) {
            this.data.isGameData = true
        }
        this.distributeData()
    },
    distributeData : function() {
        game.setDifficulty(this.data.difficulty)
        sounds.setSound(this.data.sound)
        scoreBox.setScore(this.data.score, this.data.multiplier)
        bonusBar.setFill(this.data.bonusBarFill)
    },
    clearGameData : function() {
        const difficulty = this.data.difficulty
        const sound = this.data.sound
        this.data = this.defaultData
        this.data.difficulty = difficulty
        this.data.sound = sound
        state.saveData()
    },
    /////////////////////////////////
    updateDifficulty : function(option) {
        this.data.difficulty = option
        state.saveData()
    },
    updateSound : function(option) {
        this.data.sound = option
        state.saveData()
    },
    updateScore : function(score) {
        this.data.score = score
        state.saveData()
    },
    updateMultiplier : function(multiplier) {
        this.data.multiplier = multiplier
        state.saveData()
    },
    updateBonusBarFill : function(fill) {
        this.data.bonusBarFill = fill
        state.saveData()
    }
}

const game = {
    pause : true,
    gameOver : true,
    //difficulty : 'easy',
    frameAt : 150,
    setDifficulty(option) {
        state.updateDifficulty(option)
        switch (option) {
            case 'larva':
                this.frameAt = 300
                break;
            case 'easy':
                this.frameAt = 150
                break;
            case 'normal':
                this.frameAt = 75
                break;
            default:
                break;
        }
        difficultyDisplay.update(option)
        if (this.isRunning()) {
            this.pauseGame()
        }
    },
    continueGame : function() {
        this.gameOver = false
        colorPalette.rollConfiguration()
        wurm.spawnWurm()
        sounds.playAmbience()
        wormFood.resetFood()
        commands.clearCommands()
        this.pause = false
        run(this.frameAt)
    },
    newGame : function() {
        if (state.data.isGameData) {
            this.continueGame()
        } else {
            this.gameOver = false
            colorPalette.resetColors()
            colorPalette.rollConfiguration()
            wurm.removeWurm()
            wurm.spawnWurm()
            sounds.playAmbience()
            bonusBar.depleteBar()
            scoreBox.resetScore()
            wormFood.resetFood()
            commands.clearCommands()
            this.pause = false
            run(this.frameAt)
        }
    },
    resumeGame : function() {
        this.pause = false
        if (sounds.isSound) {
            sounds.ambience.play()
        }
        modal.dismiss()
        run(this.frameAt)
    },
    pauseGame : function() {
        this.pause = true
        modal.display('pause')
        sounds.ambience.pause()
    },
    endGame : function() {
        state.clearGameData()
        this.pause = true
        sounds.stopAmbience()
        this.gameOver = true
        modal.display('gameOver')
    },
    isRunning : function() {
        return (this.pause ? false : true)
    },
    isOver : function() {
        return (this.gameOver ? true : false)
    }
}

function run(frameAt) {
    function iteration () { // game loop
        if (game.isRunning()) {
            const step = commands.feedNext()
            const newHead = wurm.addSegment(step)
            bonusBar.reduceBar()
            if (wormFood.isEaten()) {
                scoreBox.bumpScore()
                if (wormFood.count % 10 == 0) {
                    scoreBox.updateMultiplier('+')
                }
                wormFood.addFood()
            } else {
                wurm.removeLastSegment()
            }
            if (isCrossed(newHead) || isOut(newHead)) {
                sounds.play('bump')
                wurm.cutHead()
                clearInterval(interval)
                game.endGame()
            } else {
                wurm.displaySegment()
            }
            if (!document.hasFocus()) { // trigger pause on leaving document (lose focus)
                game.pauseGame()
            }
        } else {
            clearInterval(interval)
        }
    }
    const interval = setInterval(iteration, frameAt);
}






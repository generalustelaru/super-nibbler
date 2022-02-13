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
        colorPalette : {
            red : 194,
            green : 0,
            blue : 184,
            climber : '',
            faller : '',
            anchor : '',
            anchorValue : '',
            isConfigured : false,
            step : 1,
            nextConfiguration : ''
        },
        command : 'right',
        wurm : {
            segments : [],
            idCounter : 0,
        },
        food : { 
            count: 0,
            top : 0,
            left : 0,
        },
        abilities : { 
            descendants : 0,
            shedding : false,
            improvedMetabolism : false,
            heightenedSenses : false,
            fasterSynapses : false,
            toughEpiderm : false
        }
    },
    data : {},
    ////////////////////////////////
    connect : function() {
        if (localStorage.getItem('superNibblerData')) {
            this.retreiveData()
        } else {
            this.data = this.defaultData
        }
        console.log(this.data)
    },
    saveData : function() {
        const stringData = JSON.stringify(this.data)
        localStorage.setItem('superNibblerData', stringData)
        console.log('Game Saved')
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
        colorPalette.setColors(this.data.colorPalette)
        wormFood.setFood(this.data.food)
        commands.setCommand(this.data.command)
        wurm.setWurm(this.data.wurm)
        
    },
    clearGameData : function() {
        const difficulty = this.data.difficulty
        const sound = this.data.sound
        this.data = this.defaultData
        this.data.difficulty = difficulty
        this.data.sound = sound
        this.saveData()
    },
    /////////////////////////////////
    updateDifficulty : function(option) {
        this.data.difficulty = option
    },
    updateSound : function(option) {
        this.data.sound = option
    },
    updateScore : function(score) {
        this.data.score = score
    },
    updateMultiplier : function(multiplier) {
        this.data.multiplier = multiplier
    },
    updateBonusBarFill : function(fill) {
        this.data.bonusBarFill = fill
    },
    updateColorPalette : function(colorObject) {
        this.data.colorPalette = colorObject
    },
    updateFood : function(foodObject) {
        this.data.food = foodObject
    },
    updateCommand :function(command) {
        this.data.command = command
    },
    updateWurm : function(wurmObject) {
        this.data.wurm = wurmObject
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
        sounds.playAmbience()
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
        state.saveData()
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






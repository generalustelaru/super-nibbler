function init(){
    state.connect()
    modal.display('intro')
}

const game = {
    isPaused : true,
    isOver : true,
    frameAt : 150,
    setDifficulty(option) {
        state.updateDifficulty(option)
        switch (option) {
            case 'normal':
                this.frameAt = 75
                break
            case 'easy':
                this.frameAt = 150
                break
            case 'larva':
                this.frameAt = 300
                break
            default:
                break
        }
        difficultyDisplay.update(option)
        if (!this.isPaused) {
            this.pauseGame()
        }
    },
    continueGame : function() {
        this.isOver = false
        colorPalette.rollConfiguration()
        sounds.playAmbience()
        this.isPaused = false
        run(this.frameAt)
    },
    newGame : function() {
        if (state.isGameData) {
            this.continueGame()
        } else {
            state.clearGameData()
            this.isOver = false
            colorPalette.resetColors()
            colorPalette.rollConfiguration()
            wurm.removeWurm()
            wurm.spawnWurm()
            sounds.playAmbience()
            bonusBar.depleteBar()
            scoreBox.resetScore()
            wormFood.resetFood()
            commands.clearCommands()
            this.isPaused = false
            run(this.frameAt)
        }
    },
    resumeGame : function() {
        this.isPaused = false
        if (sounds.isSound) {
            sounds.ambience.play()
        }
        modal.dismiss()
        run(this.frameAt)
    },
    pauseGame : function() {
        this.isPaused = true
        modal.display('pause')
        sounds.ambience.pause()
        state.saveData()
    },
    endGame : function() {
        state.clearGameData()
        this.isPaused = true
        sounds.stopAmbience()
        this.isOver = true
        modal.display('gameOver')
    }
}

function run(frameAt) {
    function iteration () { // game loop
        if (!game.isPaused) {
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






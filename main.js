const game = {
    pause : true,
    gameOver : true,
    difficulty : 'easy',
    frameAt : 150,
    setDifficulty(level) {
        if (this.isRunning()) {
            this.pauseGame()
        }
        document.querySelector('.pen').click();
        switch (level) {
            case 'larva':
                this.frameAt = 300
                difficultyControls.switchDifficulty(this.difficulty, 'larva')
                this.difficulty = 'larva'
                break;
            case 'easy':
                this.frameAt = 150
                difficultyControls.switchDifficulty(this.difficulty,'easy')
                this.difficulty = 'easy'
                break;
            case 'normal':
                this.frameAt = 75
                difficultyControls.switchDifficulty(this.difficulty,'normal')
                this.difficulty = 'normal'
                break;
            default:
                break;
        }
    },
    newGame : function() {
        this.setDifficulty(this.difficulty)
        this.gameOver = false
        wurm.removeWurm()
        wurm.spawnWurm()
        sounds.playAmbience()
        bonusBar.depleteBar()
        scoreBox.resetScore()
        colorPalette.resetColors()
        colorPalette.rollConfiguration()
        modal.dismiss()
        wormFood.resetFood()
        commands.clearCommands()
        this.pause = false
        run(this.frameAt)
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
            if (!document.hasFocus()) {
                game.pauseGame()
            }
        } else {
            clearInterval(interval)
        }
    }
    const interval = setInterval(iteration, frameAt);
}






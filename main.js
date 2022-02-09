//alert('Press [Enter] to pause or start\nUse the arrow keys to maneuver')
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
        bonusBar.depleteBar()
        scoreBox.resetScore()
        colorPalette.resetColors()
        colorPalette.rollConfiguration()
        modal.dismiss()
        //wormFood.addFood()
        wormFood.resetFood()
        commands.clearCommands()
        wurm.removeWurm()
        wurm.spawnWurm()
        this.pause = false
        run(this.frameAt)
    },
    resumeGame : function() {
        this.pause = false
        modal.dismiss()
        run(this.frameAt)
    },
    pauseGame : function() {
        this.pause = true
        modal.display('pause')
    },
    endGame : function() {
        this.pause = true
        this.gameOver = true
        modal.display('gameOver')
        //alert('SCORE: '+(wormFood.getCount() - 1))
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
        } else {
            clearInterval(interval)
        }
    }
    const interval = setInterval(iteration, frameAt);    
}






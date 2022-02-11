const modal = {
    isVisible : false,
    introText: '&lt;&lt; Difficulty Sound &gt;&gt;<br><span class="highlightedText">Arrow keys</span> to maneuver.<br><span class="highlightedText">[Enter]</span> to Start/Pause.<br>\'Special treat\'<br>every 10th chow;<br>Evolve at every 100th.<br><div class="button" onclick="modal.display(\'license\')">License Info</div>',
    pauseText: 'Paused',
    gameOverText: 'Game Over',
    licenseText: 'This game uses sounds and music licensed under Creative Commons<br>Sound Effects:<br><a href="https://freesound.org/people/LittleRobotSoundFactory/" target="_blank">LittleRobotSoundFactory</a><br>Music:<br><a href="https://freemusicarchive.org/music/Xylo-Ziko" target="_blank">Xylo-Ziko-Subterranean</a><br><div class="button" onclick="modal.display(\'cta\')">Okay</div>',
    ctaText: 'Press Enter',
    dismiss : function() {
        this.isVisible = false
        document.querySelector('.modal').style.visibility = 'hidden'
    },
    display : function(message) {
        this.isVisible = true
        let element = document.querySelector('.modal')
        if (message != 'intro' && message != 'license') {
            element.className = 'modal stopped'
        } else {
            element.className = 'modal'
        }
        let contents = ''
        switch (message) {
            case 'pause':
                contents = this.pauseText
                break
            case 'gameOver':
                contents = this.gameOverText
                break
            case 'intro':
                contents = this.introText
                break
            case 'license':
                contents = this.licenseText
                break
            case 'cta':
                contents = this.ctaText
                break            
            default:
                break
        }
        element.innerHTML = contents
        element.style.visibility = 'visible'
    },
}

const pen  = {
    bgColor : '',
    setColor : function() {
        this.bgColor = colorPalette.getBackground()
        document.querySelector('.pen').style.background = this.bgColor
    }
}

function displaySquare(object) {
    const square = document.createElement('div')
    square.id = object.id
    if (square.id == 'food') {
        square.className = 'square food'
        if (object.count % 10 == 0) {
            square.style.backgroundColor = colorPalette.getFoodColor()
        }
    } else {
        square.className = 'square'
        square.style.backgroundColor = colorPalette.getColor()
    }
    square.style.top = object.top + 'px'
    square.style.left = object.left + 'px'
    const pen = document.querySelector('.pen')
    pen.appendChild(square)
}

function clearSquare(object) {
    const pen = document.querySelector('.pen')
    const toClear = document.getElementById(object.id + '')
    pen.removeChild(toClear)
}

const bonusBar = {
    fill : 600,
    unit : 2,
    isActive : false,
    getIsActive : function(){
        return this.isActive
    },
    depleteBar : function() {
        this.isActive = false
        this.fill = 0
        this.updateDisplay()
    },
    fillBar : function() {
        this.isActive = true
        this.fill = 600
        this.updateDisplay()
    },
    reduceBar : function() {
        this.fill -= this.unit
        if (this.fill < 0) {
            this.fill = 0
            if (this.isActive) {
                this.isActive = false
                colorPalette.resetColors()
                colorPalette.rollConfiguration()
                scoreBox.updateMultiplier() 
            }
        }
        this.updateDisplay()
    },
    updateDisplay : function() {
        document.getElementById('fill').style.width = (this.fill + 'px')
    }
}

const scoreBox = {
    score : 0,
    multiplier : 1,
    updateMultiplier : function(string) {
        switch (string) {
            case '+':
                this.multiplier += 1
                sounds.play('bonus')
                break;        
            default:
                sounds.play('bonusLost')
                this.multiplier = 1
                break;
        }
        scoreBox.displayScore()
    },
    resetScore : function() {
        this.score = 0
        this.multiplier = 1
        this.displayScore()
    },
    bumpScore : function() {
        this.score += this.multiplier
        if (this.multiplier == 1) {
            sounds.play('food')
        } else {
            sounds.play('xFood')
        }
        this.displayScore()
    },
    displayScore : function() {
        const scoreCounter = document.querySelector('#score')
        scoreCounter.innerText = this.score
        const scoreMultiplier = document.querySelector('#multiplier')
        scoreMultiplier.innerText = 'x' + this.multiplier
    }
}

const difficultyControls = {
    switchDifficulty : function(old, neu) {
        document.querySelector('#' + old).className = 'button'
        document.querySelector('#' + neu).className = 'button pressedButton'
    }
}

const soundDisplay = {
    showVolume : function(oldMode, newMode) {
        document.querySelector('#' + oldMode).className = 'button'
        document.querySelector('#' + newMode).className = 'button pressedButton'
    }
}
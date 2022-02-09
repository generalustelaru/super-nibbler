const modal = {
    isVisible : true,
    dismiss : function() {
        this.isVisible = false
        document.querySelector('.modal').style.visibility = 'hidden'
    }
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
            //scoreBox.updateMultiplier('+')
            //colorPalette.prepareConfiguration()
        }
        //colorPalette.setConfiguration()
    } else {
        square.className = 'square'
        //const debug = colorPalette.getColor()
        //console.log('render/displaySquare/getColor(): '+debug)
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
    //console.log(toClear)
    pen.removeChild(toClear)
}

const bonusBar = {
    fill : 0,
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
        this.fill = 100
        //console.log('Fill: '+this.fill)
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
    setUnit : function(newValue) { //unused
        this.unit = newValue
    },
    updateDisplay : function() {
        //document.getElementById('fill').style.width = ((this.fill * 6) + 'px')
        document.getElementById('fill').style.width = ((this.fill * 6) + 'px')
    }
}

const scoreBox = {
    score : 0,
    multiplier : 1,
    updateMultiplier : function(string) {
        switch (string) {
            case '+':
                this.multiplier *= 2
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
        //this.updateMultiplier()
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
        scoreMultiplier.innerText = 'X' + this.multiplier
    }
}
const difficultyControls = {
    switchDifficulty : function(old, neu) {
        document.querySelector('#' + old).className = 'button'
        document.querySelector('#' + neu).className = 'button pressedButton'
    }
}
const soundDisplay = {
    toggle : function(setting) {
        if (setting == false) {
            document.querySelector('#sound').className = 'button'    
        } else {
            document.querySelector('#sound').className = 'button pressedButton'
        }
        
    }
}
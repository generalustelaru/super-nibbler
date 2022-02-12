const sounds = {
    isSound : false,
    //mode : 'mute',
    volume : 0.1,
    setSound : function(option) {
        state.updateSound(option)
        switch (option) {
            case 'mute':
                this.isSound = false
                this.ambience.pause()
                break
            case 'discreet':
                this.isSound = true
                this.volume = 0.1
                this.ambience.volume = this.volume
                break
            case 'loud':
                this.isSound = true
                this.volume = 0.5
                this.ambience.volume = this.volume
                break
        }
        soundDisplay.update(option)
        if (game.isRunning()) {
            game.pauseGame()
        }
    },
    ambience : new Audio('sounds/Xylo-Ziko - Subterranean.mp3'),
    playAmbience : function(){
        if (this.isSound) {
            this.ambience.loop = true
            this.ambience.playbackRate = 1
            this.ambience.play()
        }
    },
    stopAmbience : function() {
        this.ambience.pause()
        this.ambience.src = 'sounds/Xylo-Ziko - Subterranean.mp3'
    },
    bonus : new Audio('sounds/bonusFood.wav'),
    bump : new Audio('sounds/bump.wav'),
    food : new Audio('sounds/food.wav'),
    xFood : new Audio('sounds/xFood.wav'),
    bonusLost : new Audio('sounds/bonusLost.wav'),
    play : function(sound) {
        if (this.isSound) {
            switch (sound) {
                case 'food':
                    this.food.volume = this.volume
                    this.food.play()
                    break
                case 'bump':
                    this.bump.volume = this.volume + 0.3
                    this.bump.play()
                    break
                case 'xFood':
                    this.xFood.volume = this.volume
                    this.xFood.play()
                    break
                case 'bonus':
                    this.bonus.volume = this.volume
                    this.bonus.play()
                    break
                case 'bonusLost': //TODO: [BUG] bonusLost shouldn't be played at start of new game
                    this.bonusLost.volume = this.volume
                    this.bonusLost.play()
                default:
                    break
            }
        }
    }
}
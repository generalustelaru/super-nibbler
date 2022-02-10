const sounds = {
    sounds : true,
    mode : 'discreet',
    volume : 0.1,
    setSound : function(newMode) {
        if (game.isRunning()) {
            game.pauseGame()
        }
        switch (newMode) {
            case 'mute':
                this.sounds = false
                break
            case 'discreet':
                this.sounds = true
                this.volume = 0.1
                break
            case 'loud':
                this.sounds = true
                this.volume = 0.5
                break
        }
        soundDisplay.showVolume(this.mode, newMode)
        this.mode = newMode
    },
    bonus : new Audio('sounds/bonusFood.wav'),
    bump : new Audio('sounds/bump.wav'),
    food : new Audio('sounds/food.wav'),
    xFood : new Audio('sounds/xFood.wav'),
    bonusLost : new Audio('sounds/bonusLost.wav'),
    play : function(sound) {
        if (this.sounds) {
            switch (sound) {
                case 'food':
                    this.food.volume = this.volume
                    this.food.play()
                    break
                case 'bump':
                    this.bump.volume = this.volume
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
                case 'bonusLost':
                    this.bonusLost.volume = this.volume
                    this.bonusLost.play()
                default:
                    break
            }
        }
    }
}
const sounds = {
    sounds : false,
    toggleSound : function() {
        if (game.isRunning()) {
            game.pauseGame()
        }
        if (this.sounds) {
            this.sounds = false
        } else {
            this.sounds = true
        }
        soundDisplay.toggle(this.sounds)
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
                    this.food.play()
                    break
                case 'bump':
                    this.bump.play()
                    break
                case 'xFood':
                    this.xFood.play()
                    break
                case 'bonus':
                    this.bonus.play()
                    break
                case 'bonusLost':
                    this.bonusLost.play()
                default:
                    break
            }
        }
    }
}
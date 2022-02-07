const sounds = {
    bonus : new Audio('sounds/bonusFood.wav'),
    bump : new Audio('sounds/bump.wav'),
    food : new Audio('sounds/food.wav'),
    xFood : new Audio('sounds/xFood.wav'),
    bonusLost : new Audio('sounds/bonusLost.wav'),
    play : function(sound) {
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
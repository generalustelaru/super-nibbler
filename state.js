const state = {
    isGameData : false,
    defaultData : {
        difficulty : 'easy',
        sound : 'mute',
        //isGameData : false,
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
        //this.data.isGameData = true
        if (this.data.score != 0) {
            this.isGameData = true
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
        this.isGameData = false
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
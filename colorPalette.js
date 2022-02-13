const colorPalette = {
    data : {
        red : 194,
        green : 0,
        blue : 184,
        climber : '',
        faller : '',
        anchor : '',
        anchorValue : '',
        isConfigured : false,
        step : 1,
        nextConfiguration : '',
    },
    setStep : function(segments) {
        //console.log(segments)
        this.data.step = (255 / segments) * scoreBox.multiplier
    },
    rollConfiguration : function () {
        const set = ['rgb','rbg','grb','gbr','brg','bgr']
        this.data.nextConfiguration = set[Math.round(Math.random() * 5)]
        state.updateColorPalette(this.data)
    },
    setConfiguration : function() {
        //scoreBox.updateMultiplier('+')
        this.data.isConfigured = true
        this.data.anchorValue = Math.round(Math.random() * 255)
        //this.data.anchorValue = 0
        const config = this.data.nextConfiguration
        switch (config) {
            case 'rgb':
                this.data.climber = 'red'
                this.data.faller = 'green'
                this.data.anchor = 'blue'
                this.data.red = 0
                this.data.green = 255
                this.data.blue = this.data.anchorValue
                break;
            case 'rbg':
                this.data.climber = 'red'
                this.data.faller = 'blue'
                this.data.anchor = 'green'
                this.data.red = 0
                this.data.green = this.data.anchorValue
                this.data.blue = 255
                break;
            case 'grb':
                this.data.climber = 'green'
                this.data.faller = 'red'
                this.data.anchor = 'blue'
                this.data.red = 255
                this.data.green = 0
                this.data.blue = this.data.anchorValue
                break;
            case 'gbr':
                this.data.climber = 'green'
                this.data.faller = 'blue'
                this.data.anchor = 'red'
                this.data.red = this.data.anchorValue
                this.data.green = 0
                this.data.blue = 255
                break;
            case 'brg':
                this.data.climber = 'blue'
                this.data.faller = 'red'
                this.data.anchor = 'green'
                this.data.red = 255
                this.data.green = this.data.anchorValue
                this.data.blue = 0
                break;
            case 'bgr':
                this.data.climber = 'blue'
                this.data.faller = 'green'
                this.data.anchor = 'red'
                this.data.red = this.data.anchorValue
                this.data.green = 255
                this.data.blue = 0
                break;
            default:
                break;
        }
        //console.log('faller: '+this.data.faller+'\n'+this.data.anchorValue)
        this.rollConfiguration()
    },
    updatePalette : function() {
        switch (this.data.climber) {
            case 'red':
                this.data.red += this.data.step
                break;
            case 'green':
                this.data.green += this.data.step
                break;
            case 'blue':
                this.data.blue += this.data.step
                break;
            default:
                break;
        }
        switch (this.data.faller) {
            case 'red':
                this.data.red -= this.data.step
                break;
            case 'green':
                this.data.green -= this.data.step
                break;
            case 'blue':
                this.data.blue -= this.data.step
                break;
            default:
                break;
        }
        if (this.data.red >= 255 || this.data.green >= 255 || this.data.blue >= 255) {
            const switcher = this.data.climber
            this.data.climber = this.data.faller
            this.data.faller = switcher
        }
    },
    getColor : function() {
        this.updatePalette()
        return 'rgb(' + this.data.red + ',' + this.data.green + ',' + this.data.blue + ')'
    },
    getFoodColor : function() {
        switch (this.data.nextConfiguration) {
            case 'rgb':
                return 'rgb(0,255,123)'
            case 'bgr':
                return 'rgb(123,255,0)'
            case 'rbg':
                return 'rgb(0,123,255)'
            case 'gbr':
                return 'rgb(123,0,255)'
            case 'grb':
                return 'rgb(255,0,123)'
            case 'brg':
                return 'rgb(255,123,0)'
            default:
                break
        }
    },
    resetColors : function() {
        this.data.red = 194
        this.data.green = 0
        this.data.blue = 184
        this.data.climber = ''
        this.data.faller = ''
        this.data.anchor = ''
        this.data.anchorValue = ''
        this.data.nextConfiguration = ''
        this.data.step = 50
        this.data.isConfigured = false
        state.updateColorPalette(this.data)
    },
    setColors : function(colorObject) {
        this.data = colorObject
    }
}

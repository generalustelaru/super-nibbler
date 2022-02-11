const colorPalette = {
    red : 0,
    green : 0,
    blue : 0,
    climber : '',
    faller : '',
    anchor : '',
    anchorValue : '',
    isConfigured : false,
    step : 1,
    setStep : function(segments) {
        //console.log(segments)
        this.step = (255 / segments) * scoreBox.multiplier
    },
    rollConfiguration : function () {
        const set = ['rgb','rbg','grb','gbr','brg','bgr']
        this.nextConfiguration = set[Math.round(Math.random() * 5)]
        //console.log('debug: '+this.nextConfiguration)
    },
    setConfiguration : function() {
        //scoreBox.updateMultiplier('+')
        this.isConfigured = true
        this.anchorValue = Math.round(Math.random() * 255)
        //this.anchorValue = 0
        const config = this.nextConfiguration
        switch (config) {
            case 'rgb':
                this.climber = 'red'
                this.faller = 'green'
                this.anchor = 'blue'
                this.red = 0
                this.green = 255
                this.blue = this.anchorValue
                break;
            case 'rbg':
                this.climber = 'red'
                this.faller = 'blue'
                this.anchor = 'green'
                this.red = 0
                this.green = this.anchorValue
                this.blue = 255
                break;
            case 'grb':
                this.climber = 'green'
                this.faller = 'red'
                this.anchor = 'blue'
                this.red = 255
                this.green = 0
                this.blue = this.anchorValue
                break;
            case 'gbr':
                this.climber = 'green'
                this.faller = 'blue'
                this.anchor = 'red'
                this.red = this.anchorValue
                this.green = 0
                this.blue = 255
                break;
            case 'brg':
                this.climber = 'blue'
                this.faller = 'red'
                this.anchor = 'green'
                this.red = 255
                this.green = this.anchorValue
                this.blue = 0
                break;
            case 'bgr':
                this.climber = 'blue'
                this.faller = 'green'
                this.anchor = 'red'
                this.red = this.anchorValue
                this.green = 255
                this.blue = 0
                break;
            default:
                break;
        }
        //console.log('faller: '+this.faller+'\n'+this.anchorValue)
        this.rollConfiguration()
    },
    updatePalette : function() {
        switch (this.climber) {
            case 'red':
                this.red += this.step
                break;
            case 'green':
                this.green += this.step
                break;
            case 'blue':
                this.blue += this.step
                break;
            default:
                break;
        }
        switch (this.faller) {
            case 'red':
                this.red -= this.step
                break;
            case 'green':
                this.green -= this.step
                break;
            case 'blue':
                this.blue -= this.step
                break;
            default:
                break;
        }
        if (this.red >= 255 || this.green >= 255 || this.blue >= 255) {
            const switcher = this.climber
            this.climber = this.faller
            this.faller = switcher
        }
    },
    getColor : function() {
        this.updatePalette()
        return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')'
    },
    getFoodColor : function() {
        switch (this.nextConfiguration) {
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
        this.red = 194
        this.green = 0
        this.blue = 184
        this.climber = ''
        this.faller = ''
        this.anchor = ''
        this.anchorValue = ''
        this.nextConfiguration = ''
        this.step = 50
        this.isConfigured = false
    }
}

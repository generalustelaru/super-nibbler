const wurm = {
    segments : [],
    idCounter : 0,
    getWurmSegments : function(){
        return this.segments
    },
    getHead : function() {
        return this.segments[0]
    },
    getTail : function() {
        return this.segments[this.segments.length - 1]
    },
    addSegment : function(command) {
        const neck = this.segments[0]
        const update = this.translateCourse(command)
        const newSegment = {
            id: this.idCounter++,
            top: neck.top + update.top,
            left: neck.left + update.left
        }
        this.segments.unshift(newSegment)
        //displaySquare(newSegment)
        colorPalette.setStep(this.segments.length)
        return newSegment
    },
    displaySegment : function() {
        displaySquare(this.segments[0])
    },
    cutHead : function() {
        this.segments.shift()
    },
    removeLastSegment : function() {
        const tail = this.getTail()
        this.segments.pop()
        clearSquare(tail)
    },
    translateCourse : function(command) {
        switch (command) {
            case 'down':
                return {top: 20, left: 0}
            case 'right':
                return {top: 0, left: 20}
            case 'up':
                return {top: -20, left:  0}
            case 'left':
                return {top: 0, left:  -20}
            default:
                break;
        }
    },
    removeWurm : function() {
        this.segments.forEach(segment => {
            clearSquare(segment)
        })
        this.segments = []
        this.idCounter = 0
    },
    spawnWurm : function() {
        let left = 120
        for (let i = 0; i < 3; i++) {
            const segment = {
                id : this.idCounter++,
                top: 140,
                left: left
            }
            this.segments.unshift(segment)
            displaySquare(segment)
            left += 20
        }
    }
}
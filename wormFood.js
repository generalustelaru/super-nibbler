const wormFood = {
    count: 0,
    id : 'food',
    top : -1,
    left : -1,
    maxRange : 30, // absolute maximum: 30
    minRange : 22, // absolute minimum: 1
    getCount : function() {
        return this.count
    },
    setMaxRange : function() { // Hightened Senses
        this.maxRange = 20
    },
    addFood : function() {
        this.count += 1
        if (this.top != -1) { // Provison for clearing food left from previous session
            clearSquare({id : this.id})
        }
        const segments = wurm.getWurmSegments()
        let isClear = true
        do { // Determine suitable spot for new food
            isClear = true
            ///////////////// Roll for location
            this.top = Math.round(Math.random() * 29) * 20 
            this.left = Math.round(Math.random() * 29) * 20
            ///////////////// Avoid placement on a worm segment
            segments.forEach(segment => { 
                if (this.top == segment.top && this.left == segment.left) {
                    isClear = false
                }
            })
            ///////////////// Avoid placement too close to the head
            const head = wurm.getHead()
            const distance = (Math.abs(this.top - head.top) + Math.abs(this.left - head.left)) / 20
            if (distance < this.minRange || distance > this.maxRange) {
                isClear = false
            }
        } while (!isClear);
        displaySquare({id : this.id, top : this.top, left : this.left, count : this.count}) // Display food
        if (this.count % 10 == 1 && this.count > 1) { // Initiate new bonus streak
            bonusBar.fillBar()
        }
    },
    isEaten : function() {
        const head = wurm.getHead()
        if (head.top == this.top && head.left == this.left) {
            if (this.count % 10 == 0) {
                colorPalette.setConfiguration()
            }
            return true
        }
        return false
    },
    resetFood : function() {
        if (document.querySelector('#food')) {
            clearSquare({id : this.id})
        }
        this.top = -1
        this.left = -1
        this.count = 0
        this.maxRange = 28
        this.addFood()
    }
}
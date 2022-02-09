const wormFood = {
    count: 0,
    id : 'food', 
    top : -1,
    left : -1,
    getCount : function() {
        return this.count
    },
    addFood : function() {
        //pen.setColor()
        this.count += 1
        if (bonusBar.isActive) {
            bonusBar.fillBar()
        }
        //console.log(this.count)
        if (this.count % 10 == 1 && this.count > 1) {
            //console.log('filled?')
            bonusBar.fillBar()
        }
        if (this.top != -1) {
            clearSquare({id : this.id})
        }
        const segments = wurm.getWurmSegments()
        //console.log(segments)
        let isClear = true
        do {
            isClear = true
            this.top = Math.round(Math.random() * 29) * 20
            this.left = Math.round(Math.random() * 29) * 20
            segments.forEach(segment => {
                if (this.top == segment.top && this.left == segment.left) {
                    //console.log(this.top+':'+segment.top+'$$'+this.left+':'+segment.left)
                    isClear = false
                }
            })
        } while (!isClear);
        //console.log('placed at '+this.top+' '+this.left)
        displaySquare({id : this.id, top : this.top, left : this.left, count : this.count})
    },
    isEaten : function() {
        const head = wurm.getHead()
        if (head.top == this.top && head.left == this.left) {
            if (this.count % 10 == 0) {
                //scoreBox.updateMultiplier('+')
                colorPalette.setConfiguration()
            }
            return true
        }
        return false
    },
    resetFood : function() {
        //console.log('reset')
        //console.log(this.id)
        if (document.querySelector('#food')) {
            clearSquare({id : this.id})    
        }
        this.top = -1
        this.left = -1
        this.count = 0
        this.addFood()
    }
}
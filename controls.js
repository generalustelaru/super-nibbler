window.addEventListener('keydown', (e) => { // track arrow keypresses
    const lastCommand = commands.reportLastCommand()
    switch (e.key) {
        case 'ArrowDown':
            if (lastCommand != 'up') {
                commands.recordCommand('down')
            }
            break;
        case 'ArrowRight':
            if (lastCommand != 'left') {
                commands.recordCommand('right')
            }
            break;
        case 'ArrowUp':
            if (lastCommand != 'down') {
                commands.recordCommand('up')
            }
            break;
        case 'ArrowLeft':
            if (lastCommand != 'right') {
                commands.recordCommand('left')
            }
            break;
        case 'Enter':
            if (game.isRunning()) {
                game.pauseGame()
            } else if (game.isOver()){
                game.newGame()
            } else {
                game.resumeGame()
            }
            break;
        default:
            break;
    }
})

const commands = { // queues up non-backtracking commands
    queue : [],
    course : 'right',
    feedNext : function() {
        if (this.queue.length == 0) {
            this.queue.push(this.course)
        } else {
            this.course = this.queue.shift()
        }
        return this.course
    },
    reportLastCommand : function() {
        if (this.queue.length > 0) {
            return this.queue[this.queue.length - 1]    
        }
        return this.course
    },
    recordCommand : function(command) {
        if (this.queue[this.queue.length - 1] != command) {
            this.queue.push(command)    
        }
    },
    clearCommands : function() {
        while (this.queue.length > 0) {
            this.queue.pop()
        }
        this.course = 'right'
    }
}

function isCrossed(head) {
    const wurmBody = wurm.getWurmSegments()
    for (let i = 3; i < wurmBody.length; i++) {
        const segment = wurmBody[i];
        if (head.top == segment.top && head.left == segment.left) {
            return true
        }
    }
    return false
}

function isOut(head) {
    if (head.top < 0 || head.left < 0 || head.top > 580 || head.left > 580)
        return true
    return false
}

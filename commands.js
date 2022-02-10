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
            console.log('Enter!')
            if (game.isRunning()) {
                game.pauseGame()
            } else if (game.isOver()){
                if (modal.isVisible) {
                    modal.dismiss()
                }
                game.newGame()
            } else {
                game.resumeGame()
            }
            break;
        default:
            break;
    }
})

const commands = { // manages commands
    auto : 'right',
    current : '',
    feedNext : function() {
        if (this.current == '') {
            this.current = this.auto
        }
        const command = this.current 
        this.auto = command
        this.current = ''
        return command
    },
    reportLastCommand : function() {
        return this.auto
    },
    recordCommand : function(command) {
        this.current = command
    },
    clearCommands : function() {
        this.current = ''
        this.auto = 'right'
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

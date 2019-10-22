
export default class TaskManager {

    constructor() {
        this._stack = []
    }

    async run (timeout = 0) {
        
        if (this._stack.length)
            setTimeout(async () => {
                await this._pop()
                this.run(Math.random() * 5000)
            }, timeout)
    }

    add (task) {
        this._stack.push(task)
    }

    async _pop () {
        const task = this._stack.shift()

        console.log(task.name)

        await task.run()
    }

}
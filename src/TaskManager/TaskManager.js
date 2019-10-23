import { resolve } from "path"

export default class TaskManager {

    _lastExecution = {}

    _minDelay = {
        "like-photo": 2,
        "follow-user": 20,
        "unfollow-user": 10
    }

    constructor() {
        this._stack = []
    }

    async run (timeout = 0) {
        
        if (this._stack.length)
            setTimeout(async () => {
                await this._pop();
                const delay = Math.random() * 1000 + 1000;
                console.log("applying a random delay of " + delay + "ms")
                this.run(delay)
            }, timeout)
        else 
            console.log("JOB DONE !")
    }

    add (task) {
        this._stack.push(task)
    }

    async _pop () {
        return new Promise(async (resolve, reject) => {
            const task = this._stack.shift()
            
            const delay = this._calculateNoSpamDelay(task.name)
            if (delay && task.skippable) {
                console.log("skip ", task.name);
                return resolve()
            }

            console.log("applying a delay of " + delay + "ms before " + task.name)
            setTimeout(async () => {
                const result = await task.run()
                resolve(result)
            }, delay)
        }) 
    }

    _calculateNoSpamDelay (name) {
        let delay = 0;
        const now = (new Date()).getMilliseconds();

        if (this._lastExecution[name]) {
            const lastTime = (new Date(this._lastExecution[name].lastExecTime)).getMilliseconds(),
                delta = now - lastTime;

            if (delta < (this._minDelay[name] * 1000)) {
                delay = (Math.random() * (this._minDelay[name] * 1000)) + ((this._minDelay[name] * 1000) - delta);
            }
        } else {
            this._lastExecution[name] = { count: 0, lastExecTime: now };
        }
        this._lastExecution[name].count++;
        this._lastExecution[name].lastExecTime = now;

        return delay;
    }

}
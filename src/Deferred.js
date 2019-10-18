export default class Deferred {
    constructor(){
        this.canceled = false
        this.promise = new Promise((resolve, reject) => {
            this.resolver = (value) => {
                if(!this.canceled) resolve(value)
            }
            this.rejecter = (value) => {
                if(!this.canceled) reject(value)
            }
        })
    }

    resolve(value){
        this.resolver(value)
    }

    reject(value){
        this.rejecter(value)
    }

    then(onFulfilled, onRejected){
        this.promise.then(onFulfilled, onRejected)
        return this
    }

    cancel(){
        this.canceled = true
    }

}
import Deferred from "../Deferred"

export default class Task extends Deferred {
    
    /**
     * 
     * @param {routines/RoutineAbstract} routine 
     * @param {Array} params 
     */
    constructor(routine, params) {
        super()

        this._routine = routine
        this._params = params
    }

    async run () {
        const params = this._params
        const result = await this._routine.run.apply(this._routine, params)
        return this.resolve(result)
    }

}
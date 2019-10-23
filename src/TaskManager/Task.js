import Deferred from "../Deferred"

export default class Task extends Deferred {
    
    /**
     * 
     * @param {routines/RoutineAbstract} routine 
     * @param {Array} params 
     */
    constructor(routine, params, name) {
        super()

        this._routine = routine;
        this._params = params;

        this._name = name || this._routine.name;
    }

    get name () {
        return this._name;
    }

    get skippable () {
        return !!this._routine.skippable;
    }

    async run () {
        const params = this._params;
        const result = await this._routine.run.apply(this._routine, params);
        return this.resolve(result);
    }

}
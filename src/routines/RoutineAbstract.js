import TaskManager from "../TaskManager/TaskManager"

export default class RoutineAbstract {

    /**
     * @var {Browser}
     */
    _browser = null;

    /**
     * @var {Logger}
     */
    _logger = null

    _name = "ABSTRACT - should be overiden"

    get name() {
        return this._name
    }

    constructor (browser, logger, taskManager) {
        this._browser = browser

        this._logger = logger

        this._taskManager = taskManager
    }

    run () {}

}
export default class RoutineAbstract {

    /**
     * @var {Browser}
     */
    _browser = null;

    /**
     * @var {Logger}
     */
    _logger = null

    constructor (browser, logger) {
        this._browser = browser

        this._logger = logger
    }

    run () {}

}
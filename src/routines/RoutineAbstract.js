export default class Routine {

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
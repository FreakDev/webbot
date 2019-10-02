const COLORS = {
    red: "\u001b[31m",
    green: "\u001b[32m",
    yellow: "\u001b[33m",
    blue: "\u001b[34m",
    magenta: "\u001b[35m",
    cyan: "\u001b[36m",
    white: "\u001b[37m",
    reset: "\u001b[0m"
}

export const RED = "red";
export const GREEN = "green";
export const YELLOW = "yellow";
export const BLUE = "blue";
export const MAGENTA = "magenta";
export const CYAN = "cyan";
export const WHITE = "white";
export const RESET = "reset";

export default class Logger
{

    _prefix

    constructor (prefix = '') {
        this._prefix = prefix
    }

    createInstance(prefix) {
        return new Logger(prefix);
    }

    log (...messages) {
        this._write(RESET, ...this._getPrefixedMessage(...messages))
    }

    info (...messages) {
        this._write(BLUE, ...this._getPrefixedMessage(...messages));
    }

    warn (...messages) {
        this._write(YELLOW, ...this._getPrefixedMessage(...messages));
    }

    error (...messages) {
        this._write(RED, ...this._getPrefixedMessage(...messages));
    }

    _getPrefixedMessage (...messages) {
        return [this._prefix !== "" ? this._prefix + " : " : "", ...messages]
    }

    _write(color, ...messages) {
        console.log(COLORS[color], ...messages, COLORS.reset)
    }

}
import puppeteer from 'puppeteer';

const DEFAULT_CONFIG = {
    main: {
        headless: false,
        executablePath: "/home/mathias/Téléchargements/chrome-linux/chrome",
        defaultViewport: null
    },
    windowDimensions: {

    },
    pageViewport: {
        width: 1024,
        height: 768
    }
}

export default class Browser {

    _browser = null;

    _page = null;

    _config = {}

    constructor() {
        this._config = Object.assign({}, DEFAULT_CONFIG)
    }

    async start(startPage = null) {
        this._browser = await puppeteer.launch(this._config.main);

        if (startPage) {
            return this.goto(startPage);
        }

        return Promise.resolve()
    }

    async goto(url) {
        this._page = (await this._browser.pages())[0];
        await this._page.setViewport(this._config.pageViewport);
        return await this._page.goto(url);
    }

    async evaluate(scriptCallback) {
        return await this._page.evaluate(scriptCallback)
    }

}
import puppeteer from 'puppeteer';

const DEFAULT_CONFIG = {
    main: {
        headless: false,
        executablePath: "/home/mathias/Téléchargements/chrome-linux/chrome",
        defaultViewport: null, 
        args: ["--no-sandbox", "--disable-infobars"]
    },
    windowDimensions: {

    },
    pageViewport: {
        width: 1024,
        height: 768
    },
    defaultTimeout: 3000,
}

export default class Browser {

    _browser = null;

    _page = null;

    _config = {}

    get currentPageUrl() {
        return this._page ? this._page.url() : "";
    }

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
        await this._page.setDefaultTimeout(this._config.defaultTimeout);
        return await this._page.goto(url);
    }

    async getNodes (selector) {
        await this._page.waitForSelector(selector);
        return await this._page.$$(selector);
    }

    async click (selector) {
        await this._page.waitForSelector(selector);
        return await this._page.click(selector);
    }

    async evaluate(scriptToEvaluate, ...args) {
        return await this._page.evaluate(scriptToEvaluate, ...args);
    }

    async getHTML (selector) {
        await this._page.waitForSelector(selector);
        return await this._page.$$eval(selector, nodes => nodes.map(n => n.innerHTML));
    }

    async getText (selector) {
        await this._page.waitForSelector(selector);
        return await this._page.$$eval(selector, nodes => nodes.map(n => n.innerText));
    }

}
import RoutineAbstract from "./RoutineAbstract";

const AUTHOR_BTN_SELECTOR = "article header > div:nth-child(2) h2 a";

export default class GetPhotoAuthor extends RoutineAbstract {

    async run (photoUrl) {

        this._logger.log('start')

        await this._gotoPhotoPage(photoUrl)
        return await this._extractAuthor()
    }

    async _gotoPhotoPage (photoUrl) {
        return this._browser.currentPageUrl !== photoUrl
            ? await this._browser.goto(photoUrl)
            : Promise.resolve();
    }

    async _extractAuthor () {
        const authors = await this._browser.getText(AUTHOR_BTN_SELECTOR);
        return authors[0];
    }
}

import RoutineAbstract from "./RoutineAbstract";

const LIKE_BTN_SELECTOR = "[aria-label=Like]";

export default class LikePhoto extends RoutineAbstract {

    async run (photoUrl) {

        this._logger.log('start')

        await this._gotoPhotoPage(photoUrl)
        const alreadyLiked = await this._checkLiked()
        if (!alreadyLiked) {
            await this._tryLike()
            return await this._checkLiked();
        } else {
            this._logger.info("Already Liked");
        }
        return true;
    }

    async _gotoPhotoPage (photoUrl) {
        return this._browser.currentPageUrl !== photoUrl
            ? await this._browser.goto(photoUrl)
            : Promise.resolve();
    }

    async _tryLike () {
        return await this._browser.click(LIKE_BTN_SELECTOR);
    }

    async _checkLiked () {
        emptyHearts = await this._browser.getNodes(LIKE_BTN_SELECTOR);
        return emptyHearts.length === 0
    }
}

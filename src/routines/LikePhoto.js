import RoutineAbstract from "./RoutineAbstract";

const LIKE_BTN_SELECTOR = "[aria-label=Like]";
const LIKED_BTN_SELECTOR = "[aria-label=Unlike]";

export default class LikePhoto extends RoutineAbstract {

    _name = "like-photo"

    async run (photoUrl) {

        this._logger.info("browse ", photoUrl);
        await this._gotoPhotoPage(photoUrl);
        const alreadyLiked = await this._checkLiked();
        if (alreadyLiked) {
            this._logger.info("Already Liked");
            return true;
        }

        await this._tryLike();
        const likeResult = await this._checkLiked();
        if (likeResult && await this._noDialog() ) {
            this._logger.info("Liked <3");
        } else {
            this._logger.warn("Oups... </3");
        }
        return likeResult;
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
        let fulfilledHeart = 0;
        try {
            fulfilledHeart = await this._browser.getNodes(LIKED_BTN_SELECTOR, { timeout: 1000 });
        } catch (e) {}
        return fulfilledHeart.length === 1;
    }

    async _noDialog() {
        return new Promise(async (resolve, reject) => {
            try {
                await this._browser.waitForSelector("div[role=dialog]", { timeout: 500 });
                resolve(false);
            } catch (e) {
                resolve(true);
            }    
        })
    }
}

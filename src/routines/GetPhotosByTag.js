import RoutineAbstract from "./RoutineAbstract";

export default class GetPhotosByTag extends RoutineAbstract {

    async run (tag) {

        this._logger.info('#' + tag);

        await this._gotoSearchResultPage(tag);

        const userStats = {};

        return await this._getPictureUrls();
    }

    async _gotoSearchResultPage (tag) {
        const userProfilePage = "https://www.instagram.com/explore/tags/" + tag + "/";

        return this._browser.currentPageUrl !== userProfilePage
            ? await this._browser.goto(userProfilePage)
            : Promise.resolve();
    }

    async _getPictureUrls () {
        const selector = "article > div:nth-child(3) a";

        const links = await this._browser.getNodes(selector);

        return Promise.all(links.map(async link => await link.evaluate(l => l.href)))
    }

}

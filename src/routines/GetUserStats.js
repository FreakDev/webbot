import RoutineAbstract from "./RoutineAbstract";

export default class GetUserStats extends RoutineAbstract {

    _name = "get-user-stats"

    async run (username) {

        this._logger.log('start');

        await this._gotoProfilePage(username);

        const userStats = {};

        userStats.followersCount = await this._getFollowersCount();
        userStats.followingCount = await this._getFollowingCount();
        userStats.postsCount = await this._getPostsCount();

        return userStats;
    }

    async _gotoProfilePage (username) {
        const userProfilePage = "https://www.instagram.com/" + username + "/";

        return this._browser.currentPageUrl !== userProfilePage
            ? await this._browser.goto(userProfilePage)
            : Promise.resolve();
    }

    async _getFollowersCount () {
        const selector = "header section ul li:nth-child(2) span";

        const countContainer = await this._browser.getNodes(selector);
        const countAsString = await countContainer[0].evaluate(e => e.getAttribute('title') || e.innerText)

        return this._parseInt(countAsString)
    }

    async _getFollowingCount () {
        const selector = "header section ul li:nth-child(3) span";

        const countContainer = await this._browser.getNodes(selector);
        const countAsString = await countContainer[0].evaluate(e => e.getAttribute('title') || e.innerText)

        return this._parseInt(countAsString)
    }

    async _getPostsCount () {
        const selector = "header section ul li:nth-child(1) span";

        const countContainer = await this._browser.getNodes(selector);
        const countAsString = await countContainer[0].evaluate(e => e.getAttribute('title') || e.innerText)

        return this._parseInt(countAsString)
    }

    _parseInt (numberAsString) {
        return parseInt(numberAsString.replace(/[\s|,]/g, ""), 10);
    }

}

import RoutineAbstract from "./RoutineAbstract";

const FOLLOW_BTN_SELECTOR = "header section span:nth-child(1) button";

export default class FollowUser extends RoutineAbstract {

    _name = "follow-user"

    async run (username) {

        this._logger.log('start')

        await this._gotoProfilePage(username)
        const alreadyFollowed = await this._checkAlreadyFollowed()
        if (!alreadyFollowed) {
            await this._tryFollow()
            return await this._checkAlreadyFollowed();
        } else {
            this._logger.info("Already followed");
        }
        return true;
    }

    async _gotoProfilePage (username) {
        const userProfilePage = "https://www.instagram.com/" + username + "/";

        return this._browser.currentPageUrl !== userProfilePage
            ? await this._browser.goto(userProfilePage)
            : Promise.resolve();
    }

    async _tryFollow () {
        return await this._browser.click(FOLLOW_BTN_SELECTOR);
    }

    async _checkAlreadyFollowed () {
        const followBtn = await this._browser.getNodes(FOLLOW_BTN_SELECTOR);
        return followBtn[0].evaluate(btn => btn.innerText.includes('Following'));
    }
}

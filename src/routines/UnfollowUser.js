import RoutineAbstract from "./RoutineAbstract";

const FOLLOW_BTN_SELECTOR = "header section span:nth-child(1) button";
const CONFIRM_UNFOLLOW_BTN_SELECTOR = "div[role=dialog] button:first-child";

export default class UnfollowUser extends RoutineAbstract {

    async run (username) {

        this._logger.log('start')

        await this._gotoProfilePage(username)
        const alreadyFollowed = await this._checkAlreadyFollowed()
        if (alreadyFollowed) {
            await this._tryUnfollow()
            return await !this._checkAlreadyFollowed();
        } else {
            this._logger.info("Not following");
        }
        return true;
    }

    async _gotoProfilePage (username) {
        const userProfilePage = "https://www.instagram.com/" + username + "/";

        return this._browser.currentPageUrl !== userProfilePage
            ? await this._browser.goto(userProfilePage)
            : Promise.resolve();
    }

    async _tryUnfollow () {
        await this._browser.click(FOLLOW_BTN_SELECTOR);
        await this._browser.click(CONFIRM_UNFOLLOW_BTN_SELECTOR);
    }

    async _checkAlreadyFollowed () {
        const followBtn = await this._browser.getNodes(FOLLOW_BTN_SELECTOR);
        return followBtn[0].evaluate(btn => btn.innerText.includes('Following'));
    }
}

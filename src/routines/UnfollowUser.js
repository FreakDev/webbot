import RoutineAbstract from "./RoutineAbstract";

const FOLLOW_BTN_SELECTOR = "header section span:nth-child(1) button";
const CONFIRM_UNFOLLOW_BTN_SELECTOR = "div[role=dialog] button:first-child";

export default class UnfollowUser extends RoutineAbstract {

    _name = "unfollow-user"

    async run (username) {

        this._logger.log('start unfollowing ', username)

        await this._gotoProfilePage(username)
        const alreadyFollowed = await this._checkAlreadyFollowed()
        this._logger.info("Do i follow you ?");
        if (alreadyFollowed) {
            this._logger.info("maybe i should not...");
            await this._tryUnfollow()
            const result = await !this._checkAlreadyFollowed();
            result ? this._logger.info("don't do anymore") : this._logger.warn("ooops i can't unfollow you")
            return result
        } else {
            this._logger.info("Nope i don't");
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

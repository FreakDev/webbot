import Routine from "./RoutineAbstract";

export default class GetUserFollowers extends Routine {

    async run (username) {
        await this._gotoProfilePage(username)
        await this._openFollowersList()
        await this._fetchAllFollowers()
        return await this._extractFollowersList()
    }

    async _gotoProfilePage (username) {
        const userProfilePage = "https://www.instagram.com/" + username + "/";

        return this._browser.currentPageUrl !== userProfilePage
            ? await this._browser.goto(userProfilePage)
            : Promise.resolve();
    }

    async _openFollowersList () {
        const followersButtonSelector = "a[href$=\"followers/\"]";

        return await this._browser.click(followersButtonSelector);
    }

    async _fetchAllFollowers () {
        // scroll into the followers list to load all
        const followersListWrapper = "div[role=dialog] > div:nth-child(2)";

        let followersListWrapperNode = await this._browser.getNodes(followersListWrapper);
        await followersListWrapperNode[0].evaluate(node => {
            return new Promise( (resolve ) => {
                let scrollTop = -1, endReachedCount = 0, endReachedLimit = 5
                const doScroll = () => {
                    if (node.scrollTop !== scrollTop) {
                        scrollTop = node.scrollTop;
                        node.scrollTo(0, node.scrollTop + 20);
                    }
                    else {
                        endReachedCount++;
                        if (endReachedCount > endReachedLimit) {
                            document.body.classList.add("all_followers_displayed")
                            resolve(true);
                            return;
                        }
                    }
                    setTimeout(doScroll, 150);
                }
                setTimeout(doScroll, 150)
            } )
        });
    }

    async _extractFollowersList () {
        const followersListItemSelector = "div[role=dialog] ul li a:nth-child(1)";

        return await this._browser.getText(followersListItemSelector)
    }

}

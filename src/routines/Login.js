import readline from "readline";
import RoutineAbstract from "./RoutineAbstract";

export default class Login extends RoutineAbstract {

    async run () {
        this._logger.log('start')
        await this._gotoLoginPage()
        await this._waitForLogin()
    }

    async _gotoLoginPage () {
        const userProfilePage = "https://www.instagram.com/accounts/login/";

        return this._browser.currentPageUrl !== userProfilePage
            ? await this._browser.goto(userProfilePage)
            : Promise.resolve();
    }

    async _waitForLogin () {
        return new Promise( (resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            this._logger.info("Please log in to instagram, then press \"enter\" here");
            rl.question("", () => {
                rl.close();
                resolve();
            });
        });
    }

}

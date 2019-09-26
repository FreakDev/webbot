import readline from "readline";
import Routine from "./RoutineAbstract";

export default class Login extends Routine {

    async run () {
        return new Promise(async (resolve, reject) => {

            await this._gotoLoginPage()

            await this._waitForLogin()

            resolve();
        })
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

            rl.question('Please log in to instagram, then press "enter" here', () => {

                rl.close();
                resolve();
            });
        });
    }

}

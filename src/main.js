import Browser from "./browser"
import GetUserFollowers from "./routines/GetUserFollowers";
import Login from "./routines/Login";

const b = new Browser();
const login = new Login(b);
const getUserFollowers = new GetUserFollowers(b);

(async function () {
    await b.start();
    await login.run();
    let f = await getUserFollowers.run("freakdev")
    console.log(f);
})();



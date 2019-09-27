import Browser from "./Browser"
import GetUserFollowers from "./routines/GetUserFollowers";
import Login from "./routines/Login";
import GetUserFollowing from "./routines/GetUserFollowing";
import Logger from "./Logger";

const b = new Browser();

const login = new Login(b, new Logger("LOGIN"));
const getUserFollowing = new GetUserFollowing(b, new Logger("GET FOLLOWING"));
const getUserFollowers = new GetUserFollowers(b, new Logger("GET FOLLOWERS"));

(async function () {
    await b.start();
    await login.run();
    let f = await getUserFollowers.run("freakdev")
    console.log(f);
})();

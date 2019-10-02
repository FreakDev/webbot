import Browser from "./Browser"
import Login from "./routines/Login";
import Logger from "./Logger";
import LikeLatestPhotosByTag from "./routines/LikeLatestPhotosByTag";

const b = new Browser();

const login = new Login(b, new Logger("LOGIN"));
const likeLatestByTag = new LikeLatestPhotosByTag(b, new Logger("LIKE LATEST"));

(async function () {
    await b.start();
    await login.run();
    let f = await likeLatestByTag.run("streetphotography")
    console.log(f);
})();

import Browser from "./Browser"
import Login from "./routines/Login";
import Logger from "./Logger";

import ProcessLatestPhotosByTag from "./routines/ProcessLatestPhotosByTag";
import CheckUnfollow from "./routines/CheckUnfollow";

import TaskManager from "./TaskManager/TaskManager";
import Task from "./TaskManager/Task";

const b = new Browser();

const tm = new TaskManager()

const login = new Login(b, new Logger("LOGIN"));


(async function () {
    await b.start();
    await login.run();
    // who i am
    // unfollow
    tm.add(
        new Task(new CheckUnfollow(b, new Logger("CHECK UNFOLLOW"), tm))
    );
    tm.add(
        new Task(new ProcessLatestPhotosByTag(b, new Logger("LIKE LATEST"), tm), ["homemadecooking"])
    );
    tm.run()
})();

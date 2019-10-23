import fs from "fs";
import RoutineAbstract from "./RoutineAbstract";
import UnfollowUser from "./UnfollowUser";
import Task from "../TaskManager/Task";
import FollowUser from "./FollowUser";
import GetUserStats from "./GetUserStats";
import GetPhotoAuthor from "./GetPhotoAuthor";

export default class CheckFollow extends RoutineAbstract {

    _name = "check-follow"
    
    async run (currentPhoto) {  
        
        const getPhotoAuthorRoutine = new GetPhotoAuthor (this._browser, this._logger.createInstance("FETCH PHOTO AUTHOR")),
        getUserStatsRoutine = new GetUserStats(this._browser, this._logger.createInstance("GET USER STATS")),
        followUserRoutine = new FollowUser(this._browser, this._logger.createInstance("FOLLOW USER"));

        this._logger.info("who has post this pic");
        const author = await getPhotoAuthorRoutine.run(currentPhoto);
        this._logger.info("who are you", author, "...");
        const stats = await getUserStatsRoutine.run(author);
    
        if (stats.followersCount < 5000 && stats.followingCount > 30) {
            this._logger.info("interresting stats");

            if (Math.random() > 0.4) {
                await this._appendToStorage(author);
                this._taskManager.add(new Task(followUserRoutine, [author]));
                this._logger.info("ok... now i follow you");
            } else {
                this._logger.info("no, i change my mind");
            }
        } else {
            this._logger.info("no, not my kind");
        }
    }

    _appendToStorage(name) {
        const FILE = __dirname + "/following.json",
            today = new Date();

        let jsonData, data;

        try {
            jsonData = fs.readFileSync(FILE),
            data = JSON.parse(jsonData);
        } catch(e) {
            data = []
        }

        data.push({ name, date: today });
        fs.writeFileSync(FILE, JSON.stringify(data));
    }

}
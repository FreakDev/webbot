import fs from "fs";
import RoutineAbstract from "./RoutineAbstract";
import GetPhotosByTag from "./GetPhotosByTag";
import LikePhoto from "./LikePhoto";
import Task from "../TaskManager/Task";
import FollowUser from "./FollowUser";
import GetUserStats from "./GetUserStats";
import GetPhotoAuthor from "./GetPhotoAuthor";

export default class ProcessLatestPhotosByTag extends RoutineAbstract {

    async run (tag) {

        const routinesTask = new Task(new GetPhotosByTag(this._browser, this._logger.createInstance("GET PHOTOS BY TAGS")), ["streetphotography"] )
                                        .then((photosList) => {
                                            let currentPhoto = photosList.pop();
                                            while (currentPhoto) {
                                                this._taskManager.add(new Task( new LikePhoto (this._browser, this._logger.createInstance("LIKE PHOTO")), [currentPhoto] ));
                                                this._taskManager.add(new Task({
                                                    run: async (currentPhoto) => {
                                                        const getPhotoAuthorRoutine = new GetPhotoAuthor (this._browser, this._logger.createInstance("FETCH PHOTO AUTHOR")),
                                                            getUserStatsRoutine = new GetUserStats(this._browser, this._logger.createInstance("GET USER STATS")),
                                                            followUserRoutine = new FollowUser(this._browser, this._logger.createInstance("FOLLOW USER"));
                                                        
                                                        const author = await getPhotoAuthorRoutine.run(currentPhoto);
                                                        const stats = await getUserStatsRoutine.run(author);

                                                        if (stats.followersCount < 5000 && stats.followingCount > 30 && Math.random() > 0.65) {
                                                            await this._appendToStorage(author);
                                                            await followUserRoutine.run(author);
                                                        }
                                                    }
                                                }, [currentPhoto]));
                                                currentPhoto = photosList.pop();
                                            }
                                        })


        this._taskManager.add( routinesTask )

        this._taskManager.run()

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
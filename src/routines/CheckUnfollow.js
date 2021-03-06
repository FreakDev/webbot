import fs from "fs";
import RoutineAbstract from "./RoutineAbstract";
import UnfollowUser from "./UnfollowUser";
import Task from "../TaskManager/Task";

export default class CheckUnfollow extends RoutineAbstract {

    _name = "check-unfollow"

    _skippable = true

    async run () {
        const followingList = this._readStorage(),
        today = new Date(),
        unfollowUserRoutine = new UnfollowUser(this._browser, this._logger.createInstance("UNFOLLOW USER"));

        const listLen = followingList.length, unfollowed = [];
        let i = 0;

        while (i < listLen) {
            let entry = followingList[i];
            const entryDate = new Date(entry.date);

            if (today.getMilliseconds() - entryDate.getMilliseconds() > 100) {
                this._taskManager.add(new Task(unfollowUserRoutine, [entry.name]))
                unfollowed.push(entry.name)
            }
            i++
        }

        this._saveNewList(followingList.filter((e) => {
            return unfollowed.indexOf(e.name) === -1
        }))
    }

    _readStorage(name) {
        const FILE = __dirname + "/following.json";

        let jsonData, data;

        try {
            jsonData = fs.readFileSync(FILE),
            data = JSON.parse(jsonData);
        } catch(e) {
            this._logger.warn(e)
        }

        return data;
    }

    _saveNewList(data) {
        const FILE = __dirname + "/following.json";

        fs.writeFileSync(FILE, JSON.stringify(data));

        return data;
    }

}
import fs from "fs";
import RoutineAbstract from "./RoutineAbstract";
import GetPhotosByTag from "./GetPhotosByTag";
import LikePhoto from "./LikePhoto";
import CheckFollow from "./CheckFollow";
import Task from "../TaskManager/Task";

export default class ProcessLatestPhotosByTag extends RoutineAbstract {

    _name = "process-latest-photos-by-tags"

    async run (tags) {

        const likePhotoRoutine = new LikePhoto (this._browser, this._logger.createInstance("LIKE PHOTO")),
            getPhotosByTagRoutine = new GetPhotosByTag(this._browser, this._logger.createInstance("GET PHOTOS BY TAGS")),
            checkFollowRoutine = new CheckFollow(this._browser, this._logger.createInstance("CHECK FOLLOW"), this._taskManager)

        this._taskManager.add( new Task(
            getPhotosByTagRoutine, tags )
                .then((photosList) => {
                    let currentPhoto = photosList.pop();

                    while (currentPhoto) {

                        this._taskManager.add(new Task( likePhotoRoutine, [currentPhoto] ));
                        this._taskManager.add(new Task(checkFollowRoutine, [currentPhoto]));
                        currentPhoto = photosList.pop();
                    }
                })
        );

    }

}
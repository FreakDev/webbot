import RoutineAbstract from "./RoutineAbstract"
import GetPhotosByTag from "./GetPhotosByTag"
import LikePhoto from "./LikePhoto"
import Task from "../TaskManager/Task";

export default class ProcessLatestPhotosByTag extends RoutineAbstract {

    async run (tag) {

        const routinesTask = new Task(new GetPhotosByTag(this._browser, this._logger.createInstance("GET PHOTOS BY TAGS")), ["streetphotography"] )
                                        .then((photosList) => {
                                            let currentPhoto = photosList.pop();
                                            while (currentPhoto) {
                                                this._taskManager.add(new Task( new LikePhoto (this._browser, this._logger.createInstance("LIKE PHOTO")), [currentPhoto] ))
                                                currentPhoto = photosList.pop();
                                            }
                                        })


        this._taskManager.add( routinesTask )

        this._taskManager.run()

    }

}
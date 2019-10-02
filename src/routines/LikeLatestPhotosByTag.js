import RoutineAbstract from "./RoutineAbstract"
import GetPhotosByTag from "./GetPhotosByTag"
import LikePhoto from "./LikePhoto"

export default class LikeLatestPhotosByTag extends RoutineAbstract {

    async run (tag) {

        const getPhotosByTag = new GetPhotosByTag(this._browser, this._logger.createInstance("GET PHOTOS BY TAGS"));
        const likePhoto = new LikePhoto (this._browser, this._logger.createInstance("LIKE PHOTO"));

        let photosList = await getPhotosByTag.run(tag);

        let currentPhoto = photosList.pop();
        while (currentPhoto) {
            await likePhoto.run(currentPhoto);
            currentPhoto = photosList.pop();
        }

    }

}
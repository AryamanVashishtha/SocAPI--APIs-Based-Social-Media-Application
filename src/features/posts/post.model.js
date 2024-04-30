export default class PostModel {
    constructor(id, userId, caption, imageUrl) {
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }
}
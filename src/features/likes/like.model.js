export default class LikeModel {
    constructor(id, userId, postId) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }

  static findLike(userId, postId) {
    const likeIndex = likes.findIndex(
      (l) =>l.userId == userId && l.postId == postId
    );
    return likeIndex;
  }
  static deleteLike(userId,postId) {
    //deleting existing like
    const likeIndex = likes.findIndex(
      (l) =>l.userId == userId && l.postId == postId
    );
    likes.splice(likeIndex, 1);
    console.log(likes)
    return likes;
  }
  static createLike(userId,postId){
    let id = likes.length+1
    const newLike = new LikeModel(id , userId , postId);
    return newLike;
  }
  static getAllLikes(postId) {
    const Likes = likes.find((l) => l.postId == postId);
    if (!Likes) {
      return Likes;
    }
    return Likes;
  }
}

var likes = [
  {
    id: 1,
    userId: "1",
    postId: "1",
  },
  {
    id: 2,
    userId: "2",
    postId: "2",
  },
];

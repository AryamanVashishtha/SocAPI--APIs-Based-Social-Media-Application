
export default class CommentModel{
    constructor(id, userId, postId, content) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }
    static postComment(id, userId, postId, content){
        let newComment = new CommentModel(
            id, userId, postId, content
        )
        newComment.id = comments.length+1;
        comments.push(newComment);
        return newComment;
    }
    static getAllComments(postId){
        const comment = comments.find((c)=>c.postId == postId);
        return comment;
    }

    static updateComment(commentId,userId,content){
        const commentIndex = comments.findIndex((c)=> c.id == commentId && c.userId == userId);
        if(commentIndex<=-1){
            return commentIndex;
        }
        comments[commentIndex].content = content;
        return comments[commentIndex];
    }
    static deleteComment(commentId,userId){
        const commentIndex = comments.findIndex((c)=> c.id == commentId && c.userId == userId);
        if(commentIndex<=-1){
            return commentIndex;
        }
        else{
            comments.splice(commentIndex,1);
            return commentIndex;
        }
    }


}

var comments =[
    {
        id: 1,
        userId: '1',
        postId: '1',
        content: 'Comment number 1',
    },
    {
        id: 2,
        userId: '2',
        postId: '2',
        content: 'Comment number 2',
    },
];
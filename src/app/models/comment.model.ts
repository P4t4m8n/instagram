export interface CommentModel {
    imgUrl: string
    _id: string
    commentBy: CommentByModel
    comment: string
    likes: number
    createdAt: Date
    comments: Array<CommentModel>
}

export interface CommentByModel {
    _id: string
    userName: string
}
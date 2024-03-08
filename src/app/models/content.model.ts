export interface ContentModel {
    _id: string
    imgUrl: string
    likes: number
    comments: Array<CommentModel>
    following: Array<string>
}

export interface CommentModel {
    _id: string
    name: string
    comment: string
    likes: number
    createdAt: Date
    comments: Array<CommentModel>
}

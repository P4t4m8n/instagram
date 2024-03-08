export interface CommentModel {
    _id: string
    name: string
    comment: string
    likes: number
    createdAt: Date
    comments: Array<CommentModel>
}
import { CommentModel } from "./comment.model"
export interface ContentModel {
    _id: string
    imgUrl: string
    likes: number
    comments: Array<CommentModel>
    following: Array<string>
}



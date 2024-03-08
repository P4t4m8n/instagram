import { ContentModel } from "./content.model"

export interface UserModel {
    _id?: string
    userName: string
    content: Array<string>
    following: Array<string>
    likes: Array<string>

}

export interface UserSmallModel {

}

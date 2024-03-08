import { CommentByModel, CommentModel } from "../models/comment.model";
import { ContentModel } from "../models/content.model";

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomCommentByModel(): CommentByModel {
    return {
        _id: `${Math.random().toString(36).substring(2, 15)}`,
        userName: `User${getRandomInt(1, 100)}`
    };
}

function createRandomCommentModel(depth: number = 0): CommentModel | null {
    if (depth > 2) return null; // Limit nesting depth

    const comment: CommentModel = {
        imgUrl: `https://example.com/commentImg${getRandomInt(1, 10)}.jpg`,
        _id: `${Math.random().toString(36).substring(2, 15)}`,
        commentBy: createRandomCommentByModel(),
        comment: `This is a sample comment ${getRandomInt(1, 1000)}.`,
        likes: getRandomInt(0, 500),
        createdAt: new Date(),
        comments: []
    };

    // Randomly decide if this comment should have nested comments
    if (Math.random() > 0.5) {
        for (let i = 0; i < getRandomInt(1, 3); i++) {
            const nestedComment = createRandomCommentModel(depth + 1);
            if (nestedComment) comment.comments.push(nestedComment);
        }
    }

    return comment;
}

export function createRandomContentModel(): ContentModel {
    const content: ContentModel = {
        _id: `${Math.random().toString(36).substring(2, 15)}`,
        imgUrl: 'https://res.cloudinary.com/dpnevk8db/image/upload/v1705450237/s8mdwh4iykoiro0wzsww.jpg',
        likes: getRandomInt(100, 1000),
        comments: [],
        following: Array.from({ length: getRandomInt(1, 10) }, () => `user_${Math.random().toString(36).substring(2, 15)}`)
    };

    for (let i = 0; i < getRandomInt(1, 5); i++) {
        const comment = createRandomCommentModel();
        if (comment) content.comments.push(comment);
    }

    return content;
}

// Generate random demo data


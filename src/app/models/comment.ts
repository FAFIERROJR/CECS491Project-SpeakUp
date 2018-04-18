import { Vote } from "./vote";

export class Comment 
{
    comment_id: string
    content: string
    server_time: number
    user_date: string
    user_time: string
    username: string
    uid: string
    xp: number = 0
    vote_history: Vote
    parent_comment: Comment
}

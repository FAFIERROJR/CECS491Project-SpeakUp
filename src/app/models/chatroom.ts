import { Comment } from "./comment";

export class Chatroom
{
    chatroom_id: string
    instructor_id: string
    classlist: string[]
    accessCode: string
    comments: Comment[]
}

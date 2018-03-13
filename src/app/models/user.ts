import {Course} from './course';
export class User
{
    uid:        string  //the firebase user id
    first_name: string
    last_name:  string
    uni_id:     string
    uni_email:  string
    username:   string
    courses:    Course[]
}

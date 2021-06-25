import { User } from "./User"

export class Candidate {
    key: string
    name: string
    email: String
    no: Number
    uid: string
    profile_image: String = "default.jpg"
    about: string
    content: string
    website: any
    place: string
    linkedin: string
    cretedAt: any
    updatedAt: any
    alarm: Date
    alarmNote: string
    user: User
    processId: string
    taskId: any
    stepNotes = { ik: false, tknk: false, tklfgrs: false, tklfvrln: false, mstrikgrs: false, mstrtknkgrs:false, adyistf: false, dnmsrc: false }
    message: any = "s.a"
    date: any
    aTaskId: any
    accepted: []
}
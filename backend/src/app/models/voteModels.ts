

export interface Votes{
    id:string,
    userId:string,
    pollId:string,
    choiceMade:string,
    isOpen?:number,
    createdAt?:string,
    isDeleted?:number
}
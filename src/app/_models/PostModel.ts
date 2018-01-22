export class PostModel {

    constructor(public title: string, public fulltext: string, public datecreated: string,
        public category: string, public username: string, public comments: Array<PostModel>)
    {

    }
}
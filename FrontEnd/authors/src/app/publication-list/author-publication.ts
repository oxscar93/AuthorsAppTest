export class AuthorPublication{

    constructor(title:string, body:string, date:Date){
        this.title = title;
        this.body = body;
        this.date = date
    }

    title: string;
    body: string;
    date: Date;
}

export class AuthorPublicationResolve{

    constructor(authorPublicationList:AuthorPublication[], authorId: string){
        this.authorPublicationList = authorPublicationList;
        this.authorId = authorId;
    }

    authorPublicationList: AuthorPublication[];
    authorId: string;
}
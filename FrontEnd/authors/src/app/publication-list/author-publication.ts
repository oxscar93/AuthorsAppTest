export class AuthorPublication{

    constructor(title:string, body:string, date:Date){
        this.title = title;
        this.body = body;
        this.publicationDate = date;
    }

    title: string;
    body: string;
    publicationDate: Date;
    authorId: string
}

export class AuthorPublicationResolve{

    constructor(authorPublicationList:AuthorPublication[], authorId: string){
        this.authorPublicationList = authorPublicationList;
        this.authorId = authorId;
    }

    authorPublicationList: AuthorPublication[];
    authorId: string;
}

export class PaginatedAuthorPublicationResult{

    constructor(result:any, lastKey:any){
        this.result = result;
        this.lastKey = lastKey;
    }
    result: any;
    lastKey: any;
}
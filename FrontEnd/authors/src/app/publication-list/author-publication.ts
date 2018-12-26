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

    constructor(authorPublicationList:AuthorPublication[], authorId: string, authorName: string){
        this.authorPublicationList = authorPublicationList;
        this.authorId = authorId;
        this.name = authorName
    }

    authorPublicationList: AuthorPublication[];
    authorId: string;
    name :string;
}

export class PaginatedAuthorPublicationResult{

    constructor(result:any, lastKey:any){
        this.result = result;
        this.lastKey = lastKey;
    }
    result: any;
    lastKey: any;
}
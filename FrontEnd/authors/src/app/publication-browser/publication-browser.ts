import { PaginatedAuthorPublicationResult } from "../publication-list/author-publication";

export class PublicationBrowserResolver{

    constructor(authorPublicationList:PaginatedAuthorPublicationResult, title: string){
        this.authorPublicationList = authorPublicationList;
        this.title = title;
    }

    authorPublicationList: PaginatedAuthorPublicationResult;
    title: string;
}

export class AuthorPublicationBrowser{

    constructor(title:string, body:string, date:Date, author: string){
        this.title = title;
        this.body = body;
        this.publicationDate = date;
        this.author = author;
    }

    title: string;
    body: string;
    publicationDate: Date;
    author: string
}
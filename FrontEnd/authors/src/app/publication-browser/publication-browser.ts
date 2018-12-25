import { PaginatedAuthorPublicationResult } from "../publication-list/author-publication";

export class PublicationBrowserResolver{

    constructor(authorPublicationList:PaginatedAuthorPublicationResult, title: string){
        this.authorPublicationList = authorPublicationList;
        this.title = title;
    }

    authorPublicationList: PaginatedAuthorPublicationResult;
    title: string;
}
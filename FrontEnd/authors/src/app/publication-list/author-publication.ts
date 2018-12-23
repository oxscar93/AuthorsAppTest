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

import slugify from "slugify";

export class Competition {
    id: number;
    name: string;
    slug: string;
    
    constructor(
        id: number,
        name: string,
        slug: string
    ){
        this.id = id;
        this.name = name;
        this.slug = slugify(name);
    }
}
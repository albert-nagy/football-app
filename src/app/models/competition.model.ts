import { Area } from "./area.model";

export class Competition {
    id: number;
    name: string;
    slug: string;
    area: Area;
    
    constructor(
        id: number,
        name: string,
        area: Area
    ){
        this.id = id;
        this.name = name;
        this.area = area;
    }
}
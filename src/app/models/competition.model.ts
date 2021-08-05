import { Area } from "./area.model";

export class Competition {
    id: number;
    name: string;
    slug: string;
    area: Area;
    plan: string;
    
    constructor(
        id: number,
        name: string,
        area: Area,
        plan: string
    ){
        this.id = id;
        this.name = name;
        this.area = area;
        this.plan = plan;
    }
}
import { Food } from "./food";

export class Cart{
    _food : Food;
    _quantity: number;

    constructor(food: Food, quantity: number){
        this.food = food;
        this.quantity = quantity;
    }

    public set quantity(quantity : number){
        this._quantity = quantity;
    }

    public get quantity() : number{
        return this._quantity;
    }

    public set food(food : Food){
        this._food = food;
    }

    public get food() : Food{
        return this._food;
    }
}
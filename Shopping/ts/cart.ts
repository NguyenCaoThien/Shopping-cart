import { Food } from "./food";

export class Cart{
    food : Food;
    quantity: number;

    constructor(food: Food, quantity: number){
        this.food = food;
        this.quantity = quantity;
    }

    public setQuantity(quantity): void{
        this.quantity = quantity;
    }

    public getQuantity() : number{
        return this.quantity;
    }
}
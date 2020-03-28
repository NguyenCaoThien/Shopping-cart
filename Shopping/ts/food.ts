export class Food{
    private id: string;
    public imgUrl: string;
    private foodDescription: string;
    private price: number;
    private foodName: string;
    private canBuy: boolean;

    public constructor(imgUrl?: string, foodDescription?: string, price?: number, foodName?: string, canBuy?: boolean, id? : string){
        this.imgUrl = imgUrl;
        this.foodDescription = foodDescription;
        this.price = price;
        this.foodName = foodName;
        this.canBuy = canBuy;
        this.id = id;
    }

    public setImgUrl(imgUrl) : void{
        this.imgUrl = imgUrl;
    }

    public getImgurl() : string{
        return this.imgUrl;
    }

    public getId() : string{
        return this.id;
    }

    public getFoodName() : string{
        return this.foodName;
    }

    public getFoodDescription(): string{
        return this.foodDescription;
    }

    public getPrice() : number{
        return this.price;
    }
}
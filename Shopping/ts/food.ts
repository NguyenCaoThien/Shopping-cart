export class Food{
    private _id: string;
    private _imgUrl: string;
    private _foodDescription: string;
    private _price: number;
    private _foodName: string;
    private _canBuy: boolean;

    public constructor(imgUrl?: string, foodDescription?: string, price?: number, foodName?: string, canBuy?: boolean, id? : string){
        this._imgUrl = imgUrl;
        this._foodDescription = foodDescription;
        this._price = price;
        this._foodName = foodName;
        this._canBuy = canBuy;
        this._id = id;
    }

    public set imgUrl(value : string){
        this._imgUrl = value;
    }

    public get imgUrl() : string{
        return this._imgUrl;
    }

    public get id() : string{
        return this._id;
    }

    public get foodName() : string{
        return this._foodName;
    }

    public get foodDescription(): string{
        return this._foodDescription;
    }

    public get price() : number{
        return this._price;
    }

    public get canBuy () : boolean{
        return this._canBuy;
    }
}
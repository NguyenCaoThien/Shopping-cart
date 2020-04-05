import {Food} from './food';
import {foodsData} from './data';
import {CommonTs} from './Utilities/CommonTs';

export class foodRepository{
    private foods : Food[] = [];
    constructor(){
        this.getFoodDataFromArrayJsonObject();
    }

    public getFoodDataFromArrayJsonObject(){
        var thisPointer = this;
        foodsData.forEach(function(item){
            let foodItem : Food = new Food(item.imgUrl, item.foodDescription, item.price, item.foodName, item.canBuy, item.id);
            thisPointer.foods.push(foodItem);            
        })
    }

    public getFoodList(){
        return this.foods;
    }

    public getFoodListHTML(foodItem : Food[]): string{
        var htmlResult = "";
        foodItem.forEach(item => {
            htmlResult +=  `<li class="list-group-item">
            <div class="media">
                <div class="media-image">
                  <a class="media-image" href="#">
                      <img src="${item.imgUrl}" alt="">
                  </a>
                </div>
                
                <div class="media-body">
                    <h5>${item.foodName}</h5>
                    <p style="width: 85%">${item.foodDescription}</p>
                    ${this.getFoodPriceHTML(item)}
                </div>               
            </div>
        </li>`
        });

        return htmlResult;
    }

    public getFoodPriceHTML(item): string{
        var htmlResult = "";
        if(item.canBuy === true){
            htmlResult = `<input type="number" id="quantity" min="1" max="5">
            <a data-product="100" data-id = ${item.id} href="#">$${item.price}</a>`            
        }
        else{
            htmlResult = `<input type="number" id="quantity" min="1" max="5" style="display:none">
            <a data-product="100" href="#" class="disabled">$${item.price}</a>` 
        }

        return htmlResult;
    }   

    public getFoodItemById(id: string, foods : Food[]): Food{
        var food = foods.filter(function(foodItem){
            return foodItem.id == id
        });

        if(!CommonTs.isUndefined(food) && !CommonTs.isUndefined(food.length)){
            return food[0];
        }

        return null;
    }
}
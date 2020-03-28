import {foodRepository} from './foodRepository';
import { CommonTs } from './Utilities/CommonTs';
import { cartRepository } from './cartRepository';


let foodRepo : foodRepository = new foodRepository();
var foods = foodRepo.getFoodList();

var cartRepo : cartRepository = new cartRepository();

console.log("foodRepo", foodRepo.getFoodList());
console.log("hello typescript")

function displayFoodListHTML(){
    $('.list-group-flush').html(foodRepo.getFoodListHTML(foods));
}

$(document).ready(function(){
    var ordinalNumbers = 0;
    displayFoodListHTML();  

    $('.media-body a').click(function ( event) {
        var target = $(event.target);
        debugger;
        var itemId = target.attr('data-id');
        var inputValue = target.closest('.media-body').find('#quantity').val();
        let foodItem = foodRepo.getFoodItemById(itemId, foods);

        if(CommonTs.validateInputValueTextbox(inputValue) !== true){
            alert("Input value is invalid!");
            return;
        }

        cartRepo.addFoodToCart(foodItem, ++ordinalNumbers, parseInt(inputValue.toString()))
        return false;
    })
})
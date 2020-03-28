import { Cart } from "./cart";
import { Food } from "./food";
import { CommonTs } from "./Utilities/CommonTs";

export class cartRepository{

    // Variables
    private carts : Cart[] = [];
    private cartItemHTML = "";

    public addFoodToCart(foodItem : Food, ordinalNumbers : number, inputValue : number): void{    
        debugger;                
        var indexOfCartItem = this.isFoodItemExistInCarList(foodItem.getId());
        var cartList = this.carts;

        if(indexOfCartItem !== -1){

            var updatedQuantity =  inputValue + cartList[indexOfCartItem].quantity;
            cartList[indexOfCartItem].setQuantity(updatedQuantity);
            //this.cartItemHTML += this.getCartItemHTML(cartList[indexOfCartItem], ordinalNumbers);
            $(`#cart-item tbody #row${++indexOfCartItem}`).find('.quantity').html(updatedQuantity.toString());
            $('#cart-item tbody').html(this.cartItemHTML)
        }
        else{
            cartList.push(new Cart(foodItem, inputValue));
            var cartItem = this.getCartItemById(foodItem.getId(), cartList);
            this.cartItemHTML += this.getCartItemHTML(cartItem, ordinalNumbers);
            $('#cart-item tbody').html(this.cartItemHTML)
        }
      
    }

    public getCartItemById(id: string, carts : Cart[]): Cart{
        var cart = carts.filter(function(cartItem){
            return cartItem.food.getId() == id
        });

        if(!CommonTs.isUndefined(cart) && !CommonTs.isUndefined(cart.length)){
            return cart[0];
        }

        return null;
    }

    public isFoodItemExistInCarList(itemId : string){
        var len = this.carts.length;
        for(var i= 0; i < len; i++){
            if(this.carts[i].food.getId() === itemId){
                return i;
            }
        }

        return -1;
    }

  
    public getCartItemHTML(cartItem : Cart, ordinalNumbers : number): string{
        var price = cartItem.food.getPrice();
        var quantity = cartItem.getQuantity();
       // var subTotal = 
        return ` <tr id='row${ordinalNumbers}'>
        <td scope="row">${ordinalNumbers}</td>
        <td>3</td>
        <td>${price}</td>
        <td class= "quantity">${quantity}</td>
        <td>${price * quantity}</td>
        <td style="overflow: hidden;">
            <button type="button" class="btn btn-primary">Update</button>
            <button type="button" class="btn btn-danger">Delete</button>
        </td>
    </tr>`
     }
}
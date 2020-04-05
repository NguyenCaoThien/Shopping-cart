import { Cart } from "./cart";
import { Food } from "./food";
import { CommonTs } from "./Utilities/CommonTs";

export class cartRepository {

    // Variables
    private carts: Cart[] = [];
    private totalQuantity = 0;
    private totalPrice = 0;

    public addFoodToCart(foodItem: Food, quantity: number): void {
        debugger;
        let indexOfCartItem: number = this.getIndexOfFoodItemInCartList(foodItem.id);
        let cartList: Cart[] = this.carts;
        let price = 0;

        if (indexOfCartItem !== -1) {
            var updatedQuantity = quantity + cartList[indexOfCartItem].quantity;
            cartList[indexOfCartItem].quantity = updatedQuantity;
            price = cartList[indexOfCartItem].food.price;
        }
        else {
            cartList.push(new Cart(foodItem, quantity));
            price = foodItem.price;
        }
        this.totalQuantity += quantity;
        this.totalPrice += price * quantity;
    }

    public getCartItemById(id: string, carts: Cart[]): Cart {
        let cart: Cart[] = carts.filter(function (cartItem) {
            return cartItem.food.id == id
        });

        if (!CommonTs.isUndefined(cart) && !CommonTs.isUndefined(cart.length)) {
            return cart[0];
        }

        return null;
    }

    public getIndexOfFoodItemInCartList(itemId: string) {
        let len: number = this.carts.length;
        for (var i = 0; i < len; i++) {
            if (this.carts[i].food.id === itemId) {
                return i;
            }
        }

        return -1;
    }

    private getCartItemHTML(cartItem: Cart, ordinalNumbers: number): string {
        let price = cartItem.food.price;
        let quantity = cartItem.quantity;
        let foodName = cartItem.food.foodName;
        let itemId = cartItem.food.id;

        return ` <tr id='row${ordinalNumbers}'>
        <td scope="row">${ordinalNumbers}</td>
        <td>${foodName}</td>
        <td class="cart-item-price">${price}</td>
        <td ><input class= "cart-item-quantity" type="number" value="${quantity}" min="1" style="width: 74px;"/></td>
        <td class="cart-item-subtotal">${price * quantity}</td>
        <td style="overflow: hidden;" class="cart-item">
            <button type="button" data-id="${itemId}" class="btn btn-primary" >Update</button>
            <button type="button" data-id="${itemId}" class="btn btn-danger">Delete</button>
        </td>
    </tr>`
    }

    public updatecartItem(itemId: string, quantity: number): void {
        let cartList: Cart[] = this.carts;
        let indexOfCartItem: number = this.getIndexOfFoodItemInCartList(itemId);
        this.totalQuantity = this.totalQuantity + quantity - cartList[indexOfCartItem].quantity;
        this.totalPrice += cartList[indexOfCartItem].food.price * (quantity - cartList[indexOfCartItem].quantity);
        cartList[indexOfCartItem].quantity = quantity;
    }

    public removeCartItem(itemId: string): void {
        let cartList: Cart[] = this.carts;
        let indexOfCartItem: number = this.getIndexOfFoodItemInCartList(itemId);
        this.totalQuantity = this.totalQuantity - cartList[indexOfCartItem].quantity;
        this.totalPrice -= cartList[indexOfCartItem].food.price;
        cartList.splice(indexOfCartItem, 1);
    }

    public showCartFooterInHTML() {
        if (this.totalQuantity == 0) {
            $(".footer-message tr>td:first").text("No item in your shopping cart!")
        }
        else if (this.totalQuantity > 1) {
            $(".footer-message tr>td:first").text(`There are ${this.totalQuantity} items in your shopping cart!`);
        }
        else {
            $(".footer-message tr>td:first").text(`There is ${this.totalQuantity} item in your shopping cart!`)
        }

        $('.total-price').text(`Total price: $${this.totalPrice}`)
    }

    public getCartBodyHTML(): string {
        var htmlResult = "";
        var thisPointer = this;
        this.carts.forEach(function (item, index) {
            htmlResult += thisPointer.getCartItemHTML(item, index + 1);
        })
        return htmlResult;
    }
}

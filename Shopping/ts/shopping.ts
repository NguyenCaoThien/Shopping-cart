import { foodRepository } from './foodRepository';
import { CommonTs } from './Utilities/CommonTs';
import { cartRepository } from './cartRepository';


let foodRepo: foodRepository = new foodRepository();
var foods = foodRepo.getFoodList();

var cartRepo: cartRepository = new cartRepository();

namespace MNotification {
    export const NOTIF_ADD_SUCCESSFULLY = "Add item successfully!";
    export const NOTIF_UPDATE_SUCCESSFULLY = "Update item successfully!";
    export const NOTIF_DELETE_SUCCESSFULLY = "Delete item successfully!"
}

namespace MElement {
    export const ELE_NOTIF_MESSAGE = "#notif-message";
    export const ELE_LIST_FOOD = ".list-group-flush";
    export const ELE_CART_TAB_BODY = "#cart-item-tab tbody";
    export const ELE_MEDIA_BODY = ".media-body";
}

function displayFoodListHTML() {
    $(MElement.ELE_LIST_FOOD).html(foodRepo.getFoodListHTML(foods));
}

function showCartFooter() {
    cartRepo.showCartFooterInHTML();
}

function showNotification(notifMessage: string) {
    $(MElement.ELE_NOTIF_MESSAGE).html(notifMessage)
}

function showCart() {
    $(MElement.ELE_CART_TAB_BODY).html(cartRepo.getCartBodyHTML())
    cartRepo.showCartFooterInHTML();
}

function addFoodToCart(itemId: string, quantity: number) {
    debugger;
    let foodItem = foodRepo.getFoodItemById(itemId, foods);

    if (CommonTs.validateInputValueTextbox(quantity) !== true) {
        alert("Quantity value is invalid!");
        return;
    }

    cartRepo.addFoodToCart(foodItem, quantity);
    showCart();
    showNotification(MNotification.NOTIF_ADD_SUCCESSFULLY);
}

function updatecartItem(itemId: string, quantity: number) {

    if (CommonTs.validateInputValueTextbox(quantity) !== true) {
        alert("Quantity value is invalid!");
        return false;
    }

    cartRepo.updatecartItem(itemId, quantity);
    showCartFooter();
    showNotification(MNotification.NOTIF_UPDATE_SUCCESSFULLY);
    return true;
}

function removeCartItem(itemId: string) {
    cartRepo.removeCartItem(itemId);
    showCart();
    showNotification(MNotification.NOTIF_DELETE_SUCCESSFULLY);
}

$(document).ready(function () {
    displayFoodListHTML();

    // Add food item into shopping cart
    $('.media-body a').click(function (event) {
        var target = $(event.target);
        let itemId: string = target.attr('data-id');
        var quantity = target.closest(MElement.ELE_MEDIA_BODY).find('#quantity').val().toString();

        addFoodToCart(itemId, parseInt(quantity));
        // Prevent the default action on click tag a is to navigate to the href
        return false;
    })

    // Update food item in shopping cart
    $(document).on("click", '.btn.btn-primary', function (event) {
        let target = $(event.target);
        let itemId = target.attr('data-id');
        var closestTr = target.closest('tr');
        let quantityEle = closestTr.find('.cart-item-quantity');
        let subtotalEle = closestTr.find('.cart-item-subtotal');
        let price: string = closestTr.find('.cart-item-price').html();
        let quantity: string = quantityEle.val().toString();

        let isUpdatedSuccess = updatecartItem(itemId, parseInt(quantity));
        if(isUpdatedSuccess === true){
            quantityEle.html(quantity);
            let priceHTML = parseInt(price) * parseInt(quantity)
            subtotalEle.html(priceHTML.toString());
        }      
    });

    // Delete food item in shopping cart
    $(document).on('click', '.btn.btn-danger', function (event) {
        let target = $(event.target);
        let itemId = target.attr('data-id');

        removeCartItem(itemId);
    })
})
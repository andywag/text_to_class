


class CartState {
    contents = [];

    constructor() {

    }

    addItem(item) {
        this.contents.push(item);
    }

    clearCart(item) {
        this.contents = []
    }

}
export default CartState;
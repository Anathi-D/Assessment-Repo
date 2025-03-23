class swagLabPageObject{
    login = {
        userName: '[data-test="username"]',
        password: '#password',
        loginButton: '#login-button',
        logoutButton: '#logout_sidebar_link',
        errorMessage: 'h3[data-test="error"]'
    }

    applicationHeader = {
        app_logo: '.app_logo',  
        sidebar_menu: '#react-burger-menu-btn',
    }

    addItems ={
        item1: '[data-test="add-to-cart-sauce-labs-backpack"]',
        item2: '[data-test="add-to-cart-sauce-labs-bike-light"]',
        cartIcon: '[data-test="shopping-cart-link"]',
        cart_badge: '.shopping_cart_badge',
        checkoutButton: '.checkout_button'
    }

    editCart = {
        removeItem1: '[data-test="remove-sauce-labs-backpack"]',
        continueShopping: '[data-test="continue-shopping"]'

    }

    sortItems = {
        sortDropdown: '[data-test="product-sort-container"]',
        sortOption: 'option[value="lohi"]'}

}

export default new swagLabPageObject();
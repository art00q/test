const UI_ELEMENTS = {
    TOTAL: document.querySelector('.action__total'),
    REMOVE_BUTTONS: document.querySelectorAll('.counter__remove'),
    ADD_BUTTONS: document.querySelectorAll('.counter__add'),
    INGREDIENT_PRICES: document.querySelectorAll('.ingredient__price'),
    INGREDIENT_ITEMS: document.querySelectorAll('.action__item'),
    PRICE: document.querySelector('.action__price'),
};

const INGREDIENTS = {
    ketchup: 0,
    cheese: 0,
    blu: 0,
    bbq: 0,
};

const DATA = {
    total: 0,
    price: 220,
};

render();

UI_ELEMENTS.ADD_BUTTONS.forEach(button => {
    button.addEventListener('click', event => {
        const ingredientName = event.target.parentElement.querySelector('[data-ingredient]').dataset.ingredient;

        if (DATA.total < 10) {
            DATA.total += 1;
            INGREDIENTS[ingredientName] += 1;
            const isFirstItemAdded = DATA.total > 1;

            if (isFirstItemAdded) {
                DATA.price += 60;
            }
        }

        render();
    })
});

UI_ELEMENTS.REMOVE_BUTTONS.forEach(button => {
    button.addEventListener('click', event => {
        const ingredientName = event.target.parentElement.querySelector('[data-ingredient]').dataset.ingredient;

        if (DATA.total > 0 && INGREDIENTS[ingredientName] > 0) {
            DATA.total -= 1;
            INGREDIENTS[ingredientName] -= 1;

            if (DATA.price > 220) {
                DATA.price -= 60;
            }
        };

        render();
    })
});

function renderTotalFree(action) {
    const isAnyIngredientAdded = DATA.total > 0;

    if (isAnyIngredientAdded) {
        UI_ELEMENTS.TOTAL.textContent = '1 / 1 за 0₽';
    } else {
        UI_ELEMENTS.TOTAL.textContent = '0 / 1 за 0₽';
    }
};

function renderTotals() {
    for (const [key, value] of Object.entries(INGREDIENTS)) {
        const ingredientElement = document.querySelector(`[data-ingredient=${key}]`);

        ingredientElement.textContent = value;
    }
};

function renderAdditionalPrices() {
    UI_ELEMENTS.INGREDIENT_PRICES.forEach(ingredient => {
        const isFirstItemAdded = DATA.total > 0;

        if (isFirstItemAdded) {
            ingredient.textContent = '+60 ₽';
        } else {
            ingredient.textContent = '+0 ₽';
        }
    });

    UI_ELEMENTS.PRICE.textContent = `${DATA.price} ₽`;
};

function render() {
    renderTotalFree();
    renderTotals();
    renderAdditionalPrices();
}
import { products, cartItems } from './data.js';

let quantity = cartItems.length;

const pluralize = (n, forms) => {
	return n % 10 == 1 && n % 100 != 11
		? forms[0]
		: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
		? forms[1]
		: forms[2];
};

const getProductItem = ({ id, name, img, href }) => `
<div class="products-list__item">
	<a class="products-list__item-img" href="#">
		<img src="${img}" alt="product-01" />
	</a>
	<h3 class="products-list__item-title"><a href="${href}">${name}</a></h3>
	<div class="products-list__item-action">
		<button class="btn" onClick="addToCart(${id}, '${name}', '${href}')" data-id='${id}'>В корзину</button>
	</div>
</div>`;

const getCartItem = ({ id, name, href }) =>
	`<li>
		<a href="${href}">${name}</a>
		<button onClick="removeFromCart(${id})">
			<img src="/images/icons/close.svg" alt="Удалить" />
		</button>
	</li>`;

const productsQuantity = document.querySelector('.products__quantity');
productsQuantity.innerText = `Найдено ${products.length} ${pluralize(
	products.length,
	['товар', 'товара', 'товаров'],
)}`;

const productsList = document.querySelector('.products-list');
productsList.innerHTML = products
	.map((product) => getProductItem(product))
	.join('');

const changeButton = (id, text, classAction) => {
	const button = document.querySelector(`[data-id='${id}']`);
	button.innerHTML = `${text}`;
	classAction === 'add' && button.classList.add('disabled');
	classAction === 'remove' && button.classList.remove('disabled');
};

window.addToCart = function (id, name, href) {
	const index = cartItems.findIndex((item) => item.id === id);
	if (index === -1) {
		cartItems.push({ id: id, name: name, href: href });
		changeButton(id, 'В корзине', 'add');
		render(cartItems, ++quantity);
	}
};

window.removeFromCart = function (id) {
	const index = cartItems.findIndex((item) => item.id === id);
	if (index !== -1) {
		cartItems.splice(index, 1);
		changeButton(id, 'В корзину', 'remove');
		render(cartItems, --quantity);
	}
};

const cartBody = document.querySelector('.sidebar__item-body--cart');
const cartList = document.createElement('ul');
cartList.setAttribute('class', 'sidebar__item-list sidebar__item-list--cart');

const render = (cartItems, quantity) => {
	const cartList = document.querySelector('.sidebar__item-list--cart');
	if (cartItems.length > 0) {
		cartList.innerHTML = cartItems.map((item) => getCartItem(item)).join('');
	} else {
		cartList.innerHTML = 'Корзина пуста';
	}
	cartBody.appendChild(cartList);

	const cartQuantity = document.querySelector('.sidebar__item-title--cart');
	cartQuantity.innerText = `Корзина (${quantity})`;
};

render(cartItems, quantity);

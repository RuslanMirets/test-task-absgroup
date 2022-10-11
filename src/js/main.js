const products = [
	{
		id: 1,
		name: '11111111111111 1111111111',
		img: '/images/product-01.png',
	},
	{
		id: 2,
		name: '222222222 222222222222222',
		img: '/images/product-02.png',
	},
	{
		id: 3,
		name: 'Очень длинное название очень длинное название очень длинное название очень длинное название',
		img: '/images/product-03.png',
	},
	{
		id: 4,
		name: 'Масло моторное Mobil 1 ESP 5W-30',
		img: '/images/product-01.png',
	},
	{
		id: 5,
		name: 'Масло моторное Mobil 1 ESP 5W-30',
		img: '/images/product-02.png',
	},
	{
		id: 6,
		name: 'Масло моторное Mobil 1 ESP 5W-30',
		img: '/images/product-03.png',
	},
];

const cartItems = [];
let quantity = cartItems.length;

const pluralize = (n, forms) => {
	return n % 10 == 1 && n % 100 != 11
		? forms[0]
		: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
		? forms[1]
		: forms[2];
};

const getProductItem = ({ id, name, img }) => `
<div class="products-list__item">
	<a class="products-list__item-img" href="#">
		<img src="${img}" alt="product-01" />
	</a>
	<h3 class="products-list__item-title"><a href="#">${name}</a></h3>
	<div class="products-list__item-action">
		<button class="btn" onClick="addToCart(${id}, '${name}')" data-id='${id}'>В корзину</button>
	</div>
</div>`;

const getCartItem = ({ id, name }) =>
	`<li>
		<a href="#">${name}</a>
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

window.addToCart = function (id, name) {
	const index = cartItems.findIndex((item) => item.id === id);
	if (index === -1) {
		cartItems.push({ id: id, name: name });
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

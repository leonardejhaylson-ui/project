const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
if (menuBtn && nav) menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(bookingForm);
    const booking = Object.fromEntries(data.entries());
    localStorage.setItem('lastBooking', JSON.stringify(booking));
    document.getElementById('booking-result').textContent = `Agendamento confirmado para ${booking.date} às ${booking.time}.`;
  });
}

const products = [
  { id: 1, name: 'Pomada Modeladora', price: 49.9, img: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=700&q=80' },
  { id: 2, name: 'Óleo para Barba', price: 39.9, img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=80' },
  { id: 3, name: 'Shampoo Premium', price: 59.9, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80' },
  { id: 4, name: 'Bebida Energética', price: 12.0, img: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?auto=format&fit=crop&w=700&q=80' }
];

let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function renderCart() {
  const list = document.getElementById('cart-list');
  const totalEl = document.getElementById('cart-total');
  const checkout = document.getElementById('checkout-whatsapp');
  if (!list || !totalEl || !checkout) return;
  list.innerHTML = cart.map(item => `<li>${item.name} - R$ ${item.price.toFixed(2)}</li>`).join('');
  const total = cart.reduce((s, i) => s + i.price, 0);
  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
  const message = encodeURIComponent(`Olá! Quero pedir: ${cart.map(i => i.name).join(', ')}. Total: R$ ${total.toFixed(2)}`);
  checkout.href = `https://wa.me/5511999999999?text=${message}`;
}

function renderProducts() {
  const wrap = document.getElementById('products');
  if (!wrap) return;
  wrap.innerHTML = products.map(p => `
    <article class="card">
      <img src="${p.img}" alt="${p.name}" style="width:100%;height:180px;object-fit:cover;border-radius:.6rem">
      <h3>${p.name}</h3><p>R$ ${p.price.toFixed(2)}</p>
      <button class="btn" data-id="${p.id}">Adicionar</button>
    </article>
  `).join('');
  wrap.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-id]');
    if (!button) return;
    const product = products.find(p => p.id === Number(button.dataset.id));
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  });
}

renderProducts();
renderCart();

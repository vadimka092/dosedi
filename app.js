const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Настройка шаблонизатора EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Чтобы сервер понимал данные из форм
app.use(express.urlencoded({ extended: true }));

const DATA_FILE = path.join(__dirname, 'data', 'orders.json');

// 1. Главная страница
app.get('/', (req, res) => {
    res.render('index');
});

// 2. Форма создания заказа (GET)
app.get('/orders/new', (req, res) => {
    res.render('new');
});

// 2. Обработка формы создания заказа (POST)
app.post('/orders', (req, res) => {
    const { dish, address } = req.body;
    
    // Ошибочный сценарий: если название блюда пустое
    if (!dish || dish.trim() === '') {
        return res.render('error', { message: 'Название блюда не может быть пустым. Заказ не создан.' });
    }

    // Читаем текущие заказы
    let orders = [];
    if (fs.existsSync(DATA_FILE)) {
        orders = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }

    // Добавляем новый
    orders.push({ id: Date.now(), dish, address: address || 'Самовывоз' });
    
    // Сохраняем обратно в JSON
    fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));

    res.redirect('/orders');
});

// 3. Просмотр списка заказов (GET)
app.get('/orders', (req, res) => {
    let orders = [];
    if (fs.existsSync(DATA_FILE)) {
        orders = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    res.render('list', { orders });
});

// Запуск сервера
const PORT = process.env.PORT || 8081;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
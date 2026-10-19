const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Отдаем статические файлы из папки public
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
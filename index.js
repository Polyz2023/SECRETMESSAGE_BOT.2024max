const { Telegraf } = require('telegraf');

const bot = new Telegraf('7021354666:AAGoi0BX2OJQcqsEb99fbiPgam4Qmb7WOzU');

bot.start((ctx) => {
    ctx.reply('Привет! Хочешь отправить анонимное сообщение кому-то? Введи команду /send, затем его айди и текст сообщения.');
});

bot.command('send', async (ctx) => {
    const messageParts = ctx.message.text.split(' ');
    
    if (messageParts.length < 3) {
        return ctx.reply('Используйте формат: /send @username сообщение');
    }

    const username = messageParts[1]; // Юзернейм с символом @
    const userMessage = messageParts.slice(2).join(' '); // Сообщение

    try {
        // Отправьте сообщение пользователю
        await bot.telegram.sendMessage(username, `Анонимное сообщение: ${userMessage}`);
        ctx.reply('Сообщение отправлено!');
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
        ctx.reply('Не удалось отправить сообщение. Убедитесь, что юзернейм правильный и пользователь взаимодействовал с ботом.');
    }
});

bot.launch();
console.log('Бот запущен');

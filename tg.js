console.log('starting')
const {Sequelize} = require('sequelize');
const UserModel = require('./models')
const ResultModel = require('./training-models')
const TelegramAPI = require('node-telegram-bot-api')
const token = '7381984339:AAHZvvnlezw-p8jLrQ1nSx8S3lvsMv8dvoQ';
let canSaveResult = false
const bot = new TelegramAPI(token, {polling: true})


const start = () => {

    try {
        const sequelize= new Sequelize(
            'tg',
            'postgres',
            'admin',
            {
                host: 'localhost',
                port: '5432',
                dialect: 'postgres'
            }
        )
        console.log(sequelize)
        sequelize.authenticate()
        console.log ('1')
        sequelize.sync()
        console.log ('2')
    } catch (e) {
        console.log(e)
        console.log('Подключение сломалось')
    }

    bot.on ('message', async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;
        try {
         await  UserModel.create({chatId})
        }catch(e){
       //     bot.sendMessage(chatId, 'Произошла какая-то ошибка 1')
        }
        const reg = text.toLowerCase();
        const bottom = {
           reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Во сколько тренировка сегодня?', callback_data: '11'}],
                [{text: 'План тренировок', callback_data: '-'}],
                
            ]
           })
        }
        
    
        if (text == '/start' || reg == 'привет' || reg == 'ghbdtn' ) {
            return bot.sendMessage(chatId, `Привет ${msg.from.first_name}, что тебя интересует?`, bottom )
        }

        if (reg == 'когда тренировка' || reg == 'когда тренировка?' || msg.data == '11') {
            return bot.sendMessage(chatId, 'Сегодня тренировка в пять')
        } else {
        //return bot.sendMessage(chatId, "Я тебя не понимаю")
    }
    })

    bot.on('callback_query', msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id;
        const den = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Грудь, плечи, трицепс', callback_data: 'вторник'}],
                    [{text: 'Спина, бицепс', callback_data: 'четверг'}],
                    [{text: 'Ноги', callback_data: 'суббота'}],
                ]
            })
        }
    if (msg.data == '11') {
        bot.sendMessage (chatId, 'Сегодня тренировка в пять.')
    }
    if (msg.data == '-') {
        
        bot.sendMessage(chatId, 'Что сегодня тренируем?', den)
        
    }
        console.log(msg)
      })

      bot.on('callback_query',  async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        const how = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Результаты', callback_data: 'gif'}],
                    
                ]
            })
        }
    
    if (msg.data == 'вторник') {
        
        bot.sendMessage(chatId, ' 1. Жим лёжа  \n2. Отжимания на брусьях  \n3. Махи гантелей  \n4. Жим сидя с гантелями \n5. Французский жим сидя \n6. Тяга каната в верхнем блоке ', how)
    }
        const gif_vt = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Жим лёжа', callback_data: 'жим'}],
                    [{text: 'Отжимания на брусьях', callback_data: 'брусья'}],
                    [{text: 'Махи гантелей', callback_data: 'махи'}],
                    [{text: 'Жим сидя с гантелями', callback_data: 'жим сидя'}],
                    [{text: 'Французский жим сидя', callback_data: 'французский'}],
                    [{text: 'Тяга каната в верхнем блоке', callback_data: 'тяга каната'}],
                    
                ]
            })
        }
        if (msg.data == 'gif') {
            bot.sendMessage (chatId, 'я пока не знаю что сюда написать', gif_vt)
        }
        
        const resultJim = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Предыдущие результаты', callback_data: 'resultJim'}],
                    [{text: 'Записать новые', callback_data: 'new-resultJim'}],
                ]
            })}
        const resultBrus = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Предыдущие результаты', callback_data: 'resultBrus'}],
                    [{text: 'Записать новые', callback_data: 'new-resultBrus'}],
                ]
            })}
        const resultMah = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: 'Предыдущие результаты', callback_data: 'resultMah'}],
                        [{text: 'Записать новые', callback_data: 'new-resultMah'}],
                    ]
                })}
        const resultJG = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Предыдущие результаты', callback_data: 'resultJG'}],
                    [{text: 'Записать новые', callback_data: 'new-resultJG'}],
                ]
            })}
            const resultFJ = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: 'Предыдущие результаты', callback_data: 'resultFJ'}],
                        [{text: 'Записать новые', callback_data: 'new-resultFJ'}],
                    ]
                })}
                const resultVB = {
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{text: 'Предыдущие результаты', callback_data: 'resultVB'}],
                            [{text: 'Записать новые', callback_data: 'new-resultVB'}],
                        ]
                    })}
        if (msg.data == 'жим') {
            bot.sendMessage (chatId, 'посмотреть предыдущие, либо записать новые', resultJim)
            
        }
        const resulits = await ResultModel.findAll({where: {chatId:chatId.toString()}})
        if (msg.data == 'resultJim') {
            bot.sendMessage(chatId, resulits.map((resultObj)=>{return resultObj.result}).join('\n'))
         console.log (resulits)
        
            
        }
        if (msg.data == 'new-resultJim') {
            canSaveResult = true

            bot.on ('message', async msg =>{
                if (canSaveResult) {
            await ResultModel.create ({chatId,  result: msg.text, type: 'жим'})
            bot.sendMessage (chatId, 'Ваш результат сохранён', resultJim)        
        }
                canSaveResult = false
            
               
        })}
        //console.log(error)
      
      })

    
     
}
bot.on("polling_error", console.log);


start ()


module.exports = app => {
    const mongoose = require('mongoose')

    mongoose.connect('mongodb://localhost:27017/node-vue-moba'), {
        useNewUrlParser: true
    }

    require('require-all')(__dirname + '/../models')//引用models文件夹下的所有js文件

    
}
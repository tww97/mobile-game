//使用node index.js命令执行代码，在每次代码修后需要重新执行代码，所以下载nodemon来对代码进行实时监听，在监测到代码被修改后自动重新执行代码（都是泪！！！）

const express = require("express")

const app = express()

app.set('secret', 'mnwoi353o5inhto2n')

app.use(require('cors')())
app.use(express.json())
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)

require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
// const fileUpload = require('express-fileupload')
const branch = require('./routes/branch')
const question = require('./routes/question')
const image = require('./routes/image')
const image360 = require('./routes/image360')

// const getQuestionFromId = require('./routes/ssr/getQuestionFromId')

const app = express()
// cors
app.use(cors())
// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/static', express.static('static'))

// Engine template
app.set('view engine', 'ejs')

// app.use(fileUpload())

// MongoDB
const mongodbUrl = require('./configs/keys').mongodbUrl
mongoose
   .connect(
      mongodbUrl,
      { useNewUrlParser: true }
   )
   .then(() => console.log('mongodb connected.'))

// test
app.get('/', (req, res) => {
   res.send('Server is running.')
})

// Routes
app.use(branch)
app.use(question)
app.use(image)
app.use(image360)
app.post('/login', (req, res) => {
   const { username, password } = req.body
   if (username === 'admin' && password === 'admin') {
      return res.json({ msg: 'success' })
   }
   res.json({ msg: 'error' })
})

// Custom route
// getQuestionFromId(app, app)

// Api
app.get('/panorama/:img_path', (req, res) => {
   const { img_path } = req.params
   // res.render('panorama', { img: `/static/360/${img_path}` })
   res.render('panorama', { img: img_path })
})

const port = process.env.PORT || 4000
app.listen(port, err => {
   if (err) throw err
   console.log(`> Ready on http://localhost:${port}`)
})

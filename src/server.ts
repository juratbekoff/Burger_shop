import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import { engine } from 'express-handlebars'
import { nanoid } from 'nanoid'
import path from 'path'
import { burgers } from './burger.storage'
import { addCart, findCart, Item } from './cart.storage'

// express config
const app = express()
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(express.static(path.join(__dirname, "../public")))

// session
// ----#1
declare module "express-session" {
  interface SessionData {
    username: string
  }
} 

app.use(cookieParser())
app.use(session( {
  secret: 'diyorbek-sog` bol',
  saveUninitialized: true,
  proxy: true
} ))
// ----#1


// handlebars
app.engine('.hbs', engine( { extname: '.hbs' } ))
app.set('view engine', '.hbs')
app.set('views', './pages')

// Routes

// -----#2
app.get('/', (req, res) => {

  let username = req.session.username // 'abror'

  if (username === undefined) {
    res.redirect('/login')
  }
  else {
    let cart = findCart(username)
    res.render('index', { burgers, cart, username })
  }
})
// ----#2


// ----#3
app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  let a = req.body.username.trim() // 'abror'

  if (a.length === 0) {
    res.redirect('/login')
  }
  else {
    req.session.username = a
    addCart(req.session.username!)
    res.redirect('/')
  }
})
// ----#3


app.get('/confirm', (req, res) => {
  res.render('confirm')
})
// URL param
app.get('/buy/:id', (req, res) => {

  let burger = burgers.find(b => b.id == req.params.id)!
  
  let item: Item = { 
      id: nanoid(),
      name: burger.name,
      price: burger.price
  }

  let cart = findCart(req.session.username!)

  cart.items.push(item)
  cart.total += burger.price

  res.redirect('/')
})

app.get('/remove/:id', (req, res) => {

  let cart = findCart(req.session.username!)

  let i = cart.items.findIndex(item => item.id === req.params.id)
  cart.total -= cart.items[i].price
  cart.items.splice(i, 1)

  res.redirect('/')
})

app.listen(8080, () => console.log("Server is running on http://localhost:8080"))
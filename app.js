const express = require('express')

require('./db/mongoose')
const taskRouter = require('./routers/task')

const port = process.env.PORT
//const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PSSWRD}@cluster0.s4gvp.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`
// express app
const app = express();

// listen for requests
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});


app.get('/canciones', (req, res) => {
  res.render('canciones', {titulo: 'Canciones'})
})
app.get('/canticos', (req, res) => {
  res.render('canticos', {titulo: 'Cánticos'})
})
app.get('/cantos', (req, res) => {
  res.render('cantos', {titulo: 'Cantos'})
})



app.get('/', (req, res) => {
  const blogs = [
    { title: 'Pastel de zanahoria', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    { title: 'Zhulien de champiñones', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    { title: 'Shakshuka', snippet: 'Lorem ipsum dolor sit amet consectetur' },
  ];
  res.render('index', { title: 'Home', blogs:blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/number', (req, res) => {
  res.render('numeros', {})
})

app.get('/nov', (req, res) => {
  res.render('novedades', {})
})

app.post('/songs', (req, res)=>{

})
app.get('/songs', (req, res)=>{
  
})
app.get('/songs/:id', (req, res)=>{
  
})
app.patch('/songs/:id', (req, res)=>{
  
})
app.delete('/songs/:id', (req, res)=>{

})

app.use(express.json())
app.use('/api',taskRouter)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});


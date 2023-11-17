const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line
const app = express();
const port = 3000;



// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/snaplist', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el modelo de tarea
const Task = mongoose.model('Task', {
  name: String,
  description:String,
  category: String,
  dueDate: String,
  priority: String
});
// Definir el modelo de categoria
const Category = mongoose.model('Category', {
    name: String,
    description:String,
    creationDate: String
  });
// Definir el modelo de Usuario
const User = mongoose.model('User', {
    userName: String,
    userLogin:String,
    password: String,
    dateBirth: String,
    userCategory : String
  });
    

app.use(express.static(path.join(__dirname, 'public')));
// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Ruta para servir el HTML
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'Login.html'));
});
app.get('/newUser', function (req, res) {
    res.sendFile(path.join(__dirname, 'newUser.html'));
});
app.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/categories', function (req, res) {
    res.sendFile(path.join(__dirname, 'categories.html'));
});
app.get('/newCategory', function (req, res) {
    res.sendFile(path.join(__dirname, 'newCategory.html'));
});
app.get('/newTask', function (req, res) {
    res.sendFile(path.join(__dirname, 'newTask.html'));
});
app.get('/perfile', function (req, res) {
    res.sendFile(path.join(__dirname, 'perfile.html'));
});
app.get('/newUser', function (req, res) {
    res.sendFile(path.join(__dirname, 'newUser.html'));
});
app.get('/tasks', function (req, res) {
  res.sendFile(path.join(__dirname, 'tareasPendientes.html'));
});

// Ruta para guardar la tarea
app.post('/addTask', async (req, res) => {
    try {
      const nuevaTarea = new Task(req.body);
      await nuevaTarea.save();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });

  // Ruta para guardar la categoria 
app.post('/addCategory', async (req, res) => {
    try {
      const nuevaCategoria = new Category(req.body);
      await nuevaCategoria.save();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });

  
  // Ruta para guardar el usuario
app.post('/createUser', async (req, res) => {
    try {
      const nuevoUsuario = new User(req.body);
      await nuevoUsuario.save();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });

  //Obtiene el nombre de las categorias 
  app.get('/categorias', async (req, res) => {
    try {
      // Modifica esto según la estructura de tu base de datos y modelo Mongoose
      const categorias = await Category.find({}, 'name description dueDate');
  
      res.json(categorias);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });
  // Agrega una ruta para obtener datos de tareas
app.get('/getTask', async (req, res) => {
    try {
      // Modifica esto según tu modelo de base de datos y tus necesidades
      const tareas = await Task.find({}, 'name description category dueDate priority');
      res.json(tareas);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });
  
  app.get('/getUser', async (req, res) => {
    try {
      // Modifica esto según tu modelo de base de datos y tus necesidades
      const users = await User.find({}, 'username userLogin password dateBirth userCategory');
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
const express = require('express');

const app = express();

const mysql = require('mysql');

const cors = require('cors');

const bodyParser = require('body-parser')

app.use(cors({
  origin: 'http://localhost:5173',
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'karma',
  password: '123456',
  database: 'gtm'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

//Gets API
app.get('/familiaMascota', (req, res) => {
  connection.query('SELECT * FROM familiamascota', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json(results);
    }
  });
});

app.get('/razaMascota', (req, res) => {
  connection.query('SELECT * FROM razamascota', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json(results);
    }
  });
});

app.get('/listaPersonas', (req, res) => {
  connection.query('SELECT * FROM persona', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json(results);
    }
  });
});

app.get('/listaPersonasSelect', (req, res) => {
  connection.query('SELECT run as label,run as value FROM persona', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json(results);
    }
  });
});

app.get('/listaFamiliaMascota', (req, res) => {
  connection.query('SELECT descripcionFamilia as label,id as value FROM familiamascota', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json(results);
    }
  });
});

app.get('/listaRazaMascota', (req, res) => {
  connection.query('SELECT descripcionRaza as label,id as value FROM razamascota', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json(results);
    }
  });
});

app.get('/listaMascotas', (req, res) => {
  connection.query(`
    SELECT
      mascota.id,
      mascota.runPersona,
      CONCAT(persona.nombre, ' ', persona.apellido) AS nombre,
      mascota.nombreMascota,
      familiamascota.descripcionFamilia,
      razamascota.descripcionRaza,
      mascota.idFamilia,
      mascota.idRaza
    FROM
      mascota
      JOIN persona ON mascota.runPersona = persona.run
      JOIN familiamascota ON mascota.idFamilia = familiamascota.id
      JOIN razamascota ON mascota.idRaza = razamascota.id
  `, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json(results);
    }
  });
});

//Post API
app.post('/guardarPersona', bodyParser.json(), (req, res) => {
  const persona = req.body;

  if (!persona || Object.keys(persona).length === 0) {
    res.status(400).json({ error: 'El objeto persona está vacío o no está definido' });
    return;
  }

  connection.query('INSERT INTO persona SET ?', persona, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json({ message: true });
    }
  });
});

app.post('/guardarMascota', bodyParser.json(), (req, res) => {
  const mascota = req.body;

  if (!mascota || Object.keys(mascota).length === 0) {
    res.status(400).json({ error: 'El objeto mascota está vacío o no está definido' });
    return;
  }

  connection.query('INSERT INTO mascota SET ?', mascota, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json({ message: true });
    }
  });
});

app.post('/guardarFamilia', bodyParser.json(), (req, res) => {
  const familia = req.body;

  if (!familia || Object.keys(familia).length === 0) {
    res.status(400).json({ error: 'El objeto familia está vacío o no está definido' });
    return;
  }

  connection.query('INSERT INTO familiaMascota SET ?', familia, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json({ message: true });
    }
  });
});

app.post('/guardarRaza', bodyParser.json(), (req, res) => {
  const raza = req.body;

  if (!raza || Object.keys(raza).length === 0) {
    res.status(400).json({ error: 'El objeto raza está vacío o no está definido' });
    return;
  }

  connection.query('INSERT INTO razaMascota SET ?', raza, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json({ message: true });
    }
  });
});

//Put API
app.put('/modificarPersona', bodyParser.json(), (req, res) => {
  const persona = req.body;

  if (!persona || Object.keys(persona).length === 0) {
    res.status(400).json({ error: 'El objeto persona está vacío o no está definido' });
    return;
  }

  const run = persona.run;

  connection.query('UPDATE persona SET ? WHERE run = ?', [persona, run], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json({ message: true });
    }
  });
});

app.put('/modificarMascota', bodyParser.json(), (req, res) => {
  const mascota = req.body;

  if (!mascota || Object.keys(mascota).length === 0) {
    res.status(400).json({ error: 'El objeto mascota está vacío o no está definido' });
    return;
  }

  const id = mascota.id;

  connection.query('UPDATE mascota SET ? WHERE id = ?', [mascota, id], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json({ message: true });
    }
  });
});

app.put('/modificarFamilia', bodyParser.json(), (req, res) => {
  const familia = req.body;

  if (!familia || Object.keys(familia).length === 0) {
    res.status(400).json({ error: 'El objeto familia está vacío o no está definido' });
    return;
  }

  const id = familia.id;

  connection.query('UPDATE familiaMascota SET ? WHERE id = ?', [familia, id], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json({ message: true });
    }
  });
});

app.put('/modificarRaza', bodyParser.json(), (req, res) => {
  const raza = req.body;

  if (!raza || Object.keys(raza).length === 0) {
    res.status(400).json({ error: 'El objeto raza está vacío o no está definido' });
    return;
  }

  const id = raza.id;

  connection.query('UPDATE razaMascota SET ? WHERE id = ?', [raza, id], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json({ message: true });
    }
  });
});

app.put('/activarDesactivarPersona', bodyParser.json(), (req, res) => {
  const persona = req.body;

  if (!persona || Object.keys(persona).length === 0) {
    res.status(400).json({ error: 'El objeto persona está vacío o no está definido' });
    return;
  }

  const run = persona.run;

  connection.query('UPDATE persona SET ? WHERE run = ?', [persona, run], (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
    } else {
      res.json({ message: true });
    }
  });
});

app.listen(3000);

app.use(express.static(__dirname + '/dist'));
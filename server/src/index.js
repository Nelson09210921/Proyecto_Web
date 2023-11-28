import app from './app';


// Cargar variables de entorno
//dotenv.config();

/* app.get('/', (req, res) => res.send('obtener todo'));
app.post('/', (req, res) => res.send('Creando'));
app.put('/', (req, res) => res.send('Actualizando'));
app.delete('/', (req, res) => res.send('Borrando')); */

const port = app.get('port');

app.listen(port, ()=> {
    console.log(`Server on port http://localhost:${port}`)
});
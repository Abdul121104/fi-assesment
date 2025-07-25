// Import the Express module

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');



const express = require('express');
const cors = require('cors');
const connectDB = require('./models/db');
const app = express();
const PORT = 3000;
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

connectDB();




app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', authRoutes);
app.use('/', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
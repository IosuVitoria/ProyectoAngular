const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const PORT = process.env.PORT;

const userRoutes = require('./src/api/routes/users.routes');

const { connect } = require('./src/utils/db');

const app = express();
connect();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:4200", "http://127.0.0.1:5000"],
  methods: ["GET", "POST"],
  allowedHeaders: "Content-Type",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);

app.use('*', (req, res) => {
  res.status(404).json('Route not found');
});

app.use((error, req, res, next) => {
  return res.status(error.status || 500).json(`Error: ${error.message || "Unexpected error"}`);
});

app.listen(PORT, () => console.log(`Conectado al puerto: ${PORT}`));

const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.get('/health', (req, res)=>{
    res.json({ status: 'API Service running' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`API Service is running on PORT ${ PORT }`);
});
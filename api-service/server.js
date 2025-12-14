const express = require('express');
const redis = require('./publisher');
const app = express();
require('dotenv').config();

app.use(express.json());

// event
app.post('/event', async (req, res)=>{
    try {
        const { userId, email } = req.body;
        
        const eventData = {
            userId, 
            email,
            timeStamp: Date.now()
        }

        await redis.publish(
            'user.created',
            JSON.stringify(eventData)
        )

        res.json({ message: 'Event Published' });
    } catch (err) {
        console.log('Something went wrong : ', err);
    }
});

// test route
app.get('/health', (req, res)=>{
    res.json({ status: 'API Service running' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`API Service is running on PORT ${ PORT }`);
});
import express from 'express';
import userRoute  from '../components/user/user.route';
import chatRoute  from '../components/chat/chat.route';


const app = express();

app.use(express.json());

app.use('/users',userRoute);
app.use('/chat',chatRoute);


app.use((err, req, res, next) => {
    console.error(err); 
    res.status(500).json({ message: 'Internal Server Error' }); 
});


export default app;

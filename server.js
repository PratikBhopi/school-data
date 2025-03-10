const app=require('./app')
const dotenv=require('dotenv')
dotenv.config()


app.listen(process.env.PORT, () => {
    console.log('Server running on port 3000');
});



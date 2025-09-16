require('dotenv').config();
const {sequelize} = require('./models')
const app = require('./app');



const PORT = process.env.PORT || 5001;

(async()=>{
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully')
        app.listen(PORT,()=>{
            console.log(`Server running on port: ${PORT}`);
        })
    } catch (error) {
        console.error('Unable to connect to the Database:',error)
    }
})();
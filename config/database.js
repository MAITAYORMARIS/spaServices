const mongoose = require ('mongoose');
mongoose.connect(process.env.MONGO_URI,{
    useUnifiedTopology: true,
    useNewUrlParser:true,
})

.then(()=>console.log('DATABASE CONECT'))
.catch(err=> console.error(err))


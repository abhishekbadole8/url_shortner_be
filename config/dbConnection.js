const { default: mongoose } = require("mongoose");

const connectDb = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGOOSE_STRING)
        if(connect) console.log(`connected to database`);
    } catch (error) {
        console.log(`error connecting to database`,error);
    }
}

module.exports = connectDb;
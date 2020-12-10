import mongoose from 'mongoose'

const connect = async () => {
    try {
        console.log('Connecting to DB at ' + process.env.MONGO_URI)

        const conn = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})

        console.log('Successfully connected to ' + conn.connection.host)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connect
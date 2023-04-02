import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import path from 'path'
import cloudinary from 'cloudinary'
import { fileURLToPath } from 'url';

// Routes
import AuthRoutes from './Routes/AuthRoutes.js'
import UserRoutes from './Routes/UserRoutes.js'
import PostRoutes from './Routes/PostRoutes.js'
import CommentRoute from './Routes/commentRoutes.js'

//Middlewaress
import ErrorHandlerMiddleware from './middlewares/error.js'


const app = express()

const PORT = 4000 || process.env.PORT

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


//dotenv Configuration
dotenv.config({ path: path.resolve(__dirname, './.env') })


// MidlleWares
app.use(bodyParser.json({limit: '30mb',extended: true}))

app.use(cookieParser());

app.use(express.json());

app.use(bodyParser.urlencoded({limit: '30mb',extended: true}))

//Setiing up cors options
const corsOptions = {
    origin:["http://localhost:4000","http://localhost:3000","http://localhost:3000/","http://localhost:4000/","https://bharatsocial-ppi2.onrender.com",'https://bharatsocial-ppi2.onrender.com/'],
    optionsSuccessStatus: 200,
    credentials: true,
 };
app.use(cors(corsOptions))



// ---------------------------
mongoose.connect(process.env.MONGO_DB,
  { useNewUrlParser: true, useUnifiedTopology: true
  }).then(() => {
  console.log('Database is connected!')}).catch((err) => {
  console.log(err)
})


//Clodinary Configuration
cloudinary.config({
  cloud_name: 'dbhf7xh4q',
  api_key: '887173712287675',
  api_secret: 'T8bjOinQ4NWc7mphFRuVA9PDifY'
})

// Usage of routes
app.use('/auth', AuthRoutes)
app.use('/users', UserRoutes)
app.use('/posts', PostRoutes)
app.use('/comments',CommentRoute)

app.use(express.static(path.join(__dirname, '../client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
})


//Error Hanlder

app.use(ErrorHandlerMiddleware)

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import userRouter from './routes/user.routes.js';
import aiRouter from './routes/doc.routes.js';
import projectRouter from './routes/project.routes.js';


const app=express()

app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
}))




app.use(express.json({
    limit:'16kb'
}))



app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())


app.use('/api/users', userRouter);
app.use('/ai',aiRouter)
app.use('/api/project',projectRouter)


const server = createServer(app);

const io = new Server(3002, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});


const users = {};
const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

io.on('connection', (socket) => {


  console.log('a user connected at ',socket.id);
  users[socket.id] = getRandomColor();

  socket.on("code-collab",(code)=>{
    io.emit('receive-code',code)
    // console.log(code)
  })


  socket.on("cursor-move", ({ userId, position }) => {
    socket.broadcast.emit("cursor-update", { userId, position });
  });

  // socket.on("create-room",createProjectRoom)
  // socket.on("join-room",joinProjectRoom)


  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });   
});



server.listen(3000, () => {
  console.log('socket server running at http://localhost:3002');
});


export {app}
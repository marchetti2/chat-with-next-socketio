var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var next = require("next");

import { NextApiRequest, NextApiResponse } from "next";
import { message, users } from "./database/fakeDB";
import { tokens } from "./database/fakeToken";
import {Message} from './dtos/MessageDTO'

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const signIn = io.of('/');
const authRoute = io.of('/chat');

signIn.use(async(socket: any, next: any) => {
  await socket.on("user", (user: any, callback: any) => {
     if (users.indexOf(user)<0) {
       users.push(user)
       tokens.push(user)
       return callback(true);
     }
     return callback(false);
   });
  return next()
});

authRoute.use((socket: any, next: any) => {
  socket.name = users[users.length-1]
  if(tokens.indexOf(socket.name)>=0){
    console.log('deu')
   return next();
  }
  console.log('Error')
});

io.on("connection", (socket: any) => {

  socket.on("loadMessagesFromServer", () => {
    io.emit("returnedMessage", message);
  });

  io.emit('usersIn', users)

  socket.on("sendMessages", (msg: Message) => {
    message.push(msg);
    io.emit("returnedMessage", message);
  });

});

nextApp.prepare().then(() => {
  app.get("*", (req: NextApiRequest, res: NextApiResponse) => {
    return nextHandler(req, res);
  });

  server.listen(3000, (err: any) => {
    if (err) throw err;
    console.log(`O pai ta ON! http://localhost:3000`);
  });
});

import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

app.set('port', 3000)

httpServer.listen(app.get('port'), function () {
  console.log('Node app is running on port ', app.get('port'))
})

io.on('connection', function (socket) {
  console.log(socket.id)
  socket.on('SEND_MESSAGE', function (data) {
    io.emit('MESSAGE', data)
  })
})

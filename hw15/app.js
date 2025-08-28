import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 📂 Раздача статических файлов из папки public
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Новый пользователь подключился:", socket.id);

  socket.on("chatMessage", (msg) => {
    console.log("Сообщение от клиента:", msg);

    socket.broadcast.emit("messageReceived", { message: msg });
  });

  socket.on("disconnect", () => {
    console.log("Пользователь отключился:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(
    `Ссылка на страницу в браузере http://localhost:${PORT}/index.html`
  );
});

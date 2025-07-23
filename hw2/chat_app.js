const EventEmitter = require("events");
const chat = new EventEmitter();

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

chat.on("message", (userName, message) => {
  const date = getCurrentTime();
  console.log(`${userName}: ${message} | ${date} |`);
});

function sendMessage(userName, message, emitter) {
  emitter.emit("message", userName, message);
}

sendMessage("Alik", "looking for a free Bike", chat);
sendMessage("Tenso", "looking for a Taxi from NY to Boston", chat);
sendMessage(
  "Senshi",
  "looking for a cheap tickets from Australia to Japan",
  chat
);

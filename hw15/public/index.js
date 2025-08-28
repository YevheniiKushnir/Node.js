const socket = io();
const button = document.getElementById("send");

button.addEventListener("click", sendMessage);

function sendMessage() {
  const input = document.getElementById("input");
  const msg = input.value;
  if (!msg) return;

  socket.emit("chatMessage", msg);

  renderMessage(msg, "right");
  input.value = "";
}

socket.on("messageReceived", (data) => {
  renderMessage(data.message, "left");
});

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderMessage(text, side) {
  const messageBlock = document.createElement("p");
  messageBlock.classList.add(side);

  const timeBlock = document.createElement("span");
  timeBlock.textContent = formatTime();

  messageBlock.textContent = side === "right" ? "My: " : "Server: ";
  messageBlock.textContent += text;
  messageBlock.appendChild(timeBlock);

  document.getElementById("display").appendChild(messageBlock);
}

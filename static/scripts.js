async function addBotText(text)
{
    const chatContainer = document.querySelector(".chat");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", "user");

    const messengerIcon = document.createElement("div");
    messengerIcon.classList.add("messenger");

    const textContainer = document.createElement("div");
    textContainer.classList.add("text", "user");

    const textPre = document.createElement("pre");

    chatContainer.appendChild(messageContainer);
    messageContainer.appendChild(messengerIcon, textContainer);
    textContainer.appendChild(textPre);
    textPre.textContent = text;
}

async function addUserText(text)
{
    const chatContainer = document.querySelector(".chat");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", "bot");

    const messengerIcon = document.createElement("div");
    messengerIcon.classList.add("messenger");

    const textContainer = document.createElement("div");
    textContainer.classList.add("text", "bot");

    const textPre = document.createElement("pre");

    chatContainer.appendChild(messageContainer);
    messageContainer.appendChild(messengerIcon, textContainer);
    textContainer.appendChild(textPre);
    textPre.textContent = text;
}

async function updateColor()
{
    const indicator = document.querySelector("#indicator")
    const response = await fetch('/get_color');
    const data = await response.json();
    indicator.style.backgroundColor = data.color;
}

async function updateUserText()
{
    const response = await fetch('/get_user_text');
    const data = await response.json();
    addUserText(data.text);
}

async function updateBotText()
{
    const response = await fetch('/get_bot_text');
    const data = await response.json();
    addBotText(data.text);
}

setInterval(updateColor, 1000);
setInterval(updateUserText, 1000);
setInterval(updateBotText, 1000);
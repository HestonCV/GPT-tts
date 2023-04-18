async function clearChat()
{
    console.log("test");
    const rightSide = document.querySelector(".right");
    const chatContainer = document.querySelector(".chat");
    chatContainer.remove();
    const newChatContainer = document.createElement("div");
    newChatContainer.classList.add("chat");
    rightSide.insertBefore(newChatContainer, rightSide.lastElementChild);
}

async function addUserText(text)
{
    const chatContainer = document.querySelector(".chat");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", "user");

    const messengerIcon = document.createElement("div");
    messengerIcon.classList.add("messenger", "user");

    const textContainer = document.createElement("div");
    textContainer.classList.add("text", "user");

    const textPre = document.createElement("pre");

    chatContainer.appendChild(messageContainer);
    messageContainer.appendChild(messengerIcon);
    messageContainer.appendChild(textContainer);

    textContainer.appendChild(textPre);
    textPre.textContent = text;
}

async function addBotText(text)
{
    const chatContainer = document.querySelector(".chat");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", "bot");

    const messengerIcon = document.createElement("div");
    messengerIcon.classList.add("messenger", "bot");

    const textContainer = document.createElement("div");
    textContainer.classList.add("text");

    const textPre = document.createElement("pre");

    chatContainer.appendChild(messageContainer);
    messageContainer.appendChild(messengerIcon);
    messageContainer.appendChild(textContainer);
    textContainer.appendChild(textPre);
    textPre.textContent = text;
}

/* async function updateColor()
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
setInterval(updateBotText, 1000); */

const clearButton = document.querySelector(".clear-chat");
clearButton.addEventListener("click", () => {
    clearChat();
});

/* clearChat();
addUserText("Hello");
addBotText("Hello! How can I assist you today?");
addUserText("What about CSS stuff??");
addBotText("This example sets the color of the input placeholder to light gray. You can replace lightgray with any color value you prefer, such as a hex color code (e.g., #CCCCCC), an RGB value (e.g., rgb(192, 192, 192)), or any valid CSS color name.\
\
Remember to include the browser-specific prefixes to ensure compatibility across different browsers.") */
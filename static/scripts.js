async function clearChat()
{
    console.log("test clear");
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

    const codeRegex = /```([\s\S]*?)```/g;
    const formattedOutput = text.replace(codeRegex, (match, code) => {
        return '<code>' + code + '</code>';
      });
    textPre.innerHTML = formattedOutput;
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


    const codeRegex = /```([\s\S]*?)```/g;
    const formattedOutput = text.replace(codeRegex, (match, code) => {
        return '<code>' + code + '</code>';
      });
    textPre.innerHTML = formattedOutput;
}

async function updateColor()
{
    const indicator = document.querySelector("#indicator")
    const response = await fetch('/get_color');
    const data = await response.json();
    indicator.style.backgroundColor = data.color;
}


let user_id = -1;
let bot_id = -1;

async function updateUserText()
{
    const response = await fetch('/get_user_text');
    const data = await response.json();
    console.log("userid: " + user_id);
    if(data.id !== user_id)
    {
        console.log("test update user text")
        addUserText(data.text);
        user_id = data.id;
    }
}

async function updateBotText()
{
    const response = await fetch('/get_bot_text');
    const data = await response.json();
    if(data.id !== bot_id)
    {
        console.log("test update bot text")
        addBotText(data.text);
        bot_id = data.id;
    }
}


setInterval(updateColor, 1000);
setInterval(updateUserText, 1000);
setInterval(updateBotText, 1000);

const clearButton = document.querySelector(".clear-chat");
clearButton.addEventListener("click", () => {
    clearChat();
});

clearChat();
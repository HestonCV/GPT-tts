async function updateColor() {
    const indicator = document.querySelector("#indicator")
    const response = await fetch('/get_color');
    const data = await response.json();
    indicator.style.backgroundColor = data.color;
}

async function updateUserText() {
    const response = await fetch('/get_user_text');
    const data = await response.json();
    document.getElementById('userText').textContent = data.text;
}

async function updateBotText() {
    const response = await fetch('/get_bot_text');
    const data = await response.json();
    document.getElementById('botText').textContent = data.text;        }

setInterval(updateColor, 1000);
setInterval(updateUserText, 1000);
setInterval(updateBotText, 1000);
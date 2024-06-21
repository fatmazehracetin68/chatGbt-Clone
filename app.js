const chatInput = document.querySelector("#chat-input");
const sendBtn = document.querySelector("#send-btn");
const defaultText = document.querySelector(".default-text");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

let userText = null;

const createElement = (html, classname) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", classname);
  chatDiv.innerHTML = html;
  return chatDiv;
};

const getChatResponse = async (incomingChatDiv) => {
  const pElement = document.createElement("p");
  const url = "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "5ffbf60e59mshe2da6f61db1bbf6p142ba1jsne235f98412e0",
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: `${userText}`,
        },
      ],
      system_prompt: "",
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false,
    }),
  };
  // fetch(url, options)
  //   .then((res) => res.json())
  //   .then((data) => data.result)
  //   .catch((error) => error);
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    pElement.innerHTML = result.result;
  } catch (error) {
    console.log(error);
  }
  incomingChatDiv.querySelector(".typing-animation").remove();
  const detailDiv = incomingChatDiv.querySelector(".chat-details");
  detailDiv.appendChild(pElement);
  chatInput.value = null;
};

const showTypingAnimation = () => {
  const html = `
    <div class="chat-content">
          <div class="chat-details">
              <img src="img/chatbot.jpg" alt="" />
            <div class="typing-animation">
              <div class="typing-dot" style="--delay: 0.2s"></div>
              <div class="typing-dot" style="--delay: 0.3s"></div>
              <div class="typing-dot" style="--delay: 0.4s"></div>
            </div>
          </div>
    </div>`;
  const incomingChatDiv = createElement(html, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  getChatResponse(incomingChatDiv);
};

const handleOutGoingChat = () => {
  userText = chatInput.value.trim();
  if (!userText) {
    alert("Bir veri giriniz!");
    return;
  }
  const html = `
        <div class="chat-content">
          <div class="chat-details">
           <img src="img/ftz.jpeg" alt="" />
            <p></p>
          </div>
        </div>
  `;

  const outgoingChatDiv = createElement(html, "outgoing");
  defaultText.remove();
  outgoingChatDiv.querySelector("p").textContent = userText;
  chatContainer.appendChild(outgoingChatDiv);
  setTimeout(showTypingAnimation, 500);
};

sendBtn.addEventListener("click", handleOutGoingChat);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleOutGoingChat();
  }
});

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";
});

deleteButton.addEventListener("click", () => {
  if (confirm("Tüm sohbetleri silmek istediğinize emin misiniz?")) {
    chatContainer.remove();
  }

  const defaultText = ` <div class="default-text">
      <h1>ChatGPT Clone</h1>
    </div>
     <div class="chat-container"></div>
      <div class="typing-container">
      <div class="typing-content">
        <div class="typing-textarea">
          <textarea id="chat-input" placeholder="Aratmak istediğiniz veriyi giriniz."></textarea>
          <span class="material-symbols-outlined" id="send-btn"> send </span>
        </div>
        <div class="typing-controls">
          <span class="material-symbols-outlined" id="theme-btn"> light_mode</span>
          <span class="material-symbols-outlined" id="delete-btn"> delete</span>
        </div>
      </div>
    </div>`;
  document.body.innerHTML = defaultText;
});

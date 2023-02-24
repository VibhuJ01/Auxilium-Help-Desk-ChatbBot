const __chatbot = () => document.getElementById("chatbot");
const __chatbot__chatbotButton = () =>
  document.getElementById("chatbot-button");
const __chatbot__chat = () => document.getElementById("chatbot-chat");
const __chatbot__chatMain = () => document.getElementById("chatbot-chat-main");
const __chatbot__userInput = () =>
  document.getElementById("chatbot-user-input");

// Load CSS file
const __chatbot__getCSS = () => {
  let head = document.getElementsByTagName("head")[0];

  let chatbotCSS = document.createElement("link");
  chatbotCSS.rel = "stylesheet";
  chatbotCSS.type = "text/css";
  chatbotCSS.href = "./css/chatbot.css";

  head.appendChild(chatbotCSS);
};

// Set styles
const __chatbot__setChatBot = () => {
  const bot = __chatbot();

  bot.innerHTML = `
    <div id="chatbot-chat" class="chatbot-visibility-hidden">
      <div id="chatbot-chat-heading">
        Auxilium
      </div>
      <div id="chatbot-chat-main">
        <div class="chatbot-chat-message chatbot-chat-left">Hi, how may I help you?</div>
      </div>
      <div id="chatbot-chat-input">
        <input id="chatbot-user-input" type="text" placeholder="Message...">
      </div>
    </div>
    <div id="chatbot-button">
      <svg id="chatbot-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
      </svg>
    </div>
  `;

  __chatbot__addEventListeners();
};

// Add event listeners
const __chatbot__addEventListeners = () => {
  // Chatbot button
  let chatButton = __chatbot__chatbotButton();
  chatButton.addEventListener("click", () => {
    if (
      [...__chatbot__chat().classList].includes("chatbot-visibility-hidden")
    ) {
      __chatbot__chat().classList.remove("chatbot-visibility-hidden");
      __chatbot__userInput().focus();
    } else {
      __chatbot__chat().classList.add("chatbot-visibility-hidden");
      __chatbot__userInput().blur();
    }
  });

  // Chatbot input
  let chatInput = __chatbot__userInput();
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      __chatbot__sendMessage();
    }
  });
};

// Send Message
const __chatbot__sendMessage = () => {
  const sendMessage = () => {
    const message = __chatbot__userInput().value;
    if (message && message !== "") {
      updateChat(message);
      __chatbot__userInput().value = "";
      getResponse(message);
    }
  };

  const updateChat = (message) => {
    let chatMain = __chatbot__chatMain();
    chatMain.innerHTML += `
      <div class="chatbot-message-separator-right"></div>
      <div class="chatbot-chat-message chatbot-chat-right">${message}</div>
    `;
    chatMain = __chatbot__chatMain();
    let chatMainChildren = chatMain.children;
    let lastChildIndex = chatMain.children.length - 1;
    let lastChild = chatMainChildren[lastChildIndex];
    lastChild.scrollIntoView();
  };

  const updateBot = (message) => {
    let chatMain = __chatbot__chatMain();
    chatMain.innerHTML += `
      <div class="chatbot-message-separator"></div>
      <div class="chatbot-chat-message chatbot-chat-left">${message}</div>
    `;
    chatMain = __chatbot__chatMain();
    let chatMainChildren = chatMain.children;
    let lastChildIndex = chatMain.children.length - 1;
    let lastChild = chatMainChildren[lastChildIndex];
    lastChild.scrollIntoView();
  };

  const getResponse = async (message) => {
    const res = await fetch(`http://localhost:8000/?question=${message}`);

    if (res) {
      const data = await res.json();
      const questions = data[0]["Question->"];
      const answers = data[1]["Answer->"];
      console.log(questions, answers);
      if (questions.length === 0) {
        updateBot(`Emergency Helpline <br>
Contact Numbers: <br>
+380 997300483 <br>
+380 997300428 <br>
Email-Id: cons1.kyiv@mea.gov.in'`);
      } else {
        questions.forEach((question, id) => {
          //  	  console.log(question, answers[id])
          updateBot(`Q: ${question} <br> A: ${answers[id]}`);
        });
      }
    }
  };

  sendMessage();
};

// Main
const __chatbot_main = () => {
  __chatbot__getCSS();
  __chatbot__setChatBot();
};

__chatbot_main();

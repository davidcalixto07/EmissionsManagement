import React, { useState, useEffect } from 'react';
import './Westbot.css'; // Importa tu archivo de estilos CSS si es necesario

const Westbot = () => {

    const [chatbotToggler, setChatbotToggler] = useState(null);
    const [closeBtn, setCloseBtn] = useState(null);
    const [chatbox, setChatbox] = useState(null);
    const [chatInput, setChatInput] = useState(null);
    const [sendChatBtn, setSendChatBtn] = useState(null);
    const [userMessage, setUserMessage] = useState(null);
    const [textArea, setTextArea] = useState(null);

    useEffect(() => {
        // Accede a los elementos del DOM cuando el componente se monta
        const chatbotTogglerElement = document.querySelector(".chatbot-toggler");
        const closeBtnElement = document.querySelector(".close-btn");
        const chatboxElement = document.querySelector(".chatbox");
        const chatInputElement = document.querySelector(".chat-input textarea");
        const sendChatBtnElement = document.querySelector(".chat-input span");
        const textArea = document.querySelector(".chat-input textarea");

        setChatbotToggler(chatbotTogglerElement);
        setCloseBtn(closeBtnElement);
        setChatbox(chatboxElement);
        setChatInput(chatInputElement);
        setSendChatBtn(sendChatBtnElement);
        setTextArea(textArea);
    }, []);
    const createChatLi = (message, className) => {
        // Create a chat <li> element with passed message and className
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent =
            className === "outgoing"
                ? `<p></p>`
                : `<span><img src="https://west.net.co/wp-content/uploads/2024/01/westbot.jpeg"></span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        console.log(chatLi);
        return chatLi; // return chat <li> element
    };

    const generateResponse = (chatElement, userMessage) => {
        const messageElement = chatElement.querySelector("p");
        messageElement.textContent = "respuesta del modelo"
    };


    const handleChat = () => {
        const userMessageChat = chatInput.value.trim();
        if (!chatInput.value.trim()) return;

        // Clear the input textarea and set its height to default
        chatInput.value = "";

        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessageChat, "outgoing"));
        // console.log(userMessage);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            const incomingChatLi = createChatLi("Buscando respuesta...", "incoming");
            chatbox.appendChild(incomingChatLi);
            // console.log(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi, userMessageChat);
        }, 600);
        return
    };

    // parte de codgo unicamente utilizada para que el chat registre la pregunta con la tecla enter
    // 
    document.addEventListener("DOMContentLoaded", function () {
        const textarea = document.querySelector(".chat-input textarea");
        const sendButton = document.getElementById("send-btn");
        textarea.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Evita que se haga un salto de línea en el textarea
                sendButton.click(); // Simula el clic en el botón "send"
            }
        });
    });

    if (textArea != null) {
        textArea.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleChat();
            }
        });
    }
    if (sendChatBtn != null) {
        sendChatBtn.addEventListener("click", () =>{
            handleChat();
        } );
    }
    if (closeBtn != null) {
        closeBtn.addEventListener("click", () =>
            document.body.classList.remove("show-chatbot")
        );
    }
    if (chatbotToggler != null) {
        chatbotToggler.addEventListener("click", () =>{
            document.body.classList.toggle("show-chatbot")
        }
            
        );
    }

    

    return (
        <div>
            <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" />

            <button class="chatbot-toggler">
                <span class="material-symbols-rounded">mode_comment</span>
                <span class="material-symbols-outlined">close</span>
            </button>
            <div class="chatbot">
                <header>
                    <h2>WESTbot</h2>
                    <span class="close-btn material-symbols-outlined">close</span>
                </header>
                <ul class="chatbox">
                    <li class="chat incoming">
                        <span><img src="https://west.net.co/wp-content/uploads/2024/01/westbot.jpeg" /></span>
                        <p>Hola! soy WESTbot, tu chat personal ¿Cómo puedo ayudarte hoy? ¿Quieres conocer sobre algún tema en particular de emisiones?
                        </p>
                    </li>
                </ul>
                <div class="chat-input">
                    <textarea placeholder="Introduzca la consulta" spellcheck="false" required></textarea>
                    <span id="send-btn" class="material-symbols-rounded">send</span>
                </div>
            </div>
        </div>
    );
}

export default Westbot;

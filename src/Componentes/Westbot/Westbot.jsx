import React, { useState, useEffect } from "react";
import "./Westbot.css";
var diccionaryOfOptions = {
  "¿Qué?": "OptionQue",
  "variables influyen en las emisiones de la tea": "OptionQue_variable",
  "variables influyen en la eficiencia de la tea": "OptionQue_variable",
  "variables utiliza el modelo de emisiones": "OptionQue_variable",

  "¿Por qué?": "OptionPorQue",
  "aumentaron las emisiones": "OptionPorQue_aumentaronEmisones",
  "disminuyeron las emisiones": "OptionPorQue_disminuyeronEmisiones",
  "la tea esta generando humo negro": "OptionPorQue_teaGeneraHumoNegro",

  "¿Cuál?": "OptionCual",
  "es el límite de emisiones": "OptionCual_esLimiteEmisiones",
  "es la emisión promedio": "OptionCual_emisionPromedio",
  "es la emisión máxima": "OptionCual_emisionMaxima",
  "es el flujo de purga y de pilotos": "OptionCual_flujoDePurgaPilotos",
};

var data = {
  chatinit: {
    message: [""],
    options: ["¿Qué?", "¿Por qué?", "¿Cuál?"],
  },
  OptionQue: {
    message: [""],
    options: [
      "variables influyen en las emisiones de la tea",
      "variables influyen en la eficiencia de la tea",
      "variables utiliza el modelo de emisiones",
    ],
    activateSendButton: true,
  },
  OptionPorQue: {
    message: [""],
    options: [
      "aumentaron las emisiones",
      "disminuyeron las emisiones",
      "la tea esta generando humo negro",
    ],
    activateSendButton: true,
  },
  OptionCual: {
    message: [""],
    options: [
      "es el límite de emisiones",
      "es la emisión promedio",
      "es la emisión máxima",
      // "es el flujo de purga y de pilotos",
    ],
    activateSendButton: false,
  },
  OptionCual_esLimiteEmisiones: {
    message: [""],
    options: ["de hoy", "de esta semana", "de este mes", "de este año"],
    activateSendButton: false,
  },
  OptionCual_emisionPromedio: {
    message: [""],
    options: ["de hoy", "de esta semana", "de este mes", "de este año"],
    activateSendButton: false,
  },
  OptionCual_emisionMaxima: {
    message: [""],
    options: ["de hoy", "de esta semana", "de este mes", "de este año"],
    activateSendButton: false,
  },
  OptionCual_flujoDePurgaPilotos: {
    message: [""],
    options: ["de hoy", "de esta semana", "de este mes", "de este año"],
    activateSendButton: true,
  },

  others: {
    message: [""],
    options: ["YouTube", "Netflix", "Amazon Prime", "Hot Star"],
    activateSendButton: false,
  },
};

const Westbot = () => {
  // State variables for DOM element references and chat data
  const [chatbotToggler, setChatbotToggler] = useState(null);
  const [closeBtn, setCloseBtn] = useState(null);
  const [chatbox, setChatbox] = useState(null);
  const [chatInput, setChatInput] = useState(null);
  const [sendChatBtn, setSendChatBtn] = useState(null);
  const [textArea, setTextArea] = useState(null);
  const [spanElement, setSpanElement] = useState(null);

  useEffect(() => {
    // Accede a los elementos del DOM cuando el componente se monta
    const chatbotTogglerElement = document.querySelector(".chatbot-toggler");
    const closeBtnElement = document.querySelector(".close-btn");
    const chatboxElement = document.querySelector(".chatbox");
    const chatInputElement = document.querySelector(".chat-input textarea");
    const sendChatBtnElement = document.querySelector(".chat-input span");
    const textArea = document.querySelector(".chat-input textarea");
    const spanElement = document.querySelector(".chat-input span");
    // Set state variables with DOM element references
    setChatbotToggler(chatbotTogglerElement);
    setCloseBtn(closeBtnElement);
    setChatbox(chatboxElement);
    setChatInput(chatInputElement);
    setSendChatBtn(sendChatBtnElement);
    setTextArea(textArea);
    setSpanElement(spanElement);
  }, []);
  const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent =
      className === "outgoing"
        ? `<p></p>`
        : `<span><img src="esva.jpeg"></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    console.log(chatLi);
    return chatLi; // return chat <li> element
  };

  const generateResponse = (chatElement, userMessage) => {
    const messageElement = chatElement.querySelector("p");
    if (userMessage == "Qué variables influyen en las emisiones de la tea?"){
      messageElement.textContent = "Las variables que influyen en las emisiones de la tea son el flujo de gas a la tea y la eficiencia de combustión de esta. A medida que el flujo de gas aumente, aumentarán las emisiones de dióxido de carbono, y metano. Si la eficiencia de la tea disminuye, más masa del gas se emitirá como productos sin reaccionar completamente, es decir, monóxido de carbono o los mismos hidrocarburos como metano, propano y butano, los cuales tienen mayor impacto ambiental. Si la eficiencia de la tea aumenta, más componentes se transformarán a CO2 el cual tiene menor impacto ambiental."
    }
    if (userMessage == "Qué variables influyen en la eficiencia de la tea?"){
      messageElement.textContent = "Las variables que influyen en las emisiones de la tea son el flujo de gas a la tea y la eficiencia de combustión de esta. A medida que el flujo de gas aumente, aumentarán las emisiones de dióxido de carbono, y metano. Si la eficiencia de la tea disminuye, más masa del gas se emitirá como productos sin reaccionar completamente, es decir, monóxido de carbono o los mismos hidrocarburos como metano, propano y butano, los cuales tienen mayor impacto ambiental. Si la eficiencia de la tea aumenta, más componentes se transformarán a CO2 el cual tiene menor impacto ambiental."
    }
    if (userMessage == "Qué variables utiliza el modelo de emisiones?"){
      messageElement.textContent = "las variables que utiliza el modelo de emisiones son: Flujo de gas a tea, Temperatura de gas a tea, Presión de gas a tea, Composición del gas a tea, Velocidad del viento, Diámetro de la tea"
    }
// 
    if (userMessage == "Por qué aumentaron las emisiones?"){
      messageElement.textContent = "Las emisiones aumentaron potencialmente por un cambio en el flujo de gas a la tea o la composición de gas. Se recomienda hacer revisión de PSV activadas , de PCV activadas con descarga directa a la tea o si el nivel del KO drum paso los límites definidos "
    }
    if (userMessage == "Por qué disminuyeron las emisiones?"){
      messageElement.textContent = "Las emisiones aumentaron potencialmente por un cambio en el flujo de gas a la tea o la composición de gas."
    }
    if (userMessage == "Por qué la tea esta generando humo negro?"){
      messageElement.textContent = "La generación de humo negro en la tea puede deberse a una disminución en la eficiencia de la tea o la presencia de líquidos en el flujo de gas. Se recomienda revisar la composición del gas a tea para identificar la potencial presencia de hidrocarburos pesados (C4+) o de altas concentraciones de inertes (CO2, N2). Adicionalmente, se recomienda revisar el nivel del KO drum para asegurar que no ha habido paso de líquido o si la tea está recibiendo líquido desde alguna descarga de otra parte diferente del proceso. "
    }
// 
  if (userMessage.includes("límite de emisiones")) {
    if (userMessage.includes("hoy")) {
      messageElement.textContent = "El límite de emisiones de CO2 diario es 500 kilos";
    } else if (userMessage.includes("esta semana")) {
      messageElement.textContent = "El límite de emisiones de CO2 semanal es 3500 kilos.";
    } else if (userMessage.includes("este mes")) {
      messageElement.textContent = "El límite de emisiones de CO2 mensual es 15000 kilos.";
    } else if (userMessage.includes("este ao")) {
      messageElement.textContent = "El límite de emisiones de CO2 anual es 180000 kilos.";
    }
  }

  if (userMessage.includes("emisión promedio")) {
    if (userMessage.includes("hoy")) {
      messageElement.textContent = "El promedio de emisiones de CO2 diario es 450 kilos.";
    } else if (userMessage.includes("esta semana")) {
      messageElement.textContent = "El promedio de emisiones de CO2 semanal es 3200 kilos.";
    } else if (userMessage.includes("este mes")) {
      messageElement.textContent = "El promedio de emisiones de CO2 mensual es 14000 kilos.";
    } else if (userMessage.includes("este ao")) {
      messageElement.textContent = "El promedio de emisiones de CO2 anual es 170000 kilos.";
    }
  }

  if (userMessage.includes("emisión máxima")) {
    if (userMessage.includes("hoy")) {
      messageElement.textContent = "La emisión de CO2 máxima diaria es 600 kilos.";
    } else if (userMessage.includes("esta semana")) {
      messageElement.textContent = "La emisión de CO2 máxima semanal es 4000 kilos.";
    } else if (userMessage.includes("este mes")) {
      messageElement.textContent = "La emisión de CO2 máxima mensual es 18000 kilos.";
    } else if (userMessage.includes("este ao")) {
      messageElement.textContent = "La emisión de CO2 máxima anual es 200000 kilos.";
    }
  }

  if (userMessage.includes("flujo de purga y de pilotos")) {
    messageElement.textContent = "El flujo de purga y de pilotos es 20 SCFH";
  }

  };
  /**
   * Handle user input and initiate chat interactions.
   */
  const handleChat = () => {
    spanElement.style.visibility = "hidden";

    // Delete the div element of options when the user sends the question
    const elementToRemove = document.querySelector(".optionsContainer");
    if (elementToRemove) {
      elementToRemove.remove();
    }

    // Extra validation to return if the user message is empty
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    // Clear the input textarea and set its height to default
    chatInput.value = "";

    // Append the user's message to the chat
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
      // Generate response and wait
      const incomingChatLi = createChatLi("Buscando respuesta...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi, userMessage);

      // Continue with the chat
      setTimeout(() => {
        const incomingChatLi2 = createChatLi(
          "Tienes alguna otra pregunta?",
          "incoming"
        );
        chatbox.appendChild(incomingChatLi2);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        initChat();
      }, 600);
    }, 600);
  };

  //Initialize the chat interface with initial options.
  const initChat = () => {
    showOptions(data.chatinit.options);
  };
  // Create an option element for the chat interface.
  const createOption = (option) => {
    var opt = document.createElement("span");
    var inp = "<div>" + option + "</div>";
    opt.innerHTML = inp;
    opt.setAttribute("class", "opt");
    opt.addEventListener("click", handleOpt);
    return opt;
  };
  //   Show the provided options in the chat interface.
  const showOptions = (options, message = "") => {
    if (message != "") {
      console.log(message);
      const incomingChatLi = createChatLi(message, "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }

    var containerDiv = document.createElement("div");
    containerDiv.setAttribute("class", "optionsContainer");

    var comboboxCreated = false;

    if (options[0] == "combobox") {
      for (var i = 1; i < options.length; i++) {
        // validate and (if its necessary) create the combobox element
        if (!comboboxCreated) {
          console.log("entra y crea el elemento");
          var element = document.createElement("select");
          element.setAttribute("class", "elementContainer");
          comboboxCreated = true;
        }

        // add the element in the combobox
        var optionElement = document.createElement("option");
        optionElement.textContent = options[i];
        element.appendChild(optionElement);
      }
      var opt = document.createElement("span");
      var inp = "<div>" + "seleccionar" + "</div>";
      opt.innerHTML = inp;
      opt.setAttribute("class", "opt");
      opt.addEventListener("click", function () {
        var selectElement = document.querySelector(".elementContainer");
        var value = selectElement.value;
        var inputTextarea = document.querySelector(".chat-input textarea");
        var consulta = inputTextarea.value + " " + value + "?";
        inputTextarea.value = consulta;
        var elementToRemove = document.querySelector(".optionsContainer");
        if (elementToRemove) {
          elementToRemove.remove();
        }
        spanElement.style.visibility = "visible";
      });
      containerDiv.appendChild(element);
      containerDiv.appendChild(opt);
    } else {
      for (var i = 0; i < options.length; i++) {
        element = createOption(options[i]);
        containerDiv.appendChild(element);
      }
    }
    chatbox.appendChild(containerDiv);
  };
  //Handle option selection in the chat interface.
  const handleOpt = (event) => {
    const findText = event.currentTarget.textContent;
    const inputTextarea = document.querySelector(".chat-input textarea");

    // Remove all option elements with class "opt"
    document.querySelectorAll(".opt").forEach((el) => {
      el.remove();
    });

    // Create a new paragraph element and set its class
    const elm = document.createElement("p");
    elm.setAttribute("class", "test");

    // Scroll to the bottom of the chatbox
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Update the chat input with selected option text
    const cleanedText = findText.replace(/[^a-zA-ZáéíóúüÁÉÍÓÚÜ\s]/g, "");
    const consulta = `${inputTextarea.value} ${cleanedText}`;
    inputTextarea.value = consulta;

    // Retrieve the corresponding data object based on the selected option text
    const tempObj = data[diccionaryOfOptions[findText]];

    if (!tempObj) {
      // Update input textarea with a question mark if corresponding data object not found
      inputTextarea.value += "?";
      spanElement.style.visibility = "visible";
      return;
    }

    // Call handleResults function with options and message from tempObj
    handleResults(tempObj.options, tempObj.message);
  };
  //Handle the results of option selection in the chat interface.
  const handleResults = (options, message) => {
    // when an option is removed, the div containing it must be deleted
    var elementToRemove = document.querySelector(".optionsContainer");
    if (elementToRemove) {
      elementToRemove.remove();
    }
    // scroll down
    chatbox.scrollTo(0, chatbox.scrollHeight);
    // show the new options
    showOptions(options, message);
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
    textArea.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handleChat();
      }
    });
  }
  if (sendChatBtn != null) {
    sendChatBtn.addEventListener("click", () => {
      handleChat();
    });
  }
  if (closeBtn != null) {
    closeBtn.addEventListener("click", () =>
      document.body.classList.remove("show-chatbot")
    );
  }
  if (chatbotToggler != null) {
    chatbotToggler.addEventListener("click", () => {
      document.body.classList.toggle("show-chatbot");
      // a validation to know if the options has already exist, to init or not
      var elementToRemove = document.querySelector(".optionsContainer");
      if (!elementToRemove) {
        initChat();
      }
    });
  }

  return (
    <div>
      <button className="chatbot-toggler">
        <span className="material-symbols-rounded">🗨️</span>
        <span className="material-symbols-outlined">✖︎</span>
      </button>
      <div className="chatbot">
        <header>
          <h2>ESVA</h2>
          <span className="close-btn material-symbols-outlined">close</span>
        </header>
        <ul className="chatbox">
          <li className="chat incoming">
            <span>
              <img src="esva.jpeg" />
            </span>
            <p>
              Hola! soy ESVA, tu chat personal <br />
              ¿Cómo puedo ayudarte hoy? ¿Quieres conocer sobre algún tema en
              particular?
            </p>
          </li>
        </ul>
        <div className="chat-input">
          <textarea
            placeholder="Introduzca la opción"
            spellCheck="false"
            required
            disabled
          ></textarea>
          <span id="send-btn" className="material-symbols-rounded">
            send
          </span>
        </div>
      </div>
    </div>
  );
};

export default Westbot;

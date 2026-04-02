import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

export default function Chatbot() {
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm your AI mentor! Ask me anything!" }
  ]);

  const [input, setInput] = useState("");

  // 🧠 CONTEXT MEMORY
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: input,
          history: updatedMessages
        })
      });

      const data = await res.json();

      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.reply }
        ]);
      }, 700);

    } catch (err) {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server" }
      ]);
    }

    setInput("");
  };

  // 🎤 VOICE INPUT
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setInput(speechText);
    };

    recognition.start();
  };

  // 🔄 AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          {open ? <FaTimes size={20} /> : <FaRobot size={20} />}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`fixed bottom-20 right-6 w-96 h-[450px] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border ${
              darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 font-semibold flex items-center gap-2">
              🤖 AI Assistant

              {/* 🌙 DARK MODE TOGGLE */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="ml-auto text-sm"
              >
                🌙
              </button>
            </div>

            {/* MESSAGES */}
            <div
              className={`flex-1 p-3 overflow-y-auto space-y-2 ${
                darkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : darkMode
                        ? "bg-gray-700 text-white rounded-bl-none"
                        : "bg-gray-200 text-black rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing */}
              {typing && (
                <div className="text-left text-gray-400 text-sm">
                  <span className="animate-pulse">● ● ●</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="flex border-t">
              <button
                onClick={startListening}
                className="px-2 text-gray-500 hover:text-blue-600"
              >
                🎤
              </button>

              <input
                type="text"
                placeholder="Ask anything..."
                className="flex-1 p-2 outline-none text-sm bg-transparent"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 text-sm hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
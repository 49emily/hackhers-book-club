import React, { useEffect, useState } from "react";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";
import { Button } from "antd";
import "./App.css";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

// import * as ai from "@replit/ai";

function App() {
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const { speak, voices } = useSpeechSynthesis();

  // let response = "";
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setResponse((oldResponse) => oldResponse + result);
      setValue(result);
    },
  });

  const introText = `Welcome Emily and Sharon to today’s session. You’re about to do session 2 of your “Search
  Inside Yourself journey.” This will hopefully be an enjoyable and bonding experience while
  also being an introduction to mindfulness and emotional intelligence. Today we will practice
  “mindful listening exercise".`;

  const start = () => {
    speak({ text: introText, voice: voices[0] });
  };

  return (
    <div className="App">
      <div className="main-container">
        <Button onClick={start}>Start</Button>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          //  animate={{ y: [100, 0] }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="ai-text"
        >
          <TypeAnimation sequence={[introText]} />
        </motion.div>
        <p>{value}</p>
        <Button onClick={listen}>{listening ? "Listening" : "Listen"} </Button>
        {/* <p>{response}</p> */}
      </div>
    </div>
  );
}

export default App;

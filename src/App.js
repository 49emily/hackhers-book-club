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

  const introText = `Welcome Emily and Sharon to today’s session. Today we will practice
  “mindful listening exercise".`;

  const activeListeningText = `In this exercise, we will practice listening in a way that is different from how we usually listen. We will do this in pairs - each person taking turns to be the speaker and the listener.`;

  const text3 = "Emily first you are the speaker. Sharon, you are the listener.";

  const text4 =
    "Emily, this will be a monologue. You get to speak uninterrupted for 3 minutes on a prompt. If you run out of things to say, that is fine; you can just sit in silence and whenever you have something to say, you may continue speaking again.";

  const text5 =
    "Your job is to listen. When you listen, give your full attention to the speaker. You may not ask questions during these 3 minutes. You may acknowledge with facial expressions, by nodding your head, or by saying, “I see,” or “I understand.” You may not speak except to acknowledge";
  const audios = [introText, activeListeningText, text3, text4, text5];

  // const start = () => {
  //   speak({ text: introText, voice: voices[0] });
  // };

  // const speak2 = () => {
  //   speak({ text: activeListeningText, voice: voices[0] });
  // };

  const [index, setIndex] = useState(0);
  return (
    <div className="App">
      <div className="main-container">
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
          <TypeAnimation
            sequence={[
              introText,
              2000,
              activeListeningText,
              1000,
              text3,
              1000,
              text4,
              4000,
              text5,
              4000,
            ]}
            omitDeletionAnimation="true"
          />
        </motion.div>

        {/* <Button onClick={listen}>{listening ? "Listening" : "Listen"} </Button> */}
        {/* <p>{response}</p> */}
        <Button
          className="button"
          onClick={() => {
            speak({ text: audios[index], voice: voices[1] });
            setIndex(index + 1);
          }}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default App;

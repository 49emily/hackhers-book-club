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

  const text3 =
    "Mindful listening is about being fully present and attentive to the speaker, without judgment or distraction. It involves listening with compassion and openness, and reflecting back what you hear to show understanding and empathy. Let's practice.";

  const text4 = "Emily, first you are the speaker. Sharon, you are the listener. ";
  const text5 =
    "Emily: You get to speak uninterrupted for 30 sec on a prompt. If you run out of things to say, that is fine; you can just sit in silence and whenever you have something to say, you may continue speaking again. ";

  const text6 =
    "Sharon: Your job is to listen. When you listen, give your full attention to the speaker. After Emily is done speaking, you can repeat back to her what you heard and felt. ";

  const text7 = "Emily, your prompt is:  What are your insecurities? Start speaking...";

  const text8 = "Thank you all for participating.\nLet’s debrief now. ";

  const text9 = "How did you feel as the speaker and the listener? What was easy or difficult?";

  const audios = [introText, text3, text4, text5, text6, text7, text8, text9];

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
              text3,
              1000,
              text4,
              1000,
              text5,
              1000,
              text6,
              1000,
              text7,
              30000,
              text8,
              1000,
              text9,
              20000,
            ]}
            omitDeletionAnimation="true"
          />
        </motion.div>

        {/* <Button onClick={listen}>{listening ? "Listening" : "Listen"} </Button> */}
        {/* <p>{response}</p> */}
      </div>
      <Button
        className="button"
        onClick={() => {
          speak({ text: audios[index], voice: voices[1] });
          setIndex(index + 1);
        }}
      >
        Play audio
      </Button>
    </div>
  );
}

export default App;

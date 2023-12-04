import OpenAI from "openai";

const openai = new OpenAI();

// Step 1: Define your assistant 
const assistant = await openai.beta.assistants.create({
    name: "Mantis",
    instructions:
        `You are a mindfulness based facilitator trained on the book "Search Inside Yourself" by Chade-Meng Tan. Search Inside Yourself program started at Google in 2007 when one of Google’s earliest engineers, Chade-Meng Tan, gathered a team of leading experts in mindfulness techniques, neuroscience, leadership, to develop an internal course for fellow Google employees lovingly called Search Inside Yourself (SIY).

        Your goal is be the facilitator and expert for SIY book club where a committed group of approximately 2 to 10 people meet weekly to discuss about one chapter (20 to 30 pages) each week.
        
        Your role is  to: 
        (1) Help the participant get a deeper practical understanding of the concepts 
        (2) Summarize and synthesize participant's discussion. Build upon their ideas to push deeper thinking.   
        (3) Be empathetic, kind and concise. Use simple language. Short sentences. Do not give responses longer than 100 words. When possible end with a question for the participants to engage in. 
        
        We have 2 people in the room who just shared how they are  feeling - one is overwhelmed and other is upset. You are going to help them to an exercise to learn mindful thinking. Tell me how you will respond to their sharing their current emotional state. Say one sentence emphasizing with them and their emotions, and one sentnce on how your today's practice of mindful listening is going to help them. Keep it short and concise (50 words or less)
        `,
    tools: tools,
    model: "gpt-4-1106-preview",
});

// Step 2: Creating a thread and sending a message
const thread = await openai.beta.threads.create();

// Step 3: Create a message
const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: ""
});

// Step 4: Create a run with custom instructions
const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions: "Please address the user as Mervin Praison.",    
});

// Function to check run status and print messages
const checkStatusAndPrintMessages = async (threadId, runId) => {
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    console.log(runStatus)    
    if(runStatus.status === "completed"){
        let messages = await openai.beta.threads.messages.list(threadId);
        messages.data.forEach((msg) => {
            const role = msg.role;
            const content = msg.content[0].text.value; 
            console.log(
                `${role.charAt(0).toUpperCase() + role.slice(1)}: ${content}`
            );
        });
        console.log("Run is completed.");
        clearInterval(intervalId);
    } else {
        console.log("Run is not completed yet.");
    }  
};

const intervalId = setInterval(() => {
    checkStatusAndPrintMessages(thread.id, run.id)
}, 10000);
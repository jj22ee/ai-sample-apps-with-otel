const readline = require('node:readline');
const { BedrockChat } = require("@langchain/community/chat_models/bedrock");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const traceloop = require("@traceloop/node-server-sdk")
const logger = require('pino')()

const llm = new BedrockChat({
    model: "anthropic.claude-3-sonnet-20240229-v1:0",
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY,
    },
    temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful assistant. Provide a helpful response to the following user input.",
    ],
    ["human", "{input}"],
  ]);

const chain = prompt.pipe(llm);

const askQuestion = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question(`Prepare Question: `, question => {
        rl.close();
        if (question == "end") {
            return
        }

        if (question != "") {
            logger.info(`Question asked: ${question}`)
            traceloop.withWorkflow({ name: "sample_chat" }, () => {
                traceloop.withTask({ name: "parent_task" }, () => {
                    chain.invoke({
                        input_language: "English",
                        output_language: "English",
                        input: question,
                    }).then((aiMsg) => {
                        console.log(aiMsg);
                        askQuestion();
                    });
                });
            });
        } else {
            askQuestion();
        }
    });
}

askQuestion();

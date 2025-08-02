import React, { useEffect, useState } from "react";
import { Box, render, Text } from "ink";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

const App = () => {
  const [response, setResponse] = useState("");
  const prompt = "箱根のおすすめの観光地を教えてください。";
  useEffect(() => {
    const generateResponse = async () => {
      // streamText 関数はテキスト生成をストリーミングで返す
      const res = streamText({
        // モデルを指定する
        // ここでは Google Gemini の最新モデルを指定
        model: google("gemini-2.5-pro-exp-03-25"),
        // 一旦プロンプトのメッセージを固定で指定する
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      // ストリーミングされたテキストをチャンクごとに受け取る
      for await (const chunk of res.textStream) {
        setResponse((prev) => prev + chunk);
      }
    };
    generateResponse();
  }, []);

  return (
    <Box flexDirection="column">
      <Text color="green">user: {prompt}</Text>
      <Text color="blue">assistant:</Text>
      <Text color="white">{response}</Text>
    </Box>
  );
};
render(<App />);

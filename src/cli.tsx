import React, { useEffect, useState } from "react";
import { Box, render, Text } from "ink";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import Spinner from "ink-spinner";

const App = () => {
  const [response, setResponse] = useState("");
  const prompt = "箱根のおすすめの観光地を教えてください。";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateResponse = async () => {
      setLoading(true);
      const res = streamText({
        model: google("gemini-2.5-pro"),
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      for await (const chunk of res.textStream) {
        // はじめのレスポンスが返ってきたら loadingをfalseにする
        setLoading(false);
        setResponse((prev) => prev + chunk);
      }
    };
    generateResponse();
  }, []);

  return (
    <Box flexDirection="column">
      <Text color="green">user: {prompt}</Text>
      <Text color="blue">assistant:</Text>
      {loading && (
        <Text color="yellow">
          <Spinner type="dots" /> Loading...
        </Text>
      )}
      <Text color="white">{response}</Text>
    </Box>
  );
};
render(<App />);

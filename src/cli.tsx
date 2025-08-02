import React, { useEffect, useState } from "react";
import { render, Text } from "ink";

const App = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Text color="green">{time.toLocaleTimeString()}</Text>;
};

render(<App />);

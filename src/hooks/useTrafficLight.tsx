import { useEffect, useState } from "react";

export default function useTrafficLight() {
  const colors = {
    red: "bg-red-500 animate-pulse",
    yellow: "bg-yellow-500 animate-pulse",
    green: "bg-green-500 animate-pulse",
  };

  // type TrafficLightColor = 'red' | 'yellow' | 'green';
  type TrafficLightColor = keyof typeof colors; // Lograr lo mismo pero de manera automatizada

  const [light, setLight] = useState<TrafficLightColor>("red");
  const [countdown, setCountdown] = useState(5);

  // Countdown effect
  useEffect(() => {
    if (countdown === 0) return;

    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [countdown, light]);

  // Change light color effect
  useEffect(() => {
    if (countdown > 0) return;

    if (countdown === 0) {
      setCountdown(5);

      if (light === "red") {
        return setLight("green");
      }
      if (light === "yellow") {
        return setLight("red");
      }
      if (light === "green") {
        return setLight("yellow");
      }
      return;
    }
  }, [countdown, light]);

  return {
    // Props
    colors,
    light,
    countdown,

    // Computed / Calculos
    percentage: (countdown / 5) * 100,
    redLight: light === "red" ? colors[light] : "bg-gray-500",
    greenLight: light === "green" ? colors[light] : "bg-gray-500",
    yellowLight: light === "yellow" ? colors[light] : "bg-gray-500",

    // Methods / Actions
  };
}

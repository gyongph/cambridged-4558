import { useState } from "react";

export default function (initial_state: number = 0) {
  const [count, setCountState] = useState(initial_state);
  return {
    value: count,
    increase() {
      setCountState((current) => {
        return current + 1;
      });
    },
    decrease() {
      setCountState((current) => {
        return current - 1;
      });
    },
    reset() {
      setCountState(initial_state);
    },
  };
}

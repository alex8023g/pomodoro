import React, { useEffect, useRef } from 'react';
import { TTimerState } from '../TimerBlock';


type TCb = () => void;

export function useInterval(
  callback: () => void,
  isRunning: boolean,
  delay: number
  // timerState: TTimerState
) {
  const savedCallback = useRef(() => { });

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (isRunning) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [isRunning, delay]);
}
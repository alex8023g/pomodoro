import Button from '@mui/material/Button';
import React, { useState, Dispatch, SetStateAction } from 'react';
import useTaskStore from '../../store';
import { TTimerState } from '../TimerBlock';
import styles from './timer.module.css';
import { useInterval } from '../../hooks/useInterval';
import { LeftBtn } from '../LeftBtn';
import { RightBtn } from '../RightBtn';

export type TStartBtnV = 'старт' | 'пауза' | 'продолжить';
export type TStopBtnV = 'стоп' | 'сделано' | 'пропустить';
export type TBreakPeriod = 900_000 | 300_000;
const workPeriod = 1_500_000;

export function Timer({
  timerState,
  setTimerState,
}: {
  timerState: TTimerState;
  setTimerState: Dispatch<SetStateAction<TTimerState>>;
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [millisec, setMillisec] = useState(workPeriod);
  const [startBtnV, setStartBtnV] = useState<TStartBtnV>('старт');
  const [stopBtnV, setStopBtnV] = useState<TStopBtnV>('стоп');
  const [isStopBtnDisabled, setIsStopBtnDisabled] = useState(true);
  const [isWorkPause, setIsWorkPause] = useState(false);
  const [breakPeriod, setBreakPeriod] = useState<TBreakPeriod>(300_000);

  const tasksStore = useTaskStore((state) => state.tasks);
  const increasePomodoroDone = useTaskStore((state) => state.increasePomodoroDone);
  const incWorkTime = useTaskStore((state) => state.incWorkTime);
  const incPauseTime = useTaskStore((state) => state.incPauseTime);
  const removeTask = useTaskStore((state) => state.removeTask);
  const incPomDoneToday = useTaskStore((state) => state.incPomDoneToday);

  useInterval(
    () => {
      incPauseTime();
    },
    isWorkPause,
    1000
  );

  useInterval(
    () => {
      if (millisec > 0) {
        setMillisec((v) => v - 1000);
        if (timerState === 'work') {
          incWorkTime();
        }
      } else if (timerState === 'work') {
        setTimerState('break');
        setStartBtnV('старт');
        setStopBtnV('пропустить');
        incPomDoneToday();
        setIsStopBtnDisabled(true);
        setMillisec(breakPeriod);
        setIsRunning(false);
      } else if (timerState === 'break') {
        setTimerState('stop');
        setStartBtnV('старт');
        setStopBtnV('стоп');
        setIsStopBtnDisabled(true);
        setMillisec(workPeriod);
        setIsRunning(false);
        increasePomodoroDone(tasksStore[0]);
        if (tasksStore[0].pomodoroDone === tasksStore[0].pomodoroTotal) {
          removeTask(tasksStore[0]);
        }
        if ((tasksStore[0].pomodoroDone + 1) % 4 === 0) {
          setBreakPeriod(900_000);
        } else {
          setBreakPeriod(300_000);
        }
      }
    },
    isRunning,
    1000
  );

  return (
    <>
      <h1>{new Date(millisec).toLocaleTimeString().substring(3, 8)}</h1>
      <p>
        {tasksStore[0]?.taskText
          ? `Задача: ${tasksStore[0].taskText}`
          : 'Добавьте задачу'}
      </p>

      <LeftBtn
        startBtnV={startBtnV}
        setIsRunning={setIsRunning}
        setStartBtnV={setStartBtnV}
        setIsStopBtnDisabled={setIsStopBtnDisabled}
        timerState={timerState}
        setTimerState={setTimerState}
        setStopBtnV={setStopBtnV}
        setIsWorkPause={setIsWorkPause}
      />

      <RightBtn
        stopBtnV={stopBtnV}
        setStopBtnV={setStopBtnV}
        isStopBtnDisabled={isStopBtnDisabled}
        setIsRunning={setIsRunning}
        setMillisec={setMillisec}
        setStartBtnV={setStartBtnV}
        setIsStopBtnDisabled={setIsStopBtnDisabled}
        setTimerState={setTimerState}
        setIsWorkPause={setIsWorkPause}
        workPeriod={workPeriod}
        breakPeriod={breakPeriod}
        setBreakPeriod={setBreakPeriod}
      />
    </>
  );
}

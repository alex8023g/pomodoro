import Button from '@mui/material/Button';
import React, { useState, Dispatch, SetStateAction } from 'react';
import useTaskStore from '../store';
import { TTimerState } from '../TimerBlock';
import styles from './timer.module.css';
import { useInterval } from '../hooks/useInterval';
import { LeftBtn } from '../LeftBtn';
import { RightBtn } from '../RightBtn';

export type TStartBtnV = 'старт' | 'пауза' | 'продолжить';
export type TStopBtnV = 'стоп' | 'сделано' | 'пропустить';
// type TWorkState = 'work' | 'break';
export type TBreakPeriod = 900_000 | 300_000;
const workPeriod = 1_500_000;
// let breakPeriod: TBreakPeriod = 300_000;

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
  // const [workState, setWorkState] = useState<TWorkState>('work');
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
      // Your custom logic here
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
    // timerState
  );

  // function handleStartBtn() {
  //   if (startBtnV === 'старт') {
  //     setIsRunning(true);
  //     setStartBtnV('пауза');
  //     setIsStopBtnDisabled(false);
  //     if (timerState === 'stop') {
  //       setTimerState('work');
  //     }
  //   } else if (startBtnV === 'пауза') {
  //     setIsRunning(false);
  //     setStartBtnV('продолжить');
  //     if (timerState === 'work') {
  //       setStopBtnV('сделано');
  //       setIsWorkPause(true);
  //     }
  //   } else if (startBtnV === 'продолжить') {
  //     setIsRunning(true);
  //     setStartBtnV('пауза');
  //     if (timerState === 'work') {
  //       setStopBtnV('стоп');
  //       setIsWorkPause(false);
  //     }
  //   }
  // }

  // function handleStopBtn() {
  //   if (stopBtnV === 'стоп') {
  //     incStopsNumb();
  //     setIsRunning(false);
  //     setMillisec(workPeriod);
  //     setStartBtnV('старт');
  //     setIsStopBtnDisabled(true);
  //     setTimerState('stop');
  //   } else if (stopBtnV === 'сделано') {
  //     setIsRunning(false);
  //     setIsWorkPause(false);
  //     incPomDoneToday();
  //     if ((tasksStore[0].pomodoroDone + 1) % 4 === 0) {
  //       breakPeriod = 900_000;
  //     } else {
  //       breakPeriod = 300_000;
  //     }
  //     setMillisec(breakPeriod);
  //     setStartBtnV('старт');
  //     setStopBtnV('пропустить');
  //     setIsStopBtnDisabled(true);
  //     setTimerState('break');
  //   } else if (stopBtnV === 'пропустить') {
  //     setIsRunning(false);
  //     setMillisec(workPeriod);
  //     setStartBtnV('старт');
  //     setStopBtnV('стоп');
  //     setIsStopBtnDisabled(true);
  //     setTimerState('stop');
  //     increasePomodoroDone(tasksStore[0]);
  //   }
  // }

  return (
    <>
      <h1>{new Date(millisec).toLocaleTimeString().substring(3, 8)}</h1>
      <p>
        {tasksStore[0]?.taskText
          ? `Задача: ${tasksStore[0].taskText}`
          : 'Добавьте задачу'}
      </p>
      {/* <Button
        variant='contained'
        color='success'
        sx={{ mr: 2 }}
        onClick={handleStartBtn}
        disabled={!tasksStore[0] ? true : false}
      >
        {startBtnV}
      </Button> */}
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

      {/* <Button
        variant='outlined'
        color='error'
        onClick={handleStopBtn}
        disabled={isStopBtnDisabled}
      >
        {stopBtnV}
      </Button> */}
      {/* <br />
      <br /> */}
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

import Button from '@mui/material/Button';
import React, { Dispatch, SetStateAction } from 'react';
import useTaskStore from '../../store';
import { TBreakPeriod, TStartBtnV, TStopBtnV } from '../Timer';
import { TTimerState } from '../TimerBlock';

export function RightBtn({
  stopBtnV,
  setStopBtnV,
  isStopBtnDisabled,
  setIsRunning,
  setMillisec,
  setStartBtnV,
  setIsStopBtnDisabled,
  setTimerState,
  setIsWorkPause,
  workPeriod,
  breakPeriod,
  setBreakPeriod,
}: {
  stopBtnV: TStopBtnV;
  setStopBtnV: Dispatch<SetStateAction<TStopBtnV>>;
  isStopBtnDisabled: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  setMillisec: Dispatch<SetStateAction<number>>;
  setStartBtnV: Dispatch<SetStateAction<TStartBtnV>>;
  setIsStopBtnDisabled: Dispatch<SetStateAction<boolean>>;
  setTimerState: Dispatch<SetStateAction<TTimerState>>;
  setIsWorkPause: Dispatch<SetStateAction<boolean>>;
  workPeriod: number;
  breakPeriod: TBreakPeriod;
  setBreakPeriod: Dispatch<SetStateAction<TBreakPeriod>>;
}) {
  const tasksStore = useTaskStore((state) => state.tasks);
  const increasePomodoroDone = useTaskStore((state) => state.increasePomodoroDone);
  const removeTask = useTaskStore((state) => state.removeTask);
  const incStopsNumb = useTaskStore((state) => state.incStopsNumb);
  const incPomDoneToday = useTaskStore((state) => state.incPomDoneToday);
  function handleStopBtn() {
    // обработчик кнопки СТОП
    if (stopBtnV === 'стоп') {
      incStopsNumb();
      setIsRunning(false);
      setMillisec(workPeriod);
      setStartBtnV('старт');
      setIsStopBtnDisabled(true);
      setTimerState('stop');
      // обработчик кнопки СДЕЛАНО
    } else if (stopBtnV === 'сделано') {
      setIsRunning(false);
      setIsWorkPause(false);
      incPomDoneToday();
      if ((tasksStore[0].pomodoroDone + 1) % 4 === 0) {
        breakPeriod = 900_000;
      } else {
        breakPeriod = 300_000;
      }
      setMillisec(breakPeriod);
      setStartBtnV('старт');
      setStopBtnV('пропустить');
      setIsStopBtnDisabled(true);
      setTimerState('break');
      // обработчик кнопки ПРОПУСТИТЬ
    } else if (stopBtnV === 'пропустить') {
      setIsRunning(false);
      setMillisec(workPeriod);
      setStartBtnV('старт');
      setStopBtnV('стоп');
      setIsStopBtnDisabled(true);
      setTimerState('stop');
      increasePomodoroDone(tasksStore[0]);
      if (tasksStore[0].pomodoroDone === tasksStore[0].pomodoroTotal) {
        removeTask(tasksStore[0]);
      }
    }
  }
  return (
    <Button
      variant='outlined'
      color='error'
      onClick={handleStopBtn}
      disabled={isStopBtnDisabled}
    >
      {stopBtnV}
    </Button>
  );
}

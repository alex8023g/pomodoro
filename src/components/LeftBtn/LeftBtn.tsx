import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';
import useTaskStore from '../../store';
import { TStartBtnV, TStopBtnV } from '../Timer';
import { TTimerState } from '../TimerBlock';
import { btnstyle } from './style';

export function LeftBtn({
  startBtnV,
  setStartBtnV,
  setIsRunning,
  setIsStopBtnDisabled,
  timerState,
  setTimerState,
  setStopBtnV,
  setIsWorkPause,
}: {
  startBtnV: TStartBtnV;
  setStartBtnV: Dispatch<SetStateAction<TStartBtnV>>;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  setIsStopBtnDisabled: Dispatch<SetStateAction<boolean>>;
  timerState: TTimerState;
  setTimerState: Dispatch<SetStateAction<TTimerState>>;
  setStopBtnV: Dispatch<SetStateAction<TStopBtnV>>;
  setIsWorkPause: Dispatch<SetStateAction<boolean>>;
}) {
  const tasksStore = useTaskStore((state) => state.tasks);

  function handleStartBtn() {
    // обработчик кнопки СТАРТ
    if (startBtnV === 'старт') {
      setIsRunning(true);
      setStartBtnV('пауза');
      setIsStopBtnDisabled(false);
      if (timerState === 'stop') {
        setTimerState('work');
      }
      // обработчик кнопки ПАУЗА
    } else if (startBtnV === 'пауза') {
      setIsRunning(false);
      setStartBtnV('продолжить');
      if (timerState === 'work') {
        setStopBtnV('сделано');
        setIsWorkPause(true);
      }
      // обработчик кнопки ПРОДОЛЖИТЬ
    } else if (startBtnV === 'продолжить') {
      setIsRunning(true);
      setStartBtnV('пауза');
      if (timerState === 'work') {
        setStopBtnV('стоп');
        setIsWorkPause(false);
      }
    }
  }
  return (
    <>
      <Button
        variant='contained'
        color='success'
        sx={btnstyle}
        onClick={handleStartBtn}
        disabled={!tasksStore[0] ? true : false}
      >
        {startBtnV}
      </Button>
    </>
  );
}

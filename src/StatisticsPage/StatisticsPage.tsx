import React, { useCallback, useEffect, useState } from 'react';
import useTaskStore from '../store';
import styles from './statisticspage.module.css';
import { style } from './style';
import './statisticspage.css';
import Box from '@mui/material/Box';
import { InputLabel, MenuItem, FormControl, Typography } from '@mui/material';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LineChart, Line, CartesianAxis, Text } from 'recharts';
import { ReactComponent as TomatoIcon } from '../icons/tomato2.svg';
import { ReactComponent as FocusIcon } from '../icons/focus.svg';
import { ReactComponent as PauseIcon } from '../icons/pause.svg';
import { ReactComponent as StopsIcon } from '../icons/stops.svg';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface IDayStatistic {
  workDate: string;
  weekDay: string;
  fullTime: number;
  workTime: number;
  pauseTime: number;
  stopsNumb: number;
  pomDoneToday: number;
}

export interface IWeekStatisticObj {
  currWeek: IDayStatistic[];
  lastWeek: IDayStatistic[];
  twoWeeksAgo: IDayStatistic[];
}

export function StatisticsPage() {
  const statisticsStore = useTaskStore((state) => state.statistics);
  const setStatistics = useTaskStore((state) => state.setStatistics);
  const [stepWeek, setStepWeek] = useState('0');
  const [weekStat, setWeekStat] = useState([
    {
      weekDay: '',
      workDate: '',
      fullTime: 0,
      workTime: 0,
      pauseTime: 0,
      stopsNumb: 0,
      pomDoneToday: 0,
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  // const [weekDay, setWeekDay] = useState(0);
  const fullWeekDay = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];

  const handleClick = useCallback(
    (entry: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const activeItem = weekStat[activeIndex];

  const handleMenuChange = (event: SelectChangeEvent) => {
    setStepWeek(event.target.value);
  };

  useEffect(() => {
    if (statisticsStore.length > 21) {
      setStatistics(statisticsStore.slice(-21));
    }

    const weekDay = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    let today = new Date().getDay() - 1;
    today = today < 0 ? 6 : today;
    console.log(today);
    setActiveIndex(today);

    let monday = new Date().getDate() - today; /*new Date().getDay() + 1*/
    console.log(new Date().getDate(), new Date().getDay(), monday);

    let weekStatisticArr = new Array(7).fill({
      weekDay: '',
      workDate: '',
      fullTime: 0,
      workTime: 0,
      pauseTime: 0,
      stopsNumb: 0,
      pomDoneToday: 0,
    });

    let weekStatArr = weekStatisticArr.map((dayStat, i) => {
      let dateObj = new Date();
      dateObj.setDate(monday - Number(stepWeek) + i);
      const dateStr = dateObj.toISOString().split('T')[0];
      let dayStatMod: IDayStatistic = statisticsStore.find(
        (item) => item.workDate === dateStr
      ) || {
        ...dayStat,
        workDate: dateStr,
        weekDay: weekDay[i],
      };
      return dayStatMod;
    });
    console.log(weekStatArr);
    setWeekStat(weekStatArr);
  }, [stepWeek]);

  const TimeFormater = (timeSec: number) => {
    const hours = String(Math.floor(timeSec / 3600));
    const minutes = String(Math.floor((timeSec % 3600) / 60));
    if (hours === '0' && minutes !== '0') {
      return minutes + ' мин';
    } else if (hours === '0' && minutes === '0') {
      return '';
    } else {
      return hours + ' ч ' + minutes + ' мин';
    }
  };

  const TimeFormater2 = (timeSec: number) => {
    const hours = String(Math.floor(timeSec / 3600));
    const minutes = String(Math.floor((timeSec % 3600) / 60));
    if (hours === '0' && minutes === '0') {
      return '0 минут';
    } else if (hours === '0' && minutes === '1') {
      return minutes + ' минуты';
    } else if (hours === '0' && minutes !== '0') {
      return minutes + ' минут';
    } else if (hours === '0' && minutes === '0') {
      return '';
    } else if (hours === '1') {
      return hours + ' часа ' + minutes + ' минут';
    } else {
      return hours + ' часов ' + minutes + ' минут';
    }
  };

  const PomodorosFunc = (pomodoros: number) => {
    if ([5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(pomodoros)) {
      return 'помидоров';
    } else if (pomodoros === 1 || String(pomodoros / 10).split('.')[1] === '1') {
      return 'помидор';
    } else if ([2, 3, 4].includes(pomodoros)) {
      return 'помидора';
    } else if (String(pomodoros / 10).split('.')[1] === ('2' || '3' || '4')) {
      return 'помидора';
    } else {
      console.log('else помидоров', pomodoros);
      return 'помидоров';
    }
  };

  return (
    <div className={styles.container}>
      <Box sx={style.box}>
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> */}
        {/* <Typography variant='h4' component='h3'> */}
        <h2>Ваша активность</h2>
        {/* </Typography> */}

        <FormControl
          sx={style.formcontrol}
          // sx={{ minWidth: 200 }}
          // fullWidth
        >
          {/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={stepWeek}
            // label='Age'
            onChange={handleMenuChange}
          >
            <MenuItem value={'0'}>Эта неделя</MenuItem>
            <MenuItem value={'7'}>Прошедшая неделя</MenuItem>
            <MenuItem value={'14'}>2 недели назад</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* <br /> */}
      <div className={styles.statisticsBlockContainer}>
        <div className={styles.dayStatistics}>
          <div className={styles.dayHours}>
            <h3 className={styles.fullWeekDay}>{`${fullWeekDay[activeIndex]}`}</h3>
            <span className={styles.youWork}>Вы работали над задачами в течение </span>
            <span className={styles.workTime}>{TimeFormater2(activeItem.workTime)}</span>
          </div>
          <div className={styles.dayPomodoros}>
            <div className={styles.dayPomodorosTop}>
              <TomatoIcon /> &nbsp;&nbsp;x {activeItem.pomDoneToday}
            </div>
            <div className={styles.dayPomodorosBottom}>
              {activeItem.pomDoneToday} {PomodorosFunc(activeItem.pomDoneToday)}
            </div>
            {/* <p className='content'>{`pomDoneToday: ${activeItem.pomDoneToday}`}</p> */}
          </div>
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width='99%'>
            <BarChart
              // width={952}
              // height={471}
              data={weekStat}
            >
              <CartesianGrid vertical={false} stroke='#ccc' />
              <Bar dataKey='workTime' onClick={handleClick}>
                {weekStat.map((entry, index) => (
                  <Cell
                    cursor='pointer'
                    fill={index === activeIndex ? '#DC3E22' : '#EA8A79'}
                    key={`cell-${index}`}
                  />
                ))}
              </Bar>
              <XAxis
                dataKey='weekDay'
                onClick={(e: any) => {
                  // console.log(e.index);
                  handleClick('', e.index);
                }}
                cursor='pointer'
                tickLine={false}
                axisLine={false}
                tick={(e) => {
                  // console.log(e);
                  // const {
                  //   payload: { value },
                  // } = e;
                  const color = e.payload.index === activeIndex ? '#DC3E22' : '#999';
                  e['fill'] = color;
                  e['fontSize'] = '24px';
                  return <Text {...e}>{e.payload.value}</Text>;
                }}
              />
              <YAxis
                tick={{ color: '#333', fontSize: '12px' }}
                axisLine={false}
                orientation='right'
                tickLine={false}
                tickFormatter={TimeFormater}
                interval='preserveStart'
                width={90}
                tickCount={6}
                // padding={{ top: 10 }}
              />
              {/* <CartesianAxis/> */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={styles.dayStatisticsBottom}>
        <div className={styles.focus + ' ' + styles.focPausStop}>
          <div className={styles.focPausStopTextBlock}>
            <h4>Фокус</h4>
            <p>
              {Math.round(
                (activeItem.workTime / (activeItem.workTime + activeItem.pauseTime)) * 100
              )}
              %
            </p>
          </div>
          <FocusIcon className={styles.statisticIcons} />
        </div>
        <div className={styles.pause + ' ' + styles.focPausStop}>
          <div className={styles.focPausStopTextBlock}>
            <h4>
              Время <span className={styles.noWrapText}>на паузе</span>
            </h4>
            <p>{Math.round(activeItem.pauseTime / 60)}М</p>
          </div>{' '}
          <PauseIcon className={styles.statisticIcons} />
        </div>
        <div className={styles.stops + ' ' + styles.focPausStop}>
          <div className={styles.focPausStopTextBlock}>
            <h4>Остановки</h4>
            <p>{activeItem.stopsNumb}</p>
          </div>
          <StopsIcon className={styles.statisticIcons} />
        </div>
      </div>
      {/* <p className='content'>{`дата "${activeItem.workDate}`}</p>
      <p className='content'>"stepWeek "{stepWeek}</p>
      <p className='content'>{`день недели "${activeItem.weekDay}`}</p>
      <p className='content'>{`fullTime: ${activeItem.fullTime}`}</p>
      <p className='content'>{`workTime: ${activeItem.workTime}`}</p>
      <p className='content'>{`pomDoneToday: ${activeItem.pomDoneToday}`}</p>
      <p className='content'>{`pauseTime: ${activeItem.pauseTime}`}</p>
      <p className='content'>{`stopsNumb: ${activeItem.stopsNumb}`}</p>
      <p className='content'>{`focus "${activeItem.weekDay}": ${Math.round(
        (activeItem.workTime / activeItem.fullTime) * 100
      )}`}</p> */}
    </div>
  );
}

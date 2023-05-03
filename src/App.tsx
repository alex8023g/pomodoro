import React, { useEffect } from 'react';
import './App.css';
import { Header } from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TimerPage } from './TimerPage';
import { StatisticsPage } from './StatisticsPage';
import useTaskStore from './store';
import { useInterval } from './hooks/useInterval';

function App() {
  const statisticsStore = useTaskStore((state) => state.statistics);
  const addWorkDate = useTaskStore((state) => state.addWorkDate);
  const incFullTime = useTaskStore((state) => state.incFullTime);

  useEffect(() => {
    const lastWorkDate = statisticsStore.at(-1)?.workDate;
    if (lastWorkDate !== new Date().toISOString().split('T')[0]) {
      addWorkDate();
    }
  }, []);

  useInterval(
    () => {
      incFullTime();
    },
    true,
    1000
  );

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<TimerPage />} />
            <Route path='/statistics' element={<StatisticsPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;

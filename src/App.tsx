import React, { useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TimerPage } from './pages/TimerPage';
import { StatisticsPage } from './pages/StatisticsPage';
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
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<TimerPage />} />
            <Route path='/statistics' element={<StatisticsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

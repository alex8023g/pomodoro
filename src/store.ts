import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { IDayStatistic } from './pages/StatisticsPage';
import { ITask } from './components/TaskBlock';

export interface IStoreTask {
  statistics: IDayStatistic[];
  tasks: ITask[];
  editTaskText: (task: ITask, text: string) => void; // редактирование текста задачи
  addTask: (task: ITask) => void; // добавление задачи
  removeTask: (task: ITask) => void; // удаление задачи
  increasePomodoroTotal: (task: ITask) => void; // увеличение помидоров задачи
  decreasePomodoroTotal: (task: ITask) => void; // уменьшение помидоров задачи
  increasePomodoroDone: (task: ITask) => void; // увеличение выполненных помидоров задачи
  updateTasks: (taskS: ITask[]) => void; // обновление массива задач
  addWorkDate: () => void; // присвоение даты когда была работа над задачей
  incFullTime: () => void; // увеличение полного времени работы над задачей
  incWorkTime: () => void; // увеличение времени непосредственного выполнения задачи
  incPauseTime: () => void; // увеличение времени на паузе
  incStopsNumb: () => void; // увеличение количества остановок
  incPomDoneToday: () => void; // увеличение выполненных помидоров в текущий день
  setStatistics: (newStatistics: IDayStatistic[]) => void; // сохраняет статистику за последние две недели
}

const weekDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const useTaskStore = create<IStoreTask>()(
  // обертка devtools для возмжности использования redux devTools
  devtools(
    // обертка persist для сохранения стейта в Local Storage браузера
    persist(
      (set) => ({
        statistics: [],
        tasks: [],
        // сохраняет статистику за последние две недели
        setStatistics: (newStatistics: IDayStatistic[]) =>
          set(() => ({
            statistics: newStatistics,
          })),
        // увеличение полного времени работы над задачей
        incFullTime: () =>
          set((state) => ({
            statistics: state.statistics.map((item, index) =>
              index === state.statistics.length - 1
                ? { ...item, fullTime: (item.fullTime += 1) }
                : item
            ),
          })),
        // увеличение количества остановок
        incStopsNumb: () =>
          set((state) => ({
            statistics: state.statistics.map((item, index) =>
              index === state.statistics.length - 1
                ? { ...item, stopsNumb: (item.stopsNumb += 1) }
                : item
            ),
          })),
        // увеличение времени непосредственного выполнения задачи
        incWorkTime: () =>
          set((state) => ({
            statistics: state.statistics.map((item, index) =>
              index === state.statistics.length - 1
                ? { ...item, workTime: (item.workTime += 1) }
                : item
            ),
          })),
        // увеличение времени на паузе
        incPauseTime: () =>
          set((state) => ({
            statistics: state.statistics.map((item, index) =>
              index === state.statistics.length - 1
                ? { ...item, pauseTime: (item.pauseTime += 1) }
                : item
            ),
          })),
        // редактирование текста задачи
        editTaskText: (task, text) =>
          set((state) => ({
            tasks: state.tasks.map((item) =>
              item.id === task.id ? { ...item, taskText: text } : item
            ),
          })),
        // обавление задачи
        addTask: (task) =>
          set((state) => ({
            tasks: [...state.tasks, task],
          })),
        // обновление массива задач
        updateTasks: (taskS) =>
          set((state) => ({
            tasks: taskS,
          })),
        // удаление задачи
        removeTask: (task) =>
          set((state) => ({
            tasks: state.tasks.filter((item) => item.id !== task.id),
          })),
        // увеличение помидоров задачи
        increasePomodoroTotal: (task) =>
          set((state) => ({
            tasks: state.tasks.map((item) =>
              item.id === task.id
                ? { ...item, pomodoroTotal: (task.pomodoroTotal += 1) }
                : item
            ),
          })),
        // увеличение выполненных помидоров задачи
        increasePomodoroDone: (task) =>
          set((state) => ({
            tasks: state.tasks.map((item) =>
              item.id === task.id
                ? { ...item, pomodoroDone: (task.pomodoroDone += 1) }
                : item
            ),
          })),
        // уменьшение помидоров задачи
        decreasePomodoroTotal: (task) =>
          set((state) => ({
            tasks: state.tasks.map((item) =>
              item.id === task.id
                ? { ...item, pomodoroTotal: (task.pomodoroTotal -= 1) }
                : item
            ),
          })),
        // увеличение выполненных помидоров в текущий день
        incPomDoneToday: () =>
          set((state) => ({
            statistics: state.statistics.map((item, index) =>
              index === state.statistics.length - 1
                ? { ...item, pomDoneToday: (item.pomDoneToday += 1) }
                : item
            ),
          })),
        // присвоение даты когда была работа над задачей
        addWorkDate: () =>
          set((state) => ({
            statistics: [
              ...state.statistics,
              {
                workDate: new Date().toISOString().split('T')[0],
                weekDay: weekDay[new Date().getDay()],
                fullTime: 0,
                workTime: 0,
                pauseTime: 0,
                stopsNumb: 0,
                pomDoneToday: 0,
              },
            ],
          })),
      }),
      {
        name: 'pomodoro-storage',
      }
    )
  )
);

export default useTaskStore;

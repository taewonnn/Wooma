import { create } from 'zustand';

interface ICalendarStore {
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
}

const useCalendarStore = create<ICalendarStore>(set => ({
  selectedDate: null,
  setSelectedDate: (date: string) => set({ selectedDate: date }),
}));

export default useCalendarStore;

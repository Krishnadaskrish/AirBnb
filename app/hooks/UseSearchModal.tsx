import { create } from 'zustand';

interface SearchModalStore {
  isopen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModalModel = create<SearchModalStore>((set) => ({
  isopen: false,
  onOpen: () => set({ isopen: true }),
  onClose: () => set({ isopen: false }),
}));

export default useSearchModalModel;

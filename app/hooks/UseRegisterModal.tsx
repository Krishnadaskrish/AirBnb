import { create } from 'zustand';

interface RegisterModalStore {
  isopen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModel = create<RegisterModalStore>((set) => ({
  isopen: false,
  onOpen: () => set({ isopen: true }),
  onClose: () => set({ isopen: false }),
}));

export default useRegisterModel;

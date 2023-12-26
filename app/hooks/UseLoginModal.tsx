import { create } from 'zustand';

interface LoginModalStore {
  isopen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModel = create<LoginModalStore>((set) => ({
  isopen: false,
  onOpen: () => set({ isopen: true }),
  onClose: () => set({ isopen: false }),
}));

export default useLoginModel;

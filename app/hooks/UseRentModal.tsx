import { create } from 'zustand';

interface RentModalStore {
  isopen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentModel = create<RentModalStore>((set) => ({
  isopen: false,
  onOpen: () => set({ isopen: true }),
  onClose: () => set({ isopen: false }),
}));

export default useRentModel;

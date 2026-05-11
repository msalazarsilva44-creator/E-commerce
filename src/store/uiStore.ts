import { create } from 'zustand'

interface UIState {
  isDrawerOpen: boolean
  isModalOpen: boolean
  toastMessage: string | null
  toastType: 'success' | 'error' | 'info'
  toggleDrawer: () => void
  openDrawer: () => void
  closeDrawer: () => void
  openModal: () => void
  closeModal: () => void
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
  hideToast: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isDrawerOpen: false,
  isModalOpen: false,
  toastMessage: null,
  toastType: 'success',

  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  showToast: (message, type = 'success') => set({ toastMessage: message, toastType: type }),
  hideToast: () => set({ toastMessage: null }),
}))

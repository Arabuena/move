import { create } from 'zustand';

export const useRideState = create((set) => ({
  step: 'initial', // initial, searching, selecting-car, waiting-driver, in-ride, finished
  origin: null,
  destination: null,
  selectedCar: null,
  driver: null,
  price: null,
  
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setSelectedCar: (car) => set({ selectedCar: car }),
  setStep: (step) => set({ step }),
  
  resetRide: () => set({
    step: 'initial',
    origin: null,
    destination: null,
    selectedCar: null,
    driver: null,
    price: null
  })
})); 
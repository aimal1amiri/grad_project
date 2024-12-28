import {create} from 'zustand'

export const useMovieTvContentStore = create((set) => ({
    contentType:"movie",
    setContentType: (type) => set({contentType:type}),

}))
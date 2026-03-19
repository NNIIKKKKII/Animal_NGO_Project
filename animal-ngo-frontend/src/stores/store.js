import { create } from "zustand";
import createAuthSlice from "./authSlice";


const useStore = create((set, get) => ({
    ...createAuthSlice(set, get),

}))

export default useStore;
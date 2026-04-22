import {
    login as loginService,
    register as registerService,
} from "../api/authService.js";
import { loginNgo as loginNgoService } from "../api/ngoService.js";

const USER_STORAGE_KEY = "user";
const USER_TOKEN_STORAGE_KEY = "token";
const NGO_STORAGE_KEY = "ngo";
const NGO_TOKEN_STORAGE_KEY = "ngo_token";

const parseStoredJson = (key) => {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) return null;

    try {
        return JSON.parse(rawValue);
    } catch {
        localStorage.removeItem(key);
        return null;
    }
};

const getStoredUser = () => parseStoredJson(USER_STORAGE_KEY);
const getStoredNgo = () => parseStoredJson(NGO_STORAGE_KEY);

const createAuthSlice = ((set, get) => ({
    isAuthenticated: !!getStoredUser(),
    token: localStorage.getItem(USER_TOKEN_STORAGE_KEY) || null,
    user: getStoredUser(),
    isNgoAuthenticated: !!getStoredNgo(),
    ngoToken: localStorage.getItem(NGO_TOKEN_STORAGE_KEY) || null,
    ngo: getStoredNgo(),
    isLoading: false,

    getActiveSession: () => {
        const state = get();

        if (state.isNgoAuthenticated && state.ngo) return "ngo";
        if (state.isAuthenticated && state.user) return "user";
        return null;
    },

    getDefaultRoute: () => {
        const state = get();

        if (state.isNgoAuthenticated && state.ngo) return "/ngo/dashboard";

        switch (state.user?.role) {
            case "admin":
                return "/admin";
            case "volunteer":
                return "/dashboard";
            case "donor":
                return "/dashboard";
            default:
                return "/dashboard";
        }
    },

    clearUserSession: () => {
        set({
            token: null,
            user: null,
            isAuthenticated: false,
        });
        localStorage.removeItem(USER_TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
    },

    clearNgoSession: () => {
        set({
            ngoToken: null,
            ngo: null,
            isNgoAuthenticated: false,
        });
        localStorage.removeItem(NGO_TOKEN_STORAGE_KEY);
        localStorage.removeItem(NGO_STORAGE_KEY);
    },

    login: async (email, password) => {
        set({ isLoading: true });

        try {
            const data = await loginService(email, password);
            get().clearNgoSession();
            set({
                user: data.user,
                token: data.token,
                isLoading: false,
                isAuthenticated: true,
            });

            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
            localStorage.setItem(USER_TOKEN_STORAGE_KEY, data.token);
        } catch (err) {
            set({ isLoading: false });
            console.log("Error from zustand authSlice.js ", err);
            throw err.response?.data?.message || "Error from zustand authSlice.js";
        }
    },

    register: async (userData) => {
        set({ isLoading: true });

        try {
            const data = await registerService(userData);
            get().clearNgoSession();
            set({
                user: data.user,
                token: data.token,
                isAuthenticated: true,
                isLoading: false,
            });
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
            localStorage.setItem(USER_TOKEN_STORAGE_KEY, data.token);
        } catch (err) {
            set({ isLoading: false });
            console.log("Err from authSlice register ", err);
            throw err.response?.data?.message || "err from authslice register";
        }
    },

    loginNgo: async (credentials) => {
        set({ isLoading: true });

        try {
            const data = await loginNgoService(credentials);
            get().clearUserSession();
            set({
                ngo: data.ngo,
                ngoToken: data.token,
                isNgoAuthenticated: true,
                isLoading: false,
            });
            localStorage.setItem(NGO_STORAGE_KEY, JSON.stringify(data.ngo));
            localStorage.setItem(NGO_TOKEN_STORAGE_KEY, data.token);
        } catch (err) {
            set({ isLoading: false });
            console.log("Err from authSlice NGO login ", err);
            throw err.response?.data?.message || "NGO login failed";
        }
    },

    logout: () => {
        get().clearUserSession();
    },

    logoutNgo: () => {
        get().clearNgoSession();
    },

    logoutActiveSession: () => {
        const activeSession = get().getActiveSession();

        if (activeSession === "ngo") {
            get().clearNgoSession();
            return;
        }

        get().clearUserSession();
    },

    updateUserContext: (updateUser) => {
        set({ user: updateUser });
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updateUser));
    },
}));

export default createAuthSlice;

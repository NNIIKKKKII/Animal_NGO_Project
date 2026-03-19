import {
    login as loginService,
    register as registerService,
}
    from "../api/authService.js"






const createAuthSlice = ((set, get) => ({
    isAuthenticated: !!JSON.parse(localStorage.getItem("user")),

    token: localStorage.getItem("token") || null,

    user: JSON.parse(localStorage.getItem("user")) || null, //!! means convert result into boolean

    isLoading: false,




    login: async (email, password) => {
        set({ isLoading: true });

        try {
            const data = await loginService(email, password);
            set({
                user: data.user,
                token: data.token,
                isLoading: false,
                isAuthenticated: true
            })



            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token)
        } catch (err) {
            set({ isLoading: false })
            console.log("Error from zustand authSlice.js ", err);
            throw err.response?.data?.message || "Error from zustand authSlice.js"
        }


    },



    register: async (userData) => {
        set({ isLoading: true });

        try {
            const data = await registerService(userData);
            set({
                user: data.user,
                token: data.token,
                isAuthenticated: true,
                isLoading: false
            })
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token)




        } catch (err) {
            set({ isLoading: false });
            console.log("Err from authSlice register ", err);
            throw err.response?.data?.message || "err from authslice register"
        }
    },


    logout: () => {
        set({
            token: null,
            user: null,
            isAuthenticated: false
        })
        localStorage.removeItem("token");
        localStorage.removeItem("user")
    },

    updateUserContext: (updateUser) => {
        set({ user: updateUser });
        localStorage.setItem("user", JSON.stringify(updateUser))
    }

}))

export default createAuthSlice;
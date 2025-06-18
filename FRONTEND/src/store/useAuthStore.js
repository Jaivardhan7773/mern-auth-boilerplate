import { create } from 'zustand';
import toast from "react-hot-toast";
import { axiosInstance } from '../utils/axios.js';




export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,


    isChechingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/authentication/check");
            set({ authUser: res.data })
        } catch (error) {
            console.error("Error checking authentication:", error);
            set({ authUser: null })
        } finally {
            set({ isChechingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/authentication/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIng: true });
        try {
            const res = await axiosInstance.post("/authentication/login", data);
            set({ authUser: res.data });
            toast.success("login successfull");

        } catch (error) {
toast.error(error.response.data.message);
        }finally{
            set({ isLoggingIng: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/authentication/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
       set({isUpdatingProfile: true}); 
       try {
            const res = await axiosInstance.put("/authentication/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        
       } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response.data.message || "Failed to update profile");
       } finally {
            set({isUpdatingProfile: false});
        }
    }



}));
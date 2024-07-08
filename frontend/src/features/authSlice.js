import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    isUser : false,
    userToken:localStorage.getItem('jwtToken') || null,
    isAdmin : false,
    adminToken:localStorage.getItem('jwtToken') || null,

}


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUserLogin: (state , action) => {
            state.isUser = true;
            state.userToken = action.payload;
            localStorage.setItem('jwtToken', action.payload);
        },
        setUserLogout: (state , action) => {
            state.isUser = false;
            state.userToken = null;
            localStorage.removeItem('jwtToken');
        },
        setAdminLogin: (state , action) => {
            state.isAdmin = true;
            state.adminToken = action.payload;
        },
        setAdminLogout: (state , action) => {
            state.isAdmin = false;
            state.adminToken = null;
        }
    }
})

export const {setUserLogin ,setUserLogout , setAdminLogin , setAdminLogout} = authSlice.actions;
export default authSlice.reducer;

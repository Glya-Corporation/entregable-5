import { createSlice } from '@reduxjs/toolkit';

export const userNameSlice = createSlice({
		name: 'userName',
    initialState: '',
    reducers: {
        savedName: ( state, action ) => {
            return action.payload
        }
    }
})

export const { savedName } = userNameSlice.actions;

export default userNameSlice.reducer;

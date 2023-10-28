import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    loading: false,
    error: null,
    searchData: []
}

// create action
export const createUser = createAsyncThunk('createUser', async (data, { rejectWithValue }) => {
    const response = await fetch("https://653ca8d7d5d6790f5ec8253b.mockapi.io/CRUD",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(data)
        })

    try {
        const result = await response.json()
        return result
    }
    catch (error) {
        return rejectWithValue(error);
    }
})


//read action
export const showUser = createAsyncThunk('showUser', async (args, { rejectWithValue }) => {
    const response = await fetch("https://653ca8d7d5d6790f5ec8253b.mockapi.io/CRUD")
    try {
        const result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

// delete action
export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
    const response = await fetch(`https://653ca8d7d5d6790f5ec8253b.mockapi.io/CRUD/${id}`, { method: "DELETE" })
    try {
        const result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateUser = createAsyncThunk('updateUser', async (data, { rejectWithValue }) => {

    const response = await fetch(`https://653ca8d7d5d6790f5ec8253b.mockapi.io/CRUD/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(data)
    })
    try {
        const result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const userDetailsSlice = createSlice({
    name: "userDetail",
    initialState,
    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload
        }
    },
    extraReducers: {
        [createUser.pending]: (state) => {
            state.loading = true
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users.push(action.payload)
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false
            state.users = action.payload
        },

        [showUser.pending]: (state) => {
            state.loading = true
        },
        [showUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload
        },
        [showUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
            //delete logic

            const { id } = action.payload
            if (id) {
                state.users = state.users.filter((ele) => ele.id !== id)
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        [updateUser.pending]: (state,) => {
            state.loading = true
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users = state.users.map((ele) => (
                ele.id === action.payload.id ? action.payload : ele
            ))
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})


export const { searchUser } = userDetailsSlice.actions
export default userDetailsSlice.reducer
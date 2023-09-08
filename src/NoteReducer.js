import { createSlice } from "@reduxjs/toolkit";
import { noteList } from "./Data";
const noteSlice = createSlice({
    name:"notes",
    initialState:noteList,
    reducers:{
   addNote:(state,action) => {
    return [action.payload, ...state];
   },
   updateNote:(state,action) =>{
    const {id,title,body} = action.payload;
    const un = state.find(note => note.id == id)
    if(un){
        un.title= title;
        un.body= body;
    }
   },
   deleteNote:(state,action) =>{
    const {id} = action.payload;
    const un = state.find(note => note.id == id)
    if(un){
        return state.filter(f => f.id !== id);
    }
   }
    }
})
export const {addNote,updateNote,deleteNote} = noteSlice.actions
export default noteSlice.reducer;
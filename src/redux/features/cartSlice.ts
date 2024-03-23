import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interfaces";

type CartState = {
    cartItems: ReservationItem[]
}

const initialState : CartState = {cartItems: []}

export const cartSlice = createSlice ({
    name:'cart',
    initialState,
    reducers:{
        addReservation: (state, action:PayloadAction<ReservationItem>)=>{
            state.cartItems.push(action.payload)
        },
        removeReservation:(state,action:PayloadAction<ReservationItem>)=>{
            const remainItems = state.cartItems.filter(obj =>{
                return ( (obj.carModel !== action.payload.carModel) ||  (obj.pickupDate !== action.payload.pickupDate)
                || (obj.returnDate !== action.payload.returnDate))
            })
            state.cartItems = remainItems
        }
    }

})

export const {addReservation,removeReservation} = cartSlice.actions
export default cartSlice.reducer

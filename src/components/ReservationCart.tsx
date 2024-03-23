'use client'
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeReservation } from "@/redux/features/cartSlice";

export default function ReservationCart(){

    const carItems = useAppSelector( (state)=> state.cartSlice.cartItems )
    const dispatch = useDispatch<AppDispatch>()
    
    return (
        <>
        {
            carItems.map((reservationItem)=>(
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={reservationItem.carId}>
                    <div className="text-xl text-black">{reservationItem.carModel}</div>
                    <div className="text-xl">Pick-up {reservationItem.pickupDate} from {reservationItem.pickupLocation}</div>
                    <div className="text-xl">Return {reservationItem.returnDate} to {reservationItem.returnLocation}</div>
                    <div className="text-xl">Duration: {reservationItem.numOfDays}</div>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-3 text-white shadow-sm"
                        onClick={()=>dispatch(removeReservation(reservationItem))}>
                        Remove from Cart
                    </button>
                </div>
            )

            )
        }
        </>
    );
}
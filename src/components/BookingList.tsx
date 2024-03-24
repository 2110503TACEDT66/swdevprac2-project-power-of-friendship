'use client'
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";

export default function ReservationCart() {

    const bookItems = useAppSelector((state)=> state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()

    if (bookItems.length == 0) return (
        <div className="p-10 flex flex-row justify-center">
            <div>
                No Interview Booking
            </div>
        </div>
    )
    
    return (
        <>
            {
                bookItems.map((bookingItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookingItem.id}>
                        <div className="text-xl text-black">{bookingItem.name}</div>
                        <div className="text-sm">Tel : {bookingItem.tel}</div>
                        <div className="text-sm">Email : {bookingItem.email}</div>
                        <div className="text-sm">Company : {bookingItem.company}</div>
                        <div className="text-md">Interview Date : {bookingItem.bookDate}</div>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-3 text-white shadow-sm" onClick={() => dispatch(removeBooking(bookingItem.id))}>
                            Remove Booking
                        </button>
                    </div>
                ))
            }
        </>
    );
}
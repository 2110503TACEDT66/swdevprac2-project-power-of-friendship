import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addBooking } from "@/redux/features/bookSlice";
import { removeBooking } from "@/redux/features/bookSlice";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { format } from 'date-fns'

export default async function BookingList() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    // const bookItems = useAppSelector((state)=> state.bookSlice.bookItems)
    // const dispatch = useDispatch<AppDispatch>()

    const appointments = await fetch("http://localhost:5000/api/v1/appointments", {
        method: "GET",
        headers:{
            authorization: `Bearer ${session.user.token}`,
        }
    })
    const appointmentsJsonReady = await appointments.json()
    // {
    //     appointmentsJsonReady.data.map((appointmentItem:BookingItem) => (
    //             // item = {
    //             //     name: session.user.name,
    //             //     tel: session.user.tel,
    //             //     id: appointmentItem._id,
    //             //     company: appointmentItem.company,
    //             //     bookDate: appointmentItem.appDate
    //             // }
    //             dispatch(addBooking(appointmentItem))
    //         // const item:ReservationItem = {
    //         //     carId: cid,
    //         //     carModel: model,
    //         //     numOfDays: returnDate.diff(pickupDate,'day'),
    //         //     pickupDate: dayjs(pickupDate).format("YYYY/MM/DD"),
    //         //     pickupLocation: pickupLocation,
    //         //     returnDate: dayjs(returnDate).format("YYYY/MM/DD"),
    //         //     returnLocation: returnLocation
    //         // }
    //     ))
    // }

    const deleteApppointment = async (id:string) => {
        'use server'
        try {
            const appointment = await fetch(`http://localhost:5000/api/v1/appointments/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${session.user.token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    if (appointmentsJsonReady.count == 0) return (
        <div className="p-10 flex flex-row justify-center">
            <div>
                No Interview Booking
            </div>
        </div>
    )
    
    return (
        <>
            {
                appointmentsJsonReady.data.map((appointmentItem:AppointmentItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={appointmentItem._id}>
                        <div className="text-xl text-black">{session.user.name}</div>
                        <div className="text-sm">Company : {appointmentItem.company.name}</div>
                        <div className="text-sm">AppDate : {format(appointmentItem.appDate, 'yyyy-MM-dd HH:mm:ss')}</div>
                        <form action={deleteApppointment(appointmentItem._id)}>
                            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-3 text-white shadow-sm">
                                Remove Booking
                            </button>
                        </form>
                    </div>
                ))
            }
        </>
    );
}
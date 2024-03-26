import BookingList from "@/components/BookingList";

export default function CartPage() {
    return (
        <main>
            <div className="p-5 flex flex-row justify-center">
                <div className="text-xl font-medium px-5 py-2 rounded-xl bg-white w-fit font-serif">My Booking</div>
            </div>
            <BookingList/>
        </main>
    );
}
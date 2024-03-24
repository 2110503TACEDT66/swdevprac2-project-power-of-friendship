interface ReservationItem{
    carId: string
    carModel: string
    numOfDays: number
    pickupDate: string
    pickupLocation: string
    returnDate: string
    returnLocation: string
}

interface BookingItem {
    name: string;
    tel: string;
    id: string;
    email: string;
    company: string;
    bookDate: string;
  }

interface SectionItem {
    company:string
    user: string
    date: Date
    status: string
    description: string
}
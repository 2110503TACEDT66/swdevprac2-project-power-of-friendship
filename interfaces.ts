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
    _id: string
    company: string
    user: string
    appDate: Date
    createAt: Date
  }

interface SectionItem {
    _id: string
    company: string
    user: string
    date: Date
    status: string
    description: string
}

interface AppointmentItem {
    _id: string
    company: string
    user: string
    appDate: Date
    createAt: Date
}
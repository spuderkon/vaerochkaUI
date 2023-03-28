export class Ticket {
    routeId: number | null;
    bookingCode: string | null;
    departureCity: string | null;
    arrivalCity: string | null;
    departureAirportCode: string | null;
    arrivalAirportCode: string | null;
    startTime: Date | null;
    endTime: Date | null;
    timeInFly: string | null;
    routeCode: string | null;
    aircraftModel: string | null;
    airline: string | null;
    boardingGate: string | null;
    tariffName: string | null;
    registered: boolean | null;
    clientName: string | null;
    clientSurname: string | null;
    clientLastame: string | null;
    seat: string | null;
    luggage: boolean | null;
    meal: boolean | null;

    constructor() {
        this.routeId = null;
        this.bookingCode = null;
        this.departureCity = null;
        this.arrivalCity = null;
        this.departureAirportCode = null;
        this.arrivalAirportCode = null;
        this.startTime = null;
        this.endTime = null;
        this.timeInFly = null;
        this.routeCode = null;
        this.aircraftModel = null;
        this.airline = null;
        this.boardingGate = null;
        this.tariffName = null;
        this.registered = null;
        this.clientName = null;
        this.clientSurname = null;
        this.clientLastame = null;
        this.seat = null;
        this.luggage = null;
        this.meal = null;
    }
}

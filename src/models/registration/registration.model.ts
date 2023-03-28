export class Registration {
    id: number | null;
    route_id: number | null;
    code: string | null;
    client_id: number | null;
    contact_id: number | null;
    tariff_id: number | null;
    seat: string | null;
    price: number | null;
    registered: boolean;

    constructor() {
        this.id = null
        this.route_id = null;
        this.code = null;
        this.client_id = null;
        this.contact_id = null;
        this.tariff_id = null;
        this.seat = null;
        this.price = null;
        this.registered = false;
    }
}

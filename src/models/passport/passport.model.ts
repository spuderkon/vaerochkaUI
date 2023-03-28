import { tick } from "@angular/core/testing";

export class Passport {
    id: number | null;
    birthdate: string | null;
    citizenship_id: number | null;
    number: string | null;
    country_of_issue_id: number | null;
    validity_period: string | null;

    constructor() {
        this.id = null;
        this.birthdate = null;
        this.citizenship_id = null;
        this.number = null;
        this.country_of_issue_id = null;
        this.validity_period = null;
    }
}

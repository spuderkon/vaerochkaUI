import { Target } from "@angular/compiler";
import { Routeinf } from "../routeinf/routeinf.model";
import { Tariff } from "../tariff/tariff.model";

export class RouteInformation {
    route: Routeinf;
    tariff: Tariff;
    busySeats: string[];
}

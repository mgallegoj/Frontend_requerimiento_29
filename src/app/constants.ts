import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class Constants {

    public readonly API_URL: string = "http://localhost:8080/api.dian-descuento/v1";

}
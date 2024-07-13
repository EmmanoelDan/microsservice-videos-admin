// uuid object of value

import { ValueObject } from "../value-objects";
import {v4 as uuidv4, validate as uuidValidade} from "uuid"

export class Uuid extends ValueObject {
    readonly id: string;
    constructor(id?: string) {
        super();
        this.id = id || uuidv4();
        this.validate();
    }

    private validate(){
        const isValide = uuidValidade(this.id);
        if(!isValide){
            throw new InvalidUuidError();
        }
    }
}

export class InvalidUuidError extends Error {
    constructor(message?: string) {
        super(message || "ID mus be a valid UUID");
        this.name = "InvalidUuidError";
    }
}
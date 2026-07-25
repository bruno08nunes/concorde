import ConcordeError from "./error";

export class Unauthorized extends ConcordeError {
    constructor() {
        super("Token inválido, expirado ou não informado.", 401)
    }
}
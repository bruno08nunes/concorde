import ConcordeError from "./error";

export class InvalidFileFormatError extends ConcordeError {
    constructor() {
        super("Arquivo de formato inválido!", 400);
    }
}
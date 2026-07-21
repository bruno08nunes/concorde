export default class ConcordeError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);

        this.status = status;
    }
}

export class InvalidCredentialsError extends ConcordeError {
    constructor() {
        super("Credenciais inválidas!", 401);
    }
}

export class UserAlreadyExistsError extends ConcordeError {
    constructor(type: "email" | "nome de usuário") {
        super(`Usuário com esse ${type} já existe.`, 409)
    }
}
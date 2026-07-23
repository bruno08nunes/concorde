export default class ConcordeError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);

        this.status = status;
    }
}

export class InvalidRequest extends ConcordeError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class NotFound extends ConcordeError {
    constructor(message: string) {
        super(message, 404)
    }
}

export class InvalidCredentialsError extends ConcordeError {
    constructor() {
        super("Credenciais inválidas!", 401);
    }
}

export class UserAlreadyExistsError extends ConcordeError {
    constructor(type: "email" | "nome de usuário") {
        super(`Usuário com esse ${type} já existe.`, 409);
    }
}

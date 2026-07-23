import ConcordeError from "./error";

export class FriendshipAlreadyExists extends ConcordeError {
    constructor() {
        super("Vocês já são amigos.", 409);
    }
}

export class FriendshipRequestAlreadyExists extends ConcordeError {
    constructor() {
        super("Já existe uma solicitação de amizade pendente.", 409);
    }
}

export class FriendshipRequestBlocked extends ConcordeError {
    constructor() {
        super("Aguarde antes de enviar uma nova solicitação para este usuário.", 429);
    }
}
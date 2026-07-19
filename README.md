# Concorde

Concorde é uma aplicação de comunicação em tempo real inspirada no Discord, permitindo conversas privadas e em grupo por meio de mensagens, chamadas de voz, vídeo e compartilhamento de tela.

---

# Requisitos

## Requisitos Funcionais

### Autenticação

- RF01 - O usuário pode criar uma conta informando nome de usuário, e-mail e senha.
- RF02 - O usuário pode realizar login utilizando e-mail e senha.
- RF03 - O usuário pode editar seu perfil (nome de usuário, e-mail, senha e foto de perfil).
- RF04 - O usuário pode excluir sua conta.

### Amizades

- RF05 - O usuário pode enviar solicitações de amizade utilizando o nome de usuário.
- RF06 - O usuário pode aceitar solicitações de amizade.
- RF07 - O usuário pode remover um amigo.

### Conversas

- RF08 - O usuário pode trocar mensagens privadas em tempo real com amigos.
- RF09 - As mensagens ficam armazenadas no histórico da conversa.
- RF10 - As mensagens podem conter texto, arquivos ou ambos.
- RF11 - O usuário pode enviar mensagens de áudio.

### Grupos

- RF12 - O usuário pode criar grupos.
- RF13 - O usuário administrador pode alterar o nome e a foto do grupo.
- RF14 - O usuário administrador pode adicionar participantes ao grupo.
- RF15 - O usuário administrador pode remover participantes do grupo.
- RF16 - O usuário administrador pode excluir o grupo.

### Chamadas

- RF17 - O usuário pode iniciar chamadas de voz em conversas privadas e grupos.
- RF18 - O usuário pode iniciar chamadas de vídeo em conversas privadas e grupos.
- RF19 - O usuário pode compartilhar sua tela durante chamadas.

---

## Requisitos Não Funcionais

### Segurança

- RNF01 - As senhas devem ser armazenadas utilizando criptografia.
- RNF02 - A autenticação deve ser realizada através de tokens JWT.
- RNF03 - Apenas usuários autenticados podem acessar recursos protegidos.

### Desempenho

- RNF04 - As mensagens devem ser entregues em tempo real.

### Escalabilidade

- RNF05 - A arquitetura deve permitir crescimento da aplicação sem grandes alterações estruturais.

### Usabilidade

- RNF06 - A interface deve ser responsiva.
- RNF07 - A interface deve apresentar navegação intuitiva.

### Manutenibilidade

- RNF08 - O projeto deve seguir uma arquitetura em camadas para facilitar manutenção e testes.

---

# Casos de Uso

## Autenticação

### UC01 - Criar Conta

**Ator:** Visitante

**Fluxo Principal**

1. Informa nome de usuário, e-mail e senha.
2. O sistema valida os dados.
3. O sistema cria a conta.
4. O usuário passa a poder realizar login.

---

### UC02 - Fazer Login

**Ator:** Usuário

**Fluxo Principal**

1. Informa e-mail e senha.
2. O sistema valida as credenciais.
3. O sistema autentica o usuário.
4. O usuário acessa a aplicação.

---

### UC03 - Editar Perfil

**Ator:** Usuário

**Fluxo Principal**

1. Acessa as configurações.
2. Atualiza os dados desejados.
3. O sistema salva as alterações.

---

### UC04 - Excluir Conta

**Ator:** Usuário

**Fluxo Principal**

1. Solicita a exclusão.
2. O sistema desativa a conta.
3. Após o período de inatividade, a conta é removida permanentemente.

---

## Amizades

### UC05 - Enviar Solicitação de Amizade

**Ator:** Usuário

**Fluxo Principal**

1. Pesquisa outro usuário.
2. Envia uma solicitação.
3. O sistema registra a solicitação.

---

### UC06 - Aceitar Solicitação

**Ator:** Usuário

**Fluxo Principal**

1. Visualiza solicitações pendentes.
2. Aceita uma solicitação.
3. Os usuários tornam-se amigos.

---

### UC07 - Remover Amizade

**Ator:** Usuário

**Fluxo Principal**

1. Seleciona um amigo.
2. Remove a amizade.
3. O sistema encerra a relação entre ambos.

---

## Conversas

### UC08 - Enviar Mensagem

**Ator:** Usuário

**Fluxo Principal**

1. Abre uma conversa.
2. Digita uma mensagem.
3. Envia.
4. O destinatário recebe em tempo real.

---

### UC09 - Enviar Arquivo

**Ator:** Usuário

**Fluxo Principal**

1. Seleciona um arquivo.
2. O sistema realiza o upload.
3. O arquivo é enviado na conversa.

---

### UC10 - Enviar Áudio

**Ator:** Usuário

**Fluxo Principal**

1. Grava um áudio.
2. Envia.
3. O destinatário recebe a gravação.

---

## Grupos

### UC11 - Criar Grupo

**Ator:** Usuário

**Fluxo Principal**

1. Informa o nome do grupo.
2. Seleciona participantes.
3. O sistema cria o grupo.

---

### UC12 - Gerenciar Grupo

**Ator:** Administrador do grupo

**Fluxo Principal**

1. Acessa as configurações.
2. Altera nome, foto ou participantes.
3. O sistema salva as alterações.

---

### UC13 - Excluir Grupo

**Ator:** Administrador

**Fluxo Principal**

1. Solicita a exclusão.
2. O sistema remove o grupo.

---

## Chamadas

### UC14 - Iniciar Chamada de Voz

**Ator:** Usuário

**Fluxo Principal**

1. Inicia uma chamada.
2. Os participantes podem entrar.
3. A comunicação ocorre em tempo real.

---

### UC15 - Iniciar Chamada de Vídeo

Mesmo fluxo da chamada de voz, utilizando vídeo.

---

### UC16 - Compartilhar Tela

**Ator:** Usuário

**Fluxo Principal**

1. Durante a chamada seleciona "Compartilhar Tela".
2. Escolhe a janela ou monitor.
3. O sistema transmite a tela para os participantes.

---

# Regras de Negócio

## Usuários

- RN01 - O nome de usuário deve ser único.
- RN02 - O e-mail deve ser único.
- RN03 - A senha deve possuir no mínimo oito caracteres.
- RN04 - Apenas usuários autenticados podem utilizar a aplicação.
- RN05 - Contas desativadas não podem realizar login.

---

## Amizades

- RN06 - Um usuário não pode adicionar a si próprio.
- RN07 - Não é permitido enviar solicitação para um usuário que já é amigo.
- RN08 - Não é permitido possuir duas solicitações pendentes entre os mesmos usuários.

---

## Conversas

- RN09 - Apenas participantes da conversa podem visualizar suas mensagens.
- RN10 - Toda mensagem pertence a uma conversa.
- RN11 - Uma mensagem pode conter texto, arquivo ou ambos.
- RN12 - Arquivos enviados devem possuir um formato permitido.

---

## Grupos

- RN13 - Todo grupo deve possuir pelo menos um administrador.
- RN14 - O criador do grupo torna-se administrador automaticamente.
- RN15 - Apenas administradores podem alterar informações do grupo.
- RN16 - Apenas administradores podem adicionar ou remover participantes.
- RN17 - Apenas administradores podem excluir o grupo.
- RN18 - Um grupo deve possuir pelo menos um participante.

---

## Chamadas

- RN19 - Apenas participantes da conversa ou grupo podem participar da chamada.
- RN20 - Apenas uma chamada pode estar ativa simultaneamente em uma conversa ou grupo.
- RN21 - O compartilhamento de tela só pode ocorrer durante uma chamada ativa.

---

## Exclusão de Conta

- RN22 - Ao solicitar exclusão, a conta permanece desativada por um período determinado.
- RN23 - Durante esse período o usuário pode reativar a conta realizando login.
- RN24 - Após o período de desativação, todos os dados são removidos permanentemente.

---

# Próximas Etapas

- Modelagem do banco de dados (DER)
- Diagrama de Casos de Uso
- Diagrama de Classes
- Arquitetura da aplicação
- Tecnologias utilizadas
- Estrutura de pastas
- Documentação da API
- Protótipos das telas
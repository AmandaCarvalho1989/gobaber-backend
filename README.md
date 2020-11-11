# Recuperação de senha

**RF** -> Requisitos funcionais

- O usuário deve podere recuperar sua senha informando o seu email;
-O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;


**RNF** -> Requisitos não funcionais

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano(background job  )



**RN** -> Regra de negócio
-O link enviado por email para resetar senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil


**RF** -> Requisitos funcionais

- O usuário deve poder atualizar seu nome, email e senha

**RN** -> Regra de negócio

- O usuário não pode poder alterar seu email para um email já atualizado;
-Para atualizar sua senha, o usuário deve informar a senha anterior
-Para atualizar sua senha, o usuário deve confirmar a nova senha;

# Painel do prestador


**RF** -> Requisitos funcionais

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O usuário deve poder visualizar as notificações não lidas;

**RN** -> Regra de negócio

- A notificação de ter um status de lida ou não-lida para que o prestador possa controlar;

**RNF** -> Regra não funcional

- Os agendamentos do prestador do dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenados no MongoDB;
- As notificações do prestador devem ser enviados em tempo-real utilizando Socket.io;


# Agendamento de serviços

**RF** -> Requisitos funcionais

-  O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário deve poder listar horários disponíveis de um dia de um prestador;
- O usuário deve poder realizar um novo agendamento com o prestador;


**RN** -> Regra de negócio

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos deves estar disponíveis entre 8h às 28h (Primeiro às 8h e último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;


**RNF** -> Regra de negócio

- Listagem de prestadores deve ser armazenado em cache;

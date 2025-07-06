# Dojo Admin 🥋
<h3>
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Java-C71A00?style=for-the-badge&logo=java&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring%20Boot-6DB33F.svg?style=for-the-badge&logo=Spring-Boot&logoColor=white"/>
<img src="https://img.shields.io/badge/maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white"/>
<img src="https://img.shields.io/badge/Flyway-CC0200.svg?style=for-the-badge&logo=Flyway&logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
</h3>

Backend em Java 17 com spring-boot 3.2.3</br>
Base de dados PostgreSQL 15 </br>
Versionamento de DB com Flyway 11 </br>
Serviços containerizados com Docker e orquestrados com docker-compose</br>
Frontend em React 19</br>

## Executando em ambiente local com Docker 🐋
A partir da pasta raiz do projeto execute o comando abaixo para subir backend e frontend simultaneamente:
> docker-compose up --build

<h2> Propósito do Projeto </h2>
<h3> Facilitar e organizar a gestão de alunos, aulas, mensalidades, exames e a rotina administrativa de um dojô de artes marciais.
O objetivo é digitalizar, simplificar e padronizar o controle de frequência, pagamentos e evolução técnica dos praticantes, oferecendo também transparência e praticidade para senseis, tesoureiros e alunos. </h3>

### Funcionalidades do Sistema
- Cadastro e Gestão de Alunos (nome, username, data de nascimento, faixa, graduação, federação de origem, status etc)
- - Associação de papéis (roles): ALUNO, SENSEI, ADMIN, TESOURARIA
- - Controle de status do aluno (ATIVO, INATIVO)
- - Observações e anotações administrativas (visíveis só para roles elevadas)
- - Login seguro para todos os perfis, com senha individual

- Controle de Aulas e Presenças
- - Registro de aulas realizadas (data, sensei responsável, participantes, foto)
- - Controle de frequência dos alunos
- - Consulta de aulas por data, período ou sensei responsável
- - Histórico de participação de cada aluno

- Gerenciamento de Mensalidades
- - Registro de pagamento, pendência, isenção (com motivo)
- - Upload/registro de comprovantes de pagamento (url da imagem)
- - Filtro e busca por período, status ou aluno
- - Auditoria de alterações e isenções

- Gestão de Exames de Graduação
- - Data do exame, faixa/kyu/dan alvo, status (aprovado/reprovado)
- - Vinculação de banca examinadora (senseis responsáveis)
- - Cálculo de tempo desde último exame e alerta de aptidão para nova graduação

- Segurança, Permissões e Auditoria
- - Login com autenticação JWT e roles
- - Permissões restritas conforme papel do usuário
- - Registro de ações sensíveis (ex: quem alterou senha, quem isentou mensalidade)
- - Proibição de exclusão de dados com vínculos críticos (ex: aluno com mensalidades/aulas)

- Dashboard e Relatórios
- - Resumo de alunos ativos, próximos exames, inadimplentes, aniversariantes
- - Filtros inteligentes e paginados
- - Painel diferenciado para administrador e sensei
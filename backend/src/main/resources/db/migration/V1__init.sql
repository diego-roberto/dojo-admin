CREATE TABLE IF NOT EXISTS alunos (
    id UUID PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    email VARCHAR(255),
    graduacao_kyu INTEGER,
    faixa_atual VARCHAR(50),
    federacao_origem VARCHAR(255),
    data_ultimo_exame DATE,
    status VARCHAR(50),
    observacoes TEXT,
    password VARCHAR(255),
    ultima_alteracao_senha VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS aulas (
    id UUID PRIMARY KEY,
    data DATE,
    foto_url VARCHAR(255),
    comentarios TEXT,
    sensei_id UUID NOT NULL REFERENCES alunos(id)
);

CREATE TABLE IF NOT EXISTS presencas (
    aula_id UUID REFERENCES aulas(id),
    aluno_id UUID REFERENCES alunos(id)
);

CREATE TABLE IF NOT EXISTS exames (
    id UUID PRIMARY KEY,
    aluno_id UUID REFERENCES alunos(id),
    data_exame DATE,
    kyu INTEGER,
    faixa_alvo VARCHAR(50),
    aprovado BOOLEAN
);

CREATE TABLE IF NOT EXISTS banca_examinadora (
    exame_id UUID REFERENCES exames(id),
    examinador_id UUID REFERENCES alunos(id)
);

CREATE TABLE IF NOT EXISTS mensalidades (
    id UUID PRIMARY KEY,
    aluno_id UUID REFERENCES alunos(id),
    mes_referencia VARCHAR(7),
    status_pagamento VARCHAR(20),
    isencao BOOLEAN,
    motivo_isencao VARCHAR(255),
    data_pagamento DATE,
    comprovante_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS aluno_roles (
    aluno_id UUID REFERENCES alunos(id),
    roles VARCHAR(50)
);

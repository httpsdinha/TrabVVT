describe("Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas", () => {
  beforeEach(() => {
    // Gancho em nível raíz
    // executa antes de realizar cada teste(it)
    cy.typelogin(
      "https://novo-sig.ledes.net/", // [URL do sistema]
      "grupo14_pesq@sig.com",
      "Grupo14@sig" // [Senha do usuário]
    ); //Acessa a página de login usando as credenciais do usuário e senha.
  });
  it("Realiza login no sistema e submete uma proposta", () => {
    cy.get('[data-cy="breadcrumb-home"]').click(); //Clica no botão "Home" para retornar à página anterior
    cy.get('[data-cy="editais-ver-mais"]').click(); //Clica no botão "Ver Mais" para acessar a página de Editais

    cy.get('[data-cy="visualizar-edital-grupo-03-e-m-007"]').click(); //Edite essa linha para selecionar o Edital respectivo
    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente
    cy.get('[data-cy="criar-proposta"]').click(); //Clica no botão "Criar Proposta" para iniciar o processo de criação de uma nova proposta
    cy.get('[data-cy="tituloDoProjeto"]').clear().type(
      "Submissão de Proposta Cypress", //Preenche o campo "Título do Projeto" com o valor "Submissão de Proposta de Teste"
      { delay: 0 }
    );
    // Atividade 3 - Faça a continuidade do teste, preenchendo os campos obrigatórios da proposta.

    // cy.get('[data-cy="instituicaoExecutoraId"]').click();
    // cy.get('[data-cy-index="instituicaoExecutoraId-item-1"]').click(); //Seleciona a primeira Instituição Executora da lista de Instituições

    cy.get('[data-cy="unidadeExecutoraId"]').click();
    cy.wait(300); //Aguarda 300ms para garantir que o campo de Unidade Executora esteja pronto para receber o valor
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(1).click(); // Seleciona a primeira opção

    cy.get("body").then(($body) => {
      if ($body.find(".MuiAccordionSummary-root").length === 0) {
        cy.get('[data-cy="areaDeConhecimento-adicionar"]').click();
      }
      cy.get(".MuiAccordionSummary-root").click();
    });

    cy.get('[data-cy="areaDeConhecimento.0.grandeAreaId"]').click();
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); // Seleciona a primeira opção

    cy.get('[data-cy="areaDeConhecimento.0.areaId"]').click();
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); // Seleciona a primeira opção

    cy.get('[data-cy="areaDeConhecimento.0.subAreaId"]').click();
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); // Seleciona a primeira opção

    cy.get('[data-cy="areaDeConhecimento.0.especialidadeId"]').click();
    cy.wait(300);
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); // Seleciona a primeira opção

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar"
    cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
    cy.wait(500);

    cy.get('[data-cy="abrangencia-adicionar"]').click(); //Clica no botão "Adicionar" para adicionar uma nova Abrangência

    cy.get('[data-cy="abrangencia.0.estadoId"]').click(); //Clica no campo de seleção de Estado
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Estado da lista de Estados

    cy.get('[data-cy="abrangencia.0.abrangenciaMunicipio"]').click(); //Clica no campo de seleção de Abrangência Municipal
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(3).click(); //Seleciona o primeiro Município da lista de Municípios

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar"
    cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
    cy.wait(500);

    cy.get('[data-cy="criadoPor.racaCorId"]').click(); //Clica no campo de seleção de Raça/COR
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona a primeira Raça/COR da lista de Raças/CORs

    cy.get('[data-cy="criadoPor.paisId"]').click(); //Clica no campo de seleção de País
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro País da lista de Países

    cy.get('[data-cy="criadoPor.documento"]').click(); //Clica no campo de Documento
    cy.get('[data-cy="criadoPor.documento"]')
      .clear()
      .type("05242842105", { delay: 0 }); //Preenche o campo de Documento com o valor "123456789"

    cy.get('[data-cy="criadoPor.nomeSocial"]').click(); //Clica no campo de Nome Social
    cy.wait(300); //Aguarda 300ms para garantir que o campo de Nome Social esteja pronto para receber o valor
    cy.get('[data-cy="criadoPor.nomeSocial"]')
      .clear()
      .type("Teste Nome Social", { delay: 0 }); // Limpa e preenche o campo de Nome Social

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar"
    /*
    cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
    cy.wait(500);

    cy.get('[data-cy="criadoPor.endereco.cep"]').click(); //Clica no campo de CEP
    cy.get('[data-cy="criadoPor.endereco.cep"]').clear().type('12345678', {delay: 0}); //Preenche o campo de CEP com o valor "12345678"

    cy.get('[data-cy="criadoPor.endereco.bairro"]').click(); //Clica no campo de Bairro
    cy.wait(300); //Aguarda 300ms para garantir que o campo de Bairro esteja pronto para receber o valor
    cy.get('[data-cy="criadoPor.endereco.bairro"]').clear().type('Centro'); //Preenche o campo de Bairro com o valor "Centro"

    cy.get('[data-cy="criadoPor.endereco.logradouro"]').click(); //Clica no campo de Logradouro
    cy.wait(300); //Aguarda 300ms para garantir que o campo de Bairro esteja pronto para receber o valor
    cy.get('[data-cy="criadoPor.endereco.logradouro"]').clear().type('Rua Teste', { delay: 0 }); //Preenche o campo de Logradouro com o valor "Rua Teste"

    cy.get('[data-cy="criadoPor.endereco.numero"]').click(); //Clica no campo de Número
    cy.wait(300); //Aguarda 300ms para garantir que o campo de Bairro esteja pronto para receber o valor
    cy.get('[data-cy="criadoPor.endereco.numero"]').clear().type('123', { delay: 0 }); //Preenche o campo de Número com o valor "123"

    cy.get('[data-cy="criadoPor.endereco.estado"]').click(); //Clica no campo de seleção de Estado
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Estado da lista de Estados

    cy.get('[data-cy="criadoPor.endereco.municipio"]').click(); //Clica no campo de seleção de Município
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Município da lista de Municípios

    cy.get('[data-cy="criadoPor.endereco.complemento"]').click(); //Clica no campo de Complemento
    cy.wait(300); //Aguarda 300ms para garantir que o campo de Bairro esteja pronto para receber o valor

    cy.get('[data-cy="criadoPor.endereco.complemento"]').clear().type('Apto 101', { delay: 0 }); //Preenche o campo de Complemento com o valor "Apto 101"

    cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
    cy.wait(500);
    */

    cy.get('[data-cy="dados-academicos"]').click();

    cy.get('[data-cy="criadoPor.instituicaoId"]').click(); //Clica no campo de seleção de Instituição
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(1).click(); //Seleciona a primeira Instituição da lista de Instituições

    cy.get('[data-cy="criadoPor.unidadeId"]').click(); //Clica no campo de seleção de Unidade
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona a primeira Instituição da lista de Instituições

    cy.get('[data-cy="criadoPor.nivelAcademicoId"]').click(); //Clica no campo de seleção de Nível Acadêmico
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(3).click(); //Seleciona o primeiro Nível Acadêmico da lista de Níveis Acadêmicos

    cy.get('[data-cy="criadoPor.lattes"]').click(); //Clica no campo de Lattes
    cy.get('[data-cy="criadoPor.lattes"]')
      .clear()
      .type("http://lattes.cnpq.br/1234567890123456", { delay: 0 }); //Preenche o campo de Lattes com um link fictício

    cy.get('[data-cy="criadoPor.linkedin"]').click(); //Clica no campo de LinkedIn
    cy.get('[data-cy="criadoPor.linkedin"]')
      .clear()
      .type("https://www.linkedin.com/in/teste-linkedin", { delay: 0 }); //Preenche o campo de LinkedIn com um link fictício

    cy.get("body").then(($body) => {
      if ($body.find(".MuiAccordionSummary-root").length === 0) {
        cy.get('[data-cy="areaDeConhecimento-adicionar"]').click();
      }
      cy.get(".MuiAccordionSummary-root").click();
    });
    cy.get('[data-cy="criadoPor.areaDeConhecimento.0.areaId"]').click(); //Clica no campo de seleção de Área
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona a primeira Área da lista de Áreas

    cy.get('[data-cy="criadoPor.areaDeConhecimento.0.subAreaId"]').click(); //Clica no campo de seleção de Subárea
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona a primeira Subárea da lista de Subáreas

    cy.get(
      '[data-cy="criadoPor.areaDeConhecimento.0.especialidadeId"]'
    ).click(); //Clica no campo de seleção de Especialidade
    cy.wait(300); //Aguarda 300ms para garantir que o campo de Especialidade esteja pronto para receber o valor
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona a primeira Especialidade da lista de Especialidades

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações dos Dados Acadêmicos
    cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
    cy.wait(500); //Aguarda 300ms para garantir que a página foi carregada completamente

    // cy.get('[data-cy="dados-profissionais"] > .MuiListItemText-root > .MuiTypography-root').click(); //Clica na aba Dados Profissionais para acessar a seção de Dados Profissionais

    cy.get('[data-cy="criadoPor.possuiVinculoInstitucional"]').check(); //Clica no campo de seleção de Possui Vínculo Institucional

    cy.get(
      '[data-cy="criadoPor.vinculoInstitucional.tipoVinculoInstitucionalId"]'
    ).click(); //Clica no campo de seleção de Tipo de Vínculo Institucional
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Tipo de Vínculo Institucional da lista de Tipos

    cy.get('[data-cy="criadoPor.possuiVinculoEmpregaticio"]').check(); //Clica no campo de seleção de Possui Vínculo Empregatício

    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]').type(
      "01102023",
      { delay: 0 }
    ); //Preenche o campo de Início de Serviço com a data "2023-10-01"

    cy.get(
      '[data-cy="criadoPor.vinculoInstitucional.regimeTrabalhoId"]'
    ).click(); //Clica no campo de seleção de Regime de Trabalho
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Regime de Trabalho da lista de Regimes

    cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').click(); //Clica no campo de Função
    cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]')
      .clear()
      .type("Pesquisador", { delay: 0 }); //Preenche o campo de Função com o valor "Pesquisador"

    cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').type(
      "01102023",
      { delay: 0 }
    ); //Preenche o campo de Início de Função com a data "2023-10-01"

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações dos Dados Profissionais
    cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
    cy.wait(500);

    // INDICADORES DE PRODUÇÃO DO EDITAL MÉDIO ENTRA AQUI
    Cypress._.times(41, (index) => {
      cy.get('input[type="number"]').eq(index).type("10", { delay: 0 }); //Preenche os campos de Indicadores de Produção com o valor "10"
    });

    // cy.get('[data-cy="nome-do-pesquisa"]').click(); //Clica na aba Nome do Pesquisador para acessar a seção de Nome do Pesquisador
    // cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Mês de Início da lista de Meses
    // cy.get('.MuiButton-root > .MuiStack-root').click(); //Clica no botão "Adicionar" para adicionar um novo Nome do Pesquisador
    // cy.get('.custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click(); //Clica no campo de seleção de Nome do Pesquisador
    // cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Funcao do Membro da lista de Funções

    cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
    cy.wait(500);
    cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta

    /* ESSA PARTE NÃO FUNCIONA POIS O SISTEMA POSSUI UM ERRO AO TENTAR ADICIONAR UM RESPONSÁVEL
    cy.get('[data-cy="propostaAtividade-adicionar"]').click(); //Clica no botão "Adicionar" para adicionar uma nova Atividade
    cy.get('[data-cy="propostaAtividade.0.titulo"]').clear().type('A'); //Preenche o campo "Título" da Atividade com o valor "Atividade de Teste"
    cy.get('[data-cy="propostaAtividade.0.mesInicio"]').click(); //Clica no campo de seleção de Mês de Início da Atividade
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Mês de Início da lista de Meses
    cy.get('[data-cy="propostaAtividade.0.duracao"]').click(); //Clica no campo de Duração da Atividade
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro valor de Duração da lista de Durações
    cy.get('[data-cy="propostaAtividade.0.cargaHorariaSemanal"]').click(); //Clica no campo de Carga Horária Semanal da Atividade
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro valor de Carga Horária Semanal da lista de Cargas Horárias
    cy.get('[data-cy="propostaAtividade.0.membroResponsavelId"]').click(); //Clica no campo de seleção de Membro Responsável da Atividade
    cy.wait(1000);
    cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Membro Responsável da lista de Membros
    */

    cy.get('[data-cy="termos"]').click();
    cy.wait(500);
    cy.get('[data-cy="termo-de-aceite"]').click(); //Clica na aba Termo de Aceite para acessar a seção de Termo de Aceite
    cy.wait(1000);

    cy.get('[data-cy="termoDeAceiteAceito"]').check(); //Clica no campo de seleção de Termo de Aceite Aceito
    // cy.get('[data-cy="edital.termoDeAceite"]').clear().type('Termo de Aceite de Teste', { delay: 0 }); //Preenche o campo de Termo de Aceite com o valor "Termo de Aceite de Teste"
    cy.get('[data-cy="termoDeAceiteAceito"]').check(); //Clica no campo de seleção de Termo de Aceite Aceito
    cy.get('[data-cy="menu-verificar-penden"]').click(); //Clica no botão "Verificar Pendências" para verificar se há pendências na proposta

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações da proposta

    cy.get('[data-cy="menu-verificar-penden"]').click(); //Clica no botão "Verificar Pendências" para verificar se há pendências na proposta
    cy.wait(500); //Aguarda 500ms para garantir que a verificação

    // cy.get('[data-cy="menu-finalizar"]').click(); //Clica no botão "Finalizar" para salvar e sair da área de adição da propostas
    cy.contains("button", "Submeter Proposta").click();
  });
});

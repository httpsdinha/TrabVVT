describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
    beforeEach(() => {
      // Gancho em nível raíz
      // executa antes de realizar cada teste(it)
      cy.typelogin(
        'https://novo-sig.ledes.net/',// [URL do sistema]
        'grupo14_pesq@sig.com',
        'Grupo14@sig', // [Senha do usuário]
      ); //Acessa a página de login usando as credenciais do usuário e senha.
    });
    it('Realiza login no sistema e submete uma proposta', () => {
      cy.get('[data-cy="breadcrumb-home"]').click(); //Clica no botão "Home" para retornar à página anterior
      cy.get('[data-cy="editais-ver-mais"]').click(); //Clica no botão "Ver Mais" para acessar a página de Editais
  
      cy.get('[data-cy="visualizar-edital-grupo-03-e-c-007"]').click(); //Edite essa linha para selecionar o Edital respectivo
      cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente
      cy.get('[data-cy="criar-proposta"]').click(); //Clica no botão "Criar Proposta" para iniciar o processo de criação de uma nova proposta
      cy.get('[data-cy="tituloDoProjeto"]').clear().type(
          'Submissão de Proposta Cypress', //Preenche o campo "Título do Projeto" com o valor "Submissão de Proposta de Teste"
          { delay: 0 },
      )
      // Atividade 3 - Faça a continuidade do teste, preenchendo os campos obrigatórios da proposta.

      cy.get('[data-cy="instituicaoExecutoraId"]').click();
      cy.get('.MuiAutocomplete-popper [role="option"]').eq(1).click(); // Seleciona a primeira opção
  
  
      cy.get('[data-cy="unidadeExecutoraId"]').click();
      cy.get('.MuiAutocomplete-popper [role="option"]').eq(1).click(); // Seleciona a primeira opção

  
      // cy.get('[data-cy="areaDeConhecimento-adicionar"]').click();
  
      cy.get('.MuiAccordionSummary-root').click();
  
      cy.get('[data-cy="areaDeConhecimento.0.grandeAreaId"]').click();
      cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); // Seleciona a primeira opção
  
      cy.get('[data-cy="areaDeConhecimento.0.areaId"]').click();
      cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); // Seleciona a primeira opção
  
      cy.get('[data-cy="areaDeConhecimento.0.subAreaId"]').click();
      cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); // Seleciona a primeira opção
  
      cy.get('[data-cy="areaDeConhecimento.0.subAreaId"]').click();
      cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); // Seleciona a primeira opção
  
  
      cy.get('[data-cy="areaDeConhecimento.0.especialidadeId"]').click()
      cy.wait(300);
      cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); // Seleciona a primeira opção
  
      cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
      cy.wait(1000);
  

    //Aqui comeca as diferenças do teste de submissão de proposta
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-23-item-ods02-erradicar"] > .MuiListItemIcon-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check(); //Clica no campo de seleção de ODS 2 - Erradicar a Fome, Alcançar a Segurança Alimentar e Melhorar a Nutrição e Promover a Agricultura Sustentável    
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-25-item-agronegocios"] > .MuiButtonBase-root > .PrivateSwitchBase-input').check(); //Clica no campo de seleção de Agronegócios    
    // cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-25-item-saude-humana-e-o"] > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
    
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-26"]').click().type("20/10/2025", {delay: 0}); //Clica no campo de seleção de "A proposta está vinculada a um projeto de pesquisa ou inovação em andamento?"
    
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-27"]').click().type("Essa eh a ocupacao tecnica durante a realizacao do evento", {delay: 0}); //Clica no campo de seleção de "Data de início do projeto"

    
    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-24-item-mei-faturamento"] > .MuiListItemIcon-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check(); //Clica no campo de seleção de MEI - Faturamento Anual de até R$ 81.000,00
    
    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações da proposta


    cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-25-item-energias-renovav"] > .MuiButtonBase-root > .PrivateSwitchBase-input').check(); //Clica no campo de seleção de Energias Renováveis e Eficiência Energética
    
    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações da proposta

    cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
    cy.wait(500); //Aguarda 500ms para garantir que a página foi carregada completamente
    

    cy.get('[data-cy="abrangencia-adicionar"]').click(); //Clica no botão "Adicionar" para adicionar uma nova Abrangência

      cy.get('[data-cy="abrangencia.0.estadoId"]').click(); //Clica no campo de seleção de Estado
      cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Estado da lista de Estados
      
      cy.get('[data-cy="abrangencia.0.abrangenciaMunicipio"]').click(); //Clica no campo de seleção de Abrangência Municipal
      cy.get('.MuiAutocomplete-popper [role="option"]').eq(3).click(); //Seleciona o primeiro Município da lista de Municípios
  
      cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
      cy.wait(500);
  
    //   cy.get('[data-cy="criadoPor.racaCorId"]').click(); //Clica no campo de seleção de Raça/COR
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona a primeira Raça/COR da lista de Raças/CORs
  
    //   cy.get('[data-cy="criadoPor.paisId"]').click(); //Clica no campo de seleção de País
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro País da lista de Países
  
      cy.get('[data-cy="criadoPor.documento"]').click(); //Clica no campo de Documento
      cy.get('[data-cy="criadoPor.documento"]').clear().type('05242842105', {delay: 0}); //Preenche o campo de Documento com o valor "123456789"
  
    //   cy.get('[data-cy="criadoPor.nomeSocial"]').click(); //Clica no campo de Nome Social
    //   cy.wait(300); //Aguarda 300ms para garantir que o campo de Nome Social esteja pronto para receber o valor
    //   cy.get('[data-cy="criadoPor.nomeSocial"]').clear().type('Teste Nome Social', {delay: 0}); // Limpa e preenche o campo de Nome Social
      
    /*
      cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
      cy.wait(500);
  
      cy.get('[data-cy="criadoPor.endereco.cep"]').click(); //Clica no campo de CEP
      cy.get('[data-cy="criadoPor.endereco.cep"]').clear().type('79110220', {delay: 0}); //Preenche o campo de CEP com o valor "12345678"
  
    //   cy.get('[data-cy="criadoPor.endereco.bairro"]').click(); //Clica no campo de Bairro
    //   cy.wait(300); //Aguarda 300ms para garantir que o campo de Bairro esteja pronto para receber o valor
    //   cy.get('[data-cy="criadoPor.endereco.bairro"]').clear().type('Centro'); //Preenche o campo de Bairro com o valor "Centro"
  
    //   cy.get('[data-cy="criadoPor.endereco.logradouro"]').click(); //Clica no campo de Logradouro
    //   cy.wait(300); //Aguarda 300ms para garantir que o campo de Bairro esteja pronto para receber o valor
    //   cy.get('[data-cy="criadoPor.endereco.logradouro"]').clear().type('Rua Teste', { delay: 0 }); //Preenche o campo de Logradouro com o valor "Rua Teste"
  
      cy.get('[data-cy="criadoPor.endereco.numero"]').click(); //Clica no campo de Número
      cy.wait(300); //Aguarda 300ms para garantir que o campo de Bairro esteja pronto para receber o valor
      cy.get('[data-cy="criadoPor.endereco.numero"]').clear().type('123', { delay: 0 }); //Preenche o campo de Número com o valor "123"
  
    //   cy.get('[data-cy="criadoPor.endereco.estado"]').click(); //Clica no campo de seleção de Estado
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Estado da lista de Estados
  
    //   cy.get('[data-cy="criadoPor.endereco.municipio"]').click(); //Clica no campo de seleção de Município
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Município da lista de Municípios
  
      cy.get('[data-cy="criadoPor.endereco.complemento"]').click(); //Clica no campo de Complemento
      cy.wait(300); //Aguarda 300ms para garantir que o campo de Bairro esteja pronto para receber o valor
  
      cy.get('[data-cy="criadoPor.endereco.complemento"]').clear().type('Apto 101', { delay: 0 }); //Preenche o campo de Complemento com o valor "Apto 101"
  
      cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações da proposta
 
      cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
      cy.wait(500);
      */
     cy.get('[data-cy="dados-academicos"]').click();
  

    //   cy.get('[data-cy="criadoPor.instituicaoId"]').click(); //Clica no campo de seleção de Instituição
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(1).click(); //Seleciona a primeira Instituição da lista de Instituições
  
  
  
      //NAO POSSUI OPCOES
      // cy.get('[data-cy="criadoPor.unidadeId"]').click(); //Clica no campo de seleção de Unidade
      // cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona a primeira Instituição da lista de Instituições
  
    //   cy.get('[data-cy="criadoPor.nivelAcademicoId"]').click(); //Clica no campo de seleção de Nível Acadêmico
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(3).click(); //Seleciona o primeiro Nível Acadêmico da lista de Níveis Acadêmicos
  
    //   cy.get('[data-cy="criadoPor.lattes"]').click(); //Clica no campo de Lattes
    //   cy.get('[data-cy="criadoPor.lattes"]').clear().type('http://lattes.cnpq.br/1234567890123456', { delay: 0 }); //Preenche o campo de Lattes com um link fictício
  
    //   cy.get('[data-cy="criadoPor.linkedin"]').click(); //Clica no campo de LinkedIn
    //   cy.get('[data-cy="criadoPor.linkedin"]').clear().type('https://www.linkedin.com/in/teste-linkedin', { delay: 0 }); //Preenche o campo de LinkedIn com um link fictício
  
      // cy.get('[data-cy="criadoPor.areaDeConhecimento-adicionar"]').click(); //Clica no botão "Adicionar" para adicionar uma nova Área de Conhecimento
  
    //   cy.get('.MuiAccordionSummary-root').click(); //Clica no cabeçalho do acordeão para expandir as opções de Área de Conhecimento
    //   cy.get('[data-cy="criadoPor.areaDeConhecimento.0.grandeAreaId"]').click(); //Clica no campo de seleção de Grande Área
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona a primeira Grande Área da lista de Grandes Áreas
  
    //   cy.get('[data-cy="criadoPor.areaDeConhecimento.0.areaId"]').click(); //Clica no campo de seleção de Área
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona a primeira Área da lista de Áreas
  
    //   cy.get('[data-cy="criadoPor.areaDeConhecimento.0.subAreaId"]').click(); //Clica no campo de seleção de Subárea
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona a primeira Subárea da lista de Subáreas
  
    //   cy.get('[data-cy="criadoPor.areaDeConhecimento.0.especialidadeId"]').click(); //Clica no campo de seleção de Especialidade
    //   cy.wait(300); //Aguarda 300ms para garantir que o campo de Especialidade esteja pronto para receber o valor
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona a primeira Especialidade da lista de Especialidades
  
      cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
      cy.wait(500); //Aguarda 300ms para garantir que a página foi carregada completamente
      // cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
      cy.wait(500);
  
  
      // cy.get('[data-cy="dados-profissionais"] > .MuiListItemText-root > .MuiTypography-root').click(); //Clica na aba Dados Profissionais para acessar a seção de Dados Profissionais
  
    //   cy.get('[data-cy="criadoPor.possuiVinculoInstitucional"]').check(); //Clica no campo de seleção de Possui Vínculo Institucional
  
    //   cy.get('[data-cy="criadoPor.vinculoInstitucional.tipoVinculoInstitucionalId"]').click(); //Clica no campo de seleção de Tipo de Vínculo Institucional
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Tipo de Vínculo Institucional da lista de Tipos
  
    //   cy.get('[data-cy="criadoPor.possuiVinculoEmpregaticio"]').check(); //Clica no campo de seleção de Possui Vínculo Empregatício
  
    //   cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioServico"]').type('01102023'); //Preenche o campo de Início de Serviço com a data "2023-10-01"
  
    //   cy.get('[data-cy="criadoPor.vinculoInstitucional.regimeTrabalhoId"]').click(); //Clica no campo de seleção de Regime de Trabalho
    //   cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Regime de Trabalho da lista de Regimes
  
    //   cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').click(); //Clica no campo de Função
    //   cy.get('[data-cy="criadoPor.vinculoInstitucional.funcao"]').clear().type('P'); //Preenche o campo de Função com o valor "Pesquisador"
  
    //   cy.get('[data-cy="criadoPor.vinculoInstitucional.inicioFuncao"]').type('01102023'); //Preenche o campo de Início de Função com a data "2023-10-01"
  
  
      cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
      cy.wait(500);

      //APRESENTACAO - DESCRICAO
      cy.get('[data-cy="formularioPropostaDescritiva.pergunta-6"]').click().type('Descrição de objetivos especificos', { delay: 0 }); //Clica no campo de descrição e preenche com o texto "Descrição da Proposta de Teste"
  
      cy.get('[data-cy="formularioPropostaDescritiva.pergunta-7"]').click().type('Descrição da metodologia', { delay: 0 }); //Clica no campo de descrição e preenche com o texto "Descrição da Proposta de Teste"
      
      cy.get('[data-cy="formularioPropostaDescritiva.pergunta-3"]').click().type('Resumo da proposta do projeto', { delay: 0 }); //Clica no campo de descrição e preenche com o texto "Descrição do Problema"
      
      cy.get('[data-cy="formularioPropostaDescritiva.pergunta-4"]').click().type('Sintese do Projeto', { delay: 0 }); //Clica no campo de descrição e preenche com o texto "Descrição do Problema"

      cy.get('[data-cy="formularioPropostaDescritiva.pergunta-5"]').click().type('Objetivo Geral', { delay: 0 }); //Clica no campo de descrição e preenche com o texto "Descrição do Problema"

      cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
    
      cy.wait(500); //Aguarda 500ms para garantir que a página foi carregada completamente




      // INDICADORES DE PRODUÇÃO DO EDITAL MÉDIO ENTRA AQUI
      // Mudar aqui para 35 vezes 
      Cypress._.times(5, (index) => {
        cy.get('input[type="number"]').eq(index).type('10', { delay: 0 }); //Preenche os campos de Indicadores de Produção com o valor "10"
      });
  
      // Isso cria um novo membro do projeto.

      // cy.get('[data-cy="nome-do-pesquisa"]').click(); //Clica na aba Nome do Pesquisador para acessar a seção de Nome do Pesquisador
      // cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Mês de Início da lista de Meses
      // cy.get('.MuiButton-root > .MuiStack-root').click(); //Clica no botão "Adicionar" para adicionar um novo Nome do Pesquisador
      // cy.get('.custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click(); //Clica no campo de seleção de Nome do Pesquisador    
      // cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Funcao do Membro da lista de Funções
  
  
      cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
      cy.wait(500);
      cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
  
      // cy.get('[data-cy="propostaAtividade-adicionar"]').click(); //Clica no botão "Adicionar" para adicionar uma nova Atividade
  
      // cy.get('[data-cy="propostaAtividade.0.titulo"]').clear().type('A'); //Preenche o campo "Título" da Atividade com o valor "Atividade de Teste"
  
      // cy.get('[data-cy="propostaAtividade.0.mesInicio"]').click(); //Clica no campo de seleção de Mês de Início da Atividade
      // cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Mês de Início da lista de Meses
  
      // cy.get('[data-cy="propostaAtividade.0.duracao"]').click(); //Clica no campo de Duração da Atividade
      // cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro valor de Duração da lista de Durações
  
      // cy.get('[data-cy="propostaAtividade.0.cargaHorariaSemanal"]').click(); //Clica no campo de Carga Horária Semanal da Atividade
      // cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro valor de Carga Horária Semanal da lista de Cargas Horárias
  
      // cy.get('[data-cy="propostaAtividade.0.membroResponsavelId"]').click(); //Clica no campo de seleção de Membro Responsável da Atividade
      // cy.wait(1000);
      // cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click(); //Seleciona o primeiro Membro Responsável da lista de Membros
  

      cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta

      // Diarias - Faixa de Financiamento

      cy.get('[data-cy="faixaFinanciamentoId"]').click(); //Clica no campo de seleção de Faixa de Financiamento
      cy.get('.MuiAutocomplete-popper [role="option"]').eq(4).click(); //Seleciona a primeira Faixa de Financiamento da lista de Faixas
      
      cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
        cy.wait(1000); //Aguarda 500ms para garantir que a página foi carregada completamente
      
      // Orcamento - Diarias

        cy.get('[data-cy="apresentacao"] > .MuiListItemText-root > .MuiTypography-root').click(); //Clica na aba Apresentação para acessar a seção de Apresentação
        cy.wait(1000); //Aguarda 500ms para garantir que a página foi carregada completamente

        cy.get('[data-cy="orcamento"] > .MuiListItemText-root > .MuiTypography-root').click(); //Clica na aba Orçamento para acessar a seção de Orçamento
        cy.wait(1000); //Aguarda 500ms para garantir que a página foi carregada completamente

        cy.get('[data-cy="diarias"] > .MuiListItemText-root > .MuiTypography-root').click(); //Clica na aba Diárias para acessar a seção de Diárias
        cy.wait(1000); //Aguarda 500ms para garantir que a página foi carregada completamente

        cy.get('[data-cy="add-button"]').click();

        cy.get('[data-cy="rubricaDiariaUnsaved.paisId"]').click(); //Clica no botão "Adicionar" para adicionar
        // cy.contains('.MuiAutocomplete-option', 'Brasil').click();  

        cy.get('[data-cy="rubricaDiariaUnsaved.estadoId"]').click(); //Clica no botão "Adicionar" para adicionar
        cy.contains('.MuiAutocomplete-option', 'Acre').click();  

        cy.get('[data-cy="rubricaDiariaUnsaved.municipio"]').click(); //Clica no campo de Quantidade
        cy.contains('.MuiAutocomplete-option', 'Bujari').click();  

        cy.get('[data-cy="rubricaDiariaUnsaved.numeroDiaria"]').click().type("10", {delay: 0}); //Clica no campo de Quantidade

        cy.get('[data-cy="rubricaDiariaUnsaved.custoUnitario"]').click().type("10000", {delay: 0}); //Clica no campo de Custo Unitário
        // cy.get('[data-cy="rubricaDiariaUnsaved.valorTotal]').click(); //Clica no campo de Quantidade

        cy.get('[data-cy="rubricaDiariaUnsaved.mesPrevisto"]').click(); //Clica no campo de Mês Previsto       
        cy.get('.MuiAutocomplete-popper [role="option"]').eq(3).click();

        // cy.get('[data-cy="rubricaDiariaUnsaved.contrapartida"]').click(); //Clica no campo de Contrapartida

        // cy.get('[data-cy="rubricaDiariaUnsaved.tipoPessoa"]').click()        
        // cy.get('.MuiAutocomplete-popper [role="option"]').eq(0).click();

        // cy.get('[data-cy="rubricaDiariaUnsaved.entidade"]').click().type("Entidade de Teste", {delay: 0}); //Clica no campo de Entidade e preenche com o texto "Entidade de Teste"

        cy.get('[data-cy="rubricaDiariaUnsaved.justificativa"]').click().type("Justificativa de Teste", {delay: 0}); //Clica no campo de Justificativa e preenche com o texto "Justificativa de Teste"
        
        cy.get('[data-cy="rubricaDiaria-confirmar"]').click(); //Clica no botão "Confirmar" para confirmar a adição da nova Rubrica de Diária
        cy.wait(1000); //Aguarda 500ms para garantir que a página foi carregada completamente
        
        cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
        cy.wait(500);

        cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
        cy.wait(500);

        cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
        cy.wait(500);

        // ANEXO - Documentos Pessoais
        cy.get('#select-categories').click(); //Clica no campo de seleção de Categorias
        cy.get('[data-cy="documentoPessoalPropostaAnexo-item-rg"]').click(); //Clica no campo de seleção de Documento Pessoal (RG)        
        
        cy.get('[data-cy="documentoPessoalPropostaAnexo-procure"]').click(); //Clica no botão "Procurar" para selecionar um arquivo
        cy.get('[data-cy="documentoPessoalPropostaAnexo-procure"]').selectFile('cypress/fixtures/robbie.pdf'); 

        cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
        cy.wait(500);

        cy.get('#select-categories').click(); //Clica no campo de seleção de Categorias
        cy.get('.MuiPaper-root > .MuiList-root > [tabindex="0"]').click();

        cy.get('[data-cy="documentoPropostaAnexo-procure"]').click(); //Clica no botão "Procurar" para selecionar um arquivo
        cy.get('[data-cy="documentoPropostaAnexo-procure"]').selectFile('cypress/fixtures/robbie.pdf'); //Seleciona o arquivo "robbie.pdf" do diretório "cypress/fixtures"
        
        cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para avançar para a próxima etapa do formulário de proposta
        cy.wait(500);


      //Aceitacao do Termo de Aceite
      cy.get('[data-cy="termos"] > .MuiListItemText-root > .MuiTypography-root').click();
      cy.wait(500);
      cy.get('[data-cy="termo-de-aceite"] > .MuiListItemText-root > .MuiTypography-root').click(); //Clica na aba Termo de Aceite para acessar a seção de Termo de Aceite
      cy.wait(1000);
      cy.get('[data-cy="termoDeAceiteAceito"]').check(); //Clica no campo de seleção de Termo de Aceite Aceito
      cy.get('[data-cy="termoDeAceiteAceito"]').check(); //Clica no campo de seleção de Termo de Aceite Aceito
      
      //Verificação de Pendências
      cy.get('[data-cy="menu-verificar-penden"]').click(); //Clica no botão "Verificar Pendências" para verificar se há pendências na proposta
  
      cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações da proposta
      cy.get('[data-cy="menu-finalizar"]').click(); //Clica no botão "Finalizar" para salvar e sair da área de adição da propostas
    
    }); 
  });
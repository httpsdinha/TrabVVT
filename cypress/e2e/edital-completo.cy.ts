import { getCurrentDateTime } from "../helpers/date.helper";

describe("Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas", () => {
  beforeEach(() => {
    // Gancho em nível raíz
    // executa antes de realizar cada teste(it)
    cy.typelogin(
      "https://novo-sig.ledes.net/", // [URL do sistema]
      "grupo3_gestor@sig.com", // [E-mail do usuário]
      "Grupo3@sig" // [Senha do usuário]
    ); //Acessa a página de login usando as credenciais do usuário e senha.
  });

  it.only("Realiza login no sistema e cria um edital completo", () => {
    //Teste edital completo, se houver mais de um teste, o it.only executa apenas esse teste.
    cy.get('[data-cy="nav-group-edital"]').click(); //Clica na aba Editais
    cy.get('[data-cy="nav-item-publicar-edital"]').click(); //Clica na opção Editais para acessar da página de Editais
    cy.get('[data-cy="add-publicar-edital"]').click(); //Clica no botão "Adicionar" para criação de um novo Edital

    cy.get('[data-cy="nome"]').type("Grupo-03 E.C. 008/2025 Alexandre-Torres", {
      delay: 0,
    }); //Preenche o campo "Nome" do Edital
    cy.get('[data-cy="restricoes"]').click();
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check();
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type("12");
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();

    // COMECANDO A PERSONALIZACAO DO EDITAL COMPLETO
    cy.get('[data-cy="termo-de-aceite').click();

    cy.get('[data-cy="termoDeAceite"]')
      .should("be.visible") // Garante que o gatilho está visível
      .click(); // Clica no gatilho para carregar o CKEditor

    const ckEditorRealSelector =
      'div[contenteditable="true"].ck-editor__editable.ck-content';

    cy.get(ckEditorRealSelector)
      .should("be.visible") // Garante que o div real do CKEditor apareceu e está visível
      .then(($ckEditorDiv) => {
        const editorInstance = ($ckEditorDiv[0] as any).ckeditorInstance;

        // Garante que a instância do editor foi encontrada e está pronta
        if (editorInstance && editorInstance.setData) {
          // Usa o método setData() da API do CKEditor para definir o conteúdo.
          // Isso é mais rápido e confiável do que simular digitação para limpar e escrever.
          editorInstance.setData(
            "Exemplo de termo de aceite escrito aqui por Alexandre Torres"
          );
        }
      });

    cy.get('[data-cy="next-button"]').click(); //Clica no botão "Próximo" para seguir para a próxima etapa
    cy.get('[data-cy="texto-do-edital"]').click(); //Clica na aba Texto do Edital para seguir para a página de Texto do Edital
    cy.get('[data-cy="texto"]').should("be.visible").click();

    const textoEditalEditorSelector =
      'div[contenteditable="true"].ck-editor__editable.ck-content';

    cy.get(textoEditalEditorSelector)
      .should("be.visible")
      .then(($editorDiv) => {
        const editorInstance = ($editorDiv[0] as any).ckeditorInstance;

        if (editorInstance && editorInstance.setData) {
          editorInstance.setData(
            "Este é o texto do Edital de exemplo feito por Alexandre Torres."
          );
        } else {
          cy.log(
            "CKEditor instance not found or setData not available for Texto do Edital. Falling back to type() method."
          );
          cy.wrap($editorDiv)
            .click()
            .should("have.class", "ck-focused")
            .type("{selectall}{del}")
            .type(
              "Este é o texto do Edital de exemplo, digitado via simulação.",
              { force: true }
            );
        }
      });

    cy.get(textoEditalEditorSelector).should(
      "contain",
      "Este é o texto do Edital de exemplo"
    );

    cy.get('[data-cy="abrangencia"]').click();
    cy.get('[data-cy="estado-todos"]').click();
    cy.get('[data-cy="menu-salvar"]').click();

    cy.get('[data-cy="informacoes-complementares"]').click();

    Cypress._.times(5, (index) => {
      cy.get('[data-cy="perguntaInfoId"]').click();

      cy.get('.MuiAutocomplete-popper [role="option"]:not(:empty)')
        .eq(index)
        .then(($opcao) => {
          const textoDaOpcao = $opcao.text();
          cy.wrap($opcao).click();
          cy.get('[data-cy="perguntaInfoId"]').should(
            "have.value",
            textoDaOpcao
          );
        });

      cy.wait(2000); // Espera 2 segundos antes de clicar
      cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();
      cy.get(".MuiAutocomplete-popper").should("not.exist");
    });

    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="cronograma"]').click(); //Clica na aba Cronograma para seguir para a página de Cronograma
    cy.get('[data-cy="periodo-de-submissao"]').click(); //Clica na aba Período de Submissão para seguir para a página de Período de Submissão
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Período de Submissão
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime()); //Preenche o campo "Início" do Período de Submissão com a data do dia de hoje
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(
      getCurrentDateTime({ addDays: 5 })
    ); //Preenche o campo "Término" do Período de Submissão com a data do dia de hoje + 1 ano
    cy.get('[data-cy="chamada-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Período de Submissão

    cy.get('[data-cy="orcamento"]').click(); //Clica na aba Orçamento para exibir as opções de Orçamento
    cy.get('[data-cy="programa"]').click(); //Clica em Programa para seguir para a página de Programa
    cy.get('[data-cy="programaId"]').click(); //Clica no campo de seleção de Programa
    cy.get('[data-cy-index="programaId-item-0"]').click(); //Seleciona o primeiro Programa da lista de Programas
    cy.get('[data-cy="add-natureza-da-despesa"]').click();
    cy.get(
      '[data-cy="naturezaDespesaEditalUnsaved.naturezaDespesaId"]'
    ).click();
    cy.get(
      '[data-cy-index="naturezaDespesaEditalUnsaved.naturezaDespesaId-item-0"]'
    ).click();
    cy.get('[data-cy="naturezaDespesaEditalUnsaved.valor"]').type("550,00");
    /*cy.get('[data-cy="naturezaDespesaEditalUnsaved.edicaoProgramaId"]').click();
    cy.get('[data-cy-index="naturezaDespesaEditalUnsaved.edicaoProgramaId-item-0"]').click();*/
    cy.get('[data-cy="naturezaDespesaEdital-confirmar"]').click();
    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital

    cy.get('[data-cy="rubricas"]').click();

    Cypress._.times(9, () => {
      cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Rubrica
      cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
      cy.get('.MuiAutocomplete-popper [role="option"]').first().click();
      cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
      cy.get('.MuiAutocomplete-popper [role="option"]').first().click();
      cy.get('[data-cy="editalRubrica-confirmar"]').click();
    });

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital

    cy.get('[data-cy="faixas-de-financiamento"]').click();
    let valorMaximoAnterior = 1000;
    const tamanhoDaFaixa = 4000;

    Cypress._.times(5, (index) => {
      cy.get('[data-cy="add-button"]').click();
      const valorMinimo = valorMaximoAnterior + 0.1;
      const valorMaximo = valorMinimo + tamanhoDaFaixa;
      cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]')
        .clear()
        .type(`Faixa ${index + 1}`, { delay: 0 });
      cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]')
        .clear()
        .type(valorMinimo.toFixed(2).replace(".", ","));
      cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]')
        .clear()
        .type(valorMaximo.toFixed(2).replace(".", ","));
      cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]')
        .clear()
        .type(`Observação sobre a Faixa de Financiamento ${index + 1}.`, {
          delay: 0,
        });
      cy.get('[data-cy="faixaFinanciamento-confirmar"]').click();
      valorMaximoAnterior = valorMaximo;
    });

    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="documentos"]').click(); //Clica na aba Documentos para seguir para a página de Documentos
    cy.get('[data-cy="documentos-da-proposta"]').click(); //Clica na aba Documentos da Proposta para seguir para a página de Documentos da Proposta

    Cypress._.times(2, (index) => {
      cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click(); //Clica no botão "Adicionar" para criar um novo Documento da Proposta
      cy.get('[data-cy="documentoPropostaEdital--expandable-item"]').click();
      cy.get(`[data-cy="documentoPropostaEdital.${index}.nome"]`)
        .clear()
        .type(`Documento de Exemplo ${index + 1}`, { delay: 0 });

      cy.get(`[data-cy="documentoPropostaEdital.${index}.descricao"]`)
        .clear()
        .type(`Descrição do Documento de Exemplo ${index + 1}`, { delay: 0 });

      cy.get(
        `[data-cy="documentoPropostaEdital.${index}.formatoArquivo"]`
      ).click();
      cy.get('.MuiAutocomplete-popper [role="option"]').first().click();

      cy.get(`[data-cy="documentoPropostaEdital.${index}.tamanhoArquivo"]`)
        .clear()
        .type("10", { delay: 0 });

      cy.get(
        `[data-cy="documentoPropostaEdital.${index}.arquivoSubmissaoObrigatoria"]`
      ).check();
    });

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital
    cy.get('[data-cy="documentos-pessoais"]').click();

    Cypress._.times(5, (index) => {
      cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();
      cy.get(
        `[data-cy="documentoPessoalEdital.${index}.documentoPessoalId"]`
      ).click();
      cy.get('.MuiAutocomplete-popper [role="option"]:not(:empty)')
        .first()
        .click();
      // cy.get(`[data-cy="documentoPessoalEdital.${index}.obrigatorio"]`).check();
      cy.get(".MuiAutocomplete-popper").should("not.exist");
    });

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital

    cy.get('[data-cy="perguntas"]').click(); //Clica na aba Perguntas para seguir para a página de Perguntas
    cy.get('[data-cy="descricao-do-projeto"]').click(); //Clica na aba Perguntas da Proposta para seguir para a página de Perguntas da Proposta

    Cypress._.times(5, (index) => {
      cy.get('[data-cy="perguntaDescId"]').click(); //Clica no botão "Adicionar" para criar uma nova Pergunta da Proposta
      cy.get('.MuiAutocomplete-popper [role="option"]')
        .eq(index + 2)
        .then(($opcao) => {
          const textoDaOpcao = $opcao.text();
          cy.wrap($opcao).click();
          cy.wait(2000);
        });

      cy.get('[data-cy="pergunta-adicionar"]').click(); //Clica no botão "Adicionar"
      /*cy.get(`[data-cy-index="pergunta-${index}-expandable-item"]`).click();

      cy.get(`[data-cy="pergunta.${index}.descritiva.tipoRestricao"]`).click();
      cy.get('.MuiAutocomplete-popper [role="option"]:not(:empty)')
        .first()
        .click();

      cy.get(`[data-cy="pergunta.${index}.descritiva.minimo"]`)
        .clear()
        .wait(500)
        .type('1');

      cy.get(`[data-cy="pergunta.${index}.descritiva.maximo"]`)
        .clear()
        .wait(500)
        .type('1200')
        .blur();*/
    });

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital
    cy.get('[data-cy="indicadores-de-producao"]').click(); //Clica na aba Indicadores de Produção para seguir para a página de Indicadores de Produção

    Cypress._.times(3, () => {
      cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Indicador de Produção
      cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
      cy.get('.MuiAutocomplete-popper [role="option"]:not(:empty)')
        .first()
        .click();
      cy.get('[data-cy="indicadorProducao-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Indicador de Produção
    });

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital

    cy.get('[data-cy="bolsas-do-edital"]').click();
    cy.get('[data-cy="bolsas"]').click();

    Cypress._.times(5, (index) => {
      cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Bolsa
      cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click(); //Clica no campo de seleção de modalidade da Bolsa
      cy.get(`[id$="-option-${index}"]`).click();
      cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click(); //Clica no campo de seleção de Nível da Bolsa
      cy.get('.MuiAutocomplete-popper [role="option"]:not(:empty)')
        .first()
        .click();
      cy.get('[data-cy="bolsaEdital-confirmar"]').click();
    });

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital

    cy.get('[data-cy="menu-finalizar"]').click(); //Clica no botão "Finalizar" para salvar e sair da área de adição do Edital
  });
});

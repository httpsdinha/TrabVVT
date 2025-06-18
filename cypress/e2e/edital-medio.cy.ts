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

  it.only("Realiza login no sistema e cria um edital simples", () => {
    //Teste edital simples, se houver mais de um teste, o it.only executa apenas esse teste.
    cy.get('[data-cy="nav-group-edital"]').click(); //Clica na aba Editais
    cy.get('[data-cy="nav-item-publicar-edital"]').click(); //Clica na opção Editais para acessar da página de Editais
    cy.get('[data-cy="add-publicar-edital"]').click(); //Clica no botão "Adicionar" para criação de um novo Edital

    cy.get('[data-cy="nome"]').type("Grupo-03 E.M. 010/2025 eduardo-alves", {
      delay: 0,
    }); //Preenche o campo "Nome" do Edital
    cy.get('[data-cy="restricoes"]').click();
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check();
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type("12");
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();

    // COMECANDO A PERSONALIZACAO DO EDITAL MEDIO
    cy.get('[data-cy="termo-de-aceite').click();

    // Primeiro, clique no elemento que age como "gatilho" para o CKEditor.
    // (Assumindo que este é o elemento que possui data-cy="termoDeAceite"
    // e que, ao ser clicado, remove-se e injeta o CKEditor real sem esse data-cy).
    cy.get('[data-cy="termoDeAceite"]')
      .should("be.visible") // Garante que o gatilho está visível
      .click(); // Clica no gatilho para carregar o CKEditor

    // --- Agora, interaja com a instância REAL do CKEditor ---
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
            "Exemplo de termo de aceite escrito aqui por Eduardo Alves"
          );
        }
      });

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
            "Este é o texto do Edital de exemplo feito por Eduardo Alves."
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
    cy.get('[data-cy="estado-sao-paulo"]').click();
    cy.get('[data-cy="estado-sao-paulo"]').click();
    cy.get('[data-cy="estado-rio-de-janeiro"]').click();
    cy.get('[data-cy="estado-mato-grosso-do-s"]').click();

    cy.get('[data-cy="cronograma"]').click(); //Clica na aba Cronograma para seguir para a página de Cronograma
    cy.get('[data-cy="periodo-de-submissao"]').click(); //Clica na aba Período de Submissão para seguir para a página de Período de Submissão
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Período de Submissão
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime()); //Preenche o campo "Início" do Período de Submissão com a data do dia de hoje
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(
      getCurrentDateTime({ addYears: 1 })
    ); //Preenche o campo "Término" do Período de Submissão com a data do dia de hoje + 1 ano
    cy.get('[data-cy="chamada-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Período de Submissão

    cy.get('[data-cy="orcamento"]').click(); //Clica na aba Orçamento para exibir as opções de Orçamento
    cy.get('[data-cy="programa"]').click(); //Clica em Programa para seguir para a página de Programa
    cy.get('[data-cy="programaId"]').click(); //Clica no campo de seleção de Programa
    cy.get('[data-cy-index="programaId-item-0"]').click(); //Seleciona o primeiro Programa da lista de Programas

    cy.get('[data-cy="perguntas"]').click(); //Clica na aba Perguntas para seguir para a página de Perguntas
    cy.get('[data-cy="indicadores-de-producao"]').click(); //Clica na aba Indicadores de Produção para seguir para a página de Indicadores de Produção
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Indicador de Produção
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('.MuiAutocomplete-popper [role="option"]').first().click();
    cy.get('[data-cy="indicadorProducao-confirmar"').click();

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital
    //   cy.get('[data-cy="menu-finalizar"]').click(); //Clica no botão "Finalizar" para salvar e sair da área de adição do Edital

    //Resultado esperado: O Edital deve ser salvo com sucesso e o usuário deve ser redirecionado para a página de Editais.
  });
});

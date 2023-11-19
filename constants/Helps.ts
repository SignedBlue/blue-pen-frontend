// Para dividir o conteudo do modal em partes/páginas, basta adioconar a tag --break-- e o conteúdo será separado.

// CONTRATOS 

const help_contratos = `
  Nesta página, os contratos são exibidos em formato de grid ou colunas para facilitar a visualização. Cada card representa um contrato e inclui as seguintes informações:

  --break--
  <ul class="list-disc pl-6">
    <li class="ml-">ID do Contrato: Identificação única para cada contrato.</li>
    <li class="ml-">Status de Assinatura: Indica se o contrato está "Em Andamento", "Concluído" ou "Pendente".</li>
    <li class="ml-">Data: Mostra a data de vencimento do contrato.</li>
  </ul>
`;

const help_novo_contrato = `
    <p>
      Ao criar um contrato na Bluepen, você desfruta de diversas facilidades que simplificam o processo. Abaixo, detalhamos cada etapa para ajudar a aproveitar ao máximo essas vantagens:
    </p>

    --break--
    <h2 class="subtitle">Informações Gerais</h2>
    <ul class="list-disc pl-6">
      <li class="mb-1">Duração: Duração em meses do contrato.</li>
      <li class="mb-1">Data de Início: Data prevista para o início do contrato.</li>
    </ul>

    --break--
    <h2 class="subtitle">Detalhes</h2>
    <ul class="list-disc pl-6">
      <li class="mb-2">Itens da Proposta: Lista dos itens propostos para o contrato.</li>
      <li class="mb-2">Serviços: Lista dos serviços incluídos no contrato.</li>
      <li class="mb-2">Níveis de Suporte: Lista dos níveis de suporte oferecidos.</li>
    </ul>
    
    --break--
    <h2 class="subtitle">Detalhes</h2>
    <ul class="list-disc pl-6">
      <li class="mb-2">Formas de Atendimento: Lista das formas de atendimento previstas.</li>
      <li class="mb-2">Valores de Implantação: Lista dos valores de implantação associados a diferentes serviços.</li>
    </ul>

    --break--
    <h2 class="subtitle">Opcional</h2>
    <ul class="list-disc pl-6">
      <li class="mb-1">ID do Cliente (opcional): Identificação única do cliente associado ao contrato.</li>
    </ul>

    --break--
    <h2 class="subtitle">Datas</h2>
    <ul class="list-disc pl-6">
      <li class="mb-1">Data de Criação: Data de criação do contrato.</li>
      <li class="mb-1">Data de Atualização: Data da última atualização do contrato.</li>
    </ul>
`;

const help_contrato_verified = `

`;

const help_contrato_not_verified = `

`;


// USERS

const help_users_page = `
  Aqui, você vai dar uma olhada nos perfis de todos os usuários. Cada cartão mostra coisas como nome, e-mail e número de telefone.
  Se alguma info estiver faltando, terá um traço (-) no lugar.
  <br />
  <br />
  Além disso, para facilitar ainda mais, há um <b>campo de busca</b> que permite encontrar os clientes pelo nome, e-mail ou telefone. 
  Basta digitar para localizar rapidamente o usuário desejado.

  --break--
  Quando você clica em "Ver contratos", pode conferir os contratos associados a esse usuário. Já em "Ver dados", apresentamos detalhes mais específicos sobre ele.
  <br />
  <br />
  Os cartões foram pensados para simplificar a visualização e facilitar o gerenciamento das informações dos usuários.
  `;

const help_single_user = `
  Esta página apresenta uma visão geral dos detalhes de um cliente.
  <br />
  <br />
  Aqui, estão reunidas informações essenciais como nome, endereço, informações de contato e outros detalhes pertinentes para oferecer uma compreensão rápida e completa sobre quem é esse cliente e como se comunicar com ele, se necessário.
`;

export {
  help_contratos,
  help_novo_contrato,
  help_single_user,
  help_users_page,
  help_contrato_verified,
  help_contrato_not_verified
};
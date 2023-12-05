// Para dividir o conteudo do modal em partes/páginas, basta adioconar a tag --break-- e o conteúdo será separado.

// CONTRATOS 
// <li>Nome do Cliente: Encontre contratos associados a clientes específicos inserindo o nome do cliente desejado.</li>

const help_contratos = `
  Nesta página, os contratos são exibidos em formato de grid ou colunas para facilitar a visualização. Cada card representa um contrato e inclui as seguintes informações:

  --break--
  <h2 class="subtitle">Informações Gerais</h2>
  <ul class="list-disc pl-6">
    <li>Nome do Contrato: Identificação com o nome do cliente do contrato.</li>
    <li>Status de Assinatura: Indica se o contrato está "Em Andamento", "Concluído" ou "Pendente".</li>
    <li>Data: Mostra a data de vencimento do contrato.</li>
  </ul>

  --break--
  <h2 class="subtitle">Filtros</h2>
  <ul class="list-disc pl-6">
    <li>Duração: Refina a busca por contratos com uma determinada duração.</li>
    <li>Próximo do Vencimento: Visualize contratos que estão próximos do vencimento para uma gestão mais eficaz.</li>
    <li>Status de Assinatura: Filtra os contratos por status de assinatura, podendo ser "Assinado", "Não Assinado" ou todos.</li>
  </ul>

  --break--
  <h2 class="subtitle">Novo contrato</h2>
  <ul class="list-decimal pl-6">
      <li class="ml-">Acesse a opção <b>"Novo contrato"</b> na página correspondente.</li>
      <li class="ml-">Preencha os detalhes do contrato, incluindo duração, clientes envolvidos e data de vencimento.</li>
      <li class="ml-">Revise todas as informações inseridas.</li>
      <li class="ml-">Confirme a criação do contrato.</li>
  </ul>
`;

const help_novo_contrato = `
    <p>
      Ao criar um contrato na Bluepen, você desfruta de diversas facilidades que simplificam o processo. Detalhamos cada etapa para ajudar a aproveitar ao máximo essas vantagens:
    </p>

    --break--
    <h2 class="subtitle">Detalhes do contrato:</h2>
    <ul class="list-disc pl-6">
      <li class="mb-2">Itens da Proposta: Lista dos itens propostos para o contrato.</li>
      <li class="mb-2">Serviços: Lista dos serviços incluídos no contrato.</li>
    </ul>

    --break--
    <h2 class="subtitle">Detalhes do contrato:</h2>
    <ul class="list-disc pl-6">
      <li class="mb-2">Níveis de Suporte: Lista dos níveis de suporte oferecidos.</li>
      <li class="mb-2">Valores de Implantação: Lista dos valores de implantação associados a diferentes serviços.</li>
    </ul>

    --break--
    <h2 class="subtitle">Informações Gerais</h2>
    <ul class="list-disc pl-6">
    <li class="mb-1">Cliente relacionado: Seleção do cliente associado ao contrato.</li>
    <li class="mb-1">Data de Início: Data prevista para o início do contrato.</li>
    <li class="mb-1">Duração: Duração em meses do contrato.</li>
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

const help_edicao_perfil = `
  Bem-vindo à página de edição de perfil! Aqui, você tem o controle para atualizar e manter suas informações pessoais sempre em dia.

  --break--
  <h2 class="subtitle">Campos Disponíveis</h2>
  <ul class="list-disc pl-6">
    <li>Nome: Insira seu nome completo.</li>
    <li>Telefone: Adicione seu número de telefone.</li>
    <li>Celular: Informe seu número de celular, se aplicável.</li>
    <li>Endereço: Digite seu endereço residencial completo.</li>
  </ul>

  --break--
  <h2 class="subtitle">Campos Disponíveis</h2>
  <ul class="list-disc pl-6">
    <li>Número: Adicione o número da residência, se aplicável.</li>
    <li>Complemento: Caso necessário, forneça detalhes adicionais sobre o endereço.</li>
    <li>Cidade: Informe a cidade onde reside.</li>
    <li>CEP: Insira seu CEP para identificação de localização.</li>
  </ul>

  --break--
  <h2 class="subtitle">Atualização de Senha</h2>
  <ul class="list-disc pl-6">
    <li>Senha: Se preferir, digite sua senha atual para confirmar a edição ou, caso queira atualizar, insira uma nova senha.</li>
  </ul>

  --break--
  <h2 class="subtitle">Confirmação e Salvar</h2>
  <ul class="list-decimal pl-6">
    <li class="ml-">Verifique se todas as informações estão corretas antes de salvar.</li>
    <li class="ml-">Ao finalizar as alterações, clique no botão "Salvar" para confirmar as mudanças.</li>
  </ul>

  --break--
  Estamos aqui para ajudar! Em caso de dúvidas ou problemas durante a edição do perfil, nossa equipe de suporte está pronta para fornecer assistência.
`;



export {
  help_contratos,
  help_novo_contrato,
  help_single_user,
  help_users_page,
  help_contrato_verified,
  help_contrato_not_verified,
  help_edicao_perfil
};
import { formatDate } from "../formatters";
import { contractStyle } from "./style";

const propostaItens = [
    "Implantar um servidor Windows Server 2019 que ficará com a função de servidor de armazenamento de arquivos, possuindo controle de acessos na rede com senha para cada usuário gerenciando a rede de forma mais complexa;",
    "Implantar um Mikrotik com função de failover de internet (redundância de internet), caso o link principal sofra uma falha ou interrompendo do serviço, o aparelho realiza a troca do link de forma automática. Mantendo a conexão e acesso à internet, estável;",
    "O backup será realizado de todos os arquivos sendo uma cópia dentro do servidor, em serviço em nuvem e utilizando uma cópia sombra caso alguém delete arquivos importantes na rede, agilizando o processo de restauração. (Contratação das plataformas de backup devem ser feitas pelo cliente);"
];

const servicesArray = [
    "Manutenção em Máquinas Windows.",
    "Manutenção em Servidores Windows.",
    "Manutenção em Backup de Servidores e Máquinas.",
    "Backup em nuvem utilizando serviço em nuvem.",
    "Monitoramento da rede com Pandora e RDPGuard.",
    "Proteção de infraestrutura.",
    "Terminal Service – Permite o acesso de cliente/estações remotas para uso do recurso da Rede Local.",
    "Serviço de AD (Active Directory) – Segurança completa conforme a LGPD(Lei de Proteção dos Dados).",
    "Configuração de hardware (impressoras, scanner, wireless)."
];

const niveisDeSuporte = [
    "Realização de manutenção preventiva e corretiva no hardware e software dos computadores e servidores do cliente.",
    "Utilização Pandora para monitorar o servidor e a rede, para que nos alerte qualquer tipo de anormalidade que possa estar ocorrendo.",
    "Utilização RdpGuard para prevenção contra ramsoware e possíveis ataques na rede."
];

const formasDeAtendimento = [
    "Atendimento Telefônico (móvel): 08:00 às 18:00 (seg à sex) – 09:00 às 12:00 (sábado) exclusivo para clientes com contrato de suporte mensal.",
    "Atendimento remoto: Imediato, após contato telefônico, ou por iniciativa de nossos técnicos caso seja observada a necessidade de alguma atualização de emergência.",
    "Atendimento Presencial: Caso a solução dos problemas não possa ser realizada remotamente o técnico vai até o local."
];

const company_name = "PH informática";
const company_CNPJ = "34.826.119/0001-30";

const valoresImplantacao = [
    { servico: "Formatação e Configuração Windows Server 2019", valor: 1000 },
    { servico: "Configuração Failover de Internet + Mikrotik", valor: 800 },
    { servico: "Configuração Backup’s", valor: 500 },
];
const total = valoresImplantacao.reduce((acc, curr) => acc + curr.valor, 0);

export const Template =
    `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">
            ${contractStyle}
        </style>
        <title>Contrato de Serviços</title>
    </head>

    <body contenteditable="true">
        <section class="every_section">
            <header>
                <span class="company_name">${company_name}</span>
                <span class="date">${formatDate(new Date())}</span>
            </header>

            <h3 class="title">Apresentação:</h3>
            <p>
                A PH Informática fundada em 2013 tem como objetivo principal oferecer serviços de Suporte em Informática e Rede visando facilitar e dinamizar o dia a dia das empresas que necessitam de agilidade e funcionalidade em sua rede de computadores e servidores Windows.
            </p>

            <h3 class="title">Da Prestação de Serviços:</h3>
            <p>
                Oferecemos técnico fixo em nossa empresa, altamente qualificado para desempenhar, dentre outras funções, as que seguem:
            </p>
            <ul>
                ${servicesArray.map((service) => `<li>${service}</li>`).join("")}
            </ul>

            <h3 class="title">Níveis de Suporte:</h3>
            <ul>
                ${niveisDeSuporte.map(item => {
        return `
                    <li>${item}</li>
                `;
    }).join("")}
            </ul>
        </section>

        <section class="every_section">
            <header>
                <span class="company_name">${company_name}</span>
                <span class="date">${formatDate(new Date())}</span>
            </header>

            <h3 class="title">Formas de atendimento:</h3>
            <ul>
                ${formasDeAtendimento.map(item => {
        return `
                    <li>${item}</li>
                `;
    }).join("")}
            </ul>

            <h3 class="title">Proposta:</h3>
            <p>
                Esta proposta tem a intenção de aplicar os serviços listados abaixo:
            </p>
            <ul>
                ${propostaItens.map(item => {
        return `
                    <li>${item}</li>
                `;
    }).join("")}
            </ul>
        </section>

        <section class="every_section">
            <header>
                <span class="company_name">${company_name}</span>
                <span class="date">${formatDate(new Date())}</span>
            </header>

            <h3 class="title">Sistema de backup:</h3>
            <h4>Sistema de backup interno:</h4>
            <ul>
                <li>Diariamente no servidor;</li>
                <li>Diariamente em hd externo (caso o cliente possua);</li>
            </ul>

            <h4>Sistema de backup na nuvem:</h4>
            <ul>
                <li>Diariamente todos os arquivos da rede, aplicação e banco de dados se o cliente preferir;</li>
                <li>Sincronização simultânea com a nuvem;</li>
            </ul>

            <h3 class="title">Valores da Implantação:</h3>
            <table>
                <tr>
                    <th>Serviço</th>
                    <th>Valor</th>
                </tr>
                ${valoresImplantacao.map(item => {
        return `
                    <tr>
                        <td>${item.servico}</td>
                        <td>R$ ${item.valor}</td>
                    </tr>
                    `;
    }).join("")}
                <tr>
                    <td>TOTAL</td>
                    <td>R$ ${total}</td>
                </tr>
            </table>

            <h3 class="title">Condições:</h3>
            <ul>
                <li>5% de desconto para pagamento à vista (PIX 34 826 119 0001 30)</li>
                <li>1 + 1 no boleto.</li>
            </ul>

            <h3 class="title">Dos prazos de execução:</h3>
            <ul>
                <li>Serviço será executado no prazo de 1 (uma) semana, assim que estivermos com servidor em mãos.</li>
                <li>Caso ocorra imprevistos a Ph Informática irá informar da necessidade de ampliação do prazo, apresentando o motivo da necessidade.</li>
            </ul>
        </section>

        <section class="every_section">
            <header>
                <span class="company_name">${company_name}</span>
                <span class="date">${formatDate(new Date())}</span>
            </header>
            <h3 class="title">Suporte</h3>
        
            <h4 class="subtitle">Chamado (Avulso):</h4>
            <ul>
                <li>R$ 150,00 hora técnica presencial – Atendimento presencial respeitando fila de chamado;</li>
                <li>R$ 100,00 hora técnica remota – Atendimento remoto respeitando fila de chamado.</li>
            </ul>

            <h4 class="subtitle">Mensal (Contrato):</h4>
            <ul>
                <li>R$ x Mensal – com suporte remoto ilimitado e com 5 horas de visita técnicas no local;</li>
                <li>R$ x para cada hora de visita técnica extrapolada;</li>
                <li>Contrato com validade de 30 (trinta) dias, renovado automaticamente em caso de não manifestação expressa das partes, sem multa de rescisão;</li>
                <li>Prioridade na fila de chamado.</li>
            </ul>
            
            <div class="assinatura">
                <p>Ponta Grossa, ${formatDate(new Date())}</p>
                <div class="linha_assinatura">
                    <span class="linha"></span>
                    <div class="names">
                        <span>${company_name}</span>
                        <span>${company_CNPJ}</span>
                    </div>
                </div>
            </div>
        </section>
    </body>
  </html>
  `;

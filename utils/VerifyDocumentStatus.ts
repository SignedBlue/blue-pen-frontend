export function VerifyDocumentStatus(status: string) {
  switch (status) {
    case "NOT_SENT":
      return "Não enviado";
    case "PENDING":
      return "Pendente";
    case "AWAITING_APPROVAL":
      return "Aguardando Aprovação";
    case "APPROVED":
      return "Aprovado";
    case "REJECTED":
      return "Rejeitado";
    default:
      return "Desconhecido";
  }
}
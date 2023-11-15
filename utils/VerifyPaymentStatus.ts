export function VerifyPaymentStatus(status: TPaymentStatus) {
  switch (status) {
    case "OVERDUE":
      return "Atrasado";
    case "PENDING":
      return "Pendente";
    case "PAID":
      return "Pago";
    default:
      return "Aguardando";
  }
}
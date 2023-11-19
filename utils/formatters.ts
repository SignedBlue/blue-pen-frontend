const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.length === 11 ? cleaned.match(/(\d{2})(\d{5})(\d{4})/) : cleaned.match(/(\d{2})(\d{4})(\d{4})/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

const formatPostalCode = (postalCode: string) => {
  return postalCode.replace(/^(\d{2})(\d{3})(\d{3})$/, "$1$2-$3");
};

const formatCPF = (cpf: string) => {
  const cleaned = cpf.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }
  return cpf;
};

const cleanMask = (mask: string): string => {
  return mask.replace(/[.\-/()\s]/g, "");
};

const formatDate = (date: Date): string => {
  const formattedDate: string = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

  return formattedDate;
};

export {
  formatPhoneNumber,
  formatPostalCode,
  formatCPF,
  cleanMask,
  formatDate
};
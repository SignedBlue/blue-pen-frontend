const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.length === 11 ? cleaned.match(/(\d{2})(\d{5})(\d{4})/) : cleaned.match(/(\d{2})(\d{4})(\d{4})/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

function reformatPhoneNumber(phoneNumber: string): string {
  const cleaned = ("" + phoneNumber).replace(/\D/g, ""); // Remove non-numeric characters

  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // If the number doesn't match the expected pattern, return the original value
  return phoneNumber;
}

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

const calculateExpirationDate = (dataInicio: string, duracaoMeses: number): Date => {
  const startDate = new Date(dataInicio);
  const expirationDate = new Date(startDate);
  expirationDate.setMonth(expirationDate.getMonth() + duracaoMeses);
  return expirationDate;
};

const formatDecimal = (value: number): string => {
  const hasDecimal = value % 1 !== 0;

  if (!hasDecimal) {
    return `${value.toFixed(0)},00`;
  } else {
    return value.toString();
  }
};

export {
  formatPhoneNumber,
  reformatPhoneNumber,
  formatPostalCode,
  formatCPF,
  cleanMask,
  formatDate,
  calculateExpirationDate,
  formatDecimal
};
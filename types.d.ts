/** @type erros possiveis para criação de novos usuarios*/
type TCreatedUser = {
  state: "Error";
  statusCode: 409;
  payload: {
    statusCode: number;
    error: "Conflict";
    message: string;
  }
}

// login request user
type TUserType = "admin" | "client" | null;

type User = {
  id: string;
  name: string;
  email: string;
  user_type: TUserType;
  verified?: boolean | string;
  gateway_id: string
}

type TSuccessLogin = {
  state: "Success";
  token: string;
  user: User;
}

type TErrorLogin = {
  state: "Error";
  statusCode: 401 | 404;
  payload: {
    statusCode: number;
    error: "Unauthorized" | "Not Found";
    message: string;
  }
}

type TAuthResponse =
  | TSuccessLogin
  | TErrorLogin

type TDocumentStatus = "NOT_SENT" | "PENDING" | "AWAITING_APPROVAL" | "APPROVED" | "REJECTED";

type TUserData = {
  id: string;
  name: string;
  email: string;
  password: string;
  api_key: string;
  wallet_id: string;
  reject_reasons: null | string[];
  gateway_id: string;
  document_status: TDocumentStatus;
  user_type: TUserType;
  address: {
    city: string;
    number: string;
    street: string;
    complement: string;
    postal_code: string;
  };
  birthdate: string;
  cpf: string;
  verified: null | boolean;
  phone: string;
  created_at: null | string;
  updated_at: null | string;
}

type TContract = {
  url: string;
  id: string;
  duration: number;
  start_date: string;
  hash: null | string;
  sign_date: null | string;
  terminated_by: null | string;
  termination_date: null | string;
  details: {
    propostaItens: string[];
    servicesArray: string[];
    niveisDeSuporte: string[];
    formasDeAtendimento: string[];
    valoresImplantacao: {
      valor: number;
      servico: string;
    }[];
  };
  client_id: string;
  created_at: Date;
  updated_at: Date;
  client: TUserData;
}

type TUserContract = {
  id: string;
  contract_id: string;
  user_id: string;
  signature_token: string;
  user_ip: string | null;
  signed: boolean;
  user_type: TUserType;
  signed_date: string;
  created_at: string | null;
  updated_at: string | null;
}

type TPaymentStatus = "PENDING" | "PAID" | "OVERDUE";

type TPayment = {
  id: string;
  payment_date: Date | null
  value: number
  fine: number
  interest: number
  client_id: string
  bank_slip: string;
  due_date: Date | null;
  status: TPaymentStatus;
  contract_id: string;
  created_at: Date | null;
  updated_at: Date | null;
}

interface NewContract {
  duration: number;
  start_date: string;
  details: {
    propostaItens: string[];
    servicesArray: string[];
    niveisDeSuporte: string[];
    formasDeAtendimento: string[];
    valoresImplantacao: {
      valor: number;
      servico: string;
    }[];
  };
  metadata: {
    origin: string;
  }
  client_id?: string;
  created_at: Date;
  updated_at: Date;
}

interface ContractResponse {
  data: TContract[];
  total: number;
}

interface IPaymentResponse {
  data: TPayment[];
  total: number;
}

interface ContractReq {
  contract: TContract;
}

type TErrorAsaas = {
  state: "Error";
  statusCode: number;
  payload: {
    statusCode: number;
    error: string;
    message: string;
  }
}

type TSuccessAsaas = {
  state: "Success";
  rejectReasons: null;
  data: {
    id: string;
    status: "NOT_SENT" | "PENDING" | "AWAITING_APPROVAL" | "APPROVED" | "REJECTED";
    type: "IDENTIFICATION";
    title: string;
    description: string;
    responsible: {
      name: string;
      type: "ASAAS_ACCOUNT_OWNER";
    };
    onboardingUrl: null | string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    documents: any[];
  }[];
}

type TAsaasResponse = TErrorAsaas | TSuccessAsaas;

interface DataResponse {
  data: TUserData[];
}

interface ContractUsers {
  user_id: string;
  contract_id: string;
  user_type: TUserType;
}

interface IUserContract {
  data: TUserContract[];
}
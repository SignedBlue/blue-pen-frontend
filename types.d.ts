// login request user
type User = {
  id: string;
  name: string;
  email: string;
  user_type: string;
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
  statusCode: number;
  payload: {
    statusCode: number;
    error: string;
    message: string;
  }
}

type TAuthResponse =
  | TSuccessLogin
  | TErrorLogin

interface TContract {
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

interface ContractReq {
  contract: TContract;
}

interface AsaasResponse {
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

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  api_key: string;
  wallet_id: string;
  reject_reasons: null | string[];
  gateway_id: string;
  document_status: "not_send" | string | null;
  user_type: "admin" | "user" | string;
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

interface DataResponse {
  data: UserData[];
}

interface ContractUsers {
  user_id: string;
  contract_id: string;
  user_type: string;
}
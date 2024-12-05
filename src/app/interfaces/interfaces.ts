export interface ModalAssinaturaProps {
  status: string;
  onChange: (status: string) => void;
  valor: number;
}


export interface Cliente {
  address: string,
  addressNumber: number,
  addresComplement?: string
  complement?: string
  cityName: string,
  cpfCnpj: string,
  email: string,
  id: string,
  phone?:string,
  mobilePhone: number,
  name: string,
  postalCode: number,
  province:  string,
  state: string
}

export interface Assinatura {
  customer: string,
  billingType: string,
  value: number,
  nextDueDate: Date,
  cycle: string,
  description?: string,
  remoteIp: string
  creditCard: CreditCard
  creditCardHolderInfo: CreditCardHolderInfo
}

interface CreditCard {
  holderName: string,
  number: string,
  expiryMonth: string,
  expiryYear: string,
  ccv: string
}

interface CreditCardHolderInfo {
  name: string,
  email: string,
  cpfCnpj: string,
  postalCode: string,
  addressNumber: string,
  addressComplement: string,
  mobilePhone: string
}
export class TokenType {
  token!: string;
  refreshToken!: string;
}

export interface TokenResponseOK {
  statusCode?: number;
  message?: string;
  datas?: TokenType;
}

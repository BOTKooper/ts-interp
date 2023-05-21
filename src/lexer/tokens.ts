export enum TokenType {
  ILLEGAL = "ILLEGAL",
  EOF = "EOF",

  // Identifiers + literals
  IDENT = "IDENT",
  INT = "INT",
  TRUE = "TRUE",
  FALSE = "FALSE",

  // Operators
  ASSIGN = "ASSIGN",
  PLUS = "PLUS",
  MINUS = "MINUS",
  BANG = "BANG",
  ASTERISK = "ASTERISK",
  SLASH = "SLASH",
  LT = "LT",
  GT = "GT",
  EQ = "EQ",
  NOT_EQ = "NOT_EQ",
  AND = "AND",
  OR = "OR",
  GTE = "GTE",
  LTE = "LTE",
  BITWISE_AND = "BITWISE_AND",
  BITWISE_OR = "BITWISE_OR",


  // Delimiters
  COMMA = "COMMA",
  SEMICOLON = "SEMICOLON",
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  LBRACE = "LBRACE",
  RBRACE = "RBRACE",

  // Keywords
  FUNCTION = "FUNCTION",
  LET = "LET",
  IF = "IF",
  ELSE = "ELSE",
  RETURN = "RETURN",
}

export const keywords = new Map<string, TokenType>([
  ["fn", TokenType.FUNCTION],
  ["let", TokenType.LET],
  ["if", TokenType.IF],
  ["else", TokenType.ELSE],
  ["return", TokenType.RETURN],
  ["true", TokenType.TRUE],
  ["false", TokenType.FALSE],
]);

export class Token {
  type: TokenType;
  literal: string;

  constructor(type: TokenType, literal: string) {
    this.type = type;
    this.literal = literal;
  }
}
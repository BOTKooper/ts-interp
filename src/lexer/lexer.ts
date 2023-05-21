import { Token, TokenType, keywords } from "./tokens";

const charToTokenMap = new Map<string, TokenType | undefined>([
  ["=", TokenType.ASSIGN],
  [";", TokenType.SEMICOLON],
  ["(", TokenType.LPAREN],
  [")", TokenType.RPAREN],
  [",", TokenType.COMMA],
  ["+", TokenType.PLUS],
  ["{", TokenType.LBRACE],
  ["}", TokenType.RBRACE],
  ["", TokenType.EOF],
  ["-", TokenType.MINUS],
  ["!", TokenType.BANG],
  ["*", TokenType.ASTERISK],
  ["/", TokenType.SLASH],
  ["<", TokenType.LT],
  [">", TokenType.GT],
  ["==", TokenType.EQ],
  ["!=", TokenType.NOT_EQ],
  ["&&", TokenType.AND],
  ["||", TokenType.OR],
  [">=", TokenType.GTE],
  ["<=", TokenType.LTE],
  ["&", TokenType.BITWISE_AND],
  ["|", TokenType.BITWISE_OR]
]);

export class Lexer {
  input: string;
  position: number = 0;
  readPosition: number = 0;
  ch!: string;

  constructor(input: string) {
    this.input = input;
    this.readChar();
  }

  readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.ch = "";
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  peekChar(): string | 0 {
    if (this.readPosition >= this.input.length) {
      return 0;
    } else {
      return this.input[this.readPosition];
    }
  }

  nextToken(): Token {
    let token: Token;

    this.skipWhitespace();

    if (this.isPeekable(this.ch)) {
      const peek = this.peekChar();
      if (peek !== 0 && charToTokenMap.has(this.ch + peek)) {
        token = new Token(charToTokenMap.get(this.ch + peek), this.ch + peek);
        
        this.readChar();
        this.readChar();
        return token;
      }
    }

    if (charToTokenMap.has(this.ch)) {
      token = new Token(charToTokenMap.get(this.ch), this.ch);

      this.readChar();
      return token;
    }

    if (this.isValidIdentifierChar(this.ch)) {
      const ident = this.readIdentifier();
      token = new Token(this.getTokenTypeForIdentifier(ident), ident);
      return token;
    }

    if (this.isDigit(this.ch)) {
      const number = this.readNumber();
      token = new Token(TokenType.INT, number);
      return token;
    }

    token = new Token(TokenType.ILLEGAL, this.ch);

    this.readChar();
    return token;
  }

  skipWhitespace(): void {
    while (
      this.ch === " " ||
      this.ch === "\t" ||
      this.ch === "\n" ||
      this.ch === "\r"
    ) {
      this.readChar();
    }
  }

  getTokenTypeForIdentifier(identifier: string): TokenType {
    if (this.isKeyword(identifier)) {
      return keywords.get(identifier);
    }
    return TokenType.IDENT;
  }

  readIdentifier(): string {
    const position = this.position;
    while (this.isValidIdentifierChar(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }

  readNumber(): string {
    const position = this.position;
    while (this.isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }

  isValidIdentifierChar(char: string): boolean {
    return /[a-zA-Z_]/.test(char);
  }

  isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  isKeyword(identifier: string): boolean {
    return keywords.has(identifier);
  }

  isPeekable(ch: string): boolean {
    return (
      ch === "=" ||
      ch === "!" ||
      ch === "<" ||
      ch === ">" ||
      ch === "&" ||
      ch === "|"
    );
  }
}

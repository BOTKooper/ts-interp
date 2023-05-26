import { TExpressionStatement, TIdentifier, TLetStatement, TProgram, TReturnStatement } from '../ast/ast';
import { Lexer } from "../lexer/lexer";
import { Token, TokenType } from "../tokens/tokens";



export class Parser {
  l: Lexer;

  curToken: Token;
  peekToken: Token;

  constructor(l: Lexer) {
    this.l = l;

    l.nextToken();
    l.nextToken();
  }

  nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.l.nextToken();
  }

  parseProgram() {
    const program = new TProgram();

    while (!this.curTokenIs(TokenType.EOF)) {
      const stmt = this.parseStatement();
      if (stmt) {
        program.statements.push(stmt);
      }
      this.nextToken();
    }

    return program;
  }

  curTokenIs(t: TokenType) {
    return this.curToken.type === t;
  }

  peekTokenIs(t: TokenType) {
    return this.peekToken.type === t;
  }

  expectPeek(t: TokenType) {
    if (this.peekTokenIs(t)) {
      this.nextToken();
      return true;
    } else {
      return false;
    }
  }

  parseStatement() {
    switch (this.curToken.type) {
      case 'LET':
        return this.parseLetStatement();
      case 'RETURN':
        return this.parseReturnStatement();
      default:
        return this.parseExpressionStatement();
    }
  }

  parseLetStatement() {
    const curToken = this.curToken;

    if (!this.expectPeek(TokenType.IDENT)) {
      return null;
    }

    const name = new TIdentifier(this.curToken, this.curToken.literal);

    if (!this.expectPeek(TokenType.ASSIGN)) {
      return null;
    }

    this.nextToken();

    let value = this.parseExpression();

    if (this.peekTokenIs(TokenType.SEMICOLON)) {
      this.nextToken();
    }

    return new TLetStatement(curToken, name, value);
  }

  parseReturnStatement() {
    const statement = new TReturnStatement(this.curToken);

    this.nextToken();

    statement.returnValue = this.parseExpression();

    if (this.peekTokenIs(TokenType.SEMICOLON)) {
      this.nextToken();
    }

    return statement;
  }

  parseExpression() {
    return null;
  }

  parseExpressionStatement() {
    const statement = new TExpressionStatement(this.curToken);

    statement.expression = this.parseExpression();

    if (this.peekTokenIs(TokenType.SEMICOLON)) {
      this.nextToken();
    }

    return statement;
  }
}


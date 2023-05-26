import { Token } from '../tokens/tokens';

export interface TNode {
  tokenLiteral(): string;
  string(): string;
}

export interface TStatement extends TNode {}

export interface TExpression extends TNode {}

export class TIdentifier implements TExpression {
  token: Token;
  value: string;

  constructor(token: Token, value: string) {
    this.token = token;
    this.value = value;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }

  string(): string {
    return this.value;
  }
}

export class TLetStatement implements TStatement {
  token: Token;
  name: TIdentifier;
  value: TExpression;

  constructor(token: Token, name: TIdentifier, value: TExpression) {
    this.token = token;
    this.name = name;
    this.value = value;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }

  string(): string {
    return `${this.tokenLiteral()} ${this.name.string()} = ${this.value.string()};`;
  }
}

export class TReturnStatement implements TStatement {
  token: Token;
  returnValue: TExpression;

  constructor(token: Token, returnValue: TExpression = null) {
    this.token = token;
    this.returnValue = returnValue;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }

  string(): string {
    return `${this.tokenLiteral()} ${this.returnValue.string()};`;
  }
}

export class TExpressionStatement implements TStatement {
  token: Token;
  expression: TExpression;

  constructor(token: Token, expression: TExpression = null) {
    this.token = token;
    this.expression = expression;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }

  string(): string {
    return this.expression.string();
  }
}

export class TProgram implements TNode {
  statements: TStatement[] = [];

  constructor(statements: TStatement[] = []) {
    this.statements = statements;
  }

  tokenLiteral() {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral();
    } else {
      return '';
    }
  }

  string() {
    return this.statements.map(s => s.string()).join('');
  }
}

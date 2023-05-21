import { describe, it, expect } from "vitest";
import { Token, TokenType } from "./tokens";
import { Lexer } from "./lexer";

describe("Lexer", () => {
  it("exists and initializes", () => {
    const lexer = new Lexer("1 + 2");

    expect;
    expect(lexer.input).toEqual("1 + 2");
    expect(lexer.position).toEqual(0);
    expect(lexer.readPosition).toEqual(1);
    expect(lexer.ch).toEqual('1');
  });

  it("1", () => {
    const input = "=+(){},;";
    const lexer = new Lexer(input);

    const expectedTokens = [
      [TokenType.ASSIGN, "="],
      [TokenType.PLUS, "+"],
      [TokenType.LPAREN, "("],
      [TokenType.RPAREN, ")"],
      [TokenType.LBRACE, "{"],
      [TokenType.RBRACE, "}"],
      [TokenType.COMMA, ","],
      [TokenType.SEMICOLON, ";"],
      [TokenType.EOF, ""]
    ];

    expectedTokens.forEach(([expectedType, expectedLiteral]) => {
      const tok = lexer.nextToken(); //?

      expect(tok.type).toEqual(expectedType);
      expect(tok.literal).toEqual(expectedLiteral);
    });
  });

  it("2", () => {
    const input = `let five = 5;
			let ten = 10;
			let add = fn(x, y) {
			x + y;
			};
			let result = add(five, ten);
		`;

    const lexer = new Lexer(input);

    const expectedTokens = [
      [TokenType.LET, "let"],
      [TokenType.IDENT, "five"],
      [TokenType.ASSIGN, "="],
      [TokenType.INT, "5"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.LET, "let"],
      [TokenType.IDENT, "ten"],
      [TokenType.ASSIGN, "="],
      [TokenType.INT, "10"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.LET, "let"],
      [TokenType.IDENT, "add"],
      [TokenType.ASSIGN, "="],
      [TokenType.FUNCTION, "fn"],
      [TokenType.LPAREN, "("],
      [TokenType.IDENT, "x"],
      [TokenType.COMMA, ","],
      [TokenType.IDENT, "y"],
      [TokenType.RPAREN, ")"],
      [TokenType.LBRACE, "{"],
      [TokenType.IDENT, "x"],
      [TokenType.PLUS, "+"],
      [TokenType.IDENT, "y"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.RBRACE, "}"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.LET, "let"],
      [TokenType.IDENT, "result"],
      [TokenType.ASSIGN, "="],
      [TokenType.IDENT, "add"],
      [TokenType.LPAREN, "("],
      [TokenType.IDENT, "five"],
      [TokenType.COMMA, ","],
      [TokenType.IDENT, "ten"],
      [TokenType.RPAREN, ")"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.EOF, ""]
    ];

    expectedTokens.forEach(([expectedType, expectedLiteral]) => {
      const tok = lexer.nextToken();


      expect(tok.type).toEqual(expectedType);
      expect(tok.literal).toEqual(expectedLiteral);
    });
  });

	it("3", () => {
    const input = `let five = 5;
		let ten = 10;
		let add = fn(x, y) {
		x + y;
		};
		let result = add(five, ten);
		!-/*5;
		5 < 10 > 5;
		`;

    const lexer = new Lexer(input);

    const expectedTokens = [
      [TokenType.LET, "let"],
      [TokenType.IDENT, "five"],
      [TokenType.ASSIGN, "="],
      [TokenType.INT, "5"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.LET, "let"],
      [TokenType.IDENT, "ten"],
      [TokenType.ASSIGN, "="],
      [TokenType.INT, "10"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.LET, "let"],
      [TokenType.IDENT, "add"],
      [TokenType.ASSIGN, "="],
      [TokenType.FUNCTION, "fn"],
      [TokenType.LPAREN, "("],
      [TokenType.IDENT, "x"],
      [TokenType.COMMA, ","],
      [TokenType.IDENT, "y"],
      [TokenType.RPAREN, ")"],
      [TokenType.LBRACE, "{"],
      [TokenType.IDENT, "x"],
      [TokenType.PLUS, "+"],
      [TokenType.IDENT, "y"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.RBRACE, "}"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.LET, "let"],
      [TokenType.IDENT, "result"],
      [TokenType.ASSIGN, "="],
      [TokenType.IDENT, "add"],
      [TokenType.LPAREN, "("],
      [TokenType.IDENT, "five"],
      [TokenType.COMMA, ","],
      [TokenType.IDENT, "ten"],
      [TokenType.RPAREN, ")"],
      [TokenType.SEMICOLON, ";"],
			[TokenType.BANG, "!"],
			[TokenType.MINUS, "-"],
			[TokenType.SLASH, "/"],
			[TokenType.ASTERISK, "*"],
			[TokenType.INT, "5"],
			[TokenType.SEMICOLON, ";"],
			[TokenType.INT, "5"],
			[TokenType.LT, "<"],
			[TokenType.INT, "10"],
			[TokenType.GT, ">"],
			[TokenType.INT, "5"],
			[TokenType.SEMICOLON, ";"],
      [TokenType.EOF, ""]
    ];

    expectedTokens.forEach(([expectedType, expectedLiteral]) => {
      const tok = lexer.nextToken();


      expect(tok.type).toEqual(expectedType);
      expect(tok.literal).toEqual(expectedLiteral);
    });
  });

	it("4", () => {
    const input = `let five = 5;
		let ten = 10;
		let add = fn(x, y) {
		x + y;
		};
		let result = add(five, ten);
		!-/*5;
		5 < 10 > 5;
		
		if (5 < 10) {
		return true;
		} else {
		return false;
		}`;

    const lexer = new Lexer(input);

    const expectedTokens = [
      [TokenType.LET, "let"],
      [TokenType.IDENT, "five"],
      [TokenType.ASSIGN, "="],
      [TokenType.INT, "5"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.LET, "let"],
      [TokenType.IDENT, "ten"],
      [TokenType.ASSIGN, "="],
      [TokenType.INT, "10"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.LET, "let"],
      [TokenType.IDENT, "add"],
      [TokenType.ASSIGN, "="],
      [TokenType.FUNCTION, "fn"],
      [TokenType.LPAREN, "("],
      [TokenType.IDENT, "x"],
      [TokenType.COMMA, ","],
      [TokenType.IDENT, "y"],
      [TokenType.RPAREN, ")"],
      [TokenType.LBRACE, "{"],
      [TokenType.IDENT, "x"],
      [TokenType.PLUS, "+"],
      [TokenType.IDENT, "y"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.RBRACE, "}"],
      [TokenType.SEMICOLON, ";"],
      [TokenType.LET, "let"],
      [TokenType.IDENT, "result"],
      [TokenType.ASSIGN, "="],
      [TokenType.IDENT, "add"],
      [TokenType.LPAREN, "("],
      [TokenType.IDENT, "five"],
      [TokenType.COMMA, ","],
      [TokenType.IDENT, "ten"],
      [TokenType.RPAREN, ")"],
      [TokenType.SEMICOLON, ";"],
			[TokenType.BANG, "!"],
			[TokenType.MINUS, "-"],
			[TokenType.SLASH, "/"],
			[TokenType.ASTERISK, "*"],
			[TokenType.INT, "5"],
			[TokenType.SEMICOLON, ";"],
			[TokenType.INT, "5"],
			[TokenType.LT, "<"],
			[TokenType.INT, "10"],
			[TokenType.GT, ">"],
			[TokenType.INT, "5"],
			[TokenType.SEMICOLON, ";"],
			[TokenType.IF, "if"],
			[TokenType.LPAREN, "("],
			[TokenType.INT, "5"],
			[TokenType.LT, "<"],
			[TokenType.INT, "10"],
			[TokenType.RPAREN, ")"],
			[TokenType.LBRACE, "{"],
			[TokenType.RETURN, "return"],
			[TokenType.TRUE, "true"],
			[TokenType.SEMICOLON, ";"],
			[TokenType.RBRACE, "}"],
			[TokenType.ELSE, "else"],
			[TokenType.LBRACE, "{"],
			[TokenType.RETURN, "return"],
			[TokenType.FALSE, "false"],
			[TokenType.SEMICOLON, ";"],
			[TokenType.RBRACE, "}"],

      [TokenType.EOF, ""]
    ];

    expectedTokens.forEach(([expectedType, expectedLiteral]) => {
      const tok = lexer.nextToken();


      expect(tok.type).toEqual(expectedType);
      expect(tok.literal).toEqual(expectedLiteral);
    });
  });

	it('== && != >= <=', () => {
		const input = `10 == 10 != 9 && false || 5 <= 10 >= 5;`;

		const expectedTokens = [
			[TokenType.INT, "10"],
			[TokenType.EQ, "=="],
			[TokenType.INT, "10"],
			[TokenType.NOT_EQ, "!="],
			[TokenType.INT, "9"],
			[TokenType.AND, "&&"],
			[TokenType.FALSE, "false"],
			[TokenType.OR, "||"],
			[TokenType.INT, "5"],
			[TokenType.LTE, "<="],
			[TokenType.INT, "10"],
			[TokenType.GTE, ">="],
			[TokenType.INT, "5"],
			[TokenType.SEMICOLON, ";"],
			[TokenType.EOF, ""]
		];

		const lexer = new Lexer(input);

		expectedTokens.forEach(([expectedType, expectedLiteral]) => {
			const tok = lexer.nextToken();

			expect(tok.type).toEqual(expectedType);
			expect(tok.literal).toEqual(expectedLiteral);
		});
	});
});

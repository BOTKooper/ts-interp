import { Parser, TLetStatement } from './parser';
import { Lexer } from '../lexer/lexer';

describe('parser', () => {
  it('1=1', () => {
    expect(1).toBe(1);
  })

  const input = `
    let x = 5;
    let y = 10;
    let z = 15;
  `

  const lexer = new Lexer(input);
  const parser = new Parser(lexer);

  const program = parser.parseProgram();

  it('parses program', () => {
    program //?
    expect(program.statements.length).toBe(3);

    ["x", "y", "z"].forEach((expected, i) => {
      const stmt = program.statements[i] as TLetStatement;
      expect(stmt).toBeInstanceOf(TLetStatement);
      expect(stmt).toHaveProperty('name.value', expected);
      expect(stmt.tokenLiteral).toBe(expected);
      expect(stmt).toHaveProperty('name.tokenLiteral', expected);
    });
  });
});
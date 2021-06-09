import { Component, Input, OnInit } from '@angular/core';
import Tree from './lib/tree';

import * as Parser from './lib/parser.js';
import * as Tokenizer from './lib/tokenizer';
import { Token } from './lib/tokenizer';
import { SyntacticStructureMatch } from 'src/app/shared/syntactic-analytic/result/match/syntactic-structure-match';
import { SyntaxNormalized } from 'src/app/shared/syntactic-analytic/util/syntax.normalizer';

@Component({
  selector: 'app-syntactic-tree',
  templateUrl: './syntactic-tree.component.html',
  styleUrls: ['./syntactic-tree.component.scss']
})
export class SyntacticTreeComponent implements OnInit {

  tree = new Tree();
  idCanvas;

  @Input()
  expression?: SyntacticStructureMatch;

  constructor() {
    // this.idCanvas = this.s4();
    this.idCanvas = "canvas";
  }

  ngOnInit(): void {
    this.asyncRenderTree();
  }

  asyncRenderTree() {
    setTimeout(() => {
      const canvas = document.getElementById(this.idCanvas);
      if (canvas) {
        this.tree.setCanvas(canvas);

        if (this.expression) this.update();
      }
    }
      , 100);
  }

  update() {
    try {
      if (this.expression) {
        const inputText = this.transform(this.expression.syntaxInit);
        const tokens = Tokenizer.tokenize(inputText);
        this.validateTokens(tokens);
  
        const syntax_tree = Parser.parse(tokens);
        this.tree.draw(syntax_tree);
      }
    } catch (err) {
      console.log(err);
    }
  }

  transform(syntaxInit: SyntaxNormalized): string {
    const childs = syntaxInit.transitons 
                 ? syntaxInit.transitons.map(it => this.transform(it)).join("") 
                 : this.expression?.textMatch
                                   .filter(it => it.terminal?.code === syntaxInit.syntax.code)
                                   .map(it => it.text)
                                   .join("");
    return `[${syntaxInit.syntax.code} ${childs || ""}]`
  }

  validateTokens(tokens: any[]) {
    if (tokens.length < 3) throw 'Phrase too short';
    if (tokens[0].type != Tokenizer.TokenType.BRACKET_OPEN ||
      tokens[tokens.length - 1].type != Tokenizer.TokenType.BRACKET_CLOSE)
      throw 'Phrase must start with [ and end with ]';
    const brackets = this.countOpenBrackets(tokens);
    if (brackets > 0) throw brackets + ' bracket(s) open [';
    if (brackets < 0) throw Math.abs(brackets) + ' too many closed bracket(s) ]';
    return null;
  }

  countOpenBrackets(tokens: any[]) {
    let o = 0;
    for (const token of tokens) {
      if (token.type == Tokenizer.TokenType.BRACKET_OPEN) ++o;
      if (token.type == Tokenizer.TokenType.BRACKET_CLOSE) --o;
    }
    return o;
  }

  s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)

}

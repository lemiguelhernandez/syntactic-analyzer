import { Component, Input, OnInit } from '@angular/core';
import { SyntaxModel } from 'src/app/model/syntax.model';
import { SyntacticStructureMatch } from 'src/app/shared/syntactic-analytic/result/match/syntactic-structure-match';

@Component({
  selector: 'app-syntactic-language',
  templateUrl: './syntactic-language.component.html',
  styleUrls: ['./syntactic-language.component.sass']
})
export class SyntacticLanguageComponent implements OnInit {

  @Input()
  expression?: SyntacticStructureMatch;

  constructor() { }

  ngOnInit(): void {
  }

  getSyntaxts(): SyntaxModel[] {
    if (this.expression && this.expression.syntacticsStructure && this.expression.syntacticsStructure.syntax) {
      return this.expression.syntacticsStructure.syntax;
    }
    return [];
  }
}

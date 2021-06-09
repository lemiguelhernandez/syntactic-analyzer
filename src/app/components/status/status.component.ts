import { Component, Input, OnInit } from '@angular/core';
import { SyntacticsStructureModel } from 'src/app/model/syntactic-structure-model';
import { SyntaxModel } from 'src/app/model/syntax.model';
import { SyntacticStructureMatch } from 'src/app/shared/syntactic-analytic/result/match/syntactic-structure-match';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @Input()
  expression?: SyntacticStructureMatch;

  constructor() { }

  ngOnInit(): void {
  }

  isSuccess(): boolean | undefined {
    return this.expression?.fullMatch && this.expression.textNotMatch?.length === 0;
  }

  isIncorrect(): boolean {
    if (this.expression && this.expression.textNotMatch) {
      return this.expression.textNotMatch.length > 0;
    }
    return false;
  }

  isIncomplete(): boolean {
    return !this.isSuccess() && !this.isIncorrect();
  }

  isIncorrectPosition(position: number): boolean {
    if (this.expression && this.expression.textNotMatch) {
      return this.expression.textNotMatch.map(it => it.position).includes(position);
    }
    return false;
  }


  getIncompleteInfoAsString(): string {
    if (this.expression && this.expression.textMatch && this.expression.syntacticsStructure) {
      const indexMatch = this.expression.textMatch.map(it => it.terminal?.code);
      return this.getSyntaxTerminals(this.expression.syntacticsStructure)
          .filter(it => !indexMatch.includes(it.code))
          .map(it => it.name)
          .join(", ");
    }
    return "";
  }

  public getSyntaxTerminals(syntaxModel: SyntacticsStructureModel): SyntaxModel[] {
    if (!syntaxModel.syntax) return [];
    return syntaxModel.syntax.filter(it => !it.transitions);
  }

}

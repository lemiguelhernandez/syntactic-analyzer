import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LanguageModel } from './model/language-model';
import { LanguageService } from './service/language.service';
import { SimpleSyntacticAnalyzer } from './shared/syntactic-analytic/impl/simple-syntactic-analytic';
import { AnalysisResult } from './shared/syntactic-analytic/result/analysis-result';
import { SyntacticAnalyzer } from './shared/syntactic-analytic/syntactic-analytic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showParticipants = false;
  text = "";

  /* Analysis */
  syntacticAnalyzer: SyntacticAnalyzer;
  analysisResult?: AnalysisResult;

  constructor(
    private languageService: LanguageService
  ) {
    this.syntacticAnalyzer = new SimpleSyntacticAnalyzer();
    this.languageService.fetch("en")
      .subscribe(
        (res: HttpResponse<LanguageModel>) => {
          if (res.body) {
            this.syntacticAnalyzer.addLanguage(res.body);
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }

  showParticipant() {
    this.showParticipants = true;
  }

  onTextChange() {
    if (!this.text) return;

    this.analysisResult = this.syntacticAnalyzer.analyseText(this.text);
    // console.log(this.analysisResult);
  }

  clear() {
    this.text = "";
    this.analysisResult = undefined;
  }

  onError(error: string) {
    alert(error);
  }
}

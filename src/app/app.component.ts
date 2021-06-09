import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LanguageModel } from './model/language-model';
import { LanguageService } from './service/language.service';
import { SingleSentenceSyntacticAnalyzer } from './shared/syntactic-analytic/impl/single-sentence-syntactic-analyzer';
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
    this.syntacticAnalyzer = new SingleSentenceSyntacticAnalyzer();
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
    if (!this.text) {
      this.analysisResult = undefined;
      return;
    }

    this.analysisResult = this.syntacticAnalyzer.analyseText(this.text.trim());
  }

  clear() {
    this.text = "";
    this.analysisResult = undefined;
  }

  onError(error: string) {
    alert(error);
  }
}

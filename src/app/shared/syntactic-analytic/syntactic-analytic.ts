import { LanguageModel } from "../../model/language-model";
import { AnalysisResult } from "./result/analysis-result";

export interface SyntacticAnalyzer {

    addLanguage(language: LanguageModel): void;

    getLanguages(): LanguageModel[];
    
    analyseText(text: String): AnalysisResult;
}

import { LanguageMatch } from "./match/language-match";

export class AnalysisResult {
    
    languages?: LanguageMatch[];

    constructor(languages: LanguageMatch[]) {
        this.languages = languages;
    }
}
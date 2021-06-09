import { LanguageModel } from "src/app/model/language-model";
import { AnalysisResult } from "../result/analysis-result";
import { LanguageMatch } from "../result/match/language-match";
import { TextMatch } from "../result/match/text-match";
import { SyntacticAnalyzer } from "../syntactic-analytic";
import { SyntaxNormalized, SyntaxNormalizer } from "../util/syntax.normalizer";

export class SimpleSyntacticAnalyzer implements SyntacticAnalyzer {

    private syntaxNormalizer: SyntaxNormalizer;
    private languages: LanguageModel[];
    private SEPARATOR = " ";

    constructor() {
        this.syntaxNormalizer = new SyntaxNormalizer();
        this.languages = [];
    }

    addLanguage(language: LanguageModel): void {
        this.languages.push(language);
    }

    getLanguages(): LanguageModel[] {
        return this.languages;
    }

    analyseText(text: String): AnalysisResult {
        const words = text.toLowerCase().split(this.SEPARATOR);

        const languageMatchs: LanguageMatch[] = [];
        for (const language of this.languages) {
            if (!language.syntacticsStructure) continue;
            for (const syntacticStructure of language.syntacticsStructure) {
                
                // init symbol
                const syntaxInit = this.syntaxNormalizer.normalize(syntacticStructure, words);
                if (!syntaxInit) continue;

                // console.log(syntaxInit);
                const textMatch = this.analyseSyntax(syntaxInit, language);
                
                // console.log(textMatch);
                // Determine if match
                if (textMatch.length > 0) {
                    
                }
            }
        }

        return new AnalysisResult(languageMatchs);
    }

    // Complements methods
    private analyseSyntax(nomalized: SyntaxNormalized, language: LanguageModel): TextMatch[] {
        const textMatchs: TextMatch[] = [];
        
        if (nomalized.syntax.containsInWords && language.words) {
            const wordsGroup = language.words.groups;
            const wordsOr = nomalized.syntax.containsInWords.split("|");
            breakOr: for (const wordOr of wordsOr) {
                // has and condition
                
                let check = false; 
                const wordsAnd = wordOr.split(" ");
                if (wordsAnd.length > 1) {

                    let wordComplete = "";
                    let lastPosition: number[] = [];
                    for (const wordAnd of wordsAnd) {
                        let match = false;
                        const wordGroupFlter = wordsGroup?.filter(it => it.code === wordAnd);
                        if (wordGroupFlter && wordGroupFlter.length > 0) {
                            const wordGroup = wordGroupFlter[0];
    
                            for (let i = nomalized.positioner.position; i < nomalized.textWords.length; i++) {
                                const word = nomalized.textWords[i];
                                if (wordGroup.content?.map(it => it.toLowerCase()).includes(word)) {
                                    match = true;
                                    wordComplete += " " + word;
                                    lastPosition.push(i);
                                }
                            }
                        }

                        if (!match) {
                            continue breakOr;
                        }
                    }

                    // All macths
                    const textMatch = new TextMatch();
                    textMatch.terminal = nomalized.syntax;
                    textMatch.text = wordComplete.trim();
                    textMatch.position.push(...lastPosition);
                    nomalized.positioner.applyPosition(textMatch.position[textMatch.position.length - 1]);
                    textMatchs.push(textMatch);
                } else {
                    const wordGroupFlter = wordsGroup?.filter(it => it.code === wordOr);
                    if (wordGroupFlter && wordGroupFlter.length > 0) {
                        const wordGroup = wordGroupFlter[0];

                        for (let i = nomalized.positioner.position; i < nomalized.textWords.length; i++) {
                            const word = nomalized.textWords[i];
                            if (wordGroup.content?.map(it => it.toLowerCase()).includes(word)) {
                                nomalized.positioner.applyPosition(i);

                                const textMatch = new TextMatch();
                                textMatch.terminal = nomalized.syntax;
                                textMatch.text = word;
                                textMatch.position.push(i);
                                textMatchs.push(textMatch);
                                break breakOr;
                            }
                        }
                    }
                }
            }
        }

        if (nomalized.transitons) {
            for (const transition of nomalized.transitons) {
                textMatchs.push(...this.analyseSyntax(transition, language))
            }
        }

        return textMatchs;
    }

}
import { LanguageModel } from "src/app/model/language-model";
import { SyntaxModel } from 'src/app/model/syntax.model';
import { SyntacticsStructureModel } from 'src/app/model/syntactic-structure-model';
import { AnalysisResult } from "../result/analysis-result";
import { LanguageMatch } from "../result/match/language-match";
import { SyntacticStructureMatch } from "../result/match/syntactic-structure-match";
import { TextMatch } from "../result/match/text-match";
import { TextNotMatch } from '../result/match/text-not-match';
import { SyntacticAnalyzer } from "../syntactic-analytic";
import { SyntaxNormalized, SyntaxNormalizer } from "../util/syntax.normalizer";

export class SingleSentenceSyntacticAnalyzer implements SyntacticAnalyzer {

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

            const languageMatch = new LanguageMatch();
            languageMatch.language = language;
            languageMatch.analysisSyntacticStructures = [];

            for (const syntacticStructure of language.syntacticsStructure) {
                
                // init symbol
                const syntaxInit = this.syntaxNormalizer.normalize(syntacticStructure, words);
                if (!syntaxInit) continue;

                const textMatchs = this.analyseSyntax(syntaxInit, language);
                
                // Determine if match
                if (textMatchs.length > 0) {                    
                    const perminals = this.getSyntaxTerminals(syntacticStructure);
                    const allMatch = textMatchs.length === perminals.length;
                    const minimunMatch = syntacticStructure.minimumTerminalsMatch ? this.isMinimunTerminalMatch(textMatchs, syntacticStructure.minimumTerminalsMatch) : false;
                    
                    if (allMatch || minimunMatch) {
                        const syntacticStractureMatch = new SyntacticStructureMatch();
                        syntacticStractureMatch.words = text.split(this.SEPARATOR);
                        syntacticStractureMatch.fullMatch = allMatch;
                        syntacticStractureMatch.syntacticsStructure = syntacticStructure;
                        syntacticStractureMatch.textMatch = textMatchs;
                        syntacticStractureMatch.textNotMatch = this.getTextNotMatch(textMatchs, words);

                        languageMatch.analysisSyntacticStructures.push(syntacticStractureMatch);
                    }
                }
            }

            if (languageMatch.analysisSyntacticStructures.length  > 0) {
                languageMatchs.push(languageMatch);
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
                    const textMatch = new TextMatch(
                        wordComplete.trim(),
                        nomalized.syntax
                    );
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

                                const textMatch = new TextMatch(
                                    word,
                                    nomalized.syntax
                                );
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

    private isMinimunTerminalMatch(textMatchs: TextMatch[], minimumTerminalsMatch: string[][]): boolean {
        minimunPoint: for (const minumunTerminalMatch of minimumTerminalsMatch) {
            if (minumunTerminalMatch.length !== textMatchs.length) {
                continue;
            }

            for (const textMatch of textMatchs) {
                if (!(textMatch.terminal?.code 
                    && minumunTerminalMatch.includes(textMatch.terminal.code))) {
                    continue minimunPoint;
                }
            }
            return true;
        }
        return false;
    }

    private getTextNotMatch(textMatchs: TextMatch[], textWrods: string[]): TextNotMatch[] {
        const textNotMatchs: TextNotMatch[] = [];

        // Index positions
        const indexTextMatch: number[] = [];
        for (const textMatch of textMatchs) {
            indexTextMatch.push(...textMatch.position);
        }

        for (let index = 0; index < textWrods.length; index++) {
            if (!indexTextMatch.includes(index)) {
                const textNotMatch = new TextNotMatch();
                textNotMatch.text = textWrods[index];
                textNotMatch.position = index;
                textNotMatchs.push(textNotMatch);
            }
        }

        return textNotMatchs;
    }

    public getSyntaxTerminals(syntaxModel: SyntacticsStructureModel): SyntaxModel[] {
        if (!syntaxModel.syntax) return [];
        return syntaxModel.syntax.filter(it => !it.transitions);
    }

}
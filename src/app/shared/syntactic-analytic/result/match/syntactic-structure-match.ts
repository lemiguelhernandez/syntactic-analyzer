import { SyntacticsStructureModel } from "src/app/model/syntactic-structure-model";
import { SyntaxNormalized } from "../../util/syntax.normalizer";
import { TextMatch } from "./text-match";
import { TextNotMatch } from "./text-not-match";

export class SyntacticStructureMatch {
    words: string[];
    syntacticsStructure: SyntacticsStructureModel;
    textMatch: TextMatch[];
    textNotMatch?: TextNotMatch[];
    fullMatch: Boolean;
    syntaxInit: SyntaxNormalized;

    constructor(
        words: string[],
        syntacticsStructure: SyntacticsStructureModel,
        textMatch: TextMatch[],
        fullMatch: Boolean,
        syntaxInit: SyntaxNormalized
    ) {
        this.words = words;
        this.syntacticsStructure = syntacticsStructure;
        this.textMatch = textMatch;
        this.fullMatch = fullMatch;
        this.syntaxInit = syntaxInit;
    }
}
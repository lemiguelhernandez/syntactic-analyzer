import { SyntaxModel } from "src/app/model/syntax.model";
import { SyntacticsStructureModel } from "src/app/model/syntactic-structure-model";
import { WordGroup, WordStructureModel } from "src/app/model/word-structure-model";

export class PositionReader {
    position: number;

    constructor() {
        this.position = 0;
    }

    applyPosition(currentPosition: number) {
        this.position = ++currentPosition;
    }
}

export class SyntaxNormalized {
    textWords: string[];
    syntacticStructure: SyntacticsStructureModel;
    syntax: SyntaxModel;
    positioner: PositionReader;
    transitons?: SyntaxNormalized[];

    constructor(
        syntacticStructure: SyntacticsStructureModel,
        textWords: string[],
        syntax: SyntaxModel,
        position: PositionReader
    ) {
        this.syntacticStructure = syntacticStructure;
        this.textWords = textWords;
        this.syntax = syntax;
        this.positioner = position;
    }
}

export class SyntaxNormalizer {

    normalize(syntacticStructure: SyntacticsStructureModel, textWords: string[]): SyntaxNormalized | null { 
        return this.normalize0(syntacticStructure, textWords, syntacticStructure.initSymbol + "", new PositionReader());
    }

    private normalize0(syntacticStructure: SyntacticsStructureModel, textWords: string[], code: string, position: PositionReader): SyntaxNormalized | null {
        const syntax = this.getSyntax(syntacticStructure, code);
        if (!syntax) return null;

        const syntaxNormalized = new SyntaxNormalized(            
            syntacticStructure,
            textWords,
            syntax,
            position
        );

        if (syntax.transitions) {
            syntaxNormalized.transitons = [];
            for (const transition of syntax.transitions) {
                const transitionNormalized = this.normalize0(syntacticStructure, textWords, transition, position);
                if (transitionNormalized != null) {
                    syntaxNormalized.transitons.push(transitionNormalized);
                }
            }
        }

        return syntaxNormalized;
    }

    // Complements methods
    private getSyntax(syntacticStructure: SyntacticsStructureModel, code: string): SyntaxModel | null {
        const syntacticStructureInits = syntacticStructure.syntax?.filter(it => it.code === code);
        if (!syntacticStructureInits 
            || syntacticStructureInits.length === 0) 
            return null;
        return syntacticStructureInits[0];
    }
}
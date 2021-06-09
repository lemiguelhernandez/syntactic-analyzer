import { SyntacticsStructureModel } from "./syntactic-structure-model";
import { WordStructureModel } from "./word-structure-model";

export enum StrategyRead {
    LR, RL
}

export class LanguageModel {
    languageName?: string;
    strategyRead?: StrategyRead;
    syntacticsStructure?: SyntacticsStructureModel[];
    /**
    * 
    */
    words?: WordStructureModel;
}

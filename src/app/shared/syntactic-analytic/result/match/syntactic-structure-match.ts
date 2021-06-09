import { SyntacticsStructureModel } from "src/app/model/syntactic-structure-model";
import { TextMatch } from "./text-match";
import { TextNotMatch } from "./text-not-match";

export class SyntacticStructureMatch {
    words?: string[];
    syntacticsStructure?: SyntacticsStructureModel;
    textMatch?: TextMatch[];
    textNotMatch?: TextNotMatch[];
    fullMatch?: Boolean;
}
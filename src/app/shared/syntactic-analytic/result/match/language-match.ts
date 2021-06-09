import { LanguageModel } from "src/app/model/language-model";
import { SyntacticStructureMatch } from "./syntactic-structure-match";

export class LanguageMatch {

    language?: LanguageModel;
    
    analysisSyntacticStructures?: SyntacticStructureMatch[];
    
}
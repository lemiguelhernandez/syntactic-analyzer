import { SyntaxModel } from "./syntax.model";
import { WordStructureModel } from "./word-structure-model";

/**
 * 
 */
export class SyntacticsStructureModel {

    /**
     * 
     */
    name?: string;

    /**
     * 
     */
    initSymbol?: string;

    /**
     * 
     */
    showName = true;

    /**
     * 
     */
    minimumTerminalsMatch?: string[][]

    /**
     * 
     */
    syntax?: SyntaxModel[];

}
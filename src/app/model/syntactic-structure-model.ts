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
    minimumTerminalsMatch?: string[]

    /**
     * 
     */
    syntax?: SyntaxModel[];

    /**
     * 
     * @returns 
     */
    getSyntaxTerminals(): SyntaxModel[] {
      if (!this.syntax) return [];
      return this.syntax.filter(it => !it.transitions);
    }
}
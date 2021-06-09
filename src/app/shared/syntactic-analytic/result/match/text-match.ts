import { SyntaxModel } from "src/app/model/syntax.model";

export class TextMatch {
    text?: String;
    terminal?: SyntaxModel;
    position: number[];

    constructor() {
        this.position = [];
    }
}
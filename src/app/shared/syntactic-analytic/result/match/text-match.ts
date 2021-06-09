import { SyntaxModel } from "src/app/model/syntax.model";

export class TextMatch {
    text?: String;
    terminal?: SyntaxModel;
    position: number[];

    constructor(
        text: String,
        terminal: SyntaxModel
    ) {
        this.text = text;
        this.terminal = terminal;
        this.position = [];
    }
}

export class WordGroup {
    code?: string;
    name?: string;
    pluralName?: string;
    content?: string[];
    readonly?: boolean;
}

export class WordStructureModel {
    groups?: WordGroup[]
}

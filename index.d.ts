interface Flags {
    [key: string]: boolean | string;
}
export interface Directive {
    path: string;
    description?: string;
    input?: boolean;
    children?: Directive[];
    handler?: (value: string | boolean, flags: Flags) => void;
    flags?: string[];
}
export declare type Handler = (value: string | boolean, flags: Flags | {}) => void;
export declare function parse(args: Directive[], ctx?: string): void;
export {};

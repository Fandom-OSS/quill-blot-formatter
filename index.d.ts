// Type definitions for quill-blot-formatter 1.0
// Project: https://github.com/Fandom-OSS/quill-blot-formatter
// Definitions by: Guillaume RODRIGUEZ <https://github.com/guillaume-ro-fr>

export as namespace QuillBlotFormatter;

export interface OverlayOptions {
    // classname applied to the overlay element
    className: string;
    // style applied to overlay element, or null to prevent styles
    style?: {};
}

export interface ResizeOptions {
    // class name applied to the resize handles
    handleClassName: string;
    // style applied to resize handles, or null to prevent styles
    handleStyle?: {};
}

export interface AlignOptions {
    // the name of the attribute for an element that has its alignment changed
    attribute: string;
    // the aligner does the actual alignment switch
    aligner: {
        // whether or not the aligner should handle the actual alignment properties
        applyStyle: boolean;
    };
    // icons used for alignment
    icons: {
        left: string;
        center: string;
        right: string;
    };
    // the toolbar so users can change alignments
    toolbar: {
        // whether or not users can deselect an alignment. it's up to you to set the initial alignment
        allowDeselect: boolean;
        // class name applied to the root toolbar element
        mainClassName: string;
        // style applied to root toolbar element, or null to prevent styles
        mainStyle?: {};
        // class name applied to each button in the toolbar
        buttonClassName: string;
        /* whether or not to add the selected style to the buttons.
        they'll always get the is-selected class */
        addButtonSelectStyle: boolean;
        // style applied to buttons, or null to prevent styles
        buttonStyle?: {};
        // style applied to the svgs in the buttons
        svgStyle?: {};
    };
}

export interface Aligner {
    getAlignments(): Alignment[];
    isAligned(el: HTMLElement, alignment: Alignment): boolean;
    clear(el: HTMLElement): void;
}

export interface Alignment {
    name: string;
    icon: string;
    apply: ((el: HTMLElement) => void);
}

export interface Options {
    // the BlotSpecs supported
    specs: (typeof BlotSpec)[];
    overlay: OverlayOptions;
    align: AlignOptions;
    resize: ResizeOptions;
}

export const DefaultOptions: Options;

export interface Toolbar {
    create(formatter: BlotFormatter, alignmentHelper: Aligner): HTMLElement;
    destroy(): void;
    getElement(): HTMLElement | null;
}

export class BlotSpec {
    formatter: BlotFormatter;

    constructor(formatter: BlotFormatter);

    init(): void;
    getActions(): (typeof Action)[];
    getTargetElement(): HTMLElement | null;
    getOverlayElement(): HTMLElement | null;
    setSelection(): void;
    onHide(): void;
}

export class IframeVideoSpec extends UnclickableBlotSpec {
    constructor(formatter: BlotFormatter);
}

export class ImageSpec extends BlotSpec {
    img?: HTMLElement;
    onClick: ((event: MouseEvent) => void);

    constructor(formatter: BlotFormatter);

    init(): void;

    getTargetElement(): HTMLElement | null;
    onHide(): void;
}

export class UnclickableBlotSpec extends BlotSpec {
    selector: string;
    unclickable?: HTMLElement;
    nextUnclickable?: HTMLElement;
    proxyImage: HTMLImageElement;
    repositionProxyImage: ((unclickable: HTMLElement) => void);
    onTextChange: (() => void);
    onMouseEnter: (() => void);
    onProxyImageClick: (() => void);

    constructor(formatter: BlotFormatter, selector: string);

    init(): void;
    getTargetElement(): HTMLElement | null;
    getOverlayElement(): HTMLElement | null;
    onHide(): void;
    createProxyImage(): HTMLElement;
    hideProxyImage(): void;
}

export class BlotFormatter {
    quill: any;
    options: Options;
    currentSpec?: BlotSpec;
    specs: BlotSpec[];
    overlay: HTMLElement;
    actions: Action[];
    onClick: (() => void);

    constructor(quill: any, options?: Options);

    show(spec: BlotSpec): void;
    hide(): void;
    update(): void;
    createActions(spec: BlotSpec): void;
    destroyActions(): void;
    repositionOverlay(): void;
    setUserSelect(value: string): void;
}

export class Action {
    formatter: BlotFormatter;

    constructor(formatter: BlotFormatter);

    onCreate(): void;
    onDestroy(): void;
    onUpdate(): void;
}

export class DeleteAction extends Action {
    onKeyUp: ((e: KeyboardEvent) => void);
}

export class ResizeAction extends Action {
    topLeftHandle: HTMLElement;
    topRightHandle: HTMLElement;
    bottomRightHandle: HTMLElement;
    bottomLeftHandle: HTMLElement;
    dragHandle?: HTMLElement;
    dragStartX: number;
    preDragWidth: number;
    targetRatio: number;
    onMouseDown: ((event: MouseEvent) => void);
    onDrag: ((event: MouseEvent) => void);
    onMouseUp: (() => void);

    createHandle(position: string, cursor: string): HTMLElement;
    repositionHandles(handleStyle?: {}): void;
    setCursor(value: string): void;
}

export class AlignAction extends Action {
    toolbar: Toolbar;
    aligner: Aligner;
}

export class DefaultAligner implements Aligner {
    alignments: { [id: string]: Alignment; };
    alignAttribute: string;
    applyStyle: boolean;

    constructor(options: AlignOptions);

    getAlignments(): Alignment[];
    clear(el: HTMLElement): void;
    isAligned(el: HTMLElement, alignment: Alignment): boolean;
    setAlignment(el: HTMLElement, value: string): void;
    setStyle(el: HTMLElement, display?: string, float?: string, margin?: string): void;
}

export class DefaultToolbar implements Toolbar {
    toolbar?: HTMLElement;
    buttons: HTMLElement[];

    constructor();

    create(formatter: BlotFormatter, aligner: Aligner): HTMLElement;
    destroy(): void;
    getElement(): HTMLElement | null;
    addToolbarStyle(formatter: BlotFormatter, toolbar: HTMLElement): void;
    addButtonStyle(button: HTMLElement, index: number, formatter: BlotFormatter): void;
    addButtons(formatter: BlotFormatter, toolbar: HTMLElement, aligner: Aligner): void;
    preselectButton(button: HTMLElement, alignment: Alignment, formatter: BlotFormatter, aligner: Aligner): void;
    onButtonClick(button: HTMLElement, formatter: BlotFormatter, alignment: Alignment, aligner: Aligner): void;
    clickButton(button: HTMLElement, alignTarget: HTMLElement, formatter: BlotFormatter, alignment: Alignment, aligner: Aligner): void;
    selectButton(formatter: BlotFormatter, button: HTMLElement): void;
    deselectButton(formatter: BlotFormatter, button: HTMLElement): void;
}

export default BlotFormatter;
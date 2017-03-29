import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
export declare class ClickOutsideDirective implements OnInit, OnDestroy, OnChanges {
    private _document;
    private _el;
    attachOutsideOnClick: boolean;
    exclude: string;
    clickOutside: EventEmitter<Event>;
    private _nodesExcluded;
    constructor(_document: any, _el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _init();
}

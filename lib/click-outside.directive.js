"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var ClickOutsideDirective = (function () {
    function ClickOutsideDirective(_document /*: HTMLDocument*/, _el) {
        this._document = _document; /*: HTMLDocument*/
        this._el = _el;
        this.attachOutsideOnClick = false;
        this.exclude = '';
        this.excludebeforeclick = false;
        this.clickoutsideevents = '';
        this.clickOutside = new core_1.EventEmitter();
        this._nodesExcluded = [];
        this._events = ['click'];
        this._initOnClickBody = this._initOnClickBody.bind(this);
        this._onClickBody = this._onClickBody.bind(this);
    }
    ClickOutsideDirective.prototype.ngOnInit = function () {
        this._init();
    };
    ClickOutsideDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.attachOutsideOnClick) {
            this._events.forEach(function (event) { return _this._el.nativeElement.removeEventListener(event, _this._initOnClickBody); });
        }
        this._events.forEach(function (event) { return _this._document.body.removeEventListener(event, _this._onClickBody); });
    };
    ClickOutsideDirective.prototype.ngOnChanges = function (changes) {
        if (changes['attachOutsideOnClick'] || changes['exclude']) {
            this._init();
        }
    };
    ClickOutsideDirective.prototype._init = function () {
        var _this = this;
        if (this.clickoutsideevents !== '') {
            this._events = this.clickoutsideevents.split(' ');
        }
        this._excludeCheck();
        if (this.attachOutsideOnClick) {
            this._events.forEach(function (event) { return _this._el.nativeElement.addEventListener(event, _this._initOnClickBody); });
        }
        else {
            this._initOnClickBody();
        }
    };
    /** @internal */
    ClickOutsideDirective.prototype._initOnClickBody = function () {
        var _this = this;
        this._events.forEach(function (event) { return _this._document.body.addEventListener(event, _this._onClickBody); });
    };
    /** @internal */
    ClickOutsideDirective.prototype._excludeCheck = function () {
        if (this.exclude) {
            try {
                var nodes = this._document.querySelectorAll(this.exclude);
                if (nodes) {
                    this._nodesExcluded = nodes;
                }
            }
            catch (err) {
                if (console) {
                    console.error('[ng-click-outside] Check your exclude selector syntax.', err);
                }
            }
        }
    };
    ClickOutsideDirective.prototype._onClickBody = function (e) {
        var _this = this;
        if (this.excludebeforeclick) {
            this._excludeCheck();
        }
        if (!this._el.nativeElement.contains(e.target) && !this._shouldExclude(e.target)) {
            this.clickOutside.emit(e);
            if (this.attachOutsideOnClick) {
                this._events.forEach(function (event) { return _this._document.body.removeEventListener(event, _this._onClickBody); });
            }
        }
    };
    /** @internal */
    ClickOutsideDirective.prototype._shouldExclude = function (target) {
        for (var i = 0; i < this._nodesExcluded.length; i++) {
            if (this._nodesExcluded[i].contains(target)) {
                return true;
            }
        }
        return false;
    };
    return ClickOutsideDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ClickOutsideDirective.prototype, "attachOutsideOnClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ClickOutsideDirective.prototype, "exclude", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ClickOutsideDirective.prototype, "excludebeforeclick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ClickOutsideDirective.prototype, "clickoutsideevents", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ClickOutsideDirective.prototype, "clickOutside", void 0);
ClickOutsideDirective = __decorate([
    core_1.Directive({ selector: '[clickOutside]' }),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [Object, core_1.ElementRef])
], ClickOutsideDirective);
exports.ClickOutsideDirective = ClickOutsideDirective;

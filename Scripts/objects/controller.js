var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Controller = /** @class */ (function (_super) {
        __extends(Controller, _super);
        function Controller(assetManager, imageString, x, y, num) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (num === void 0) { num = 0; }
            var _this = _super.call(this, assetManager.getResult(imageString)) || this;
            _this.x = x;
            _this.y = y;
            _this.selected = false;
            _this.num = num;
            _this.scaleX *= 0.7;
            _this.scaleY *= 0.7;
            _this.cursor = "pointer";
            _this.on("mouseover", _this.mouseOver);
            _this.on("mouseout", _this.mouseOut);
            return _this;
        }
        Controller.prototype.mouseOver = function () {
            if (!this.selected) {
                this.x -= 18.62;
                this.y -= 18.62;
                this.scaleX *= 1.2;
                this.scaleY *= 1.2;
                this.bgs = createjs.Sound.play("select");
            }
        };
        Controller.prototype.mouseOut = function () {
            if (!this.selected) {
                this.x += 18.62;
                this.y += 18.62;
                this.scaleX /= 1.2;
                this.scaleY /= 1.2;
            }
        };
        return Controller;
    }(createjs.Bitmap));
    objects.Controller = Controller;
})(objects || (objects = {}));
//# sourceMappingURL=controller.js.map
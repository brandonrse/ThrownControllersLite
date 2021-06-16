var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var SubmitButton = /** @class */ (function (_super) {
        __extends(SubmitButton, _super);
        function SubmitButton(assetManager, imageString, x, y) {
            var _this = _super.call(this, assetManager.getResult(imageString)) || this;
            _this.x = x;
            _this.y = y;
            _this.cursor = "pointer";
            _this.on("mouseover", _this.mouseOver);
            _this.on("mouseout", _this.mouseOut);
            return _this;
        }
        SubmitButton.prototype.mouseOver = function () {
            this.alpha = 0.5;
        };
        SubmitButton.prototype.mouseOut = function () {
            this.alpha = 1;
        };
        return SubmitButton;
    }(createjs.Bitmap));
    objects.SubmitButton = SubmitButton;
})(objects || (objects = {}));
//# sourceMappingURL=submit.js.map
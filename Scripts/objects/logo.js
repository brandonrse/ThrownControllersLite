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
    var Logo = /** @class */ (function (_super) {
        __extends(Logo, _super);
        // Constructor
        function Logo(assetManager, imageString, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 30; }
            var _this = _super.call(this, assetManager.getResult(imageString)) || this;
            _this.x = x;
            _this.y = y;
            _this.alpha = 0;
            if (imageString == "brutal") {
                _this.wait = 5000;
            }
            createjs.Tween.get(_this).to({ alpha: 1.0 }, _this.wait);
            return _this;
        }
        return Logo;
    }(createjs.Bitmap));
    objects.Logo = Logo;
})(objects || (objects = {}));
//# sourceMappingURL=logo.js.map
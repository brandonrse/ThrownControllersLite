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
    var Box = /** @class */ (function (_super) {
        __extends(Box, _super);
        function Box(id, x, y, color, text) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (color === void 0) { color = "000"; }
            if (text === void 0) { text = ""; }
            var _this = _super.call(this) || this;
            _this.num = id;
            _this.cursor = "pointer";
            _this.scaleX *= 1.0;
            _this.scaleY *= 1.0;
            _this.graphics.beginStroke("#000");
            _this.graphics.setStrokeStyle(1);
            _this.snapToPixel = true;
            _this.graphics.beginFill(color).drawRoundRect(x, y, 150, 150, 5);
            _this.text = new objects.Label(text, "16pt", "Verdana", "#000", x + 75, y + 75);
            _this.text.lineWidth = 150;
            _this.text.maxWidth = 150;
            _this.text.textAlign = "center";
            _this.text.textBaseline = "middle";
            if (_this.text.text.split(" ").length == 1) {
                _this.text.y = y + 75;
            }
            else if (_this.text.text.split(" ").length <= 2) {
                _this.text.y = y + 65;
            }
            else if (_this.text.text.split(" ").length <= 3) {
                _this.text.y = y + 50;
            }
            else if (_this.text.text.split(" ").length <= 4) {
                _this.text.y = y + 55;
            }
            else if (_this.text.text.split(" ").length <= 7) {
                _this.text.y = y + 45;
            }
            _this.on("mouseover", _this.mouseOver);
            _this.on("mouseout", _this.mouseOut);
            return _this;
        }
        Box.prototype.mouseOver = function () {
            // this.x -= 5;
            // this.y -= 5;
            // this.scaleX *= 1.01
            // this.scaleY *= 1.01;
            this.alpha = 0.7;
        };
        Box.prototype.mouseOut = function () {
            // this.x += 5;
            // this.y += 5;
            // this.scaleX /= 1.01;
            // this.scaleY /= 1.01;
            this.alpha = 1;
        };
        return Box;
    }(createjs.Shape));
    objects.Box = Box;
})(objects || (objects = {}));
//# sourceMappingURL=box.js.map
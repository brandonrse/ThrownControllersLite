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
            _this.graphics.beginFill(color).drawRect(x, y, 150, 150);
            _this.on("mouseover", _this.mouseOver);
            _this.on("mouseout", _this.mouseOut);
            _this.text = new objects.Label(text, "20pt", "Candara", "#000", x + 75, y + 75);
            _this.text.lineWidth = 150;
            _this.text.maxWidth = 150;
            _this.text.textAlign = "center";
            _this.text.textBaseline = "middle";
            if (_this.text.text.split(" ").length > 2) {
                _this.text.y = y + 55;
            }
            return _this;
        }
        Box.prototype.mouseOver = function () {
            this.x -= 5;
            this.y -= 5;
            this.scaleX *= 1.01;
            this.scaleY *= 1.01;
        };
        Box.prototype.mouseOut = function () {
            this.x += 5;
            this.y += 5;
            this.scaleX /= 1.01;
            this.scaleY /= 1.01;
        };
        return Box;
    }(createjs.Shape));
    objects.Box = Box;
})(objects || (objects = {}));
//# sourceMappingURL=box.js.map
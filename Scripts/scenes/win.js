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
var scenes;
(function (scenes) {
    var WinScene = /** @class */ (function (_super) {
        __extends(WinScene, _super);
        // Constructor
        function WinScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        WinScene.prototype.Start = function () {
            this.win = new objects.Logo(this.assetManager, "winner", 12.8, 96);
            this.win.alpha = 0;
            this.bg = new createjs.Bitmap(this.assetManager.getResult("winbg"));
            this.Main();
        };
        WinScene.prototype.Main = function () {
            this.bgm = createjs.Sound.play("winbgm");
            this.addChild(this.bg);
            createjs.Tween.get(this.win).to({ alpha: 1 }, 3000);
            this.addChild(this.win);
        };
        return WinScene;
    }(objects.Scene));
    scenes.WinScene = WinScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=win.js.map
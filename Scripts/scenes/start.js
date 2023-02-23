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
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        function StartScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.canvas = document.getElementById("canvas");
            _this.controllerArray = [];
            _this.load = true;
            _this.Start();
            return _this;
        }
        StartScene.prototype.Start = function () {
            objects.Game.correct = null;
            this.score = new createjs.Bitmap(this.assetManager.getResult("score"));
            this.scoreLabel = new objects.Label("Score:\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + objects.Game.score, "48px", "Arial", "#000", 10, 15);
            this.controllerArray.push(new objects.Controller(this.assetManager, "xbox1", 179, 117, 0));
            this.controllerArray.push(new objects.Controller(this.assetManager, "snes", 397, 117, 1));
            this.controllerArray.push(new objects.Controller(this.assetManager, "ps3", 615, 117, 2));
            this.controllerArray.push(new objects.Controller(this.assetManager, "n64", 70, 335, 3));
            this.controllerArray.push(new objects.Controller(this.assetManager, "dream", 288, 335, 4));
            this.controllerArray.push(new objects.Controller(this.assetManager, "gamecube", 506, 335, 5));
            this.controllerArray.push(new objects.Controller(this.assetManager, "atari", 724, 335, 6));
            this.controllerArray.push(new objects.Controller(this.assetManager, "ps4", 179, 553, 7));
            this.controllerArray.push(new objects.Controller(this.assetManager, "xbox", 397, 553, 8));
            this.controllerArray.push(new objects.Controller(this.assetManager, "nes", 615, 553, 9));
            this.bgm = createjs.Sound.play("menubgm");
            this.bgm.volume = 0.2;
            this.bgm.loop = -1;
            this.Main();
        };
        StartScene.prototype.Update = function () { };
        StartScene.prototype.Main = function () {
            var _this = this;
            this.addChild(this.text);
            this.addChild(this.score);
            this.addChild(this.scoreLabel);
            if (objects.Game.score == 0) {
                objects.Scene.complete = [];
                objects.Game.easyQuestions = [];
                objects.Game.brutalQuestions = [];
                objects.Game.trickyQuestions = [];
                objects.Game.lightningQuestions = [];
                objects.Game.multipleQuestions = [];
            }
            // Add each option
            this.controllerArray.forEach(function (element) {
                _this.addChild(element);
                _this.alpha = 0;
                createjs.Tween.get(_this).to({ alpha: 1.0 }, 1000);
                element.on("click", function () {
                    objects.Scene.complete.push(this.num);
                    if (!element.selected) {
                        createjs.Sound.stop();
                        objects.Game.currentScene = config.Scene.GAME;
                    }
                });
                // If already completed
                objects.Scene.complete.forEach(function (c) {
                    if (c == element.num) {
                        element.removeAllEventListeners();
                        element.alpha = 0.5;
                        element.cursor = "default";
                        _this.cursor = "none";
                    }
                });
            });
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map
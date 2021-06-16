var objects;
(function (objects) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.score = 0;
        Game.currentAnswer = "";
        Game.correct = null;
        Game.lightningFinish = null;
        Game.easyQuestions = [];
        Game.brutalQuestions = [];
        Game.trickyQuestions = [];
        Game.lightningQuestions = [];
        Game.multipleQuestions = [];
        return Game;
    }());
    objects.Game = Game;
})(objects || (objects = {}));
//# sourceMappingURL=game.js.map
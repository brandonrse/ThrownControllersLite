var objects;
(function (objects) {
    var Question = /** @class */ (function () {
        function Question(question, answers, answerDesc, lightningAnswers, multipleAnswer) {
            if (answerDesc === void 0) { answerDesc = ""; }
            if (lightningAnswers === void 0) { lightningAnswers = []; }
            if (multipleAnswer === void 0) { multipleAnswer = -1; }
            this.correct = false;
            this.lightning = 0;
            this.multipleAnswer = 0;
            this.question = question;
            this.answers = answers;
            this.answerDesc = answerDesc;
            this.lightningAnswers = lightningAnswers;
            this.multipleAnswer = multipleAnswer;
        }
        Question.prototype.checkEasyAnswer = function () {
            var answer = objects.Game.currentAnswer;
            var min;
            var max;
            var range;
            // If the answer is a range between two values
            if (this.answers[0].charAt(0) == "R" && this.answers[0].charAt(1) == ",") {
                range = this.answers[0].split(",");
                min = parseInt(range[1]);
                max = parseInt(range[2]);
                var intAnswer = parseInt(answer);
                // If answer is inbetween the range, inclusive
                if (intAnswer >= min && intAnswer <= max) {
                    objects.Game.correct = true;
                }
            }
            // Compare answer to each answer in array
            else {
                this.answers.forEach(function (a) {
                    if (answer.toUpperCase() == a) {
                        objects.Game.correct = true;
                    }
                });
            }
        };
        return Question;
    }());
    objects.Question = Question;
})(objects || (objects = {}));
//# sourceMappingURL=question.js.map
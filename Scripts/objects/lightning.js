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
    var Lightning = /** @class */ (function (_super) {
        __extends(Lightning, _super);
        function Lightning(assetManager) {
            var _this = _super.call(this) || this;
            _this.circles = [];
            _this.correct = 0;
            _this.questions = [];
            _this.count = 0;
            _this.chosenAnswers = [];
            _this.timer = 30;
            _this.canvas = document.getElementById("canvas");
            _this.assetManager = assetManager;
            _this.Start();
            return _this;
        }
        Lightning.prototype.Start = function () {
            var _this = this;
            this.loadQuestions();
            var num = Math.floor(Math.random() * this.questions.length);
            while (objects.Game.lightningQuestions.indexOf(num) != -1) {
                num = Math.floor(Math.random() * this.questions.length);
            }
            this.chosenQuestion = this.questions[num];
            objects.Game.lightningQuestions.push(num);
            //#region MAIN
            // Logo & Question
            // this.logo = new objects.Logo(this.assetManager,"lightning",this.canvas.clientWidth * 0.5 - 373, 50);
            this.logo = new objects.Logo(this.assetManager, "lrbg", 0, 0);
            this.questionLabel = new objects.Label(this.chosenQuestion.question, "bold 20pt", "Verdana", "#000", this.canvas.clientWidth * 0.5, 520, true);
            this.answerLabel = new objects.Label(this.chosenQuestion.answers[0], "18pt", "Verdana", "#000", 490, 550);
            this.questionLabel.lineWidth = 930;
            this.answerLabel.lineWidth = 930;
            this.answerLabel.textAlign = "center";
            this.circleGreen = new objects.SubmitButton(this.assetManager, "circlegrn1", this.canvas.clientWidth * 0.5 - 124, 600);
            this.circleRed = new objects.SubmitButton(this.assetManager, "circlered2", this.canvas.clientWidth * 0.5 + 20, 600);
            this.timerLabel = new objects.Label(this.timer + "", "32pt", "Arial", "#FFF", this.canvas.clientWidth - 70, this.canvas.clientHeight - 60);
            this.circleGreen.on("click", function () {
                if (_this.chosenAnswers.push(0) == 5) {
                    objects.Game.lightningFinish = true;
                }
                _this.nextAnswer();
            });
            this.circleRed.on("click", function () {
                if (_this.chosenAnswers.push(1) == 5) {
                    objects.Game.lightningFinish = true;
                }
                _this.nextAnswer();
            });
            this.bgm = createjs.Sound.play("race");
            this.bgm.loop = -1;
            this.countdown();
            this.Main();
        };
        Lightning.prototype.Main = function () {
            this.addChild(this.logo);
            this.addChild(this.questionLabel);
            this.addChild(this.answerLabel);
            this.addChild(this.circleGreen);
            this.addChild(this.circleRed);
            this.addChild(this.timerLabel);
        };
        Lightning.prototype.Update = function () {
            this.timerLabel.text = this.timer + "";
        };
        Lightning.prototype.nextAnswer = function () {
            ++this.count;
            this.answerLabel.text = this.chosenQuestion.answers[this.count];
        };
        Lightning.prototype.showResults = function () {
            this.bgm.stop();
            var x = 209;
            var y = 600;
            // Correct and wrong circle images displayed based on answer comparisons
            for (var i = 0; i < 5; i++) {
                var circle1 = new createjs.Bitmap(this.assetManager.getResult("circlegrn"));
                var circle2 = new createjs.Bitmap(this.assetManager.getResult("circlered"));
                circle1.y = y;
                circle2.y = y;
                if (this.chosenAnswers[i] == this.chosenQuestion.lightningAnswers[i]) {
                    circle1.x = x;
                    this.circles.push(circle1);
                    ++this.correct;
                }
                else {
                    circle2.x = x;
                    this.circles.push(circle2);
                }
                x += 114;
            }
        };
        Lightning.prototype.countdown = function () {
            var _this = this;
            var interval = setInterval(function () {
                _this.timer--;
                if (_this.timer < 0) {
                    clearInterval(interval);
                    for (var i = 0; i < 5; i++) {
                        if (_this.chosenAnswers.push(2) == 5) {
                            objects.Game.lightningFinish = true;
                        }
                    }
                }
            }, 1000);
        };
        //#endregion
        Lightning.prototype.loadQuestions = function () {
            // Question, Answers Shown, Correct Answers [0 = right, 1 = wrong]
            this.questions.push(new objects.Question("PIKMIN COLOURS: Real or Fake", ["Red", "Blue", "Green", "Orange", "Purple"], "", [0, 0, 1, 1, 0]));
            this.questions.push(new objects.Question("COSPLAY PIKACHUS: Real or Fake", ["Pikachu Libre", "Pikachu Detective", "Pikachu Beauty", "Pikachu Ph.D", "Pikachu Rock Star"], "", [0, 1, 1, 0, 0]));
            this.questions.push(new objects.Question("REVIVING ITEMS: Real or Fake", ["Revival Herb", "Phoenix Pinion", "Max Nut", "Stone Mirror", "Nasty Medicine"], "", [0, 0, 1, 0, 0]));
            this.questions.push(new objects.Question("POKÉWALKER AREAS: Real or Fake", ["White Forest", "Beyond the Sea", "National Park", "Blue Lake", "Treehouse"], "", [1, 0, 1, 0, 0]));
            this.questions.push(new objects.Question("PIKMIN ENEMIES: Pikmin 1 or Pikmin 2", ["Orange Bulborb", "Bumbling Snitchbug", "Armored Cannon Beetle", "Puffstool", "Raging Long Legs"], "", [1, 1, 0, 0, 1]));
            this.questions.push(new objects.Question("KINGDOM HEARTS PARTY MEMBERS: Real or Fake", ["Belle", "Tron", "Wendy", "Phil", "Cloud"], "", [1, 0, 1, 1, 0]));
            this.questions.push(new objects.Question("XENOBLADE CHRONICLES SHULK ARTS: Real or Fake", ["Back Slash", "Bone Upper", "Monado Smash", "Monado Cyclone", "Stream Edge"], "", [0, 1, 1, 0, 0]));
            this.questions.push(new objects.Question("HYRULE WARRIORS: DE WEAPONS: Real or Fake", ["Red Ring", "8-Bit Rupee", "Light Bow", "Sword of the Six Sages", "Pirate Pistol"], "", [0, 0, 1, 1, 1]));
            this.questions.push(new objects.Question("POKÉ BALLS: Real or Fake", ["Great Ball", "Speed Ball", "Park Ball", "Sun Ball", "Dream Ball"], "", [0, 1, 0, 1, 0]));
            this.questions.push(new objects.Question("DANGANRONPA TALENTS: Real or Fake", ["Ultimate Supreme Leader", "Ultimate Soccer Player", "Ultimate Icthyologist", "Ultimate Moral Compass", "Ultimate Photographer"], "", [0, 1, 1, 0, 0]));
            this.questions.push(new objects.Question("MASTER SWORD APPEARANCES IN LEGEND OF ZELDA", ["Spirit Tracks", "The Wind Waker", "Four Sword", "Majora's Mask", "Skyward Sword"], "", [1, 0, 1, 1, 0]));
            this.questions.push(new objects.Question("MARIO POWER-UPS: Real or Fake", ["Penguin Suit", "Superball Flower", "Dog Suit", "Blue Shell", "Super Crown"], "", [0, 0, 1, 0, 0]));
            this.questions.push(new objects.Question("KIRBY COPY ABILITIES: Real or Fake", ["Flower", "Bubble", "Burning", "Savate", "Cat"], "", [1, 0, 0, 1, 1]));
            this.questions.push(new objects.Question("PAPER MARIO (SERIES) PARTNERS: Yes or No", ["Goombario", "Marilyn", "Piccolo", "Flurrie", "Kamek"], "", [0, 1, 0, 0, 0]));
            this.questions.push(new objects.Question("SUPER MARIO GALAXY GALAXIES: Real or Fake", ["Honey Garden", "Hurry-Scurry", "Deep Dark", "Fleet Glide", "Goomba Moon"], "", [1, 0, 0, 0, 1]));
            this.questions.push(new objects.Question("PERSONA 5 CONFIDANTS: Real or Fake", ["Nozomi Suemitsu", "Shu Nakajima", "Tae Takemi", "Suguru Kamoshida", "Goro Akechi"], "", [1, 1, 0, 1, 0]));
            this.questions.push(new objects.Question("SUPER MARIO RPG GENO ATTACKS: Real or Fake", ["Geno Beam", "Geno Strike", "Geno Whirl", "Geno Cannon", "Geno Blast"], "", [0, 1, 0, 1, 0]));
            this.questions.push(new objects.Question("ZELDA ORACLE SEEDS: Real or Fake", ["Ember Seeds", "Gale Seeds", "Splash Seeds", "Dash Seeds", "Korok Seeds"], "", [0, 0, 1, 1, 1]));
            this.questions.push(new objects.Question("POKÉMON IN POKÉMON SNAP (N64): Yes or No", ["Pikachu", "Gastly", "Dragonair", "Porygon", "Kingler"], "", [0, 1, 1, 0, 1]));
            this.questions.push(new objects.Question("SUPER MARIO BROS. 3 WORLDS: Real or Fake", ["Grass Land", "Water Land", "Fire Land", "Pipe Land", "Ice Land"], "", [0, 0, 1, 0, 0]));
            this.questions.push(new objects.Question("POKÉMON IN THE GALAR REGIONAL POKÉDEX: Yes or No", ["Banette", "Pyukumuku", "Elgyem", "Krookodile", "Togedemaru"], "", [1, 0, 0, 1, 0]));
            this.questions.push(new objects.Question("GOLDEN SUN DJINN NAMES: Real or Fake", ["Wrath", "Alloy", "Fern", "Pewter", "Tear"], "", [0, 1, 1, 0, 1]));
            this.questions.push(new objects.Question("BREATH OF THE WILD METAL EQUIPMENT: Metal or Not", ["Boomerang", "Guardian Sword", "Eightfold Blade", "Soldier's Shield", "Lynel Bow"], "", [1, 1, 0, 1, 0]));
            this.questions.push(new objects.Question("POKÉMON PROFESSORS: Real or Fake", ["Bellis", "Cedric", "Larch", "Silktree", "Maple"], "", [0, 0, 1, 0, 1]));
            this.questions.push(new objects.Question("POKÉMON CHAMPIONS: Real or Fake", ["Ghetsis", "Kukui", "Mustard", "Iris", "Joey"], "", [1, 1, 0, 0, 1]));
            this.questions.push(new objects.Question("FIRE EMBLEM AVATARS: Real or Fake", ["Leif", "Mark", "Robin", "Eliwood", "Kris"], "", [1, 0, 0, 1, 0]));
            this.questions.push(new objects.Question("FIRE EMBLEM BLAZING BLADE UNITS: Real or Fake", ["Abel", "Lucius", "Amalda", "Geitz", "Pent"], "", [1, 0, 1, 0, 0]));
            this.questions.push(new objects.Question("OKAMI CELESTIAL BRUSH GODS", ["Gekigami", "Haregami", "Noragami", "Moegami", "Amaterasu"], "", [0, 1, 1, 0, 0]));
            this.questions.push(new objects.Question("SUPER SMASH BROS. BRAWL FIGHTERS", ["Dr. Mario", "Wolf", "Mewtwo", "Young Link", "Lucas"], "", [1, 0, 1, 1, 0]));
            this.questions.push(new objects.Question("KLAWW GANG MEMBERS: Yes or No", ["Muggshot", "Dimitri", "Jean Bison", "Arpeggio", "Don Octavio"], "", [1, 0, 0, 0, 1]));
        };
        return Lightning;
    }(createjs.Container));
    objects.Lightning = Lightning;
})(objects || (objects = {}));
//# sourceMappingURL=lightning.js.map
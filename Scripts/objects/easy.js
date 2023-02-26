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
    var EasyQuestion = /** @class */ (function (_super) {
        __extends(EasyQuestion, _super);
        function EasyQuestion(assetManager, type) {
            if (type === void 0) { type = 0; }
            var _this = _super.call(this) || this;
            _this.questions = [];
            _this.canvas = document.getElementById("canvas");
            _this.txt = document.createElement("input");
            _this.assetManager = assetManager;
            _this.type = type;
            _this.Start();
            return _this;
        }
        EasyQuestion.prototype.Start = function () {
            var _this = this;
            if (this.type == 0) {
                this.loadEasyQuestions();
                this.logoType = "easybg";
                this.musicType = "earthbound";
                var num = Math.floor(Math.random() * this.questions.length);
                while (objects.Game.easyQuestions.indexOf(num) != -1) {
                    num = Math.floor(Math.random() * this.questions.length);
                }
                this.chosenQuestion = this.questions[num];
                objects.Game.easyQuestions.push(num);
            }
            if (this.type == 1) {
                this.loadBrutalQuestions();
                this.logoType = "brutalbg";
                this.musicType = "smithy";
                var num = Math.floor(Math.random() * this.questions.length);
                while (objects.Game.brutalQuestions.indexOf(num) != -1) {
                    num = Math.floor(Math.random() * this.questions.length);
                }
                this.chosenQuestion = this.questions[num];
                objects.Game.brutalQuestions.push(num);
            }
            if (this.type == 2) {
                this.loadTrickyQuestions();
                this.logoType = "tricky";
                this.musicType = "earthbound";
                var num = Math.floor(Math.random() * this.questions.length);
                while (objects.Game.trickyQuestions.indexOf(num) != -1) {
                    num = Math.floor(Math.random() * this.questions.length);
                }
                this.chosenQuestion = this.questions[num];
                objects.Game.trickyQuestions.push(num);
            }
            // Logo & Question
            if (this.logoType == "tricky") {
                this.logo = new objects.Logo(this.assetManager, this.logoType, this.canvas.clientWidth * 0.5 - 373, 50);
                this.questionLabel = new objects.Label(this.chosenQuestion.question, "20pt", "Verdana", "#FFF", 30, 500);
                this.answerLabel = new objects.Label(this.chosenQuestion.answerDesc, "20pt", "Verdana", "#FFF", 30, 500);
            }
            else {
                this.logo = new objects.Logo(this.assetManager, this.logoType, 0, 0);
                this.questionLabel = new objects.Label(this.chosenQuestion.question, "20pt", "Verdana", "#000", 30, 500);
                this.answerLabel = new objects.Label(this.chosenQuestion.answerDesc, "20pt", "Verdana", "#000", 30, 500);
            }
            this.questionLabel.lineWidth = 930;
            this.answerLabel.lineWidth = 930;
            // Submit button
            this.submit = new objects.SubmitButton(this.assetManager, "triangle", 660, 655);
            this.submit.on("click", function () {
                _this.checkAnswer(_this.chosenQuestion);
            });
            // Music 
            this.bgm = createjs.Sound.play(this.musicType);
            this.bgm.loop = -1;
            // Text field
            this.txt.setAttribute("type", "text");
            this.txt.id = "input";
            this.txt.addEventListener("keyup", function (event) {
                if (event.keyCode === 13) {
                    _this.checkAnswer(_this.chosenQuestion);
                }
            });
            document.getElementById("text").appendChild(this.txt);
            this.Main();
        };
        EasyQuestion.prototype.Main = function () {
            this.addChild(this.logo);
            this.addChild(this.questionLabel);
            this.addChild(this.submit);
        };
        EasyQuestion.prototype.checkAnswer = function (cq) {
            cq.checkEasyAnswer();
            if (!objects.Game.correct) {
                objects.Game.score = 0;
                objects.Game.correct = false;
            }
            else {
                objects.Game.score++;
            }
            document.getElementById("text").removeChild(document.getElementById("input"));
            this.bgm.stop();
        };
        EasyQuestion.prototype.loadEasyQuestions = function () {
            this.questions.push(new objects.Question("How many members are a part of Organization XIII in Kingdom Hearts 358/2 Days?", ["13", "THIRTEEN", "TREIZE", "XIII"], "Organization XIII is comprised of 13 members in Kingdom Hearts 358/2 Days."));
            this.questions.push(new objects.Question("What is Nintendo's online service for the Nintendo Switch called?", ["NINTENDO SWITCH ONLINE", "NSO"], "The Nintendo Switch Online is a subscription service required for playing games online."));
            this.questions.push(new objects.Question("What item does Pikachu need to evolve in Pokémon Red and Blue?", ["THUNDERSTONE", "THUNDER STONE"], "Pikachu needs a thunderstone in order to evolve into Raichu."));
            this.questions.push(new objects.Question("What can the Inklings from Splatoon transform into?", ["SQUID", "SQUIDS"], "Inklings have the ability to transform between squid form and a humanoid form."));
            this.questions.push(new objects.Question("What weapon type does Marth exclusively use in Fire Emblem: Shadow Dragon?", ["SWORD", "SWORDS", "RAPIER", "RAPIERS"], "Marth can only use swords in Fire Emblem: Shadow Dragon, which isn't the best weapon type."));
            this.questions.push(new objects.Question("What was Princess Peach's original localized name?", ["TOADSTOOL", "PRINCESS TOADSTOOL", "TOAD STOOL", "PRINCESS TOAD STOOL"], "Princess Peach's original name in the west was \"Princess Toadstool\". In Japan, she was always known as \"Princess Peach.\""));
            this.questions.push(new objects.Question("Who was Sonic's companion in Sonic the Hedgehog 2?", ["TAILS", "MILES", "MILES PROWER", "MILES TAILS PROWER", "MILES \"TAILS\" PROWER", "TAIL"], "Accompanying Sonic in Sonic the Hedgehog 2 was Miles \"Tails\" Prower."));
            this.questions.push(new objects.Question("Name one of the four unlockable characters in Super Smash Bros. for the Nintendo 64.", ["NESS", "LUIGI", "JIGGLYPUFF", "JIGGLY PUFF", "CAPTAIN FALCON", "FALCON", "DOUGLAS"], "The four unlockable characters in Super Smash Bros. for the Nintendo 64 were: Luigi, Ness, Captain Falcon, and Jigglypuff."));
            this.questions.push(new objects.Question("What is the name of Link's horse in The Legend of Zelda: Ocarina of Time?", ["EPONA"], "Epona is Link's horse companion who he meets as a child."));
            this.questions.push(new objects.Question("The first Mario Kart was released on the Super Famicon/Super Nintendo. What was it called?", ["SUPER MARIO KART"], "Super Mario Kart was the first Mario Kart game released."));
            this.questions.push(new objects.Question("These standard balls can capture Pokémon with a little luck.", ["POKE BALLS", "POKÉ BALLS", "POKE BALL", "POKEBALLS", "POKEBALL"], "Poké Balls are used to capture the creatures in the world of Pokémon."));
            this.questions.push(new objects.Question("Either he starts with it or not, the hero of The Legend of Zelda is known for his tunic. What colour is it?", ["GREEN", "VERDE", "GRN"], "Almost always does Link go through his adventures in a green tunic."));
            this.questions.push(new objects.Question("Tom Nook has given us a phone. But not just any phone, a _____Phone!", ["NOOK PHONE", "NOOK", "NOOKPHONE"], "The NookPhone is a handy device for managing your assets."));
            this.questions.push(new objects.Question("What do you use to combat enemies in Paper Mario: Sticker Star?", ["STICKERS", "STICKER"], "Stickers are how Mario fights his way through battle in Paper Mario: Sticker Star."));
            this.questions.push(new objects.Question("How many playable games are in Clubhouse Games: 51 Worldwide Classics?", ["51", "FIFTY ONE", "FIFTY-ONE", "FIFTYONE", "52"], "There are 51 games in Clubhouse Games: 51 Worldwide Classics, though there is a secret 52nd game."));
            this.questions.push(new objects.Question("Shin Megami Tensei is the parent series for a certain, popular JRPG series starring Joker from Smash Bros. What is this popular series?", ["PERSONA", "SMT PERSONA", "SMT:PERSONA"], "The Persona franchise has outshone its origin series by a lot."));
            this.questions.push(new objects.Question("This unique controller for the Nintendo Wii resembles a TV remote.", ["WII REMOTE", "WIIMOTE", "WII REMOTE", "WIIREMOTE", "WII MOTE"], "The Wii Remote was weird. The term Wiimote is a colloquial term."));
            this.questions.push(new objects.Question("In The Legend of Zelda: Majora's Mask, Link's main goal is to retrieve this mask:", ["MAJORA'S MASK", "MAJORA MASK", "MAJORAS MASK", "MAJORA", "MAJORA'S"], "Link begins his adventures in Termina to retrieve Majora's Mask for the Happy Mask Salesman."));
            this.questions.push(new objects.Question("Story of Seasons: Friends of Mineral Town introduced the Strawberry Cow. What kind of milk does it produce?", ["STRAWBERRY MILK", "STRAWBERRY", "STRAW BERRY", "STRAW BERRY MILK"], "Strawberry Milk is a new produce from the new Strawberry Cows."));
            this.questions.push(new objects.Question("Who is Bowser Jr.'s dad?", ["BOWSER", "DOUG BOWSER"], "The son of Bowser, Bowser Jr. first appeared in Super Mario Sunshine."));
            this.questions.push(new objects.Question("Which entry in the Monster Hunter series introduced swimming and underwater combat?", ["3", "MONSTER HUNTER 3", "TRI", "MONSTER HUNTER TRI", "MONSTER HUNTER: TRI", "MONSTER HUNTER 3 ULTIMATE", "MONSTER HUNTER 3: ULTIMATE"], "Swimming and underwater combat were introduced to the Monster Hunter series in Monster Hunter 3."));
            this.questions.push(new objects.Question("The Gore Magala was the flagship monster of which Monster Hunter title?", ["4", "MONSTER HUNTER 4"], "The Gore Magala was the flagship monster of Monster Hunter 4."));
            this.questions.push(new objects.Question("What are the two items you need to combine to make a potion in Monster Hunter (Pre-Rise)? (Separate the words like: \"word1 and word2\")", ["BLUE MUSHROOM AND HERB", "A BLUE MUSHROOM AND A HERB", "A BLUE MUSHROOM AND AN HERB", "A BLUE MUSHROOM AND HERB", "BLUE MUSHROOM AND A HERB", "BLUE MUSHROOM AND AN HERB", "HERB AND BLUE MUSHROOM", "HERB AND A BLUE MUSHROOM", "HERB AND BLUE MUSHROOMS"], "One of the first things you learn how to make in Monster Hunter is a potion using a Blue Mushroom and an Herb."));
            this.questions.push(new objects.Question("The first and most basic drink you're taught how to make in VA-11 Hall-A is:", ["SUGAR RUSH", "SUGARRUSH"], "The first drink you make is Sugar Rush."));
            this.questions.push(new objects.Question("Who is the first playable character in Super Mario 64 DS?", ["YOSHI"], "In Super Mario 64 DS you begin the game playing as Yoshi, who got down from the roof asleep."));
            this.questions.push(new objects.Question("What Pokémon is the box Legendary of Pokémon Diamond?", ["DIALGA"], "The box Legendary Pokémon that Pokémon Diamond's story revolves around is Dialga, the Temporal Pokémon."));
            this.questions.push(new objects.Question("What is the name of Diddy Kong's girlfriend?", ["DIXIE", "DIXIE KONG"], "Dixie Kong is Diddy Kong's girlfriend, recently appearing in Donkey Kong Country: Tropical Freeze."));
            this.questions.push(new objects.Question("Name one of the Champions in The Legend of Zelda: Breath of the Wild", ["LINK", "ZELDA", "PRINCESS ZELDA", "MIPHA", "REVALI", "DARUK", "URBOSA"], "The Champions who were to lead the fight against Calamity Ganon were Link, Mipha, Revali, Daruk, and Urbosa, all led by Princess Zelda."));
            this.questions.push(new objects.Question("Pokémon Black and White were the first Pokémon games to allow you to fight the Elite 4 in any order, True or False?", ["TRUE", "T", "YES"], "Pokémon Black and White were the first Pokémon games to introduce the ability to fight the Elite 4 in any order, something that would be kept for the next two generations."));
            this.questions.push(new objects.Question("Name one of the provinces of the Surface in The Legend of Zelda: Skyward Sword.", ["FARON", "ELDIN", "LANAYRU", "ELDIN VOLCANO", "FARON WOODS", "LANAYRU DESERT"], "The three provinces of the Surface are Faron Woods, Eldin Volcano, and Lanayru Desert."));
            this.questions.push(new objects.Question("Name one of the starter Pokémon from Pokémon Red, Green, Blue or Yellow.", ["CHARMANDER", "BULBASAUR", "SQUIRTLE", "PIKACHU"], "In Pokémon Red, Green, and Blue, the starter Pokémon were Bulbasaur, Charmander, and Squirtle. In Pokémon Yellow, your only starter Pokémon was Pikachu."));
            this.questions.push(new objects.Question("Who is the current Driver of Pyra in Xenoblade Chronicles 2?", ["REX"], "Rex became Pyra's Driver at the beginning of Xenoblade Chronicles 2. The two share a unique bond unlike any other Driver and Blade."));
            this.questions.push(new objects.Question("Who is the Zekenator in Xenoblade Chronicles 2?", ["ZEKE", "OZYCHLYRUS", "OZYCHLYRUS BROUNEV TANTAL", "ZEKE VON GENBU", "ZEKE GENBU"], "Zeke von Genbu is the self-proclaimed Zekenator, in addition to calling himself other names such as the Bringer of Chaos."));
            this.questions.push(new objects.Question("Which The Legend of Zelda game featured the first appearance of Kakariko Village?", ["ALTTP", "A LINK TO THE PAST", "LINK TO THE PAST"], "A Link to the Past was the first The Legend of Zelda game to feature Kakariko Village."));
            this.questions.push(new objects.Question("Who is the cat you save from Kamoshida's Palace at the beginning of Persona 5?", ["MORGANA"], "At the beginning of Persona 5, you save the monster cat known as Morgana."));
            this.questions.push(new objects.Question("Name one of Sora's two main party members throughout the Kingdom Heart series.", ["DONALD", "GOOFY", "DONALD DUCK"], "Throughout the main series of Kingdom Hearts, the main playable characters consist of Sora, Donald, and Goofy."));
            this.questions.push(new objects.Question("What is the race of the children of the forest called in The Legend of Zelda: The Wind Waker?", ["KOROK", "KOROKS"], "The Koroks are the children of the forest in The Legend of Zelda: The Wind Waker, being the new form of the Kokiri from The Legend of Zelda: Ocarina of Time."));
            this.questions.push(new objects.Question("What Pokémon is the box Legendary of Pokémon Pearl?", ["PALKIA"], "The box Legendary Pokémon that Pokémon Pearl's story revolves around is Palkia, the Spatial Pokémon."));
            this.questions.push(new objects.Question("What Pokémon is the box Legendary of Pokémon Platinum?", ["GIRATINA"], "The box Legendary Pokémon that Pokémon Platinum's story revolves around is Giratina, the Renegade Pokémon."));
            this.questions.push(new objects.Question("What is Lillie's Cosmog nicknamed in Pokémon Sun, Moon, Ultra Sun, and Ultra Moon?", ["NEBBY"], "Nebby is the nickname of a Cosmog Lillie escaped with and would help the player travel through Ultra Space."));
            this.questions.push(new objects.Question("Who is the unbeatable Champion of the Galar Region in Pokémon Sword and Shield?", ["LEON"], "Leon is known across Galar as the unbeatable Champion along with his Charizard, until the player challenges him for the title."));
            this.questions.push(new objects.Question("What is Kirby's home planet name in the Kirby Series?", ["POPSTAR", "PLANET POPSTAR", "PLANET POP STAR", "POP STAR"], "Kirby's home planet and the setting of several Kirby games is Planet Popstar."));
            this.questions.push(new objects.Question("How many Power Stars are there to collect in the original Super Mario 64?", ["120", "ONE HUNDRED AND TWENTY", "ONE HUNDRED TWENTY"], "There are a total of 120 Power Stars to collect in Super Mario 64, which not even Bowser himself knew."));
            this.questions.push(new objects.Question("What is the Manta Ray's name in Super Mario Galaxy?", ["RAY"], "The Manta Ray Mario rides on in two galaxies is called Ray."));
            this.questions.push(new objects.Question("In Sly Cooper and the Thievius Raccoonus what is the name of the book Sly is trying to recover?", ["THIEVIUS RACCOONUS"], "The Thievius Raccoonus is the Cooper Family's Heirloom that has been stolen by the Fiendish Five."));
        };
        EasyQuestion.prototype.loadBrutalQuestions = function () {
            this.questions.push(new objects.Question("In the Friends of Mineral Town games in the Harvest Moon/Story of Seasons series, there is a character named Kappa who only accepts one gift. What is this one gift?", ["CUCUMBER", "CUCUMBERS"], "Kappa only likes cucumbers. Nothing more, nothing less."));
            this.questions.push(new objects.Question("In Phoenix Wright Ace Attorney: Trials and Tribulations, Phoenix's main rival prosecutor is the mysterious Godot. How many cups of coffee does Godot drink per trial day?", ["17", "SEVENTEEN"], "Godot has a rule where he drinks 17 cups of coffee during a trial and no more."));
            this.questions.push(new objects.Question("In Xenoblade Chronicles, there is an item called the Love Source which is the best item for raising affinity between two party members. There is only one item that can be traded for it. What is the item?", ["VERITAS GLYPHS", "VERITAS GLYPH"], "The rare Veritas Glyphs is the only item that can be traded for the Love Source. The item is rare as only the game's superbosses can drop it."));
            this.questions.push(new objects.Question("How many amiibo does the Legend of Zelda protagonist \"Link\" have (as of 05/2023)?", ["14", "FOURTEEN"], "There are 14 total Link amiibos: \nSmash Bros. Link, Smash Bros. Toon Link, Wolf Link, Wind Waker Toon Link, Ocarina of Time Link, 8-Bit Link, Rider Link, Archer Link, Twilight Princess Link, Skyward Sword Link, Majora's Mask Young Link, Smash Bros. Young Link, Link's Awakening Link, and Tears of the Kingdom Link."));
            this.questions.push(new objects.Question("Which Pokémon is known as the Legendary Pokémon?", ["ARCANINE"], "Oddly enough, Arcanine's category is the Legendary Pokémon."));
            this.questions.push(new objects.Question("Which Pokémon game was the first to remove the slot machine minigame?", ["POKEMON DIAMOND", "POKEMON PEARL", "POKEMON DIAMOND AND PEARL", "POKÉMON DIAMOND", "POKÉMON PEARL", "POKÉMON DIAMOND AND PEARL", "DIAMOND", "PEARL", "DIAMOND AND PEARL"], "The South Korean versions of Pokémon Diamond and Pearl were the first to remove the slot machine minigame. This change will be carried over to the European version of Pokémon Platinum."));
            this.questions.push(new objects.Question("In Tales of Symphonia, Lloyd obtains two swords that together are called the Material Blade. Name one of the swords.", ["VORPAL", "VORPAL SWORD", "VORPAL BLADE", "FLAMBERGE"], "The Vorpal Sword and the Flamberge are the two swords that make up Lloyd's Material Blade. They are also reoccuring weapons throughout the series."));
            this.questions.push(new objects.Question("In The Legend of Zelda: Breath of the Wild, a character named Purah who assists Link by enhancing his Sheikah Slate. How old is she? (Leeway of 2)", ["124", "122", "123", "125", "126"], "In the game, Purah was able to reverse aging. According to the book \"Creating a Champion\", she is 124 years old."));
            this.questions.push(new objects.Question("In Pokémon Black, White, Black 2, and White 2 various NPC musicians can affect the background music. What instrument can be added to the music in Anville Town?", ["FLUTE", "FLUTES", "FLAUTIST"], "Talking to the flautist will add a flute track to the background music."));
            this.questions.push(new objects.Question("In Detroit: Become Human your choices make a difference. What is the name of the fish you can save?", ["DEWEY", "DEWY"], "\"Alexa, ask CyberLife to tell me about the fish.\"...Did you save Dewey? Software Instability increased."));
            this.questions.push(new objects.Question("Super Smash Bros. Brawl was an incredible entry in the Nintendo Crossover series. How many stickers were in the game? (Leeway of 20)", ["R,680,720"], "There were 700 stickers to collect across the various modes."));
            this.questions.push(new objects.Question("In The World Ends With You, each piece of clothing has an in-universe brand. What brand is Neku's headphones?", ["GATITO"], "Neku's headphones are of Gatito brand and called \"My Phones\"."));
            this.questions.push(new objects.Question("The Koopalings are 7 of Bowser's minions, appearing a lot more in recent games. Iggy, Roy, Larry, Morton, Wendy, and Ludwig. Name the missing Koopaling.", ["LEMMY", "LEMY", "LEMMY KOOPA"], "Lemmy Koopa is the youngest of the koopalings and usually uses bouncy balls during his battles."));
            this.questions.push(new objects.Question("Globox is an important character in the Rayman series. Surprisingly, he's quite the father figure with over ______ children (leeway of 50).", ["R,600,700"], "Together with Uglette, they have over 650 children."));
            this.questions.push(new objects.Question("Crash Bandicoot has as much similarities to bandicoots as Sonic to hedgehogs. During conception, Crash wasn't his name. What was Crash's original name?", ["WILLY THE WOMBAT", "WILLY", "WILLIE", "WILLIE THE WOMBAT"], "Willy or Willie was Crash's original name. In the internal files, Crash is referred to as \"willy\""));
            this.questions.push(new objects.Question("In Super Mario 64, the first characters created were Mario and one other. Who was the other one?", ["MIPS", "YELLOW RABBIT", "RABBIT"], "The rabbit that appears in the basement, MIPS, was created alongside Mario."));
            this.questions.push(new objects.Question("The Konami Code is famous within gaming. What was the first NES game to use the code?", ["GRADIUS"], "Gradius was the very first NES game to use the Konami Code."));
            this.questions.push(new objects.Question("In Super Mario Sunshine, Mario must find all of the missing Shine Sprites. There are quite a bit in Delfino Plaza. Not counting the airstrip or Bowser shines, and counting the Blue Coins, how many Shine Sprites are in Delfino Plaza?", ["39"], "There are a total of 39 Shine Sprites in Delfino Plaza. That is almost a third of the missing Shine Sprites."));
            this.questions.push(new objects.Question("In Super Mario Bros. 3, the Kuribo's Shoe was eventually correctly localized to Goomba's Shoe. The overworld Cloud item, however, was never localized correctly. What is the Cloud's non-localized name?", ["JUGEM'S CLOUD", "JUGEM CLOUD", "JUGEMS CLOUD"], "The Cloud, or rather Lakitu's Cloud, was never localized and is called Jugem's Cloud, Jugem being the romanization of Lakitu's Japanese name: Jugemu."));
            this.questions.push(new objects.Question("Groose is a major character in The Legend of Zelda: Skyward Sword, having a meaningful character arc and proving his usefulness in several ways. How many themes in the game are associated with him?", ["7", "SEVEN"], "Groose has 7 themes associated with him, them being: Groose's Theme, Silly Groose, Romantic Groose, Grooseland, Groosenator, Dejected Groose, and Heroic Groose."));
            this.questions.push(new objects.Question("In Super Mario Odyssey there are two Moons you collect for playing jump-rope. One is obtained for getting 30 jumps, and the other 100. What is the Moon for jumping 100 times called?", ["JUMP-ROPE GENIUS", "JUMP ROPE GENIUS", "JUMPROPE GENIUS"], "Jumping 30 times nets you \"Jump-Rope Hero\" and jumping 100 times nets you \"Jump-Rope Genius\"."));
            this.questions.push(new objects.Question("In a commercial for Golden Sun, it featured an opera house with a chandelier-dragon that was then shattered. This commercial was famous for how it had nothing to do with Golden Sun. This chandelier-dragon would return as a summon in Golden Sun: Dark Dawn. What is its name?", ["CRYSTALLUX", "CRYSTALUX"], "Crystallux was a summon you obtained in Golden Sun: Dark Dawn, in an opera house as well!"));
            this.questions.push(new objects.Question("In The Legend of Zelda: The Wind Waker, you travel with the King of Red Lions who is a talking boat. What is his true and full name?", ["DAPHNES NOHANSEN HYRULE", "KING DAPHNES NOHANSEN HYRULE"], "The former King of Hyrule, now the King of Red Lions, was once known as Daphnes Nohansen Hyrule."));
            this.questions.push(new objects.Question("In Super Mario Sunshine, you gain the useful tool known as F.L.U.D.D. to use on your adventure throughout Isle Delfino. However, F.L.U.D.D. is an abbreviation. What does F.L.U.D.D. stand for?", ["FLASH LIQUIDIZER ULTRA DOUSING DEVICE"], "F.L.U.D.D. stands for the Flash Liquidizer Ultra Dousing Device, created by Professor E. Gadd."));
            this.questions.push(new objects.Question("In Pokémon HeartGold and SoulSilver there is an event that takes place if you have an event Arceus, where you'll get teleported to the Sinjoh Ruins. The event plays out and you obtain an Egg of a Legendary Pokémon of your choice. What is the name of the stage where you get the egg?", ["MYSTRI STAGE", "THE MYSTRI STAGE", "MYSTRI"], "The location where you witness the creation is called the Mystri Stage."));
        };
        EasyQuestion.prototype.loadTrickyQuestions = function () {
            this.questions.push(new objects.Question("What is the best-selling Nintendo handheld console to date?", ["NINTENDO DS", "DS"], "The Nintendo DS is the best-selling Nintendo handheld console to date."));
            this.questions.push(new objects.Question("How many Shine Sprites do you need to obtain the sunglasses in Super Mario Sunshine?", ["30", "THIRTY"], "Once you collect 30 Shine Sprites, you can obtain sunglasses where its only function is to darken the screen."));
            this.questions.push(new objects.Question("In Puyo Puyo Tetris, there is a mode that uses both Puyos and Tetriminos. What is this mode called?", ["FUSION", "FUSION MODE"], "Fusion Mode is unique in that you use both Puyos and Tetriminos."));
            this.questions.push(new objects.Question("Which Mario Party game featured the Paper Mario Star Spirits?", ["MARIO PARTY 5", "5", "FIVE", "MARIO PARTY: THE TOP 100", "MARIO PARTY TOP 100"], "Mario Party 5 featured the Star Spirits who were guarding the Dream Depot."));
            this.questions.push(new objects.Question("Name the song required to enter the Wind Temple in The Legend of Zelda: The Wind Waker.", ["WIND GOD'S ARIA", "WIND GODS ARIA"], "The Wind God's Aria, learned from the previous Sage of Wind, is required to enter and progress through the Wind Temple."));
            this.questions.push(new objects.Question("In The Legend of Zelda: Phantom Hourglass, Zauz is a descendant of a race that vanished. What was this race called?", ["COBBLE", "COBBLE KINGDOM"], "The Cobble were a race that only appeared in Phantom Hourglass. They served under the Ocean King."));
            this.questions.push(new objects.Question("In Danganronpa V3, the Ultimate Artist Angie Yonaga worships a God. What is the God's name?", ["ATUA"], "Atua, the God of the Island, is Angie's God who speaks through her."));
            this.questions.push(new objects.Question("What Pokémon is listed as number 666 in the National Pokédex?", ["VIVILLON", "VIVILLION"], "Number 666 in the National Pokédex is none other than the butterfly Vivillon."));
            this.questions.push(new objects.Question("In Persona 3, you raise the Hermit Social Link through an online game. What is the online game called?", ["INNOCENT SIN ONLINE"], "You play the online game \"Innocent Sin Online\", a reference to the first of the Persona 2 duology."));
            this.questions.push(new objects.Question("In Pokémon Sword and Shield, what is Opal's favourite colour?", ["PURPLE"], "While she likes to see the pink in others, her favourite colour is actually purple."));
            this.questions.push(new objects.Question("GTA V takes place in the \"lovely\" city of Los Santos, which is based on a real-life US city. Which city?", ["LOS ANGELES", "ANGELES", "LOS ANGELES, CALIFORNIA", "LOS ANGELES CALIFORNIA", "LA"], "Los Santos is based on the real-life city Los Angeles."));
            this.questions.push(new objects.Question("Name one of the two new Pikmin introduced in Pikmin 3.", ["ROCK PIKMIN", "WINGED PIKMIN", "ROCK", "WINGED", "WING", "WING PIKMIN", "FLYING", "FLYING PIKMIN"], "Rock Pikmin and Winged Pikmin were new species' of Pikmin introduced in Pikmin 3."));
            this.questions.push(new objects.Question("Pokémon Conquest for the Nintendo DS is a crossover between two series; Pokémon being one of them. What was the other series?", ["NOBUNAGA'S AMBITION", "NOBUNAGA AMBITION", "NOBUNAGA'S AMBITIONS", "NOBUNAGA AMBITIONS"], "Pokémon Conquest is the crossover between Pokémon and Nobunaga's Ambition, developed by Koei."));
            this.questions.push(new objects.Question("In The Legend of Zelda Oracle games, there are three animal companions. Name one of them.", ["MOOSH", "RICKY", "DIMITRI", "MOSH", "RICKI", "RIKI"], "The three animal companions are: Ricky the kangaroo, Moosh the bear, and Dimitri the Dodongo."));
            this.questions.push(new objects.Question("Dragon Quest XI originally released on two platforms in Japan before releasing worldwide. Name the platform that did not get a worldwide release.", ["NINTENDO 3DS", "3DS", "N3DS"], "Dragon Quest XI released simultaneously on the Nintendo 3DS and Playstation 4. The 3DS version was never released outside of Japan."));
            this.questions.push(new objects.Question("In Okami, Issun is from a race of sprite-like creatures. What is this race called?", ["PONCLE", "PONCLES"], "Issun is a Poncle from Ponc'tan."));
            this.questions.push(new objects.Question("In Pokémon Gold, Silver, and Crystal, what game console did Red have in his house?", ["N64", "NINTENDO 64", "NINTENDO64", "N 64"], "Red replaced his SNES (or Super Famicom) with a Nintendo 64."));
            this.questions.push(new objects.Question("How many empty bottles are there to collect in The Legend of Zelda: Majora's Mask 3D?", ["7", "SEVEN", "SEPT"], "There are 7 bottles to collect in the 3DS remake of Majora's Mask; one more than the original N64 version."));
            this.questions.push(new objects.Question("In Fire Emblem: Three Houses, there are 2 characters who have their B-rank support locked until the timeskip. Name one of them.", ["CASPAR", "FERDINAND", "CASPAR VON BERGLIEZ", "CASPAR BERGLIEZ", "FERDINAND AEGIR", "FERDINAND VON AEGIR"], "Caspar von Bergliez and Ferdinand von Aegir have their B-rank support locked until the timeskip."));
            this.questions.push(new objects.Question("Mario didn't always have the memorable name he has now. What was his original name?", ["JUMPMAN", "JUMP MAN"], "Back in Donkey Kong for the Arcade, Mario was simply known as Jumpman."));
            this.questions.push(new objects.Question("The Insect Glaive was introduced in which Monster Hunter entry?", ["MONSTER HUNTER 4", "4"], "Monster Hunter 4 introduced the Insect Glaive weapon."));
            this.questions.push(new objects.Question("What year did the first Monster Hunter game release in Japan and North America?", ["2004"], "The first Monster Hunter released in 2004 for the PlayStation 2."));
            this.questions.push(new objects.Question("How many Green Stars are in Super Mario Galaxy?", ["3", "THREE"], "There are 3 Green Stars hidden throughout the game you must find to unlock some of the most difficult galaxies in the game."));
            this.questions.push(new objects.Question("In Persona 3, what form did the Velvet Room take?", ["AN ELEVATOR", "ELEVATOR"], "In Persona 3, the Velvet Room took the form of an elevator, representing the journey to the top of the tower known as Tartarus. It stops when the journey has reached its end."));
            this.questions.push(new objects.Question("In Persona 4, what form did the Velvet Room take?", ["A LIMO", "LIMO", "A LIMOUSINE", "LIMOUSINE", "LIMOSINE", "A LIMOSINE"], "In Persona 4, the Velvet Room took the form of a limousine driving through the fog, representing the journey through the fog in search of the truth."));
            this.questions.push(new objects.Question("In Persona 5, what form did the Velvet Room take?", ["A PRISON", "CELL", "PRISON", "A CELL", "JAIL", "A JAIL"], "In Persona 5, the Velvet Room took the form of a prison, representing the journey to escape the shackles and the beings that suppress."));
            this.questions.push(new objects.Question("How many transfer students transferred to Gekkoukan High School in Persona 3?", ["3", "THREE", "4", "FOUR"], "There were 3 notable transfer students to Gekkoukan High School: The Protagonist, Aigis, and Ryoji Mochizuki. There was also Bebe, a foreign exchange student from France."));
            this.questions.push(new objects.Question("What is the initial Persona of the Persona 4 Protagonist?", ["IZANAGI"], "Izanagi is the Persona 4 Protagonist's initial Persona, obtained through mysterious means that reveal itself throughout the story."));
            this.questions.push(new objects.Question("In Pokémon FireRed and LeafGreen, the security guards that block Saffron City are all thirsty. What drink quenches their thirst?", ["TEA"], "The four security guards all accept your single cup of tea to quench their thrist and let you pass to Saffron City."));
            this.questions.push(new objects.Question("In Pokémon Diamond, Pearl, and Platinum, Cynthia gives you a SecretPotion to cure the Psyduck's headache. What city is the SecretPotion originally from?", ["CIANWOOD", "CIANWOOD CITY"], "The SecretPotion is originally from Cianwood City in the Johto Region, specifically the Cianwood City Pharmacy."));
            this.questions.push(new objects.Question("In Golden Sun, what is the name of the final Gladiator Isaac fights in Colosso?", ["NAVAMPA", "NEVAMPA"], "Navampa is the final Gladiator who Isaac fights in Colosso. He scored last during the trials, but was evidently the strongest in the end."));
            this.questions.push(new objects.Question("Where are the Elemental Stars located before Isaac finds them in Golden Sun?", ["SOL SANCTUM"], "The first dungeon of the game, Sol Sanctum, houses the Elemental Stars. There are many traps that can cause destruction in order to guard the Elemental Stars."));
            this.questions.push(new objects.Question("How many Korok Seeds are there in total in The Legend of Zelda: Breath of the Wild?", ["900"], "There are 900 Korok Seeds scattered throughout Hyrule in The Legend of Zelda: Breath of the Wild."));
            this.questions.push(new objects.Question("Name one of the Battle Subway Bosses from Pokémon Black, White, Black 2, and White 2", ["INGO", "EMMET", "EMET"], "The two Subway Bosses are Ingo and Emmet, Ingo being the boss of the Single Train and Super Single Train and Emmet being the boss of the Double Train and Super Double Train. You fight them both in the Multi Train and Super Multi Train."));
            this.questions.push(new objects.Question("Who is the final boss of the main story of Pokémon Black and White?", ["GHETSIS", "GETSIS", "GHETSIS HARMONIA GROPIUS"], "In a surprise twist, the final boss of the main story was Ghetsis, the leader of Team Plasma."));
            this.questions.push(new objects.Question("Name one of the yetis in The Legend of Zelda: Twilight Princess.", ["YETO", "YETA"], "Yeto and Yeta are two Yetis that live in Snowpeak, specifically an old mansion now known as the Snowpeak Ruins."));
            this.questions.push(new objects.Question("What instrument does Link play while transformed as a Deku Scrub in The Legend of Zelda: Majora's Mask?", ["DEKU PIPES", "PIPES"], "When Link uses the Ocarina of Time as a Deku Scrub, he instead plays Deku Pipes."));
            this.questions.push(new objects.Question("What is the name of the tall fellow in Tazmilly Village in Mother 3?", ["LEDER"], "Leder is the tall man who rings the bell in Tazmilly Village."));
            this.questions.push(new objects.Question("Who is Chairman Rose's brother in Pokémon Sword and Shield?", ["PEONY"], "In addition to being Chairman Rose's brother, Peony is a former Gym Leader and Champion."));
            this.questions.push(new objects.Question("Name the Wild Area location where there is a wandering Eevee evolution in Pokémon Sword and Shield.", ["LAKE OF OUTRAGE"], "The Lake of Outrage is a location where some very powerful and rare Pokémon inhabit."));
            this.questions.push(new objects.Question("Name the second evolutionary form of Sobble.", ["DRIZZILE"], "Drizzile"));
            this.questions.push(new objects.Question("Who was your companion in Stark Mountain in Pokémon Diamond, Pearl, and Platinum?", ["BUCK"], "Buck is your companion throughout Stark Mountain. He's also Elite Four Flint's younger brother."));
            this.questions.push(new objects.Question("Who gives you Blue's Pokégear number in Pokémon HeartGold and SoulSilver?", ["DAISY", "DAISY OAK"], "Daisy Oak, Blue's older sister, gives you his Pokégear number after obtaining the Earth Badge, having your Pokémon massaged 7 times, and show her a Pokémon with max friendship."));
            this.questions.push(new objects.Question("What Pokémon does Norman lend Wally to use in Pokémon Ruby, Sapphire, and Emerald?", ["ZIGZAGOON"], "Norman lends Wally a Zigzagoon to use to catch his first Pokémon."));
            this.questions.push(new objects.Question("Name one of the Core Crystal Hunter Blades in Xenoblade Chronicles 2.", ["PRAXIS", "THEORY"], "Praxis and Theory are two Blades who have caused much suffering when they were mercenaries."));
            this.questions.push(new objects.Question("What is the name of the game you play to obtain Poppiswap items in Xenoblade Chronicles 2?", ["TIGER! TIGER!", "TIGERTIGER", "TIGER TIGER"], "Tiger! Tiger! is a vertical sidescroller minigame you play inside Tora's house to optimize Tora's Artificial Blades."));
            this.questions.push(new objects.Question("The Ma-non in Xenoblade Chronicles X develop a love for a certain human food. What is the food?", ["PIZZA"], "The Ma-non get introduced to pizza once they decide to live in New LA. To them, it is one of the tastiest foods they've ever had."));
            this.questions.push(new objects.Question("In Persona 5, before she adopted the codename Noir, Haru Okumura introduced herself with a different name. What was that name?", ["BEAUTY THIEF", "THE BEAUTY THIEF"], "Haru introduces herself to the Thieves as 'Beauty Thief'."));
            this.questions.push(new objects.Question("What species is Tigrex in the Monster Hunter series?", ["FLYING WYVERN"], "Tigrex is classified as part of the Flying Wyvern species."));
            this.questions.push(new objects.Question("Persona 3: Dancing in Moonlight and DLC had every playable character from Persona 3, except for one. Who was missing?", ["KOROMARU"], "The dog, Koromaru, was the only playable character from Persona 3 to not be playable in Persona 3: Dancing in Moonlight."));
            this.questions.push(new objects.Question("What was the last Crash Bandicoot game that Naughty Dog worked on?", ["CRASH TEAM RACING", "CTR"], "Crash Team Racing was the last Crash Bandicoot game that the Company developed before completely handing it over to another Studio"));
            this.questions.push(new objects.Question("Name one of the factions in Xenoblade Chronicles 3.", ["KEVES", "AGNUS", "CITY", "THE CITY", "NOPON CARAVAN"], "In the Land of Aionios there are two main factions: Keves and Agnus. However, there is rumoured third faction."));
            this.questions.push(new objects.Question("In Metroid: Samus Returns, how many Metroids do you hunt down?", ["50", "FIFTY"], "At the start there are 40 known Metroids to hunt down, but there are actually 10 additional ones."));
            this.questions.push(new objects.Question("What character is Captain Spaceboy/Space Boyfriend in love with in the game OMORI?", ["SWEETHEART"], "Sweetheart is the apple of Captain Spaceboy/Space Boyfriend's eye."));
        };
        return EasyQuestion;
    }(createjs.Container));
    objects.EasyQuestion = EasyQuestion;
})(objects || (objects = {}));
//# sourceMappingURL=easy.js.map
module objects {
  export class EasyQuestion extends createjs.Container{
    
    public logo:objects.Logo;
    public questionLabel: objects.Label;
    public answerLabel: objects.Label;
    public submit: objects.SubmitButton;

    private assetManager:createjs.LoadQueue;
    
    private type:number;
    private logoType:string;
    private musicType:string;
    private questions:Array<objects.Question> = [];
    private chosenQuestion: objects.Question;

    private bgm:createjs.AbstractSoundInstance;

    private canvas = document.getElementById("canvas");
    public txt = document.createElement("input");

    constructor(assetManager:createjs.LoadQueue, type:number = 0) {
      super();
      this.assetManager = assetManager;
      this.type = type;
      this.Start();
    }

    public Start():void {
      if (this.type == 0) {
        this.loadEasyQuestions();
        this.logoType = "easybg";
        this.musicType = "earthbound";

        let num = Math.floor(Math.random() * this.questions.length);
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

        let num = Math.floor(Math.random() * this.questions.length);
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

        let num = Math.floor(Math.random() * this.questions.length);
        while (objects.Game.trickyQuestions.indexOf(num) != -1) {
          num = Math.floor(Math.random() * this.questions.length);
        }        
        this.chosenQuestion = this.questions[num];
        objects.Game.trickyQuestions.push(num);
      }

      // Logo & Question
      if (this.logoType == "tricky") 
      {
        this.logo = new objects.Logo(this.assetManager,this.logoType,this.canvas.clientWidth * 0.5 - 373, 50);
        this.questionLabel = new objects.Label(this.chosenQuestion.question, "20pt", "Verdana", "#FFF", 30, 500);
        this.answerLabel = new objects.Label(this.chosenQuestion.answerDesc, "20pt", "Verdana", "#FFF", 30, 500);
      }
      else 
      {
        this.logo = new objects.Logo(this.assetManager,this.logoType,0, 0);
        this.questionLabel = new objects.Label(this.chosenQuestion.question, "20pt", "Verdana", "#000", 30, 515);
        this.answerLabel = new objects.Label(this.chosenQuestion.answerDesc, "20pt", "Verdana", "#000", 30, 515);
      }
      this.questionLabel.lineWidth = 930;
      this.answerLabel.lineWidth = 930;
      // Submit button
      this.submit = new objects.SubmitButton(this.assetManager, "triangle", 660, 655);
      this.submit.on("click", () => {
        this.checkAnswer(this.chosenQuestion);
      });

      // Music 
      this.bgm = createjs.Sound.play(this.musicType);
      this.bgm.loop = -1;
      
      // Text field
      this.txt.setAttribute("type", "text");
      this.txt.id = "input";

      this.txt.addEventListener("keyup", (event:KeyboardEvent) => {
        if(event.keyCode === 13) {
          this.checkAnswer(this.chosenQuestion);
        }
      })
      document.getElementById("text").appendChild(this.txt);

      this.Main();
    }
    public Main():void{  
      this.addChild(this.logo);
      this.addChild(this.questionLabel);
      this.addChild(this.submit);
    } 
    
    public checkAnswer(cq:objects.Question):void {
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
    }

    public loadEasyQuestions():void {
      this.questions.push(new objects.Question("How many members are a part of Organization XIII in Kingdom Hearts 358/2 Days?",
      ["13", "THIRTEEN", "TREIZE", "XIII"],"Organization XIII is comprised of 13 members in Kingdom Hearts 358/2 Days."));
      this.questions.push(new objects.Question("What is Nintendo's online service for the Nintendo Switch called?",
      ["NINTENDO SWITCH ONLINE", "NSO"],"The Nintendo Switch Online is a subscription service required for playing games online."));
      this.questions.push(new objects.Question("What item does Pikachu need to evolve in Pokémon Red and Blue?",
      ["THUNDERSTONE", "THUNDER STONE"],"Pikachu needs a thunderstone in order to evolve into Raichu."));
      this.questions.push(new objects.Question("What can the Inklings from Splatoon transform into?",
      ["SQUID", "SQUIDS"],"Inklings have the ability to transform between squid form and a humanoid form."));
      this.questions.push(new objects.Question("What weapon type does Marth exclusively use in Fire Emblem: Shadow Dragon?",
      ["SWORD", "SWORDS", "RAPIER", "RAPIERS"],"Marth can only use swords in Fire Emblem: Shadow Dragon, which isn't the best weapon type."));
      this.questions.push(new objects.Question("What was Princess Peach's original localized name?",
      ["TOADSTOOL", "PRINCESS TOADSTOOL", "TOAD STOOL", "PRINCESS TOAD STOOL"],"Princess Peach's original name in the west was \"Princess Toadstool\". In Japan, she was always known as \"Princess Peach.\""));
      this.questions.push(new objects.Question("Who was Sonic's companion in Sonic the Hedgehog 2?",
      ["TAILS", "MILES", "MILES PROWER", "MILES TAILS PROWER", "MILES \"TAILS\" PROWER", "TAIL"],"Accompanying Sonic in Sonic the Hedgehog 2 was Miles \"Tails\" Prower."));
      this.questions.push(new objects.Question("Name one of the four unlockable characters in Super Smash Bros. for the Nintendo 64.",
      ["NESS", "LUIGI", "JIGGLYPUFF", "JIGGLY PUFF", "CAPTAIN FALCON", "FALCON", "DOUGLAS"],"The four unlockable characters in Super Smash Bros. for the Nintendo 64 were: Luigi, Ness, Captain Falcon, and Jigglypuff."));
      this.questions.push(new objects.Question("What is the name of Link's horse in The Legend of Zelda: Ocarina of Time?",
      ["EPONA"],"Epona is Link's horse companion who he meets as a child."));
      this.questions.push(new objects.Question("The first Mario Kart was released on the Super Famicon/Super Nintendo. What was it called?",
      ["SUPER MARIO KART"],"Super Mario Kart was the first Mario Kart game released."));
      this.questions.push(new objects.Question("These standard balls can capture Pokémon with a little luck.",
      ["POKE BALLS", "POKÉ BALLS", "POKE BALL", "POKEBALLS", "POKEBALL"],"Poké Balls are used to capture the creatures in the world of Pokémon."));
      this.questions.push(new objects.Question("Either he starts with it or not, the hero of The Legend of Zelda is known for his tunic. What colour is it?",
      ["GREEN", "VERDE", "GRN"],"Almost always does Link go through his adventures in a green tunic."));
      this.questions.push(new objects.Question("Tom Nook has given us a phone. But not just any phone, a _____Phone!",
      ["NOOK PHONE", "NOOK", "NOOKPHONE"], "The NookPhone is a handy device for managing your assets."));
      this.questions.push(new objects.Question("What do you use to combat enemies in Paper Mario: Sticker Star?",
      ["STICKERS", "STICKER"],"Stickers are how Mario fights his way through battle in Paper Mario: Sticker Star."));
      this.questions.push(new objects.Question("How many playable games are in Clubhouse Games: 51 Worldwide Classics?",
      ["51", "FIFTY ONE", "FIFTY-ONE", "FIFTYONE", "52"],"There are 51 games in Clubhouse Games: 51 Worldwide Classics, though there is a secret 52nd game."));
      this.questions.push(new objects.Question("Shin Megami Tensei is the parent series for a certain, popular JRPG series starring Joker from Smash Bros. What is this popular series?",
      ["PERSONA", "SMT PERSONA", "SMT:PERSONA"],"The Persona franchise has outshone its origin series by a lot."));
      this.questions.push(new objects.Question("This unique controller for the Nintendo Wii resembles a TV remote.", 
      ["WII REMOTE", "WIIMOTE", "WII REMOTE", "WIIREMOTE", "WII MOTE"], "The Wii Remote was weird. The term Wiimote is a colloquial term."));
      this.questions.push(new objects.Question("In The Legend of Zelda: Majora's Mask, Link's main goal is to retrieve this mask:",
      ["MAJORA'S MASK", "MAJORA MASK", "MAJORAS MASK", "MAJORA", "MAJORA'S"], "Link begins his adventures in Termina to retrieve Majora's Mask for the Happy Mask Salesman."));
      this.questions.push(new objects.Question("Story of Seasons: Friends of Mineral Town introduced the Strawberry Cow. What kind of milk does it produce?",
      ["STRAWBERRY MILK", "STRAWBERRY", "STRAW BERRY", "STRAW BERRY MILK"], "Strawberry Milk is a new produce from the new Strawberry Cows."));
      this.questions.push(new objects.Question("Who is Bowser Jr.'s dad?",
      ["BOWSER", "DOUG BOWSER"], "The son of Bowser, Bowser Jr. first appeared in Super Mario Sunshine."));
      this.questions.push(new objects.Question("Which entry in the Monster Hunter series introduced swimming and underwater combat?",
      ["3", "MONSTER HUNTER 3", "TRI", "MONSTER HUNTER TRI", "MONSTER HUNTER: TRI", "MONSTER HUNTER 3 ULTIMATE", "MONSTER HUNTER 3: ULTIMATE"], "Swimming and underwater combat were introduced to the Monster Hunter series in Monster Hunter 3."));
      this.questions.push(new objects.Question("The Gore Magala was the flagship monster of which Monster Hunter title?",
      ["4", "MONSTER HUNTER 4"], "The Gore Magala was the flagship monster of Monster Hunter 4."));
      this.questions.push(new objects.Question("What are the two items you need to combine to make a potion in Monster Hunter (Pre-Rise)? (Separate the words like: \"word1 and word2\")",
      ["BLUE MUSHROOM AND HERB", "A BLUE MUSHROOM AND A HERB", "A BLUE MUSHROOM AND AN HERB", "A BLUE MUSHROOM AND HERB", "BLUE MUSHROOM AND A HERB", "BLUE MUSHROOM AND AN HERB", "HERB AND BLUE MUSHROOM", "HERB AND A BLUE MUSHROOM", "HERB AND BLUE MUSHROOMS"], "One of the first things you learn how to make in Monster Hunter is a potion using a Blue Mushroom and an Herb."));
      this.questions.push(new objects.Question("The first and most basic drink you're taught how to make in VA-11 Hall-A is:",
      ["SUGAR RUSH", "SUGARRUSH"], "The first drink you make is Sugar Rush."));
    }

    public loadBrutalQuestions():void {
      this.questions.push(new objects.Question("In the Friends of Mineral Town games in the Harvest Moon/Story of Seasons series, there is a character named Kappa who only accepts one gift. What is this one gift?",
      ["CUCUMBER", "CUCUMBERS"],"Kappa only likes cucumbers. Nothing more, nothing less."));
      this.questions.push(new objects.Question("In Phoenix Wright Ace Attorney: Trials and Tribulations, Phoenix's main rival prosecutor is the mysterious Godot. How many cups of coffee does Godot drink per trial day?",
      ["17", "SEVENTEEN"],"Godot has a rule where he drinks 17 cups of coffee during a trial and no more."));
      this.questions.push(new objects.Question("In Xenoblade Chronicles, there is an item called the Love Source which is the best item for raising affinity between two party members. There is only one item that can be traded for it. What is the item?",
      ["VERITAS GLYPHS", "VERITAS GLYPH"],"The rare Veritas Glyphs is the only item that can be traded for the Love Source. The item is rare as only the game's superbosses can drop it."));
      this.questions.push(new objects.Question("How many amiibo does the Legend of Zelda protagonist \"Link\" have (as of 08/2021)?",
      ["13", "THIRTEEN"],"There are 13 total Link amiibos: \nSmash Bros. Link, Smash Bros. Toon Link, Wolf Link, Wind Waker Toon Link, Ocarina of Time Link, 8-Bit Link, Rider Link, Archer Link, Twilight Princess Link, Skyward Sword Link, Majora's Mask Young Link, Smash Bros. Young Link, Link's Awakening Link."));
      this.questions.push(new objects.Question("Which Pokémon is known as the Legendary Pokémon?",
      ["ARCANINE"],"Oddly enough, Arcanine's category is the Legendary Pokémon."));
      this.questions.push(new objects.Question("Which Pokémon game was the first to remove the slot machine minigame?",
      ["POKEMON DIAMOND", "POKEMON PEARL", "POKEMON DIAMOND AND PEARL", "POKÉMON DIAMOND", "POKÉMON PEARL", "POKÉMON DIAMOND AND PEARL", "DIAMOND", "PEARL","DIAMOND AND PEARL"], "The South Korean versions of Pokémon Diamond and Pearl were the first to remove the slot machine minigame. This change will be carried over to the European version of Pokémon Platinum."));
      this.questions.push(new objects.Question("In Tales of Symphonia, Lloyd obtains two swords that together are called the Material Blade. Name one of the swords.",
      ["VORPAL", "VORPAL SWORD", "VORPAL BLADE", "FLAMBERGE"],"The Vorpal Sword and the Flamberge are the two swords that make up Lloyd's Material Blade. They are also reoccuring weapons throughout the series."));
      this.questions.push(new objects.Question("In The Legend of Zelda: Breath of the Wild, a character named Purah who assists Link by enhancing his Sheikah Slate. How old is she? (Leeway of 2)",
      ["124", "122", "123", "125", "126"],"In the game, Purah was able to reverse aging. According to the book \"Creating a Champion\", she is 124 years old."));
      this.questions.push(new objects.Question("In Pokémon Black, White, Black 2, and White 2 various NPC musicians can affect the background music. What instrument can be added to the music in Anville Town?",
      ["FLUTE", "FLUTES", "FLAUTIST"],"Talking to the flautist will add a flute track to the background music."));
      this.questions.push(new objects.Question("In Detroit: Become Human your choices make a difference. What is the name of the fish you can save?",
      ["DEWEY, DEWY"], "\"Alexa, ask CyberLife to tell me about the fish.\"...Did you save Dewey? Software Instability increased."));
      this.questions.push(new objects.Question("Super Smash Bros. Brawl was an incredible entry in the Nintendo Crossover series. How many stickers were in the game? (Leeway of 20)",
      ["R,680,720"],"There were 700 stickers to collect across the various modes."));
      this.questions.push(new objects.Question("In The World Ends With You, each piece of clothing has an in-universe brand. What brand is Neku's headphones?",
      ["GATITO"],"Neku's headphones are of Gatito brand and called \"My Phones\"."));
      this.questions.push(new objects.Question("The Koopalings are 7 of Bowser's minions, appearing a lot more in recent games. Iggy, Roy, Larry, Morton, Wendy, and Ludwig. Name the missing Koopaling.",
      ["LEMMY", "LEMY", "LEMMY KOOPA"],"Lemmy Koopa is the youngest of the koopalings and usually uses bouncy balls during his battles."));
      this.questions.push(new objects.Question("Globox is an important character in the Rayman series. Surprisingly, he's quite the father figure with over ______ children (leeway of 50).", 
      ["R,600,700"], "Together with Uglette, they have over 650 children."));
      this.questions.push(new objects.Question("Crash Bandicoot has as much similarities to bandicoots as Sonic to hedgehogs. During conception, Crash wasn't his name. What was Crash's original name?",
      ["WILLY THE WOMBAT", "WILLY", "WILLIE", "WILLIE THE WOMBAT"], "Willy or Willie was Crash's original name. In the internal files, Crash is referred to as \"willy\""));
      this.questions.push(new objects.Question("In Super Mario 64, the first characters created were Mario and one other. Who was the other one?",
      ["MIPS", "YELLOW RABBIT", "RABBIT"], "The rabbit that appears in the basement, MIPS, was created alongside Mario."));
      this.questions.push(new objects.Question("The Konami Code is famous within gaming. What was the first NES game to use the code?",
      ["GRADIUS"], "Gradius was the very first NES game to use the Konami Code."));
      this.questions.push(new objects.Question("In Super Mario Sunshine, Mario must find all of the missing Shine Sprites. There are quite a bit in Delfino Plaza. Not counting the airstrip or Bowser shines, and counting the Blue Coins, how many Shine Sprites are in Delfino Plaza?",
      ["39"], "There are a total of 39 Shine Sprites in Delfino Plaza. That is almost a third of the missing Shine Sprites."));
      this.questions.push(new objects.Question("In Super Mario Bros. 3, the Kuribo's Shoe was eventually correctly localized to Goomba's Shoe. The overworld Cloud item, however, was never localized correctly. What is the Cloud's non-localized name?",
      ["JUGEM'S CLOUD", "JUGEM CLOUD", "JUGEMS CLOUD"], "The Cloud, or rather Lakitu's Cloud, was never localized and is called Jugem's Cloud, Jugem being the romanization of Lakitu's Japanese name: Jugemu."));
    }

    public loadTrickyQuestions():void{
      this.questions.push(new objects.Question("What is the best-selling Nintendo handheld console to date?",
      ["NINTENDO DS", "DS"], "The Nintendo DS is the best-selling Nintendo handheld console to date."));
      this.questions.push(new objects.Question("How many Shine Sprites do you need to obtain the sunglasses in Super Mario Sunshine?",
      ["30", "THIRTY"], "Once you collect 30 Shine Sprites, you can obtain sunglasses where its only function is to darken the screen."));
      this.questions.push(new objects.Question("In Puyo Puyo Tetris, there is a mode that uses both Puyos and Tetriminos. What is this mode called?",
      ["FUSION", "FUSION MODE"], "Fusion Mode is unique in that you use both Puyos and Tetriminos."));
      this.questions.push(new objects.Question("Which Mario Party game featured the Paper Mario Star Spirits?",
      ["MARIO PARTY 5", "5", "FIVE", "MARIO PARTY: THE TOP 100", "MARIO PARTY TOP 100"], "Mario Party 5 featured the Star Spirits who were guarding the Dream Depot."));
      this.questions.push(new objects.Question("Name the song required to enter the Wind Temple in The Legend of Zelda: The Wind Waker.",
      ["WIND GOD'S ARIA", "WIND GODS ARIA"], "The Wind God's Aria, learned from the previous Sage of Wind, is required to enter and progress through the Wind Temple."));
      this.questions.push(new objects.Question("In The Legend of Zelda: Phantom Hourglass, Zauz is a descendant of a race that vanished. What was this race called?",
      ["COBBLE", "COBBLE KINGDOM"], "The Cobble were a race that only appeared in Phantom Hourglass. They served under the Ocean King."));
      this.questions.push(new objects.Question("In Danganronpa V3, the Ultimate Artist Angie Yonaga worships a God. What is the God's name?",
      ["ATUA"], "Atua, the God of the Island, is Angie's God who speaks through her."));
      this.questions.push(new objects.Question("What Pokémon is listed as number 666 in the National Pokédex?",
      ["VIVILLON", "VIVILLION"], "Number 666 in the National Pokédex is none other than the butterfly Vivillon."));
      this.questions.push(new objects.Question("In Persona 3, you raise the Hermit Social Link through an online game. What is the online game called?",
      ["INNOCENT SIN ONLINE"], "You play the online game \"Innocent Sin Online\", a reference to the first of the Persona 2 duology."));
      this.questions.push(new objects.Question("In Pokémon Sword and Shield, what is Opal's favourite colour?",
      ["PURPLE"], "While she likes to see the pink in others, her favourite colour is actually purple."));
      this.questions.push(new objects.Question("GTA V takes place in the \"lovely\" city of Los Santos, which is based on a real-life US city. Which city?",
      ["LOS ANGELES", "ANGELES", "LOS ANGELES, CALIFORNIA", "LOS ANGELES CALIFORNIA", "LA"], "Los Santos is based on the real-life city Los Angeles."));
      this.questions.push(new objects.Question("Name one of the two new Pikmin introduced in Pikmin 3.",
      ["ROCK PIKMIN", "WINGED PIKMIN", "ROCK", "WINGED", "WING", "WING PIKMIN", "FLYING", "FLYING PIKMIN"], "Rock Pikmin and Winged Pikmin were new species' of Pikmin introduced in Pikmin 3."));
      this.questions.push(new objects.Question("Pokémon Conquest for the Nintendo DS is a crossover between two series; Pokémon being one of them. What was the other series?",
      ["NOBUNAGA'S AMBITION", "NOBUNAGA AMBITION", "NOBUNAGA'S AMBITIONS", "NOBUNAGA AMBITIONS"], "Pokémon Conquest is the crossover between Pokémon and Nobunaga's Ambition, developed by Koei."));
      this.questions.push(new objects.Question("In The Legend of Zelda Oracle games, there are three animal companions. Name one of them.",
      ["MOOSH", "RICKY", "DIMITRI", "MOSH", "RICKI", "RIKI"], "The three animal companions are: Ricky the kangaroo, Moosh the bear, and Dimitri the Dodongo."));
      this.questions.push(new objects.Question("Dragon Quest XI originally released on two platforms in Japan before releasing worldwide. Name the platform that did not get a worldwide release.",
      ["NINTENDO 3DS", "3DS", "N3DS"], "Dragon Quest XI released simultaneously on the Nintendo 3DS and Playstation 4. The 3DS version was never released outside of Japan."));
      this.questions.push(new objects.Question("In Okami, Issun is from a race of sprite-like creatures. What is this race called?",
      ["PONCLE", "PONCLES"], "Issun is a Poncle from Ponc'tan."));
      this.questions.push(new objects.Question("In Pokémon Gold, Silver, and Crystal, what game console did Red have in his house?",
      ["N64", "NINTENDO 64", "NINTENDO64", "N 64"], "Red replaced his SNES (or Super Famicom) with a Nintendo 64."));
      this.questions.push(new objects.Question("How many empty bottles are there to collect in The Legend of Zelda: Majora's Mask 3D?",
      ["7", "SEVEN", "SEPT"], "There are 7 bottles to collect in the 3DS remake of Majora's Mask; one more than the original N64 version."));
      this.questions.push(new objects.Question("In Fire Emblem: Three Houses, there are 2 characters who have their B-rank support locked until the timeskip. Name one of them.",
      ["CASPAR", "FERDINAND", "CASPAR VON BERGLIEZ", "CASPAR BERGLIEZ", "FERDINAND AEGIR", "FERDINAND VON AEGIR"], "Caspar von Bergliez and Ferdinand von Aegir have their B-rank support locked until the timeskip."));
      this.questions.push(new objects.Question("Mario didn't always have the memorable name he has now. What was his original name?",
      ["JUMPMAN", "JUMP MAN"], "Back in Donkey Kong for the Arcade, Mario was simply known as Jumpman."));
      this.questions.push(new objects.Question("The Insect Glaive was introduced in which Monster Hunter entry?",
      ["MONSTER HUNTER 4", "4"], "Monster Hunter 4 introduced the Insect Glaive weapon."));
      this.questions.push(new objects.Question("What year did the first Monster Hunter game release in Japan and North America?",
      ["2004"], "The first Monster Hunter released in 2004 for the PlayStation 2."));
    }
  }
}
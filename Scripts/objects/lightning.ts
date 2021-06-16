module objects {
  export class Lightning extends createjs.Container {
    public logo:objects.Logo;
    public questionLabel: objects.Label;
    public answerLabel: objects.Label;
    public circleGreen: objects.SubmitButton;
    public circleRed: objects.SubmitButton;
    public circles: Array<createjs.Bitmap> = [];
    public correct: number = 0;
    public timerLabel: objects.Label;

    private assetManager:createjs.LoadQueue;
    private questions:Array<objects.Question> = [];
    private chosenQuestion: objects.Question;
    private count:number = 0;
    private chosenAnswers:Array<number> = [];
    private timer:number = 30;
    
    private canvas = document.getElementById("canvas");
    private bgm:createjs.AbstractSoundInstance;

    constructor(assetManager:createjs.LoadQueue) {
      super();
      this.assetManager = assetManager;
      
      this.Start();
    }

    public Start():void{
      this.loadQuestions();

      let num = Math.floor(Math.random() * this.questions.length);
      while (objects.Game.lightningQuestions.indexOf(num) != -1) {
        num = Math.floor(Math.random() * this.questions.length);
      }
      this.chosenQuestion = this.questions[num];
      objects.Game.lightningQuestions.push(num);

      //#region MAIN
      // Logo & Question
      this.logo = new objects.Logo(this.assetManager,"lightning",this.canvas.clientWidth * 0.5 - 373, 50);
      this.questionLabel = new objects.Label(this.chosenQuestion.question, "bold 28pt", "Candara", "#FFF", this.canvas.clientWidth * 0.5, 520,true);
      this.answerLabel = new objects.Label(this.chosenQuestion.answers[0], "24pt", "Candara", "#FFF", 490, 550);
      this.questionLabel.lineWidth = 930;
      this.answerLabel.lineWidth = 930;
      this.answerLabel.textAlign = "center";

      this.circleGreen = new objects.SubmitButton(this.assetManager, "circlegrn", this.canvas.clientWidth * 0.5 - 124, 600);
      this.circleRed = new objects.SubmitButton(this.assetManager, "circlered", this.canvas.clientWidth * 0.5 + 20, 600);
      this.timerLabel = new objects.Label(this.timer + "", "32pt", "Arial", "#FFF", this.canvas.clientWidth - 70, this.canvas.clientHeight - 60);

      this.circleGreen.on("click", () => {
        if (this.chosenAnswers.push(0) == 5){
          objects.Game.lightningFinish = true;
        }
        this.nextAnswer();
      }) 
      this.circleRed.on("click", () => {
        if (this.chosenAnswers.push(1) == 5){
          objects.Game.lightningFinish = true;
        }
        this.nextAnswer();
      }) 

      this.bgm = createjs.Sound.play("race");
      this.bgm.loop = -1;

      this.countdown();
      this.Main();
    }

    public Main():void{
      this.addChild(this.logo);
      this.addChild(this.questionLabel);
      this.addChild(this.answerLabel);
      this.addChild(this.circleGreen);
      this.addChild(this.circleRed);
      this.addChild(this.timerLabel);
    }

    public Update():void{
      this.timerLabel.text = this.timer+"";
    }

    public nextAnswer():void{
      ++this.count;
      this.answerLabel.text = this.chosenQuestion.answers[this.count]
    }

    public showResults():void{
      this.bgm.stop();

      let x = 209;
      let y = 600;
      // Correct and wrong circle images displayed based on answer comparisons
      for (let i = 0; i < 5; i++) {
        let circle1 = new createjs.Bitmap(this.assetManager.getResult("circlegrn"));
        let circle2 = new createjs.Bitmap(this.assetManager.getResult("circlered"));
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
    }

    public countdown() {
      const interval = setInterval(() => {
        this.timer--;
        if (this.timer < 0) {
          clearInterval(interval);
          for (let i = 0; i < 5; i++) {
            if (this.chosenAnswers.push(2) == 5){
              objects.Game.lightningFinish = true;
            }
          }
        }
      }, 1000);
    }
    //#endregion
    public loadQuestions():void{
      // Question, Answers Shown, Correct Answers [0 = right, 1 = wrong]
      this.questions.push(new objects.Question("PIKMIN COLOURS: Real or Fake",
      ["Red", "Blue", "Green", "Orange", "Purple"],"",[0,0,1,1,0]));
      this.questions.push(new objects.Question("COSPLAY PIKACHUS: Real or Fake",
      ["Pikachu Libre", "Pikachu Detective", "Pikachu Beauty", "Pikachu Ph.D", "Pikachu Rock Star"],"",[0,1,1,0,0]));
      this.questions.push(new objects.Question("REVIVING ITEMS: Real or Fake",
      ["Revival Herb", "Phoenix Pinion", "Max Nut", "Stone Mirror", "Nasty Medicine"],"",[0,0,1,0,0]));
      this.questions.push(new objects.Question("POKÉWALKER AREAS: Real or Fake",
      ["White Forest", "Beyond the Sea", "National Park", "Blue Lake", "Treehouse"],"",[1,0,1,0,0]));
      this.questions.push(new objects.Question("PIKMIN ENEMIES: Pikmin 1 or Pikmin 2",
      ["Orange Bulborb", "Bumbling Snitchbug", "Armored Cannon Beetle", "Puffstool", "Raging Long Legs"],"",[1,1,0,0,1]));
      this.questions.push(new objects.Question("KINGDOM HEARTS PARTY MEMBERS: Real or Fake",
      ["Belle", "Tron", "Wendy", "Phil", "Cloud"],"",[1,0,1,1,0]));
      this.questions.push(new objects.Question("XENOBLADE CHRONICLES SHULK ARTS: Real or Fake",
      ["Back Slash", "Bone Upper", "Monado Smash", "Monado Cyclone", "Stream Edge"],"",[0,1,1,0,0]));
      this.questions.push(new objects.Question("HYRULE WARRIORS: DE WEAPONS: Real or Fake",
      ["Red Ring", "8-Bit Rupee", "Light Bow", "Sword of the Six Sages", "Pirate Pistol"],"",[0,0,1,1,1]));
      this.questions.push(new objects.Question("POKÉ BALLS: Real or Fake",
      ["Great Ball", "Speed Ball", "Park Ball", "Sun Ball", "Dream Ball"],"",[0,1,0,1,0]));
      this.questions.push(new objects.Question("DANGANRONPA TALENTS: Real or Fake",
      ["Ultimate Supreme Leader", "Ultimate Soccer Player", "Ultimate Icthyologist", "Ultimate Moral Compass", "Ultimate Photographer"],"",[0,1,1,0,0]));
      this.questions.push(new objects.Question("MASTER SWORD APPEARANCES IN LEGEND OF ZELDA",
      ["Spirit Tracks", "The Wind Waker", "Four Sword", "Majora's Mask", "Skyward Sword"],"",[1,0,1,1,0]));
      this.questions.push(new objects.Question("MARIO POWER-UPS: Real or Fake",
      ["Penguin Suit", "Superball Flower", "Dog Suit", "Blue Shell", "Super Crown"],"",[0,0,1,0,0]));
      this.questions.push(new objects.Question("KIRBY COPY ABILITIES: Real or Fake",
      ["Flower", "Bubble", "Burning", "Savate", "Cat"],"",[1,0,0,1,1]));
      this.questions.push(new objects.Question("PAPER MARIO (SERIES) PARTNERS: Yes or No",
      ["Goombario", "Marilyn", "Piccolo", "Flurrie", "Kamek"],"",[0,1,0,0,0]));
      this.questions.push(new objects.Question("SUPER MARIO GALAXY GALAXIES: Real or Fake",
      ["Honey Garden", "Hurry-Scurry", "Deep Dark", "Fleet Glide", "Goomba Moon"],"",[1,0,0,0,1]));
      this.questions.push(new objects.Question("PERSONA 5 CONFIDANTS: Real or Fake",
      ["Nozomi Suemitsu", "Shu Nakajima", "Tae Takemi", "Suguru Kamoshida", "Goro Akechi"],"",[1,1,0,1,0]));
      this.questions.push(new objects.Question("SUPER MARIO RPG GENO ATTACKS: Real or Fake",
      ["Geno Beam", "Geno Strike", "Geno Whirl", "Geno Cannon", "Geno Blast"],"",[0,1,0,1,0]));
      this.questions.push(new objects.Question("ZELDA ORACLE SEEDS: Real or Fake",
      ["Ember Seeds", "Gale Seeds", "Splash Seeds", "Dash Seeds", "Korok Seeds"],"",[0,0,1,1,1]));
      this.questions.push(new objects.Question("POKÉMON IN POKÉMON SNAP: Yes or No",
      ["Pikachu", "Gastly", "Dragonair", "Porygon", "Kingler"],"",[0,1,1,0,1]));
      this.questions.push(new objects.Question("SUPER MARIO BROS. 3 WORLDS: Real or Fake",
      ["Grass Land", "Water Land", "Fire Land", "Pipe Land", "Ice Land"],"",[0,0,1,0,0]));
      this.questions.push(new objects.Question("POKÉMON IN THE GALAR REGIONAL POKÉDEX: Yes or No",
      ["Banette", "Pyukumuku", "Elgyem", "Krookodile", "Togedemaru"],"",[1,0,0,1,0]));
    }
  }
}
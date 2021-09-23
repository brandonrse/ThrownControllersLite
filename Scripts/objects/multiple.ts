module objects {
  export class MultipleChoice extends createjs.Container{
    
    public logo:objects.Logo;
    public questionLabel: objects.Label;
    
    public answerLabel: objects.Label;
    public option1: objects.Label;
    public option2: objects.Label;
    public option3: objects.Label;
    public option4: objects.Label;
    public box1:objects.Box;
    public box2:objects.Box;
    public box3:objects.Box;
    public box4:objects.Box;
    
    private assetManager:createjs.LoadQueue;
    private questions:Array<objects.Question> = [];
    private chosenQuestion: objects.Question;

    private bgm:createjs.AbstractSoundInstance;

    private canvas = document.getElementById("canvas");
    public txt = document.createElement("input");

    constructor(assetManager:createjs.LoadQueue) {
      super();
      this.assetManager = assetManager;

      this.Start();
    }

    public Start():void{
      this.loadQuestions();

      // Choose random question
      let num = Math.floor(Math.random() * this.questions.length);
      while (objects.Game.multipleQuestions.indexOf(num) != -1) {
        num = Math.floor(Math.random() * this.questions.length);
      }
      this.chosenQuestion = this.questions[num];
      objects.Game.multipleQuestions.push(num);

      // Logo & Question
      // this.logo = new objects.Logo(this.assetManager,"multiplebg",this.canvas.clientWidth * 0.5 - 373, 50);
      this.logo = new objects.Logo(this.assetManager,"multiplebg",0, 0);
      this.questionLabel = new objects.Label(this.chosenQuestion.question, "20pt", "Verdana", "#000", 30, 500);
      this.answerLabel = new objects.Label(this.chosenQuestion.answerDesc, "20pt", "Verdana", "#000", 30, 500);

      this.questionLabel.lineWidth = 930;
      this.answerLabel.lineWidth = 930;

      this.bgm = createjs.Sound.play("earthbound");
      this.bgm.loop = -1;

      this.createBoxes();
      this.Main();
    }

    public Main():void{
      this.addChild(this.logo);
      this.addChild(this.questionLabel);
      this.addChild(this.box1);
      this.addChild(this.box2);
      this.addChild(this.box3);
      this.addChild(this.box4);
      this.addChild(this.box1.text);
      this.addChild(this.box2.text);
      this.addChild(this.box3.text);
      this.addChild(this.box4.text);
    }

    // Create the boxes underneath the text
    public createBoxes():void{
      var randomNumArr = [];
      while (randomNumArr.length < 4) {
        let r = Math.floor(Math.random() * 4);
        if (randomNumArr.indexOf(r) === -1) {
          randomNumArr.push(r);
        } 
      }

      // Change the answer to the new answer
      this.chosenQuestion.multipleAnswer = randomNumArr.indexOf(this.chosenQuestion.multipleAnswer);

      this.box1 = new objects.Box(0, 130, 567, "#ff9b9b", this.chosenQuestion.answers[randomNumArr[0]]);
      this.box1.on("click", () => {
        this.checkAnswer(this.box1.num, this.chosenQuestion.multipleAnswer);
      });

      this.box2 = new objects.Box(1, 320, 567, "#9dd4ff", this.chosenQuestion.answers[randomNumArr[1]]);
      this.box2.on("click", () => {
        this.checkAnswer(this.box2.num, this.chosenQuestion.multipleAnswer);
      });

      this.box3 = new objects.Box(2, 510, 567, "#9dffa9", this.chosenQuestion.answers[randomNumArr[2]]);
      this.box3.on("click", () => {
        this.checkAnswer(this.box3.num, this.chosenQuestion.multipleAnswer);
      });

      this.box4 = new objects.Box(3, 700, 567, "#ffff80", this.chosenQuestion.answers[randomNumArr[3]]);
      this.box4.on("click", () => {
        this.checkAnswer(this.box4.num, this.chosenQuestion.multipleAnswer);
      });
    }

    // Compares answer and box id for answer
    public checkAnswer(id:number, answer:number):void {
      createjs.Sound.stop();

      if(id == answer) {
        objects.Game.score++;
        objects.Game.correct = true;
      }
      else {
        objects.Game.score = 0;
        objects.Game.correct = false;
    }
  }

    public loadQuestions():void{
      // Question, Answers Shown, Answer description, [], which one is correct
      this.questions.push(new objects.Question("Which of these Nintendo platforms did not get a new Pokémon Mystery Dungeon game?",
      ["Game Boy Advance", "Nintendo 3DS", "Wii U", "Nintendo Switch"],"No new games or new entries from the series were ever released on the Wii U.",[],2));
      this.questions.push(new objects.Question("Which Mario game was developed by Square Enix?",
      ["Mario Tennis Aces", "Mario Golf", "Super Mario Strikers", "Mario Hoops 3-on-3"],"Square Enix have developed a handful of Mario games, Mario Hoops 3-on-3 for the Nintendo DS being one of them.",[],3));
      this.questions.push(new objects.Question("Which Nintendo GameCube game did NOT require a Game Boy Advance for multiplayer?",
      ["Final Fantasy Crystal Chronicles", "Mario Kart: Double Dash", "The Legend of Zelda: Four Swords Adventures", "Pac-Man Vs."],"Mario Kart: Double Dash did not require a Game Boy Advance in order to play multiplayer.",[],1));
      this.questions.push(new objects.Question("How many mailboxes are there in Clock Town?",
      ["3", "4", "5", "6"],"There are 5 mailboxes in Clock Town. Yes, this question is taken directly from The Legend of Zelda: Majora's Mask.",[],2));
      this.questions.push(new objects.Question("Which of these Pokémon can Gigantamax?",
      ["Kingler", "Gyarados", "Gigalith", "Runerigus"],"Kingler is able to Gigantamax, being able to use G-Max Foam Burst.",[],0));
      this.questions.push(new objects.Question("Which Legend of Zelda game does not feature Zelda as an interactable character?",
      ["A Link Between Worlds", "The Wind Waker", "Four Swords", "Link's Awakening"],"Zelda is only briefly mentioned in The Legend of Zelda: Link's Awakening at the very beginning of the game by Marin.",[],3));
      this.questions.push(new objects.Question("Not including the avatar and Tatsu, how many playable party members are there in Xenoblade Chronicles X?",
      ["17", "18", "19", "20"],"There are a total of 18 playable party members in Xenoblade Chronicles X, not including the avatar and Tatsu.",[],1));
      this.questions.push(new objects.Question("How many Super Mario fighters are in Super Smash Bros. Ultimate (as of 08/2020)? *The individual Koopalings do not count as separate fighters.",
      ["6", "7", "8", "9"],"There are 9 Super Mario fighters in Super Smash Bros. Ultimate: Mario, Luigi, Peach, Daisy, Bowser, Dr. Mario, Rosalina & Luma, Bowser. Jr, and Piranha Plant.",[],3));
      this.questions.push(new objects.Question("Not counting Byleth, how many A supports does Sylvain\nfrom Fire Emblem: Three Houses have?",
      ["3", "4", "5", "16"],"Despite his reputation, Sylvain only has 4 A supports, the third-lowest in the game.",[],1));
      this.questions.push(new objects.Question("Which character is the Goddess of Courage in The Legend of Zelda series?",
      ["Din", "Nayru", "Farore", "Hylia"],"Farore is known as the Goddess of Courage.",[],2));
      this.questions.push(new objects.Question("How many levels were in World 9 of Donkey Kong Country Returns for the Wii?",
      ["1", "4", "7", "10"],"The Wii version of Donkey Kong Country Returns only had 1 level in World 9. The 3DS version added an extra 8.",[],0));
      this.questions.push(new objects.Question("In Fire Emblem: Path of Radiance, there are four races that live in Tellius. Which kingdom is ruled by hawks?",
      ["Crimea", "Goldoa", "Kilvas", "Phoenicis"],"The hawks reside in Phoenicis, ruled by Tibarn.",[],3));
      this.questions.push(new objects.Question("Including sizes, how many different Nintendo 3DS models have been released?",
      ["4", "5", "6", "7"],"There were 6 different Nintendo 3DS's during its lifetime:\nNintendo 3DS, Nintendo 3DS XL, Nintendo 2DS, New Nintendo 3DS, New Nintendo 3DS XL, and the New Nintendo 2DS XL",[],2));
      this.questions.push(new objects.Question("Which of these masks from The Legend of Zelda: Majora's Mask is a transformation mask?",
      ["Deku Mask", "Stone Mask", "Bunny Hood", "Bremen Mask"],"The tranformation masks are: Deku Mask, Goron Mask, Zora Mask, Fierce Deity Mask, and technically the Giant's Mask.",[],0));
      this.questions.push(new objects.Question("Fire Emblem Echoes: Shadows of Valentia is a remake of which Fire Emblem title?",
      ["Fire Emblem: Mystery of the Emblem", "Fire Emblem Gaiden", "Fire Emblem Fates", "Fire Emblem: Thracia 776"],"Fire Emblem Echoes: Shadows of Valentia is a remake of the second Fire Emblem title, Fire Emblem Gaiden.",[],1));
      this.questions.push(new objects.Question("What's the name of the non-human companions that fight alongside Hunters in the Monster Hunter series?",
      ["Palico", "Poogie", "Melynx", "Moofah"],"Palico are the non-human companions that fight alongside hunters.",[],0));
      this.questions.push(new objects.Question("How many Fire Emblem fighters are in Super Smash Bros. Ultimate (as of 09/2021)?",
      ["7", "8", "9", "10"],"There are 8 Fire Emblem fighters in Super Smash Bros. Ultimate: Marth, Roy, Ike, Robin, Lucina, Corrin, Chrom, and Byleth.",[],1));
    }
  }
}
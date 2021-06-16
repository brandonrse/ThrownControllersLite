module scenes {
  export class PlayScene extends objects.Scene {
    // Variables
    private canvas = document.getElementById("canvas");
    private background:createjs.Bitmap;
    private easy:objects.EasyQuestion;
    private lightning:objects.Lightning;
    private multiple:objects.MultipleChoice;
    private input;
    private check:createjs.Bitmap;
    private xmark:createjs.Bitmap;
    private pos:createjs.AbstractSoundInstance;
    private neg:createjs.AbstractSoundInstance;

    private type:number;
    private selection:number;
    private bgType:string = "gamebg";

    // Constructor
    constructor(assetManager:createjs.LoadQueue){
      super(assetManager);
      this.Start();
    }

    public Start():void {
      // Choose a random question
      this.selection = Math.floor(Math.random() * 100);
      // 0-30 = Easy Question
      if (this.selection <= 30) {
        this.type = 0;
        this.easy = new objects.EasyQuestion(this.assetManager, this.type);
        this.input = document.getElementById("input");
      }
      // 31-40 = Brutal Question
      else if (this.selection <= 40) {
        this.type = 1;
        this.bgType = "gamebrutalbg";
        this.easy = new objects.EasyQuestion(this.assetManager, this.type);
        this.input = document.getElementById("input");
      }
      // 41-60 = Tricky Question
      else if(this.selection <= 60) {
        this.type = 2;
        this.easy = new objects.EasyQuestion(this.assetManager, this.type);
        this.input = document.getElementById("input");
      }
      // 61-80 = Lightning Round
      else if (this.selection <= 80) {
        this.type = 3;
        this.lightning = new objects.Lightning(this.assetManager);
      }
      // 81-100 = Multiple Choice
      else if (this.selection <= 101) {
        this.type = 4;
        this.multiple = new objects.MultipleChoice(this.assetManager);
      }
      this.background = new createjs.Bitmap(this.assetManager.getResult(this.bgType));

      // Checkmark and X
      this.check = new createjs.Bitmap(this.assetManager.getResult("check"));
      this.check.x = this.canvas.clientWidth * 0.5 - 196.5;
      this.check.y = this.canvas.clientHeight * 0.5 - 300;
      this.check.alpha = 0;
      
      this.xmark = new createjs.Bitmap(this.assetManager.getResult("x"));
      this.xmark.x = this.canvas.clientWidth * 0.5 - 183.5;
      this.xmark.y = this.canvas.clientHeight * 0.5 - 340;
      this.xmark.alpha = 0;
      
      this.Main();
    }
    public Update():void{
      // Easy Question, Brutal Question, & Tricky Question
      if (this.type == 0 || this.type == 1 || this.type == 2) {
        objects.Game.currentAnswer = this.input.value;
        if(objects.Game.correct == true)
        {
          createjs.Tween.get(this.check).to({alpha:1},200);
          this.pos = createjs.Sound.play("yes");
          this.addChild(this.check);
          this.easy.removeChildAt(1);
          this.easy.removeChildAt(1);
          this.showEasyAnswer();
        }
        if (objects.Game.correct == false) 
        {
          createjs.Tween.get(this.xmark).to({alpha:1},200);
          this.neg = createjs.Sound.play("no");
          this.addChild(this.xmark);
          this.easy.removeChildAt(1);
          this.easy.removeChildAt(1);
          this.showEasyAnswer();
        }
      }

      // Multiple Choice
      if (this.type == 4 && objects.Game.correct == true) {
        createjs.Tween.get(this.check).to({alpha:1},200);
        this.pos = createjs.Sound.play("yes");
        this.addChild(this.check);
        this.showMultipleAnswer();
      }
      // Multiple Choice
      if (this.type == 4 && objects.Game.correct == false) {
        createjs.Tween.get(this.xmark).to({alpha:1},200);
        this.neg = createjs.Sound.play("no");
        this.addChild(this.xmark);
        this.showMultipleAnswer();
      }

      // Lightning Round
      if (this.type == 3) {
        this.lightning.Update();
      }
      if (this.type == 3 && objects.Game.lightningFinish == true) {
        this.showLightningAnswer();
      }
    }

    public Main():void{
      this.addChild(this.background);
      // Easy Question, Brutal Question, and Tricky Question
      if (this.type == 0 || this.type == 1 || this.type == 2) {
        this.addChild(this.easy);
      }
      // Lightning Round
      if (this.type == 3) {
        this.addChild(this.lightning);
      }
      // Multiple Choice
      if (this.type == 4) {
        this.addChild(this.multiple);
      }

    }
    // Answer display for Easy & Brutal Question
    public showEasyAnswer():void{
      this.addChild(this.easy.answerLabel);
      objects.Game.correct = null;
      createjs.Tween.get(this).wait(5000).call(this.endScene);
    }
    // Answer display for Multiple Choice
    public showMultipleAnswer():void{
      for (let i = 0; i < 9; i++) {
        this.multiple.removeChildAt(1);
      }
      this.addChild(this.multiple.answerLabel);
      objects.Game.correct = null;
      createjs.Tween.get(this).wait(5000).call(this.endScene);
    }
    // Answer display for Lightning Round
    public showLightningAnswer():void{
      this.lightning.removeChildAt(4);
      this.lightning.removeChildAt(4);
      this.lightning.removeChildAt(4);
      this.lightning.removeChildAt(3);

      this.lightning.showResults();

      this.lightning.circles.forEach(c => {
        c.alpha = 0;
        this.addChild(c);
        createjs.Tween.get(c).to({alpha:1},200);
      });

      // If 3 correct answers
      if(this.lightning.correct >= 3) {
        createjs.Tween.get(this.check).to({alpha:1},200);
        this.pos = createjs.Sound.play("yes");
        this.addChild(this.check);
        objects.Game.score++;
      }
      // 3 or more wrong answers
      else {
        createjs.Tween.get(this.xmark).to({alpha:1},200);
        this.neg = createjs.Sound.play("no");
        this.addChild(this.xmark);
        objects.Game.score = 0;
      }

      objects.Game.lightningFinish = null;
      createjs.Tween.get(this).wait(6000).call(this.endScene);
    }

    // Switch scenes
    public endScene():void{
      if (objects.Game.score == 10)
      {
        objects.Game.currentScene = config.Scene.WIN;
      }
      else {
        objects.Game.currentScene = config.Scene.START;
      }
    }
  }
}
module scenes {
  export class StartScene extends objects.Scene {
    private text: objects.Label;
    private canvas = document.getElementById("canvas");
    private controllerArray:Array<objects.Controller> = [];
    private score:createjs.Bitmap;
    private scoreLabel: objects.Label;
    private bgm:createjs.AbstractSoundInstance;

    constructor(assetManager:createjs.LoadQueue) {
      super(assetManager);
      this.Start();
    }

    public Start():void {
      objects.Game.correct = null;
      this.score = new createjs.Bitmap(this.assetManager.getResult("score"));
      this.scoreLabel = new objects.Label("Score:\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + objects.Game.score, "48px", "Arial", "#000", 10, 15);

      this.controllerArray.push(new objects.Controller(this.assetManager, "xbox1", 179, 117,0));
      this.controllerArray.push(new objects.Controller(this.assetManager, "snes", 397, 117,1));
      this.controllerArray.push(new objects.Controller(this.assetManager, "ps3", 615, 117,2));
      this.controllerArray.push(new objects.Controller(this.assetManager, "n64", 70, 335,3));
      this.controllerArray.push(new objects.Controller(this.assetManager, "dream", 288, 335,4));
      this.controllerArray.push(new objects.Controller(this.assetManager, "gamecube", 506, 335,5));
      this.controllerArray.push(new objects.Controller(this.assetManager, "atari", 724, 335,6));
      this.controllerArray.push(new objects.Controller(this.assetManager, "ps4", 179, 553,7));
      this.controllerArray.push(new objects.Controller(this.assetManager, "xbox", 397, 553,8));
      this.controllerArray.push(new objects.Controller(this.assetManager, "nes", 615, 553,9));

      this.bgm = createjs.Sound.play("menubgm");
      this.bgm.volume = 0.2;
      this.bgm.loop = -1;

      this.Main();
    }

    public Update():void {}

    public Main():void{
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
      this.controllerArray.forEach(element => {
        this.addChild(element);

        this.alpha = 0;
        createjs.Tween.get(this).to({alpha:1.0},1000);
        
        element.on("click", function() {
          objects.Scene.complete.push(this.num);
          if (!element.selected) {
            createjs.Sound.stop();
            objects.Game.currentScene = config.Scene.GAME;
          }
        })

        // If already completed
        objects.Scene.complete.forEach(c => {
          if (c == element.num) {
            element.removeAllEventListeners();
            element.alpha = 0.5;
            element.cursor = "default";
            this.cursor = "none";
          }
        })
      });
    }
  }
}
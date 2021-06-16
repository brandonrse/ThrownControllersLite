module scenes {
  export class WinScene extends objects.Scene {
    // Variables
    private win:objects.Logo;
    private bg:createjs.Bitmap;
    private bgm:createjs.AbstractSoundInstance;

    // Constructor
    constructor(assetManager:createjs.LoadQueue) {
      super(assetManager);
      this.Start();
    }

    public Start():void{
      this.win = new objects.Logo(this.assetManager, "winner", 12.8, 96);
      this.win.alpha = 0;
      this.bg = new createjs.Bitmap(this.assetManager.getResult("winbg"));

      this.Main();
    }

    public Main():void{
      this.bgm = createjs.Sound.play("winbgm");
      this.addChild(this.bg);
      createjs.Tween.get(this.win).to({alpha:1},3000);
      this.addChild(this.win);
    }
  }
}
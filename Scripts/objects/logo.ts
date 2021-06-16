module objects {
  export class Logo extends createjs.Bitmap {
    // Variables
    public wait;
    // Constructor
    constructor(assetManager:createjs.LoadQueue, imageString:string, x:number = 0, y:number=30) {
      super(assetManager.getResult(imageString));

      this.x = x;
      this.y = y;
      this.alpha = 0;

      if(imageString == "brutal") {
        this.wait = 5000;
      }

      createjs.Tween.get(this).to({alpha:1.0},this.wait);
    }
  }
}
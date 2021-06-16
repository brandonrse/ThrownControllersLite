module objects {
  export class Controller extends createjs.Bitmap {
    public selected;
    public num;
    private bgs:createjs.AbstractSoundInstance;
    constructor(assetManager:createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0, num:number = 0) {
      super(assetManager.getResult(imageString));
      
      this.x = x;
      this.y = y;
      this.selected = false;
      this.num = num;
      
      this.scaleX *= 0.7;
      this.scaleY *= 0.7;
      this.cursor = "pointer";
      this.on("mouseover", this.mouseOver);
      this.on("mouseout", this.mouseOut);
    }

    private mouseOver():void{
      if (!this.selected) {
        this.x -=18.62;
        this.y -=18.62;
        this.scaleX *= 1.2;
        this.scaleY *= 1.2;
        this.bgs = createjs.Sound.play("select");
      }
    }

    private mouseOut():void{
      if (!this.selected) {
        this.x +=18.62;
        this.y +=18.62;
        this.scaleX /= 1.2;
        this.scaleY /= 1.2;
      }
    }
  }
}
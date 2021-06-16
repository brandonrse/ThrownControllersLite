module objects {
  export class SubmitButton extends createjs.Bitmap {
    
    constructor(assetManager:createjs.LoadQueue, imageString:string, x:number, y:number) {
      super(assetManager.getResult(imageString));

      this.x = x;
      this.y = y;

      this.cursor = "pointer";
      this.on("mouseover", this.mouseOver);
      this.on("mouseout", this.mouseOut);

    }

    public mouseOver():void{
      this.alpha = 0.5;
    }
    public mouseOut():void{
      this.alpha = 1;
    }
  }
}
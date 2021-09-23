module objects {
  export class Box extends createjs.Shape {
    public num:number;
    public text:objects.Label;

    constructor(id:number, x:number = 0, y:number = 0, color:string = "000", text:string = "") {
      super();
      this.num = id;
      this.cursor = "pointer";

      this.scaleX *= 1.0;
      this.scaleY *= 1.0;
      this.graphics.beginStroke("#000");
      this.graphics.setStrokeStyle(1);
      this.snapToPixel = true;
      this.graphics.beginFill(color).drawRoundRect(x, y, 150, 150, 5);

      this.text = new objects.Label(text, "16pt", "Verdana", "#000", x + 75, y + 75);
      this.text.lineWidth = 150;
      this.text.maxWidth = 150;
      this.text.textAlign = "center";
      this.text.textBaseline = "middle";

      if(this.text.text.split(" ").length == 1) {
        this.text.y = y + 75;
      }
      else if(this.text.text.split(" ").length <= 2) {
        this.text.y = y + 65;
      }
      else if(this.text.text.split(" ").length <= 3) {
        this.text.y = y + 50;
      }
      else if(this.text.text.split(" ").length <= 4) {
        this.text.y = y + 55;
      }
      else if(this.text.text.split(" ").length <= 7) {
        this.text.y = y + 45;
      }

      this.on("mouseover", this.mouseOver);
      this.on("mouseout", this.mouseOut);
    }

    private mouseOver():void{
      // this.x -= 5;
      // this.y -= 5;
      // this.scaleX *= 1.01
      // this.scaleY *= 1.01;
      this.alpha = 0.7;
    }
    
    private mouseOut():void{
      // this.x += 5;
      // this.y += 5;
      // this.scaleX /= 1.01;
      // this.scaleY /= 1.01;
      this.alpha = 1;
    }
  }
}
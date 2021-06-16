module objects {
  export class Box extends createjs.Shape {
    public num:number;
    public text:objects.Label;

    constructor(id:number, x:number = 0, y:number = 0, color:string = "000", text:string = "") {
      super();
      this.num = id;
      this.cursor = "pointer";
      this.graphics.beginFill(color).drawRect(x, y, 150, 150);
      this.on("mouseover", this.mouseOver);
      this.on("mouseout", this.mouseOut);

      this.text = new objects.Label(text, "20pt", "Candara", "#000", x + 75, y + 75);
      this.text.lineWidth = 150;
      this.text.maxWidth = 150;
      this.text.textAlign = "center";
      this.text.textBaseline = "middle";

      if(this.text.text.split(" ").length > 2) {
        this.text.y = y + 55;
      }
    }

    private mouseOver():void{
      this.x -= 5;
      this.y -= 5;
      this.scaleX *= 1.01
      this.scaleY *= 1.01;
    }
    
    private mouseOut():void{
      this.x += 5;
      this.y += 5;
      this.scaleX /= 1.01;
      this.scaleY /= 1.01;
    }
  }
}
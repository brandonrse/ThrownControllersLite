module objects {
  export class Game {
    public static stage: createjs.Stage;
    public static assetManager: createjs.LoadQueue;
    public static currentScene: number;
    public static score: number = 0;
    public static currentAnswer:string = "";
    public static correct:boolean = null;
    public static lightningFinish:boolean = null;

    public static easyQuestions:Array<number> = [];
    public static brutalQuestions:Array<number> = [];
    public static trickyQuestions:Array<number> = [];
    public static lightningQuestions:Array<number> = [];
    public static multipleQuestions:Array<number> = [];
  }
}
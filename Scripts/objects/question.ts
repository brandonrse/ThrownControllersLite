module objects {
  export class Question {
    public question:string;
    public answers:string[];
    public answerDesc:string;
    public correct:boolean = false;
    public lightning:number = 0;
    public lightningAnswers:number[];

    public multipleAnswer:number = 0;
    
    constructor(question:string, answers:string[], answerDesc:string = "", lightningAnswers:number[] = [], multipleAnswer:number = -1) {
      this.question = question;
      this.answers = answers;
      this.answerDesc = answerDesc;
      this.lightningAnswers = lightningAnswers;
      this.multipleAnswer = multipleAnswer;
    }

    public checkEasyAnswer(){
      let answer = objects.Game.currentAnswer;
      let min: number;
      let max:number;
      let range:string[];

      // If the answer is a range between two values
      if(this.answers[0].charAt(0) == "R" && this.answers[0].charAt(1) == ",") {
        range = this.answers[0].split(",");
        min = parseInt(range[1]);
        max = parseInt(range[2]);
        let intAnswer = parseInt(answer);

        // If answer is inbetween the range, inclusive
        if (intAnswer >= min && intAnswer <= max)
        {
          objects.Game.correct = true;
        }
      }
      // Compare answer to each answer in array
      else {
        this.answers.forEach(a => {
          if(answer.toUpperCase() == a) {
            objects.Game.correct = true;
          }
        });
      }
    }
  }
}
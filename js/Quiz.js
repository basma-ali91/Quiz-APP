export class Quiz {
    constructor(Questions) {
        this.Questions = Questions
        this.noOfQuestions = this.Questions.length;
        this.currentQuestion = 0;
        this.submitBtn = document.getElementById("submitBtn");
        this.submitBtn.addEventListener("click", this.nextQuestion.bind(this));
        this.tryagain=document.getElementById("again");
        this.tryagain.addEventListener("click",this.tryAgain)
        this.Score = 0;
        this.showQuestion();
    }

    showQuestion() {
        document.getElementById("Question").innerHTML = this.Questions[this.currentQuestion].question;
        document.getElementById("currentQuestion").innerHTML = this.currentQuestion + 1;
        document.getElementById("NoOfQuestion").innerHTML = this.noOfQuestions;
        this.showAnswers()
    }

    showAnswers() {
        this.answers = [this.Questions[this.currentQuestion].correct_answer, ...this.Questions[this.currentQuestion].incorrect_answers];

        let currentIndex = this.answers.length,
            randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.answers[currentIndex], this.answers[randomIndex]] = [
                this.answers[randomIndex], this.answers[currentIndex]];
        }

        this.temp = ``;
        for (let i = 0; i < this.answers.length; i++) {
            this.temp += `
            <div class="form-check">
            <label for="" class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" value="${this.answers[i]}">
                ${this.answers[i]}
            </label>
        </div>
            `
        }
        document.getElementById("rowOfAnswers").innerHTML = this.temp;
    }

    checkAnswer() {
        let useranswer = document.getElementsByName("answer");
        useranswer = [...useranswer].filter(el => el.checked)[0].value;
        let correctAnswer = this.Questions[this.currentQuestion].correct_answer
        if (useranswer == correctAnswer) {
            this.Score++;
        }
    }
    nextQuestion() {
        this.checkAnswer();
        this.currentQuestion++
        if (this.currentQuestion < this.noOfQuestions) {
          this.showQuestion();
        }
        else{
this.finish()
        }
    }
    finish(){
        $("#Quiz").fadeOut(500,()=>{
            $("#finish").fadeIn(500)
        })
        document.getElementById("score").innerHTML=this.Score;
    }
    tryAgain(){
        $("#finish").fadeOut(500,()=>{
            $("#Setting").fadeIn(500)
        })
    }
}
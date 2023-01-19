import { Quiz } from "./Quiz.js";
export class Setting {
    constructor() {
        this.Questions;
        this.categoryElement = document.getElementById("category");
        this.diffcultyElement = document.getElementsByName("diffculty");
        this.noOfQuElement = document.getElementById("noOfQuestions");
        this.startBtn = document.getElementById("startBtn");
        this.startBtn.addEventListener("click", this.startQuiz.bind(this));
    }

    async startQuiz() {
        this.category = this.categoryElement.value;
        this.amount = this.noOfQuElement.value;
        this.diffuclty = [...this.diffcultyElement].filter(el => el.checked)[0].value;
        this.Questions = await this.fetchURL(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.diffuclty}`);
        if (this.Questions.length > 0) {
            $("#Setting").fadeOut(500, () => {
                $("#Quiz").fadeIn(500)
            })
            new Quiz(this.Questions);
        }

    }
    async fetchURL(URL) {
        let result = await fetch(URL);
        result = await result.json();
        return result.results;
    }

}
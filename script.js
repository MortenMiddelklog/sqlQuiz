const quizData = [
    {
        id: 0,
        question: "Which SQL statement is used to return only different values?",
        answers: ["DUPLICATE", "DISTINCT", "DIFFERENT", "SELECT", "None of the above"],
        correct_answer: 1
    },
    {
        id: 1,
        question: "Which clause is always used with a window function?",
        answers: ["ORDER BY", "LIMIT", "OVER()", "GROUP BY"],
        correct_answer: 2
    },
    {
        id: 2,
        question: "Which SQL statement is used to extract data from the database?",
        answers: ["SELECT", "ACCESS", "OPEN", "GET", "ACQUIRE"],
        correct_answer: 0
    },
    {
        id: 3,
        question: "Can you insert multiple rows with only one INSERT query?",
        answers: ["Yes", "No", "It's possible but only with newer MySQL versions", "Yes but these inserts cause data corruption"],
        correct_answer: 0
    },
    {
        id: 4,
        question: "Which command is used to remove the table \"movie\"?",
        answers: ["REMOVE TABLE movie", "UPDATE FROM movie", "DELETE FROM movie WHERE", "DROP TABLE movie"],
        correct_answer: 3
    },
    {
        id: 5,
        question: "What is a VIEW?",
        answers: [
                    "VIEWS are virtual tables that do not store any data of their own but display data stored in other tables.", 
                    "VIEWS are static tables that store data but the data can't be changed.", 
                    "VIEWS are temporary tables which store data only for a certain amount of time.", 
                    "VIEWS are no different that any other tables except they are used for faster loading."],
        correct_answer: 0
    },
    {
        id: 6,
        question: "Which of the following is a valid aggregate function?",
        answers: ["CURDATE", "COUNT", "AVARAGE", "MAXIMUM"],
        correct_answer: 1
    },
    {
        id: 7,
        question: "In a LIKE clause, you can ask for any value ending in \"ton\" by writing",
        answers: ["LIKE '^.*ton$'", "LIKE 'ton$'", "LIKE '%ton'", "LIKE '*ton'"],
        correct_answer: 2
    },
    {
        id: 8,
        question: "The GROUP BY command cannot be used with aggregate functions",
        answers: ["True", "False"],
        correct_answer: 1
    },
    {
        id: 9,
        question: "What command is used to permanently remove a record from a database table?",
        answers: ["DROP", "REMOVE", "DELETE", "CUT"],
        correct_answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
const wrongAnswers = [];

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const questionContainer = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const submitBtn = document.getElementById("submit-btn");
const counter = document.getElementById("counter");

const inputElem = document.createElement("input");
const labelElem = document.createElement("label");
const p = document.createElement("p");
const div = document.createElement("div");

p.classList.add("lh-1", "m-0", "p-0", "mb-2")
div.classList.add("mb-4", "p-3", "border", "border-dark", "rounded");
inputElem.setAttribute("type", "radio");
inputElem.setAttribute("name", "answer");
inputElem.setAttribute("autocomplete", "off");
inputElem.classList.add("btn-check");
labelElem.classList.add("btn", "btn-outline-dark", "btn-lg", "mb-3")

function populateQuestion() {
    counter.innerText = currentQuestion + 1;
    questionContainer.innerText = quizData[currentQuestion].question;
    quizData[currentQuestion].answers.forEach((answer, i) => {
        const input = inputElem.cloneNode();
        const label = labelElem.cloneNode();
        input.setAttribute("id", i);
        input.setAttribute("value", i)
        label.setAttribute("for", i)
        label.innerText = answer;
        answersContainer.append(input, label);
    });
}

function showResults() {
    quiz.classList.add("d-none", "invisible");
    result.innerHTML += `<p class=\"fs-5 lh-1\">You gave the correct answer to <strong>${Math.round(100*score/quizData.length)}%</strong> of the questions (${score}/${quizData.length}).</p>`;
    if (wrongAnswers.length) {
        result.innerHTML += "<p class=\"fs-5 lh-1\">These are the correct answers to the questions you got wrong:</p>";
        const filtrQuizData = quizData.filter((obj) => wrongAnswers.includes(obj.id));
        filtrQuizData.forEach((q) => {
            let divElem = div.cloneNode();
            let qElem = p.cloneNode();
            let aElem = p.cloneNode();
            qElem.innerHTML = `<strong>Question:</strong> ${q.question}`;
            aElem.innerHTML = `<strong>Answer:</strong> ${q.answers[q.correct_answer]}`;
            divElem.append(qElem, aElem);
            result.appendChild(divElem);
        });
    }
    result.classList.remove("invisible");
}

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
};

submitBtn.addEventListener("click", () => {
    const answer = document.querySelector('input[name="answer"]:checked')?.value;
    if (answer) {
        quizData[currentQuestion].correct_answer === ~~answer ? score++ : wrongAnswers.push(quizData[currentQuestion].id);
        if (currentQuestion < quizData.length-1) {
            answersContainer.innerHTML = "";
            currentQuestion++;
            populateQuestion();
        } else {
            showResults();
        }
    }
});

document.getElementById("questions-amount").innerText = quizData.length;
shuffleArray(quizData);
populateQuestion();
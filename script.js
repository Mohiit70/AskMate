async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/distilbert-base-uncased-distilled-squad",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error("Error in API request");
    }

    const result = await response.json();
    return result;
}

function getResult() {
    const contentInput = document.getElementById('contentInput').value;
    const questionSection = document.getElementById('questionSection');
    const questionInput = document.getElementById('questionInput').value;
    const answerSection = document.getElementById('answerSection');

    if (!contentInput || (questionSection.style.display !== 'none' && !questionInput)) {
        alert("Please enter content and question before getting the result.");
        return;
    }

    const data = {
        inputs: {
            question: questionInput,
            context: contentInput,
        },
    };

    query(data)
        .then((response) => {
            if (response && response.answer) {
                answerSection.innerHTML = `<strong>Answer:</strong> ${response.answer}`;
            } else {
                answerSection.innerHTML = '<strong>Answer:</strong> No answer available.';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            answerSection.innerHTML = '<strong>Answer:</strong> Error retrieving the answer.';
        });
}

function resetApp() {
    const centerBox = document.getElementById('centerBox');
    const questionSection = document.getElementById('questionSection');
    const answerSection = document.getElementById('answerSection');

    centerBox.style.width = '40%';
    questionSection.style.display = 'none';
    document.getElementById('questionInput').value = '';
    answerSection.innerHTML = '';

    console.log('Application reset');
}
function submitContext() {
    const contentInput = document.getElementById('contentInput').value;
    const questionSection = document.getElementById('questionSection');
    const contextButton = document.querySelector('.context-button');
    const questionButton = document.querySelector('.question-button');

    if (!contentInput) {
        alert("Please enter content before submitting.");
        return;
    }

    questionSection.style.display = 'flex';
    contextButton.style.display = 'none';
    questionButton.style.display = 'block';
}

function submitQuestion() {
    const contentInput = document.getElementById('contentInput').value;
    const questionInput = document.getElementById('questionInput').value;
    const answerSection = document.getElementById('answerSection');

    if (!contentInput || !questionInput) {
        alert("Please enter content and question before getting the result.");
        return;
    }

    const data = {
        inputs: {
            question: questionInput,
            context: contentInput,
        },
    };

    query(data)
        .then((response) => {
            if (response && response.answer) {
                answerSection.innerHTML = `<strong>Answer:</strong> ${response.answer}`;
            } else {
                answerSection.innerHTML = '<strong>Answer:</strong> No answer available.';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            answerSection.innerHTML = '<strong>Answer:</strong> Error retrieving the answer.';
        });
}

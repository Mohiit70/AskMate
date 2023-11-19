// API 
const apiUrl = "https://api-inference.huggingface.co/models/distilbert-base-uncased-distilled-squad";
const apiToken = "Bearer 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";

//  Hugging Face API
async function query(data) {
    const response = await fetch(apiUrl, {
        headers: {
            Authorization: apiToken,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error in API request");
    }

    const result = await response.json();
    return result;
}

// Function to submit content and show question section
function submitContent() {
    const contentSection = document.getElementById('contentSection');
    const questionSection = document.getElementById('questionSection');

    contentSection.style.display = 'none';
    questionSection.style.display = 'flex';
}

// Function to submit question, show loading, and fetch result
function submitQuestion() {
    const questionSection = document.getElementById('questionSection');
    const resultSection = document.getElementById('resultSection');

    questionSection.style.display = 'none';
    resultSection.style.display = 'flex';

    // loading 
    setTimeout(() => {
        const contentInput = document.getElementById('contentInput').value;
        const questionInput = document.getElementById('questionInput').value;

        
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
                    resultSection.innerHTML = `<strong>Answer:</strong> ${response.answer}`;
                } else {
                    resultSection.innerHTML = '<strong>Answer:</strong> No answer available.';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                resultSection.innerHTML = '<strong>Answer:</strong> Error retrieving the answer.';
            });
    }, 2000); 
}

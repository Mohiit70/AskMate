function getResult() {
    
    console.log('Result button clicked');
}

function resetApp() {
    
    const centerBox = document.getElementById('centerBox');
    const questionSection = document.getElementById('questionSection');
    const answerSection = document.getElementById('answerSection');

    centerBox.style.width = '40%';
    questionSection.style.display = 'none';
    document.getElementById('questionInput').value = '';
    answerSection.innerHTML = ''; // Clear the answer content

    
    console.log('Application reset');
}



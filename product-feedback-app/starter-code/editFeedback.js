const goBackBtn = document.querySelector('.go__back__btn');
const editFeedbackWrapper = document.querySelector('.edit__feedback__panel');
const spinnerSearchEl = document.querySelector('.spinner--search');
const successEl = document.querySelector('.success');
const successElAdd = document.querySelector('.successAdd');
const errorEl = document.querySelector('.error');
let feedbackIndex = 0;

const renderSpinner = whichSpinner => {
    const spinnerEl = whichSpinner === 'search' ? spinnerSearchEl : spinnerSearchEl;
    spinnerEl.classList.toggle('spinner--visible');
}

goBackBtn.addEventListener('click', function(){
    location.href = "index.html";
})

document.addEventListener('DOMContentLoaded', function() {
    let feedback = JSON.parse(localStorage.getItem('feedbackDetails')) || {};
    feedbackIndex = feedback.id;
    console.log(feedbackIndex)
    console.log(feedback);


    const editFeedbackHTML = `
        <h2 class="feedback__title">Editing '${feedback.title || ''}'</h2>
        <label for="feedback__title__edit">
            <span class="bold">Feedback Title</span>
            <span class="light">Add a short, descriptive headline</span>
        </label>
        <input type="text"
               placeholder="Please add a dark theme option"
               id="feedback__title__edit"
               value="${feedback.title || ''}">

        <div class="dropdown">
            <label for="category">
                <span class="bold">Category</span>
                <span class="light">Choose a category for your feedback</span>
                <select name="category" id="category">
                    <option value="feature" ${feedback.category === 'feature' ? 'selected' : ''}>Feature</option>
                    <option value="ui" ${feedback.category === 'ui' ? 'selected' : ''}>UI</option>
                    <option value="ux" ${feedback.category === 'ux' ? 'selected' : ''}>UX</option>
                    <option value="enhancement" ${feedback.category === 'enhancement' ? 'selected' : ''}>Enhancement</option>
                    <option value="bug" ${feedback.category === 'bug' ? 'selected' : ''}>Bug</option>
                </select>
            </label>
        </div>

        <div class="dropdown">
            <label for="update__status">
                <span class="bold">Update Status</span>
                <span class="light">Choose a status for your feedback</span>
                <select name="status" id="update__status">
                    <option value="planned" ${feedback.status === 'suggestion' ? 'selected' : ''}>Planned</option>
                    <option value="in-progress" ${feedback.status === 'in-progress' ? 'selected' : ''}>In-Progress</option>
                    <option value="live" ${feedback.status === 'Live' ? 'live' : ''}>Live</option>
                </select>
            </label>
        </div>

        <form>
            <label for="feedback__detail">
                <span class="bold">Feedback Detail</span>
                <span class="light">Include any specific comments on what should be improved, added, etc.</span>
            </label>
            <textarea id="feedback__detail" maxlength="250">${feedback.description || ''}</textarea>
        </form>
    `;



    editFeedbackWrapper.insertAdjacentHTML('afterbegin', editFeedbackHTML);

});


const cancelBtn = document.querySelector('.cancel__btn');
const deleteBtn = document.querySelector('.delete__btn');
const addFeedbackBtn = document.querySelector('.add__feedback__btn');

cancelBtn.addEventListener('click', function() {
    location.href = 'index.html';
});

deleteBtn.addEventListener('click', function() {
    renderSpinner('search');
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];


    let indexMatch = feedbacks.findIndex(fb => fb.id === feedbackIndex);
    if (indexMatch > -1) {
        feedbacks.splice(indexMatch, 1);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

        setTimeout(function() {
            renderSpinner('search');
        }, 1000);

        setTimeout(function() {
            successEl.classList.remove('hidden');
        }, 1500);


        setTimeout(function(){
            location.href = "index.html";
        }, 3500);
    } else {
        errorEl.classList.remove('hidden');

        setTimeout(function() {
            errorEl.classList.add('hidden');
        }, 1500);
    }

});

addFeedbackBtn.addEventListener('click', function() {
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    let feedback = JSON.parse(localStorage.getItem('feedbackDetails')) || {};

    let indexMatch = feedbacks.findIndex(fb => fb.id === feedbackIndex);

    const updatedFeedback = {
        id: feedbackIndex,
        title: document.getElementById('feedback__title__edit').value,
        category: document.getElementById('category').value,
        upvotes: feedback.upvotes,
        status: document.getElementById('update__status').value,
        description: document.getElementById('feedback__detail').value,
};


    if (indexMatch > -1) {
        feedbacks[indexMatch] = updatedFeedback;
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

        renderSpinner('search');

        setTimeout(function() {
            renderSpinner('search');
        }, 1000);

        setTimeout(function() {
            successElAdd.classList.remove('hidden');
        }, 1500);

        setTimeout(function(){
            location.href = "index.html";
        }, 3000);
    } else {
        errorEl.classList.remove('hidden');

        setTimeout(function() {
            errorEl.classList.add('hidden');
        }, 1500);
    }
});


const goBackBtn = document.querySelector('.go__back__btn');

const plannedWrapper = document.querySelector('.planned__wrapper');
const inProgressWrapper = document.querySelector('.in__progress__wrapper');
const liveWrapper = document.querySelector('.live__wrapper');

const plannedCounterEl = document.querySelector('.planned__counter');
const inProgressCounterEl = document.querySelector('.in__progress__counter');
const liveCounterEl = document.querySelector('.live__counter');
let plannedCounter = 0;
let inProgressCounter = 0;
let liveCounter = 0;


document.addEventListener('DOMContentLoaded', function() {
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    const plannedData = feedbacks.filter(feedback => feedback.status === 'planned');
    const inProgressData = feedbacks.filter(feedback => feedback.status === 'in-progress');
    const liveData = feedbacks.filter(feedback => feedback.status === 'live');
    console.log(plannedData)

    plannedCounter = plannedData.length;
    plannedCounterEl.textContent = `Planned (${plannedCounter})`;

    inProgressCounter = inProgressData.length;
    inProgressCounterEl.textContent = `In-Progress (${inProgressCounter})`;

    liveCounter = liveData.length;
    liveCounterEl.textContent = `Live (${liveCounter})`;

    plannedData.forEach(data => {
        const plannedHTML = `
        <div class="planned__data">
            <div class="flex">
                <span class="dot orange"></span>
                <span class="status">${data.status}</span>
            </div>
            <p class="bold">${data.title}</p>
            <p class="description">${data.description}</p>
            <span class="category">${data.category}</span>
            
            <div class="flex space">
                <button class="upvote__btn">
                <img src="assets/shared/icon-arrow-up.svg" alt="icon up">${data.upvotes}</button>
                <span class="comments"><img src="assets/shared/icon-comments.svg" alt="icon comments">${data.comments ? data.comments.length : "0"}</span>
            </div>
        </div>
    `;
        plannedWrapper.insertAdjacentHTML('beforeend',plannedHTML);
    })

    inProgressData.forEach(data => {

        const inProgressHTML = `
        <div class="in__progress__data">
            <div class="flex">
                <span class="dot purple"></span>
                <span class="status">${data.status}</span>
            </div>
            <p class="bold">${data.title}</p>
            <p class="description">${data.description}</p>
            <span class="category">${data.category}</span>
   
            <div class="flex space">
                <button class="upvote__btn">
                <img src="assets/shared/icon-arrow-up.svg" alt="icon up">${data.upvotes}</button>
                <span class="comments"><img src="assets/shared/icon-comments.svg" alt="icon comments">${data.comments ? data.comments.length : "0"}</span>
            </div>
        </div>
    `;
        inProgressWrapper.insertAdjacentHTML('beforeend',inProgressHTML);
    })

    liveData.forEach(data => {
        const liveHTML = `
        <div class="live__data">
            <div class="flex">
                <span class="dot purple"></span>
                <span class="status">${data.status}</span>
            </div>
            <p class="bold">${data.title}</p>
            <p class="description">${data.description}</p>
            <span class="category">${data.category}</span>
            
             <div class="flex space">
                <button class="upvote__btn">
                <img src="assets/shared/icon-arrow-up.svg" alt="icon up">${data.upvotes}</button>
                <span class="comments"><img src="assets/shared/icon-comments.svg" alt="icon comments">${data.comments ? data.comments.length : "0"}</span>
             </div>
        </div>
    `;
        liveWrapper.insertAdjacentHTML('beforeend',liveHTML);
    })
});

goBackBtn.addEventListener('click',function(){
    location.href = "index.html";
})
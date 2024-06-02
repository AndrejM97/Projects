"use strict";

const sortByBtn = document.querySelector('.sort__by');
const dropdownMenuEl = document.querySelector('.dropdown');
const feedbackContainer = document.querySelector('.feedbacks');


const mostUpvotesEl = document.querySelector('.most__upvote');
const leastUpvotesEl = document.querySelector('.least__upvote');
const mostCommentedEl = document.querySelector('.most__commented');
const leastCommentedEl = document.querySelector('.least__commented');

const choiceBtns = document.querySelectorAll('.choice');
const addNewFeedbackBtn = document.querySelector('.feedback');
const roadmapWrapper = document.querySelector('.roadmap__wrapper');

document.addEventListener('DOMContentLoaded', function() {
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];


    const roadmapData = `
        <h4 class="space">Roadmap<span class="view">View</span></h4>
        <div class="planned">
            <span class="dot orange"></span>
            <span>Planned</span>
            <span class="number planned__number">0</span>
        </div>
           <div class="in__progress">
            <span class="dot purple"></span>
            <span>In-Progress</span>
            <span class="number in__progress__number">0</span>
        </div>
           <div class="live">
            <span class="dot lightblue"></span>
            <span>Live</span>
            <span class="number live__number">0</span>
        </div>
    `;




    roadmapWrapper.insertAdjacentHTML('beforeend',roadmapData);

    let plannedCounter = feedbacks.filter(el => el.status === 'planned').length;
    let inProgressCounter = feedbacks.filter(el => el.status === 'in-progress').length;
    let liveCounter = feedbacks.filter(el => el.status === 'live').length;

    const plannedEl = document.querySelector('.planned__number');
    const inProgressEl = document.querySelector('.in__progress__number');
    const liveEl = document.querySelector('.live__number');

    plannedEl.textContent = plannedCounter;
    inProgressEl.textContent = inProgressCounter;
    liveEl.textContent = liveCounter;

    updateFeedback(feedbacks);

    const viewBtn = document.querySelector('.view');

    viewBtn.addEventListener('click',function(){
        location.href = "roadmap.html";
    })
});

const openPanel = () => {
    dropdownMenuEl.classList.toggle('hidden');

}

sortByBtn.addEventListener('click',openPanel);


const detailHandler = e => {


    const wrapper = e.target.closest('.feedback__wrapper');
    if (wrapper) {
        const hiddenInput = wrapper.querySelector('.request__id').value;

        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

        const feedbackDetails = feedbacks.find(el => el.id == hiddenInput);

        const feedbackDetailsJSON = JSON.stringify(feedbackDetails);

         localStorage.setItem('feedbackDetails',feedbackDetailsJSON);

         location.href = "feedback-detail.html";
    }
}

const clickHandler = e => {
    const clickedEl = e.target;

    const upvoteIntention = clickedEl.className.includes('upvote__btn');
    console.log(upvoteIntention)

    if (upvoteIntention) {
        const upvoteBtnEl = clickedEl.closest('.upvote__btn');
        upvoteBtnEl.disabled = true;

        const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__number');
        let upvoteCount = +upvoteCountEl.textContent;

        upvoteCount = upvoteCount + 1;
        upvoteCountEl.textContent = upvoteCount++;
    }
}


function updateFeedback(requests) {
    feedbackContainer.innerHTML = "";

    requests.forEach(request => {
        const category = `${request.category[0].toUpperCase() + request.category.slice(1)}`;
        const commentsLength = request.comments ? request.comments.length : 0;

        const feedbackHTML = `
            <div class="feedback__container">
                <button class="upvote__btn">
                    <img src="assets/shared/icon-arrow-up.svg" alt="icon up" class="icon__up">
                    <span class="upvote__number">${request.upvotes}</span>
                </button>
                
                <div class="feedback__wrapper">
                    <div class="feedback__start">
                        <input type="hidden" value=${request.id} class="request__id">
                        <h3 class="feedback__title">${request.title}</h3>
                        <p class="feedback__comment">${request.description}</p>
                        <span class="feedback__category">${category}</span>
                    </div>
                    <div class="feedback__end">
                        <img src="assets/shared/icon-comments.svg" alt="comments icon">
                        <p class="feedback__comments">${commentsLength}</p>
                    </div>
                </div>
            </div>`;

        feedbackContainer.insertAdjacentHTML('beforeend', feedbackHTML);
    });
        feedbackContainer.addEventListener('click',clickHandler);
        feedbackContainer.addEventListener('click',detailHandler);
}

fetch('data.json')
    .then(response => {
        if(!response.ok){
            console.log('Something went wrong');
        }
        return response.json();
    })
    .then(data => {

        const { productRequests } = data;

        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

        const existingTitles = new Set(feedbacks.map(feedback => feedback.title));

        const newFeedbacks = productRequests.filter(request => !existingTitles.has(request.title));

        feedbacks.push(...newFeedbacks);

        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

        let previousClickedBtn = null;

        choiceBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {

                if (previousClickedBtn) {
                    previousClickedBtn.style.background = '';
                    previousClickedBtn.style.color = '';
                }

                btn.style.background = '#4661E6';
                btn.style.color = 'white';

                previousClickedBtn = btn;

                let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

                const clickedEl = e.target.textContent.toLowerCase();
                const matchingEl = feedbacks.filter(el => el.category == clickedEl);

                if (clickedEl === "all") {
                    updateFeedback(feedbacks);
                } else {
                    updateFeedback(matchingEl);
                    console.log(matchingEl)
                }
            });
        });



        mostUpvotesEl.addEventListener('click', function(){
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
            const sorted = feedbacks.slice().sort((a, b) => parseFloat(b.upvotes) - parseFloat(a.upvotes));

            updateFeedback(sorted);
        });

        leastUpvotesEl.addEventListener('click', function(){
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
            const sorted = feedbacks.slice().sort((a, b) => parseFloat(a.upvotes) - parseFloat(b.upvotes));

            updateFeedback(sorted);
        });

        mostCommentedEl.addEventListener('click', function() {
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
            const sorted = feedbacks.slice().sort((a, b) => {
                const commentsALength = a.comments ? a.comments.length : 0;
                const commentsBLength = b.comments ? b.comments.length : 0;
                return commentsBLength - commentsALength;
            });
            updateFeedback(sorted);
        });

        leastCommentedEl.addEventListener('click', function() {
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
            const sorted = feedbacks.slice().sort((a, b) => {
                const commentsALength = a.comments ? a.comments.length : 0;
                const commentsBLength = b.comments ? b.comments.length : 0;
                return commentsALength - commentsBLength;
            });
            updateFeedback(sorted);
        });

        feedbackContainer.addEventListener('click',function(e){
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
            const clickedEl = e.target;
            const feedbackEl = clickedEl.closest('.feedback__container');
            const feedbackTitle = feedbackEl.querySelector('.feedback__title').textContent;

            const matchingFeedback = feedbacks.find(feedback => feedbackTitle.includes(feedback.title));
            console.log(matchingFeedback)

        })
    })

addNewFeedbackBtn.addEventListener('click',function(){
    location.href = "feedback-new.html";
})


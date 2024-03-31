"use strict";


const jobsWrapperEl = document.getElementById('jobs__wrapper');
const searchBtn = document.getElementById('search__btn');
const locationInputEl = document.getElementById('location');
const titleInputEl = document.getElementById('title');
const loadMoreBtn = document.querySelector('.load__more');
const checkboxBtn = document.getElementById('checkbox');
let jobData = [];
let displayedJobsCount = 0;


fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        jobData = data;

        jobData.forEach(job => {
            if (displayedJobsCount < 12) {

                displayJobs(job);
                displayedJobsCount++;
                displayLoadMoreBtn();
            }
        })

    })
    .catch(error => {
        console.error('Fetch error:', error);
    });


locationInputEl.addEventListener('keyup', function (e) {
    displayedJobsCount = 0;
    const userInput = e.target.value.toLowerCase();
    jobsWrapperEl.innerHTML = '';
    jobData.forEach(job => {
        const location = job.location.toLowerCase();

        if (location.includes(userInput) && displayedJobsCount < 12) {
            displayJobs(job);
            displayedJobsCount++;
            displayLoadMoreBtn();
        }
    });
});

titleInputEl.addEventListener('keyup',function(e){
    const userInput = e.target.value.toLowerCase();
    jobsWrapperEl.innerHTML = '';
    jobData.forEach(job => {
        const title = job.position.toLowerCase();

        if (title.includes(userInput)) {
            displayJobs(job);
        }

    });
})


function displayJobs(job) {
    const html = `
        
            <div class="job__box">
                <div class="img" style="background-color: ${job.logoBackground}">
                    <img src="${job.logo}" alt="${job.company}">
                </div>
                <div class="flex">
                    <p class="light">${job.postedAt}<span class="dot">.</span>${job.contract}</p>
                </div>
                <p class="jobTitle">${job.position}</p>
                <p class="light">${job.company}</p>
                <p class="purple">${job.location}</p>
                <input type="hidden" value="${job.id}">
            </div>
        
    `;
    jobsWrapperEl.insertAdjacentHTML('afterbegin', html);
}



function displayLoadMoreBtn(){
    loadMoreBtn.classList.remove('hidden');
}

function removeLoadMoreBtn(){
    loadMoreBtn.classList.add('hidden');
}

searchBtn.addEventListener('click',function(){
    displayLoadMoreBtn();
})

loadMoreBtn.addEventListener('click',function(){
    jobsWrapperEl.innerHTML = '';
    jobData.forEach(job => {
        displayJobs(job);
    })

})

jobsWrapperEl.addEventListener('click',function(e){
    const chosenJob = e.target.closest('.job__box');
    const chosenJobID = chosenJob.querySelector('input[type="hidden"]').value;
    const targetJob = jobData.find(job => job.id == chosenJobID);

    if(targetJob){
        localStorage.setItem('selectedJob',JSON.stringify(targetJob));
        window.location.href = 'job.html';
    }
})

const darkModeBtn = document.getElementById('toggle');

darkModeBtn.addEventListener('click',function(){
    document.body.classList.toggle('darkmode')
})

let isClicked = false;

checkboxBtn.addEventListener('click',function(){
    isClicked = !isClicked;

})

searchBtn.addEventListener('click',function(){
    if(isClicked){
        jobsWrapperEl.innerHTML = '';
        const word = "Full Time";
        const fullTimeOnly = jobData.filter(job => job.contract.includes(word));


        fullTimeOnly.forEach(job => {
            displayJobs(job)
        })
    } else {
        jobsWrapperEl.innerHTML = '';
        displayedJobsCount = 0;
        jobData.forEach(job => {

            if (displayedJobsCount < 12) {
                displayJobs(job);
                displayedJobsCount++;
                displayLoadMoreBtn();
            }
        })


    }
})
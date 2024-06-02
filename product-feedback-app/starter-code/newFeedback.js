
const addFeedbackBtn = document.querySelector('.add__feedback__btn');

const titleEl = document.getElementById('title');
const categoryEl = document.getElementById('category');
const commentEl = document.getElementById('detail');
const goBackBtn = document.querySelector('.go__back');

const feedbackWrapper = document.querySelector('.feedback__content');
const successEl = document.querySelector('.success');
const errorEl = document.querySelector('.error');

const spinnerSearchEl = document.querySelector('.spinner--search');
let ids = [];

const renderSpinner = whichSpinner => {
    const spinnerEl = whichSpinner === 'search' ? spinnerSearchEl : spinnerSearchEl;
    spinnerEl.classList.toggle('spinner--visible');
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
        console.log(productRequests[0]);

        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        ids = feedbacks.map(product => product.id);
        console.log(feedbacks)

    });

const addFeedback = () => {

   renderSpinner('search');

    const title = titleEl.value;
    const category = categoryEl.options[categoryEl.selectedIndex].value;
    const description = commentEl.value;
    console.log(`ids: ${ids}`);
    let currentId = Math.max(...ids);
    console.log(`currentId: ${currentId}`);


    const feedback = {
        id: currentId + 1,
        title: title,
        category: category,
        description: description,
        upvotes: 0,
        commentsLength: 0
    };

    if(titleEl.value === "" || commentEl.value === ""){

        setTimeout(function(){
            errorEl.classList.remove('hidden');
        },100);

        setTimeout(function(){
            errorEl.classList.add('hidden');
        },2000);

        renderSpinner('search');

    } else {

        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

        feedbacks.push(feedback);

        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));


        titleEl.value = "";
        commentEl.value = "";

        setTimeout(function() {
            renderSpinner('search');
        }, 1000);

        setTimeout(function() {
            successEl.classList.remove('hidden');
        }, 1500);

        setTimeout(function(){
            location.href = "index.html";
        }, 2500);
    }
}

addFeedbackBtn.addEventListener('click',addFeedback);

goBackBtn.addEventListener('click',function(){

    location.href = "index.html";
})



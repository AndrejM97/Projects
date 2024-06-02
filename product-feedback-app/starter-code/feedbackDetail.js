

const goBackBtn = document.querySelector('.go__back');
const editBtn = document.querySelector('.edit__feedback');

goBackBtn.addEventListener('click',function(){
    location.href = "index.html";
})

editBtn.addEventListener('click',function(){
    location.href = "feedback-edit.html";
})


document.addEventListener('DOMContentLoaded', function() {
    let feedbacks = JSON.parse(localStorage.getItem('feedbackDetails')) || {};

    console.log(feedbacks);

    const feedbackDetailsWrapper = document.querySelector('.feedback__detail__wrapper');
    const comments = feedbacks.comments || [];
    const commentsLength = comments.length;


                let commentsHTML = comments.map(comment => `
        <div class="comment">
            <div class="flex">
                <img src="${comment.user.image}" alt="user img" class="user__image">
                <div class="block">
                    <p class="user__name">${comment.user.name}</p>
                    <p class="tag__name">@${comment.user.username}</p>
                </div>
                <p class="flex__end">Reply</p>
            </div>
            <div class="commento">
                <p>${comment.content}</p>
            </div>
        </div>   
    `).join('');

    let repliesHTML = comments.map(comment => {

        if (comment.replies) {
            return comment.replies.map(reply => {
                return`
          <div class="replies">
            <div class="flex">
                <img src="${reply.user.image}" alt="user img" class="user__image">
                <div class="block">
                    <p class="user__name">${reply.user.name}</p>
                    <p class="tag__name">@${reply.user.username}</p>
                </div>
                <p class="flex__end">Reply</p>
            </div>
            <div class="commento">
                <li>
                    <span class="purple">@${reply.replyingTo}</span>
                    ${reply.content}
                </li>
            </div>
             </div>
              `;
            }).join('');
        } else {
            return [];
        }
    });

    const detailsHTML = `
        <div class="feedback__container">
            <button class="upvote__btn">
                <img src="assets/shared/icon-arrow-up.svg" alt="icon up" class="icon__up">
                <span class="upvote__number">${feedbacks.upvotes || 0}</span>
            </button>
            <div class="feedback__wrapper">
                <div class="feedback__start">
                    <h3 class="feedback__title">${feedbacks.title || ''}</h3>
                    <p class="feedback__comments">${feedbacks.description || ''}</p>
                    <span class="feedback__category">${feedbacks.category || ''}</span>
                </div>
                <div class="feedback__end">
                    <img src="assets/shared/icon-comments.svg" alt="comments icon">
                    <p class="feedback__comments">${commentsLength}</p>
                </div>
            </div>
        </div>
        <div class="comments__wrapper">
            <p class="comments__length">${commentsLength } Comments</p>
            <p>${commentsHTML}</p>
            <p>${repliesHTML}</p>
        </div>
     
        <div class="comment__wrapper">
            <p class="add__comment">Add Comment</p>
            <form>
                <textarea placeholder="Type your comment here" class="comment__area" maxlength="250"></textarea>
            </form>
            <div class="space">
                <p class="characters__left">250 Characters left</p>
                <button class="post__comment">Post Comment</button>
            </div>
        </div>
    `;

    feedbackDetailsWrapper.insertAdjacentHTML('beforeend', detailsHTML);

    setupEventListeners();

    const postCommentBtn = document.querySelector('.post__comment');
    postCommentBtn.addEventListener('click',function(e){
        const commentAreaInputEl = document.querySelector('.comment__area');
            if(commentAreaInputEl.value === ''){
                alert('Cannot be empty')
            } else {
                feedbackDetailsWrapper.insertAdjacentHTML('beforeend', commentAreaInputEl.value);
            }
    })
});

function setupEventListeners() {
    const commentAreaInputEl = document.querySelector('.comment__area');

    if (commentAreaInputEl) {
        commentAreaInputEl.addEventListener('keyup', function(e) {
            const charactersLeftEl = document.querySelector('.characters__left');
            const userInputEl = e.target.value;
            const inputLength = userInputEl.length;
            const MAX_LENGTH = 250;

            charactersLeftEl.textContent = `${MAX_LENGTH - inputLength} Characters left`;

        });
    }
}


document.addEventListener('DOMContentLoaded', setupEventListeners);

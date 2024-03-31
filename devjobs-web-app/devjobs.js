"use strict";

const backBtn = document.querySelector('.back');
let companyLogo = document.querySelector('.company__logo');
const companyName = document.querySelectorAll('.company__name');
const companyWebsite = document.querySelector('.company__website');
const companyPostedAt = document.querySelector('.job__posted__At');
const companyContract = document.querySelector('.job__contract');
const companyPosition = document.querySelectorAll('.job__position');
const companyLocation = document.querySelector('.job__location');
const companyDescription = document.querySelector('.job__description');
const companyRequirements = document.querySelector('.job__requirements__content');
const companyRequirementsItems = document.querySelector('.job__requirements__items');
const companyJobRole = document.querySelector('.job__role');
const companyRoleItems = document.querySelector('.job__role__items');

backBtn.addEventListener('click',function(){
    window.location.href = 'index.html';
})

const selectedJob = JSON.parse(localStorage.getItem('selectedJob'));

if(selectedJob) {
    const {
        logo,
        company,
        website,
        postedAt,
        contract,
        position,
        location,
        description,
        requirements,
        role,


    } = selectedJob;
    companyLogo.src = logo;
    companyLogo.style.backgroundColor = selectedJob.logoBackground;
    companyName.forEach((element) => {
        element.textContent = company;
    });
    companyWebsite.textContent = website;
    companyPostedAt.textContent = postedAt;
    companyDescription.textContent = description;
    companyContract.textContent = contract;
    companyPosition.forEach((element) => {
        element.textContent = position;
    });
    companyLocation.textContent = location;


    const requirementsContent = requirements.content;
    companyRequirements.textContent = requirementsContent;


    const itemsListRequirements = requirements.items;
    const itemsListRequirementsHTML = itemsListRequirements.map(item => `<li class="item__bullets"><span class="item__requirements">${item}</span></li>`).join('');
    companyRequirementsItems.innerHTML = itemsListRequirementsHTML;

    const roleContent = role.content;
    companyJobRole.textContent = roleContent;

    const itemsListRole = role.items;
    const itemsListRoleHTML = itemsListRole.map(item => `<li class="item__decimal"><span class="item__role">${item}</span></li>`).join('');
    companyRoleItems.innerHTML = itemsListRoleHTML;
}



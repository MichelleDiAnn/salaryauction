const baseSalary = 175000;
const remoteModifierMax = 50000;
const meetingPenalty = 1000;
const edgeModifierMax = 25000;
const deliverableModifierMax = 25000;
const vacationPenalty = 25000;
const vacationThreshold = 6;

const salaryBidInput = document.getElementById('salaryBid');
const remoteSlider = document.getElementById('remoteSlider');
const meetingsSlider = document.getElementById('meetingsSlider');
const bleedingEdgeSlider = document.getElementById('bleedingEdgeSlider');
const deliverableSlider = document.getElementById('deliverableSlider');
const vacationWeeksInput = document.getElementById('vacationWeeks');
const submitButton = document.getElementById('submitButton');
const resultDiv = document.getElementById('result');

function getRemotePercentage() {
    return parseInt(remoteSlider.value);
}

function getExcessMeetings() {
    return parseInt(meetingsSlider.value);
}

function getBleedingEdgeValue() {
    return parseInt(bleedingEdgeSlider.value);
}

function getDeliverableClarity() {
    return parseInt(deliverableSlider.value);
}

function getVacationWeeks() {
    return parseInt(vacationWeeksInput.value);
}

function getPlayerBid() {
    return parseInt(salaryBidInput.value);
}

function calculateRemoteModifier(remotePercentage) {
    return (remotePercentage / 100) * remoteModifierMax;
}

function calculateBleedingEdgeModifier(bleedingEdgeValue) {
    return (bleedingEdgeValue / 100) * edgeModifierMax;
}

function calculateDeliverableModifier(deliverableClarity) {
    return (deliverableClarity / 100) * deliverableModifierMax;
}

function generateRandomHint() {
    const hints = [
        "Consider adjusting your remote work expectations", 
        "Could your salary expectation be more flexible?",
        "Too many unnecessary meetings? Reassess those!",
        "Are you sure the job deliverables are as clear as they seem?", 
        "Don't underestimate the value of ample vacation time."
    ];
    const randomIndex = Math.floor(Math.random() * hints.length);
    return hints[randomIndex];
}

function displayLoss() {
    resultDiv.innerHTML = "Try again! <br/>" + generateRandomHint();
    resultDiv.style.color = "red";
}

function displayWin(playerBid, fairSalary) {
    resultDiv.innerHTML = "Congratulations! You exceeded the minimum bid! <br/> Your bid: $" + playerBid + "<br/> Calculated fair salary: $" + fairSalary + "<br/> Contact me!";
    resultDiv.style.color = "green"; 
}

function calculateFairSalary() {
    let fairSalary = baseSalary;

    fairSalary -= calculateRemoteModifier(getRemotePercentage());
    fairSalary += meetingPenalty * getExcessMeetings(); 
    fairSalary -= calculateBleedingEdgeModifier(getBleedingEdgeValue()); 
    fairSalary -= calculateDeliverableModifier(getDeliverableClarity());

    if (getVacationWeeks() < vacationThreshold) {
        fairSalary += vacationPenalty; 
    }

    return fairSalary;
}


function submitOffer() {
    const playerBid = getPlayerBid();
    const fairSalary = calculateFairSalary();
    determineOutcome(playerBid, fairSalary);
}

function determineOutcome(playerBid, fairSalary) {
    if (playerBid >= fairSalary) {
        displayWin(playerBid, fairSalary); 
    } else {
        displayLoss();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', submitOffer);
});

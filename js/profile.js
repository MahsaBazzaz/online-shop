window.onload = function() {
    document.getElementById("profile-section").addEventListener("click", Toggle);
    document.getElementById("reciepts-section").addEventListener("click", Toggle);
}

function Toggle() {
    document.getElementById("profile-section").classList.toggle('visible');
    document.getElementById("profile-section").classList.toggle('invisible');
    document.getElementById("reciepts-section").classList.toggle('visible');
    document.getElementById("reciepts-section").classList.toggle('invisible');
}
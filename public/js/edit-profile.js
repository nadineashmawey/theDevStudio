
async function loadEditProfile(userData) {
    const response = await fetch('/components/editProfile.html');
    const html = await response.text();
    document.getElementById('edit-profile-container').innerHTML = html;

    // populate with the right user data
    document.querySelector('#fullname').value = userData.name;
    document.querySelector('#username').value = userData.username;
    document.querySelector('#email').value = userData.email;
    document.querySelector('#bio').value = userData.bio;
    document.querySelector('#location').value = userData.location;
    document.getElementById('selected-img').src = userData.avatar;
}
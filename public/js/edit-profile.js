async function loadEditProfile(userData) {
    const response = await fetch('/components/editProfile.html');
    const html = await response.text();
    document.getElementById('edit-profile-container').innerHTML = html;

    document.getElementById('fullname').value  = userData.name;
    document.getElementById('username').value   = userData.username;
    document.getElementById('email').value      = userData.email;
    document.getElementById('bio').value        = userData.bio;
    document.getElementById('location').value   = userData.location;
    document.getElementById('selected-img').src = userData.avatar;
}
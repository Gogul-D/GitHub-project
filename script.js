// script.js

const numberOfIcons = 30; // Number of GitHub icons to create

function createGitHubIcon() {
    const icon = document.createElement('div');
    icon.classList.add('github-icon');
    
    // Random position
    icon.style.left = `${Math.random() * 100}vw`;
    icon.style.bottom = `-${icon.offsetHeight}px`;

    // Random animation duration
    icon.style.animationDuration = `${Math.random() * 5 + 5}s`;

    // Random delay
    icon.style.animationDelay = `${Math.random() * 5}s`;

    document.getElementById('bubbles').appendChild(icon);
}

for (let i = 0; i < numberOfIcons; i++) {
    createGitHubIcon();
}

document.getElementById('searchBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const profile = document.getElementById('profile');
    const viewProfileBtn = document.getElementById('viewProfileBtn');

    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('avatar').src = data.avatar_url;
            document.getElementById('name').innerText = data.name;
            document.getElementById('bio').innerText = data.bio || "No bio available.";
            document.getElementById('repos').innerText = `Repositories: ${data.public_repos}`;

            fetch(data.repos_url)
                .then(response => response.json())
                .then(repos => {
                    const languages = new Set();
                    repos.forEach(repo => languages.add(repo.language));
                    document.getElementById('languages').innerText = `Languages: ${[...languages].filter(Boolean).join(', ') || "No languages available."}`;
                });

            profile.classList.add('shake');
            setTimeout(() => profile.classList.remove('shake'), 500);
            profile.style.opacity = 1;
            
            // Show the "View Profile" button and set its URL
            viewProfileBtn.style.display = 'block';
            viewProfileBtn.onclick = () => window.open(data.html_url, '_blank');
        })
        .catch(error => {
            console.error('Error fetching the GitHub profile:', error);
            profile.style.opacity = 0;
            viewProfileBtn.style.display = 'none'; // Hide the button if there's an error
        });
});

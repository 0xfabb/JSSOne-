document.addEventListener('DOMContentLoaded', function() {
    const activitiesFeed = document.getElementById('activities-feed');
    const jwtToken = localStorage.getItem('jwt'); // Retrieve JWT from localStorage
  
    if (!jwtToken) {
      window.location.href = 'login.html'; // Redirect to login if JWT is not found
      return;
    }
  
    // Fetch activities from the server (using JWT in the headers for authorization)
    fetch('/api/activities', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}` // Send JWT as Bearer token in headers
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const activities = data.activities;
        activities.forEach(activity => {
          const activityElement = document.createElement('div');
          activityElement.classList.add('activity');
          activityElement.innerHTML = `
            <h3>${activity.title}</h3>
            <p>${activity.description}</p>
            <button class="like-btn">Like</button>
          `;
          activitiesFeed.appendChild(activityElement);
        });
      } else {
        alert('Failed to load activities! ' + data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  });
  
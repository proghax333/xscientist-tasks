(function() {
  const API_BASE_URL = "https://randomuser.me";

  function ProfileCard({ user }) {
    const dateOfBirth = new Date(user.dob.date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const formattedDateOfBirth = dateOfBirth
      .toLocaleDateString(undefined, options);

    return `
      <div class="profile-header-main">
        <img
          src="${user.picture.large}"
          class="profile-image"
          width="128"
          height="128"
        />

        <div class="profile-basic-description">
          <h2 class="profile-name">${user.name.first} ${user.name.last}</h2>
          <h3 class="profile-username">@${user.login.username}</h3>
          <br />
          <div class="profile-info-grid">
            <p>&#x26A5;</p>
            <p class="profile-info profile-gender">
              ${user.gender[0].toUpperCase() + user.gender.slice(1)}
            </p>
            <p>&#x1F4CD;</p>
            <p class="profile-info profile-location">
              ${user.location.city}, ${user.location.country}
            </p>
            <p>&#x1F382;</p>
            <p class="profile-info profile-date-of-birth">${formattedDateOfBirth}</p>
          </div>
        </div>
      
      </div>
      <div class="profile-about">
        <div class="profile-about-info">
          <h5>E-mail</h5>
          <p class="profile-info">
            <a href="mailto:${user.email}">${user.email}</a>
          </p>
        </div>
      </div>
    `;
  }

  async function getRandomUser() {
    const response = await fetch(`${API_BASE_URL}/api`);
    const result = await response.json();

    return result.results[0];
  }

  async function renderApp(node) {
    const user = await getRandomUser();

    const renderedApp = ProfileCard({ user });

    node.innerHTML = renderedApp;
    document.title = `${user.name.first} ${user.name.last} | Social Media Platform`;
  }

  async function main() {
    const headerNode = document.querySelector(".profile-header");
    const buttonNextNode = document.querySelector(".profile-next");

    buttonNextNode.addEventListener("click", () => renderApp(headerNode));

    renderApp(headerNode);
  }

  window.addEventListener("load", main);
})();

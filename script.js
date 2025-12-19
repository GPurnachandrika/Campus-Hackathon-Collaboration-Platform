let user = {};
let teams = [];

function login() {
  const email = document.getElementById("email").value;

  if (!email.endsWith("@college.edu")) {
    showMessage("❌ Please use college email ID");
    return;
  }

  user.email = email;
  showMessage("✅ Logged in as " + email);
}

function saveProfile() {
  if (!user.email) {
    showMessage("❌ Please login first");
    return;
  }

  user.skills = document.getElementById("skills").value;
  showMessage("📌 Skills saved: " + user.skills);
}

function createTeam() {
  if (!user.email) {
    showMessage("❌ Please login first");
    return;
  }

  const teamName = document.getElementById("teamName").value;
  teams.push({ teamName, leader: user.email });

  showMessage("🚀 Team created: " + teamName);
}

function showMessage(msg) {
  document.getElementById("output").innerHTML = `<p>${msg}</p>`;
}

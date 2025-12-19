const express = require("express");
const router = express.Router();
const { users, teams } = require("./data");

/* Login */
router.post("/login", (req, res) => {
  const { email } = req.body;

  if (!email.endsWith("@college.edu")) {
    return res.status(400).json({ message: "Use college email only" });
  }

  let user = users.find(u => u.email === email);
  if (!user) {
    user = { email, skills: "" };
    users.push(user);
  }

  res.json(user);
});

/* Save skills */
router.post("/profile", (req, res) => {
  const { email, skills } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.skills = skills;
  res.json({ message: "Profile updated" });
});

/* Create team */
router.post("/team", (req, res) => {
  const { teamName, email } = req.body;
  teams.push({ teamName, leader: email });
  res.json({ message: "Team created" });
});

/* Get teams */
router.get("/teams", (req, res) => {
  res.json(teams);
});

module.exports = router;

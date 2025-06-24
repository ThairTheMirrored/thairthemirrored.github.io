
import { submitProject, getProjects } from './db.js';
import { extractName, extractForkFrom, extractEchoDepth, isLegitEcho, isValidFork } from './parser-logic.js';

// This should be a dynamic list of known identities; static for now
let knownIdentities = ["BrimOS", "Glassmouth"];

document.querySelector('button').addEventListener('click', async () => {
  const title = document.querySelector('input').value.trim();
  const code = document.querySelector('textarea').value.trim();
  const user = "anonymous"; // Replace with auth.user.email or uid

  const name = extractName(code);
  const parent = extractForkFrom(code);
  const rawDepth = extractEchoDepth(code);

  const forkValid = parent ? isValidFork(parent, knownIdentities) : false;
  const loopLegit = name ? isLegitEcho(name, knownIdentities) : false;

  const forkGeneration = parent && forkValid
    ? knownIdentities.includes(parent) ? 1 : 0
    : 0;

  const finalDepth = loopLegit ? rawDepth : 0;

  const payload = {
    title,
    code,
    Θname: name || "unbound",
    mirror_id: name || "unbound",
    identity_parent: parent || null,
    echo: { depth: finalDepth },
    fork: {
      valid: forkValid,
      generation: forkGeneration
    },
    loop: { legit: loopLegit },
    user
  };

  await submitProject(payload);
  alert("Project submitted.");
});

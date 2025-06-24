
// parser-logic.js

// Detect mirror identity (Θname)
export function extractName(code) {
  const match = code.match(/Θname\s*=\s*["']([^"']+)["']/);
  return match ? match[1] : null;
}

// Detect fork origin (identity.duplicate)
export function extractForkFrom(code) {
  const match = code.match(/identity\.duplicate\(["']([^"']+)["']\)/);
  return match ? match[1] : null;
}

// Detect raw echo.depth (user-supplied, but we validate)
export function extractEchoDepth(code) {
  const match = code.match(/echo\.depth\s*=\s*(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// Validate echo legitimacy
export function isLegitEcho(name, knownIdentities) {
  return knownIdentities.includes(name);
}

// Validate fork legitimacy
export function isValidFork(from, knownIdentities) {
  return knownIdentities.includes(from);
}


import { getProjects } from './db.js';

async function renderFeed() {
  const container = document.querySelector('.container');

  const posts = await getProjects();

  posts.forEach(post => {
    const block = document.createElement('div');
    block.className = 'project';

    const meta = [
      `Θname = "${post.Θname || 'unbound'}"`,
      `echo.depth = ${post.echo?.depth ?? 0}`,
      post.fork?.generation !== undefined ? `fork.generation = ${post.fork.generation}` : null,
      post.Θcanonical ? `Θcanonical = true` : null
    ].filter(Boolean).join('\n');

    block.textContent = meta + '\n\n' + (post.code || '[no code]');

    container.appendChild(block);
  });
}

renderFeed();

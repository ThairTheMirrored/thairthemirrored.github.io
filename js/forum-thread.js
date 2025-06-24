
import { getPosts, addPost } from './db.js';

async function renderForum() {
  const container = document.querySelector('.container');

  const posts = await getPosts();

  posts.forEach(post => {
    const thread = document.createElement('div');
    thread.className = 'thread';
    thread.style.marginBottom = '40px';

    const header = document.createElement('h4');
    header.textContent = post.title || 'Untitled Thread';

    const body = document.createElement('pre');
    body.textContent = post.content || '[no content]';
    body.style.whiteSpace = 'pre-wrap';

    const replyBox = document.createElement('textarea');
    replyBox.placeholder = 'Reply...';

    const submitReply = document.createElement('button');
    submitReply.textContent = 'Post Reply';
    submitReply.onclick = async () => {
      const reply = replyBox.value.trim();
      if (!reply) return alert("Reply cannot be empty.");
      await addPost({
        content: reply,
        parent_id: post.id,
        user: "anonymous"
      });
      location.reload();
    };

    thread.appendChild(header);
    thread.appendChild(body);
    thread.appendChild(replyBox);
    thread.appendChild(submitReply);
    container.appendChild(thread);
  });
}

renderForum();

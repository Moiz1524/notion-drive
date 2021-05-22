const videosEl = document.getElementById('videos');
const loadingEl = document.getElementById('loading');

let loading = false;

const getVideosFromBackend = async () => {
  loading = true;
  const res = await fetch('http://localhost:3000/videos');
  const data = await res.json()
  loading = false;
  return data
};

const addVideosToDom = async () => {
  const videos = await getVideosFromBackend();
  if (!loading) {
    loadingEl.style.display = 'none';
  }

  videos.forEach((video) => {
    const div = document.createElement('div');
    div.className = 'video';
    div.innerHTML = `
      <h3>${video.title}</h3>
      <ul>
        <li><strong>Release Date: </strong> ${video.date}</li>
        <li><strong>Description: </strong> ${video.description}</li>

      </ul>
      <div class="tags">${video.tags}</div>
    `;

    videosEl.appendChild(div);
  });
}

addVideosToDom();

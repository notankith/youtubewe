const express = require('express');
const app = express();
const { exec } = require('child_process');

app.use(express.json());

app.post('/download', (req, res) => {
  const { url } = req.body;
  // Use youtube-dl or any other library to download the video
  exec(`youtube-dl -f 'bestvideo[height<=1080]+bestaudio/best' -g ${url}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Failed to download video' });
    } else {
      const videoUrl = stdout.trim();
      res.json({ success: true, url: videoUrl });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

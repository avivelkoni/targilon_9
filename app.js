const express = require('express');
const app = express();
app.use(express.static('public'));
const fs = require('fs');
const path = require('path');
app.get('/video/:quality', (req, res) => {
const quality = req.params.quality;    
// Get the video’s actual location and size
const videoPath = path.join(__dirname, 'public', `video_${quality}.mp4`);
const fileSize = fs.statSync(videoPath).size;
// Extract the range requested by the browser
const range = req.headers.range;
const parts = range.substring(6).split('-');
const start = parseInt(parts[0]);
const chunk_size = 10 ** 6; // 1MB
const end = Math.min(start + chunk_size, fileSize - 1);
const file = fs.createReadStream(videoPath, { start, end });
// Stream requested chunk
const head = {
'Content-Range': `bytes ${start}-${end}/${fileSize}`,
'Accept-Ranges': 'bytes',
'Content-Length': chunk_size,
'Content-Type': 'video/mp4',
};
res.writeHead(206, head);
file.pipe(res);
});
app.listen(3001);
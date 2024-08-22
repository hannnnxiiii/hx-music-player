const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

const updateSongStarStatus = (req, res, next) => {
  if (req.method === 'PATCH' && req.url.startsWith('/songs/')) {
    const songId = req.params.id;
    const { isStar } = req.body;

    // 读取 db.json 文件
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // 更新 songs 中的 isStar 状态
    const song = db.songs.find(s => s.id === songId);
    if (song) {
      song.isStar = isStar;
    }

    // 更新 songlists 中的对应歌曲的 isStar 状态
    db.songlists.forEach(songlist => {
      songlist.songs.forEach(songInList => {
        if (songInList.id === songId) {
          songInList.isStar = isStar;
        }
      });
    });

    // 保存更新后的数据
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

    // 返回响应
    res.status(200).json({ message: 'Song star status updated successfully.' });
  } else {
    next();
  }
};

module.exports = { updateSongStarStatus };

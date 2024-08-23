const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'your_secret_key'; // 请使用一个更安全的密钥

// 使用默认中间件
server.use(middlewares);
server.use(jsonServer.bodyParser);

// 生成 JWT
function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}

// 用户注册接口
server.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const db = router.db;
  const users = db.get('users');

  const userExists = users.find(user => user.username === username || user.email === email).value();
  if (userExists) {
    return res.status(400).json({ error: 'Username or email already exists.' });
  }

  const newUser = { id: Date.now(), username, email, password, collect: [] };
  users.push(newUser).write();

  const token = generateToken(newUser);
  res.status(201).json({ user: newUser, token });
});

// 用户登录接口
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = router.db;
  const users = db.get('users');

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const user = users.find(user => user.username === username && user.password === password).value();
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = generateToken(user);
  res.status(200).json({ user, token });
});


// 获取特定歌单中的歌曲
server.get('/songlists/:id/songs', (req, res) => {
  const songListId = req.params.id;
  const db = router.db;

  const songList = db.get('songlists').find({ id: songListId }).value();

  if (songList && songList.songs) {
    res.jsonp(songList.songs);
  } else {
    res.status(404).jsonp({ error: "Song list not found or no songs available" });
  }
});

// 添加歌曲到特定歌单中
server.post('/songlists/:id/songs', (req, res) => {
  const songListId = req.params.id;
  const newSong = req.body;
  const db = router.db;

  const songList = db.get('songlists').find({ id: songListId }).value();

  if (songList) {
    songList.songs.push(newSong);
    db.write();
    res.status(201).json(newSong);
  } else {
    res.status(404).json({ error: "Song list not found" });
  }
});

// 删除歌单中的指定歌曲
server.delete('/songlists/:songlistId/songs/:songId', (req, res) => {
  const { songlistId, songId } = req.params;
  const db = router.db;

  const songList = db.get('songlists').find({ id: songlistId }).value();

  if (songList) {
    const songIndex = songList.songs.findIndex(song => song.id === songId);
    if (songIndex !== -1) {
      const deletedSong = songList.songs.splice(songIndex, 1);
      db.write();
      res.status(200).json(deletedSong);
    } else {
      res.status(404).json({ error: "Song not found in the song list" });
    }
  } else {
    res.status(404).json({ error: "Song list not found" });
  }
});

// 使用 json-server 提供的默认路由
server.use(router);

// 启动服务器
server.listen(3000, () => {
  console.log('JSON Server is running');
});



import axios from './axios'

export const getSongLists = () => {
  return axios.get('/songlists');
};

export const getSongList = (id) => {
  return axios.get(`/songlists/${id}`)
}

// export const changeStarState = (id, newVal) => {
//   return axios.patch(`songs/${id}`,{
//     isStar: newVal
//   })
// }

// 往歌单中添加歌曲的方法
export const addSong = (name, singer, url, songUrl, id, listId) => {
  return axios.post(`/songlists/${listId}/songs`, {
    name,
    singer,
    url,
    songUrl,
    id
  })
}

// 删除歌单中歌曲的方法
export const delSong = (songlistId,songId) => {
  return axios.delete(`/songlists/${songlistId}/songs/${songId}`)
}

export const getCreatedList = (creator, name) => {
  let url = `/songlists?creator=${creator}`;
  
  if (name) {
    url += `&name=${name}`;
  }

  return axios.get(url);
}

export const createSongList = (name, url, songs, creator) => {
  return axios.post('/songlists', {
    name,
    alt: name,
    url,
    songs,
    creator
  })
}

export const createMyStar = (name, url, songs, creator) => {
  return axios.post('/songlists', {
    name,
    alt: name,
    url,
    songs,
    creator,
    id:creator
  })
}

// 获取收藏的歌单
export const getCollectedList = (collect) => { 
  const url = collect.reduce((sum, item) => {
    return sum + `id=${item}&`
  }, '/songlists?')
  
  return axios.get(url)
}
import axios from 'axios';

const fetchGames = async (params) => {
  try {
    const res = await axios({
      method: 'get',
      url: 'https://api.boardgameatlas.com/api/search',
      responseType: 'json',
      params: {
        client_id: 'lmhaeyUdQ0',
        ...params,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default fetchGames;

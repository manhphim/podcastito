import urlExist from 'url-exist';

const defaultImage = require('../assets/images/default-podcast.png');

export const validImage = async (url: string) => {
  const valid = await urlExist(url);
  if (valid) {
    return { uri: url };
  } else {
    return defaultImage;
  }
};

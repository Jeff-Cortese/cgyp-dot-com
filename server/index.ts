import * as Feed from 'feed-to-json-promise'

interface IEpisode {
  categories: string[];
  date: string;
  description: string; //html
  guid: string;
  link: string;
  media: Array<{
    type: 'audio/mpeg',
    url: string;
  }>;
  thumbnail?: any;
  title: string;
}

(async function() {
  try {
    const feedLoader = new Feed()
    const feed = await feedLoader.load('http://cgypodcast.podbean.com/feed/')

    console.log(feed);
  } catch (error) {
    console.error(error)
  }
})();
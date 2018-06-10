import * as Feed from 'feed-to-json-promise'
import * as jsonfile from 'jsonfile';

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
    const { items }: { items: IEpisode } = await new Feed().load('http://cgypodcast.podbean.com/feed/');

    jsonfile.writeFileSync(`./episodes.json`, items, { spaces: 2 });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
})();
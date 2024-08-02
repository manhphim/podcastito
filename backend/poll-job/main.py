import requests
import json
import time
import hashlib
import os

api_urls = [
    'https://api.podcastindex.org/api/1.0/recent/episodes?max=10',
    'https://api.podcastindex.org/api/1.0/recent/feeds?max=100',
    'https://api.podcastindex.org/api/1.0/recent/newfeeds?max=1000',
    'https://api.podcastindex.org/api/1.0/podcasts/trending?max=1000'
]

get_podcast_by_feed_id_url = 'https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id='
get_episode_by_feed_ = 'https://api.podcastindex.org/api/1.0/episodes/byfeedid?id='

api_key = 'DFJKCZRAB2CFXUY7PXJK'
api_secret = 's3AMYtTU6FtWJ4R8ZLBmMrp$prYDywdCfbquLqZD'

current_unix_time = int(time.time())  # Current UTC Unix epoch time
auth_date = str(current_unix_time)
auth_key = api_key
auth_string = f'{api_key}{api_secret}{auth_date}'

# Create a SHA-1 hash and encode as hexadecimal
authorization = hashlib.sha1(auth_string.encode()).hexdigest()

headers = {
    'X-Auth-Key': auth_key,
    'X-Auth-Date': auth_date,
    'Authorization': authorization
}

json_feeds = []

def fetch_data():
    try:
        for index, url in enumerate(api_urls):
            response = requests.get(url, headers=headers)
            if response.status_code != 200:
                raise Exception(f'Request failed for URL: {url}')
            json_data = response.json()
            filename = f'data_{index}.json'
            with open(filename, 'w') as f:
                json.dump(json_data, f, indent=2)
            print(f'Fetched and saved data to {filename}')
        print('All data fetched and saved successfully.')
    except Exception as error:
        print('Error:', error)

def fetch_recent():
    try:
        response = requests.get(api_urls[1], headers=headers)
        if response.status_code != 200:
            raise Exception(f'Request failed for URL: {api_urls[1]}')
        feeds = response.json()['feeds']
        for feed in feeds:
            index = feeds.index(feed)
            podcast = fetch_feed(feed)
            episode = fetch_episodes(feed)
            json_feeds.append(podcast)

            a = podcast.get('title')
            episode_filename = f'episodes/episode_{index}.json'

            if not os.path.exists(episode_filename):
                os.makedirs(os.path.dirname(episode_filename), exist_ok=True)
                # Create the directory if it doesn't exist
                with open(episode_filename, 'w') as f:
                    json.dump(episode, f, indent=2)
            
            if len(json_feeds) == len(feeds):
                with open('podcast_details.json', 'w') as f:
                    json.dump(json_feeds, f, indent=2)

            print('All data fetched and saved successfully.')
            time.sleep(1)
    except Exception as error:
        print('Error:', error)
def fetch_feed(feed):
    response = requests.get(f'{get_podcast_by_feed_id_url}{feed["id"]}', headers=headers)
    if response.status_code != 200:
        raise Exception(f'Request failed for URL: {get_podcast_by_feed_id_url}{feed["id"]}')

    podcast = response.json()['feed']
    return podcast

def fetch_episodes(feed):
    response = requests.get(f'{get_episode_by_feed_}{feed["id"]}&max=1000', headers=headers)
    if response.status_code != 200:
        raise Exception(f'Request failed for URL: {get_episode_by_feed_}{feed["id"]}')

    episodes = response.json()['items']
    return episodes

fetch_recent()

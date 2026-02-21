import numpy as np
import requests
from urllib3.util.retry import Retry
from requests.adapters import HTTPAdapter
import time
from typing import Any


def database_crawler(database_index: int):
    db_chunk = np.load(f'chunk_{database_index}.npy')
    print(f"Shape: {db_chunk.shape}, Type: {db_chunk.dtype}")

    resulting_dictionary_part = np.array([], dtype=object)

    # Configure session with retry strategy
    session = requests.Session()
    retry_strategy = Retry(
        total=3,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"]
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)

    # Rate limiting: 1 request per second (adjust as needed)
    REQUEST_DELAY = 1.0

    for i, db_entry in enumerate(db_chunk):
        url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{db_entry}"

        try:
            # Rate limiting: wait between requests
            if i > 0:
                time.sleep(REQUEST_DELAY)

            response = session.get(url, timeout=10)

            # if the request was un-successful, throw an error
            response.raise_for_status()

            # parse the response as a JSON.
            data: list[Any] = response.json()
            resulting_dictionary_part = np.append(resulting_dictionary_part, data)
            print(f"The \"{db_entry}\" was added to the dictionary. ({i + 1}/{len(db_chunk)})")

        except requests.exceptions.HTTPError as err:
            if response.status_code == 429:
                print(f"Rate limited for {db_entry}. Waiting longer...")
                time.sleep(5)  # Additional wait for rate limit
                continue  # Skip this entry and continue
            print(f"HTTP error occurred: {err}")
        except requests.exceptions.RequestException as err:
            print(f"Request error occurred: {err}")
        except Exception as err:
            print(f"An error occurred: {err}")

    print(f"Successfully processed {len(resulting_dictionary_part)}/{len(db_chunk)} entries")
    np.save(f'resulting_dictionary_part{database_index}.npy', resulting_dictionary_part)

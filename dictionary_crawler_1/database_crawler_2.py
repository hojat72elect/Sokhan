import numpy as np
import requests
from typing import Any

db0 = np.load('chunk_00.npy')

print(f"Shape: {db0.shape}, Type: {db0.dtype}")

resulting_dictionary_part0 = np.array([], dtype=object)

for db_entry in db0:
    url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{db_entry}"

    try:
        response = requests.get(url)

        # if the request was un-successful, throw an error
        response.raise_for_status()

        # parse the response as a JSON.
        data: list[Any] = response.json()
        resulting_dictionary_part0 = np.append(resulting_dictionary_part0, data)
        print(f"The {db_entry} was added to the dictionary.")

    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
    except Exception as err:
        print(f"An error occurred: {err}")

np.save('resulting_dictionary_part0.npy', resulting_dictionary_part0)

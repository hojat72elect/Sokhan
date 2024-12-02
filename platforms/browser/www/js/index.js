// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    // Get the search button and input element
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');

    /**
     * will be called on each search.
     */
    function handleSearch() {
        console.log("The input text is this : ", searchBar.value);
        searchBar.value = '';
    }

    searchButton.addEventListener('click', handleSearch);
    searchBar.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

}

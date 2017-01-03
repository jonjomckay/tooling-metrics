export default class FetchHelper {
    static fetch(url) {
        return fetch(process.env.REACT_APP_METRICS_BASE_URL + url, {
            headers: {
                'Authorization': localStorage.getItem('tooling.authentication')
            }
        })
          .then(FetchHelper.parseResponse);
    }

    static parseResponse(response) {
        if (response.ok) {
            return response.json();
        }

        // TODO: Figure out how to get the response JSON without a stupid asynchronous function thing
        throw new Error('An error occurred while loading this metric: ' + response.statusText || 'An unknown error occurred');
    }
}
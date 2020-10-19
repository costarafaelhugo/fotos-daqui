# Assessment - Photos From Here
For this assessment, you will create a web application to display photos that were taken near the user's geographic location.

## Overview
Your app will use the geolocation API to determine the user’s location (in latitude and longitude), then use the Flickr API to obtain a list of photos that were taken near that location.

Display the first photo on the page, along with a link to that photo’s Flickr page. Provide some method of advancing through the photos.

## Requirements
Your program will follow these general steps:

Get the geographic location from the browser
Construct the query URL
Use fetch to send the request to Flickr
Process the response data into an object
Use the values in the response object to construct an image source URL
Display the first image on the page
In response to some event (e.g. a button click or a setInterval), show the proximo image in the collection
## Get the location
If the geolocation API is unavailable or if the user refuses to allow the browser to disclose their location, use a hard-coded latitude and longitude of your choice (pick someplace interesting!).

https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
## Construct the query URL
Example query URL (which should not contain any spaces or returns):
https://flickr.com/services/rest/?api_key=993fake589fake6cdfakefcb&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=39.76574&lon=-86.1579024&text=dog

Use your own personal api_key instead of the fake one in this example. Here are the instructions on obtaining an api key from Flickr. The application form asks for a purpose, and you can tell them that you're using the API for a school project.

Flickr requires that each photo search request includes a text value, which is the search term. So the above example will search for "dog" photos. Your app can use whatever hard-coded search term you want.

Set the lat and lon values to the latitude and longitude that you got from the geolocation API.

Set the per_page count to no more than 5 so that our assessments don't overwhelm the Flickr API servers and so your user won't have to wait too long to see a photo.

Set safe_search to 1 to avoid potentially racy images. (You're going to show your site to your grandma, right?)

### CORS Proxy
The Flickr API is a little old, so it handles cross-origin requests in an old way that the fetch API does not support. So in order to use fetch with the Flickr API, you must route your requests through a proxy server that will add the appropriate headers to satisfy the browser's Cross-Origin Resource Sharing (CORS) security system. Put more simply, instead of sending your requests directly to Flickr, your program will instead send requests to a different server that will be a "translator" between your program's fetch requests and Flickr's old-fashioned API.

To send your requests through the proxy, prepend the proxy's domain, https://shrouded-mountain-15003.herokuapp.com/, to the Flickr API URL. Example: https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=993c9d05898cfd6cd16b4fcb18401be0&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=39.76574&lon=-86.1579024&text=dog

(This strangely named proxy server is Randy's custom instance of the CORS-Anywhere proxy.)

## Send the request to Flickr and process the reponse data
Use fetch to send the request to Flickr. The response data is just a long string that will need to be "rehydrated" into an object before it is useful to your program. See "Lesson: Introduction to Fetch".

Flickr Search API documentation
## Construct an image source URL
The response object contains array that contains properties for a number of photos, but doesn't actually contain URLs for the photos. Instead, each photo object in the array contains a bunch of values that can be assembled into a URL. See the Flickr API documentation "Photo Source URLs" for details.
```
Example response object:

{
    "photos": {
        "page": 1,
        "pages": 208,
        "perpage": 2,
        "total": "624",
        "photo": [
            {
                "id": "32549725528",
                "owner": "36432048@N08",
                "secret": "ed3d4317ea",
                "server": "4829",
                "farm": 5,
                "titulo": "",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            }, {
                "id": "32549725168",
                "owner": "36432048@N08",
                "secret": "065f06a238",
                "server": "4916",
                "farm": 5,
                "titulo": "",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            }
        ]
    },
    "stat": "ok"
}
```
Your code to build the image source URL for the first image in the array might look something like this:
```
function constructImageURL (photoObj) {
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}
```
const imageUrl = constructImageURL(response.photos.photo[0]);
## Display the first image
Append an image element onto the page, using the above URL as the src attribute. The browser will then fetch and display the photo.

## Show the proximo image
Provide some way to allow the user to see the proximo photo. You could use a button labeled "proximo", a setTimeout that advances to the proximo photo after a certain number of seconds, or some other method that you choose. Be sure to display instructions for the user on the page.

After the last photo in the array is displayed, advancing again should show the first photo again.

# Submission
Push your code into your GitLab repository and deploy it via GitLab pages. In Canvas, please submit your Gitlab Pages url (e.g. https://username.gitlab.io/photos-from-here/). In GitLab, add KA_Grading as a member on your project with "Reporter" permission.
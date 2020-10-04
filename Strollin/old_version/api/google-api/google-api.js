const apiKey = 'AIzaSyCeoupzB5M_3KGzkoC63v-mJgjfAiXpsi0';

/* samples to use functions
var SearchNearby = {
  locationLongFirst: '-33.8670522',
  locationLatSec: '151.1957362',
  radius: '1500',
  type: 'bakery',
}
var Itinerary = {
  origin_lon: '48.921940',
  origin_lat: '2.299830',
  destination_lon: '48.923970',
  destination_lat: '2.295590',
}
*/

/**
 * Parameters:
 *  return_type: 'json' or 'xml'
 *  user_lat: user localization latitude
 *  user_lon: user localization longitude
 *  radius: radius of research
 *  type: (ex: restaurant, bakery) voir type list sur jira
 * Return:
 *  list of spots
 * * */

export function getGoogleApiSearch(return_type, user_lat, user_lon, radius, type) {
  const searchCall = `https://maps.googleapis.com/maps/api/place/nearbysearch/${
    return_type}?location=${user_lat},${user_lon
  }&radius=${radius}&type=${type}&key=${apiKey}`;

  console.log(`search\n\n${searchCall}`);
  return new Promise((resolve, reject) => {
    fetch(searchCall)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('OKOKO JSON RAJA', responseJson);
        resolve({ data: responseJson.results });
      }).catch((error) => {
        console.log('error RAJA', error);
        reject(error);
      });
  });
}

/**
 * Sample call example: https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=CpQCAgEAAFxg8o-eU7_uKn7Yqjana-HQIx1hr5BrT4zBaEko29ANsXtp9mrqN0yrKWhf-y2PUpHRLQb1GT-mtxNcXou8TwkXhi1Jbk-ReY7oulyuvKSQrw1lgJElggGlo0d6indiH1U-tDwquw4tU_UXoQ_sj8OBo8XBUuWjuuFShqmLMP-0W59Vr6CaXdLrF8M3wFR4dUUhSf5UC4QCLaOMVP92lyh0OdtF_m_9Dt7lz-Wniod9zDrHeDsz_by570K3jL1VuDKTl_U1cJ0mzz_zDHGfOUf7VU1kVIs1WnM9SGvnm8YZURLTtMLMWx8-doGUE56Af_VfKjGDYW361OOIj9GmkyCFtaoCmTMIr5kgyeUSnB-IEhDlzujVrV6O9Mt7N4DagR6RGhT3g1viYLS4kO5YindU6dm3GIof1Q&key=YOUR_API_KEY
 * Parameters:
 *  return_type: 'json' or 'xml'
 *  next_page_token
 * Return:
 *  next page results
 * * */

export function nextPageApiSearchCall(return_type, next_page_token) {
  const nextPageCall = `ttps://maps.googleapis.com/maps/api/place/nearbysearch/${
    return_type}?pagetoken=${next_page_token}&key=${apiKey}`;

  fetch(nextPageCall)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('######################################Next Page Call API responseJson', responseJson);
      return {
        data: responseJson.results
      };
    })
    .catch((error) => console.log(error));
}

/**
 * Parameters:
 *  return_type: 'json' or 'xml'
 *  origin_lat: origin point latitude
 *  origin_lon: origin point longitude
 *  destination_lon: destination point longitude
 *  destination_lat: destination point latitude
 * Return:
 *  itinerary by lon and lat
 * * */

export function getGoogleApiItinerary(return_type, origin_lat, origin_lon, destination_lon, destination_lat) {
  const itinCall = `https://maps.googleapis.com/maps/api/directions/${
    return_type}?origin=${origin_lat},${origin_lon}&destination= ${
    destination_lon}, ${destination_lat}&mode=walking` + `&key=${apiKey}`;

  fetch(itinCall)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('######################################Itinerary Call API responseJson', responseJson);
      return {
        data: responseJson.routes
      };
    })
    .catch((error) => console.log(error));
}

/**
 * Parameters:
 *  return_type: 'json' or 'xml'
 *  place_id: place id returned by Search API Call
 *  requested_fields: example -> 'name,rating,formatted_phone_number,reviews'
 * Return:
 *  the fields requested for a specific place
 *  (reviews field can get only up to five reviews)
 * * */

export function getGoogleApiPlaceDetails(return_type, place_id, requested_fields) {
  const detailsCall = `https://maps.googleapis.com/maps/api/place/details/${
    return_type}?place_id=${place_id}&fields=${requested_fields}&key=${apiKey}`;

  fetch(detailsCall)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('######################################Place Detail Call API responseJson', responseJson);
      return {
        data: responseJson.result
      };
    })
    .catch((error) => console.log(error));
}

/**
 * dumb test
 * */

export function getMoviesFromApi() {
  const dumbCall = 'https://facebook.github.io/react-native/movies.json';
  return fetch(dumbCall)
    .then((response) => response.json())
    .then((responseJson) => responseJson.movies)
    .catch((error) => {
      console.error(error);
    });
}

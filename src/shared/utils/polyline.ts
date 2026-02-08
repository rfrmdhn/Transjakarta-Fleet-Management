/**
 * Decodes an encoded polyline string into an array of [latitude, longitude] pairs.
 * Based on the Google Maps Polyline Algorithm.
 */
export const decodePolyline = (encoded: string): [number, number][] => {
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;
    const coordinates: [number, number][] = [];

    while (index < len) {
        let b, shift = 0, result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        coordinates.push([lat * 1e-5, lng * 1e-5]);
    }

    return coordinates;
};

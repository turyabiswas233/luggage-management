import { useJsApiLoader } from "@react-google-maps/api";
const  lib = ['places']
const useGoogleMapsApi = (apiKey) => {
  if (!apiKey) {
    return false;
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: lib,
  });

  return isLoaded;
};

export default useGoogleMapsApi;

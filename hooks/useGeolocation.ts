import { useState, useCallback } from 'react';
import { Coordinates } from '../types';

interface GeolocationState {
  loading: boolean;
  error: GeolocationPositionError | null;
  data: Coordinates | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    data: null,
  });

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      // Geolocation is not supported by this browser.
      return;
    }
    setState({ loading: true, error: null, data: null });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          error: null,
          data: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (error) => {
        setState({
          loading: false,
          error,
          data: null,
        });
      }
    );
  }, []);

  return { ...state, getLocation };
};

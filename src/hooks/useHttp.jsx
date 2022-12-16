import { useState } from 'react';
import HttpService from '../utils/http.service';

export default function useHttp() {
  const [loading, setLoading] = useState(false);

  const { http } = HttpService({
    onRequestStarted() {
      setLoading(true);
    },
    onResponseReceived() {
      setLoading(false);
    },
    onResponseFailed() {
      setLoading(false);
    },
  });

  return {
    loading,
    http,
  };
}

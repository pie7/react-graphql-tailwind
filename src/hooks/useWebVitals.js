import { useEffect, useState } from "react";
import { getCLS, getFCP, getFID, getLCP, getTTFB } from "web-vitals";

const webVitals = {
  CLS: getCLS,
  FCP: getFCP,
  FID: getFID,
  LCP: getLCP,
  TTFB: getTTFB,
};

export const useWebVitals = () => {
  const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import("web-vitals").then(
        ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS(onPerfEntry);
          getFID(onPerfEntry);
          getFCP(onPerfEntry);
          getLCP(onPerfEntry);
          getTTFB(onPerfEntry);
        }
      );
    }
  };

  const [metrics, setMetrics] = useState([]);
  const vitas = (metric) => {
    setMetrics((curr) => [
      ...curr.filter((c) => c.name !== metric.name),
      metric,
    ]);
  };

  useEffect(() => {
    reportWebVitals(vitas);
  }, []);

  return {
    metrics: metrics.sort(
      (a, b) =>
        Object.keys(webVitals).indexOf(a) - Object.keys(webVitals).indexOf(b)
    ),
  };
};

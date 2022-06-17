import { useWebVitals } from "../hooks/useWebVitals";

const WebVitasBox = () => {
    const { metrics } = useWebVitals();
    return (
      <div className="fixed z-20 bottom-5 right-5 m-3 p-1 border inline-block bg-black text-white rounded-lg opacity-80">
        {metrics.map((metric) => (
          <div key={`${metric.id}`}>
            <div className="">
              {metric.name}: {metric.value}
            </div>
          </div>
        ))}
      </div>
    );
  };
export default WebVitasBox
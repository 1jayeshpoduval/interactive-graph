import Graph from "./Graph";
import { useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const duration = 60;
  const startHour = 6;
  const startMinutes = 30;

  const newMinute = `${(startMinutes + time) % 60}`.padStart(2, "0");
  const newHour = Math.floor(
    startHour + Math.floor((startMinutes + time) / 60),
  );
  const timeFormat = `${newHour}:${newMinute}`;

  return (
    <section className="h-screen text-white">
      <div className="mx-auto flex h-full w-[90%] items-center justify-center">
        <div className="relative">
          <Graph
            timeFormat={timeFormat}
            setTime={setTime}
            duration={duration}
          />
        </div>
      </div>
    </section>
  );
}

export default App;

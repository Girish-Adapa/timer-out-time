import { TimePicker } from "antd";
import React, { useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import moment from "moment";
import icon from "./icon.jpg";
import "./Timer.css";

const Timer = () => {
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);

  const handleTime = (time, timeString) => {
    if (time) {
      const selectedMoment = moment(timeString, "HH:mm:ss");
      const inTimeMoment = moment(timeString, "HH:mm:ss");
      setInTime(inTimeMoment);
      const outTimeMoment = selectedMoment.add(8, "hours").add(30, "minutes");
      setOutTime(outTimeMoment);
    } else {
      setInTime("");
      setOutTime("");
    }
  };
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Create a Chrome notification when the countdown is completed
      if (Notification.permission === "granted") {
        new Notification("Nikalo yaha se............", {
          body: "Jaldi vaha se hato...............",
          icon: icon, // Replace with the URL to your notification icon
        });
      } else if (Notification.permission !== "denied") {
        // Request permission if it's not granted or denied
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Nikalo yaha se..............", {
              body: "Jaldi vaha se hato...............",
              icon: icon, // Replace with the URL to your notification icon
            });
          }
        });
      }

      return (
        <>
          <div>00:00:00</div>
        </>
      );
    } else {
      return (
        <>
          <div className="countdown-container">
            {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="timer-container">
        <div className="time-picker-container">
          <TimePicker
            onChange={handleTime}
            format="HH:mm:ss"
            placeholder="Select In Time"
          />
        </div>
        <div>
          {inTime && (
            <div className="time-info">
              <div>
                In Time:
                <span className="time-label bold-label">
                  {" "}
                  {inTime.format("HH:mm:ss")}
                </span>{" "}
              </div>
              <div>
                Out Time:
                <span className="time-label bold-label">
                  {" "}
                  {outTime.format("HH:mm:ss")}
                </span>{" "}
              </div>
            </div>
          )}
          {inTime && <Countdown date={outTime.toDate()} renderer={renderer} />}
        </div>
      </div>
    </>
  );
};

export default Timer;

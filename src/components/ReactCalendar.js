/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import axios from "axios";
import moment from "moment";
const ReactCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [calendarData, setCalendarData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const getProductList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3030/api/calendarData"
      );
      if (response.status === 200) {
        setCalendarData(response.data);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    const handleClick = () => {
      console.log(calendarData);
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [calendarData]);

  // 객체 리터럴에 메서드로 한번에 하려 했는데
  // 따로 정의하는게 좋다라고 gpt 쪽에서 알려줘서 수정
  // 얘를 axios로 데이터 받아서 써야할듯싶음.
  const events = [
    { date: new Date(2024, 5, 30), text: "3" },
    { date: new Date(2024, 5, 15), text: "내용2" },
  ];
  function changeAllTexts(newText) {
    events.forEach((event) => {
      event.text = newText;
    });
  }

  function a() {
    if (!calendarData) return;
    calendarData.forEach((data) => {
      console.log(data);
      changeAllTexts(data?.title);
    });
  }
  a();
  console.log(events);
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const event = events.find(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear()
      );
      return event ? <p>{event.text}</p> : null;
    }
  };
  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log("Clicked date:", date);
    console.log(selectedDate);
    const dates = new Date("Sat Jun 01 2024 19:21:27 GMT+0900");
    const formattedDate = moment(dates).format("YYYY,MM,DD");
    console.log(formattedDate);
  };
  return (
    <div>
      <Calendar
        value={selectedDate}
        tileContent={tileContent}
        onClickDay={handleDateClick}
      />
    </div>
  );
};

export default ReactCalendar;

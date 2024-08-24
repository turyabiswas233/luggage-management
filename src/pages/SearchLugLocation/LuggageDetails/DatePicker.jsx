import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaRegClock,
} from "react-icons/fa";
const today = new Date();
const month = [
  { t: "Jan", range: 31 },
  { t: "Feb", range: 29 },
  { t: "Mar", range: 31 },
  { t: "Apr", range: 30 },
  { t: "May", range: 31 },
  { t: "Jun", range: 30 },
  { t: "Jul", range: 31 },
  { t: "Aug", range: 31 },
  { t: "Sep", range: 30 },
  { t: "Oct", range: 31 },
  { t: "Nov", range: 30 },
  { t: "Dec", range: 31 },
];

const DatePicker = ({
  setCheckinTime,
  setCheckoutTime,
  setLuggageQuantity,
}) => {
  const [timeRange, setTimeRange] = useState([
    {
      startTime: { h: 0, m: 0 },
      endTime: { h: 0, m: 0 },
    },
  ]);
  const [dmonthId, setdMonth] = useState(new Date().getMonth());
  const [dmid, setdmid] = useState(new Date().getMonth());
  const [ddateId, setdDate] = useState(new Date().getDate());
  const [dyear, setdyear] = useState(today.getFullYear());
  const [selectedDTime, setSelectedDTime] = useState({
    startTime: { h: today.getHours(), m: today.getMinutes() < 30 ? 0 : 30 },
    endTime: {
      h: today.getHours() + (today.getMinutes() < 30 ? 0 : 1),
      m: today.getMinutes() < 30 ? 30 : 0,
    },
  });

  const [pmonthId, setpMonth] = useState(new Date().getMonth());
  const [pmid, setpmid] = useState(new Date().getMonth());
  const [pdateId, setpDate] = useState(new Date().getDate());
  const [pyear, setpyear] = useState(today.getFullYear());
  const [selectedPTime, setSelectedPTime] = useState({
    endTime: { h: today.getHours() + 1, m: today.getMinutes() < 30 ? 0 : 30 },
    startTime: {
      h: today.getHours() + (today.getMinutes() < 30 ? 0 : 1),
      m: today.getMinutes() < 30 ? 30 : 0,
    },
  });
  const [bag, setBag] = useState(1);
  const [dropOff, setDropOff] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      today.getHours(),
      today.getMinutes() < 30 ? 0 : 30
    )
  );
  const [pickUp, setPickUp] = useState(
    new Date(dropOff.getTime() + 3600000 / 2)
  );
  const [toggleDateDrop, setToggleDateDrop] = useState(false);
  const [toggleTimeDrop, setToggleTimeDrop] = useState(false);
  const [toggleDatePick, setToggleDatePick] = useState(false);
  const [toggleTimePick, setToggleTimePick] = useState(false);

  useEffect(() => {
    setdyear(dropOff.getFullYear());
    setdmid(dropOff.getMonth());
    setdDate(dropOff.getDate());

    setpyear(pickUp.getFullYear());
    setpmid(pickUp.getMonth());
    setpDate(pickUp.getDate());
  }, []);

  useEffect(() => {
    setDropOff(
      new Date(
        dyear,
        dmid,
        ddateId,
        selectedDTime.startTime.h,
        selectedDTime.startTime.m
      )
    );
  }, [dmid, ddateId, dyear, selectedDTime]);
  useEffect(() => {
    setPickUp(
      new Date(
        pyear,
        pmid,
        pdateId,
        selectedPTime.endTime.h,
        selectedPTime.endTime.m
      )
    );
  }, [pmid, pdateId, pyear, selectedPTime]);
  useEffect(() => {
    setTimeRange([]);

    for (let i = 0; i <= 23; i++) {
      setTimeRange((pre) => [
        ...pre,
        { startTime: { h: i, m: 0 }, endTime: { h: i, m: 30 } },
      ]);
      setTimeRange((pre) => [
        ...pre,
        { startTime: { h: i, m: 30 }, endTime: { h: i + 1, m: 0 } },
      ]);
    }
  }, []);
  const [bags, setBags] = useState([]);
  useEffect(() => {
    setBags([]);
    for (let i = 1; i <= 50; i++) {
      setBags((p) => [...p, i]);
    }
  }, []);

  useEffect(() => {
    setCheckinTime(dropOff);
  }, [dropOff]);
  useEffect(() => {
    setCheckoutTime(pickUp);
  }, [pickUp]);

  useEffect(() => {
    setLuggageQuantity(bag);
  }, [bag]);

  return (
    <div className="w-full mx-auto space-y-4">
      {/* drop off box */}
      <div className="flex lg:flex-row flex-col items-start justify-between gap-2">
        {/* drop off date */}
        <div className="flex-1 border w-full border-gray-300 hover:border-teal-600 transition-colors p-2 rounded-md">
          <label className="block text-gray-700 text-xs">DROP-OFF DATE</label>
          <div className="mt-1 block w-full px-2 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {toggleDateDrop ? (
              <div>
                <select
                  name="year"
                  id="yead"
                  value={dyear}
                  onChange={(e) => setdyear(e.target.value)}
                >
                  <option value={today.getFullYear()}>
                    {today.getFullYear()}
                  </option>
                  <option value={today.getFullYear() + 1}>
                    {today.getFullYear() + 1}
                  </option>
                </select>
                {month.map((m, mi) => {
                  if (mi == dmonthId) {
                    const date = [];
                    const ly = dyear % 4 == 0 || dyear % 400 == 0;

                    for (let i = 1; i <= m.range; i++) {
                      if (mi == 1) {
                        if (ly) date.push(i);
                        else if (i <= 28) date.push(i);
                      } else date.push(i);
                    }

                    return (
                      <div
                        className={`grid grid-cols-1 space-y-3 `}
                        key={`md_${m.t}`}
                      >
                        <div className="flex justify-between gap-5 ">
                          <button
                            className="disabled:opacity-50"
                            onClick={() =>
                              setdMonth((p) => {
                                const newDate = new Date(
                                  dyear,
                                  dmonthId,
                                  today.getDate(),
                                  0,
                                  0
                                );
                                if (newDate.getTime() < today.getTime()) {
                                  return p;
                                } else if (p > 0) return p - 1;
                                else return p;
                              })
                            }
                            disabled={
                              today.getTime() >
                              new Date(
                                dyear,
                                dmonthId,
                                today.getDate(),
                                0,
                                0
                              ).getTime()
                            }
                          >
                            <FaChevronLeft />
                          </button>
                          <p
                            className={`flex-grow text-center font-semibold text-xl ${
                              dyear <= today.getFullYear() &&
                              mi < today.getMonth() &&
                              "grayscale opacity-50"
                            }`}
                          >
                            {m.t}
                          </p>
                          <button
                            onClick={() =>
                              setdMonth((p) => {
                                if (p < 11) return p + 1;
                                return p;
                              })
                            }
                          >
                            <FaChevronRight />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 space-x-1 gap-y-1 cursor-default">
                          {date.map((d) => (
                            <span
                              className={`text-center hover:bg-teal-400 rounded-sm ${
                                d === ddateId && mi === dmid
                                  ? "bg-teal-500 text-white"
                                  : ""
                              }  ${
                                today.getTime() >
                                  new Date(
                                    dyear,
                                    dmonthId,
                                    d,
                                    23,
                                    59
                                  ).getTime() &&
                                "grayscale opacity-50 pointer-events-none"
                              } `}
                              key={`md_${m.t}_${d}`}
                              onClick={() => {
                                setdDate(d);
                                setdmid(mi);
                                setToggleDateDrop(false);
                              }}
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return <></>;
                })}
              </div>
            ) : (
              <p
                className="border flex justify-start items-center gap-2 border-teal-600 rounded-md hover:bg-teal-50 p-2 cursor-default"
                onClick={() => setToggleDateDrop(true)}
              >
                <FaCalendarAlt color="#33A447" />
                {month[dmid].t.toLocaleUpperCase()} {ddateId}, {dyear}
              </p>
            )}
          </div>
        </div>
        {/* drop off time */}
        <div className="flex-1 border w-full border-gray-300 hover:border-teal-600 transition-colors p-2 rounded-md">
          <label className="block text-gray-700 text-xs">DROP-OFF TIME</label>
          <div className="mt-1 block w-full px-2 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {/* time range option */}
            <div>
              <p
                className="border flex justify-start items-center gap-2  border-teal-600 rounded-md hover:bg-teal-50 p-2 cursor-default"
                onClick={() => setToggleTimeDrop((p) => !p)}
              >
                <FaRegClock color="#33A447" />
                {timeConvert(
                  selectedDTime.startTime.h,
                  selectedDTime.startTime.m
                )}{" "}
                --{" "}
                {timeConvert(selectedDTime.endTime.h, selectedDTime.endTime.m)}
              </p>
              {toggleTimeDrop && (
                <ul className="grid gap-2 max-h-64 overflow-y-auto">
                  {timeRange.map((tr, tid) => {
                    return (
                      <li
                        className={`p-3 hover:text-white hover:bg-teal-500 rounded-md transition-colors ${
                          new Date(
                            dyear,
                            dmid,
                            ddateId,
                            tr.endTime.h,
                            tr.endTime.m
                          ).getTime() < today.getTime() &&
                          "opacity-50 grayscale pointer-events-none bg-transparent"
                        } ${
                          dropOff.getHours() === tr.startTime.h &&
                          dropOff.getMinutes() === tr.startTime.m &&
                          "bg-teal-600"
                        }`}
                        key={`timed_${tid}`}
                        onClick={() => {
                          setSelectedDTime(tr);
                          setToggleTimeDrop(false);
                        }}
                      >
                        {timeConvert(tr.startTime.h, tr.startTime.m)} --{" "}
                        {timeConvert(tr.endTime.h, tr.endTime.m)}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* pick up box */}
      <div className="flex lg:flex-row flex-col items-start justify-between gap-2">
        {/* pick up off date */}
        <div className=" flex-1 border w-full border-gray-300 hover:border-teal-600 transition-colors p-2 rounded-md">
          <label className="block text-gray-700 text-xs">PICK-UP DATE</label>
          <div className="mt-1 block w-full px-2 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {toggleDatePick ? (
              <div>
                <select
                  name="year"
                  id="yead"
                  value={pyear}
                  onChange={(e) => setpyear(e.target.value)}
                >
                  <option value={today.getFullYear()}>
                    {today.getFullYear()}
                  </option>
                  <option value={today.getFullYear() + 1}>
                    {today.getFullYear() + 1}
                  </option>
                </select>
                {month.map((m, mi) => {
                  if (mi == pmonthId) {
                    const date = [];
                    const ly = pyear % 4 == 0 || pyear % 400 == 0;

                    for (let i = 1; i <= m.range; i++) {
                      if (mi == 1) {
                        if (ly) date.push(i);
                        else if (i <= 28) date.push(i);
                      } else date.push(i);
                    }

                    return (
                      <div
                        className={`grid grid-cols-1 space-y-3 `}
                        key={`mp_${m.t}`}
                      >
                        <div className="flex justify-between gap-5 ">
                          <button
                            className="disabled:opacity-50"
                            onClick={() =>
                              setpMonth((p) => {
                                const newDate = new Date(
                                  pyear,
                                  pmonthId,
                                  today.getDate(),
                                  0,
                                  0
                                );
                                if (newDate.getTime() < today.getTime()) {
                                  return p;
                                } else if (p > 0) return p - 1;
                                else return p;
                              })
                            }
                            disabled={
                              today.getTime() >
                              new Date(
                                pyear,
                                pmonthId,
                                today.getDate(),
                                0,
                                0
                              ).getTime()
                            }
                          >
                            <FaChevronLeft color="#33A447" />
                          </button>
                          <p
                            className={`flex-grow text-center font-semibold text-xl ${
                              pyear <= today.getFullYear() &&
                              mi < today.getMonth() &&
                              "grayscale opacity-50"
                            }`}
                          >
                            {m.t}
                          </p>
                          <button
                            onClick={() =>
                              setpMonth((p) => {
                                if (p < 11) return p + 1;
                                return p;
                              })
                            }
                          >
                            <FaChevronRight color="#33A447" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 space-x-1 gap-y-1 cursor-default">
                          {date.map((d) => (
                            <span
                              className={`text-center hover:bg-teal-400 rounded-sm ${
                                d === pdateId && mi === pmid
                                  ? "bg-teal-500"
                                  : ""
                              }  ${
                                today.getTime() >
                                  new Date(
                                    pyear,
                                    pmonthId,
                                    d,
                                    23,
                                    59
                                  ).getTime() &&
                                "grayscale opacity-50 pointer-events-none"
                              } `}
                              key={`mp_${m.t}_${d}`}
                              onClick={() => {
                                setpDate(d);
                                setpmid(mi);
                                setToggleDatePick(false);
                              }}
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return <></>;
                })}
              </div>
            ) : (
              <p
                className="border flex justify-start items-center gap-2  border-teal-600 rounded-md hover:bg-teal-50 p-2 cursor-default"
                onClick={() => setToggleDatePick(true)}
              >
                <FaCalendarAlt color="#33A447" />
                {month[pmid].t.toLocaleUpperCase()} {pdateId}, {pyear}
              </p>
            )}
          </div>
        </div>
        {/* drop off time */}
        <div className=" flex-1 border w-full border-gray-300 hover:border-teal-600 transition-colors p-2 rounded-md">
          <label className="block text-gray-700 text-xs">PICK-UP TIME</label>
          <div className="mt-1 block w-full px-2 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {/* time range option */}
            <div>
              <p
                className="border flex justify-start items-center gap-2  border-teal-600 rounded-md hover:bg-teal-50 p-2 cursor-default"
                onClick={() => setToggleTimePick((p) => !p)}
              >
                <FaRegClock color="#33A447" />
                {timeConvert(
                  selectedPTime.startTime.h,
                  selectedPTime.startTime.m
                )}{" "}
                --{" "}
                {timeConvert(selectedPTime.endTime.h, selectedPTime.endTime.m)}
              </p>
              {toggleTimePick && (
                <ul className="grid gap-2 max-h-64 overflow-y-auto">
                  {timeRange.map((tr, tid) => {
                    return (
                      <li
                        className={`p-3 hover:text-white hover:bg-teal-500 rounded-md transition-colors ${
                          new Date(
                            pyear,
                            pmid,
                            pdateId,
                            tr.startTime.h,
                            tr.startTime.m
                          ).getTime() <= dropOff.getTime() &&
                          "opacity-50 grayscale pointer-events-none bg-transparent"
                        } ${
                          selectedPTime.startTime.h === tr.startTime.h &&
                          selectedPTime.startTime.m === tr.startTime.m &&
                          "bg-teal-600"
                        } `}
                        key={`time_${tid}`}
                        onClick={() => {
                          setSelectedPTime(tr);
                          setToggleTimePick(false);
                        }}
                      >
                        {timeConvert(tr.startTime.h, tr.startTime.m)} --{" "}
                        {timeConvert(tr.endTime.h, tr.endTime.m)}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border w-full border-gray-300 hover:border-teal-600 transition-colors p-2 rounded-md">
        <label className="block text-gray-700 text-xs">Number of Bags</label>
        <select
          name="bagNum"
          id="bagNum"
          className="text-black p-2 mt-2 rounded-md border border-gray-300 w-full hover:border-teal-500 hover:bg-teal-50"
          value={bag}
          onChange={(e) => setBag(e.target.value)}
        >
          {bags.map((b, bi) => (
            <option
              className="py-2 px-4 text-xl"
              key={`bagNum_${bi}`}
              value={b}
            >
              {b}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
function timeConvert(h, m) {
  let ap = "";
  if (h < 12 || h == 24) ap = "AM";
  else ap = "PM";
  let hh = h == 24 || h == 0 ? 12 : h == 12 ? 12 : h % 12;
  return `${hh.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")} ${ap}`;
}
export default DatePicker;

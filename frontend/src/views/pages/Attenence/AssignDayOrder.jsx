import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Skeleton } from "@mui/material";
import "../../css/calender.css";
import Header from "../../../layout/Mainlayout/Header/Header";
import Footer from "../../../layout/Mainlayout/Footer/Footer";

const AssignDayOrder = () => {
  const [loading, setLoading] = useState(true);
  const [calendars, setCalendars] = useState([]);
  const [dayOrderValues, setDayOrderValues] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayOrderModalVisible, setDayOrderModalVisible] = useState(false);
  const [dayOrderModalValues, setDayOrderModalValues] = useState({});
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  useEffect(() => {
    fetchCalendars();
    fetchDayOrderValues();
  }, []);

  const fetchCalendars = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/calendar");
      setCalendars(response.data);
      setLoading(false); // Data fetched, loading is done
    } catch (error) {
      console.error("Error fetching calendars:", error);
    }
  };

  const fetchDayOrderValues = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/dayorder");
      setDayOrderValues(response.data);
    } catch (error) {
      console.error("Error fetching day order values:", error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const selectedTask = calendars.find(
      (task) => new Date(task.date).toDateString() === date.toDateString()
    );

    if (selectedTask) {
      setDayOrderModalValues(selectedTask);
      setDayOrderModalVisible(true);
    } else {
      setDayOrderModalValues({});
      setDayOrderModalVisible(true);
    }
  };

  const handleDayOrderChange = async (newDayOrder) => {
    try {
      if (dayOrderModalValues._id) {
        await axios.put(
          `http://localhost:3002/api/calendar/${dayOrderModalValues._id}`,
          { dayorder: newDayOrder, date: selectedDate }
        );
      } else {
        await axios.post("http://localhost:3002/api/calendar", {
          dayorder: newDayOrder,
          date: selectedDate,
        });
      }
      fetchCalendars();
      setDayOrderModalVisible(false);
    } catch (error) {
      console.error("Error updating day order:", error);
    }
  };

  const handleDeleteConfirmation = (task) => {
    setDayOrderModalValues(task);
    setDeleteConfirmationVisible(true);
  };

  const handleCancelDelete = () => {
    setDayOrderModalValues({});
    setDeleteConfirmationVisible(false);
  };
  const handleConfirmDelete = async () => {
    try {
      if (dayOrderModalValues._id) {
        await axios.delete(
          `http://localhost:3002/api/calendar/${dayOrderModalValues._id}`
        );
        fetchCalendars();
        setDayOrderModalValues({});
        setDeleteConfirmationVisible(false);
      }
    } catch (error) {
      console.error("Error deleting day order:", error);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const selectedTask = calendars.find(
        (task) => new Date(task.date).toDateString() === date.toDateString()
      );
      if (selectedTask) {
        return (
          <div className="day-order ">
            <p className="my-2" style={{ color: "black" }}>
              dayorder: {selectedTask.dayorder}
            </p>
            <button
              data-bs-toggle="modal"
              style={{
                backgroundColor: "rgb(30, 168, 231)",
                color: "white",
                borderRadius: "10px",
              }}
              data-bs-target="#staticBackdropDeleteDay"
              className="py-1"
              onClick={() => handleDeleteConfirmation(selectedTask)}
            >
              Delete
            </button>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div id="root">
      <main>
        <div className="container">
          <section className="scroll-section" id="title">
            <div className="page-title-container">
              <h1 className="mb-1 pb-0 display-4">Daily Track Calender</h1>
              <nav
                className="breadcrumb-container d-inline-block"
                aria-label="breadcrumb"
              >
                <ul className="breadcrumb pt-0">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Interface</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Forms</a>
                  </li>
                </ul>
              </nav>
            </div>
          </section>

          <div data-bs-toggle="modal" data-bs-target="#staticBackdropCalender">
            {loading ? (
              <div>
                <Skeleton
                  style={{ marginBottom: "20px", borderRadius: 20 }}
                  variant="rectangular"
                  width="100%"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  style={{ marginBottom: "20px", borderRadius: 20 }}
                  variant="rectangular"
                  width="100%"
                  height={400}
                  animation="wave"
                />{" "}
              </div> // Show skeleton while loading
            ) : (
              <Calendar
                className="custom-calendar card"
                value={selectedDate}
                onClickDay={handleDateClick}
                tileContent={tileContent}
              />
            )}
          </div>
        </div>

        <section className="scroll-section " id="staticBackdrop">
          <div className="card mb-3">
            <div>
              <div
                className={`modal fade ${
                  dayOrderModalVisible ? "show" : "hidden"
                }`}
                id="staticBackdropCalender"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog " style={{ maxWidth: "500px" }}>
                  <div className="modal-content">
                    <div className="px-6">
                      <div className="modal-header px-0">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          {dayOrderModalValues.title || "Assign Day Order"}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                    </div>
                    <div className="mb-5 px-6 ">
                      <div>
                        <form>
                          <div>
                            <div>
                              <div className="mb-3">
                                <label className="form-label">Department</label>
                                <select
                                  className="form-select select2Basic"
                                  value={dayOrderModalValues.dayorder || ""}
                                  onChange={(e) =>
                                    setDayOrderModalValues({
                                      ...dayOrderModalValues,
                                      dayorder: e.target.value,
                                    })
                                  }
                                  placeholder="Student Name"
                                  required
                                >
                                  <option value="">Select Day Order</option>
                                  {dayOrderValues.map((value) => (
                                    <option
                                      key={value._id}
                                      value={value.dayorder}
                                    >
                                      {value.dayorder}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary text-end mx-1"
                            type="submit"
                            data-bs-dismiss="modal"
                            onClick={() =>
                              handleDayOrderChange(dayOrderModalValues.dayorder)
                            }
                          >
                            Change
                          </button>
                          <button
                            className="btn btn-secondary text-end mx-1"
                            data-bs-dismiss="modal"
                          >
                            cancel
                          </button>
                        </form>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-section " id="staticBackdrop">
          <div className="card mb-3">
            <div>
              <div
                className={`modal fade ${
                  deleteConfirmationVisible ? "show" : "hidden"
                }`}
                id="staticBackdropDeleteDay"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog " style={{ maxWidth: "500px" }}>
                  <div className="modal-content">
                    <div className="px-6">
                      <div className="modal-header px-0">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          Delete Day Order
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="pt-3">
                        <p>Are you sure you want to delete this day order?</p>

                        <div className="text-end pb-4">
                          <button
                            className="btn btn-primary text-end mx-1"
                            onClick={handleConfirmDelete}
                            data-bs-dismiss="modal"
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-secondary text-end mx-1"
                            onClick={handleCancelDelete}
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AssignDayOrder;

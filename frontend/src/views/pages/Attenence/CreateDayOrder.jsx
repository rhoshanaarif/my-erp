import React, { useState, useEffect } from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import axios from "axios";
import ViewModal from "../Modals/ViewModal"; // Import your modal components
import EditModal from "../Modals/EditModal";
import { Skeleton } from "@mui/material";

const CreateDayOrder = () => {
  const [number, setNumber] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [periods, setPeriods] = useState([]);
  const [totalperiod, setTotalPeriod] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [dayOrderToDelete, setDayOrderToDelete] = useState(null);
  const [startTime, setStartTime] = useState(moment().format("hh:mm A"));
  const [endTime, setEndTime] = useState(moment().format("hh:mm A"));
  const [dayOrders, setDayOrders] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDayOrder, setSelectedDayOrder] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  console.log(periods);
  console.log(totalperiod);

  useEffect(() => {
    fetchDayOrders();
  }, []);

  const fetchDayOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/dayorder");
      setDayOrders(response.data);
    } catch (error) {
      console.error("Error fetching day orders:", error);
    }
  };

  const handleNumberChange = (value) => {
    console.log("handleNumberChange called with value:", value); // Add this line
    setNumber(value);
  };
  const handleTotalPeriodChange = (value) => {
    console.log("handleTotalPeridrChange called with value:", value); // Add this line
    setTotalPeriod(value);
    setPeriods(
      Array.from({ length: value }, () => ({
        hour: "",
        session: "",
        startTime: "",
        endTime: "",
      }))
    );
  };

  const handleHourChange = (period, index, value) => {
    const updatedPeriods = [...periods];
    updatedPeriods[index].hour = value;
    setPeriods(updatedPeriods);
  };

  const handleSessionChange = (index, value) => {
    const updatedPeriods = [...periods];
    updatedPeriods[index].session = value;
    setPeriods(updatedPeriods);
  };

  const handleStartTimeChange = (index, time) => {
    const updatedPeriods = [...periods];
    updatedPeriods[index].startTime = time;
    setPeriods(updatedPeriods);
  };

  const handleEndTimeChange = (index, time) => {
    const updatedPeriods = [...periods];
    updatedPeriods[index].endTime = time;
    setPeriods(updatedPeriods);
  };
  const handleSaveDayOrder = async () => {
    try {
      const response = await axios.post("http://localhost:3002/api/dayorder", {
        dayorder: number,
        day: selectedDay,
        totalperiod: totalperiod,
        periods: periods,
      });
      console.log("Saved Day Order:", response.data);
      setSelectedDay("Monday");
      setNumber(0);
      setTotalPeriod(0);
      setPeriods(
        Array.from({ length: 0 }, () => ({
          hour: "",
          session: "",
          startTime: "",
          endTime: "",
        }))
      );
      setStartTime(moment().format("hh:mm A"));
      setEndTime(moment().format("hh:mm A"));
      fetchDayOrders();
    } catch (error) {
      console.error("Error saving day order:", error);
    }
  };
  const handleShowTable = () => {
    setShowTable(true);
  };
  const handleViewDayOrder = (dayOrder) => {
    setSelectedDayOrder(dayOrder);
    setShowViewModal(true);
    setShowEditModal(false); // Close the edit modal if it's open
  };

  const handleEditDayOrder = (dayOrder) => {
    setSelectedDayOrder(dayOrder);
    setShowEditModal(true);
    setShowViewModal(false); // Close the view modal if it's open
  };

  const openConfirmDeleteDialog = (dayOrder) => {
    setDayOrderToDelete(dayOrder);
    setConfirmDeleteOpen(true);
  };
  const handleDeleteDayOrder = (dayOrder) => {
    openConfirmDeleteDialog(dayOrder);
  };
  const deleteDayOrder = async (dayOrder) => {
    try {
      await axios.delete(`http://localhost:3002/api/dayorder/${dayOrder._id}`);
      fetchDayOrders(); // Fetch updated day orders after deletion
    } catch (error) {
      console.error("Error deleting day order:", error);
    }
  };

  return (
    <div id="root">
      <main>
        <div className="container">
          <div className="row">
            <div className="col">
              <section className="scroll-section" id="title">
                <div className="page-title-container">
                  <h1 className="mb-0 pb-0 display-4">
                    Students Information System
                  </h1>
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
              <div className="row">
                <section
                  className="scroll-section col-12 col-md-6"
                  id="basicSingle"
                >
                  <h2 className="small-title">Day Order Registration</h2>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <div className=" mb-3 w-100">
                              <label className="form-label">Day Order</label>
                              <select
                                className="form-select select2Basic"
                                name="dayOrder"
                                value={number}
                                onChange={(e) =>
                                  handleNumberChange(e.target.value)
                                }
                              >
                                <option selected>--Select Number--</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                {/* Add more options if needed */}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3 w-100">
                              <label className="form-label">Day</label>
                              <select
                                className="form-select select2Basic"
                                value={selectedDay}
                                onChange={(e) => setSelectedDay(e.target.value)}
                              >
                                <option selected>--Select Day--</option>
                                {daysOfWeek.map((day) => (
                                  <option key={day} value={day}>
                                    {day}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3 w-100">
                              <label className="form-label">Total Period</label>
                              <select
                                className="form-select select2Basic"
                                name="periodlabel"
                                value={totalperiod}
                                onChange={(e) =>
                                  handleTotalPeriodChange(e.target.value)
                                }
                              >
                                <option selected>--Select period--</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={handleShowTable}
                      >
                        Click to create
                      </button>
                    </div>
                  </div>
                  {showTable && (
                    <>
                      {periods.length === 0 ? (
                        <div>
                          <Skeleton
                            style={{ marginBottom: "20px", borderRadius: 20 }}
                            variant="rectangular"
                            height={20}
                            animation="wave"
                          />
                          <Skeleton
                            style={{
                              marginBottom: "20px",
                              marginRight: "10px",
                              borderRadius: 20,
                            }}
                            variant="rectangular"
                            height={300}
                            animation="wave"
                          />
                        </div>
                      ) : (
                        <div className="card mb-5" id="stripedRows">
                          <div className="card-body">
                            <form>
                              <table class="table table-striped table-bordered">
                                <thead>
                                  <tr>
                                    <th className="text-center" scope="col">
                                      Period
                                    </th>
                                    <th className="text-center" scope="col">
                                      Hour
                                    </th>
                                    <th className="text-center" scope="col">
                                      Session
                                    </th>
                                    <th className="text-center" scope="col">
                                      Start Time
                                    </th>
                                    <th className="text-center" scope="col">
                                      End Time
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {periods.map((period, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        <input
                                          className="form-control"
                                          required
                                          type="text"
                                          value={period.hour}
                                          onChange={(e) =>
                                            handleHourChange(
                                              period,
                                              index,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                      <td>
                                        <select
                                          className="form-select select2Basic"
                                          required
                                          style={{
                                            width: "80px",
                                            height: "10px",
                                          }}
                                          name="deptFloatingLabel"
                                          value={period.session}
                                          onChange={(e) =>
                                            handleSessionChange(
                                              index,
                                              e.target.value
                                            )
                                          }
                                        >
                                          <option value="AN">AN</option>
                                          <option value="FN">FN</option>
                                        </select>
                                      </td>
                                      <td>
                                        <TimePicker
                                          showSecond={false}
                                          required
                                          defaultValue={moment(
                                            startTime,
                                            "hh:mm A"
                                          )}
                                          format={"hh:mm A"}
                                          onChange={(value) =>
                                            handleStartTimeChange(
                                              index,
                                              value
                                                ? value.format("hh:mm A")
                                                : ""
                                            )
                                          }
                                          use12Hours
                                        />
                                      </td>
                                      <td>
                                        <TimePicker
                                          showSecond={false}
                                          required
                                          defaultValue={moment(
                                            endTime,
                                            "hh:mm A"
                                          )}
                                          format={"hh:mm A"}
                                          onChange={(value) =>
                                            handleStartTimeChange(
                                              index,
                                              value
                                                ? value.format("hh:mm A")
                                                : ""
                                            )
                                          }
                                          use12Hours
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSaveDayOrder}
                              >
                                Save Day Order
                              </button>
                            </form>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </section>
                <section className="col-12 col-md-6">
                  <div>
                    <section
                      className="scroll-section"
                      id="buttons overlayScroll floaing-label closeButtonOut"
                    >
                      <div className="d-flex justify-content-between">
                        <h2 className="small-title">Day Order</h2>
                        <button
                          class="btn btn-icon btn-icon-only btn-sm btn-background-alternate mt-n2 shadow"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          aria-haspopup="true"
                        >
                          <i data-acorn-icon="more-horizontal"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-sm dropdown-menu-end shadow">
                          <a class="dropdown-item" href="#">
                            Reload
                          </a>
                          <a class="dropdown-item" href="#">
                            Stats
                          </a>
                          <a class="dropdown-item" href="#">
                            Details
                          </a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="#">
                            Delete
                          </a>
                        </div>
                      </div>{" "}
                      {dayOrders.length === 0 ? (
                        <div>
                          <Skeleton
                            style={{ marginBottom: "20px", borderRadius: 20 }}
                            variant="rectangular"
                            height={20}
                            animation="wave"
                          />
                          <Skeleton
                            style={{
                              marginBottom: "20px",
                              marginRight: "10px",
                              borderRadius: 20,
                            }}
                            variant="rectangular"
                            height={300}
                            animation="wave"
                          />
                        </div>
                      ) : (
                        <div className="scroll-out card">
                          <div className="scroll-by-count card-body">
                            <table className="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th className="text-center">Day Order</th>
                                  <th className="text-center">Day</th>
                                  <th className="text-center">Total Periods</th>
                                  <th className="text-center">Actions</th>
                                </tr>
                              </thead>

                              <tbody>
                                {/* Loop through the day orders and display them in rows */}
                                {dayOrders.map((dayOrder, index) => (
                                  <tr key={index}>
                                    <td className="text-center">
                                      {dayOrder.dayorder}
                                    </td>
                                    <td className="text-center">
                                      {dayOrder.day}
                                    </td>
                                    <td className="text-center">
                                      {dayOrder.totalperiod}
                                    </td>
                                    <td className="text-center">
                                      <button
                                        onClick={() =>
                                          handleEditDayOrder(dayOrder)
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdropTable"
                                        className="btn btn-sm btn-outline-primary ms-1"
                                        type="button"
                                      >
                                        <i
                                          data-acorn-icon="edit-square"
                                          data-acorn-size="15"
                                        ></i>
                                        Edit
                                      </button>
                                      <button
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdropView"
                                        onClick={() =>
                                          handleViewDayOrder(dayOrder)
                                        }
                                        className="btn btn-sm btn-outline-primary ms-1"
                                        type="button"
                                      >
                                        View
                                      </button>
                                      <button
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticTableDelete"
                                        onClick={() =>
                                          handleDeleteDayOrder(dayOrder)
                                        }
                                        className="btn btn-sm btn-outline-primary ms-1"
                                        type="button"
                                      >
                                        <i
                                          data-acorn-icon="bin"
                                          data-acorn-size="15"
                                        ></i>
                                        <span class="">Delete</span>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </section>
                  </div>
                </section>
              </div>
              {/* Edit modal */}
              {showEditModal && (
                <EditModal
                  onSave={fetchDayOrders}
                  dayOrder={selectedDayOrder}
                  onClose={() => setShowEditModal(false)}
                />
              )}
              {/* Display list of students */}

              {showViewModal && (
                <ViewModal
                  dayOrder={selectedDayOrder}
                  onClose={() => setShowViewModal(false)}
                />
              )}
              {/* Delete Modal  students */}

              <section className="scroll-section " id="staticBackdrop">
                <div className="card-body">
                  <div
                    className={`modal fade ${
                      confirmDeleteOpen ? "show" : "hidden"
                    }`}
                    id="staticTableDelete"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" style={{ maxWidth: "500px" }}>
                      <div className="modal-content">
                        <div className="modal-header">
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
                        <div className="modal-body">
                          Are you sure you want to delete this day order?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setConfirmDeleteOpen(false)}
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setConfirmDeleteOpen(false);
                              if (dayOrderToDelete) {
                                deleteDayOrder(dayOrderToDelete);
                              }
                            }}
                            data-bs-dismiss="modal"
                            className="btn btn-primary"
                          >
                            Confirm Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateDayOrder;

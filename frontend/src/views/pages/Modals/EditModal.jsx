import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

const EditModal = ({ dayOrder, onClose, onSave }) => {
  const initialEditedPeriods = dayOrder.periods.map((period) => ({
    ...period,
    startTime: moment(period.startTime, "hh:mm A").format("HH:mm"),
    endTime: moment(period.endTime, "hh:mm A").format("HH:mm"),
  }));

  const [editedPeriods, setEditedPeriods] = useState(initialEditedPeriods);
  const [editedDayOrder, setEditedDayOrder] = useState(dayOrder.dayorder);
  const [editedDay, setEditedDay] = useState(dayOrder.day);
  const [editedTotalPeriod, setEditedTotalPeriod] = useState(
    dayOrder.totalperiod
  );

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleDayOrderChange = (value) => {
    setEditedDayOrder(value);
  };

  const handleDayChange = (value) => {
    setEditedDay(value);
  };

  const handleTotalPeriodChange = (value) => {
    setEditedTotalPeriod(value);
  };

  const handleHourChange = (index, value) => {
    const updatedPeriods = [...editedPeriods];
    updatedPeriods[index].hour = value;
    setEditedPeriods(updatedPeriods);
  };

  const handleSessionChange = (index, value) => {
    const updatedPeriods = [...editedPeriods];
    updatedPeriods[index].session = value;
    setEditedPeriods(updatedPeriods);
  };

  const handleStartTimeChange = (index, value) => {
    const updatedPeriods = [...editedPeriods];
    updatedPeriods[index].startTime = value;
    setEditedPeriods(updatedPeriods);
  };

  const handleEndTimeChange = (index, value) => {
    const updatedPeriods = [...editedPeriods];
    updatedPeriods[index].endTime = value;
    setEditedPeriods(updatedPeriods);
  };

  const handleAddRow = () => {
    const newRow = { hour: "", session: "", startTime: "", endTime: "" };
    setEditedPeriods([...editedPeriods, newRow]);
    setEditedTotalPeriod(editedTotalPeriod + 1); // Increment totalperiod
  };

  const handleDeleteRow = (index) => {
    if (index !== 0) {
      // Check if it's not the first row
      const updatedPeriods = [...editedPeriods];
      updatedPeriods.splice(index, 1); // Remove the element at the specified index
      setEditedPeriods(updatedPeriods);
      setEditedTotalPeriod(editedTotalPeriod - 1); // Decrement totalperiod
    }
  };

  const handleSave = () => {
    // Logic to save edited periods
    // You can make an API request here to update the day order with the edited periods
    axios
      .put(`http://localhost:3002/api/dayorder/${dayOrder._id}`, {
        dayorder: editedDayOrder,
        day: editedDay,
        totalperiod: editedTotalPeriod,
        periods: editedPeriods,
      })
      .then(() => {
        // Fetch updated day orders and close the modal
        onSave();
        onClose();
      })
      .catch((error) => {
        console.error("Error saving edited periods:", error);
      });
  };
  return (
    <section className="scroll-section " id="staticBackdrop">
      <div className="card mb-3">
        <div>
          <div
            className="modal fade"
            id="staticBackdropTable"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            role="dialog"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" style={{maxWidth:'800px'}}>
              <div className="modal-content">
                <div className="px-6">
                  <div className="modal-header px-0">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Editing Class
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="row g-3 mt-2">
                    <div className="col-md-4">
                      <div className=" mb-3 w-100">
                        <label className="form-label">Day Order</label>
                        <select
                          className="form-select select2Basic"
                          name="dayOrder"
                          value={editedDayOrder}
                          onChange={(e) => handleDayOrderChange(e.target.value)}
                        >
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
                        <label className="form-label">Day:</label>
                        <select
                          className="form-select select2Basic"
                          value={editedDay}
                          onChange={(e) => handleDayChange(e.target.value)}
                        >
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
                        <label className="form-label">Total Periods:</label>
                        <input
                          className="form-control"
                          value={editedTotalPeriod}
                          onChange={(e) =>
                            handleTotalPeriodChange(e.target.value)
                          }
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card mb-5" id="stripedRows">
                    <div>
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
                            {editedPeriods.map((period, index) => (
                              <tr key={index}>
                                <td className="text-center">{index + 1}</td>
                                <td>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={period.hour}
                                    onChange={(e) =>
                                      handleHourChange(index, e.target.value)
                                    }
                                  />
                                </td>
                                <td>
                                  <select
                                    className="form-select select2Basic"
                                    required
                                    style={{
                                      width: "100px",
                                      height: "10px",
                                      margin: "auto",
                                    }}
                                    value={period.session}
                                    onChange={(e) =>
                                      handleSessionChange(index, e.target.value)
                                    }
                                  >
                                    <option value="AN">AN</option>
                                    <option value="FN">FN</option>
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="time"
                                    className="form-control"
                                    required
                                    value={period.startTime}
                                    onChange={(e) =>
                                      handleStartTimeChange(
                                        index,
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    required
                                    type="time"
                                    value={period.endTime}
                                    onChange={(e) =>
                                      handleEndTimeChange(index, e.target.value)
                                    }
                                  />
                                </td>
                                <td className="text-center">
                                  {index !== 0 && ( // Conditionally render delete button if not the first row
                                    <button
                                      type="submit"
                                      title="delete"
                            className="btn btn-danger px-2 py-2 mx-1"
                                      onClick={() => handleDeleteRow(index)}
                                    >
                                     <i className="fas fa-trash"></i>
                                     
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-between">
                        <button
                          type="submit"
                          title="add row"
                          className="btn btn-primary px-3 py-1 mx-1"
                          onClick={handleAddRow}
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                        <div>
                        <button
                          type="submit"
                          className="btn btn-primary  mx-1"
                          onClick={handleSave}
                          data-bs-dismiss="modal"
                        >
                          Save Changes
                        </button>
                        <button
                          type="submit"
                          className="btn btn-secondary  mx-1"
                          onClick={onClose}
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditModal;

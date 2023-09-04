import React from "react";

const ViewModal = ({ dayOrder, onClose }) => {
  return (
    <section className="scroll-section " id="staticBackdrop">
      <div className="card mb-3">
        <div>
          <div
            className="modal fade"
            id="staticBackdropView"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            role="dialog"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog " style={{maxWidth:'800px'}}>
              <div className="modal-content">
                <div className="px-6">
                  <div className="modal-header px-0">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      View Day Order
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
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
                      {dayOrder.periods.map((period, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{period.hour}</td>
                          <td className="text-center">{period.session}</td>
                          <td className="text-center">{period.startTime}</td>
                          <td className="text-center">{period.endTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-end pb-4">
                  <button className="btn btn-secondary text-end mx-1" data-bs-dismiss="modal" onClick={onClose}>Close</button>
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

export default ViewModal;

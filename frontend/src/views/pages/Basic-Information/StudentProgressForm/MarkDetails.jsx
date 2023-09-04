import React from "react";

const MarkDetails = ({ inputValues, handleChange, handleSubjectChange }) => {
  return (
    <>
      <div className="mb-3">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Resgister No</label>
            <input
              type="number"
              value={inputValues.markDetails.registerNo}
              onChange={handleChange}
              name="markDetails.registerNo"
              placeholder="Register No"
              className="form-control"
              
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Institution</label>
            <select
              className="form-select"
              value={inputValues.markDetails.instution}
              onChange={handleChange}
              name="markDetails.instution"
              
            >
              <option value="">--Select--</option>
              <option>Self_Financed</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Graduation</label>
            <select
              className="form-select"
              value={inputValues.markDetails.graduation}
              onChange={handleChange}
              name="markDetails.graduation"
              
            >
              <option value="">--Select--</option>
              <option>UG</option>
              <option>PG</option>
              <option>Phd</option>
              <option>DOC</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th className="text-center">S.No</th>
                <th className="text-center">Subject Code</th>
                <th className="text-center">Subject Name</th>
                <th className="text-center">Max Mark</th>
                <th className="text-center">Min Mark</th>
                <th className="text-center">Scored Mark</th>
              </tr>
            </thead>
            <tbody>
              {inputValues.markDetails.subjects.map((subject, index) => (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        value={subject.subjectCode}
                        onChange={(e) =>
                          handleSubjectChange(e, index, "subjectCode")
                        }
                        className="form-control font-weight-bold"
                        
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={subject.subjectName}
                        className="form-control"
                        readOnly
                        
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={subject.maxMark}
                        onChange={(e) =>
                          handleSubjectChange(e, index, "maxMark")
                        }
                        className="form-control"
                        
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={subject.minMark}
                        onChange={(e) =>
                          handleSubjectChange(e, index, "minMark")
                        }
                        className="form-control"
                        
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={subject.scoredMark}
                        onChange={(e) =>
                          handleSubjectChange(e, index, "scoredMark")
                        }
                        className="form-control"
                        
                      />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <div className="d-flex gap-2 align-items-start">
            <div>
              <label className="form-label">Total</label>
              <input
                type="number"
                placeholder="Total"
                className="form-control"
                value={inputValues.markDetails.totalMarks}
                onChange={handleChange}
                name="markDetails.totalMarks"
                
              />
            </div>
            <div>
              <label className="form-label">Percentage</label>
              <input
                type="text"
                placeholder="Percent %"
                value={inputValues.markDetails.percentage}
                onChange={handleChange}
                name="markDetails.percentage"
                className="form-control"
                
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkDetails;

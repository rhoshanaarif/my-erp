import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardsDefault from "./views/utilities/DashboardsDefault";
import AddFaculty from "./views/pages/Basic-Information/StaffInfo";
import AddSubjects from "./views/pages/configuration-component/AddSubjects";
import AddClass from "./views/pages/configuration-component/AddClass";
import AddDepartment from "./views/pages/configuration-component/ManageDepartment";
import AddHours from "./views/pages/configuration-component/AddHours";
import CreateDayOrder from "./views/pages/Attenence/CreateDayOrder";
import CreateTimeTable from "./views/pages/Attenence/CreateTimeTable";
import AssignDayOrder from "./views/pages/Attenence/AssignDayOrder";
import StudentCertificates from "./views/pages/Upoad-certificates/StudentCertificates";
import OurFaculty from "./views/pages/configuration-component/ManageStaffs";

import StudentAttenence from "./views/pages/Attenence/StudentAttenence";
import MainLayout from "./layout/Mainlayout";
import ManageAcademic from "./views/pages/configuration-component/ManageAcademic";
import ManageUserRole from "./views/pages/configuration-component/manageUserrole";
import ManageUserType from "./views/pages/configuration-component/ManageUsertype";
import ManageBatch from "./views/pages/configuration-component/ManageBatch";
import StudentDetails from "./views/pages/Basic-Information/StudentDetails";
import ManageYear from "./views/pages/configuration-component/ManageYear";
import ManageStudents from "./views/pages/configuration-component/ManageStudents";
import ViewAttendance from "./views/pages/Attenence/ViewAttendance";
import EditStudentForm from "./views/pages/Basic-Information/EditStudentForm/EditStudentForm";
import Departmentgroup from "./views/pages/configuration-component/Departmentgroup";
import ManageQuota from "./views/pages/configuration-component/ManageQuota";
import ManageAccount from "./views/pages/configuration-component/ManageAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Navigate to="/default-dashboard" replace />}
          />
          <Route path="/default-dashboard" element={<DashboardsDefault />} />
          {/* basic-information Module Route */}
          <Route path="/basic-information/*">
            <Route path="student_registration" element={<StudentDetails />} />
          </Route>

          {/* Configuration Module Route */}
          <Route path="/configuration/*">
            <Route path="manage-students" element={<ManageStudents />} />
            <Route path="manage-account" element={<ManageAccount />} />
            <Route path="manage-quota" element={<ManageQuota />} />
            <Route path="department-group" element={<Departmentgroup />} />
            <Route path="manage-year" element={<ManageYear />} />
            <Route path="manage-batch" element={<ManageBatch />} />
            <Route path="manage-usertype" element={<ManageUserType />} />
            <Route path="manage-userrole" element={<ManageUserRole />} />
            <Route path="manage-academic" element={<ManageAcademic />} />
            <Route path="staff-information" element={<AddFaculty />} />
            <Route path="add-subjects" element={<AddSubjects />} />
            <Route path="add-class" element={<AddClass />} />
            <Route path="add-hours" element={<AddHours />} />
            <Route path="manage-department" element={<AddDepartment />} />
            <Route path="manage_staffs" element={<OurFaculty />} />
            <Route path="edit_student" element={<EditStudentForm/>} />
           
          </Route>

          {/* Attenence Module Route */}
          <Route path="/attenence/*">
            <Route path="create-day-order" element={<CreateDayOrder />} />
            <Route path="create-time-table" element={<CreateTimeTable />} />
            <Route path="assign-day-order" element={<AssignDayOrder />} />
            <Route path="student-attenence" element={<StudentAttenence />} />
            <Route path="view-attenence" element={<ViewAttendance/>} />
          </Route>

          {/* Cerificate Module Route */}
          <Route path="/cerificate/*">
            <Route
              path="upload-certificate"
              element={<StudentCertificates />}
            />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}
export default App;
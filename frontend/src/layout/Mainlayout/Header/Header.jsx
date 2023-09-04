import React from "react";
import { Link } from "react-router-dom";
import profileIcon from "../profile-7.webp";
const Header = () => {
  return (
    <div>
      <div id="nav" className="nav-container d-flex">
        <div className="nav-content d-flex">
          <div className="logo position-relative">
            <a href="Dashboards.Default.html">
              <div className="img" />
            </a>
          </div>
          <div className="language-switch-container">
            <button
              className="btn btn-empty language-button dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              EN
            </button>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">
                DE
              </a>
              <a href="#" className="dropdown-item active">
                EN
              </a>
              <a href="#" className="dropdown-item">
                ES
              </a>
            </div>
          </div>
          <div className="user-container d-flex">
            <a
              href="#"
              className="d-flex user position-relative"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img className="profile" alt="profile" src={profileIcon} />
              <div className="name">Aravinth</div>
            </a>
            <div className="dropdown-menu dropdown-menu-end user-menu wide">
              <div className="row mb-3 ms-0 me-0">
                <div className="col-12 ps-1 mb-2">
                  <div className="text-extra-small text-primary">ACCOUNT</div>
                </div>
                <div className="col-6 ps-1 pe-1">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">User Info</a>
                    </li>
                    <li>
                      <a href="#">Preferences</a>
                    </li>
                    <li>
                      <a href="#">Calendar</a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 pe-1 ps-1">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Security</a>
                    </li>
                    <li>
                      <a href="#">Billing</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row mb-1 ms-0 me-0">
                <div className="col-12 p-1 mb-2 pt-2">
                  <div className="text-extra-small text-primary">
                    APPLICATION
                  </div>
                </div>
                <div className="col-6 ps-1 pe-1">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Themes</a>
                    </li>
                    <li>
                      <a href="#">Language</a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 pe-1 ps-1">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Devices</a>
                    </li>
                    <li>
                      <a href="#">Storage</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row mb-1 ms-0 me-0">
                <div className="col-12 p-1 mb-3 pt-3">
                  <div className="separator-light" />
                </div>
                <div className="col-6 ps-1 pe-1">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">
                        <i
                          data-acorn-icon="help"
                          className="me-2"
                          data-acorn-size={17}
                        />
                        <span className="align-middle">Help</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i
                          data-acorn-icon="file-text"
                          className="me-2"
                          data-acorn-size={17}
                        />
                        <span className="align-middle">Docs</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 pe-1 ps-1">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">
                        <i
                          data-acorn-icon="gear"
                          className="me-2"
                          data-acorn-size={17}
                        />
                        <span className="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i
                          data-acorn-icon="logout"
                          className="me-2"
                          data-acorn-size={17}
                        />
                        <span className="align-middle">Logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ul className="list-unstyled list-inline text-center menu-icons">
            <li className="list-inline-item">
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#searchPagesModal"
              >
                <i data-acorn-icon="search" data-acorn-size={18} />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#" id="pinButton" className="pin-button">
                <i
                  data-acorn-icon="lock-on"
                  className="unpin"
                  data-acorn-size={18}
                />
                <i
                  data-acorn-icon="lock-off"
                  className="pin"
                  data-acorn-size={18}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#" id="colorButton">
                <i
                  data-acorn-icon="light-on"
                  className="light"
                  data-acorn-size={18}
                />
                <i
                  data-acorn-icon="light-off"
                  className="dark"
                  data-acorn-size={18}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="#"
                data-bs-toggle="dropdown"
                data-bs-target="#notifications"
                aria-haspopup="true"
                aria-expanded="false"
                className="notification-button"
              >
                <div className="position-relative d-inline-flex">
                  <i data-acorn-icon="bell" data-acorn-size={18} />
                  <span className="position-absolute notification-dot rounded-xl" />
                </div>
              </a>
              <div
                className="dropdown-menu dropdown-menu-end wide notification-dropdown scroll-out"
                id="notifications"
              >
                <div className="scroll">
                  <ul className="list-unstyled border-last-none">
                    <li className="mb-3 pb-3 border-bottom border-separator-light d-flex">
                      <img
                        src="img/profile/profile-1.webp"
                        className="me-3 sw-4 sh-4 rounded-xl align-self-center"
                        alt="..."
                      />
                      <div className="align-self-center">
                        <a href="#">Joisse Kaycee just sent a new comment!</a>
                      </div>
                    </li>
                    <li className="mb-3 pb-3 border-bottom border-separator-light d-flex">
                      <img
                        src="img/profile/profile-2.webp"
                        className="me-3 sw-4 sh-4 rounded-xl align-self-center"
                        alt="..."
                      />
                      <div className="align-self-center">
                        <a href="#">New order received! It is total $147,20.</a>
                      </div>
                    </li>
                    <li className="mb-3 pb-3 border-bottom border-separator-light d-flex">
                      <img
                        src="img/profile/profile-3.webp"
                        className="me-3 sw-4 sh-4 rounded-xl align-self-center"
                        alt="..."
                      />
                      <div className="align-self-center">
                        <a href="#">
                          3 items just added to wish list by a user!
                        </a>
                      </div>
                    </li>
                    <li className="pb-3 pb-3 border-bottom border-separator-light d-flex">
                      <img
                        src="./profile-7.webp"
                        className="me-3 sw-4 sh-4 rounded-xl align-self-center"
                        alt="..."
                      />
                      <div className="align-self-center">
                        <a href="#">Kirby Peters just sent a new message!</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          <div className="menu-container flex-grow-1">
            <ul id="menu" className="menu">
              <li>
                <a href="#dashboards" data-href="Dashboards.html">
                  <i
                    data-acorn-icon="home"
                    className="icon"
                    data-acorn-size={18}
                  />
                  <span className="label">Dashboards</span>
                </a>
                <ul id="dashboards">
                  <li>
                    <a href="/default-dashboard">
                      <span className="label">Default</span>
                    </a>
                  </li>
                  <li>
                    <a href="Dashboards.Visual.html">
                      <span className="label">Visual</span>
                    </a>
                  </li>
                  <li>
                    <a href="Dashboards.Analytic.html">
                      <span className="label">Analytic</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#dashboards" data-href="Dashboards.html">
                  <i
                    data-acorn-icon="menu"
                    className="icon"
                    data-acorn-size={16}
                  />
                  <span className="label">Basic Info</span>
                </a>
                <ul id="dashboards">
                  <li>
                    <Link to="/basic-information/student_registration">
                      <span className="label">Student Information</span>
                    </Link>
                    <li>
                      <Link to="/configuration/staff-information">
                        <span className="label">Staff Information</span>
                      </Link>
                    </li>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#apps" data-href="">
                  <i
                    data-acorn-icon="screen"
                    className="icon"
                    data-acorn-size={18}
                  />
                  <span className="label">Configuration</span>
                </a>
                <ul id="apps">
                  <li>
                    <Link to="/configuration/manage-academic">
                      <span className="label">Manage Academic</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/manage-userrole">
                      <span className="label">Manage User Role</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/manage-usertype">
                      <span className="label">Manage User Type</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/manage-batch">
                      <span className="label">Manage Batch</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/manage-year">
                      <span className="label">Manage Student Year</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/manage-students">
                      <span className="label">Manage students</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/manage_staffs">
                      <span className="label">Manage Staffs</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/department-group">
                      <span className="label">Department Group</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/manage-department">
                      <span className="label">Manage Department</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/manage-quota">
                      <span className="label">Manage Quota</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/manage-account">
                      <span className="label">Manage Accounts</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/add-subjects">
                      <span className="label">Add Subjects</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/configuration/add-class">
                      <span className="label">Add Class</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/configuration/add-hours">
                      <span className="label">Add Hours</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" data-href="">
                  <i
                    data-acorn-icon="grid-5"
                    className="icon"
                    data-acorn-size={18}
                  />
                  <span className="label">Attenence</span>
                </a>
                <ul id="blocks">
                  <li>
                    <Link to="/attenence/student-attenence">
                      <span className="label">Student Attenence</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/attenence/view-attenence">
                      <span className="label">View Attenence</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/attenence/create-day-order">
                      <span className="label">Create Day Order</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/attenence/create-time-table">
                      <span className="label">Create Time Table</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/attenence/assign-day-order">
                      <span className="label">Assign Day Order</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#pages" data-href="Pages.html">
                  <i
                    data-acorn-icon="notebook-1"
                    className="icon"
                    data-acorn-size={18}
                  />
                  <span className="label">Reports</span>
                </a>
                <ul id="pages">
                  <li>
                    <Link to="/cerificate/upload-certificate">
                      <span className="label">Upload Student Certificates</span>
                    </Link>
                  </li>
                  <li>
                    <a href="#blog" data-href="Pages.Blog.html">
                      <span className="label">Blog</span>
                    </a>
                    <ul id="blog">
                      <li>
                        <a href="Pages.Blog.Home.html">
                          <span className="label">Home</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Blog.Grid.html">
                          <span className="label">Grid</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Blog.List.html">
                          <span className="label">List</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Blog.Detail.html">
                          <span className="label">Detail</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#miscellaneous"
                      data-href="Pages.Miscellaneous.html"
                    >
                      <span className="label">Miscellaneous</span>
                    </a>
                    <ul id="miscellaneous">
                      <li>
                        <a href="Pages.Miscellaneous.Faq.html">
                          <span className="label">Faq</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Miscellaneous.KnowledgeBase.html">
                          <span className="label">Knowledge Base</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Miscellaneous.Error.html">
                          <span className="label">Error</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Miscellaneous.ComingSoon.html">
                          <span className="label">Coming Soon</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Miscellaneous.Pricing.html">
                          <span className="label">Pricing</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Miscellaneous.Search.html">
                          <span className="label">Search</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Miscellaneous.Mailing.html">
                          <span className="label">Mailing</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Miscellaneous.Empty.html">
                          <span className="label">Empty</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#portfolio" data-href="Pages.Portfolio.html">
                      <span className="label">Portfolio</span>
                    </a>
                    <ul id="portfolio">
                      <li>
                        <a href="Pages.Portfolio.Home.html">
                          <span className="label">Home</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Portfolio.Detail.html">
                          <span className="label">Detail</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#profile" data-href="Pages.Profile.html">
                      <span className="label">Profile</span>
                    </a>
                    <ul id="profile">
                      <li>
                        <a href="Pages.Profile.Standard.html">
                          <span className="label">Standard</span>
                        </a>
                      </li>
                      <li>
                        <a href="Pages.Profile.Settings.html">
                          <span className="label">Settings</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="mega">
                <a href="#interface" data-href="">
                  <i
                    data-acorn-icon="pocket-knife"
                    className="icon"
                    data-acorn-size={18}
                  />
                  <span className="label">Others</span>
                </a>
                <ul id="interface">
                  <li>
                    <ul id="interfaceComponents">
                      <li>
                        <a href="Interface.Components.Collapse.html">
                          <span className="label">Collapse</span>
                        </a>
                      </li>
                      <li>
                        <a href="Interface.Components.ListGroup.html">
                          <span className="label">List Group</span>
                        </a>
                      </li>
                      <li>
                        <a href="Interface.Components.Toasts.html">
                          <span className="label">Toasts</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mobile-buttons-container">
            <a
              href="#"
              id="scrollSpyButton"
              className="spy-button"
              data-bs-toggle="dropdown"
            >
              <i data-acorn-icon="menu-dropdown" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-end"
              id="scrollSpyDropdown"
            />
            <a href="#" id="mobileMenuButton" className="menu-button">
              <i data-acorn-icon="menu" />
            </a>
          </div>
        </div>
        <div className="nav-shadow" />
      </div>
    </div>
  );
};

export default Header;

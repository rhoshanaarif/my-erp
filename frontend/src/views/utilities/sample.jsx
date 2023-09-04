import React from "react";
import Header from "../../layout/Mainlayout/Header/Header";
import Footer from "../../layout/Mainlayout/Footer/Footer";

const sample = () => {
  return (
    <div>
      <div id="root">
        
        <main>
          <div className="container d-flex flex-column">
            <div className="page-title-container">
              <div className="row">
                <div className="col-auto mb-2 mb-md-0">
                  <div className="sw-md-30 sw-lg-40 w-100">
                    <h1 className="mb-0 pb-0 display-4" id="title">
                      Chat
                    </h1>
                    <nav
                      className="breadcrumb-container d-inline-block"
                      aria-label="breadcrumb"
                    >
                      <ul className="breadcrumb pt-0">
                        <li className="breadcrumb-item">
                          <a href="Dashboards.Default.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="Apps.html">Apps</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-12 col-md d-flex align-items-start justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-icon btn-icon-only btn-outline-primary ms-1 d-none"
                    id="backButton"
                  >
                    <i data-acorn-icon="arrow-left"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-icon btn-icon-start ms-1 w-100 w-md-auto"
                    disabled="disabled"
                  >
                    <i data-acorn-icon="plus"></i>
                    <span>Add Contact</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="row d-flex flex-grow-1 overflow-hidden pb-2 h-100">
              <div
                className="col-auto w-100 w-md-auto h-100 d-none"
                id="listView"
              >
                <div className="sw-md-30 sw-lg-40 w-100 d-flex flex-column h-100">
                  <div className="card h-100">
                    <div className="card-header border-0 pb-0">
                      <ul
                        className="nav nav-tabs nav-tabs-line card-header-tabs"
                        role="tablist"
                      >
                        <li
                          className="nav-item w-50 text-center"
                          role="presentation"
                        >
                          <a
                            className="nav-link active"
                            data-bs-toggle="tab"
                            href="#messages"
                            role="tab"
                            aria-selected="true"
                          >
                            Messages
                          </a>
                        </li>
                        <li
                          className="nav-item w-50 text-center"
                          role="presentation"
                        >
                          <a
                            className="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            href="#contacts"
                            role="tab"
                            aria-selected="false"
                          >
                            Contacts
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body h-100-card">
                      <div className="tab-content h-100" id="userProfileTabs">
                        <div
                          className="tab-pane fade active show h-100 scroll-out"
                          id="messages"
                          role="tabpanel"
                        >
                          <div
                            className="h-100 nav py-0"
                            id="messagesListContainer"
                          ></div>
                        </div>
                        <div
                          className="tab-pane fade h-100 scroll-out"
                          id="contacts"
                          role="tabpanel"
                        >
                          <div
                            className="h-100 nav py-0"
                            id="contactsListContainer"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col h-100 d-none" id="chatView">
                <div className="flex-column h-100 w-100 d-none" id="chatMode">
                  <div className="card h-100 mb-2">
                    <div className="card-body d-flex flex-column h-100 w-100 position-relative">
                      <div className="d-flex flex-row align-items-center mb-3">
                        <div
                          className="row g-0 sh-6 align-self-start"
                          id="contactTitle"
                        >
                          <div className="col-auto">
                            <div className="sh-6 sw-6 d-inline-block position-relative">
                              {/* <img src="img/profile/profile-11.webp" className="img-fluid rounded-xl border border-2 border-foreground profile" alt="thumb"> */}
                              <i className="p-1 border border-1 border-foreground bg-primary position-absolute rounded-xl e-0 t-0 status"></i>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-row pt-0 pb-0 pe-0 pe-0 ps-2 h-100 align-items-center justify-content-between">
                              <div className="d-flex flex-column">
                                <div className="name">Blaine Cottrell</div>
                                <div className="text-small text-muted last">
                                  Last seen today 01:24
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-icon btn-icon-only ms-1 ms-auto"
                          id="callButton"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Call"
                          data-delay='{"show":"250", "hide":"0"}'
                        >
                          <i data-acorn-icon="phone"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-icon btn-icon-only ms-1"
                          id="videoCallButton"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Video Call"
                          data-delay='{"show":"250", "hide":"0"}'
                        >
                          <i data-acorn-icon="video"></i>
                        </button>
                      </div>
                      <div className="separator-light mb-3"></div>
                      <div className="h-100 mb-n2 scroll-out">
                        <div
                          className="h-100 opacity-0"
                          id="chatContentContainer"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body p-0 d-flex flex-row align-items-center px-3 py-3">
                      <textarea
                        className="form-control me-3 border-0 ps-2 py-2"
                        placeholder="Message"
                        rows="1"
                        id="chatInput"
                      ></textarea>
                      <div className="d-flex flex-row">
                        <input
                          className="file-upload d-none"
                          type="file"
                          accept="image/*"
                          id="chatAttachmentInput"
                        />
                        <button
                          className="btn btn-icon btn-icon-only btn-outline-primary mb-1 rounded-xl"
                          id="chatAttachButton"
                          type="button"
                        >
                          <i data-acorn-icon="attachment"></i>
                        </button>
                        <button
                          className="btn btn-icon btn-icon-only btn-primary mb-1 rounded-xl ms-1"
                          id="chatSendButton"
                          type="button"
                        >
                          <i data-acorn-icon="chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card flex-column h-100 w-100 bg-gradient-single-2 d-none"
                  id="callMode"
                >
                  <div className="bg-vertical-ornament-3 w-100 h-100 d-flex flex-column justify-content-between align-items-center">
                    <div className="card-body d-flex align-items-center flex-column flex-grow-1 w-100">
                      <div className="sw-10 mb-2 position-relative">
                        {/* <img src="img/profile/profile-1.webp" className="img-fluid rounded-xl border border-2 border-foreground profile" alt="thumb"> */}
                      </div>
                      <div className="name text-white">Blaine Cottrell</div>
                      <div className="text-white text-small time">00:00:00</div>
                    </div>
                    <div className="card-body d-flex flex-grow-0">
                      <button className="btn btn-foreground btn-icon btn-icon-only me-2">
                        <i data-acorn-icon="camera"></i>
                      </button>
                      <button className="btn btn-foreground btn-icon btn-icon-only me-2">
                        <i data-acorn-icon="mic-off"></i>
                      </button>
                      <button
                        className="btn btn-foreground btn-icon"
                        id="endCallButton"
                      >
                        <i data-acorn-icon="phone-off"></i>
                        <span>End Call</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <template id="listItemTemplate">
            <a
              href="#"
              className="row w-100 d-flex flex-row g-0 sh-5 mb-2 nav-link p-0 contact-list-item"
            >
              <div className="col-auto">
                <div className="sw-5 d-inline-block position-relative">
                  {/* <img src="img/profile/profile-1.webp" className="img-fluid rounded-xl border border-2 border-foreground" alt="thumb" id="contactImage"> */}
                  <i
                    className="p-1 border border-1 border-foreground bg-primary position-absolute rounded-xl e-0 t-0"
                    id="contactStatus"
                  ></i>
                </div>
              </div>
              <div className="col">
                <div className="card-body d-flex flex-row pt-0 pb-0 ps-3 pe-0 h-100 align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <div className="mb-1" id="contactName"></div>
                    <div
                      className="text-small text-muted clamp-line"
                      data-line="1"
                      id="contactLastSeen"
                    ></div>
                  </div>
                  <div className="d-flex">
                    <div className="badge bg-primary d-none" id="contactUnread">
                      1
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </template>
          <template id="respondContainerTemplate">
            <div className="mb-2 card-content">
              <div className="row g-2">
                <div className="col-auto d-flex align-items-end">
                  <div className="sw-5 sh-5 mb-1 d-inline-block position-relative">
                    {/* <img src="img/profile/profile-1.webp" className="img-fluid rounded-xl chat-profile" alt="thumb"> */}
                  </div>
                </div>
                <div className="col d-flex align-items-end content-container"></div>
              </div>
            </div>
          </template>
          <template id="respondAttachmentContentTemplate">
            <div className="d-inline-block sh-11 me-2 position-relative pb-4 rounded-md bg-separator-light text-alternate">
              <a
                href="#"
                data-caption="cupcake.webp"
                className="lightbox h-100 attachment"
              >
                {/* <img src="img/product/small/product-4.webp" className="h-100 rounded-md-top"> */}
              </a>
              <span className="position-absolute text-extra-small text-alternate opacity-75 b-2 e-2 time">
                17:20
              </span>
            </div>
          </template>
          <template id="respondTextContentTemplate">
            <div className="bg-separator-light d-inline-block rounded-md py-3 px-3 pe-7 position-relative text-alternate">
              <span className="text">Hi, how is it going?</span>
              <span className="position-absolute text-extra-small text-alternate opacity-75 b-2 e-2 time">
                17:20
              </span>
            </div>
          </template>
          <template id="messageContainerTemplate">
            <div className="mb-2 card-content">
              <div className="row g-2">
                <div className="col-auto d-flex align-items-end order-1">
                  <div className="sw-5 sh-5 mb-1 d-inline-block position-relative">
                    {/* <img src="img/profile/profile-2.webp" className="img-fluid rounded-xl" alt="thumb"> */}
                  </div>
                </div>
                <div className="col d-flex justify-content-end align-items-end content-container"></div>
              </div>
            </div>
          </template>
          <template id="messageAttachmentContentTemplate">
            <div className="d-inline-block sh-11 ms-2 position-relative pb-4 bg-primary rounded-md">
              <a
                href="#"
                data-caption="cake.webp"
                className="lightbox h-100 attachment"
              >
                {/* <img src="img/product/small/product-4.webp" className="h-100 rounded-md-top"> */}
              </a>
              <span className="position-absolute text-extra-small text-white opacity-75 b-2 s-2 time">
                19:26
              </span>
            </div>
          </template>
          <template id="messageTextContentTemplate">
            <div className="bg-gradient-light d-inline-block rounded-md py-3 px-3 ps-7 text-white position-relative">
              <span className="text">Chocolate cake lollipop dessert.</span>
              <span className="position-absolute text-extra-small text-white opacity-75 b-2 s-2 time">
                19:20
              </span>
            </div>
          </template>
        </main>
       
      </div>
      <div
        className="modal fade modal-right scroll-out-negative"
        id="settings"
        data-bs-backdrop="true"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="settings"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable full"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Theme Settings</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="scroll-track-visible">
                <div className="mb-5" id="color">
                  <label className="mb-3 d-inline-block form-label">
                    Color
                  </label>
                  <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="light-blue"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="blue-light"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          LIGHT BLUE
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="dark-blue"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="blue-dark"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          DARK BLUE
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="light-teal"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="teal-light"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          LIGHT TEAL
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="dark-teal"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="teal-dark"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          DARK TEAL
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="light-sky"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="sky-light"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          LIGHT SKY
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="dark-sky"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="sky-dark"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          DARK SKY
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="light-red"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="red-light"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          LIGHT RED
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="dark-red"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="red-dark"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          DARK RED
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="light-green"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="green-light"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          LIGHT GREEN
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="dark-green"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="green-dark"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          DARK GREEN
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="light-lime"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="lime-light"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          LIGHT LIME
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="dark-lime"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="lime-dark"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          DARK LIME
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="light-pink"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="pink-light"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          LIGHT PINK
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="dark-pink"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="pink-dark"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          DARK PINK
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="row d-flex g-3 justify-content-between flex-wrap mb-3">
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="light-purple"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="purple-light"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          LIGHT PURPLE
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="dark-purple"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="purple-dark"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          DARK PURPLE
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="mb-5" id="navcolor">
                  <label className="mb-3 d-inline-block form-label">
                    Override Nav Palette
                  </label>
                  <div className="row d-flex g-3 justify-content-between flex-wrap">
                    <a
                      href="#"
                      className="flex-grow-1 w-33 option col"
                      data-value="default"
                      data-parent="navcolor"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow">
                        <div className="figure figure-primary top"></div>
                        <div className="figure figure-secondary bottom"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          DEFAULT
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-33 option col"
                      data-value="light"
                      data-parent="navcolor"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow">
                        <div className="figure figure-secondary figure-light top"></div>
                        <div className="figure figure-secondary bottom"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          LIGHT
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-33 option col"
                      data-value="dark"
                      data-parent="navcolor"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow">
                        <div className="figure figure-muted figure-dark top"></div>
                        <div className="figure figure-secondary bottom"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          DARK
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="mb-5" id="placement">
                  <label className="mb-3 d-inline-block form-label">
                    Menu Placement
                  </label>
                  <div className="row d-flex g-3 justify-content-between flex-wrap">
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="horizontal"
                      data-parent="placement"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow">
                        <div className="figure figure-primary top"></div>
                        <div className="figure figure-secondary bottom"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          HORIZONTAL
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="vertical"
                      data-parent="placement"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow">
                        <div className="figure figure-primary left"></div>
                        <div className="figure figure-secondary right"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          VERTICAL
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="mb-5" id="behaviour">
                  <label className="mb-3 d-inline-block form-label">
                    Menu Behaviour
                  </label>
                  <div className="row d-flex g-3 justify-content-between flex-wrap">
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="pinned"
                      data-parent="behaviour"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow">
                        <div className="figure figure-primary left large"></div>
                        <div className="figure figure-secondary right small"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          PINNED
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="unpinned"
                      data-parent="behaviour"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow">
                        <div className="figure figure-primary left"></div>
                        <div className="figure figure-secondary right"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          UNPINNED
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="mb-5" id="layout">
                  <label className="mb-3 d-inline-block form-label">
                    Layout
                  </label>
                  <div className="row d-flex g-3 justify-content-between flex-wrap">
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="fluid"
                      data-parent="layout"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow">
                        <div className="figure figure-primary top"></div>
                        <div className="figure figure-secondary bottom"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          FLUID
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-50 option col"
                      data-value="boxed"
                      data-parent="layout"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow">
                        <div className="figure figure-primary top"></div>
                        <div className="figure figure-secondary bottom small"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          BOXED
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="mb-5" id="radius">
                  <label className="mb-3 d-inline-block form-label">
                    Radius
                  </label>
                  <div className="row d-flex g-3 justify-content-between flex-wrap">
                    <a
                      href="#"
                      className="flex-grow-1 w-33 option col"
                      data-value="rounded"
                      data-parent="radius"
                    >
                      <div className="card rounded-md radius-rounded p-3 mb-1 no-shadow">
                        <div className="figure figure-primary top"></div>
                        <div className="figure figure-secondary bottom"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          ROUNDED
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-33 option col"
                      data-value="standard"
                      data-parent="radius"
                    >
                      <div className="card rounded-md radius-regular p-3 mb-1 no-shadow">
                        <div className="figure figure-primary top"></div>
                        <div className="figure figure-secondary bottom"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          STANDARD
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="flex-grow-1 w-33 option col"
                      data-value="flat"
                      data-parent="radius"
                    >
                      <div className="card rounded-md radius-flat p-3 mb-1 no-shadow">
                        <div className="figure figure-primary top"></div>
                        <div className="figure figure-secondary bottom"></div>
                      </div>
                      <div className="text-muted text-part">
                        <span className="text-extra-small align-middle">
                          FLAT
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade modal-right scroll-out-negative"
        id="niches"
        data-bs-backdrop="true"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="niches"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable full"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Niches</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="scroll-track-visible">
                <div className="mb-5">
                  <label className="mb-2 d-inline-block form-label">
                    Medical Assistant
                  </label>
                  <div className="hover-reveal-buttons position-relative hover-reveal cursor-default">
                    <div className="position-relative mb-3 mb-lg-5 rounded-sm">
                      <img src="https://acorn.coloredstrategies.com/img/page/medical-assistant.webp" className="img-fluid rounded-sm lower-opacity border border-separator-light" alt="card image"/>
                      <div className="position-absolute reveal-content rounded-sm absolute-center-vertical text-center w-100">
                        <a
                          target="_blank"
                          href="https://acorn-html-medical-assistant.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          Html
                        </a>
                        <a
                          target="_blank"
                          href="https://acorn-laravel-medical-assistant.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          Laravel
                        </a>
                        <a
                          target="_blank"
                          href="https://acorn-dotnet-medical-assistant.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          .Net5
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="mb-2 d-inline-block form-label">
                    Service Provider
                  </label>
                  <div className="hover-reveal-buttons position-relative hover-reveal cursor-default">
                    <div className="position-relative mb-3 mb-lg-5 rounded-sm">
                      <img src="https://acorn.coloredstrategies.com/img/page/service-provider.webp" className="img-fluid rounded-sm lower-opacity border border-separator-light" alt="card image"/>
                      <div className="position-absolute reveal-content rounded-sm absolute-center-vertical text-center w-100">
                        <a
                          target="_blank"
                          href="https://acorn-html-service-provider.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          Html
                        </a>
                        <a
                          target="_blank"
                          href="https://acorn-laravel-service-provider.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          Laravel
                        </a>
                        <a
                          target="_blank"
                          href="https://acorn-dotnet-service-provider.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          .Net5
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="mb-2 d-inline-block form-label">
                    Elearning Portal
                  </label>
                  <div className="hover-reveal-buttons position-relative hover-reveal cursor-default">
                    <div className="position-relative mb-3 mb-lg-5 rounded-sm">
                      <img src="https://acorn.coloredstrategies.com/img/page/elearning-portal.webp" className="img-fluid rounded-sm lower-opacity border border-separator-light" alt="card image"/>
                      <div className="position-absolute reveal-content rounded-sm absolute-center-vertical text-center w-100">
                        <a
                          target="_blank"
                          href="https://acorn-html-elearning-portal.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          Html
                        </a>
                        <a
                          target="_blank"
                          href="https://acorn-laravel-elearning-portal.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          Laravel
                        </a>
                        <a
                          target="_blank"
                          href="https://acorn-dotnet-elearning-portal.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          .Net5
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="mb-2 d-inline-block form-label">
                    Ecommerce Platform
                  </label>
                  <div className="hover-reveal-buttons position-relative hover-reveal cursor-default">
                    <div className="position-relative mb-3 mb-lg-5 rounded-sm">
                      <img src="https://acorn.coloredstrategies.com/img/page/ecommerce-platform.webp" className="img-fluid rounded-sm lower-opacity border border-separator-light" alt="card image"/>
                      <div className="position-absolute reveal-content rounded-sm absolute-center-vertical text-center w-100">
                        <a
                          target="_blank"
                          href="https://acorn-html-ecommerce-platform.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          Html
                        </a>
                        <a
                          target="_blank"
                          href="https://acorn-laravel-ecommerce-platform.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          Laravel
                        </a>
                        <a
                          target="_blank"
                          href="https://acorn-dotnet-ecommerce-platform.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          .Net5
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="mb-2 d-inline-block form-label">
                    Starter Project
                  </label>
                  <div className="hover-reveal-buttons position-relative hover-reveal cursor-default">
                    <div className="position-relative mb-3 mb-lg-5 rounded-sm">
                      <img src="https://acorn.coloredstrategies.com/img/page/starter-project.webp" className="img-fluid rounded-sm lower-opacity border border-separator-light" alt="card image"/>
                      <div className="position-absolute reveal-content rounded-sm absolute-center-vertical text-center w-100">
                        <a
                          target="_blank"
                          href="https://acorn-html-starter-project.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          Html
                        </a>
                        <a
                          target="_blank"
                          href="https://acorn-laravel-starter-project.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          Laravel
                        </a>
                        <a
                          target="_blank"
                          href="https://acorn-dotnet-starter-project.coloredstrategies.com/"
                          className="btn btn-primary btn-sm sw-10 sw-lg-12 d-block mx-auto my-1"
                        >
                          .Net5
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-buttons-container">
        <button
          type="button"
          className="btn settings-button btn-primary p-0"
          data-bs-toggle="modal"
          data-bs-target="#settings"
          id="settingsButton"
        >
          <span
            className="d-inline-block no-delay"
            data-bs-delay="0"
            data-bs-offset="0,3"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Settings"
          >
            <i data-acorn-icon="paint-roller" className="position-relative"></i>
          </span>
        </button>
        <button
          type="button"
          className="btn settings-button btn-primary p-0"
          data-bs-toggle="modal"
          data-bs-target="#niches"
          id="nichesButton"
        >
          <span
            className="d-inline-block no-delay"
            data-bs-delay="0"
            data-bs-offset="0,3"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Niches"
          >
            <i data-acorn-icon="toy" className="position-relative"></i>
          </span>
        </button>
      </div>
      <div
        className="modal fade modal-under-nav modal-search modal-close-out"
        id="searchPagesModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0 p-0">
              <button
                type="button"
                className="btn-close btn btn-icon btn-icon-only btn-foreground"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ps-5 pe-5 pb-0 border-0">
              <input
                id="searchPagesInput"
                className="form-control form-control-xl borderless ps-0 pe-0 mb-1 auto-complete"
                type="text"
                autocomplete="off"
              />
            </div>
            <div className="modal-footer border-top justify-content-start ps-5 pe-5 pb-3 pt-3 border-0">
              <span className="text-alternate d-inline-block m-0 me-3">
                <i
                  data-acorn-icon="arrow-bottom"
                  data-acorn-size="15"
                  className="text-alternate align-middle me-1"
                ></i>
                <span className="align-middle text-medium">Navigate</span>
              </span>
              <span className="text-alternate d-inline-block m-0 me-3">
                <i
                  data-acorn-icon="arrow-bottom-left"
                  data-acorn-size="15"
                  className="text-alternate align-middle me-1"
                ></i>
                <span className="align-middle text-medium">Select</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sample;

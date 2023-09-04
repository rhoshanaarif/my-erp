import React, { Component } from 'react'
import Settings from '../../views/settings-theme-js/settings';

class Customization extends Component {
    componentDidMount() {
        // Initialize the Settings class here
        const settings = new Settings();
      }
      render(){
  return (
    <div id="root">
      <div
        className="modal fade modal-right scroll-out-negative"
        id="settings"
        data-bs-backdrop="true"
        tabIndex={-1}
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
              />
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
                      className="flex-grow-1 w-50 option  col"
                    
                      data-value="light-blue"
                      data-parent="color"
                    >
                      <div className="card rounded-md p-3 mb-1 no-shadow color">
                        <div className="blue-light" />
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
                        <div className="blue-dark" />
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
                        <div className="teal-light" />
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
                        <div className="teal-dark" />
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
                        <div className="sky-light" />
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
                        <div className="sky-dark" />
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
                        <div className="red-light" />
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
                        <div className="red-dark" />
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
                        <div className="green-light" />
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
                        <div className="green-dark" />
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
                        <div className="lime-light" />
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
                        <div className="lime-dark" />
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
                        <div className="pink-light" />
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
                        <div className="pink-dark" />
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
                        <div className="purple-light" />
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
                        <div className="purple-dark" />
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
                        <div className="figure figure-primary top" />
                        <div className="figure figure-secondary bottom" />
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
                        <div className="figure figure-secondary figure-light top" />
                        <div className="figure figure-secondary bottom" />
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
                        <div className="figure figure-muted figure-dark top" />
                        <div className="figure figure-secondary bottom" />
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
                        <div className="figure figure-primary top" />
                        <div className="figure figure-secondary bottom" />
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
                        <div className="figure figure-primary left" />
                        <div className="figure figure-secondary right" />
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
                        <div className="figure figure-primary left large" />
                        <div className="figure figure-secondary right small" />
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
                        <div className="figure figure-primary left" />
                        <div className="figure figure-secondary right" />
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
                        <div className="figure figure-primary top" />
                        <div className="figure figure-secondary bottom" />
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
                        <div className="figure figure-primary top" />
                        <div className="figure figure-secondary bottom small" />
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
                        <div className="figure figure-primary top" />
                        <div className="figure figure-secondary bottom" />
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
                        <div className="figure figure-primary top" />
                        <div className="figure figure-secondary bottom" />
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
                        <div className="figure figure-primary top" />
                        <div className="figure figure-secondary bottom" />
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
            data-bs-delay={0}
            data-bs-offset="0,3"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Settings"
          >
            <i data-acorn-icon="paint-roller" className="position-relative" />
          </span>
        </button>
      </div>
      <div
        className="modal fade modal-under-nav modal-search modal-close-out"
        id="searchPagesModal"
        tabIndex={-1}
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
              />
            </div>
            <div className="modal-body ps-5 pe-5 pb-0 border-0">
              <input
                id="searchPagesInput"
                className="form-control form-control-xl borderless ps-0 pe-0 mb-1 auto-complete"
                type="text"
                autoComplete="off"
              />
            </div>
            <div className="modal-footer border-top justify-content-start ps-5 pe-5 pb-3 pt-3 border-0">
              <span className="text-alternate d-inline-block m-0 me-3">
                <i
                  data-acorn-icon="arrow-bottom"
                  data-acorn-size={15}
                  className="text-alternate align-middle me-1"
                />
                <span className="align-middle text-medium">Navigate</span>
              </span>
              <span className="text-alternate d-inline-block m-0 me-3">
                <i
                  data-acorn-icon="arrow-bottom-left"
                  data-acorn-size={15}
                  className="text-alternate align-middle me-1"
                />
                <span className="align-middle text-medium">Select</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
};

export default Customization;

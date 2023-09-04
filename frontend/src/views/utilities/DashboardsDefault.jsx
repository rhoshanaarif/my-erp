import React, { Component } from "react";
import Header from "../../layout/Mainlayout/Header/Header";
import Footer from "../../layout/Mainlayout/Footer/Footer";
import Settings from "../settings-theme-js/settings";

class DashboardsDefault extends Component {
  componentDidMount() {
    // Initialize the Settings class here
    const settings = new Settings();
  }
  render() {
    return (
      <div>
        <div id="root">
          <main>
            <div className="container">
              <div className="page-title-container">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <h1 className="mb-0 pb-0 display-4" id="title">
                      Default Dashboard
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
                          <a href="Dashboards.html">Dashboards</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="col-12 col-sm-6 d-flex align-items-start justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-icon btn-icon-end w-100 w-sm-auto"
                      id="dashboardTourButton"
                    >
                      <span>Take a Tour</span>
                      <i data-acorn-icon="flag" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-xl-6">
                  <div
                    className="mb-5"
                    data-title="Fancy Charts"
                    data-intro="Some charts over here!"
                    data-step={1}
                  >
                    <h2 className="small-title">Sales &amp; Stocks</h2>
                    <div className="card mb-2 h-auto sh-xl-24">
                      <div className="card-body">
                        <div className="row g-0 h-100 chart-container">
                          <div className="col-12 col-sm-auto d-flex flex-column justify-content-between custom-tooltip pe-0 pe-sm-4">
                            <p className="heading title mb-1" />
                            <div>
                              <div>
                                <div className="cta-2 text-primary value d-inline-block align-middle sw-4" />
                                <i
                                  className="icon d-inline-block align-middle text-primary"
                                  data-acorn-size={15}
                                />
                              </div>
                              <div className="text-small text-muted mb-1 text" />
                            </div>
                            <div className="row">
                              <div className="col-auto">
                                <div className="cta-3 text-alternate">84</div>
                                <div className="text-small text-muted mb-1">
                                  THIS WEEK
                                </div>
                              </div>
                              <div className="col">
                                <div className="cta-3 text-alternate">792</div>
                                <div className="text-small text-muted mb-1">
                                  THIS MONTH
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm sh-17">
                            <canvas id="largeLineChart1" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card h-auto sh-xl-24">
                      <div className="card-body">
                        <div className="row g-0 h-100 chart-container">
                          <div className="col-12 col-sm-auto d-flex flex-column justify-content-between custom-tooltip pe-0 pe-sm-4">
                            <p className="heading title" />
                            <div>
                              <div>
                                <div className="cta-2 text-primary value d-inline-block align-middle sw-4" />
                                <i
                                  className="icon d-inline-block align-middle text-primary"
                                  data-acorn-size={15}
                                />
                              </div>
                              <div className="text-small text-muted mb-1 text" />
                            </div>
                            <div className="row">
                              <div className="col-auto">
                                <div className="cta-3 text-alternate">84</div>
                                <div className="text-small text-muted mb-1">
                                  THIS WEEK
                                </div>
                              </div>
                              <div className="col">
                                <div className="cta-3 text-alternate">792</div>
                                <div className="text-small text-muted mb-1">
                                  THIS MONTH
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm sh-17">
                            <canvas id="largeLineChart2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="small-title">Stats</h2>
                  <div className="row gx-2">
                    <div className="col-12 p-0">
                      <div className="glide glide-small" id="statsCarousel">
                        <div className="glide__track" data-glide-el="track">
                          <div className="glide__slides">
                            <div className="glide__slide">
                              <div className="card mb-5 sh-20 hover-border-primary">
                                <div className="h-100 p-4 text-center align-items-center d-flex flex-column justify-content-between">
                                  <div className="d-flex flex-column justify-content-center align-items-center sh-5 sw-5 rounded-xl bg-gradient-light mb-2">
                                    <i
                                      data-acorn-icon="alarm"
                                      className="text-white"
                                    />
                                  </div>
                                  <p className="mb-0 lh-1">Pending Orders</p>
                                  <p className="cta-3 mb-0 text-primary">25</p>
                                </div>
                              </div>
                            </div>
                            <div className="glide__slide">
                              <div className="card mb-5 sh-20 hover-border-primary">
                                <div className="h-100 p-4 text-center align-items-center d-flex flex-column justify-content-between">
                                  <div className="d-flex flex-column justify-content-center align-items-center sh-5 sw-5 rounded-xl bg-gradient-light mb-2">
                                    <i
                                      data-acorn-icon="navigate-diagonal"
                                      className="text-white"
                                    />
                                  </div>
                                  <p className="mb-0 lh-1">Shipped Orders</p>
                                  <p className="cta-3 mb-0 text-primary">48</p>
                                </div>
                              </div>
                            </div>
                            <div className="glide__slide">
                              <div className="card mb-5 sh-20 hover-border-primary">
                                <div className="h-100 p-4 text-center align-items-center d-flex flex-column justify-content-between">
                                  <div className="d-flex flex-column justify-content-center align-items-center sh-5 sw-5 rounded-xl bg-gradient-light mb-2">
                                    <i
                                      data-acorn-icon="check-circle"
                                      className="text-white"
                                    />
                                  </div>
                                  <p className="mb-0 lh-1">Delivered Orders</p>
                                  <p className="cta-3 mb-0 text-primary">53</p>
                                </div>
                              </div>
                            </div>
                            <div className="glide__slide">
                              <div className="card mb-5 sh-20 hover-border-primary">
                                <div className="h-100 p-4 text-center align-items-center d-flex flex-column justify-content-between">
                                  <div className="d-flex flex-column justify-content-center align-items-center sh-5 sw-5 rounded-xl bg-gradient-light mb-2">
                                    <i
                                      data-acorn-icon="arrow-bottom-left"
                                      className="text-white"
                                    />
                                  </div>
                                  <p className="mb-0 lh-1">Returned Orders</p>
                                  <p className="cta-3 mb-0 text-primary">4</p>
                                </div>
                              </div>
                            </div>
                            <div className="glide__slide">
                              <div className="card mb-5 sh-20 hover-border-primary">
                                <div className="h-100 p-4 text-center align-items-center d-flex flex-column justify-content-between">
                                  <div className="d-flex flex-column justify-content-center align-items-center sh-5 sw-5 rounded-xl bg-gradient-light mb-2">
                                    <i
                                      data-acorn-icon="warning-hexagon"
                                      className="text-white"
                                    />
                                  </div>
                                  <p className="mb-0 lh-1">
                                    Unconfirmed Orders
                                  </p>
                                  <p className="cta-3 mb-0 text-primary">3</p>
                                </div>
                              </div>
                            </div>
                            <div className="glide__slide">
                              <div className="card mb-5 sh-20 hover-border-primary">
                                <div className="h-100 p-4 text-center align-items-center d-flex flex-column justify-content-between">
                                  <div className="d-flex flex-column justify-content-center align-items-center sh-5 sw-5 rounded-xl bg-gradient-light mb-2">
                                    <i
                                      data-acorn-icon="pin"
                                      className="text-white"
                                    />
                                  </div>
                                  <p className="mb-0 lh-1">Missing Orders</p>
                                  <p className="cta-3 mb-0 text-primary">2</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6 mb-5">
                  <div className="d-flex justify-content-between">
                    <h2 className="small-title">Products</h2>
                    <button
                      className="btn btn-icon btn-icon-only btn-sm btn-background-alternate mt-n2 shadow"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <i
                        data-acorn-icon="more-horizontal"
                        data-acorn-size={15}
                      />
                    </button>
                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end shadow">
                      <a className="dropdown-item" href="#">
                        Reload
                      </a>
                      <a className="dropdown-item" href="#">
                        Stats
                      </a>
                      <a className="dropdown-item" href="#">
                        Details
                      </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                  <div className="scroll-out">
                    <div className="scroll-by-count" data-count={6}>
                      <div
                        className="card mb-2"
                        data-title="Product Card"
                        data-intro="Here is a product card with buttons!"
                        data-step={2}
                      >
                        <div className="row g-0 sh-12">
                          <div className="col-auto">
                            <a href="Pages.Portfolio.Detail.html">
                              <img
                                src="img/product/small/product-1.webp"
                                alt="alternate text"
                                className="card-img card-img-horizontal sw-13 sw-lg-15"
                              />
                            </a>
                          </div>
                          <div className="col">
                            <div className="card-body pt-0 pb-0 h-100">
                              <div className="row g-0 h-100 align-content-center">
                                <div className="col-12 col-md-7 d-flex flex-column mb-2 mb-md-0 position-static">
                                  <a href="Pages.Portfolio.Detail.html">
                                    Kommissbrot
                                  </a>
                                  <div className="text-small text-muted text-truncate">
                                    Icing liquorice olegário jujubes oat cake.
                                  </div>
                                </div>
                                <div className="col-12 col-md-5 d-flex align-items-center justify-content-md-end">
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="edit-square"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Edit
                                    </span>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="bin"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Delete
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card mb-2">
                        <div className="row g-0 sh-12">
                          <div className="col-auto position-relative">
                            <span className="badge rounded-pill bg-primary me-1 position-absolute e-n3 t-2">
                              TREND
                            </span>
                            <a href="Pages.Portfolio.Detail.html">
                              <img
                                src="img/product/small/product-2.webp"
                                alt="alternate text"
                                className="card-img card-img-horizontal sw-13 sw-lg-15"
                              />
                            </a>
                          </div>
                          <div className="col">
                            <div className="card-body pt-0 pb-0 h-100">
                              <div className="row g-0 h-100 align-content-center">
                                <div className="col-12 col-md-7 d-flex flex-column mb-2 mb-md-0">
                                  <a href="Pages.Portfolio.Detail.html">
                                    Yeast Karavai
                                  </a>
                                  <div className="text-small text-muted text-truncate">
                                    Gummi liquorice olegário jujubes cookie.
                                  </div>
                                </div>
                                <div className="col-12 col-md-5 d-flex align-items-center justify-content-md-end">
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="edit-square"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Edit
                                    </span>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="bin"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Delete
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card mb-2">
                        <div className="row g-0 sh-12">
                          <div className="col-auto">
                            <a href="Pages.Portfolio.Detail.html">
                              <img
                                src="img/product/small/product-3.webp"
                                alt="alternate text"
                                className="card-img card-img-horizontal sw-13 sw-lg-15"
                              />
                            </a>
                          </div>
                          <div className="col">
                            <div className="card-body pt-0 pb-0 h-100">
                              <div className="row g-0 h-100 align-content-center">
                                <div className="col-12 col-md-7 d-flex flex-column mb-2 mb-md-0">
                                  <a href="Pages.Portfolio.Detail.html">
                                    Cholermüs
                                  </a>
                                  <div className="text-small text-muted text-truncate">
                                    Marshmallow topping icing liquorice oat
                                    cake.
                                  </div>
                                </div>
                                <div className="col-12 col-md-5 d-flex align-items-center justify-content-md-end">
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="edit-square"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Edit
                                    </span>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="bin"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Delete
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card mb-2">
                        <div className="row g-0 sh-12">
                          <div className="col-auto">
                            <a href="Pages.Portfolio.Detail.html">
                              <img
                                src="img/product/small/product-4.webp"
                                alt="alternate text"
                                className="card-img card-img-horizontal sw-13 sw-lg-15"
                              />
                            </a>
                          </div>
                          <div className="col">
                            <div className="card-body pt-0 pb-0 h-100">
                              <div className="row g-0 h-100 align-content-center">
                                <div className="col-12 col-md-7 d-flex flex-column mb-2 mb-md-0">
                                  <a href="Pages.Portfolio.Detail.html">
                                    Cheesymite Scroll
                                  </a>
                                  <div className="text-small text-muted text-truncate">
                                    Tootsie brownie ice cream marshmallow
                                    topping.
                                  </div>
                                </div>
                                <div className="col-12 col-md-5 d-flex align-items-center justify-content-md-end">
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="edit-square"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Edit
                                    </span>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="bin"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Delete
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card mb-2">
                        <div className="row g-0 sh-12">
                          <div className="col-auto">
                            <a href="Pages.Portfolio.Detail.html">
                              <img
                                src="img/product/small/product-5.webp"
                                alt="alternate text"
                                className="card-img card-img-horizontal sw-13 sw-lg-15"
                              />
                            </a>
                          </div>
                          <div className="col">
                            <div className="card-body pt-0 pb-0 h-100">
                              <div className="row g-0 h-100 align-content-center">
                                <div className="col-12 col-md-7 d-flex flex-column mb-2 mb-md-0">
                                  <a href="Pages.Portfolio.Detail.html">
                                    Bazlama
                                  </a>
                                  <div className="text-small text-muted text-truncate">
                                    Tootsie roll cream marshmallow chocolate
                                    bar.
                                  </div>
                                </div>
                                <div className="col-12 col-md-5 d-flex align-items-center justify-content-md-end">
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="edit-square"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Edit
                                    </span>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="bin"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Delete
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card mb-2">
                        <div className="row g-0 sh-12">
                          <div className="col-auto">
                            <a href="Pages.Portfolio.Detail.html">
                              <img
                                src="img/product/small/product-6.webp"
                                alt="alternate text"
                                className="card-img card-img-horizontal sw-13 sw-lg-15"
                              />
                            </a>
                          </div>
                          <div className="col">
                            <div className="card-body pt-0 pb-0 h-100">
                              <div className="row g-0 h-100 align-content-center">
                                <div className="col-12 col-md-7 d-flex flex-column mb-2 mb-md-0">
                                  <a href="Pages.Portfolio.Detail.html">
                                    Soda Bread
                                  </a>
                                  <div className="text-small text-muted text-truncate">
                                    Marshmallow topping icing liquorice oat
                                    cake.
                                  </div>
                                </div>
                                <div className="col-12 col-md-5 d-flex align-items-center justify-content-md-end">
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="edit-square"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Edit
                                    </span>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="bin"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Delete
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card mb-2">
                        <div className="row g-0 sh-12">
                          <div className="col-auto">
                            <a href="Pages.Portfolio.Detail.html">
                              <img
                                src="img/product/small/product-7.webp"
                                alt="alternate text"
                                className="card-img card-img-horizontal sw-13 sw-lg-15"
                              />
                            </a>
                          </div>
                          <div className="col">
                            <div className="card-body pt-0 pb-0 h-100">
                              <div className="row g-0 h-100 align-content-center">
                                <div className="col-12 col-md-7 d-flex flex-column mb-2 mb-md-0">
                                  <a href="Pages.Portfolio.Detail.html">
                                    Chapati
                                  </a>
                                  <div className="text-small text-muted text-truncate">
                                    Tootsie brownie ice cream marshmallow
                                    topping.
                                  </div>
                                </div>
                                <div className="col-12 col-md-5 d-flex align-items-center justify-content-md-end">
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="edit-square"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Edit
                                    </span>
                                  </button>
                                  <button
                                    className="btn btn-sm btn-icon btn-icon-start btn-outline-primary ms-1"
                                    type="button"
                                  >
                                    <i
                                      data-acorn-icon="bin"
                                      data-acorn-size={15}
                                    />
                                    <span className="d-none d-xxl-inline-block">
                                      Delete
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mb-5">
                  <h2 className="small-title">Logs</h2>
                  <div className="card sh-40 h-lg-100-card">
                    <div className="card-body mb-n2 scroll-out h-100">
                      <div className="scroll h-100">
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="circle"
                                  className="text-primary align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  New user registiration
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                18 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="circle"
                                  className="text-primary align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  3 new product added
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                18 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="square"
                                  className="text-secondary align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  Product out of stock:
                                  <a
                                    href="#"
                                    className="alternate-link underline-link"
                                  >
                                    Breadstick
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                16 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="square"
                                  className="text-secondary align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  Category page returned an error
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                15 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="circle"
                                  className="text-primary align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  14 products added
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                15 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="hexagon"
                                  className="text-tertiary align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  New sale:
                                  <a
                                    href="#"
                                    className="alternate-link underline-link"
                                  >
                                    Steirer Brot
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                15 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="hexagon"
                                  className="text-tertiary align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  New sale:
                                  <a
                                    href="#"
                                    className="alternate-link underline-link"
                                  >
                                    Soda Bread
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                15 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="triangle"
                                  className="text-warning align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  Recived a support ticket
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                14 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="hexagon"
                                  className="text-tertiary align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  New sale:
                                  <a
                                    href="#"
                                    className="alternate-link underline-link"
                                  >
                                    Cholermüs
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                13 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="hexagon"
                                  className="text-tertiary align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  New sale:
                                  <a
                                    href="#"
                                    className="alternate-link underline-link"
                                  >
                                    Bazlama
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                13 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="triangle"
                                  className="text-warning align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  Recived a comment
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                13 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="triangle"
                                  className="text-warning align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  Recived an email
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                13 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="hexagon"
                                  className="text-tertiary align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  New sale:
                                  <a
                                    href="#"
                                    className="alternate-link underline-link"
                                  >
                                    Bazlama
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                12 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row g-0 mb-2">
                          <div className="col-auto">
                            <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                              <div className="sh-3">
                                <i
                                  data-acorn-icon="triangle"
                                  className="text-warning align-top"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="card-body d-flex flex-column pt-0 pb-0 ps-3 pe-4 h-100 justify-content-center">
                              <div className="d-flex flex-column">
                                <div className="text-alternate mt-n1 lh-1-25">
                                  Recived a comment
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                              <div className="text-muted ms-2 mt-n1 lh-1-25">
                                12 Dec
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-5">
                  <div className="d-flex justify-content-between">
                    <h2 className="small-title">Categories</h2>
                    <button
                      className="btn btn-icon btn-icon-end btn-xs btn-background-alternate p-0 text-small"
                      type="button"
                    >
                      <span className="align-bottom">View All</span>
                      <i
                        data-acorn-icon="chevron-right"
                        className="align-middle"
                        data-acorn-size={12}
                      />
                    </button>
                  </div>
                  <div className="row g-2">
                    <div
                      className="col-6 col-xl-4 sh-19"
                      data-title="More Cards"
                      data-intro="Category card with an icon!"
                      data-step={3}
                    >
                      <div className="card h-100 hover-scale-up">
                        <a className="card-body text-center" href="#">
                          <i
                            data-acorn-icon="cupcake"
                            className="text-primary"
                          />
                          <p className="heading mt-3 text-body">Cupcakes</p>
                          <div className="text-extra-small fw-medium text-muted">
                            14 PRODUCTS
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-6 col-xl-4 sh-19">
                      <div className="card h-100 hover-scale-up">
                        <a className="card-body text-center" href="#">
                          <i data-acorn-icon="loaf" className="text-primary" />
                          <p className="heading mt-3 text-body">Breads</p>
                          <div className="text-extra-small fw-medium text-muted">
                            3 PRODUCTS
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-6 col-xl-4 sh-19">
                      <div className="card h-100 hover-scale-up">
                        <a className="card-body text-center" href="#">
                          <i
                            data-acorn-icon="radish"
                            className="text-primary"
                          />
                          <p className="heading mt-3 text-body">Vegetables</p>
                          <div className="text-extra-small fw-medium text-muted">
                            8 PRODUCTS
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-6 col-xl-4 sh-19">
                      <div className="card h-100 hover-scale-up">
                        <a className="card-body text-center" href="#">
                          <i data-acorn-icon="pear" className="text-primary" />
                          <p className="heading mt-3 text-body">Fruits</p>
                          <div className="text-extra-small fw-medium text-muted">
                            9 PRODUCTS
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-6 col-xl-4 sh-19">
                      <div className="card h-100 hover-scale-up">
                        <a className="card-body text-center" href="#">
                          <i data-acorn-icon="loaf" className="text-primary" />
                          <p className="heading mt-3 text-body">Mushrooms</p>
                          <div className="text-extra-small fw-medium text-muted">
                            3 PRODUCTS
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-6 col-xl-4 sh-19">
                      <div className="card h-100 hover-scale-up">
                        <a className="card-body text-center" href="#">
                          <i data-acorn-icon="water" className="text-primary" />
                          <p className="heading mt-3 text-body">Drinks</p>
                          <div className="text-extra-small fw-medium text-muted">
                            4 PRODUCTS
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="small-title">Extend Your Knowledge</h2>
              <div className="row">
                <div className="col-12 col-md-4 mb-5">
                  <div className="card w-100 sh-18 sh-md-22 hover-img-scale-up">
                    <img
                      src="img/banner/cta-standard-1.webp"
                      className="card-img h-100 scale"
                      alt="card image"
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
                      <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                        <div className="cta-3 text-black">
                          Introduction
                          <br />
                          to Bread Making
                        </div>
                        <a
                          href="Pages.Blog.List.html"
                          className="btn btn-icon btn-icon-start btn-primary stretched-link"
                        >
                          <i data-acorn-icon="chevron-right" />
                          <span>View</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-5">
                  <div className="card w-100 sh-18 sh-md-22 hover-img-scale-up">
                    <img
                      src="img/banner/cta-standard-2.webp"
                      className="card-img h-100 scale"
                      alt="card image"
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
                      <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                        <div className="cta-3 text-black">
                          Basic Principles
                          <br />
                          of Cooking
                        </div>
                        <a
                          href="Pages.Blog.List.html"
                          className="btn btn-icon btn-icon-start btn-primary stretched-link"
                        >
                          <i data-acorn-icon="chevron-right" />
                          <span>View</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-5">
                  <div className="card w-100 sh-18 sh-md-22 hover-img-scale-up">
                    <img
                      src="img/banner/cta-standard-3.webp"
                      className="card-img h-100 scale"
                      alt="card image"
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-between bg-transparent">
                      <div className="d-flex flex-column h-100 justify-content-between align-items-start">
                        <div className="cta-3 text-black">
                          Easy &amp; Practical
                          <br />
                          Recipes
                        </div>
                        <a
                          href="Pages.Blog.List.html"
                          className="btn btn-icon btn-icon-start btn-primary stretched-link"
                        >
                          <i data-acorn-icon="chevron-right" />
                          <span>View</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gy-5">
                <div className="col-12 col-xl-4">
                  <h2 className="small-title">Help</h2>
                  <div className="card h-100-card">
                    <div className="card-body">
                      <div className="cta-3">Do you need help?</div>
                      <div className="mb-3 cta-3 text-primary">
                        Search for documentation!
                      </div>
                      <div className="text-muted mb-4">
                        Cheesecake chocolate carrot cake pie drops. Brownie ice
                        cream marshmallow topping.
                      </div>
                      <form>
                        <div className="mb-3 filled w-100">
                          <i data-acorn-icon="form" />
                          <select
                            className="select-single-no-search-filled select2-hidden-accessible"
                            id="categorySelect"
                            data-placeholder="Category"
                          >
                            <option label=" " />
                            <option value="Breads">Breads</option>
                            <option value="Pies">Pies</option>
                            <option value="Desserts">Desserts</option>
                          </select>
                        </div>
                        <div className="mb-3 filled">
                          <i data-acorn-icon="help" />
                          <input
                            className="form-control"
                            placeholder="Search"
                          />
                        </div>
                        <a
                          href="#"
                          className="btn btn-icon btn-icon-start btn-primary mt-3"
                        >
                          <i data-acorn-icon="chevron-right" />
                          <span>Search</span>
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-8">
                  <h2 className="small-title">Video Guide</h2>
                  <div className="card h-100-card sh-md-45 bg-transparent">
                    <video
                      className="player cover"
                      poster="img/product/large/product-2.webp"
                      id="videoGuide"
                    >
                      <source
                        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default DashboardsDefault;

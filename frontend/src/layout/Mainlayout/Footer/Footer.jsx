import React from "react";

const Footer = () => {
  return (
    <div id="root">
      <footer>
        <div className="footer-content">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-6">
                <p className="mb-0 text-muted text-medium">
                  Colored Strategies 2021
                </p>
              </div>
              <div className="col-sm-6 d-none d-sm-block">
                <ul className="breadcrumb pt-0 pe-0 mb-0 float-end">
                  <li className="breadcrumb-item mb-0 text-medium">
                    <a
                      href="https://1.envato.market/BX5oGy"
                      target="_blank"
                      className="btn-link"
                    >
                      Review
                    </a>
                  </li>
                  <li className="breadcrumb-item mb-0 text-medium">
                    <a
                      href="https://1.envato.market/BX5oGy"
                      target="_blank"
                      className="btn-link"
                    >
                      Purchase
                    </a>
                  </li>
                  <li className="breadcrumb-item mb-0 text-medium">
                    <a
                      href="https://acorn-html-docs.coloredstrategies.com/"
                      target="_blank"
                      className="btn-link"
                    >
                      Docs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

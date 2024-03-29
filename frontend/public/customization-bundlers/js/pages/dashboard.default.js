class DashboardDefault {
  constructor() {
    (this._largeLineChart1 = null),
      (this._largeLineChart1 = null),
      this._initStatsCarousel(),
      this._initVideoGuidePlayer(),
      this._initHelpSelect2(),
      this._initSalesStocksCharts(),
      this._initTour(),
      this._initEvents();
  }
  _initEvents() {
    document.documentElement.addEventListener(
      Globals.colorAttributeChange,
      (e) => {
        this._largeLineChart1 && this._largeLineChart1.destroy(),
          this._largeLineChart2 && this._largeLineChart2.destroy(),
          this._initSalesStocksCharts();
      }
    );
  }
  _initStatsCarousel() {
    null !== document.querySelector("#statsCarousel") &&
      "undefined" != typeof GlideCustom &&
      new GlideCustom(
        document.querySelector("#statsCarousel"),
        {
          gap: 0,
          rewind: !1,
          bound: !0,
          perView: 6,
          breakpoints: {
            400: { perView: 1 },
            600: { perView: 2 },
            1400: { perView: 3 },
            1600: { perView: 4 },
            1900: { perView: 5 },
            3840: { perView: 6 },
          },
        },
        !0
      ).mount();
  }
  _initVideoGuidePlayer() {
    null !== document.querySelector("#videoGuide") &&
      "undefined" != typeof Plyr &&
      new Plyr(document.querySelector("#videoGuide"));
  }
  _initHelpSelect2() {
    jQuery().select2 &&
      jQuery("#categorySelect").select2({ minimumResultsForSearch: 1 / 0 });
  }
  _initSalesStocksCharts() {
    document.getElementById("largeLineChart1") &&
      (this._largeLineChart1 = ChartsExtend.LargeLineChart("largeLineChart1", {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Today"],
        datasets: [
          {
            label: "Sales",
            data: [23, 24, 26, 30, 27],
            icons: [
              "arrow-top",
              "arrow-top",
              "arrow-top",
              "arrow-top",
              "arrow-bottom",
            ],
            borderColor: Globals.primary,
            pointBackgroundColor: Globals.primary,
            pointBorderColor: Globals.primary,
            pointHoverBackgroundColor: Globals.foreground,
            pointHoverBorderColor: Globals.primary,
            borderWidth: 2,
            pointRadius: 2,
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointHoverRadius: 5,
            fill: !1,
            datalabels: { align: "end", anchor: "end" },
          },
        ],
      })),
      document.getElementById("largeLineChart2") &&
        (this._largeLineChart2 = ChartsExtend.LargeLineChart(
          "largeLineChart2",
          {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Today"],
            datasets: [
              {
                label: "Stock",
                data: [44, 49, 45, 33, 52],
                icons: [
                  "arrow-top",
                  "arrow-top",
                  "arrow-bottom",
                  "arrow-bottom",
                  "arrow-top",
                ],
                borderColor: Globals.secondary,
                pointBackgroundColor: Globals.secondary,
                pointBorderColor: Globals.secondary,
                pointHoverBackgroundColor: Globals.foreground,
                pointHoverBorderColor: Globals.secondary,
                borderWidth: 2,
                pointRadius: 2,
                pointBorderWidth: 2,
                pointHoverBorderWidth: 2,
                pointHoverRadius: 5,
                fill: !1,
                datalabels: { align: "end", anchor: "end" },
              },
            ],
          }
        ));
  }
  _initTour() {
    "undefined" != typeof introJs &&
      null !== document.getElementById("dashboardTourButton") &&
      document
        .getElementById("dashboardTourButton")
        .addEventListener("click", (e) => {
          introJs()
            .setOption(
              "nextLabel",
              '<span>Next</span><i class="cs-chevron-right"></i>'
            )
            .setOption(
              "prevLabel",
              '<i class="cs-chevron-left"></i><span>Prev</span>'
            )
            .setOption("skipLabel", '<i class="cs-close"></i>')
            .setOption("doneLabel", '<i class="cs-check"></i><span>Done</span>')
            .setOption("overlayOpacity", 0.5)
            .start();
        });
  }
}

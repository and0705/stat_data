import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "./Chart.scss";

const Chart = () => {
  const [data, setData] = useState([
    {
      wlan_bytes: null,
      num_sta: null,
      time: null,
      site: null
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://dev.cong.appwifi.com/stat/client");
      setData(res.data.data);
      console.log(res.data.data);
    };
    fetchData();
  }, []);

  const convertTime = ms => {
    let date = new Date(ms);
    date = date.toLocaleString();

    let separate = date.split(",", 2);
    let d = separate[0].split("/");
    d = d[1].concat("/", d[0], "/", d[2]);

    let h = separate[1].trim().split(":");
    if (h[2].slice(3, 5) === "PM") {
      let hour = parseInt(h[0], 10) + 12;
      h = hour.toString().concat(":", h[1]);
    } else {
      h = h[0].concat(":", h[1]);
    }

    return d.concat(" ", h);
  };

  const options = {
    chart: {
      zoomType: "xy"
    },
    title: {
      text: "Thống kê người dùng"
    },

    xAxis: [
      {
        categories: data.map(item => convertTime(item.time)),
        crosshair: true
      }
    ],

    yAxis: [
      {
        title: {
          text: "",
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          // format: "{value} u",
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }
      },
      {
        title: {
          text: "",
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        labels: {
          // format: "{value} b",
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        opposite: true
      }
    ],

    tooltip: {
      shared: true
    },

    legend: {
      layout: "vertical",
      align: "left",
      x: 120,
      verticalAlign: "top",
      y: 100,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        "rgba(255,255,255,0.25)"
    },

    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },

    navigation: {
      buttonOptions: {
        enabled: true
      }
    },

    series: [
      {
        name: "Số lượng",
        type: "column",
        data: data.map(item => item.num_sta),
        tooltip: {
          valueSuffix: " num_unit"
        }
      },
      {
        name: "Dung lượng",
        type: "spline",
        // yAxis: 1,
        data: data.map(item => item.wlan_bytes),
        tooltip: {
          valueSuffix: " bytes"
        }
      }
    ]
  };

  const renderData = () => {
    return (
      <table>
        <tr>
          <th>STT</th>
          <th>Địa điểm</th>
          <th>Số lượng</th>
          <th>Dung lượng</th>
        </tr>
        {data.map(item => (
          <tr>
            <td>{data.indexOf(item) + 1}</td>
            <td>{item.site}</td>
            <td>{item.num_sta}</td>
            <td>{item.wlan_bytes}</td>
          </tr>
        ))}
      </table>
    );
  };

  return (
    <div id="chart_container">
      <div id="chart_main">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div id="data_info">{renderData()}</div>
    </div>
  );
};

export default Chart;

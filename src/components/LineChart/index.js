import React from 'react';
import { equals } from 'ramda';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);


class LineCart extends React.Component {

    componentDidMount() {
        this.initChart();
    }

    componentDidUpdate(prevProps) {
        if(!equals(prevProps.data, this.props.data)) {
            if(this.chart._super) {
                this.chart.dispose();
            }
            this.initChart();
        }
    }

    componentWillUnmount() {
        this.chart.dispose();
    }

    initChart() {
        const { data } = this.props;
        let chart = am4core.create("ratingChart", am4charts.XYChart);

        chart.data = data;

        chart.dateFormatter.inputDateFormat = "yyyy";

        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 60;
        dateAxis.startLocation = 0.5;
        dateAxis.endLocation = 0.5;
        dateAxis.baseInterval = {
            timeUnit: "year",
            count: 1
        }

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let gradient = new am4core.LinearGradient();
        gradient.addColor(am4core.color('#43A897'));
        gradient.addColor(am4core.color('#408074'));
        gradient.rotation = 90;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "rating";
        series.stroke = am4core.color("#fff");
        series.propertyFields.strokeDasharray = "lineDash";
        series.strokeWidth = 2;
        series.fillOpacity = 0.5;
        series.fill = gradient;

        var bullet = series.bullets.push(new am4charts.Bullet());
        bullet.fill = am4core.color("#fdd400");

        var circle = bullet.createChild(am4core.Circle);
        circle.radius = 3;
        circle.fill = am4core.color("#fff");
        circle.strokeWidth = 2;

        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX = scrollbarX;
        chart.scrollbarX.parent = chart.bottomAxesContainer;
        chart.scrollbarX.minHeight = 20;

        this.chart = chart;
    }

    render() {
       return <div id="ratingChart" style={{ width: "100%", maxHeight: "500px" }}></div>
    } 
}

export default LineCart;
import _ from "underscore";

export default class ChartHelper {
    static createBarData(labels, datasetData) {
        const datasets = datasetData.map(function (data) {
            return {
                fillColor: '#F1E7E5',
                strokeColor: '#E8575A',
                pointColor: '#E8575A',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#ff',
                pointHighlightStroke: 'rgba(220, 220, 220, 1)',
                label: data.tenant,
                data: data.points,
            };
        });

        return {
            labels: labels,
            datasets: datasets
        }
    }

    static createLineData(labels, datasetData) {
        const datasets = datasetData.map(function (data) {
            return {
                fillColor: '#F1E7E5',
                strokeColor: '#E8575A',
                pointColor: '#E8575A',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#ff',
                pointHighlightStroke: 'rgba(220, 220, 220, 1)',
                label: data.tenant,
                data: data.points,
            };
        });

        return {
            labels: labels,
            datasets: datasets
        }
    }

    static createPieData(labels, datasetData) {
        const colors = _.shuffle([
            "#3366cc",
            "#dc3912",
            "#ff9900",
            "#109618",
            "#990099",
            "#0099c6",
            "#dd4477",
            "#66aa00",
            "#b82e2e",
            "#316395",
            "#994499",
            "#22aa99",
            "#aaaa11",
            "#6633cc",
            "#e67300",
            "#8b0707",
            "#651067",
            "#329262",
            "#5574a6",
            "#3b3eac"
        ]);

        const datasets = datasetData.map(function (data) {
            return {
                backgroundColor: colors,
                hoverBackgroundColor: colors,
                label: data.tenant,
                data: data.points,
            };
        });

        console.log(datasets);

        return {
            labels: labels,
            datasets: datasets
        };
    }
}
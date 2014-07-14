'use strict';

/**
 * Created by tbray on 7/10/14.
 */
angular.module('angularD3ShowcaseApp')
    .factory('d3Service', function() {

    //variation on the Revealing Module pattern
    var barChart = function barChartModule() {
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 500 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        var color = d3.scale.category10();

        var x0 = d3.scale.ordinal()
            .rangeRoundBands([0,width],.2   );

        var x1 = d3.scale.ordinal();

        var y = d3.scale.linear()
            .range([height,0]);

        var xAxis = d3.svg.axis()
            .scale(x0)
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

        //default yValue function just returns the data. Users of barChart can provide their own yValue function
        var yValue = function(d) {
            return d.value;
        };

        //default yMax function
        var yMax = function(d) {
            return d3.max(d);
        };

        var dispatch = d3.dispatch('barHover');

        function exports(selection) {
            selection.each(function(data){
                y.domain([0, yMax(data)]);
                x0.domain(data.map(function(d){return d.name;}));

                x1.domain(data[0].nodes).
                    rangeRoundBands([0, x0.rangeBand()]);


                //using enter/append for the svg element makes sure it's only appended once in case this module gets called multiple times
                var svg = d3.select(this)
                    .selectAll('svg')
                    .data([data]);
                svg.enter().append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .classed('barChart',true);

                var chart = svg.append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                chart.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis);

                chart.append('g')
                    .attr('class', 'y axis')
                    .call(yAxis);

                var state = chart.selectAll('.cluster')
                    .data(data)
                    .enter().append('g')
                        .attr('class', 'g')
                        .attr('transform', function(d) {
                            return 'translate(' + x0(d.name) + ',0)'; });

                state.selectAll('rect')
                    .data(function(d){
                        //TODO need to allow clients to provide this function for re-usability
                        return d.nodes.map(function(n){ return {cluster: d.name, length: d.nodes.length, value:n.value}; });
                    })
                    .enter()
                    .append('rect')
                    .classed('bar',true)
                    .attr({
                        //yValue is a function provides the actual y value to support nested data
                        height:function(d,i){ return height - y(yValue(d,i)); },
                        width:function(d){
                            return x0.rangeBand()/ d.length - 2;},
                        x:function(d,i){ return i * x0.rangeBand()/ d.length;},
                        y:function(d,i){return y(yValue(d,i)); }
                    })
                    .style('fill',function(d){return color(d.cluster);})
                    .on('mouseover', dispatch.barHover); //mapping mouseover of each bar to custom event 'barHover'
            });
        }

        exports.yValueFunction = function(f) {
            if (!arguments.length) { return yValue; }
            yValue = f;
            return this;
        };

        exports.yMaxFunction = function(f) {
            if (!arguments.length) { return yMax; }
            yMax = f;
            return this;
        };

        //this makes it possible to register event handlers for my custom barHover event
        d3.rebind(exports, dispatch, 'on');
        return exports;
    };

    return {
        d3:d3,
        barChart:barChart
    };

});
'use strict';

/**
 * Created by tbray on 7/10/14.
 */
angular.module('angularD3ShowcaseApp')
    .directive('tbNodeChart', ['d3Service', function(d3Service) {

        var link = function($scope, element) {

            var barChart = d3Service.barChart();
            barChart.yMaxFunction(function(data) {
                return _.max( _.flatten( _.map( data, function(d){ return d.nodes; })), function(x) { return x.value; }).value;
            });

            barChart.on('barHover',function(obj){
                $scope.$emit('itemHover', obj);
            });

            d3Service.d3.select(element[0]).datum($scope.data).call(barChart);

        };

        return {
            scope:{
                data:'='
            },
            transclude:true,
            replace:true,
            restrict: 'EA',
            link: link
        };
    }]
);
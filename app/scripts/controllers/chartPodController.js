'use strict';

angular.module('angularD3ShowcaseApp')
    .controller('ChartPodController', function($scope){

    $scope.hoveredItem = {};

    $scope.data =  [
        {name:'A', nodes:[{value:180},{value:20},{value:90},{value:100},{value:10},{value:90},{value:50}]},
        {name:'B', nodes:[{value:70},{value:30},{value:30}]},
        {name:'C', nodes:[{value:40},{value:50},{value:60}]}
    ];
    $scope.data2 =  [
        {name:'D', nodes:[{value:100},{value:10},{value:90},{value:50}]},
        {name:'E', nodes:[{value:70},{value:30},{value:30},{value:300},{value:20},{value:90}]},
        {name:'F', nodes:[{value:40}]},
        {name:'G', nodes:[{value:10},{value:5},{value:90}]},
        {name:'H', nodes:[{value:200},{value:150}]}
    ];

    $scope.$on('itemHover', function(event, node){
        $scope.hoveredItem = node;
        $scope.$apply();
    });
});
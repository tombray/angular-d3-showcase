/**
 * Created by tbray on 7/10/14.
 */
angular.module('angularD3ShowcaseApp')
    .directive('tbChartPod', [function() {

        return {
            scope:true,
            restrict: 'EA',
            template:'<div></div><div>Hovered node value: {{hoveredItem.value}}</div><div ng-transclude></div></div>',
            transclude:true
        }
    }]
);
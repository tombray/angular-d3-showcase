'use strict';

/**
 * Created by tbray on 7/13/14.
 */
describe('chartPodController', function(){
    var scope, $controllerConstructor, rootScope;

    beforeEach(module('angularD3ShowcaseApp'));

    beforeEach(inject(function($controller, $rootScope){
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        rootScope = $rootScope;
    }));

    it('should have a hoveredItem property', function() {
        $controllerConstructor('ChartPodController', {$scope:scope});
        expect(scope.hoveredItem).toBeDefined();
    });

    it('should respond to an itemHover event by updating hoveredItem', function(){
        var mockHoveredItem = {};
        $controllerConstructor('ChartPodController', {$scope:scope});
        rootScope.$broadcast('itemHover', mockHoveredItem);
        expect(scope.hoveredItem).toBe(mockHoveredItem);
    });
});
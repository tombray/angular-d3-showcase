describe("Bar Chart Directive Suite", function(){
    var $scope,
        element,
        mockD3Service;

    beforeEach(module('angularD3ShowcaseApp'));

    beforeEach(function() {
        //here I set up a mock d3Service that will get injected into my directive
        mockD3Service = sinon.stub({
            barChart: function(){},
            d3:{select:function(){return {datum:function(){return {call:function(){}}}}}}}
        );

        mockD3Service.barChart.returns({
            yMaxFunction:function(){},
            on:function(){}
        });

        module(function($provide) {
            $provide.value('d3Service', mockD3Service);
        });

    });

    beforeEach(inject(function($compile, $rootScope){
        $scope = $rootScope.$new();
        $scope.data = [
            {name:'Cluster A', nodes:[{value:190},{value:20},{value:30}]},
            {name:'Cluster B', nodes:[{value:20},{value:30},{value:40}]},
            {name:'Cluster C', nodes:[{value:40},{value:50},{value:60}]}
        ];
        element = angular.element('<div tb-node-chart ></div>');
        $compile(element)($scope)

    }));

    describe("BarChart Directive", function () {

        it('should call d3Service.barChart', function() {
            $scope.$digest();
            expect(mockD3Service.barChart.called).toBe(true);
        });
    });

});

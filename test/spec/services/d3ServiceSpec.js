/**
 * Created by tbray on 7/10/14.
 */
describe('d3Service Suite', function() {

    var service;

    beforeEach(module('angularD3ShowcaseApp'));
    beforeEach(inject(function(d3Service){
        service = d3Service;
    }))

    it('should define a barChart function', function(){
        expect(service.barChart).toBeDefined()
    });

    describe('barChart', function() {
        var barChart, fixture, dataSet;

        beforeEach(function() {
            barChart = service.barChart();
            fixture = d3.select('body').append('div');
            dataSet = [
                {name:'Cluster A', nodes:[{value:10},{value:20},{value:30}]},
                {name:'Cluster B', nodes:[{value:20},{value:30},{value:40}]},
                {name:'Cluster C', nodes:[{value:40},{value:50},{value:60}]}
            ]
        });

        afterEach(function() {
            fixture.remove();
        });

        it('should add the chart to the DOM', function() {
            fixture.datum(dataSet).call(barChart);
            expect(fixture.select('.barChart')[0][0]).not.toBeNull()
        });

        it('should expose a setter for yValue function', function(){
            expect(barChart.yValueFunction).toBeDefined()
            expect(typeof barChart.yValueFunction).toBe('function');
        });

        it('should expose a setter for yMaxFunction', function(){
            expect(barChart.yMaxFunction).toBeDefined()
            expect(typeof barChart.yMaxFunction).toBe('function');
        });

        it('should calculate max node value', function() {
            //here I'm working through what a maxNode function would look like:
            var maxNode = function(data) {
                return _.max( _.flatten( _.map( data, function(d){ return d.nodes})), function(x) { return x.value}).value;
            }

            var dataSet1 = [
                {name:'Cluster A', nodes:[{value:10},{value:20},{value:30}]},
                {name:'Cluster B', nodes:[{value:20},{value:30},{value:40}]},
                {name:'Cluster C', nodes:[{value:40},{value:50},{value:60}]}
            ]

            expect(maxNode(dataSet1)).toBe(60);

            var dataSet2 = [
                {name:'Cluster A', nodes:[{value:10},{value:20},{value:100}]},
                {name:'Cluster B', nodes:[{value:20},{value:30},{value:40}]},
                {name:'Cluster C', nodes:[{value:40},{value:50},{value:60}]}
            ]

            expect(maxNode(dataSet2)).toBe(100);
        })

        it('should call my custom yValueFunction', function() {
            var yValueFunction = sinon.spy();

            barChart.yValueFunction(yValueFunction);
            fixture.datum(dataSet).call(barChart);
            expect(yValueFunction.called).toBe(true);
        });

        it('should call my custom yMaxFunction', function() {
            var yMaxFunction = sinon.spy();

            barChart.yMaxFunction(yMaxFunction);
            fixture.datum(dataSet).call(barChart);
            expect(yMaxFunction.called).toBe(true);
        });

        it('should use provided yValueFunction and yMaxFunction instead of default', function(){
            var yMaxFunction
            //TODO mock the yValue and yMax function in separate tests, don't bother testing height
            barChart.yMaxFunction(function(data) { return _.max( _.flatten( _.map( data, function(d){ return d.nodes})), function(x) { return x.value}).value; });
            fixture.datum(dataSet).call(barChart);
            //sanity check to make sure original height is being calculated
            var originalHeight = fixture.selectAll('.bar')[0][0].height.baseVal.value;
            //TODO need a more sophisticated way to test that height is something reasonable (y values are scaled inside the barchart to produce the height)
            expect(originalHeight).toBeGreaterThan(1);
        })

        it('should create correct number of groups and bars', function() {
            var f = fixture.datum(dataSet).call(barChart);

            //use some functional programming to count the nodes in dataSet
            var nodeCount = _.flatten(_.map(dataSet, function(d){ return d.nodes})).length;

            expect(fixture.selectAll('.g')[0].length).toBe(dataSet.length);
            expect(fixture.selectAll('.bar')[0].length).toBe(nodeCount);
        });
    });
})
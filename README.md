# AngularD3Showcase
###This is an AngularJS application that showcases a variety of techniques and patterns, including:
 * Integrating D3 with Angular
 * Creating D3 components using TDD
 * Creating reusable charts using the Revealing Module pattern and a little functional programming
 * Mocking with sinon.js
 * Dispatching custom events from D3 components
 * Wrapping D3 components in Angular Directives
 * Injecting mock services into Directives
 * Nesting directives with transclusion
 * Testing event handlers
 * Inter-Directive communication using events and shared scope (a basic Mediator pattern)
 * and more
 
## Getting Started
Assuming you have npm, bower, and grunt installed, the following commands should get you up and running:

```
npm install
bower install
grunt serve
```
At that point, you should see something like this in your browser:

![screenshot](https://github.com/tombray/angular-d3-showcase/raw/master/docs/images/screenshot.png)

To run the tests using PhantomJS...

```
grunt test
```

## Reusable Grouped Bar Chart component
I wanted to create a reusable D3 grouped bar chart and wrap it in a service so I could inject that service into a custom directive. 
I could have chosen to use d3 directly from a directive, but injecting a service allows me to mock that service when I test my directive.

I developed my D3Service using TDD. The spec is here:

[d3ServiceSpec.js](https://github.com/tombray/angular-d3-showcase/blob/master/test/spec/services/d3ServiceSpec.js)

and the service is here:

[d3Service.js](https://github.com/tombray/angular-d3-showcase/blob/master/app/scripts/services/d3service.js)

I wanted users of the chart to be able to pass in their own functions for some of the logic that the chart needs to perform on their data. Here is a 
snippet showing the setters on the reusable chart module:

```
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
```

Then, when I'm calculating the max for my d3.scale.ordinal.domain I can call provided yMax function (or use the default I provide):

```
y.domain([0, yMax(data)]);
```

There are a bunch of tests in the spec, but ultimately I count the groups and bars to make sure they match the data passed in:

```
it('should create correct number of groups and bars', function() {
    var f = fixture.datum(dataSet).call(barChart);

    //use some functional programming to count the nodes in dataSet
    var nodeCount = _.flatten(_.map(dataSet, function(d){ return d.nodes})).length;

    expect(fixture.selectAll('.g')[0].length).toBe(dataSet.length);
    expect(fixture.selectAll('.bar')[0].length).toBe(nodeCount);
});
```

##Communication between the chart and a directive, and between directives
After I had the chart looking the way I wanted, I added some interactivity. The chart exposes a custom event called 'barHover' which
I listen for in a Directive:

[tbNodeChart.js](https://github.com/tombray/angular-d3-showcase/blob/master/app/scripts/directives/tbNodeChart.js)

Which, in turn, dispatches an event up to its parent scope:

```
barChart.on('barHover',function(obj){
    $scope.$emit('itemHover', obj);
});
```
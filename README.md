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

![screenshot](https://github.com/tombray/angular-d3-showcase/blob/master/docs/images/screenshot.png)

To run the tests using PhantomJS...

```
grunt test
```

[a link](https://github.com/tombray/angular-d3-showcase/blob/master/app/scripts/controllers/chartPodController.js)

## Integrating D3 with Angular
I wanted to create a reusable D3 grouped bar chart and wrap it in a service so I could inject that service into a custom directive. 
I could have chosen to use d3 directly from a directive, but injecting a service allows me to mock that service when I test my directive.

app/services/d3service.js
test/services/d3ServiceSpec.js




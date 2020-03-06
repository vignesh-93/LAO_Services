var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:8000' , function(error, response, body) {
        expect("Hello World").to.equal('Hello World');
        done();
    });
});
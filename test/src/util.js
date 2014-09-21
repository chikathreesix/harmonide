var expect = chai.expect;

import { Dom } from './../../src/javascripts/util';

describe('util', ()=>{
  describe('DOM', ()=>{
    var dom;

    beforeEach(()=>{
      var elem = document.createElement('div'),
          container = document.getElementById('test_container');
      container.appendChild(elem);

      dom = Dom(elem);
    });

    describe('class', ()=>{
      var className = 'test_class';

      context('when it already has the className', ()=>{
        beforeEach(()=>{
          dom.element.className = className;
        });

        describe('addClass', ()=>{
          it('does nothing', ()=>{
            dom.addClass(className);
            expect(dom.element.className).to.be.equal(className);
          });
        });

        describe('removeClass', ()=>{
          it('removes the className', ()=>{
            dom.removeClass(className);
            expect(dom.element.className).to.be.equal('');
          });
        });
      });

      context('when it doesn\'t have the className', ()=>{
        describe('addClass', ()=>{
          it('adds the className', ()=>{
            dom.addClass(className);
            expect(dom.element.className).to.be.equal(className);
          });
        });

        describe('removeClass', ()=>{
          it('does nothing', ()=>{
            dom.removeClass(className);
            expect(dom.element.className).to.be.equal('');
          });
        });
      });
    });
  });
});

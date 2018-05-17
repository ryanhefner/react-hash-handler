import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HashHandler from './index';

Enzyme.configure({
  adapter: new Adapter(),
});

let component;

beforeEach(() => {
  window.Element.prototype.getBoundingClientRect = () => {
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  };
});

describe('<HashHandler />', () => {
  test('onChange', () => {
    const onHashChange = jest.fn();

    component = mount((
      <HashHandler
        onChange={onHashChange}
      />
    ), {
      attachTo: document.getElementById('root'),
    });

    setTimeout(() => {
      window.location.hash = 'test';

      expect(onHashChange).toBeCalled();
      component.unmount();
    }, 0);
  });

  test('onClick', () => {
    const onHashClick = jest.fn();

    component = mount((
      <div>
        <HashHandler onClick={onHashClick} />
        <nav>
          <a href="#test">Test</a>
        </nav>
      </div>
    ), {
      attachTo: document.getElementById('root'),
    });

    setTimeout(() => {
      component.find('a').simulate('click');

      expect(onHashClick).toBeCalled();
      component.unmount();
    }, 0);
  });

  test('renders null', () => {
    component = mount(<HashHandler />, {
      attachTo: document.getElementById('root'),
    });

    expect(component.html()).toBe(null);
    component.unmount();
  });
});

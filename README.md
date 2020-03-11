# react-hash-handler

![npm](https://img.shields.io/npm/v/react-hash-handler?style=flat-square)
![NPM](https://img.shields.io/npm/l/react-hash-handler?style=flat-square)
![npm](https://img.shields.io/npm/dt/react-hash-handler?style=flat-square)
![Coveralls github](https://img.shields.io/coveralls/github/ryanhefner/react-hash-handler?style=flat-square)
![CircleCI](https://img.shields.io/circleci/build/github/ryanhefner/react-hash-handler?style=flat-square)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/ryanhefner/react-hash-handler?style=flat-square)


React component that makes it easy to compose hashchange and hash click handling
into your application or site.

## Install

Install via [npm](https://npmjs.com/package/react-hash-handler)

```sh
npm install --save react-hash-handler
```

Install via [Yarn](https://yarn.fyi/react-hash-handler)

```sh
yarn add react-hash-handler
```

## How to use

At its core, the `HashHandler` is a pretty straight-forward component that doesn’t
do much beyond letting your site or app know when the hash changes, or when a
hash link is clicked. Feel free to use it however you want via the callback props
that are available on the component.


### Props

* `onChange:Func` - Called when the browser `hashchange` event is fired.

* `onClick:Func` - Called when a hash link (ex. `<a href="#contact">Contact</a>`) is clicked.

### Examples

```js
import React, { Component } from 'react';
import TargetScroller from 'react-target-scroller';
import HashHandler from 'react-hash-handler';

class ExampleComponent extends Compnonent {
  constructor(props) {
    super(props);

    this.state = {
      scrollTarget: null,
    };

    this.onHashChange = this.onHashChange.bind(this);
    this.onHashClick = this.onHashClick.bind(this);
  }

  onHashChange({hash}) {
    this.setState({
      scrollTarget: `#${hash}`,
    });
  }

  onHashClick({hash}) {
    this.setState({
      scrollTarget: `#${hash}`,
    });
  }

  render() {
    const {
      scrollTarget,
    } = this.state;

    return (
      <div className="page-wrapper">
        <HashHandler
          onChange={this.onHashChange}
          onClick={this.onHashClick}
        />
        <TargetScroller target={scrollTarget} />
        <nav>
          <ul>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        ...
        <section id="overview">
          ...
        </section>
        <section id="about">
          ...
        </section>
        <section id="contact">
          ...
        </section>
      </div>
    );
  }
}
```

## License

[MIT](LICENSE) © [Ryan Hefner](https://www.ryanhefner.com)

import { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

class HashHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hash: null,
      prevHash: null,
    };

    this.onDOMChange = this.onDOMChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.mutationObserver = new MutationObserver(this.onDOMChange);
    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
    addEventListener('hashchange', this.onChange);

    this.addLinkHandlers();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  componentDidUpdate() {
    this.addLinkHandlers();
  }

  componentWillUnmount() {
    this.mutationObserver.disconnect();
    this.removeLinkHandlers();

    removeEventListener('hashchange', this.onChange);
  }

  getHashLinks() {
    return document.querySelectorAll('a[href^="#"]');
  }

  addLinkHandlers() {
    const links = this.getHashLinks();
    [].forEach.call(links, link => {
      link.addEventListener('click', this.onClick);
    });
  }

  removeLinkHandlers() {
    const links = this.getHashLinks();
    [].forEach.call(links, link => {
      link.removeEventListener('click', this.onClick);
    });
  }

  onDOMChange() {
    setTimeout(() => {
      this.addLinkHandlers();
    }, 150);
  }

  onChange(evt) {
    const {
      hash: prevHash,
    } = this.state;

    const hash = window.location.hash;

    this.setState({
      hash,
      prevHash,
    });

    return this.props.onChange({
      hash,
      prevHash,
    }, evt);
  }

  onClick(evt) {
    const {
      hash: prevHash,
    } = this.state;

    const href = evt.currentTarget.href;
    const hash = href.indexOf('#') > -1 ? href.split('#')[1] : null;

    this.setState({
      hash,
      prevHash,
    });

    return this.props.onClick({
      hash,
      prevHash,
    }, evt);
  }

  render() {
    return null;
  }
}

HashHandler.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

HashHandler.defaultProps = {
  onChange: () => true,
  onClick: () => true,
};

export default HashHandler;

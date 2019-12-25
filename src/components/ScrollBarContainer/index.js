import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import cssStyles from './index.module.scss';

class ScrollBarContainer extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);
    this.listContainer = React.createRef();
  }

  state = {
    slideBlockStyle: {}
  };

  componentDidMount() {
    if (this.props.getRef) {
      this.props.getRef(this.listContainer.current);
    }
    this.parseDom(this.listContainer.current);
    this.listContainer.current.addEventListener('scroll', this.handelScroll);
  }

  componentWillUnmount() {
    this.listContainer.current.removeEventListener('scroll', this.handelScroll);
  }

  handelScroll = e => {
    this.parseDom(e.target);
  };

  parseDom = dom => {
    if (!dom) return;
    const clientHeight = dom.clientHeight;
    const scrollHeight = dom.scrollHeight;
    const scrollTop = dom.scrollTop;
    // 滑块高度
    const slideBlockHeight = clientHeight ** 2 / scrollHeight;
    // 滑块距离顶部距离
    const slideBlockTop =
      (scrollTop * (clientHeight - slideBlockHeight)) /
      (scrollHeight - clientHeight);
    if (isNaN(slideBlockTop)) return;
    this.setState({
      slideBlockStyle: {
        height: slideBlockHeight,
        top: slideBlockTop
      }
    });
  };

  render() {
    const { children, className } = this.props;
    return (
      <div className={classNames(cssStyles.listContainer, className)}>
        <div className={cssStyles.scrollBar}>
          <span style={{ ...this.state.slideBlockStyle }} />
        </div>
        <div ref={this.listContainer} className={cssStyles.scrollContent}>
          {children}
        </div>
      </div>
    );
  }
}

export default ScrollBarContainer;

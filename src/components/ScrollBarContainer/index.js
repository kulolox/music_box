import React, { Component } from 'react';
import classNames from 'classnames';

import cssStyles from './index.module.scss';

class ScrollBarContainer extends Component {
  constructor(props) {
    super(props);
    this.listContainer = React.createRef();
  }

  state = {
    slideBlockStyle: {},
    hasScrollBar: true
  };

  componentDidMount() {
    if (this.props.getRef) {
      this.props.getRef(this.listContainer.current);
    }
    // 初始化滚动条
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
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(slideBlockTop)) {
      this.setState({
        hasScrollBar: false
      });
      return;
    }
    this.setState({
      hasScrollBar: true,
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
        {this.state.hasScrollBar && (
          <div className={cssStyles.scrollBar}>
            <span style={{ ...this.state.slideBlockStyle }} />
          </div>
        )}
        <div ref={this.listContainer} className={cssStyles.scrollContent}>
          {children}
        </div>
      </div>
    );
  }
}

export default ScrollBarContainer;

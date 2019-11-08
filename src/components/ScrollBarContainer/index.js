import React, { Component } from 'react';

import cssStyles from './index.module.scss';

class ScrollBarContainer extends Component {
  constructor(props) {
    super(props);
    this.listContainer = React.createRef();
  }

  state = {
    showList: false
  };

  componentDidMount() {
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
    this.setState({
      slideBlockStyle: {
        height: slideBlockHeight,
        top: slideBlockTop
      }
    });
  };

  render() {
    const { children } = this.props;
    return (
      <div className={cssStyles.listContainer}>
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

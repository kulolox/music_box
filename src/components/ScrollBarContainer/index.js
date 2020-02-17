import React, { useEffect } from 'react';
import classNames from 'classnames';

import cssStyles from './index.module.scss';

export default function ScrollBarContainer({
  children,
  className,
  getRef = () => {}
}) {
  const container = React.useRef();
  const [slideBlockStyle, setSlideBlockStyle] = React.useState();
  const [hasScrollBar, setHasScrollBar] = React.useState(true);

  const parseDom = React.useCallback((dom = container.current) => {
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
    if (isNaN(slideBlockTop)) {
      setHasScrollBar(false);
      return;
    }
    setHasScrollBar(true);
    setSlideBlockStyle({
      height: slideBlockHeight,
      top: slideBlockTop
    });
  }, []);

  const handelScroll = React.useCallback(
    e => {
      parseDom(e.target);
    },
    [parseDom]
  );

  useEffect(() => {
    getRef(container.current);

    // parseDom();
    const dom = container.current;
    dom.addEventListener('scroll', handelScroll);
    return () => dom.removeEventListener('scroll', handelScroll);
  }, [getRef, handelScroll, parseDom]);

  return (
    <div className={classNames(cssStyles.container, className)}>
      {hasScrollBar && (
        <div className={cssStyles.scrollBar}>
          <span style={{ ...slideBlockStyle }} />
        </div>
      )}
      <div ref={container} className={cssStyles.scrollContent}>
        {children}
      </div>
    </div>
  );
}

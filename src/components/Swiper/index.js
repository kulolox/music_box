import 'swiper/css/swiper.min.css';
import React, { useState, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ReactSwiper from 'react-id-swiper';
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectFade
} from 'swiper/js/swiper.esm';

const useStyles = makeStyles(theme => ({
  swiperContainer: {
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  },
  swiperBox: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  navigation: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    background: 'rgba(0,0,0,1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    transform: 'translateY(-50%)',
    opacity: 0.3,
    transition: 'opacity 0.3s',
    '& svg': {
      fontSize: 34,
      color: 'rgba(255, 255, 255, 0.8)',
      '&:hover': {
        opacity: '0.5 !important'
      }
    }
  },
  bulletActive: {
    background: '#fff !important',
    opacity: '0.8 !important'
  },
  prev: { left: 10 },
  next: { right: 10 }
}));

export default function Swiper({ speed = 4000, navigation = false, children }) {
  const classes = useStyles();
  const [isOneChild] = useState(!Array.isArray(children));
  // 轮播控制器
  const swiper = useRef(null);

  const getSwiper = ref => {
    swiper.current = ref;
  };

  const goNext = useCallback(() => {
    swiper.current.slideNext();
  }, []);

  const goPrev = useCallback(() => {
    swiper.current.slidePrev();
  }, []);

  // 轮播配置
  let params = {};
  if (!isOneChild) {
    params = {
      modules: [Pagination, Navigation, Autoplay, EffectFade],
      autoplay: {
        delay: speed,
        stopOnLastSlide: false,
        disableOnInteraction: false
      },
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        bulletActiveClass: classes.bulletActive
      }
    };
  }

  return (
    <div className={classes.swiperBox}>
      <ReactSwiper
        containerClass={classes.swiperContainer}
        getSwiper={getSwiper}
        {...params}
      >
        {React.Children.map(
          children,
          child => (
            <div>{child}</div>
          ),
          undefined
        )}
      </ReactSwiper>
      {!isOneChild && navigation && (
        <React.Fragment>
          <div
            className={classNames(classes.navigation, classes.prev)}
            onClick={goPrev}
          >
            <ChevronLeftIcon />
          </div>
          <div
            className={classNames(classes.navigation, classes.next)}
            onClick={goNext}
          >
            <ChevronRightIcon />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

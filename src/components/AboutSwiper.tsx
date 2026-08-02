import { EffectCards } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { AboutCard } from '../data/profile'

import 'swiper/css'
import 'swiper/css/effect-cards'

type AboutSwiperProps = {
  cards: AboutCard[]
}

/** 对齐 Swiper 官方 Effect Cards 示例结构 */
export function AboutSwiper({ cards }: AboutSwiperProps) {
  return (
    <div
      className="about-swiper"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <Swiper
        className="about-cards-swiper"
        effect="cards"
        grabCursor
        modules={[EffectCards]}
        cardsEffect={{
          perSlideOffset: 8,
          perSlideRotate: 2,
          rotate: true,
          slideShadows: true,
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="about-card-content">
              {card.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

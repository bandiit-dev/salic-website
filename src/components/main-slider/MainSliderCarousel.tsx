"use client";

import Image from "next/image";
import Link from "next/link";
import { A11y, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

import styles from "./MainSlider.module.scss";

type MainSlide = {
  id: string;
  href: string | null;
  imageUrl: string;
  imageAlt: string;
  objectPosition: string;
};

type MainSliderCarouselProps = {
  slides: MainSlide[];
};

const AUTOPLAY_DELAY_MS = 3000;

export function MainSliderCarousel({ slides }: MainSliderCarouselProps) {
  return (
    <section className={styles.mainSlider} aria-label="Projetos em destaque">
      <Swiper
        className={styles.mainSlider__swiper}
        modules={[Autoplay, A11y, EffectFade]}
        slidesPerView={1}
        speed={900}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={slides.length > 1}
        grabCursor={slides.length > 1}
        allowTouchMove={slides.length > 1}
        preventClicks
        preventClicksPropagation
        autoplay={
          slides.length > 1
            ? {
                delay: AUTOPLAY_DELAY_MS,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }
            : false
        }
        a11y={{
          enabled: true,
          prevSlideMessage: "Projeto anterior",
          nextSlideMessage: "Próximo projeto",
          slideLabelMessage: "{{index}} de {{slidesLength}}",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className={styles.mainSlider__slide}
          >
            {({ isActive }) => {
              const image = (
                <div className={styles.mainSlider__media}>
                  <Image
                    src={slide.imageUrl}
                    alt={isActive ? slide.imageAlt : ""}
                    fill
                    sizes="100vw"
                    preload={index === 0}
                    draggable={false}
                    style={{ objectPosition: slide.objectPosition }}
                  />
                </div>
              );

              if (!slide.href) {
                return image;
              }

              return (
                <Link
                  className={styles.mainSlider__link}
                  href={slide.href}
                  tabIndex={isActive ? undefined : -1}
                  aria-hidden={!isActive}
                  aria-label="Ver projeto"
                >
                  {image}
                </Link>
              );
            }}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import styles from "./ProjectSlider.module.scss";

type ProjectSlide = {
  id: string;
  title: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
};

type ProjectSliderCarouselProps = {
  slides: ProjectSlide[];
};

const AUTOPLAY_DELAY_MS = 3000;

export function ProjectSliderCarousel({
  slides,
}: ProjectSliderCarouselProps) {
  return (
    <section
      id="projetos"
      className={styles.projectSlider}
      aria-labelledby="project-slider-title"
    >
      <h2 id="project-slider-title" className={styles.projectSlider__title}>
        Projetos
      </h2>

      <Swiper
        className={styles.projectSlider__swiper}
        modules={[Autoplay, A11y]}
        slidesPerView={1}
        spaceBetween={20}
        speed={700}
        loop={slides.length > 1}
        grabCursor={slides.length > 1}
        allowTouchMove={slides.length > 1}
        slideToClickedSlide={slides.length > 1}
        preventClicks
        preventClicksPropagation
        watchSlidesProgress
        autoplay={
          slides.length > 1
            ? {
                delay: AUTOPLAY_DELAY_MS,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }
            : false
        }
        breakpoints={{
          0: {
            spaceBetween: 12,
          },
          476: {
            spaceBetween: 20,
          },
        }}
        a11y={{
          enabled: true,
          prevSlideMessage: "Projeto anterior",
          nextSlideMessage: "Próximo projeto",
          slideLabelMessage: "{{index}} de {{slidesLength}}",
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className={styles.projectSlider__slide}
          >
            {({ isActive }) => {
              const projectImage = (
                <div className={styles.projectSlider__media}>
                  <Image
                    src={slide.imageUrl}
                    alt={isActive ? slide.imageAlt : ""}
                    fill
                    sizes="(max-width: 475px) calc(100vw - 60px), calc(100vw - 120px)"
                    draggable={false}
                  />
                </div>
              );

              return (
                <article className={styles.projectSlider__project}>
                  {isActive ? (
                    <Link
                      className={styles.projectSlider__mediaLink}
                      href={slide.href}
                      aria-label={`Ver projeto ${slide.title}`}
                    >
                      {projectImage}
                    </Link>
                  ) : (
                    projectImage
                  )}

                  <Link
                    className={styles.projectSlider__link}
                    href={slide.href}
                    tabIndex={isActive ? undefined : -1}
                    aria-hidden={!isActive}
                  >
                    <span>{slide.title}</span>
                    <Image
                      src="/images/icon-right-arrow.png"
                      alt=""
                      width={25}
                      height={13}
                    />
                  </Link>
                </article>
              );
            }}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

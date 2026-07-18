import type { SanityImageObject } from "@sanity/image-url";

import { urlForImage } from "@/sanity/lib/image";

import { MainSliderCarousel } from "./MainSliderCarousel";

type MainSliderImage = SanityImageObject & {
  alt?: string;
};

export type MainSliderItem = {
  _key: string;
  link?: string | null;
  image?: MainSliderImage | null;
};

type MainSliderProps = {
  items?: MainSliderItem[] | null;
};

export function MainSlider({ items }: MainSliderProps) {
  const slides = (items ?? []).flatMap((item) => {
    if (!item.image?.asset) {
      return [];
    }

    const hotspot = item.image.hotspot;

    return [
      {
        id: item._key,
        href: item.link ?? null,
        imageUrl: urlForImage(item.image)
          .width(2560)
          .auto("format")
          .url(),
        imageAlt: item.image.alt ?? "",
        objectPosition: `${(hotspot?.x ?? 0.5) * 100}% ${(hotspot?.y ?? 0.5) * 100}%`,
      },
    ];
  });

  if (slides.length === 0) {
    return null;
  }

  return <MainSliderCarousel slides={slides} />;
}

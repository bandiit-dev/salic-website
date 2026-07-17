import type { PortableTextBlock } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import type { SanityImageObject } from "@sanity/image-url";
import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";

import styles from "./AboutUs.module.scss";

type AboutImage = SanityImageObject & {
  alt?: string;
};

export type AboutUsContent = {
  title?: string | null;
  text?: PortableTextBlock[] | null;
  image?: AboutImage | null;
};

type AboutUsProps = {
  content?: AboutUsContent | null;
};

function getHeadingParts(title: string) {
  const [leading, ...remainingWords] = title.trim().split(/\s+/);

  return {
    leading,
    trailing: remainingWords.join(" "),
  };
}

export function AboutUs({ content }: AboutUsProps) {
  if (!content?.title || !content.text?.length || !content.image?.asset) {
    return null;
  }

  const { image, text } = content;
  const heading = getHeadingParts(content.title);
  const imageUrl = urlForImage(image)
    .width(1600)
    .height(1600)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <section id="sobre" className={styles.aboutUs}>
      <div className={styles.aboutUs__content}>
        <h2 className={styles.aboutUs__title}>
          <span>{heading.leading}</span>
          {heading.trailing && <strong>{heading.trailing}</strong>}
        </h2>

        <div className={styles.aboutUs__text}>
          <PortableText value={text} />
        </div>
      </div>

      <div className={styles.aboutUs__image}>
        <Image
          src={imageUrl}
          alt={image.alt ?? ""}
          fill
          sizes="(max-width: 475px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}

import type { SanityImageObject } from "@sanity/image-url";
import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";

import styles from "./ContactUs.module.scss";

type ContactImage = SanityImageObject & {
  alt?: string;
};

export type ContactUsContent = {
  title?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  image?: ContactImage | null;
};

type ContactUsProps = {
  content?: ContactUsContent | null;
};

function getHeadingParts(title: string) {
  const words = title.trim().split(/\s+/);
  const trailing = words.pop() ?? "";

  return {
    leading: words.join(" "),
    trailing,
  };
}

function getPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function ContactUs({ content }: ContactUsProps) {
  if (!content?.title || !content.image?.asset) {
    return null;
  }

  const { address, email, image, phone } = content;
  const heading = getHeadingParts(content.title);
  const imageUrl = urlForImage(image)
    .width(1600)
    .height(1600)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <section id="contato" className={styles.contactUs}>
      <div className={styles.contactUs__image}>
        <Image
          src={imageUrl}
          alt={image.alt ?? ""}
          fill
          sizes="(max-width: 475px) 100vw, 50vw"
        />
      </div>

      <div className={styles.contactUs__content}>
        <h2 className={styles.contactUs__title}>
          {heading.leading && <span>{heading.leading}</span>}
          <strong>{heading.trailing}</strong>
        </h2>

        <address className={styles.contactUs__details}>
          {phone && (
            <a className={styles.contactUs__phone} href={getPhoneHref(phone)}>
              {phone}
            </a>
          )}

          {email && <a href={`mailto:${email}`}>{email}</a>}

          {address && <p>{address}</p>}
        </address>
      </div>
    </section>
  );
}

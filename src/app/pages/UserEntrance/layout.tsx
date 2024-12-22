import Image from "next/image";
import css from "./UserEntrance.module.css";

export default function UserEntrance({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.container}>
      {children}
      <div className={css.containerImg}>
        <Image
          src="/images/iPhoneDekstop.png"
          alt="IPhone"
          width={1440}
          height={800}
          className={css.desktopImage}
          quality={100}
          priority
        />

        <Image
          src="/images/iPhoneMobile.png"
          alt="IPhone"
          width={255}
          height={518}
          className={css.mobileImage}
          quality={100}
          priority
        />
      </div>
    </div>
  );
}

import Link from "next/link";
import css from "./StartYourWorkout.module.css";

export default function StartYourWorkout() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Start your workout</h2>
      <ul className={css.list}>
        <li className={css.item}>
          <div className={css.numberContainer}>
            <span className={css.number}>1</span>
          </div>
          <p className={css.text}>
            Create a personal library:
            <span className={css.span}>
              {" "}
              add the books you intend to read to it.
            </span>
          </p>
        </li>
        <li className={css.item}>
          <div className={css.numberContainer}>
            <span className={css.number}>2</span>
          </div>
          <p className={css.text}>
            Create your first workout:
            <span className={css.span}>
              {" "}
              define a goal, choose a period, start training.
            </span>
          </p>
        </li>
      </ul>

      <div className={css.containerLinks}>
        <Link className={css.link} href="/library">
          My library
        </Link>
        <Link href="/library">
          <svg width={24} height={24}>
            <use href="symbol-defs.svg#move"></use>
          </svg>
        </Link>
      </div>
    </div>
  );
}

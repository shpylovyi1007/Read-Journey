import css from "./Header.module.css";

export default function Header() {
  return (
    <div className={css.header}>
      <svg width={42} height={17}>
        <use href="./symbol-defs.svg#frame"></use>
      </svg>

      <div></div>

      <button type="button">
        <svg width={42} height={17}>
          <use href="./symbol-defs.svg#sidebar"></use>
        </svg>
      </button>
    </div>
  );
}

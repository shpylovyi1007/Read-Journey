import Filters from "../Filters/Filters";
import StartYourWorkout from "../StartYourWorkout/StartYourWorkout";
import css from "./FiltersContainer.module.css";

export default function FiltersContainer() {
  return (
    <div className={css.container}>
      <Filters />
      <StartYourWorkout />
    </div>
  );
}

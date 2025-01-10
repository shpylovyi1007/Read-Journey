import Header from "@/app/components/Header/Header";
import FiltersContainer from "../components/FiltersContainer/FiltersContainer";
import RecommendedBooks from "../components/RecommendedBooks/RecommendedBooks";

export default function Home() {
  return (
    <div>
      <Header />
      <FiltersContainer />
      <RecommendedBooks />
    </div>
  );
}

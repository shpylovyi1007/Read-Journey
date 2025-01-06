import { useEffect } from "react";
import Entrance from "./pages/UserEntrance/page";
import { useAppDispatch } from "./hooks";
import { refrefhUser } from "./redux/auth/operations";
// import { selectIsRefreshing } from "./redux/auth/selectors";

export default function Home() {
  // const isRefreshing = useAppSelector(selectIsRefreshing);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refrefhUser());
  }, [dispatch]);

  // return isRefreshing ? (
  //   <div>Loader</div>
  // ) : (
  //   <div>
  //     <Entrance />
  //   </div>
  // );
  return (
    <div>
      <Entrance />
    </div>
  );
}

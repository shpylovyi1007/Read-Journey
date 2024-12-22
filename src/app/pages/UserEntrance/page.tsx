import RegistrationForm from "@/app/components/RegistrationForm/RegistrationForm";
import UserEntrance from "./layout";
// import LoginForm from "@/app/components/LoginForm/LoginForm";

export default function Entrance() {
  return (
    <UserEntrance>
      <RegistrationForm />
      {/* <LoginForm /> */}
    </UserEntrance>
  );
}

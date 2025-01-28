import { useAuthContext } from "../hooks/useAuth";
import Profile from "../components/Profile";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="mt-20">
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;

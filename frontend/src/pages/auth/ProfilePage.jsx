import { useAuthContext } from "../../hooks/useAuth";
import Profile from "../../components/auth/Profile";

const ProfilePage = () => {
  const { user } = useAuthContext();

  return (
    <div className="mt-20">
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;

import useProfileController from '@/pages/Profile/ProfileController';

export default function Profile() {
  const {} = useProfileController();

  return (
    <div className="container">
      <h1>Profile</h1>
    </div>
  );
}

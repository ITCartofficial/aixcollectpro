import { useState, useRef } from "react";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton";
import OutlineButton from "../../components/ui/Buttons/OutlineButton";


interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  countryCode: string;
  avatar?: string; 
}

const DEFAULT_PROFILE: UserProfile = {
  firstName: "Arjun",
  lastName: "Kannan",
  email: "Arjun12@gamil.com",
  mobile: "xxxxx xx909",
  countryCode: "+91",
  avatar: undefined, 
};

const getInitials = (firstName: string, lastName: string): string => {
  const firstInitial = firstName ? firstName.trim().charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.trim().charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(profile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryCodeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProfile((prev) => ({ ...prev, countryCode: e.target.value }));
  };

  const handleChangeProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfile = () => {
    setProfile(prev => ({
      ...prev,
      avatar: undefined,
    }));
    setAvatarPreview(undefined);
    alert("Profile image deleted (demo only)");
  };

  const handleCancel = () => {
    setProfile(DEFAULT_PROFILE);
    setAvatarPreview(DEFAULT_PROFILE.avatar);
  };

  const handleSave = () => {
    // handle save logic (API call)
    alert("Profile updated (demo only)");
  };

  return (
    <div className="mr-4">
      {/* Header Title Section */}
      <div className="w-full h-12 flex justify-between items-center mt-4">
        <h1 className="text-xl lg:text-2xl font-bold text-neutral-700 mb-5 mt-4">Edit Profile</h1>
        <div className="flex gap-4">
          <PrimaryButton text="Check-in" className="w-42 bg-primary-700 hover:bg-primary-600 text-white" />
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 mt-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex gap-x-6 items-center">
            <div className="w-40 h-40 rounded-full object-cover border bg-neutral-200 flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="bg-primary-600 w-full h-full flex items-center justify-center">
                  {getInitials(profile.firstName, profile.lastName)}
                </span>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div>

          <div>
            <div className="flex gap-x-4">
              <PrimaryButton text="Change Profile" className="sm:w-40 bg-primary-700 hover:bg-primary-600 text-white" onClick={handleChangeProfileClick} />
              <OutlineButton text="Delete Profile" className="sm:w-40 bg-white hover:bg-primary-600 text-primary-700" onClick={handleDeleteProfile} />
            </div>
            <p className="text-sm text-neutral-500 font-medium  mt-4">
              Allowed: JPG or PNG. Max size of 800KB
            </p>
          </div>

        </div>

        <hr className="my-6 text-neutral-300" />

        <h2 className="text-lg font-semibold mb-1">Profile Settings</h2>
        <p className="text-sm text-neutral-500 mb-6">
          You can update your personal and contact details
        </p>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              className="w-full border border-neutral-300 focus:outline-1 rounded px-4 py-3 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              className="w-full border border-neutral-300 focus:outline-1 rounded px-4 py-3 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Number<span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <select
                value={profile.countryCode}
                onChange={handleCountryCodeChange}
                className="border border-neutral-300 focus:outline-1 rounded-l px-4 py-3 text-sm bg-neutral-50">
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                {/* Add more country codes as needed */}
              </select>
              <input
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                className="w-full border border-neutral-300 focus:outline-1 rounded-r px-4 py-3 text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email ID<span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded focus:outline-1 px-4 py-3 text-sm"
              required
            />
          </div>
        </form>

        <div className="flex justify-end gap-3 mt-8">
          <OutlineButton text="Cancel" className="w-40 bg-white hover:bg-primary-600 text-primary-700" onClick={handleCancel} />
          <PrimaryButton text="Save Changes" className="w-40 bg-primary-700 hover:bg-primary-600 text-white" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
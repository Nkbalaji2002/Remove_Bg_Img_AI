import { useAuth, useUser } from "@clerk/clerk-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const UserSyncHandler = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [synced, setSynced] = useState(false);
  const { BACKEND_URL } = useContext(AppContext);

  const saveUser = async () => {
    if (!isLoaded || !isSignedIn || synced) {
      return;
    }

    try {
      const token = await getToken();

      const userData = {
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      const response = await axios.post(`${BACKEND_URL}/users`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success === true) {
        toast.success("User successfully created!!!");
      } else {
        toast.error("Unable sync failed. Please try again");
      }

      setSynced(true);
    } catch (error) {
      console.error("User sync falled : " + error);
      toast.error("Unable to create account. Please try again");
    }
  };

  useEffect(() => {
    saveUser();
  }, [isLoaded, isSignedIn, getToken, user, synced]);

  return null;
};

export default UserSyncHandler;

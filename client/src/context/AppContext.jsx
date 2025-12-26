import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [credit, setCredit] = useState(false);
  const { getToken } = useAuth();
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const loadUserCredits = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BACKEND_URL}/users/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setCredit(response.data.data.credits);
      } else {
        toast.error(response.data.data);
      }
    } catch (error) {
      toast.error("Error loading credits...." + error.message);
    }
  };

  const removeBg = async (selectedImage) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }

      setImage(selectedImage);
      setResultImage(false);

      navigate("/result");

      const token = await getToken();
      const formData = new FormData();
      selectedImage && formData.append("file", selectedImage);

      const { data: base64Image } = await axios.post(
        BACKEND_URL + '/images/remove-background',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResultImage(`data:image/png;base64, ${base64Image}`);
      setCredit(credit - 1);
    } catch (error) {
      console.error(error);
      toast.error("Error while removing background image");
    }
  };

  const contextValue = {
    BACKEND_URL,
    credit,
    setCredit,
    loadUserCredits,
    image,
    setImage,
    resultImage,
    setResultImage,
    removeBg,
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>
        {props.children}
      </AppContext.Provider>
    </>
  );
};

export default AppContextProvider;

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        dispatch(signInFailure(data.message));
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Google error:", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="border border-red-700 hover:opacity-95 hover:bg-red-700 hover:text-slate-50 disabled:opacity-50 text-red-700 p-4 rounded-lg"
    >
      Sign in with Google
    </button>
  );
};

export default OAuth;

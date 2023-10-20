import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      setLoading(false);

      if (!data.success) {
        setError(data.message);
        return;
      }

      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xs mx-auto"
      >
        <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded-xl">
          <input
            required
            type="text"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="bg-slate-700 hover:opacity-95 disabled:opacity-50 text-slate-50 p-4 rounded-lg"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          {error && <p className="text-red-400">ERROR: {error}</p>}
        </div>

        <div className="flex justify-between">
          <p className="text-slate-700">Don&apos;t have an account?</p>
          <Link to="/sign-up" className="underline text-blue-950">
            Sign Up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignInPage;

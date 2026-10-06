

import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    rePassword: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const data = {
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        password: formData.password,
        rePassword: formData.rePassword,
      };

      if (formData.username.trim() !== "") {
        data.username = formData.username;
      }

      const response = await fetch(
        "https://route-posts.routemisr.com/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("Account created successfully");
      } else {
        setMessage(result.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
    }
  }

  return (
    <div
      className="min-h-screen bg-[#f0f2f5] px-4 py-8 sm:py-12 lg:flex lg:items-center"
      style={{ fontFamily: "Cairo, sans-serif" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Section */}
        <section className="order-2 w-full max-w-xl text-center lg:order-1 lg:text-left">

          <h1 className="hidden text-5xl font-extrabold tracking-tight text-[#00298d] sm:text-6xl lg:block">
            Route Posts
          </h1>

          <p className="mt-4 hidden text-2xl font-medium leading-snug text-slate-800 lg:block">
            Connect with friends and the world around you on Route Posts.
          </p>

          <div className="mt-6 rounded-2xl border border-[#c9d5ff] bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">

            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#00298d]">
              About Route Academy
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              Egypt's Leading IT Training Center Since 2012
            </p>

            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Route Academy is the premier IT training center in Egypt,
              established in 2012. We specialize in delivering high-quality
              training courses in programming, web development, and
              application development. We've identified the unique challenges
              people may face when learning new technology and made efforts
              to provide strategies to overcome them.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">

              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">
                  2012
                </p>

                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Founded
                </p>
              </div>

              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">
                  40K+
                </p>

                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Graduates
                </p>
              </div>

              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">
                  50+
                </p>

                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Partner Companies
                </p>
              </div>

              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">
                  5
                </p>

                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Branches
                </p>
              </div>

              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">
                  20
                </p>

                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Diplomas Available
                </p>
              </div>

            </div>
          </div>
        </section>

      
        <section className="order-1 w-full max-w-[430px] lg:order-2">

          <div className="rounded-2xl bg-white p-4 sm:p-6">

           
            <div className="mb-4 text-center lg:hidden">

              <h1 className="text-3xl font-extrabold tracking-tight text-[#00298d]">
                Route Posts
              </h1>

              <p className="mt-1 text-base font-medium leading-snug text-slate-700">
                Connect with friends and the world around you on Route Posts.
              </p>

            </div>

            <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">

              <Link
                to="/login"
                className="rounded-lg py-2 text-center text-sm font-extrabold text-slate-600 transition hover:text-slate-800"
              >
                Login
              </Link>

              <button
                type="button"
                className="rounded-lg bg-white py-2 text-sm font-extrabold text-[#00298d] shadow-sm"
              >
                Register
              </button>

            </div>

            <h2 className="text-2xl font-extrabold text-slate-900">
              Create a new account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              It is quick and easy.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-5 space-y-3.5"
            >

             
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                />
              </div>

              
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username (optional)"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                />
              </div>

            
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                />
              </div>

          
              <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

             
              <div>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                />
              </div>

             
              <div>
                <input
                  type="password"
                  name="rePassword"
                  placeholder="Confirm password"
                  value={formData.rePassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#00298d] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#00298d] py-3 text-base font-extrabold text-white transition hover:bg-[#001f6b]"
              >
                Create New Account
              </button>

            </form>

            {message && (
              <p className="mt-4 text-center text-sm font-semibold text-[#00298d]">
                {message}
              </p>
            )}

          </div>
        </section>

      </div>
    </div>
  );
}

export default SignUp;


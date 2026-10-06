import { useEffect, useState } from "react";
import {
  Camera,
  Expand,
  Users,
  Mail,
  FileText,
  Bookmark,
  Heart,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
    getMyPosts();
  }, []);

  async function getProfile() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://route-posts.routemisr.com/users/profile-data",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log(
        "PROFILE USER:",
        JSON.stringify(result.data?.user, null, 2)
      );

      if (response.ok) {
        const profileData = result.data?.user || result.data;

        if (profileData) {
          setUser(profileData);

          localStorage.setItem(
            "user",
            JSON.stringify(profileData)
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getMyPosts() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://route-posts.routemisr.com/posts?page=1&limit=100",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log("MY POSTS:", result);

      if (response.ok) {
        const allPosts = result.data?.posts || [];

        const currentUser = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        const myPosts = allPosts.filter(
          (post) =>
            post.user?._id === currentUser?._id
        );

        setPosts(myPosts);

        const bookmarkIds =
          currentUser?.bookmarks || [];

        const saved = allPosts.filter((post) =>
          bookmarkIds.includes(post._id)
        );

        setSavedPosts(saved);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deletePost(postId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://route-posts.routemisr.com/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log("DELETE POST:", result);

      if (response.ok) {
        setPosts((oldPosts) =>
          oldPosts.filter(
            (post) => post._id !== postId
          )
        );
      } else {
        alert(
          result.message || "Failed to delete post"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeBookmark(postId) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://route-posts.routemisr.com/posts/${postId}/bookmark`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log("REMOVE BOOKMARK:", result);

      if (response.ok) {
        setSavedPosts((oldPosts) =>
          oldPosts.filter(
            (post) => post._id !== postId
          )
        );

        setUser((oldUser) => {
          if (!oldUser) {
            return oldUser;
          }

          const newBookmarks =
            (oldUser.bookmarks || []).filter(
              (id) => id !== postId
            );

          const updatedUser = {
            ...oldUser,
            bookmarks: newBookmarks,
            bookmarksCount:
              newBookmarks.length,
          };

          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );

          return updatedUser;
        });
      } else {
        alert(
          result.message ||
            "Failed to remove bookmark"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const userName = user?.name || "User";

  const username = user?.username
    ? `@${user.username}`
    : "@user";

  const userPhoto =
    user?.photo ||
    "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png";

  const followersCount =
    user?.followersCount ??
    user?.followers?.length ??
    0;

  const followingCount =
    user?.followingCount ??
    user?.following?.length ??
    0;

  const bookmarksCount =
    user?.bookmarksCount ??
    user?.bookmarks?.length ??
    0;

  return (
    <main className="min-h-screen bg-[#f0f2f5]">
      <div className="mx-auto max-w-7xl px-3 py-3.5">
        <main className="min-w-0">
          <div className="space-y-5 sm:space-y-6">

          

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">

        

              <div className="group/cover relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_36%)]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(186,230,253,.22)_0%,rgba(186,230,253,0)_44%)]" />

                <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/8 blur-3xl" />

                <div className="absolute right-8 top-6 h-48 w-48 rounded-full bg-[#c7e6ff]/10 blur-3xl" />

                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />

                <div className="pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 sm:right-3 sm:top-3 sm:max-w-none sm:gap-2">

                  <label className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
                    <Camera size={13} />
                    Add cover

                    <input
                      accept="image/*"
                      className="hidden"
                      type="file"
                    />
                  </label>

                </div>
              </div>

           

              <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">

                <div className="rounded-3xl border border-white/60 bg-white/92 p-5 backdrop-blur-xl sm:p-7">

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                    <div className="min-w-0">

                      <div className="flex items-end gap-4">

                    

                        <div className="group/avatar relative shrink-0">

                          <button
                            type="button"
                            className="cursor-zoom-in rounded-full"
                          >
                            <img
                              src={userPhoto}
                              alt={userName}
                              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                            />
                          </button>

                          <button
                            type="button"
                            className="absolute bottom-1 left-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100"
                            title="View profile photo"
                          >
                            <Expand size={16} />
                          </button>

                          <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100">
                            <Camera size={17} />

                            <input
                              accept="image/*"
                              className="hidden"
                              type="file"
                            />
                          </label>

                        </div>

                      

                        <div className="min-w-0 pb-1">

                          <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
                            {userName}
                          </h2>

                          <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">
                            {username}
                          </p>

                          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                            <Users size={13} />
                            Route Posts member
                          </div>

                        </div>

                      </div>

                    </div>

                  

                    <div className="grid w-full grid-cols-3 gap-2 lg:w-[520px]">

                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">

                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                          Followers
                        </p>

                        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                          {followersCount}
                        </p>

                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">

                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                          Following
                        </p>

                        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                          {followingCount}
                        </p>

                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">

                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                          Bookmarks
                        </p>

                        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                          {bookmarksCount}
                        </p>

                      </div>

                    </div>

                  </div>

                

                  <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                      <h3 className="text-sm font-extrabold text-slate-800">
                        About
                      </h3>

                      <div className="mt-3 space-y-2 text-sm text-slate-600">

                        <p className="flex items-center gap-2">

                          <Mail
                            size={15}
                            className="text-slate-500"
                          />

                          {user?.email ||
                            "No email available"}

                        </p>

                        <p className="flex items-center gap-2">

                          <Users
                            size={15}
                            className="text-slate-500"
                          />

                          Active on Route Posts

                        </p>

                      </div>

                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                      <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">

                        <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                          My posts
                        </p>

                        <p className="mt-1 text-2xl font-black text-slate-900">
                          {posts.length}
                        </p>

                      </div>

                      <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">

                        <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                          Saved posts
                        </p>

                        <p className="mt-1 text-2xl font-black text-slate-900">
                          {bookmarksCount}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </section>

       

            <section className="space-y-4">

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

                <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5 sm:inline-flex sm:w-auto sm:gap-0">

                  <button
                    onClick={() =>
                      setActiveTab("posts")
                    }
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                      activeTab === "posts"
                        ? "bg-white text-[#1877f2] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <FileText size={15} />
                    My Posts
                  </button>

                  <button
                    onClick={() =>
                      setActiveTab("saved")
                    }
                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                      activeTab === "saved"
                        ? "bg-white text-[#1877f2] shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Bookmark size={15} />
                    Saved
                  </button>

                </div>

                <span className="rounded-full bg-[#e7f3ff] px-3 py-1 text-xs font-bold text-[#1877f2]">
                  {activeTab === "posts"
                    ? posts.length
                    : savedPosts.length}
                </span>

              </div>

         

              {activeTab === "posts" && (
                <div className="space-y-3">

                  {loading ? (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                      Loading your posts...
                    </div>
                  ) : posts.length === 0 ? (
                    <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                      You have not posted yet.
                    </p>
                  ) : (
                    posts.map((post) => (
                      <article
                        key={post._id}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                      >

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-3">

                            <img
                              src={userPhoto}
                              alt={userName}
                              className="h-10 w-10 rounded-full object-cover"
                            />

                            <div>

                              <p className="font-extrabold text-slate-900">
                                {userName}
                              </p>

                              <p className="text-xs text-slate-500">
                                {post.createdAt
                                  ? new Date(
                                      post.createdAt
                                    ).toLocaleString()
                                  : ""}
                              </p>

                            </div>

                          </div>

                          <button
                            onClick={() =>
                              deletePost(post._id)
                            }
                            className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                            title="Delete post"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                        <button
                          onClick={() =>
                            navigate(
                              `/post/${post._id}`
                            )
                          }
                          className="mt-4 block w-full text-left"
                        >

                          <p className="text-[16px] leading-7 text-slate-800">
                            {post.body}
                          </p>

                          {post.image && (
                            <img
                              src={post.image}
                              alt="Post"
                              className="mt-4 max-h-[500px] w-full rounded-xl object-cover"
                            />
                          )}

                        </button>

                        <div className="mt-4 flex items-center gap-5 border-t border-slate-200 pt-3 text-sm font-bold text-slate-500">

                          <span className="flex items-center gap-1">
                            <Heart size={16} />
                            {post.likesCount || 0}
                          </span>

                          <span className="flex items-center gap-1">
                            <MessageCircle size={16} />
                            {post.commentsCount || 0}
                          </span>

                          <button
                            onClick={() =>
                              navigate(
                                `/post/${post._id}`
                              )
                            }
                            className="ml-auto text-[#1877f2] hover:underline"
                          >
                            View Post
                          </button>

                        </div>

                      </article>
                    ))
                  )}

                </div>
              )}

             

              {activeTab === "saved" && (
                <div className="space-y-3">

                  {savedPosts.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">

                      <Bookmark
                        size={28}
                        className="mx-auto text-slate-400"
                      />

                      <p className="mt-3 text-sm font-bold text-slate-600">
                        No saved posts yet
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Your bookmarked posts will appear here.
                      </p>

                    </div>
                  ) : (
                    savedPosts.map((post) => (
                      <article
                        key={post._id}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                      >

                        <div className="flex items-center gap-3">

                          <img
                            src={
                              post.user?.photo ||
                              userPhoto
                            }
                            alt={
                              post.user?.name ||
                              "User"
                            }
                            className="h-10 w-10 rounded-full object-cover"
                          />

                          <div>

                            <p className="font-extrabold text-slate-900">
                              {post.user?.name ||
                                "User"}
                            </p>

                            <p className="text-xs text-slate-500">
                              {post.createdAt
                                ? new Date(
                                    post.createdAt
                                  ).toLocaleString()
                                : ""}
                            </p>

                          </div>

                        </div>

                        <button
                          onClick={() =>
                            navigate(
                              `/post/${post._id}`
                            )
                          }
                          className="mt-4 block w-full text-left"
                        >

                          <p className="text-[16px] leading-7 text-slate-800">
                            {post.body}
                          </p>

                          {post.image && (
                            <img
                              src={post.image}
                              alt="Post"
                              className="mt-4 max-h-[500px] w-full rounded-xl object-cover"
                            />
                          )}

                        </button>

                        <div className="mt-4 flex items-center gap-5 border-t border-slate-200 pt-3 text-sm font-bold text-slate-500">

                          <span className="flex items-center gap-1">
                            <Heart size={16} />
                            {post.likesCount || 0}
                          </span>

                          <span className="flex items-center gap-1">
                            <MessageCircle size={16} />
                            {post.commentsCount || 0}
                          </span>

                          <div className="ml-auto flex items-center gap-3">

                            <button
                              onClick={() =>
                                removeBookmark(
                                  post._id
                                )
                              }
                              className="text-red-500 hover:underline"
                            >
                              Remove
                            </button>

                            <button
                              onClick={() =>
                                navigate(
                                  `/post/${post._id}`
                                )
                              }
                              className="text-[#1877f2] hover:underline"
                            >
                              View Post
                            </button>

                          </div>

                        </div>

                      </article>
                    ))
                  )}

                </div>
              )}

            </section>

          </div>
        </main>
      </div>
    </main>
  );
}

export default Profile;
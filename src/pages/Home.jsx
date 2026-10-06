import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Newspaper,
  Sparkles,
  Earth,
  Bookmark,
  Users,
  Image,
  Smile,
  Send,
  Search,
  UserPlus,
  Heart,
  MessageCircle,
  Trash2,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [activeMenu, setActiveMenu] = useState("Feed");
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editText, setEditText] = useState("");

  const suggestions = [
    {
      name: "Ahmed Abd Al-Muti",
      username: "@ahmedmutti",
      photo:
        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1775310477363-9f97d1ff-699a-4b66-a04f-bd6dee14d2b7-496835614_1859398661547861_5183785968671576388_n.webp",
      followers: 330,
    },
    {
      name: "Alaa Ashraf",
      username: "@alaaashraf",
      photo:
        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1775412292104-abcb6dbf-b0cd-4392-8084-3dc4d79abf8d-profile.webp",
      followers: 268,
    },
    {
      name: "MrMo",
      username: "@mrmo",
      photo:
        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linked-posts/1778937681231-9d4544cb-667c-4af2-95fe-78ac83b54f55-profile.webp",
      followers: 207,
    },
    {
      name: "menna",
      username: "@gbngssssb",
      photo:
        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
      followers: 166,
    },
    {
      name: "abdalla diaa",
      username: "@abdalla_diaa",
      photo:
        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1776007886436-57b1a765-2eec-4b09-9f80-6fa91a44ca94-qDEuDVfUSjCOIqgqwpn0pA.webp",
      followers: 161,
    },
  ];

  const menuItems = [
    {
      name: "Feed",
      icon: Newspaper,
    },
    {
      name: "My Posts",
      icon: Sparkles,
    },
    {
      name: "Community",
      icon: Earth,
    },
    {
      name: "Saved",
      icon: Bookmark,
    },
  ];

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://route-posts.routemisr.com/posts/feed?page=1&limit=20",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log(JSON.stringify(result, null, 2));

      if (response.ok) {
        setPosts(result.data.posts || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function createPost() {
    if (!postText.trim()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://route-posts.routemisr.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            body: postText.trim(),
          }),
        }
      );

      const result = await response.json();

      console.log(JSON.stringify(result, null, 2));

      if (response.ok) {
        setPostText("");
        await getPosts();
        alert("Post created successfully");
      } else {
        alert(result.message || "Failed to create post");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  async function likePost(postId) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://route-posts.routemisr.com/posts/${postId}/like`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log(JSON.stringify(result, null, 2));

      if (response.ok) {
        await getPosts();
      } else {
        alert(result.message || "Failed to like post");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function bookmarkPost(postId) {
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

      console.log(JSON.stringify(result, null, 2));

      if (response.ok) {
        await getPosts();
      } else {
        alert(result.message || "Failed to bookmark post");
      }
    } catch (error) {
      console.log(error);
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

      console.log("DELETE RESULT:", result);

      if (response.ok) {
        await getPosts();
        alert("Post deleted successfully");
      } else {
        alert(result.message || "Failed to delete post");
      }
    } catch (error) {
      console.log("DELETE ERROR:", error);
      alert("Something went wrong");
    }
  }

  function startEdit(post) {
    setEditingPostId(post._id);
    setEditText(post.body);
  }

  function cancelEdit() {
    setEditingPostId(null);
    setEditText("");
  }

  async function updatePost(postId) {
    if (!editText.trim()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://route-posts.routemisr.com/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            body: editText.trim(),
          }),
        }
      );

      const result = await response.json();

      console.log("UPDATE RESULT:", result);

      if (response.ok) {
        setEditingPostId(null);
        setEditText("");
        await getPosts();
        alert("Post updated successfully");
      } else {
        alert(result.message || "Failed to update post");
      }
    } catch (error) {
      console.log("UPDATE ERROR:", error);
      alert("Something went wrong");
    }
  }

  return (
    <main className="min-w-0 bg-[#f0f2f5] px-2 py-4 sm:px-4">
      <div className="mx-auto grid max-w-7xl gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">

        <aside className="hidden h-fit space-y-3 xl:sticky xl:top-[84px] xl:block">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeMenu === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
                    active
                      ? "bg-[#e7f3ff] text-[#1877f2]"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={17} />
                  {item.name}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="space-y-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm xl:hidden">
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = activeMenu === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveMenu(item.name)}
                    className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
                      active
                        ? "bg-[#e7f3ff] text-[#1877f2]"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon size={16} />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 xl:hidden">
            <button
              type="button"
              className="inline-flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm"
            >
              <span className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <Users size={17} className="text-[#1877f2]" />
                Suggested Friends
              </span>

              <span className="inline-flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                  5
                </span>

                <span className="text-xs font-bold text-[#1877f2]">
                  Show
                </span>
              </span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="mb-3 flex items-start gap-3">
              <img
                src={
                  user?.photo ||
                  "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                }
                alt={user?.name || "User"}
                className="h-11 w-11 rounded-full object-cover"
              />

              <div className="flex-1">
                <p className="text-base font-extrabold text-slate-900">
                  {user?.name || "User"}
                </p>

                <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                  <Earth size={12} />

                  <select className="bg-transparent outline-none">
                    <option value="public">Public</option>
                    <option value="following">Followers</option>
                    <option value="only_me">Only me</option>
                  </select>
                </div>
              </div>
            </div>

            <textarea
              rows="4"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={`What's on your mind, ${
                user?.name || "User"
              }?`}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3">

              <div className="relative flex items-center gap-2">

                <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                  <Image
                    size={18}
                    className="text-emerald-600"
                  />

                  <span className="hidden sm:inline">
                    Photo/video
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  <Smile
                    size={18}
                    className="text-amber-500"
                  />

                  <span className="hidden sm:inline">
                    Feeling/activity
                  </span>
                </button>

              </div>

              <button
                onClick={createPost}
                disabled={!postText.trim()}
                className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60"
              >
                Post
                <Send size={16} />
              </button>

            </div>
          </div>

          <div className="space-y-4">

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                Loading posts...
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                No posts yet. Be the first one to publish.
              </div>
            ) : (
              posts.map((post) => {

                const isMyPost =
                  post.user?._id === user?._id;

                return (
                  <div
                    key={post._id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <img
                          src={
                            post.user?.photo ||
                            "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                          }
                          alt={post.user?.name || "User"}
                          className="h-11 w-11 rounded-full object-cover"
                        />

                        <div>
                          <p className="font-extrabold text-slate-900">
                            {post.user?.name || "User"}
                          </p>

                          <p className="text-xs text-slate-500">
                            {new Date(
                              post.createdAt
                            ).toLocaleString()}
                          </p>
                        </div>

                      </div>

                      {isMyPost && (
                        <div className="flex items-center gap-1">

                          <button
                            onClick={() => startEdit(post)}
                            className="rounded-xl px-3 py-2 text-sm font-bold text-slate-500 transition hover:bg-blue-50 hover:text-[#1877f2]"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deletePost(post._id)}
                            className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                            title="Delete post"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      )}

                    </div>

                    {editingPostId === post._id ? (
                      <div className="mt-4">

                        <textarea
                          value={editText}
                          onChange={(e) =>
                            setEditText(e.target.value)
                          }
                          rows="4"
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[16px] leading-7 text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
                        />

                        <div className="mt-3 flex justify-end gap-2">

                          <button
                            onClick={cancelEdit}
                            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() =>
                              updatePost(post._id)
                            }
                            disabled={!editText.trim()}
                            className="rounded-xl bg-[#1877f2] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:opacity-60"
                          >
                            Save
                          </button>

                        </div>

                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          navigate(`/post/${post._id}`)
                        }
                        className="mt-4 block w-full text-left"
                      >
                        <p className="text-[16px] leading-7 text-slate-800">
                          {post.body}
                        </p>
                      </button>
                    )}

                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="mt-4 max-h-[500px] w-full rounded-xl object-cover"
                      />
                    )}

                    <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">

                      <button
                        onClick={() => likePost(post._id)}
                        className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
                          post.liked
                            ? "bg-red-50 text-red-500"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={
                            post.liked
                              ? "currentColor"
                              : "none"
                          }
                        />

                        <span>
                          {post.likesCount || 0}
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/post/${post._id}`)
                        }
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                      >
                        <MessageCircle size={18} />

                        <span>
                          {post.commentsCount || 0}
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          bookmarkPost(post._id)
                        }
                        className={`rounded-xl px-3 py-2 transition ${
                          post.bookmarked
                            ? "bg-blue-50 text-[#1877f2]"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <Bookmark
                          size={18}
                          fill={
                            post.bookmarked
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                    </div>

                  </div>
                );
              })
            )}

          </div>
        </section>

        <aside className="hidden h-fit xl:sticky xl:top-[84px] xl:block">

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="mb-3 flex items-center justify-between gap-2">

              <div className="flex items-center gap-2">

                <Users
                  size={18}
                  className="text-[#1877f2]"
                />

                <h3 className="text-base font-extrabold text-slate-900">
                  Suggested Friends
                </h3>

              </div>

              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                5
              </span>

            </div>

            <div className="mb-3">

              <label className="relative block">

                <Search
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  placeholder="Search friends..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
                />

              </label>

            </div>

            <div className="space-y-3">

              {suggestions.map((friend) => (
                <div
                  key={friend.username}
                  className="rounded-xl border border-slate-200 p-2.5"
                >

                  <div className="flex items-center justify-between gap-2">

                    <button
                      type="button"
                      className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                    >

                      <img
                        src={friend.photo}
                        alt={friend.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div className="min-w-0">

                        <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                          {friend.name}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          {friend.username}
                        </p>

                      </div>

                    </button>

                    <button className="inline-flex items-center gap-1 rounded-full bg-[#e7f3ff] px-3 py-1.5 text-xs font-bold text-[#1877f2] transition hover:bg-[#d8ebff]">
                      <UserPlus size={13} />
                      Follow
                    </button>

                  </div>

                  <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">

                    <span className="rounded-full bg-slate-100 px-2 py-0.5">
                      {friend.followers} followers
                    </span>

                  </div>

                </div>
              ))}

            </div>

            <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
              View more
            </button>

          </div>

        </aside>

      </div>
    </main>
  );
}

export default Home;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Bookmark,
  Send,
  MessageCircle,
  Pencil,
  Trash2,
} from "lucide-react";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  useEffect(() => {
    getPost();
    getComments();
  }, [id]);

  async function getPost() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://route-posts.routemisr.com/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log(JSON.stringify(result, null, 2));

      if (response.ok) {
        const posts = result.data.posts || [];

        const selectedPost = posts.find(
          (item) => item._id === id
        );

        setPost(selectedPost || null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getComments() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log(JSON.stringify(result, null, 2));

      if (response.ok) {
        setComments(result.data.comments || []);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createComment() {
    if (!commentText.trim()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://route-posts.routemisr.com/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: commentText.trim(),
          }),
        }
      );

      const result = await response.json();

      console.log("CREATE COMMENT:", result);

      if (response.ok) {
        setCommentText("");
        getComments();
      } else {
        alert(result.message || "Failed to create comment");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function likePost() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://route-posts.routemisr.com/posts/${id}/like`,
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
        getPost();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function bookmarkPost() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://route-posts.routemisr.com/posts/${id}/bookmark`,
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
        getPost();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function likeComment(commentId) {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://route-posts.routemisr.com/posts/${id}/comments/${commentId}/like`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log("LIKE COMMENT:", result);

      if (response.ok) {
        getComments();
      } else {
        alert(result.message || "Failed to like comment");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function startEditComment(comment) {
    setEditingCommentId(comment._id);
    setEditCommentText(
      comment.content || comment.body || ""
    );
  }

  function cancelEditComment() {
    setEditingCommentId(null);
    setEditCommentText("");
  }

  async function updateComment(commentId) {
    if (!editCommentText.trim()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://route-posts.routemisr.com/posts/${id}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: editCommentText.trim(),
          }),
        }
      );

      const result = await response.json();

      console.log("UPDATE COMMENT:", result);

      if (response.ok) {
        setEditingCommentId(null);
        setEditCommentText("");
        getComments();
      } else {
        alert(result.message || "Failed to update comment");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteComment(commentId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://route-posts.routemisr.com/posts/${id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log("DELETE COMMENT:", result);

      if (response.ok) {
        getComments();
      } else {
        alert(result.message || "Failed to delete comment");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function isMyComment(comment) {
    const currentUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    const currentUserId = currentUser?._id;

    const commentUserId =
      comment.commentCreator?._id ||
      comment.user?._id ||
      comment.createdBy?._id ||
      comment.author?._id;

    return (
      currentUserId &&
      commentUserId &&
      currentUserId === commentUserId
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f0f2f5] px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
          Loading post...
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-[#f0f2f5] px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-bold text-slate-700">
            Post not found
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-xl bg-[#1877f2] px-5 py-2 text-sm font-bold text-white"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f2f5] px-2 py-5 sm:px-4">
      <div className="mx-auto max-w-3xl">

        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

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
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <p className="mt-5 text-[17px] leading-8 text-slate-800">
            {post.body}
          </p>

          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="mt-4 max-h-[600px] w-full rounded-xl object-cover"
            />
          )}

          <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3">

            <button
              onClick={likePost}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-red-50 hover:text-red-500"
            >
              <Heart size={19} />

              <span>
                {post.likesCount || 0}
              </span>
            </button>

            <button
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600"
            >
              <MessageCircle size={19} />

              <span>
                {post.commentsCount || comments.length}
              </span>
            </button>

            <button
              onClick={bookmarkPost}
              className="rounded-xl px-3 py-2 text-slate-600 transition hover:bg-blue-50 hover:text-[#1877f2]"
            >
              <Bookmark size={19} />
            </button>

          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <h2 className="mb-4 text-lg font-extrabold text-slate-900">
            Comments
          </h2>

          <div className="mb-5 flex gap-2">

            <input
              type="text"
              value={commentText}
              onChange={(e) =>
                setCommentText(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createComment();
                }
              }}
              placeholder="Write a comment..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#1877f2] focus:bg-white"
            />

            <button
              onClick={createComment}
              disabled={!commentText.trim()}
              className="flex items-center justify-center rounded-xl bg-[#1877f2] px-4 text-white transition hover:bg-[#166fe5] disabled:opacity-50"
            >
              <Send size={18} />
            </button>

          </div>

          <div className="space-y-4">

            {comments.length === 0 ? (
              <p className="py-5 text-center text-sm text-slate-500">
                No comments yet.
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex gap-3"
                >

                  <img
                    src={
                      comment.commentCreator?.photo ||
                      comment.user?.photo ||
                      "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                    }
                    alt="User"
                    className="h-9 w-9 rounded-full object-cover"
                  />

                  <div className="flex-1 rounded-2xl bg-slate-100 px-4 py-3">

                    <div className="flex items-center justify-between gap-2">

                      <p className="text-sm font-extrabold text-slate-900">
                        {comment.commentCreator?.name ||
                          comment.user?.name ||
                          "User"}
                      </p>

                      {isMyComment(comment) && (
                        <div className="flex items-center gap-1">

                          <button
                            onClick={() =>
                              startEditComment(comment)
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-[#1877f2]"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            onClick={() =>
                              deleteComment(comment._id)
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-red-500"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>

                        </div>
                      )}

                    </div>

                    {editingCommentId === comment._id ? (
                      <div className="mt-2">

                        <textarea
                          value={editCommentText}
                          onChange={(e) =>
                            setEditCommentText(e.target.value)
                          }
                          rows="3"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#1877f2]"
                        />

                        <div className="mt-2 flex justify-end gap-2">

                          <button
                            onClick={cancelEditComment}
                            className="rounded-lg bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() =>
                              updateComment(comment._id)
                            }
                            disabled={!editCommentText.trim()}
                            className="rounded-lg bg-[#1877f2] px-3 py-2 text-xs font-bold text-white disabled:opacity-50"
                          >
                            Save
                          </button>

                        </div>

                      </div>
                    ) : (
                      <p className="mt-1 text-sm leading-6 text-slate-700">
                        {comment.content || comment.body}
                      </p>
                    )}

                    <div className="mt-2 flex items-center gap-3">

                      <p className="text-[11px] text-slate-500">
                        {comment.createdAt
                          ? new Date(
                              comment.createdAt
                            ).toLocaleString()
                          : ""}
                      </p>

                      <button
                        onClick={() =>
                          likeComment(comment._id)
                        }
                        className="flex items-center gap-1 text-xs font-bold text-slate-500 transition hover:text-red-500"
                      >
                        <Heart size={14} />

                        <span>
                          {comment.likesCount || 0}
                        </span>
                      </button>

                    </div>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </div>
    </main>
  );
}

export default PostDetails;
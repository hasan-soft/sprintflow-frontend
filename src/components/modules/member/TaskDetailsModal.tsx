"use client";

import {
  Calendar,
  FolderGit2,
  MessageSquare,
  Paperclip,
  Plus,
  Send,
  Upload,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import type { BoardTask, BoardTaskStatus } from "@/types";

export default function TaskDetailsModal({
  task,
  onClose,
  onStatusChange,
}: {
  task: BoardTask | null;
  onClose: () => void;
  onStatusChange?: (status: BoardTaskStatus) => void;
}) {
  const [attachments, setAttachments] = useState<string[]>(
    task?.attachments || [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    ],
  );
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<
    Array<{ id: string; author: string; text: string; time: string }>
  >([
    {
      id: "1",
      author: "Hasan Bhuiyan (Lead)",
      text: "Please verify mobile responsive breakpoints before pushing the pull request.",
      time: "2 hours ago",
    },
    {
      id: "2",
      author: "Product Team",
      text: "Figma design specs have been updated with dark mode color tokens.",
      time: "Yesterday",
    },
  ]);
  const [isUploading, setIsUploading] = useState(false);

  if (!task) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fakeUrl = URL.createObjectURL(file);
    setTimeout(() => {
      setAttachments((prev) => [...prev, fakeUrl]);
      setIsUploading(false);
      toast.success(`Attached "${file.name}" to task`);
    }, 600);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        author: "You (Member)",
        text: newComment.trim(),
        time: "Just now",
      },
    ]);
    setNewComment("");
    toast.success("Comment added");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-primary">
                {task.id}
              </span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <FolderGit2 className="size-3" />
                {task.project}
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              {task.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content Body Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-[1.8fr_1fr]">
          {/* Left Column: Description, Media Attachments & Comments */}
          <div className="space-y-6">
            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </h3>
              <p className="text-sm text-foreground/90 leading-relaxed bg-muted/30 p-3.5 rounded-xl border border-border/60">
                {task.description ||
                  "Ensure optimal mobile responsiveness, smooth interactions, and proper error states across desktop and small screens."}
              </p>
            </div>

            {/* Media & Attachments Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Paperclip className="size-3.5" />
                  <span>Attachments & Screenshots ({attachments.length})</span>
                </h3>
                <label className="cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                  <Plus className="size-3.5" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {attachments.map((img, i) => (
                  <div
                    key={img}
                    className="group relative aspect-video overflow-hidden rounded-xl border border-border/70 bg-muted"
                  >
                    <Image
                      src={img}
                      alt={`Task screenshot ${i + 1}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                ))}
                {isUploading && (
                  <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-primary/50 bg-primary/5 text-xs font-medium text-primary animate-pulse">
                    <Upload className="size-4 animate-bounce mr-1" />
                    Uploading...
                  </div>
                )}
              </div>
            </div>

            {/* Discussion / Comments Section */}
            <div className="space-y-3 border-t pt-5">
              <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <MessageSquare className="size-3.5" />
                <span>Team Discussion ({comments.length})</span>
              </h3>

              <div className="space-y-2.5">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-xl border border-border/60 bg-background p-3 text-xs space-y-1 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">
                        {c.author}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {c.time}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-normal">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleAddComment} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Write a reply or task note..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition"
                >
                  <Send className="size-3" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Meta Information & Status Controls */}
          <div className="space-y-5 rounded-xl border border-border/70 bg-muted/30 p-4">
            {/* Status Selector */}
            <div className="space-y-1.5">
              <label
                htmlFor="task-status-select"
                className="text-xs font-medium text-muted-foreground"
              >
                Task Status
              </label>
              <select
                id="task-status-select"
                value={task.status}
                onChange={(e) => {
                  const val = e.target.value as BoardTaskStatus;
                  onStatusChange?.(val);
                  toast.success(`Task moved to "${val}"`);
                }}
                className="w-full rounded-lg border border-border bg-background p-2 text-xs font-semibold text-foreground focus:outline-none"
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Review">Review</option>
                <option value="Blocked">Blocked</option>
                <option value="Done">Done</option>
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-1.5">
              <span className="block text-xs font-medium text-muted-foreground">
                Priority
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
                    task.priority === "High"
                      ? "bg-rose-500/10 text-rose-600 border border-rose-500/30"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {task.priority} Priority
                </span>
              </div>
            </div>

            {/* Assignee */}
            <div className="space-y-1.5 border-t border-border/60 pt-3">
              <span className="block text-xs font-medium text-muted-foreground">
                Assignee
              </span>
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary text-xs">
                  <User className="size-3.5" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-foreground">
                    {task.assignee || "Assigned Contributor"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    SprintFlow Team
                  </p>
                </div>
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-1.5 border-t border-border/60 pt-3">
              <span className="block text-xs font-medium text-muted-foreground">
                Sprint Due Date
              </span>
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <Calendar className="size-3.5 text-primary" />
                <span>{task.dueDate || "Oct 21, 2026"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

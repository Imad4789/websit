import { jsx, jsxs } from "react/jsx-runtime";
import { MotionConfig, motion, AnimatePresence } from "framer-motion";
import { LogOut, Lock, LayoutDashboard, Megaphone, Image, Users, Settings, Mail, Palette, FileDown, Plus, GripVertical, Trash2, Search, Eye, EyeOff, ArrowUp, ArrowDown, Upload } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { d as defaultSiteContent, a as adminTokenStorageKey, o as orderedSections, c as createId } from "./router-BNEWEZK3.js";
import { i as isSupabaseBrowserConfigured, s as subscribeToCmsDataChanges, u as upsertCmsContentToSupabase, f as fetchCmsContentFromSupabase } from "./supabaseCms-ct_QYyCK.js";
import "@tanstack/react-router";
import "node:crypto";
import "@supabase/supabase-js";
const adminEase = [0.22, 1, 0.36, 1];
const tabs = [
  { id: "builder", label: "Builder", icon: /* @__PURE__ */ jsx(LayoutDashboard, { size: 17 }) },
  { id: "text", label: "Text", icon: /* @__PURE__ */ jsx(Megaphone, { size: 17 }) },
  { id: "media", label: "Media", icon: /* @__PURE__ */ jsx(Image, { size: 17 }) },
  { id: "levels", label: "Levels", icon: /* @__PURE__ */ jsx(Users, { size: 17 }) },
  { id: "subjects", label: "Subjects", icon: /* @__PURE__ */ jsx(Settings, { size: 17 }) },
  { id: "teachers", label: "Teachers", icon: /* @__PURE__ */ jsx(Users, { size: 17 }) },
  { id: "contact", label: "Contact", icon: /* @__PURE__ */ jsx(Mail, { size: 17 }) },
  { id: "design", label: "Design", icon: /* @__PURE__ */ jsx(Palette, { size: 17 }) },
  { id: "registrations", label: "Registrations", icon: /* @__PURE__ */ jsx(FileDown, { size: 17 }) },
  { id: "messages", label: "Messages", icon: /* @__PURE__ */ jsx(Mail, { size: 17 }) },
  { id: "setup", label: "Setup", icon: /* @__PURE__ */ jsx(Lock, { size: 17 }) }
];
const sectionTypes = [
  "custom",
  "about",
  "levels",
  "subjects",
  "teachers",
  "gallery",
  "whyUs",
  "registration",
  "contact"
];
function adminReveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.42, delay, ease: adminEase }
  };
}
function adminHover(lift = 2) {
  return {
    whileHover: { y: -lift },
    whileTap: { scale: 0.985, y: 0 },
    transition: { duration: 0.22, ease: adminEase }
  };
}
function cloneContent(content) {
  return JSON.parse(JSON.stringify(content));
}
function authHeaders(token) {
  return {
    authorization: `Bearer ${token}`
  };
}
function readStoredToken() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(adminTokenStorageKey) || "";
}
function csvEscape(value) {
  const normalized = value.replace(/\r?\n/g, " ");
  return `"${normalized.replace(/"/g, '""')}"`;
}
async function filesToDataUrls(files) {
  const readers = Array.from(files).map(
    (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    })
  );
  return Promise.all(readers);
}
function LoginPanel({ onLogin }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!response.ok) throw new Error("Invalid password");
      const data = await response.json();
      window.localStorage.setItem(adminTokenStorageKey, data.token);
      onLogin(data.token);
    } catch {
      setError("Password incorrect or admin API unavailable.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(motion.div, { ...adminReveal(), className: "min-h-screen bg-slate-950 flex items-center justify-center px-5", children: /* @__PURE__ */ jsxs(motion.form, { ...adminHover(3), onSubmit: submit, className: "premium-card w-full max-w-md rounded-lg bg-white p-7 shadow-2xl", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: loading ? { scale: [1, 1.06, 1] } : { scale: 1 },
        transition: { duration: 0.8, repeat: loading ? Infinity : 0, ease: "easeInOut" },
        className: "w-12 h-12 rounded-lg bg-slate-950 text-white flex items-center justify-center mb-5",
        children: /* @__PURE__ */ jsx(Lock, { size: 22 })
      }
    ),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-slate-950", children: "Center Tyani Admin" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-2", children: "Protected CMS dashboard with session management." }),
    /* @__PURE__ */ jsxs("label", { className: "block mt-6", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wide text-slate-600", children: "Admin password" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          value: password,
          onChange: (event) => setPassword(event.target.value),
          className: "mt-2 w-full rounded-lg border border-slate-200 px-4 py-3",
          autoFocus: true
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: error && /* @__PURE__ */ jsx(
      motion.p,
      {
        initial: { opacity: 0, y: -6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        className: "text-sm text-red-600 mt-3",
        children: error
      }
    ) }),
    /* @__PURE__ */ jsx(motion.button, { ...adminHover(2), type: "submit", disabled: loading, className: "premium-button mt-6 w-full rounded-lg bg-slate-950 text-white font-bold py-3 disabled:opacity-60", children: loading ? "Signing in..." : "Sign in" })
  ] }) });
}
function Field({
  label,
  value,
  onChange,
  multiline,
  type = "text"
}) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsx("span", { className: "block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2", children: label }),
    multiline ? /* @__PURE__ */ jsx("textarea", { value, onChange: (event) => onChange(event.target.value), rows: 4, className: "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm resize-none" }) : /* @__PURE__ */ jsx("input", { type, value, onChange: (event) => onChange(event.target.value), className: "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" })
  ] });
}
function Toggle({ checked, onChange, label }) {
  return /* @__PURE__ */ jsxs(
    motion.button,
    {
      ...adminHover(1),
      type: "button",
      onClick: () => onChange(!checked),
      className: `inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-bold ${checked ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-50 text-slate-500 border-slate-200"}`,
      children: [
        checked ? /* @__PURE__ */ jsx(Eye, { size: 16 }) : /* @__PURE__ */ jsx(EyeOff, { size: 16 }),
        label
      ]
    }
  );
}
function DropUpload({ label, onUpload, multiple = true }) {
  const [over, setOver] = useState(false);
  const handleFiles = async (files) => {
    const urls = await filesToDataUrls(files);
    onUpload(urls);
  };
  const drop = async (event) => {
    event.preventDefault();
    setOver(false);
    await handleFiles(event.dataTransfer.files);
  };
  return /* @__PURE__ */ jsxs(
    motion.label,
    {
      ...adminHover(1),
      onDragOver: (event) => {
        event.preventDefault();
        setOver(true);
      },
      onDragLeave: () => setOver(false),
      onDrop: drop,
      className: `premium-card rounded-lg border border-dashed p-5 flex flex-col items-center justify-center text-center cursor-pointer ${over ? "border-slate-950 bg-slate-100" : "border-slate-300 bg-slate-50"}`,
      children: [
        /* @__PURE__ */ jsx(motion.span, { animate: over ? { y: [-2, 2, -2] } : { y: 0 }, transition: { duration: 0.9, repeat: over ? Infinity : 0, ease: "easeInOut" }, children: /* @__PURE__ */ jsx(Upload, { size: 22, className: "text-slate-500" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-700 mt-2", children: label }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 mt-1", children: "Drag and drop or click to upload" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            multiple,
            className: "hidden",
            onChange: (event) => {
              if (event.target.files) void handleFiles(event.target.files);
              event.target.value = "";
            }
          }
        )
      ]
    }
  );
}
function StatusPill({ state }) {
  const label = state === "saving" ? "Saving..." : state === "saved" ? "Saved to Supabase" : state === "error" ? "Supabase save failed" : "Ready";
  const color = state === "error" ? "bg-amber-100 text-amber-800" : state === "saved" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-700";
  return /* @__PURE__ */ jsx(
    motion.span,
    {
      initial: { opacity: 0, y: -4, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      className: `rounded-full px-3 py-1 text-xs font-bold ${color}`,
      children: label
    },
    state
  );
}
function SectionEditor({
  section,
  onChange,
  onDelete
}) {
  return /* @__PURE__ */ jsxs(motion.div, { ...adminReveal(), layout: true, className: "premium-card rounded-lg border border-slate-200 bg-white p-5 space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-slate-400 font-bold", children: section.type }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-slate-950", children: section.label })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx(Toggle, { checked: section.visible, onChange: (visible) => onChange({ visible }), label: section.visible ? "Visible" : "Hidden" }),
        /* @__PURE__ */ jsxs("select", { value: section.status, onChange: (event) => onChange({ status: event.target.value }), className: "rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold", children: [
          /* @__PURE__ */ jsx("option", { value: "published", children: "Published" }),
          /* @__PURE__ */ jsx("option", { value: "draft", children: "Draft" })
        ] }),
        /* @__PURE__ */ jsx(motion.button, { ...adminHover(1), type: "button", onClick: onDelete, className: "rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(Field, { label: "Navigation label", value: section.label, onChange: (label) => onChange({ label }) }),
      /* @__PURE__ */ jsx(Field, { label: "Eyebrow", value: section.eyebrow, onChange: (eyebrow) => onChange({ eyebrow }) }),
      /* @__PURE__ */ jsx(Field, { label: "Title", value: section.title, onChange: (title) => onChange({ title }) }),
      /* @__PURE__ */ jsx(Field, { label: "Subtitle", value: section.subtitle, onChange: (subtitle) => onChange({ subtitle }) })
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "Description", value: section.body, onChange: (body) => onChange({ body }), multiline: true }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(Field, { label: "Image or banner URL", value: section.image, onChange: (image) => onChange({ image }) }),
      /* @__PURE__ */ jsx(DropUpload, { label: "Upload section image", multiple: false, onUpload: (urls) => onChange({ image: urls[0] ?? section.image }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(Field, { label: "Primary button label", value: section.primaryButton?.label ?? "", onChange: (label) => onChange({ primaryButton: { label, href: section.primaryButton?.href ?? "#registration" } }) }),
      /* @__PURE__ */ jsx(Field, { label: "Primary button link", value: section.primaryButton?.href ?? "", onChange: (href) => onChange({ primaryButton: { label: section.primaryButton?.label ?? "", href } }) }),
      /* @__PURE__ */ jsx(Field, { label: "Secondary button label", value: section.secondaryButton?.label ?? "", onChange: (label) => onChange({ secondaryButton: { label, href: section.secondaryButton?.href ?? "#contact" } }) }),
      /* @__PURE__ */ jsx(Field, { label: "Secondary button link", value: section.secondaryButton?.href ?? "", onChange: (href) => onChange({ secondaryButton: { label: section.secondaryButton?.label ?? "", href } }) })
    ] })
  ] });
}
function BuilderTab({ content, mutate }) {
  const [dragId, setDragId] = useState(null);
  const [newType, setNewType] = useState("custom");
  const sections = orderedSections(content);
  const reorder = (targetId) => {
    if (!dragId || dragId === targetId) return;
    mutate((draft) => {
      const sorted = orderedSections(draft);
      const from = sorted.findIndex((section) => section.id === dragId);
      const to = sorted.findIndex((section) => section.id === targetId);
      const [moved] = sorted.splice(from, 1);
      if (!moved) return;
      sorted.splice(to, 0, moved);
      draft.sections = sorted.map((section, order) => ({ ...section, order }));
    });
    setDragId(null);
  };
  const addSection = () => {
    mutate((draft) => {
      draft.sections.push({
        id: createId(newType),
        type: newType,
        label: newType === "custom" ? "New section" : newType,
        eyebrow: "New",
        title: "New section title",
        subtitle: "",
        body: "Edit this section from the admin dashboard.",
        image: "",
        visible: true,
        status: "draft",
        order: draft.sections.length,
        primaryButton: { label: "Contact", href: "#contact" }
      });
    });
  };
  return /* @__PURE__ */ jsxs(motion.div, { ...adminReveal(), className: "space-y-5", children: [
    /* @__PURE__ */ jsx(Panel, { title: "Add new section", action: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("select", { value: newType, onChange: (event) => setNewType(event.target.value), className: "rounded-lg border border-slate-200 px-3 py-2 text-sm", children: sectionTypes.map((type) => /* @__PURE__ */ jsx("option", { value: type, children: type }, type)) }),
      /* @__PURE__ */ jsxs(motion.button, { ...adminHover(1), type: "button", onClick: addSection, className: "premium-button rounded-lg bg-slate-950 text-white px-3 py-2 inline-flex items-center gap-2 text-sm font-bold", children: [
        /* @__PURE__ */ jsx(Plus, { size: 16 }),
        "Add"
      ] })
    ] }), children: /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Drag sections to reorder them. Toggle visibility or switch content between draft and published." }) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: sections.map((section) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        layout: true,
        ...adminHover(2),
        draggable: true,
        onDragStart: () => setDragId(section.id),
        onDragOver: (event) => event.preventDefault(),
        onDrop: () => reorder(section.id),
        className: "premium-card rounded-lg border border-slate-200 bg-white p-4 flex flex-col lg:flex-row lg:items-center gap-4",
        children: [
          /* @__PURE__ */ jsx(GripVertical, { size: 18, className: "text-slate-400" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-black text-slate-950", children: section.label }),
              /* @__PURE__ */ jsx("span", { className: "rounded-full bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1", children: section.type }),
              /* @__PURE__ */ jsx("span", { className: `rounded-full text-xs font-bold px-2 py-1 ${section.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`, children: section.status })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-1", children: section.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx(Toggle, { checked: section.visible, onChange: (visible) => mutate((draft) => {
              const target = draft.sections.find((item) => item.id === section.id);
              if (target) target.visible = visible;
            }), label: section.visible ? "Shown" : "Hidden" }),
            /* @__PURE__ */ jsx(motion.button, { ...adminHover(1), type: "button", onClick: () => mutate((draft) => {
              const target = draft.sections.find((item) => item.id === section.id);
              if (target) target.status = target.status === "published" ? "draft" : "published";
            }), className: "rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold", children: "Publish" })
          ] })
        ]
      },
      section.id
    )) })
  ] });
}
function TextTab({ content, mutate }) {
  return /* @__PURE__ */ jsx(motion.div, { ...adminReveal(), className: "space-y-5", children: orderedSections(content).map((section) => /* @__PURE__ */ jsx(
    SectionEditor,
    {
      section,
      onChange: (patch) => mutate((draft) => {
        const target = draft.sections.find((item) => item.id === section.id);
        if (target) Object.assign(target, patch);
      }),
      onDelete: () => mutate((draft) => {
        draft.sections = draft.sections.filter((item) => item.id !== section.id).map((item, order) => ({ ...item, order }));
      })
    },
    section.id
  )) });
}
function AnnouncementsTab({ content, mutate }) {
  const addAnnouncement = (kind) => {
    mutate((draft) => {
      draft.announcements.push({
        id: createId(kind),
        title: kind === "promotion" ? "New promotion" : "New announcement",
        message: "Edit this message.",
        kind,
        visible: true
      });
    });
  };
  return /* @__PURE__ */ jsx(Panel, { title: "Announcements and promotions", action: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsx(motion.button, { ...adminHover(1), type: "button", onClick: () => addAnnouncement("announcement"), className: "rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold", children: "Add announcement" }),
    /* @__PURE__ */ jsx(motion.button, { ...adminHover(1), type: "button", onClick: () => addAnnouncement("promotion"), className: "premium-button rounded-lg bg-slate-950 text-white px-3 py-2 text-sm font-bold", children: "Add promotion" })
  ] }), children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: content.announcements.map((item) => /* @__PURE__ */ jsxs(motion.div, { layout: true, ...adminHover(1), className: "premium-card rounded-lg border border-slate-200 p-4 grid md:grid-cols-[1fr_1fr_auto] gap-3 items-end", children: [
    /* @__PURE__ */ jsx(Field, { label: "Title", value: item.title, onChange: (title) => mutate((draft) => {
      const target = draft.announcements.find((entry) => entry.id === item.id);
      if (target) target.title = title;
    }) }),
    /* @__PURE__ */ jsx(Field, { label: "Message", value: item.message, onChange: (message) => mutate((draft) => {
      const target = draft.announcements.find((entry) => entry.id === item.id);
      if (target) target.message = message;
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(Toggle, { checked: item.visible, label: "Visible", onChange: (visible) => mutate((draft) => {
        const target = draft.announcements.find((entry) => entry.id === item.id);
        if (target) target.visible = visible;
      }) }),
      /* @__PURE__ */ jsx(motion.button, { ...adminHover(1), type: "button", onClick: () => mutate((draft) => {
        draft.announcements = draft.announcements.filter((entry) => entry.id !== item.id);
      }), className: "rounded-lg border border-red-200 text-red-700 px-3 py-2", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) })
    ] })
  ] }, item.id)) }) });
}
function MediaTab({ content, mutate }) {
  const addAlbum = () => mutate((draft) => {
    draft.galleryAlbums.push({ id: createId("album"), title: "New album", description: "", visible: true, images: [] });
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsx(Panel, { title: "Logo and homepage banners", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(ImageSetting, { title: "Logo", value: content.design.logoUrl, onChange: (logoUrl) => mutate((draft) => {
        draft.design.logoUrl = logoUrl;
      }) }),
      /* @__PURE__ */ jsx(ImageSetting, { title: "Hero banner", value: content.design.heroImage, onChange: (heroImage) => mutate((draft) => {
        draft.design.heroImage = heroImage;
      }) }),
      /* @__PURE__ */ jsx(ImageSetting, { title: "Background image", value: content.design.backgroundImage, onChange: (backgroundImage) => mutate((draft) => {
        draft.design.backgroundImage = backgroundImage;
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(Panel, { title: "Gallery albums", action: /* @__PURE__ */ jsxs("button", { type: "button", onClick: addAlbum, className: "rounded-lg bg-slate-950 text-white px-3 py-2 text-sm font-bold inline-flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Plus, { size: 16 }),
      "Album"
    ] }), children: /* @__PURE__ */ jsx("div", { className: "space-y-5", children: content.galleryAlbums.map((album) => /* @__PURE__ */ jsx(AlbumEditor, { album, mutate }, album.id)) }) })
  ] });
}
function ImageSetting({ title, value, onChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-200 p-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-black text-slate-950 mb-3", children: title }),
    value && /* @__PURE__ */ jsx("img", { src: value, alt: title, className: "w-full aspect-[4/3] object-cover rounded-lg mb-3" }),
    /* @__PURE__ */ jsx(Field, { label: "Image URL", value, onChange }),
    /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(DropUpload, { label: `Upload ${title}`, multiple: false, onUpload: (urls) => onChange(urls[0] ?? value) }) })
  ] });
}
function AlbumEditor({ album, mutate }) {
  const patchAlbum = (patch) => mutate((draft) => {
    const target = draft.galleryAlbums.find((item) => item.id === album.id);
    if (target) Object.assign(target, patch);
  });
  const patchImage = (imageId, patch) => mutate((draft) => {
    const targetAlbum = draft.galleryAlbums.find((item) => item.id === album.id);
    const targetImage = targetAlbum?.images.find((image) => image.id === imageId);
    if (targetImage) Object.assign(targetImage, patch);
  });
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-200 p-4 space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_1fr_auto] gap-3 items-end", children: [
      /* @__PURE__ */ jsx(Field, { label: "Album title", value: album.title, onChange: (title) => patchAlbum({ title }) }),
      /* @__PURE__ */ jsx(Field, { label: "Description", value: album.description, onChange: (description) => patchAlbum({ description }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(Toggle, { checked: album.visible, label: "Visible", onChange: (visible) => patchAlbum({ visible }) }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => mutate((draft) => {
          draft.galleryAlbums = draft.galleryAlbums.filter((item) => item.id !== album.id);
        }), className: "rounded-lg border border-red-200 text-red-700 px-3 py-2", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(DropUpload, { label: "Upload gallery photos", onUpload: (urls) => mutate((draft) => {
      const target = draft.galleryAlbums.find((item) => item.id === album.id);
      if (!target) return;
      target.images.push(...urls.map((src) => ({ id: createId("image"), src, caption: "New image", featured: false })));
    }) }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: album.images.map((image) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-200 p-3", children: [
      /* @__PURE__ */ jsx("img", { src: image.src, alt: image.caption, className: "w-full aspect-[4/3] object-cover rounded-lg mb-3" }),
      /* @__PURE__ */ jsx(Field, { label: "Caption", value: image.caption, onChange: (caption) => patchImage(image.id, { caption }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-3", children: [
        /* @__PURE__ */ jsx(Toggle, { checked: image.featured, label: "Featured", onChange: (featured) => patchImage(image.id, { featured }) }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => mutate((draft) => {
          const target = draft.galleryAlbums.find((item) => item.id === album.id);
          if (target) target.images = target.images.filter((entry) => entry.id !== image.id);
        }), className: "rounded-lg border border-red-200 text-red-700 px-3 py-2", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) })
      ] })
    ] }, image.id)) })
  ] });
}
function LevelsTab({ content, mutate }) {
  const addLevel = () => mutate((draft) => {
    draft.levels.push({ id: createId("level"), name: "New level", label: "", icon: "school", description: "", grades: ["New grade"], visible: true });
  });
  return /* @__PURE__ */ jsx(ListPanel, { title: "Academic levels", onAdd: addLevel, children: content.levels.map((level) => /* @__PURE__ */ jsx(LevelEditor, { level, mutate }, level.id)) });
}
function LevelEditor({ level, mutate }) {
  const patch = (patchValue) => mutate((draft) => {
    const target = draft.levels.find((item) => item.id === level.id);
    if (target) Object.assign(target, patchValue);
  });
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-200 p-4 space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsx(Field, { label: "Name", value: level.name, onChange: (name) => patch({ name }) }),
      /* @__PURE__ */ jsx(Field, { label: "Label", value: level.label, onChange: (label) => patch({ label }) }),
      /* @__PURE__ */ jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsx("span", { className: "block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2", children: "Icon" }),
        /* @__PURE__ */ jsxs("select", { value: level.icon, onChange: (event) => patch({ icon: event.target.value }), className: "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsx("option", { value: "school", children: "School" }),
          /* @__PURE__ */ jsx("option", { value: "book", children: "Book" }),
          /* @__PURE__ */ jsx("option", { value: "award", children: "Award" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "Description", value: level.description, onChange: (description) => patch({ description }), multiline: true }),
    /* @__PURE__ */ jsx(Field, { label: "Grades, comma separated", value: level.grades.join(", "), onChange: (grades) => patch({ grades: grades.split(",").map((grade) => grade.trim()).filter(Boolean) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(Toggle, { checked: level.visible, label: "Visible", onChange: (visible) => patch({ visible }) }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => mutate((draft) => {
        draft.levels = draft.levels.filter((item) => item.id !== level.id);
      }), className: "rounded-lg border border-red-200 text-red-700 px-3 py-2", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) })
    ] })
  ] });
}
function SubjectsTab({ content, mutate }) {
  const subjects = [...content.subjects].sort((a, b) => a.order - b.order);
  const addSubject = () => mutate((draft) => {
    draft.subjects.push({ id: createId("subject"), name: "New subject", icon: "calculator", description: "", visible: true, order: draft.subjects.length });
  });
  const moveSubject = (id, direction) => mutate((draft) => {
    const sorted = [...draft.subjects].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex((item2) => item2.id === id);
    const target = index + direction;
    if (target < 0 || target >= sorted.length) return;
    const [item] = sorted.splice(index, 1);
    if (!item) return;
    sorted.splice(target, 0, item);
    draft.subjects = sorted.map((subject, order) => ({ ...subject, order }));
  });
  return /* @__PURE__ */ jsx(ListPanel, { title: "Subjects", onAdd: addSubject, children: subjects.map((subject) => /* @__PURE__ */ jsx(SubjectEditor, { subject, mutate, move: (direction) => moveSubject(subject.id, direction) }, subject.id)) });
}
function SubjectEditor({ subject, mutate, move }) {
  const patch = (patchValue) => mutate((draft) => {
    const target = draft.subjects.find((item) => item.id === subject.id);
    if (target) Object.assign(target, patchValue);
  });
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-200 p-4 space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_180px_auto] gap-3 items-end", children: [
      /* @__PURE__ */ jsx(Field, { label: "Name", value: subject.name, onChange: (name) => patch({ name }) }),
      /* @__PURE__ */ jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsx("span", { className: "block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2", children: "Icon" }),
        /* @__PURE__ */ jsxs("select", { value: subject.icon, onChange: (event) => patch({ icon: event.target.value }), className: "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsx("option", { value: "calculator", children: "Calculator" }),
          /* @__PURE__ */ jsx("option", { value: "atom", children: "Science" }),
          /* @__PURE__ */ jsx("option", { value: "dna", children: "SVT" }),
          /* @__PURE__ */ jsx("option", { value: "languages", children: "Languages" }),
          /* @__PURE__ */ jsx("option", { value: "message", children: "Speaking" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => move(-1), className: "rounded-lg border border-slate-200 p-2", children: /* @__PURE__ */ jsx(ArrowUp, { size: 16 }) }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => move(1), className: "rounded-lg border border-slate-200 p-2", children: /* @__PURE__ */ jsx(ArrowDown, { size: 16 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Field, { label: "Description", value: subject.description, onChange: (description) => patch({ description }), multiline: true }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(Toggle, { checked: subject.visible, label: "Visible", onChange: (visible) => patch({ visible }) }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => mutate((draft) => {
        draft.subjects = draft.subjects.filter((item) => item.id !== subject.id);
      }), className: "rounded-lg border border-red-200 text-red-700 px-3 py-2", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) })
    ] })
  ] });
}
function TeachersTab({ content, mutate }) {
  const addTeacher = () => mutate((draft) => {
    draft.teachers.push({ id: createId("teacher"), name: "New teacher", photo: draft.design.logoUrl, specialty: "Specialty", bio: "", visible: true });
  });
  return /* @__PURE__ */ jsx(ListPanel, { title: "Teachers", onAdd: addTeacher, children: content.teachers.map((teacher) => /* @__PURE__ */ jsx(TeacherEditor, { teacher, mutate }, teacher.id)) });
}
function TeacherEditor({ teacher, mutate }) {
  const patch = (patchValue) => mutate((draft) => {
    const target = draft.teachers.find((item) => item.id === teacher.id);
    if (target) Object.assign(target, patchValue);
  });
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-200 p-4 grid lg:grid-cols-[220px_1fr] gap-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("img", { src: teacher.photo, alt: teacher.name, className: "w-full aspect-square object-cover rounded-lg mb-3" }),
      /* @__PURE__ */ jsx(DropUpload, { label: "Upload teacher photo", multiple: false, onUpload: (urls) => patch({ photo: urls[0] ?? teacher.photo }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: "Teacher name", value: teacher.name, onChange: (name) => patch({ name }) }),
        /* @__PURE__ */ jsx(Field, { label: "Specialty", value: teacher.specialty, onChange: (specialty) => patch({ specialty }) })
      ] }),
      /* @__PURE__ */ jsx(Field, { label: "Bio", value: teacher.bio, onChange: (bio) => patch({ bio }), multiline: true }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(Toggle, { checked: teacher.visible, label: "Visible", onChange: (visible) => patch({ visible }) }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => mutate((draft) => {
          draft.teachers = draft.teachers.filter((item) => item.id !== teacher.id);
        }), className: "rounded-lg border border-red-200 text-red-700 px-3 py-2", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) })
      ] })
    ] })
  ] });
}
function ContactTab({ content, mutate }) {
  return /* @__PURE__ */ jsx(Panel, { title: "Contact management", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
    /* @__PURE__ */ jsx(Field, { label: "Phone number", value: content.contact.phone, onChange: (phone) => mutate((draft) => {
      draft.contact.phone = phone;
    }) }),
    /* @__PURE__ */ jsx(Field, { label: "WhatsApp number", value: content.contact.whatsapp, onChange: (whatsapp) => mutate((draft) => {
      draft.contact.whatsapp = whatsapp;
    }) }),
    /* @__PURE__ */ jsx(Field, { label: "Email", value: content.contact.email, onChange: (email) => mutate((draft) => {
      draft.contact.email = email;
    }) }),
    /* @__PURE__ */ jsx(Field, { label: "Address", value: content.contact.address, onChange: (address) => mutate((draft) => {
      draft.contact.address = address;
    }) }),
    /* @__PURE__ */ jsx(Field, { label: "Facebook URL", value: content.contact.facebook, onChange: (facebook) => mutate((draft) => {
      draft.contact.facebook = facebook;
    }) }),
    /* @__PURE__ */ jsx(Field, { label: "Instagram URL", value: content.contact.instagram, onChange: (instagram) => mutate((draft) => {
      draft.contact.instagram = instagram;
    }) }),
    /* @__PURE__ */ jsx(Field, { label: "Google Maps URL", value: content.contact.mapsUrl, onChange: (mapsUrl) => mutate((draft) => {
      draft.contact.mapsUrl = mapsUrl;
    }) }),
    /* @__PURE__ */ jsx(Field, { label: "Google Maps embed URL", value: content.contact.mapsEmbed, onChange: (mapsEmbed) => mutate((draft) => {
      draft.contact.mapsEmbed = mapsEmbed;
    }) })
  ] }) });
}
function DesignTab({ content, mutate }) {
  return /* @__PURE__ */ jsxs(Panel, { title: "Design management", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 xl:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(Field, { type: "color", label: "Primary color", value: content.design.primaryColor, onChange: (primaryColor) => mutate((draft) => {
        draft.design.primaryColor = primaryColor;
      }) }),
      /* @__PURE__ */ jsx(Field, { type: "color", label: "Accent color", value: content.design.accentColor, onChange: (accentColor) => mutate((draft) => {
        draft.design.accentColor = accentColor;
      }) }),
      /* @__PURE__ */ jsx(Field, { type: "color", label: "Dark color", value: content.design.darkColor, onChange: (darkColor) => mutate((draft) => {
        draft.design.darkColor = darkColor;
      }) }),
      /* @__PURE__ */ jsx(Field, { type: "color", label: "Light background", value: content.design.lightBackground, onChange: (lightBackground) => mutate((draft) => {
        draft.design.lightBackground = lightBackground;
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4 mt-5", children: [
      /* @__PURE__ */ jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsx("span", { className: "block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2", children: "Homepage layout" }),
        /* @__PURE__ */ jsxs("select", { value: content.design.homepageLayout, onChange: (event) => mutate((draft) => {
          draft.design.homepageLayout = event.target.value;
        }), className: "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsx("option", { value: "classic", children: "Classic" }),
          /* @__PURE__ */ jsx("option", { value: "compact", children: "Compact" }),
          /* @__PURE__ */ jsx("option", { value: "gallery-first", children: "Gallery first" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsx(Toggle, { checked: content.design.animationsEnabled, label: "Animations", onChange: (animationsEnabled) => mutate((draft) => {
        draft.design.animationsEnabled = animationsEnabled;
      }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsx(Field, { label: "SEO title", value: content.seoTitle, onChange: (seoTitle) => mutate((draft) => {
      draft.seoTitle = seoTitle;
    }) }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(Field, { label: "SEO description", value: content.seoDescription, onChange: (seoDescription) => mutate((draft) => {
      draft.seoDescription = seoDescription;
    }), multiline: true }) })
  ] });
}
function RegistrationsTab({
  token,
  registrations,
  setRegistrations,
  levels,
  subjects
}) {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return registrations.filter((record) => {
      const matchesSearch = [record.fullName, record.phone, record.parentPhone, record.message].join(" ").toLowerCase().includes(query);
      const matchesLevel = !level || record.academicLevel === level;
      const matchesSubject = !subject || record.selectedSubject === subject;
      return matchesSearch && matchesLevel && matchesSubject;
    });
  }, [level, registrations, search, subject]);
  const exportCsv = () => {
    const header = ["Date", "Full Name", "Phone", "Parent Phone", "Academic Level", "Subject", "Message", "Status"];
    const rows = filtered.map((record) => [
      record.createdAt,
      record.fullName,
      record.phone,
      record.parentPhone,
      record.academicLevel,
      record.selectedSubject,
      record.message,
      record.status
    ]);
    const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `center-tyani-registrations-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const remove = async (id) => {
    await fetch(`/api/registrations?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: authHeaders(token)
    });
    setRegistrations(registrations.filter((record) => record.id !== id));
  };
  return /* @__PURE__ */ jsxs(Panel, { title: "Student registrations", action: /* @__PURE__ */ jsxs("button", { type: "button", onClick: exportCsv, className: "rounded-lg bg-slate-950 text-white px-3 py-2 text-sm font-bold inline-flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(FileDown, { size: 16 }),
    "Export CSV"
  ] }), children: [
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1fr_220px_220px] gap-3 mb-5", children: [
      /* @__PURE__ */ jsxs("label", { className: "relative block", children: [
        /* @__PURE__ */ jsx(Search, { size: 17, className: "absolute left-3 top-3 text-slate-400" }),
        /* @__PURE__ */ jsx("input", { value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Search registrations", className: "w-full rounded-lg border border-slate-200 pl-10 pr-3 py-2.5 text-sm" })
      ] }),
      /* @__PURE__ */ jsxs("select", { value: level, onChange: (event) => setLevel(event.target.value), className: "rounded-lg border border-slate-200 px-3 py-2.5 text-sm", children: [
        /* @__PURE__ */ jsx("option", { value: "", children: "All levels" }),
        levels.map((item) => /* @__PURE__ */ jsx("option", { value: item.name, children: item.name }, item.id))
      ] }),
      /* @__PURE__ */ jsxs("select", { value: subject, onChange: (event) => setSubject(event.target.value), className: "rounded-lg border border-slate-200 px-3 py-2.5 text-sm", children: [
        /* @__PURE__ */ jsx("option", { value: "", children: "All subjects" }),
        subjects.map((item) => /* @__PURE__ */ jsx("option", { value: item.name, children: item.name }, item.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
      /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-xs uppercase tracking-wide text-slate-500 border-b", children: [
          /* @__PURE__ */ jsx("th", { className: "py-3 pr-4", children: "Student" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 pr-4", children: "Phones" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 pr-4", children: "Level" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 pr-4", children: "Subject" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 pr-4", children: "Message" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 pr-4", children: "Date" }),
          /* @__PURE__ */ jsx("th", { className: "py-3", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: filtered.map((record) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-slate-100 align-top", children: [
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 font-bold text-slate-950", children: record.fullName }),
          /* @__PURE__ */ jsxs("td", { className: "py-3 pr-4 text-slate-600", children: [
            record.phone,
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: record.parentPhone })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-600", children: record.academicLevel }),
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-600", children: record.selectedSubject }),
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-500 max-w-xs", children: record.message }),
          /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-500", children: new Date(record.createdAt).toLocaleString() }),
          /* @__PURE__ */ jsx("td", { className: "py-3", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: () => void remove(record.id), className: "rounded-lg border border-red-200 text-red-700 p-2", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) }) })
        ] }, record.id)) })
      ] }),
      !filtered.length && /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 py-8 text-center", children: "No registrations found." })
    ] })
  ] });
}
function MessagesTab({ token, messages, setMessages }) {
  const remove = async (id) => {
    await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: authHeaders(token)
    });
    setMessages(messages.filter((message) => message.id !== id));
  };
  return /* @__PURE__ */ jsx(Panel, { title: "Contact messages", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
    messages.map((message) => /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-slate-200 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-black text-slate-950", children: message.fullName }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500", children: [
          message.phone,
          " ",
          message.email
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700 mt-3", children: message.message }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-3", children: new Date(message.createdAt).toLocaleString() })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => void remove(message.id), className: "rounded-lg border border-red-200 text-red-700 p-2", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) })
    ] }) }, message.id)),
    !messages.length && /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 py-8 text-center", children: "No contact messages found." })
  ] }) });
}
function SetupTab({ databaseConfigured }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsx(Panel, { title: "Backend status", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(StatusCard, { label: "Admin routes", value: "Protected by password session" }),
      /* @__PURE__ */ jsx(StatusCard, { label: "CMS database", value: databaseConfigured ? "Supabase live sync configured" : "Set VITE Supabase env vars", warning: !databaseConfigured }),
      /* @__PURE__ */ jsx(StatusCard, { label: "Email", value: "Resend API via server route" })
    ] }) }),
    /* @__PURE__ */ jsxs(Panel, { title: "Required environment variables", children: [
      /* @__PURE__ */ jsx("pre", { className: "rounded-lg bg-slate-950 text-slate-100 text-xs p-4 overflow-x-auto", children: `ADMIN_PASSWORD=Ixvm67@@tyani
ADMIN_SESSION_SECRET=change-this-long-random-secret
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_key
RESEND_FROM_EMAIL=Center Tyani <notifications@yourdomain.com>` }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-4", children: "The CMS reads and writes the public cms_data row with the browser Supabase client. Registrations and messages still use server routes." })
    ] })
  ] });
}
function StatusCard({ label, value, warning }) {
  return /* @__PURE__ */ jsxs(motion.div, { ...adminHover(1), className: `premium-card rounded-lg border p-4 ${warning ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"}`, children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-slate-500 font-bold", children: label }),
    /* @__PURE__ */ jsx("p", { className: "font-black text-slate-950 mt-1", children: value })
  ] });
}
function Panel({ title, children, action }) {
  return /* @__PURE__ */ jsxs(motion.section, { ...adminReveal(), layout: true, className: "premium-card rounded-lg border border-slate-200 bg-white p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-slate-950", children: title }),
      action
    ] }),
    children
  ] });
}
function ListPanel({ title, children, onAdd }) {
  return /* @__PURE__ */ jsx(Panel, { title, action: /* @__PURE__ */ jsxs(motion.button, { ...adminHover(1), type: "button", onClick: onAdd, className: "premium-button rounded-lg bg-slate-950 text-white px-3 py-2 text-sm font-bold inline-flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(Plus, { size: 16 }),
    "Add"
  ] }), children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children }) });
}
function AdminDashboard() {
  const [token, setToken] = useState("");
  const [tab, setTab] = useState("builder");
  const [content, setContent] = useState(defaultSiteContent);
  const [saveState, setSaveState] = useState("idle");
  const [dirty, setDirty] = useState(false);
  const [databaseConfigured, setDatabaseConfigured] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setToken(readStoredToken());
    setDatabaseConfigured(isSupabaseBrowserConfigured());
  }, []);
  useEffect(() => {
    if (!token) return;
    const load = async () => {
      try {
        setDatabaseConfigured(isSupabaseBrowserConfigured());
        setContent(await fetchCmsContentFromSupabase());
        const [registrationResponse, messageResponse] = await Promise.all([
          fetch("/api/registrations", { headers: authHeaders(token) }),
          fetch("/api/contact", { headers: authHeaders(token) })
        ]);
        if (registrationResponse.ok) {
          const data = await registrationResponse.json();
          setRegistrations(data.registrations);
        }
        if (messageResponse.ok) {
          const data = await messageResponse.json();
          setMessages(data.messages);
        }
      } catch {
        setSaveState("error");
      }
    };
    void load();
  }, [token]);
  useEffect(() => {
    if (!token) return;
    return subscribeToCmsDataChanges((remoteContent) => {
      if (dirty) return;
      setContent(remoteContent);
      setSaveState("saved");
    });
  }, [dirty, token]);
  useEffect(() => {
    if (!token || !dirty) return;
    setSaveState("saving");
    const timer = window.setTimeout(async () => {
      try {
        const savedContent = await upsertCmsContentToSupabase(content);
        setContent(savedContent);
        setDatabaseConfigured(true);
        setSaveState("saved");
        setDirty(false);
      } catch {
        setSaveState("error");
      }
    }, 650);
    return () => window.clearTimeout(timer);
  }, [content, dirty, token]);
  const mutate = (mutator) => {
    setContent((current) => {
      const draft = cloneContent(current);
      mutator(draft);
      draft.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      setDirty(true);
      return draft;
    });
  };
  const logout = () => {
    window.localStorage.removeItem(adminTokenStorageKey);
    setToken("");
  };
  const resetCms = () => {
    setContent(defaultSiteContent);
    setDirty(true);
  };
  if (!token) return /* @__PURE__ */ jsx(LoginPanel, { onLogin: setToken });
  return /* @__PURE__ */ jsx(MotionConfig, { transition: { duration: 0.34, ease: adminEase }, reducedMotion: "user", children: /* @__PURE__ */ jsxs(motion.div, { ...adminReveal(), className: "premium-page min-h-screen bg-slate-100", children: [
    /* @__PURE__ */ jsx(
      motion.header,
      {
        initial: { y: -18, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.42, ease: adminEase },
        className: "sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm",
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-slate-400 font-bold", children: "CMS Dashboard" }),
            /* @__PURE__ */ jsx("h1", { className: "font-black text-slate-950", children: content.siteName })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(StatusPill, { state: saveState }),
            /* @__PURE__ */ jsx(motion.a, { ...adminHover(1), href: "/", className: "hidden sm:inline-flex rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 no-underline", children: "View site" }),
            /* @__PURE__ */ jsxs(motion.button, { ...adminHover(1), type: "button", onClick: logout, className: "rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(LogOut, { size: 16 }),
              "Logout"
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 py-6 grid lg:grid-cols-[240px_1fr] gap-6", children: [
      /* @__PURE__ */ jsxs(motion.aside, { ...adminReveal(0.04), className: "premium-card rounded-lg bg-white border border-slate-200 p-3 h-fit lg:sticky lg:top-24", children: [
        /* @__PURE__ */ jsx("nav", { className: "grid gap-1", children: tabs.map((item) => /* @__PURE__ */ jsxs(
          motion.button,
          {
            ...adminHover(1),
            type: "button",
            onClick: () => setTab(item.id),
            className: `rounded-lg px-3 py-2.5 text-sm font-bold flex items-center gap-2 text-left ${tab === item.id ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"}`,
            children: [
              item.icon,
              item.label
            ]
          },
          item.id
        )) }),
        /* @__PURE__ */ jsx(motion.button, { ...adminHover(1), type: "button", onClick: resetCms, className: "mt-4 w-full rounded-lg border border-amber-200 bg-amber-50 text-amber-800 px-3 py-2 text-sm font-bold", children: "Reset CMS draft" })
      ] }),
      /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          transition: { duration: 0.26, ease: adminEase },
          children: [
            tab === "builder" && /* @__PURE__ */ jsx(BuilderTab, { content, mutate }),
            tab === "text" && /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsx(AnnouncementsTab, { content, mutate }),
              /* @__PURE__ */ jsx(TextTab, { content, mutate })
            ] }),
            tab === "media" && /* @__PURE__ */ jsx(MediaTab, { content, mutate }),
            tab === "levels" && /* @__PURE__ */ jsx(LevelsTab, { content, mutate }),
            tab === "subjects" && /* @__PURE__ */ jsx(SubjectsTab, { content, mutate }),
            tab === "teachers" && /* @__PURE__ */ jsx(TeachersTab, { content, mutate }),
            tab === "contact" && /* @__PURE__ */ jsx(ContactTab, { content, mutate }),
            tab === "design" && /* @__PURE__ */ jsx(DesignTab, { content, mutate }),
            tab === "registrations" && /* @__PURE__ */ jsx(
              RegistrationsTab,
              {
                token,
                registrations,
                setRegistrations,
                levels: content.levels,
                subjects: content.subjects
              }
            ),
            tab === "messages" && /* @__PURE__ */ jsx(MessagesTab, { token, messages, setMessages }),
            tab === "setup" && /* @__PURE__ */ jsx(SetupTab, { databaseConfigured })
          ]
        },
        tab
      ) }) })
    ] })
  ] }) });
}
const SplitComponent = AdminDashboard;
export {
  SplitComponent as component
};

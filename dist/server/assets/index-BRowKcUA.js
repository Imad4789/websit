import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { MotionConfig, motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Phone, Mail, MessageCircle, GraduationCap, X, Menu, Trophy, ZoomIn, CheckCircle, AlertCircle, Send, MapPin, Users, BookOpen, Heart, Award, School, FlaskConical, Dna, Languages, Calculator } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { o as orderedSections, d as defaultSiteContent } from "./router-BNEWEZK3.js";
import { c as cmsDataUpdatedEvent, s as subscribeToCmsDataChanges, f as fetchCmsContentFromSupabase } from "./supabaseCms-ct_QYyCK.js";
import "@tanstack/react-router";
import "node:crypto";
import "@supabase/supabase-js";
function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}
function Footer({ content = defaultSiteContent }) {
  const links = orderedSections(content).filter(
    (section) => section.visible && section.status === "published" && section.type !== "hero"
  );
  return /* @__PURE__ */ jsxs("footer", { className: "border-t", style: { background: "#0a101f", borderColor: `${content.design.primaryColor}33` }, children: [
    /* @__PURE__ */ jsx("div", { className: "h-[1px]", style: { background: content.design.primaryColor, opacity: 0.45 } }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 pt-14 pb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-10 mb-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx("img", { src: content.design.logoUrl, alt: content.siteName, className: "w-10 h-10 rounded-full object-cover border", style: { borderColor: content.design.primaryColor } }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-black text-white tracking-wide text-sm uppercase", children: content.siteName }),
              /* @__PURE__ */ jsx("div", { className: "text-white/35 text-xs", children: "Excellence Academique" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-white/45 text-xs leading-relaxed max-w-xs", children: "Centre de formation et cours de soutien a Belfaa. Nous accompagnons chaque eleve vers la reussite." }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-5", children: [
            /* @__PURE__ */ jsx("a", { href: content.contact.facebook, target: "_blank", rel: "noopener noreferrer", className: "w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/75 hover:text-white", children: /* @__PURE__ */ jsx(Facebook, { size: 15 }) }),
            /* @__PURE__ */ jsx("a", { href: content.contact.instagram, target: "_blank", rel: "noopener noreferrer", className: "w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/75 hover:text-white", children: /* @__PURE__ */ jsx(Instagram, { size: 15 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold text-sm mb-5 uppercase tracking-widest", children: "Navigation" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2.5", children: links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scrollTo(`#${link.id}`),
              className: "text-white/45 hover:text-white text-xs transition-colors bg-transparent border-0 cursor-pointer font-[inherit] text-left",
              children: link.label
            }
          ) }, link.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-semibold text-sm mb-5 uppercase tracking-widest", children: "Contact" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("a", { href: `tel:${content.contact.phone.replace(/\s/g, "")}`, className: "flex items-center gap-3 text-white/45 hover:text-white transition-colors no-underline text-xs", children: [
              /* @__PURE__ */ jsx(Phone, { size: 13, style: { color: content.design.primaryColor } }),
              content.contact.phone
            ] }),
            /* @__PURE__ */ jsxs("a", { href: `mailto:${content.contact.email}`, className: "flex items-center gap-3 text-white/45 hover:text-white transition-colors no-underline text-xs break-all", children: [
              /* @__PURE__ */ jsx(Mail, { size: 13, style: { color: content.design.primaryColor } }),
              content.contact.email
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scrollTo("#registration"),
              className: "rounded-md text-xs px-5 py-2.5 font-bold mt-6",
              style: { background: content.design.primaryColor, color: content.design.darkColor },
              children: "S'inscrire"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-white/25 text-xs", children: [
          "Copyright ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          content.siteName,
          ". Tous droits reserves."
        ] }),
        /* @__PURE__ */ jsx("a", { href: "/admin", className: "text-white/25 hover:text-white text-xs transition-colors no-underline font-medium tracking-wider", children: "Admin" })
      ] })
    ] })
  ] });
}
const sectionPadding = "py-20 md:py-28";
const premiumEase = [0.22, 1, 0.36, 1];
function scrollToTarget(href) {
  if (href.startsWith("#")) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  window.location.href = href;
}
function useCmsContent() {
  const [content, setContent] = useState(defaultSiteContent);
  useEffect(() => {
    const refresh = async () => {
      try {
        setContent(await fetchCmsContentFromSupabase());
      } catch {
        setContent(defaultSiteContent);
      }
    };
    const onCmsUpdate = (event) => {
      const detail = event.detail;
      if (detail) setContent(detail);
    };
    window.addEventListener(cmsDataUpdatedEvent, onCmsUpdate);
    const unsubscribe = subscribeToCmsDataChanges(setContent);
    void refresh();
    const timer = window.setInterval(refresh, 12e3);
    return () => {
      window.removeEventListener(cmsDataUpdatedEvent, onCmsUpdate);
      window.clearInterval(timer);
      unsubscribe();
    };
  }, []);
  return content;
}
function motionProps(content, delay = 0) {
  if (!content.design.animationsEnabled) return {};
  return {
    initial: { opacity: 0, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
    transition: { duration: 0.72, delay, ease: premiumEase }
  };
}
function interactiveProps(content, lift = 3) {
  if (!content.design.animationsEnabled) return {};
  return {
    whileHover: { y: -lift, scale: 1.015 },
    whileTap: { y: 0, scale: 0.985 },
    transition: { duration: 0.26, ease: premiumEase }
  };
}
function PageLoader({ enabled, color }) {
  const [visible, setVisible] = useState(enabled);
  useEffect(() => {
    if (!enabled) return;
    const timer = window.setTimeout(() => setVisible(false), 720);
    return () => window.clearTimeout(timer);
  }, [enabled]);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.35, ease: premiumEase },
      className: "fixed inset-x-0 top-0 z-[120] h-[3px] pointer-events-none",
      children: /* @__PURE__ */ jsx("div", { className: "loading-bar h-full", style: { background: color } })
    }
  ) });
}
function KineticBackdrop({ enabled }) {
  if (!enabled) return null;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 kinetic-lines opacity-10" }) });
}
function SectionHeading({ section, dark, content }) {
  return /* @__PURE__ */ jsxs(motion.div, { ...motionProps(content), className: "text-center mb-12 md:mb-16", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx("div", { className: "h-[3px] w-14 rounded-full", style: { background: content.design.primaryColor } }) }),
    section.eyebrow && /* @__PURE__ */ jsx(
      "p",
      {
        className: "text-xs font-semibold uppercase mb-3",
        style: { color: content.design.primaryColor, letterSpacing: "0.18em" },
        children: section.eyebrow
      }
    ),
    /* @__PURE__ */ jsx(
      "h2",
      {
        className: `text-3xl md:text-5xl font-black leading-tight ${dark ? "text-white" : "text-slate-950"}`,
        children: section.title
      }
    ),
    section.body && /* @__PURE__ */ jsx("p", { className: `mt-4 max-w-2xl mx-auto text-sm leading-relaxed ${dark ? "text-white/80" : "text-slate-600"}`, children: section.body })
  ] });
}
function Navbar({ content }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = orderedSections(content).filter((section) => section.visible && section.status === "published").map((section) => ({ label: section.label, href: `#${section.id}` }));
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.nav,
      {
        initial: content.design.animationsEnabled ? { y: -72, opacity: 0 } : false,
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.68, ease: premiumEase },
        className: "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        style: {
          background: scrolled ? content.design.darkColor : `${content.design.darkColor}f0`,
          boxShadow: scrolled ? "0 8px 28px rgba(0,0,0,0.22)" : "0 1px 0 rgba(255,255,255,0.08)"
        },
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto h-16 px-5 md:px-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(
            motion.button,
            {
              ...interactiveProps(content, 1),
              onClick: () => scrollToTarget("#hero"),
              className: "flex items-center gap-3 bg-transparent border-0 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("img", { src: content.design.logoUrl, alt: content.siteName, className: "w-9 h-9 rounded-full object-cover border", style: { borderColor: content.design.primaryColor } }),
                /* @__PURE__ */ jsx("span", { className: "text-white font-bold uppercase tracking-wide text-sm", children: content.siteName })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center gap-6", children: navItems.map((item) => /* @__PURE__ */ jsx(
            motion.button,
            {
              ...interactiveProps(content, 1),
              onClick: () => scrollToTarget(item.href),
              className: "nav-motion-link bg-transparent border-0 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wide cursor-pointer transition-colors",
              children: item.label
            },
            item.href
          )) }),
          /* @__PURE__ */ jsxs(
            motion.button,
            {
              ...interactiveProps(content, 2),
              onClick: () => scrollToTarget("#registration"),
              className: "premium-button hidden lg:inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold",
              style: { background: content.design.primaryColor, color: content.design.darkColor },
              children: [
                /* @__PURE__ */ jsx(GraduationCap, { size: 16 }),
                "S'inscrire"
              ]
            }
          ),
          /* @__PURE__ */ jsx(motion.button, { ...interactiveProps(content, 1), onClick: () => setOpen(!open), className: "lg:hidden text-white p-2 bg-transparent border-0", children: open ? /* @__PURE__ */ jsx(X, { size: 22 }) : /* @__PURE__ */ jsx(Menu, { size: 22 }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: content.design.animationsEnabled ? { opacity: 0, y: -14 } : false,
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.28, ease: premiumEase },
        className: "fixed top-16 left-0 right-0 z-40 lg:hidden border-t border-white/10",
        style: { background: content.design.darkColor },
        children: /* @__PURE__ */ jsx("div", { className: "px-6 py-5 flex flex-col gap-3", children: navItems.map((item, index) => /* @__PURE__ */ jsx(
          motion.button,
          {
            initial: content.design.animationsEnabled ? { opacity: 0, x: -12 } : false,
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.24, delay: index * 0.035, ease: premiumEase },
            onClick: () => {
              setOpen(false);
              scrollToTarget(item.href);
            },
            className: "text-left text-white/80 py-2 bg-transparent border-0 border-b border-white/10 cursor-pointer",
            children: item.label
          },
          item.href
        )) })
      }
    ) })
  ] });
}
function AnnouncementBar({ content }) {
  const visible = content.announcements.filter((item) => item.visible);
  if (!visible.length) return null;
  return /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-5xl mx-auto px-6 pt-24", children: /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: visible.map((item, index) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      ...motionProps(content, index * 0.04),
      className: "premium-card rounded-lg border px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-slate-950",
      style: { borderColor: `${content.design.primaryColor}55` },
      children: [
        /* @__PURE__ */ jsx("span", { className: "font-bold", style: { color: content.design.primaryColor }, children: item.kind === "promotion" ? "Promotion" : "Annonce" }),
        /* @__PURE__ */ jsxs("span", { className: "text-white/85", children: [
          item.title,
          ": ",
          item.message
        ] })
      ]
    },
    item.id
  )) }) });
}
function HeroSection({ section, content }) {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: section.id,
      className: "relative min-h-screen flex flex-col justify-center overflow-hidden",
      style: { background: content.design.darkColor },
      children: [
        /* @__PURE__ */ jsx("img", { src: section.image || content.design.heroImage, alt: "", className: "absolute inset-0 w-full h-full object-cover opacity-[0.12]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: `linear-gradient(135deg, ${content.design.darkColor} 0%, ${content.design.darkColor}ee 54%, #111827dd 100%)` } }),
        /* @__PURE__ */ jsx(KineticBackdrop, { enabled: content.design.animationsEnabled }),
        /* @__PURE__ */ jsx(AnnouncementBar, { content }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-5xl mx-auto px-6 py-16 text-center", children: [
          /* @__PURE__ */ jsxs(motion.div, { ...motionProps(content), className: "inline-flex items-center gap-2 rounded-full border px-4 py-2 mb-8 bg-slate-950", style: { borderColor: `${content.design.primaryColor}88`, color: content.design.primaryColor }, children: [
            /* @__PURE__ */ jsx(Trophy, { size: 14 }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wide", children: section.eyebrow })
          ] }),
          /* @__PURE__ */ jsx(motion.div, { ...motionProps(content, 0.08), className: "flex justify-center mb-8", children: /* @__PURE__ */ jsx("img", { src: content.design.logoUrl, alt: content.siteName, className: "w-28 h-28 rounded-full object-cover border-2 shadow-xl", style: { borderColor: content.design.primaryColor } }) }),
          /* @__PURE__ */ jsxs(motion.h1, { ...motionProps(content, 0.12), className: "text-5xl md:text-7xl font-black leading-none text-white mb-5", children: [
            /* @__PURE__ */ jsx("span", { style: { color: content.design.primaryColor }, children: section.title.split(" ")[0] || content.siteName }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { children: section.title.split(" ").slice(1).join(" ") || content.siteName })
          ] }),
          /* @__PURE__ */ jsx(motion.p, { ...motionProps(content, 0.18), className: "text-lg md:text-xl text-white/90 font-semibold mb-4", children: section.subtitle }),
          /* @__PURE__ */ jsx(motion.p, { ...motionProps(content, 0.22), className: "text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed mb-9", children: section.body }),
          /* @__PURE__ */ jsxs(motion.div, { ...motionProps(content, 0.28), className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            section.primaryButton && /* @__PURE__ */ jsxs(
              motion.button,
              {
                ...interactiveProps(content, 3),
                onClick: () => scrollToTarget(section.primaryButton?.href ?? "#registration"),
                className: "premium-button rounded-md px-7 py-3.5 font-bold inline-flex items-center justify-center gap-2",
                style: { background: content.design.primaryColor, color: content.design.darkColor },
                children: [
                  /* @__PURE__ */ jsx(GraduationCap, { size: 18 }),
                  section.primaryButton.label
                ]
              }
            ),
            section.secondaryButton && /* @__PURE__ */ jsx(
              motion.button,
              {
                ...interactiveProps(content, 3),
                onClick: () => scrollToTarget(section.secondaryButton?.href ?? "#contact"),
                className: "premium-button rounded-md px-7 py-3.5 font-bold border text-white",
                style: { borderColor: `${content.design.primaryColor}99` },
                children: section.secondaryButton.label
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function AboutSection({ section, content }) {
  const cards = [
    { icon: /* @__PURE__ */ jsx(Users, { size: 22 }), title: "Petits groupes", text: "Un suivi plus attentif pour chaque eleve." },
    { icon: /* @__PURE__ */ jsx(BookOpen, { size: 22 }), title: "Programmes adaptes", text: "Des cours alignes avec les besoins et les examens." },
    { icon: /* @__PURE__ */ jsx(Heart, { size: 22 }), title: "Suivi personnalise", text: "Un accompagnement regulier avec les familles." }
  ];
  return /* @__PURE__ */ jsx("section", { id: section.id, className: `${sectionPadding} bg-white`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
    /* @__PURE__ */ jsx(SectionHeading, { section, content }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10 lg:gap-14 items-center", children: [
      /* @__PURE__ */ jsx(motion.div, { ...motionProps(content, 0.08), ...interactiveProps(content, 2), className: "relative overflow-hidden rounded-lg", children: /* @__PURE__ */ jsx("img", { src: section.image || content.design.backgroundImage, alt: section.title, className: "w-full aspect-[4/3] object-cover rounded-lg transition-transform duration-700 ease-in-out hover:scale-[1.025]" }) }),
      /* @__PURE__ */ jsxs(motion.div, { ...motionProps(content, 0.14), children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-slate-950 mb-4", children: section.subtitle }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 leading-relaxed text-sm mb-7", children: section.body }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-3 gap-3", children: cards.map((card, index) => /* @__PURE__ */ jsxs(motion.div, { ...motionProps(content, 0.18 + index * 0.04), ...interactiveProps(content, 2), className: "premium-card soft-sheen rounded-lg border border-slate-200 p-4", children: [
          /* @__PURE__ */ jsx("div", { style: { color: content.design.primaryColor }, children: card.icon }),
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-slate-950 mt-3", children: card.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-1", children: card.text })
        ] }, card.title)) })
      ] })
    ] })
  ] }) });
}
function levelIcon(icon, color) {
  const props = { size: 30, style: { color } };
  if (icon === "book") return /* @__PURE__ */ jsx(BookOpen, { ...props });
  if (icon === "award") return /* @__PURE__ */ jsx(Award, { ...props });
  return /* @__PURE__ */ jsx(School, { ...props });
}
function LevelsSection({ section, content }) {
  return /* @__PURE__ */ jsx("section", { id: section.id, className: sectionPadding, style: { background: content.design.lightBackground }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
    /* @__PURE__ */ jsx(SectionHeading, { section, content }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-5", children: content.levels.filter((level) => level.visible).map((level, index) => /* @__PURE__ */ jsxs(motion.div, { ...motionProps(content, index * 0.06), ...interactiveProps(content, 4), className: "premium-card soft-sheen rounded-lg border border-slate-200 bg-white p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-lg flex items-center justify-center mb-5", style: { background: `${content.design.primaryColor}18` }, children: levelIcon(level.icon, content.design.primaryColor) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-slate-950", children: level.name }),
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold mt-1", style: { color: content.design.primaryColor }, children: level.label }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-4 leading-relaxed", children: level.description }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-5", children: level.grades.map((grade) => /* @__PURE__ */ jsx("span", { className: "rounded-full px-3 py-1 text-xs bg-slate-100 text-slate-600", children: grade }, grade)) })
    ] }, level.id)) })
  ] }) });
}
function subjectIcon(subject, color) {
  const props = { size: 30, style: { color } };
  if (subject.icon === "atom") return /* @__PURE__ */ jsx(FlaskConical, { ...props });
  if (subject.icon === "dna") return /* @__PURE__ */ jsx(Dna, { ...props });
  if (subject.icon === "languages") return /* @__PURE__ */ jsx(Languages, { ...props });
  if (subject.icon === "message") return /* @__PURE__ */ jsx(MessageCircle, { ...props });
  return /* @__PURE__ */ jsx(Calculator, { ...props });
}
function SubjectsSection({ section, content }) {
  const subjects = [...content.subjects].filter((subject) => subject.visible).sort((a, b) => a.order - b.order);
  return /* @__PURE__ */ jsx("section", { id: section.id, className: `${sectionPadding} bg-white`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
    /* @__PURE__ */ jsx(SectionHeading, { section, content }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-4", children: subjects.map((subject, index) => /* @__PURE__ */ jsxs(motion.div, { ...motionProps(content, index * 0.05), ...interactiveProps(content, 4), className: "premium-card soft-sheen rounded-lg border border-slate-200 p-5 bg-white hover:shadow-lg transition-shadow", children: [
      subjectIcon(subject, content.design.primaryColor),
      /* @__PURE__ */ jsx("h3", { className: "font-black text-slate-950 mt-4", children: subject.name }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 mt-2 leading-relaxed", children: subject.description })
    ] }, subject.id)) })
  ] }) });
}
function TeachersSection({ section, content }) {
  const teachers = content.teachers.filter((teacher) => teacher.visible);
  if (!teachers.length) return null;
  return /* @__PURE__ */ jsx("section", { id: section.id, className: sectionPadding, style: { background: content.design.lightBackground }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
    /* @__PURE__ */ jsx(SectionHeading, { section, content }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: teachers.map((teacher, index) => /* @__PURE__ */ jsxs(motion.div, { ...motionProps(content, index * 0.06), ...interactiveProps(content, 4), className: "premium-card rounded-lg bg-white border border-slate-200 overflow-hidden", children: [
      /* @__PURE__ */ jsx("img", { src: teacher.photo || content.design.logoUrl, alt: teacher.name, className: "w-full aspect-[4/3] object-cover transition-transform duration-700 ease-in-out hover:scale-[1.035]" }),
      /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wide", style: { color: content.design.primaryColor }, children: teacher.specialty }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-slate-950 mt-1", children: teacher.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-3 leading-relaxed", children: teacher.bio })
      ] })
    ] }, teacher.id)) })
  ] }) });
}
function GallerySection({ section, content }) {
  const [lightbox, setLightbox] = useState(null);
  const images = content.galleryAlbums.filter((album) => album.visible).flatMap((album) => album.images.map((image) => ({ ...image, album: album.title })));
  return /* @__PURE__ */ jsxs("section", { id: section.id, className: sectionPadding, style: { background: content.design.darkColor }, children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx(SectionHeading, { section, content, dark: true }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: images.map((image, index) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          ...motionProps(content, index * 0.04),
          ...interactiveProps(content, 2),
          onClick: () => setLightbox(image.src),
          className: "premium-card relative rounded-lg overflow-hidden border border-white/10 bg-transparent p-0 text-left group",
          style: { aspectRatio: image.featured ? "3/4" : "4/3" },
          children: [
            /* @__PURE__ */ jsx("img", { src: image.src, alt: image.caption, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
            /* @__PURE__ */ jsx("div", { className: "absolute left-3 bottom-3 right-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity", children: image.caption }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100", style: { background: content.design.primaryColor, color: content.design.darkColor }, children: /* @__PURE__ */ jsx(ZoomIn, { size: 15 }) })
          ]
        },
        image.id
      )) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: lightbox && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.25, ease: premiumEase },
        className: "fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4",
        onClick: () => setLightbox(null),
        children: [
          /* @__PURE__ */ jsx(
            motion.button,
            {
              ...interactiveProps(content, 1),
              className: "absolute top-5 right-5 rounded-full bg-white/15 text-white p-3",
              onClick: () => setLightbox(null),
              children: /* @__PURE__ */ jsx(X, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.img,
            {
              initial: { opacity: 0, scale: 0.96, y: 16 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.96, y: 12 },
              transition: { duration: 0.32, ease: premiumEase },
              src: lightbox,
              alt: "Gallery preview",
              className: "max-w-full max-h-[90vh] rounded-lg object-contain",
              onClick: (event) => event.stopPropagation()
            }
          )
        ]
      }
    ) })
  ] });
}
function WhyUsSection({ section, content }) {
  const items = [
    { icon: /* @__PURE__ */ jsx(GraduationCap, { size: 22 }), value: "500+", label: "Eleves formes" },
    { icon: /* @__PURE__ */ jsx(Trophy, { size: 22 }), value: "95%", label: "Taux de reussite" },
    { icon: /* @__PURE__ */ jsx(BookOpen, { size: 22 }), value: "8+", label: "Annees d'experience" },
    { icon: /* @__PURE__ */ jsx(Heart, { size: 22 }), value: "100%", label: "Satisfaction parents" }
  ];
  return /* @__PURE__ */ jsx("section", { id: section.id, className: `${sectionPadding} bg-white`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
    /* @__PURE__ */ jsx(SectionHeading, { section, content }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: items.map((item, index) => /* @__PURE__ */ jsxs(motion.div, { ...motionProps(content, index * 0.06), ...interactiveProps(content, 3), className: "premium-card rounded-lg p-6 text-center", style: { background: content.design.darkColor }, children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", style: { color: content.design.primaryColor }, children: item.icon }),
      /* @__PURE__ */ jsx("div", { className: "text-3xl font-black mt-3", style: { color: content.design.primaryColor }, children: item.value }),
      /* @__PURE__ */ jsx("div", { className: "text-white/80 text-xs font-semibold mt-1", children: item.label })
    ] }, item.label)) })
  ] }) });
}
function RegistrationSection({ section, content }) {
  const [state, setState] = useState("idle");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    parentPhone: "",
    academicLevel: "",
    selectedSubject: "",
    message: ""
  });
  const submit = async (event) => {
    event.preventDefault();
    setState("loading");
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok && response.status !== 202) throw new Error("Registration failed");
      setState("success");
    } catch {
      setState("error");
    }
  };
  return /* @__PURE__ */ jsx("section", { id: section.id, className: sectionPadding, style: { background: content.design.darkColor }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6", children: [
    /* @__PURE__ */ jsx(SectionHeading, { section, content, dark: true }),
    /* @__PURE__ */ jsx(motion.div, { ...motionProps(content, 0.08), className: "rounded-lg border border-white/20 bg-slate-950 p-6 md:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.22)]", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: state === "success" ? /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.96, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: -10 },
        transition: { duration: 0.3, ease: premiumEase },
        className: "text-center py-8",
        children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 40, className: "mx-auto mb-4", style: { color: content.design.primaryColor } }),
          /* @__PURE__ */ jsx("h3", { className: "text-white font-black text-xl", children: "Inscription envoyee" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/80 text-sm mt-2", children: "Merci. Notre equipe vous contactera bientot." }),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              ...interactiveProps(content, 2),
              onClick: () => {
                setState("idle");
                setForm({ fullName: "", phone: "", parentPhone: "", academicLevel: "", selectedSubject: "", message: "" });
              },
              className: "premium-button rounded-md px-5 py-3 mt-6 font-bold",
              style: { background: content.design.primaryColor, color: content.design.darkColor },
              children: "Nouvelle inscription"
            }
          )
        ]
      },
      "registration-success"
    ) : /* @__PURE__ */ jsxs(
      motion.form,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.28, ease: premiumEase },
        onSubmit: submit,
        className: "space-y-5",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsx(FormInput, { label: "Nom complet", value: form.fullName, onChange: (value) => setForm({ ...form, fullName: value }), required: true, dark: true }),
            /* @__PURE__ */ jsx(FormInput, { label: "Numero de telephone", value: form.phone, onChange: (value) => setForm({ ...form, phone: value }), required: true, dark: true })
          ] }),
          /* @__PURE__ */ jsx(FormInput, { label: "Telephone du parent", value: form.parentPhone, onChange: (value) => setForm({ ...form, parentPhone: value }), required: true, dark: true }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsx(FormSelect, { label: "Niveau scolaire", value: form.academicLevel, onChange: (value) => setForm({ ...form, academicLevel: value }), options: content.levels.filter((level) => level.visible).map((level) => level.name), dark: true }),
            /* @__PURE__ */ jsx(FormSelect, { label: "Matiere choisie", value: form.selectedSubject, onChange: (value) => setForm({ ...form, selectedSubject: value }), options: content.subjects.filter((subject) => subject.visible).map((subject) => subject.name), dark: true })
          ] }),
          /* @__PURE__ */ jsx(FormTextarea, { label: "Message optionnel", value: form.message, onChange: (value) => setForm({ ...form, message: value }), dark: true }),
          state === "error" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-red-200 bg-red-500/10 border border-red-300/20 rounded-lg px-4 py-3", children: [
            /* @__PURE__ */ jsx(AlertCircle, { size: 16 }),
            "Impossible d'envoyer le formulaire pour le moment."
          ] }),
          /* @__PURE__ */ jsx(motion.button, { ...interactiveProps(content, 2), type: "submit", disabled: state === "loading", className: "premium-button w-full rounded-md px-5 py-4 font-black disabled:opacity-60", style: { background: content.design.primaryColor, color: content.design.darkColor }, children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsx(
              motion.span,
              {
                animate: state === "loading" ? { rotate: 360 } : { rotate: 0 },
                transition: { duration: 0.9, repeat: state === "loading" ? Infinity : 0, ease: "linear" },
                className: "inline-flex",
                children: /* @__PURE__ */ jsx(Send, { size: 17 })
              }
            ),
            state === "loading" ? "Envoi en cours..." : "Envoyer ma demande d'inscription"
          ] }) })
        ]
      },
      "registration-form"
    ) }) })
  ] }) });
}
function ContactSection({ section, content }) {
  const [state, setState] = useState("idle");
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", message: "" });
  const submit = async (event) => {
    event.preventDefault();
    setState("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok && response.status !== 202) throw new Error("Contact failed");
      setState("success");
      setForm({ fullName: "", phone: "", email: "", message: "" });
    } catch {
      setState("error");
    }
  };
  const items = [
    { icon: /* @__PURE__ */ jsx(Phone, { size: 19 }), label: "Telephone", value: content.contact.phone, href: `tel:${content.contact.phone.replace(/\s/g, "")}` },
    { icon: /* @__PURE__ */ jsx(Mail, { size: 19 }), label: "Email", value: content.contact.email, href: `mailto:${content.contact.email}` },
    { icon: /* @__PURE__ */ jsx(MapPin, { size: 19 }), label: "Adresse", value: content.contact.address, href: content.contact.mapsUrl }
  ];
  return /* @__PURE__ */ jsx("section", { id: section.id, className: sectionPadding, style: { background: content.design.lightBackground }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
    /* @__PURE__ */ jsx(SectionHeading, { section, content }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        items.map((item, index) => /* @__PURE__ */ jsxs(motion.a, { ...motionProps(content, index * 0.04), ...interactiveProps(content, 3), href: item.href, target: item.href.startsWith("http") ? "_blank" : void 0, rel: "noopener noreferrer", className: "premium-card rounded-lg bg-white border border-slate-200 p-5 flex gap-4 items-center no-underline", children: [
          /* @__PURE__ */ jsx("span", { className: "w-11 h-11 rounded-lg flex items-center justify-center", style: { background: `${content.design.primaryColor}18`, color: content.design.primaryColor }, children: item.icon }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("span", { className: "block text-xs font-bold text-slate-500", children: item.label }),
            /* @__PURE__ */ jsx("span", { className: "block text-sm font-bold text-slate-950", children: item.value })
          ] })
        ] }, item.label)),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(motion.a, { ...interactiveProps(content, 2), href: content.contact.facebook, target: "_blank", rel: "noopener noreferrer", className: "rounded-lg bg-white border border-slate-200 p-3 text-slate-700", children: /* @__PURE__ */ jsx(Facebook, { size: 18 }) }),
          /* @__PURE__ */ jsx(motion.a, { ...interactiveProps(content, 2), href: content.contact.instagram, target: "_blank", rel: "noopener noreferrer", className: "rounded-lg bg-white border border-slate-200 p-3 text-slate-700", children: /* @__PURE__ */ jsx(Instagram, { size: 18 }) })
        ] }),
        /* @__PURE__ */ jsx("iframe", { title: `${content.siteName} map`, src: content.contact.mapsEmbed, className: "w-full h-72 rounded-lg border border-slate-200", loading: "lazy" })
      ] }),
      /* @__PURE__ */ jsxs(motion.form, { ...motionProps(content, 0.08), onSubmit: submit, className: "premium-card rounded-lg bg-white border border-slate-200 p-6 space-y-4", children: [
        /* @__PURE__ */ jsx(FormInput, { label: "Nom complet", value: form.fullName, onChange: (value) => setForm({ ...form, fullName: value }), required: true }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(FormInput, { label: "Telephone", value: form.phone, onChange: (value) => setForm({ ...form, phone: value }) }),
          /* @__PURE__ */ jsx(FormInput, { label: "Email", value: form.email, onChange: (value) => setForm({ ...form, email: value }) })
        ] }),
        /* @__PURE__ */ jsx(FormTextarea, { label: "Message", value: form.message, onChange: (value) => setForm({ ...form, message: value }), required: true }),
        state === "success" && /* @__PURE__ */ jsx("p", { className: "text-sm text-green-700", children: "Message envoye avec succes." }),
        state === "error" && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-700", children: "Impossible d'envoyer le message." }),
        /* @__PURE__ */ jsx(motion.button, { ...interactiveProps(content, 2), type: "submit", disabled: state === "loading", className: "premium-button rounded-md px-5 py-3 font-bold disabled:opacity-60", style: { background: content.design.primaryColor, color: content.design.darkColor }, children: state === "loading" ? "Envoi..." : "Envoyer le message" })
      ] })
    ] })
  ] }) });
}
function CustomSection({ section, content }) {
  return /* @__PURE__ */ jsx("section", { id: section.id, className: `${sectionPadding} bg-white`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
    /* @__PURE__ */ jsx(SectionHeading, { section, content }),
    section.image && /* @__PURE__ */ jsx(
      motion.img,
      {
        ...motionProps(content, 0.08),
        ...interactiveProps(content, 2),
        src: section.image,
        alt: section.title,
        className: "w-full rounded-lg object-cover max-h-[520px]"
      }
    )
  ] }) });
}
function FormInput({ label, value, onChange, required, dark }) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsx("span", { className: `block text-xs font-bold uppercase tracking-wide mb-2 ${dark ? "text-white/85" : "text-slate-600"}`, children: label }),
    /* @__PURE__ */ jsx("input", { value, onChange: (event) => onChange(event.target.value), required, className: `w-full rounded-lg px-4 py-3 text-sm border ${dark ? "bg-slate-900 border-white/25 text-white placeholder-white/45" : "bg-white border-slate-200 text-slate-950"}` })
  ] });
}
function FormTextarea({ label, value, onChange, required, dark }) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsx("span", { className: `block text-xs font-bold uppercase tracking-wide mb-2 ${dark ? "text-white/85" : "text-slate-600"}`, children: label }),
    /* @__PURE__ */ jsx("textarea", { value, onChange: (event) => onChange(event.target.value), required, rows: 4, className: `w-full rounded-lg px-4 py-3 text-sm border resize-none ${dark ? "bg-slate-900 border-white/25 text-white placeholder-white/45" : "bg-white border-slate-200 text-slate-950"}` })
  ] });
}
function FormSelect({ label, value, onChange, options, dark }) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsx("span", { className: `block text-xs font-bold uppercase tracking-wide mb-2 ${dark ? "text-white/85" : "text-slate-600"}`, children: label }),
    /* @__PURE__ */ jsxs("select", { value, onChange: (event) => onChange(event.target.value), required: true, className: `w-full rounded-lg px-4 py-3 text-sm border ${dark ? "bg-slate-950 border-white/15 text-white" : "bg-white border-slate-200 text-slate-950"}`, children: [
      /* @__PURE__ */ jsx("option", { value: "", children: "Selectionner" }),
      options.map((option) => /* @__PURE__ */ jsx("option", { value: option, children: option }, option))
    ] })
  ] });
}
function renderSection(section, content) {
  if (section.type === "hero") return /* @__PURE__ */ jsx(HeroSection, { section, content }, section.id);
  if (section.type === "about") return /* @__PURE__ */ jsx(AboutSection, { section, content }, section.id);
  if (section.type === "levels") return /* @__PURE__ */ jsx(LevelsSection, { section, content }, section.id);
  if (section.type === "subjects") return /* @__PURE__ */ jsx(SubjectsSection, { section, content }, section.id);
  if (section.type === "teachers") return /* @__PURE__ */ jsx(TeachersSection, { section, content }, section.id);
  if (section.type === "gallery") return /* @__PURE__ */ jsx(GallerySection, { section, content }, section.id);
  if (section.type === "whyUs") return /* @__PURE__ */ jsx(WhyUsSection, { section, content }, section.id);
  if (section.type === "registration") return /* @__PURE__ */ jsx(RegistrationSection, { section, content }, section.id);
  if (section.type === "contact") return /* @__PURE__ */ jsx(ContactSection, { section, content }, section.id);
  return /* @__PURE__ */ jsx(CustomSection, { section, content }, section.id);
}
function PublicSite() {
  const content = useCmsContent();
  const style = {
    "--gold": content.design.primaryColor,
    "--gold-light": content.design.accentColor,
    "--navy": content.design.darkColor
  };
  const sections = useMemo(() => {
    const visible = orderedSections(content).filter((section) => section.visible && section.status === "published");
    if (content.design.homepageLayout !== "gallery-first") return visible;
    const gallery = visible.find((section) => section.type === "gallery");
    return gallery ? [visible[0], gallery, ...visible.filter((section) => section.id !== gallery.id && section.id !== visible[0]?.id)].filter(Boolean) : visible;
  }, [content]);
  return /* @__PURE__ */ jsxs(MotionConfig, { transition: { duration: 0.42, ease: premiumEase }, reducedMotion: "user", children: [
    /* @__PURE__ */ jsx(PageLoader, { enabled: content.design.animationsEnabled, color: content.design.primaryColor }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: content.design.animationsEnabled ? { opacity: 0, y: 10 } : false,
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: premiumEase },
        className: "premium-page min-h-screen",
        style,
        children: [
          /* @__PURE__ */ jsx(Navbar, { content }),
          /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: sections.map((section) => renderSection(section, content)) }) }),
          /* @__PURE__ */ jsx(Footer, { content }),
          /* @__PURE__ */ jsx(
            motion.a,
            {
              href: `https://wa.me/${content.contact.whatsapp.replace(/[^\d]/g, "")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              initial: content.design.animationsEnabled ? { scale: 0, opacity: 0 } : false,
              animate: { scale: 1, opacity: 1 },
              whileHover: content.design.animationsEnabled ? { scale: 1.1, y: -3 } : void 0,
              whileTap: content.design.animationsEnabled ? { scale: 0.94 } : void 0,
              className: "fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg",
              style: { background: "#25d366" },
              "aria-label": "Contactez-nous sur WhatsApp",
              children: /* @__PURE__ */ jsx(MessageCircle, { size: 26, fill: "white", color: "white" })
            }
          )
        ]
      }
    )
  ] });
}
const SplitComponent = PublicSite;
export {
  SplitComponent as component
};

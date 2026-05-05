import { createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { timingSafeEqual, createHmac } from "node:crypto";
const adminPassword = "Ixvm67@@tyani";
const adminTokenStorageKey = "center-tyani-admin-token";
const logo = "/gallery/457477211_879188057607088_4773325454540207494_n.jpg";
const defaultSiteContent = {
  version: 1,
  updatedAt: (/* @__PURE__ */ new Date("2026-05-04T00:00:00.000Z")).toISOString(),
  siteName: "Center Tyani",
  seoTitle: "Center Tyani - Centre de Formation et Cours de Soutien",
  seoDescription: "Center Tyani a Belfaa: cours de soutien pour college, lycee et BAC en mathematiques, physique, SVT, francais et anglais.",
  design: {
    primaryColor: "#c9a227",
    accentColor: "#e8c84a",
    darkColor: "#0f172a",
    lightBackground: "#f5f5f5",
    logoUrl: logo,
    heroImage: "/gallery/pc.jpg",
    backgroundImage: "/gallery/waa3.jpg",
    animationsEnabled: true,
    homepageLayout: "classic"
  },
  contact: {
    phone: "+212 6 64 22 69 60",
    whatsapp: "+212664226960",
    email: "centretyanibelfaa@gmail.com",
    address: "Belfaa, Maroc",
    mapsUrl: "https://maps.app.goo.gl/VCZRBQQrZ2PJAU7U9",
    mapsEmbed: "https://maps.google.com/maps?q=Centre%20Tyani%20Belfaa&ll=30.047226,-9.5651862&z=16&hl=fr&output=embed",
    facebook: "https://www.facebook.com/profile.php?id=100065477044363",
    instagram: "https://instagram.com/centretyanibelfaa"
  },
  announcements: [
    {
      id: "announcement-new-groups",
      title: "Inscriptions ouvertes",
      message: "Les nouveaux groupes de soutien scolaire sont maintenant ouverts.",
      kind: "announcement",
      visible: true
    }
  ],
  sections: [
    {
      id: "hero",
      type: "hero",
      label: "Homepage hero",
      eyebrow: "Centre d'excellence academique",
      title: "CENTER TYANI",
      subtitle: "Centre de Formation et Cours de Soutien",
      body: "Helping students achieve academic excellence through professional support and modern learning.",
      image: "/gallery/pc.jpg",
      visible: true,
      status: "published",
      order: 0,
      primaryButton: { label: "S'inscrire Maintenant", href: "#registration" },
      secondaryButton: { label: "Nous Contacter", href: "#contact" }
    },
    {
      id: "about",
      type: "about",
      label: "About center",
      eyebrow: "Qui Sommes-Nous",
      title: "L'Excellence au Service de Votre Avenir",
      subtitle: "Une approche pedagogique moderne",
      body: "Center Tyani est un centre de formation et de soutien scolaire fonde avec la conviction que chaque eleve merite un accompagnement de qualite.",
      image: "/gallery/waa3.jpg",
      visible: true,
      status: "published",
      order: 1,
      primaryButton: { label: "S'inscrire", href: "#registration" },
      secondaryButton: { label: "En savoir plus", href: "#contact" }
    },
    {
      id: "levels",
      type: "levels",
      label: "Academic levels",
      eyebrow: "Niveaux Academiques",
      title: "Pour Chaque Niveau Scolaire",
      subtitle: "",
      body: "",
      image: "",
      visible: true,
      status: "published",
      order: 2
    },
    {
      id: "subjects",
      type: "subjects",
      label: "Subjects",
      eyebrow: "Matieres Enseignees",
      title: "Toutes les Matieres pour Reussir",
      subtitle: "",
      body: "",
      image: "",
      visible: true,
      status: "published",
      order: 3
    },
    {
      id: "teachers",
      type: "teachers",
      label: "Teachers",
      eyebrow: "Notre Equipe",
      title: "Des Enseignants Specialises",
      subtitle: "",
      body: "",
      image: "",
      visible: true,
      status: "published",
      order: 4
    },
    {
      id: "gallery",
      type: "gallery",
      label: "Gallery",
      eyebrow: "Notre Galerie",
      title: "La Vie au Centre Tyani",
      subtitle: "",
      body: "",
      image: "",
      visible: true,
      status: "published",
      order: 5
    },
    {
      id: "why-us",
      type: "whyUs",
      label: "Why choose us",
      eyebrow: "Pourquoi Nous Choisir",
      title: "Ce qui Nous Distingue",
      subtitle: "",
      body: "Professeurs qualifies, petits groupes, methodes modernes et suivi personnalise pour chaque eleve.",
      image: "",
      visible: true,
      status: "published",
      order: 6
    },
    {
      id: "registration",
      type: "registration",
      label: "Registration form",
      eyebrow: "Inscription",
      title: "Rejoignez Center Tyani",
      subtitle: "",
      body: "Remplissez le formulaire ci-dessous et notre equipe vous contactera dans les plus brefs delais.",
      image: "",
      visible: true,
      status: "published",
      order: 7
    },
    {
      id: "contact",
      type: "contact",
      label: "Contact",
      eyebrow: "Contactez-Nous",
      title: "Nous Sommes A Votre Ecoute",
      subtitle: "",
      body: "Envoyez-nous un message ou contactez-nous directement par telephone, WhatsApp ou email.",
      image: "",
      visible: true,
      status: "published",
      order: 8
    }
  ],
  levels: [
    {
      id: "college",
      name: "College",
      label: "1ere, 2eme et 3eme College",
      icon: "school",
      description: "Renforcement des bases scolaires et accompagnement des collegiens vers une progression continue.",
      grades: ["1ere College", "2eme College", "3eme College"],
      visible: true
    },
    {
      id: "lycee",
      name: "Lycee",
      label: "Tronc commun, 1ere Bac et 2eme Bac",
      icon: "book",
      description: "Preparation solide aux specialites du lycee avec un encadrement axe sur les resultats.",
      grades: ["Tronc commun", "1ere Bac", "2eme Bac"],
      visible: true
    },
    {
      id: "bac",
      name: "BAC",
      label: "Sciences Maths, Physiques et SVT",
      icon: "award",
      description: "Preparation intensive et ciblee pour reussir le Baccalaureat avec les meilleures notes.",
      grades: ["Sciences Maths", "Sciences Physiques", "Sciences de la Vie"],
      visible: true
    }
  ],
  subjects: [
    {
      id: "math",
      name: "Mathematiques",
      icon: "sigma",
      description: "Algebre, geometrie, analyse et probabilites pour tous les niveaux.",
      visible: true,
      order: 0
    },
    {
      id: "physics",
      name: "Physique",
      icon: "atom",
      description: "Mecanique, electricite, optique et thermodynamique.",
      visible: true,
      order: 1
    },
    {
      id: "svt",
      name: "SVT",
      icon: "dna",
      description: "Sciences de la vie et de la Terre pour les filieres scientifiques.",
      visible: true,
      order: 2
    },
    {
      id: "french",
      name: "Francais",
      icon: "languages",
      description: "Grammaire, expression ecrite, litterature et comprehension.",
      visible: true,
      order: 3
    },
    {
      id: "english",
      name: "English",
      icon: "message",
      description: "Grammar, vocabulary, reading, writing and spoken English.",
      visible: true,
      order: 4
    }
  ],
  teachers: [
    {
      id: "teacher-math",
      name: "Professeur de Mathematiques",
      photo: logo,
      specialty: "Mathematiques",
      bio: "Cours de soutien, preparation aux examens et suivi personnalise.",
      visible: true
    },
    {
      id: "teacher-science",
      name: "Professeur de Sciences",
      photo: "/gallery/ddd.jpg",
      specialty: "Physique et SVT",
      bio: "Explications pratiques, exercices corriges et methodes de travail.",
      visible: true
    }
  ],
  galleryAlbums: [
    {
      id: "activities",
      title: "Activites du centre",
      description: "Photos des cours, evenements et espaces du centre.",
      visible: true,
      images: [
        {
          id: "gallery-logo",
          src: logo,
          caption: "Center Tyani - Notre equipe",
          featured: true
        },
        {
          id: "gallery-ddd",
          src: "/gallery/ddd.jpg",
          caption: "Seances de soutien scolaire",
          featured: false
        },
        {
          id: "gallery-pc",
          src: "/gallery/pc.jpg",
          caption: "Espace d'apprentissage moderne",
          featured: true
        },
        {
          id: "gallery-pfff",
          src: "/gallery/pfff.jpg",
          caption: "Activites pedagogiques",
          featured: false
        },
        {
          id: "gallery-waa3",
          src: "/gallery/waa3.jpg",
          caption: "Cours intensifs et encadrement",
          featured: false
        },
        {
          id: "gallery-zin",
          src: "/gallery/zin.jpg",
          caption: "Reussite des eleves",
          featured: false
        }
      ]
    }
  ]
};
function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function orderedSections(content) {
  return [...content.sections].sort((a, b) => a.order - b.order);
}
function mergeContent(candidate) {
  if (!candidate) return defaultSiteContent;
  return {
    ...defaultSiteContent,
    ...candidate,
    design: { ...defaultSiteContent.design, ...candidate.design },
    contact: { ...defaultSiteContent.contact, ...candidate.contact },
    announcements: candidate.announcements ?? defaultSiteContent.announcements,
    sections: candidate.sections ?? defaultSiteContent.sections,
    levels: candidate.levels ?? defaultSiteContent.levels,
    subjects: candidate.subjects ?? defaultSiteContent.subjects,
    teachers: candidate.teachers ?? defaultSiteContent.teachers,
    galleryAlbums: candidate.galleryAlbums ?? defaultSiteContent.galleryAlbums
  };
}
const Route$7 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: defaultSiteContent.seoTitle },
      { name: "description", content: defaultSiteContent.seoDescription },
      { name: "theme-color", content: defaultSiteContent.design.darkColor },
      { property: "og:title", content: defaultSiteContent.seoTitle },
      { property: "og:description", content: defaultSiteContent.seoDescription },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$2 = () => import("./admin-WVUsuTMR.js");
const Route$6 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-Dqq4x2BB.js");
const Route$5 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const products = [
  {
    id: 1,
    name: "Product 1",
    image: "/placeholder.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    shortDescription: "A generic product description for your first product.",
    price: 3e3
  }
];
const $$splitComponentImporter = () => import("./_productId-Bnx9KE-X.js");
const Route$4 = createFileRoute("/products/$productId")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: async ({
    params
  }) => {
    const product = products.find((product2) => product2.id === +params.productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
});
const tokenLifetimeMs = 1e3 * 60 * 60 * 8;
function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || adminPassword;
}
function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET || getAdminPassword();
}
function sign(expiresAt) {
  return createHmac("sha256", getAdminSecret()).update(String(expiresAt)).digest("hex");
}
function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
function isValidAdminPassword(password) {
  return safeEqual(password, getAdminPassword());
}
function createAdminToken() {
  const expiresAt = Date.now() + tokenLifetimeMs;
  return {
    token: `${expiresAt}.${sign(expiresAt)}`,
    expiresAt
  };
}
function verifyAdminToken(token) {
  if (!token) return false;
  const [expiresAtRaw, signature] = token.split(".");
  const expiresAt = Number(expiresAtRaw);
  if (!expiresAt || !signature || Date.now() > expiresAt) return false;
  return safeEqual(signature, sign(expiresAt));
}
function requireAdmin(request) {
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (verifyAdminToken(token)) return null;
  return Response.json({ error: "Unauthorized admin request" }, { status: 401 });
}
const notificationEmail = "centretyanibelfaa@gmail.com";
function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}
function fromEmail() {
  return process.env.RESEND_FROM_EMAIL || "Center Tyani <onboarding@resend.dev>";
}
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function row(label, value) {
  return `<tr><td style="padding:8px 12px;color:#64748b;font-weight:600">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#0f172a">${escapeHtml(value || "-")}</td></tr>`;
}
async function sendEmail(subject, html, replyTo) {
  if (!emailConfigured()) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail(),
      to: [notificationEmail],
      reply_to: replyTo || notificationEmail,
      subject,
      html
    })
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Resend failed with ${response.status}`);
  }
  return true;
}
async function sendRegistrationEmail(record) {
  const html = `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:620px;margin:auto;background:white;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
        <div style="background:#0f172a;color:white;padding:20px 24px">
          <h1 style="margin:0;font-size:20px">Nouvelle inscription Center Tyani</h1>
          <p style="margin:6px 0 0;color:#c9a227">${new Date(record.createdAt).toLocaleString("fr-FR")}</p>
        </div>
        <table style="width:100%;border-collapse:collapse">
          ${row("Nom complet", record.fullName)}
          ${row("Telephone", record.phone)}
          ${row("Telephone parent", record.parentPhone)}
          ${row("Niveau scolaire", record.academicLevel)}
          ${row("Matiere choisie", record.selectedSubject)}
          ${row("Message", record.message)}
        </table>
      </div>
    </div>
  `;
  return sendEmail(`Nouvelle inscription - ${record.fullName}`, html);
}
async function sendContactEmail(record) {
  const html = `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:620px;margin:auto;background:white;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
        <div style="background:#0f172a;color:white;padding:20px 24px">
          <h1 style="margin:0;font-size:20px">Nouveau message de contact</h1>
          <p style="margin:6px 0 0;color:#c9a227">${new Date(record.createdAt).toLocaleString("fr-FR")}</p>
        </div>
        <table style="width:100%;border-collapse:collapse">
          ${row("Nom complet", record.fullName)}
          ${row("Telephone", record.phone)}
          ${row("Email", record.email)}
          ${row("Message", record.message)}
        </table>
      </div>
    </div>
  `;
  return sendEmail(`Message contact - ${record.fullName}`, html, record.email);
}
function getConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { url, key, configured: Boolean(url && key) };
}
function isSupabaseConfigured() {
  return getConfig().configured;
}
async function supabaseFetch(path, init = {}) {
  const { url, key, configured } = getConfig();
  if (!configured || !url || !key) {
    throw new Error("Supabase is not configured");
  }
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
      ...init.headers ?? {}
    }
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed with ${response.status}`);
  }
  if (response.status === 204) return null;
  return response.json();
}
async function getCmsContentFromDatabase() {
  if (!isSupabaseConfigured()) return null;
  const rows = await supabaseFetch("cms_data?id=eq.site&select=content&limit=1");
  return rows[0]?.content ?? null;
}
async function saveCmsContentToDatabase(content) {
  if (!isSupabaseConfigured()) return false;
  await supabaseFetch("cms_data", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates"
    },
    body: JSON.stringify({
      id: "site",
      content,
      updated_at: content.updatedAt
    })
  });
  return true;
}
function mapRegistration(row2) {
  return {
    id: row2.id,
    fullName: row2.full_name,
    phone: row2.phone,
    parentPhone: row2.parent_phone,
    academicLevel: row2.academic_level,
    selectedSubject: row2.selected_subject,
    message: row2.message ?? "",
    status: row2.status,
    createdAt: row2.created_at
  };
}
function mapContact(row2) {
  return {
    id: row2.id,
    fullName: row2.full_name,
    phone: row2.phone ?? "",
    email: row2.email ?? "",
    message: row2.message,
    createdAt: row2.created_at
  };
}
async function insertRegistration(record) {
  if (!isSupabaseConfigured()) return false;
  await supabaseFetch("registrations", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      id: record.id,
      full_name: record.fullName,
      phone: record.phone,
      parent_phone: record.parentPhone,
      academic_level: record.academicLevel,
      selected_subject: record.selectedSubject,
      message: record.message || null,
      status: record.status,
      created_at: record.createdAt
    })
  });
  return true;
}
async function listRegistrations() {
  if (!isSupabaseConfigured()) return [];
  const rows = await supabaseFetch(
    "registrations?select=*&order=created_at.desc"
  );
  return rows.map(mapRegistration);
}
async function deleteRegistration(id) {
  if (!isSupabaseConfigured()) return false;
  await supabaseFetch(`registrations?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" }
  });
  return true;
}
async function insertContactMessage(record) {
  if (!isSupabaseConfigured()) return false;
  await supabaseFetch("contact_messages", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      id: record.id,
      full_name: record.fullName,
      phone: record.phone || null,
      email: record.email || null,
      message: record.message,
      created_at: record.createdAt
    })
  });
  return true;
}
async function listContactMessages() {
  if (!isSupabaseConfigured()) return [];
  const rows = await supabaseFetch(
    "contact_messages?select=*&order=created_at.desc"
  );
  return rows.map(mapContact);
}
async function deleteContactMessage(id) {
  if (!isSupabaseConfigured()) return false;
  await supabaseFetch(`contact_messages?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" }
  });
  return true;
}
function clean$1(value) {
  return typeof value === "string" ? value.trim() : "";
}
function registrationFromBody(body) {
  const data = body;
  const record = {
    id: createId("registration"),
    fullName: clean$1(data.fullName),
    phone: clean$1(data.phone),
    parentPhone: clean$1(data.parentPhone),
    academicLevel: clean$1(data.academicLevel),
    selectedSubject: clean$1(data.selectedSubject),
    message: clean$1(data.message),
    status: "new",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (!record.fullName || !record.phone || !record.parentPhone || !record.academicLevel || !record.selectedSubject) {
    return null;
  }
  return record;
}
const Route$3 = createFileRoute("/api/registrations")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const unauthorized = requireAdmin(request);
        if (unauthorized) return unauthorized;
        return Response.json({
          registrations: await listRegistrations(),
          databaseConfigured: isSupabaseConfigured()
        });
      },
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null);
        const record = registrationFromBody(body);
        if (!record) {
          return Response.json({ error: "Missing required registration fields" }, { status: 400 });
        }
        const databaseSaved = await insertRegistration(record);
        let emailSent = false;
        let emailError = "";
        try {
          emailSent = await sendRegistrationEmail(record);
        } catch (error) {
          emailError = error instanceof Error ? error.message : "Email failed";
        }
        return Response.json(
          {
            registration: record,
            databaseSaved,
            databaseConfigured: isSupabaseConfigured(),
            emailSent,
            emailError
          },
          { status: databaseSaved || emailSent ? 201 : 202 }
        );
      },
      DELETE: async ({ request }) => {
        const unauthorized = requireAdmin(request);
        if (unauthorized) return unauthorized;
        const id = new URL(request.url).searchParams.get("id");
        if (!id) return Response.json({ error: "Missing registration id" }, { status: 400 });
        const deleted = await deleteRegistration(id);
        return Response.json({ deleted });
      }
    }
  }
});
function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}
function contactFromBody(body) {
  const data = body;
  const record = {
    id: createId("message"),
    fullName: clean(data.fullName),
    phone: clean(data.phone),
    email: clean(data.email),
    message: clean(data.message),
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (!record.fullName || !record.message) return null;
  return record;
}
const Route$2 = createFileRoute("/api/contact")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const unauthorized = requireAdmin(request);
        if (unauthorized) return unauthorized;
        return Response.json({
          messages: await listContactMessages(),
          databaseConfigured: isSupabaseConfigured()
        });
      },
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null);
        const record = contactFromBody(body);
        if (!record) {
          return Response.json({ error: "Missing required contact fields" }, { status: 400 });
        }
        const databaseSaved = await insertContactMessage(record);
        let emailSent = false;
        let emailError = "";
        try {
          emailSent = await sendContactEmail(record);
        } catch (error) {
          emailError = error instanceof Error ? error.message : "Email failed";
        }
        return Response.json(
          {
            message: record,
            databaseSaved,
            databaseConfigured: isSupabaseConfigured(),
            emailSent,
            emailError
          },
          { status: databaseSaved || emailSent ? 201 : 202 }
        );
      },
      DELETE: async ({ request }) => {
        const unauthorized = requireAdmin(request);
        if (unauthorized) return unauthorized;
        const id = new URL(request.url).searchParams.get("id");
        if (!id) return Response.json({ error: "Missing message id" }, { status: 400 });
        const deleted = await deleteContactMessage(id);
        return Response.json({ deleted });
      }
    }
  }
});
const Route$1 = createFileRoute("/api/cms")({
  server: {
    handlers: {
      GET: async () => {
        const content = mergeContent(await getCmsContentFromDatabase());
        return Response.json(
          {
            content,
            databaseConfigured: isSupabaseConfigured()
          },
          { headers: { "cache-control": "no-store" } }
        );
      },
      PUT: async ({ request }) => {
        const unauthorized = requireAdmin(request);
        if (unauthorized) return unauthorized;
        const body = await request.json().catch(() => null);
        if (!body?.content) {
          return Response.json({ error: "Missing CMS content" }, { status: 400 });
        }
        const content = mergeContent({
          ...body.content,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
        const databaseSaved = await saveCmsContentToDatabase(content);
        return Response.json({
          content,
          databaseSaved,
          databaseConfigured: isSupabaseConfigured()
        });
      }
    }
  }
});
const Route = createFileRoute("/api/admin-login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null);
        if (!body?.password || !isValidAdminPassword(body.password)) {
          return Response.json({ error: "Invalid password" }, { status: 401 });
        }
        return Response.json(createAdminToken());
      }
    }
  }
});
const AdminRoute = Route$6.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const ProductsProductIdRoute = Route$4.update({
  id: "/products/$productId",
  path: "/products/$productId",
  getParentRoute: () => Route$7
});
const ApiRegistrationsRoute = Route$3.update({
  id: "/api/registrations",
  path: "/api/registrations",
  getParentRoute: () => Route$7
});
const ApiContactRoute = Route$2.update({
  id: "/api/contact",
  path: "/api/contact",
  getParentRoute: () => Route$7
});
const ApiCmsRoute = Route$1.update({
  id: "/api/cms",
  path: "/api/cms",
  getParentRoute: () => Route$7
});
const ApiAdminLoginRoute = Route.update({
  id: "/api/admin-login",
  path: "/api/admin-login",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  ApiAdminLoginRoute,
  ApiCmsRoute,
  ApiContactRoute,
  ApiRegistrationsRoute,
  ProductsProductIdRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$4 as R,
  adminTokenStorageKey as a,
  createId as c,
  defaultSiteContent as d,
  mergeContent as m,
  orderedSections as o,
  router as r
};

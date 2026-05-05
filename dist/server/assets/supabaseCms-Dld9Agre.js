import { createClient } from "@supabase/supabase-js";
import { m as mergeContent, d as defaultSiteContent } from "./router-Dtr5iU5A.js";
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "TSS_DEV_SERVER": "false", "TSS_DEV_SSR_STYLES_BASEPATH": "/", "TSS_DEV_SSR_STYLES_ENABLED": "true", "TSS_ROUTER_BASEPATH": "", "TSS_SERVER_FN_BASE": "/_serverFn/" };
const cmsTable = "cms_data";
const cmsRowId = "site";
const cmsDataUpdatedEvent = "center-tyani-cms-data-updated";
let cachedClient = null;
function envValue(key) {
  return __vite_import_meta_env__[key];
}
function isSupabaseBrowserConfigured() {
  return Boolean(envValue("VITE_SUPABASE_URL") && envValue("VITE_SUPABASE_ANON_KEY"));
}
function getSupabaseBrowserClient() {
  const url = envValue("VITE_SUPABASE_URL");
  const anonKey = envValue("VITE_SUPABASE_ANON_KEY");
  if (!url || !anonKey) {
    throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
  }
  if (!cachedClient) {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      realtime: {
        params: {
          eventsPerSecond: 2
        }
      }
    });
  }
  return cachedClient;
}
function emitCmsUpdate(content) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(cmsDataUpdatedEvent, { detail: content }));
}
async function fetchCmsContentFromSupabase() {
  if (!isSupabaseBrowserConfigured()) return defaultSiteContent;
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.from(cmsTable).select("content, updated_at").eq("id", cmsRowId).maybeSingle();
  if (error) throw error;
  return mergeContent(data?.content ?? defaultSiteContent);
}
async function upsertCmsContentToSupabase(content) {
  const supabase = getSupabaseBrowserClient();
  const nextContent = mergeContent({
    ...content,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  const { data, error } = await supabase.from(cmsTable).upsert(
    {
      id: cmsRowId,
      content: nextContent,
      updated_at: nextContent.updatedAt
    },
    { onConflict: "id" }
  ).select("content, updated_at").single();
  if (error) throw error;
  const savedContent = mergeContent(data?.content ?? nextContent);
  emitCmsUpdate(savedContent);
  return savedContent;
}
function subscribeToCmsDataChanges(onContent) {
  if (!isSupabaseBrowserConfigured()) return () => void 0;
  const supabase = getSupabaseBrowserClient();
  const channel = supabase.channel("center-tyani-cms-data").on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: cmsTable,
      filter: `id=eq.${cmsRowId}`
    },
    (payload) => {
      const row = payload.new;
      if (!row?.content) return;
      const content = mergeContent(row.content);
      onContent(content);
      emitCmsUpdate(content);
    }
  ).subscribe();
  return () => {
    void supabase.removeChannel(channel);
  };
}
export {
  cmsDataUpdatedEvent as c,
  fetchCmsContentFromSupabase as f,
  isSupabaseBrowserConfigured as i,
  subscribeToCmsDataChanges as s,
  upsertCmsContentToSupabase as u
};

import { useI18n } from "@/lib/i18n";
import { Globe } from "lucide-react";

const LangToggle = () => {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium border border-border bg-background text-foreground hover:bg-accent transition-colors"
      title={lang === "en" ? "切换到中文" : "Switch to English"}
    >
      <Globe className="h-3.5 w-3.5" />
      {lang === "en" ? "中文" : "EN"}
    </button>
  );
};

export default LangToggle;

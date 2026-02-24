"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Instagram, MapPin, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Map from "@/components/map";

const translations = {
  tr: {
    title: "İzmit Tenis Kulübü",
    subtitle: "Tenise tutkuyla bağlı bir topluluk",
    about: "Hakkımızda",
    aboutText:
      "İzmit Tenis Kulübü, tenis tutkunlarını bir araya getiren, profesyonel kortları ve deneyimli eğitmenleriyle hizmet veren bir spor kulübüdür.",
    location: "Konum",
    getDirections: "Yol Tarifi Al",
    contact: "İletişim",
    contactText: "Bizimle iletişime geçin",
    name: "İsim",
    email: "E-posta",
    message: "Mesaj",
    send: "Gönder",
    sending: "Gönderiliyor...",
    success: "Mesajınız başarıyla gönderildi!",
    error: "Bir hata oluştu. Lütfen tekrar deneyin.",
    followUs: "Bizi Takip Edin",
    bulletin: "Bülteni Oku",
  },
  en: {
    title: "İzmit Tennis Club",
    subtitle: "A community passionately connected to tennis",
    about: "About Us",
    aboutText:
      "İzmit Tennis Club is a sports club that brings tennis enthusiasts together, serving with professional courts and experienced coaches.",
    location: "Location",
    getDirections: "Get Directions",
    contact: "Contact",
    contactText: "Get in touch with us",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sending: "Sending...",
    success: "Your message has been sent successfully!",
    error: "An error occurred. Please try again.",
    followUs: "Follow Us",
    bulletin: "Read the Bulletin",
  },
};

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<"tr" | "en">("tr");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const t = translations[language];

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 5000);
      }
    } catch (error) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const openGoogleMaps = () => {
    // const address = "Sanayi, Ömer Türkçakal Blv. No:28, 41040 İzmit/Kocaeli";
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const label = encodeURIComponent("İzmit Tenis Kulübü");

    if (isAndroid) {
      window.open(
        `google.navigation:q=40.746913800956,29.94437850221664(${label})`,
        "_blank",
      );
    } else if (isIOS) {
      window.open(
        // `maps://?q=${label}&ll=40.746913800956,29.94437850221664`,
        `comgooglemaps://?daddr=${label}&center=40.746913800956,29.94437850221664&directionsmode=driving`,
        "_blank",
      );
    } else {
      // window.open(`https://maps.app.goo.gl/zubEBncccAtgvSzVA`, "_blank");
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${label}&destination_place_id=zubEBncccAtgvSzVA`,
        "_blank",
      );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">İTK</h1>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
              className="font-medium"
            >
              {language === "tr" ? "EN" : "TR"}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground text-balance">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">{t.about}</h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {t.aboutText}
          </p>
          <a href="/bulletin/index.html">
            <Button size="lg" className="w-full sm:w-auto">
              {t.bulletin}
            </Button>
          </a>
        </div>
      </section>

      {/* Social Media */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">{t.followUs}</h3>
          <a
            href="https://instagram.com/izmitteniskulubu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <Instagram className="h-6 w-6" />
            <span className="font-medium">@izmitteniskulubu</span>
          </a>
        </div>
      </section>

      {/* Location Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">{t.location}</h3>

          <Map />

          <div className="flex items-start gap-3 mb-4 text-muted-foreground">
            <MapPin className="h-5 w-5 mt-1 shrink-0" />
            <p>Sanayi Mah., Ömer Türkçakal Blv. No:28, 41040 İzmit/Kocaeli</p>
          </div>

          <Button
            onClick={openGoogleMaps}
            size="lg"
            className="w-full sm:w-auto"
          >
            <MapPin className="h-5 w-5 mr-2" />
            {t.getDirections}
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">{t.contact}</h3>
          <p className="text-muted-foreground mb-8">{t.contactText}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder={t.name}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                disabled={formStatus === "sending"}
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder={t.email}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={formStatus === "sending"}
              />
            </div>

            <div>
              <Textarea
                placeholder={t.message}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                disabled={formStatus === "sending"}
                rows={6}
              />
            </div>

            {formStatus === "success" && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400">
                {t.success}
              </div>
            )}

            {formStatus === "error" && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400">
                {t.error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={formStatus === "sending"}
              className="w-full sm:w-auto"
            >
              <Send className="h-5 w-5 mr-2" />
              {formStatus === "sending" ? t.sending : t.send}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 İzmit Tenis Kulübü. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

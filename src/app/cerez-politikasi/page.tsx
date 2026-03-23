import ContactSection from "@/components/home/ContactSection";

export const metadata = {
  title: "Çerez Politikası | L'art Peyzaj Mimarlık",
  description: "L'art Peyzaj Mimarlık web sitesinde kullanılan çerezler ve gizlilik uygulamaları hakkında bilgilendirme.",
};

export default function CerezPolitikasiPage() {
  return (
    <main style={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--background)", color: "var(--foreground)", position: "relative", overflowX: "hidden" }}>
      
      <section style={{ paddingTop: "12rem", paddingBottom: "6rem", paddingLeft: "5vw", paddingRight: "5vw" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase", display: "block", marginBottom: "1.5rem" }}>
            Yasal Bilgiler
          </span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontFamily: "var(--font-heading)", fontWeight: 800, lineHeight: 1.1, marginBottom: "3rem", color: "var(--foreground)" }}>
            Çerez <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Politikası.</span>
          </h1>

          <div style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>1. Çerez Nedir?</h2>
              <p>Çerezler (cookies), web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Bu dosyalar, web sitemizin düzgün çalışmasını sağlamak, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek amacıyla kullanılmaktadır.</p>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>2. Kullandığımız Çerez Türleri</h2>
              
              <div style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "2rem", marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h3 style={{ color: "var(--accent)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Zorunlu Çerezler</h3>
                  <p>Web sitesinin temel işleyişi için gerekli olan çerezlerdir. Bu çerezler olmadan site düzgün çalışmaz. Oturum yönetimi ve güvenlik için kullanılır.</p>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
                  <h3 style={{ color: "var(--accent)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Performans Çerezleri</h3>
                  <p>Ziyaretçilerin web sitemizi nasıl kullandığını anlamamıza yardımcı olan çerezlerdir. Hangi sayfaların en çok ziyaret edildiği, hata mesajlarının alınıp alınmadığı gibi bilgileri toplar.</p>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
                  <h3 style={{ color: "var(--accent)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>İşlevsellik Çerezleri</h3>
                  <p>Web sitesinin gelişmiş işlevsellik ve kişiselleştirme sağlamasına olanak tanıyan çerezlerdir. Dil tercihiniz ve tema seçiminiz gibi ayarlarınızı hatırlamak için kullanılır.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>3. Çerezlerin Kullanım Amaçları</h2>
              <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Web sitemizin düzgün ve güvenli şekilde çalışmasını sağlamak,</li>
                <li>Kullanıcı deneyimini geliştirmek ve kişiselleştirmek,</li>
                <li>Site performansını ölçmek ve analiz etmek,</li>
                <li>Ziyaretçi tercihlerini (çerez onayı gibi) hatırlamak.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>4. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
              <p>Tarayıcınızın ayarlarını değiştirerek çerezleri kabul etmeyi veya reddetmeyi seçebilirsiniz. Çoğu tarayıcı, çerezleri otomatik olarak kabul edecek şekilde yapılandırılmıştır, ancak bu ayarı istediğiniz zaman değiştirebilirsiniz. Çerezleri devre dışı bırakmanız halinde, web sitemizin bazı özelliklerinin düzgün çalışmayabileceğini lütfen unutmayınız.</p>
              <p style={{ marginTop: "1rem" }}>Tarayıcı bazında çerez ayarları için:</p>
              <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                <li><strong style={{ color: "var(--foreground)" }}>Chrome:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
                <li><strong style={{ color: "var(--foreground)" }}>Firefox:</strong> Seçenekler → Gizlilik ve Güvenlik</li>
                <li><strong style={{ color: "var(--foreground)" }}>Safari:</strong> Tercihler → Gizlilik</li>
                <li><strong style={{ color: "var(--foreground)" }}>Edge:</strong> Ayarlar → Çerezler ve Site İzinleri</li>
              </ul>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>5. Veri Saklama Süresi</h2>
              <p>Çerez tercihleriniz tarayıcınızın yerel depolama alanında (localStorage) saklanır ve tarayıcı verilerinizi temizleyene kadar geçerlidir. Oturum çerezleri ise tarayıcınızı kapattığınızda otomatik olarak silinir.</p>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>6. Politika Güncellemeleri</h2>
              <p>Bu Çerez Politikası, yasal düzenlemeler veya site işleyişindeki değişiklikler doğrultusunda güncellenebilir. Güncellemeler bu sayfada yayımlanacaktır. Son güncelleme tarihi: <strong style={{ color: "var(--foreground)" }}>Mart 2026</strong>.</p>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>7. İletişim</h2>
              <p>Çerez politikamız hakkında sorularınız için <strong style={{ color: "var(--accent)" }}>info@lartpeyzaj.com</strong> adresinden bizimle iletişime geçebilirsiniz.</p>
            </div>

          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}

import ContactSection from "@/components/home/ContactSection";

export const metadata = {
  title: "KVKK Aydınlatma Metni | L'art Peyzaj Mimarlık",
  description: "L'art Peyzaj Mimarlık KVKK kapsamında kişisel verilerin korunmasına ilişkin aydınlatma metni.",
};

export default function KVKKPage() {
  return (
    <main style={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--background)", color: "var(--foreground)", position: "relative", overflowX: "hidden" }}>
      
      <section style={{ paddingTop: "12rem", paddingBottom: "6rem", paddingLeft: "5vw", paddingRight: "5vw" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase", display: "block", marginBottom: "1.5rem" }}>
            Yasal Bilgiler
          </span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontFamily: "var(--font-heading)", fontWeight: 800, lineHeight: 1.1, marginBottom: "3rem", color: "var(--foreground)" }}>
            KVKK <span style={{ color: "var(--accent)", fontStyle: "italic" }}>Aydınlatma Metni.</span>
          </h1>

          <div style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>1. Veri Sorumlusu</h2>
              <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, kişisel verileriniz; veri sorumlusu olarak <strong style={{ color: "var(--foreground)" }}>L&apos;art Peyzaj Mimarlık</strong> tarafından aşağıda açıklanan kapsamda işlenebilecektir.</p>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>2. Kişisel Verilerin İşlenme Amacı</h2>
              <p>Kişisel verileriniz; iletişim faaliyetlerinin yürütülmesi, talep ve şikayetlerin takibi, proje teklif süreçlerinin yönetimi, sözleşmesel yükümlülüklerin yerine getirilmesi ve yasal düzenlemelerin gerektirdiği yükümlülüklerin ifası amacıyla işlenmektedir.</p>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>3. İşlenen Kişisel Veri Kategorileri</h2>
              <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Kimlik Bilgileri (Ad, Soyad)</li>
                <li>İletişim Bilgileri (E-posta adresi, Telefon numarası)</li>
                <li>Müşteri İşlem Bilgileri (Proje talep detayları)</li>
                <li>İşlem Güvenliği Bilgileri (Çerez kayıtları, IP adresi)</li>
              </ul>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>4. Kişisel Verilerin Aktarılması</h2>
              <p>Toplanan kişisel verileriniz; yukarıda belirtilen amaçlarla sınırlı olarak iş ortaklarımıza, tedarikçilerimize, hizmet aldığımız üçüncü kişilere ve yetkili kamu kurum ve kuruluşlarına KVKK&apos;nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.</p>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
              <p>Kişisel verileriniz, web sitemiz üzerindeki iletişim formları, e-posta yazışmaları ve telefon görüşmeleri aracılığıyla elektronik ortamda toplanmaktadır. Bu veriler, KVKK&apos;nın 5. maddesinde belirtilen &quot;bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması&quot; ve &quot;ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması&quot; hukuki sebeplerine dayanılarak işlenmektedir.</p>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>6. İlgili Kişi Olarak Haklarınız</h2>
              <p>KVKK&apos;nın 11. maddesi uyarınca, kişisel veri sahibi olarak aşağıdaki haklara sahipsiniz:</p>
              <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
                <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,</li>
                <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
                <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ color: "var(--foreground)", fontSize: "1.3rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>7. İletişim</h2>
              <p>Yukarıda sıralanan haklarınıza yönelik başvurularınızı <strong style={{ color: "var(--accent)" }}>info@lartpeyzaj.com</strong> e-posta adresine veya Nişantaş, İkra Sk. Nasip Sit. No:1/c B Blok, 42090 Selçuklu/Konya adresine yazılı olarak iletebilirsiniz.</p>
            </div>

          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}

import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fotoyukle, profilGetir } from './pings';
import { supabase } from './supabase';

const diller = ['Turkish', 'English', 'German', 'Spanish', 'French', 'Arabic', 'Russian', 'Italian'];
const mutfaklar = ['Turkish', 'Italian', 'Japanese', 'Mexican', 'Indian', 'Chinese', 'French', 'Greek'];
const muzikler = ['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Classical', 'Electronic', 'R&B', 'Folk'];

export default function Profil({ onKapat }: { onKapat: () => void }) {
  const [profil, setProfil] = useState<any>({});
  const [yukleniyor, setYukleniyor] = useState(true);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [adim, setAdim] = useState(0);

  useEffect(() => {
    const yukle = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const p = await profilGetir(user.id);
        if (p) setProfil(p);
      }
      setYukleniyor(false);
    };
    yukle();
  }, []);

  const kaydet = async () => {
    setKaydediliyor(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { alert('Not logged in!'); return; }
      const nick = sessionStorage.getItem('oops_nickname') || '';
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        nickname: nick,
        created_at: new Date().toISOString(),
        yas: profil.yas,
        sehir: profil.sehir,
        bio: profil.bio,
        diller: profil.diller,
        gece_kusu: profil.gece_kusu,
        kahve_mi: profil.kahve_mi,
        sehir_mi: profil.sehir_mi,
        muzik: profil.muzik,
        mutfak: profil.mutfak,
        foto1: profil.foto1,
        foto2: profil.foto2,
        foto3: profil.foto3,
        motto: profil.motto,
        sevdikleri: profil.sevdikleri,
        surpriz: profil.surpriz,
      });
      if (error) { console.log('Kayit hatasi:', error); alert('Error: ' + error.message); }
      else { alert('Profile saved!'); onKapat(); }
    } catch(e) { console.log(e); alert('Error!'); }
    setKaydediliyor(false);
  };

  const fotoSec = async (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      const url = await fotoyukle(file, index);
      if (url) setProfil({ ...profil, [`foto${index}`]: url });
    };
    input.click();
  };

  const dilToggle = (dil: string) => {
    const mevcutDiller = profil.diller || [];
    if (mevcutDiller.includes(dil)) {
      setProfil({ ...profil, diller: mevcutDiller.filter((d: string) => d !== dil) });
    } else {
      setProfil({ ...profil, diller: [...mevcutDiller, dil] });
    }
  };

  if (yukleniyor) return (
    <View style={s.tam}><Text style={s.yukleniyorYazi}>loading...</Text></View>
  );

  const adimlar = [
    // Adım 0 - Fotoğraflar + Bio
    <View key="0" style={s.adimContainer}>
      <Text style={s.adimBaslik}>{profil.nickname || 'your profile'}</Text>
      <Text style={s.adimAlt}>add up to 3 photos ✨</Text>
      <View style={s.fotoGrid}>
        {[1, 2, 3].map(i => (
          <TouchableOpacity key={i} style={s.fotoKart} onPress={() => fotoSec(i)}>
            {profil[`foto${i}`] ? (
              <Image source={{ uri: profil[`foto${i}`] }} style={s.fotoImg}/>
            ) : (
              <View style={s.fotoPlaceholder}>
                <Text style={s.fotoPlaceholderIcon}>+</Text>
                <Text style={s.fotoPlaceholderYazi}>photo {i}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 32, gap: 16 }}>
        <View style={s.inputGroup}>
          <Text style={s.label}>✦ your life motto</Text>
          <TextInput
            style={s.input}
            value={profil.motto || ''}
            onChangeText={v => setProfil({ ...profil, motto: v })}
            placeholder="e.g. live in the moment"
            placeholderTextColor="#333"
            maxLength={80}
          />
        </View>
        <View style={s.inputGroup}>
          <Text style={s.label}>♥ 3 things you love</Text>
          <TextInput
            style={s.input}
            value={profil.sevdikleri || ''}
            onChangeText={v => setProfil({ ...profil, sevdikleri: v })}
            placeholder="e.g. coffee, jazz, long walks"
            placeholderTextColor="#333"
            maxLength={100}
          />
        </View>
        <View style={s.inputGroup}>
          <Text style={s.label}>✦ one thing people don't know about you</Text>
          <TextInput
            style={[s.input, { height: 80, textAlignVertical: 'top' }]}
            value={profil.surpriz || ''}
            onChangeText={v => setProfil({ ...profil, surpriz: v })}
            placeholder="surprise us..."
            placeholderTextColor="#333"
            multiline
            maxLength={120}
          />
        </View>
      </View>
    </View>,

    // Adım 1 - Temel bilgiler
    <View key="1" style={s.adimContainer}>
      <Text style={s.adimBaslik}>about you</Text>
      <Text style={s.adimAlt}>tell us a bit 🙂</Text>
      <View style={s.inputGroup}>
        <Text style={s.label}>age</Text>
        <TextInput
          style={s.input}
          value={profil.yas?.toString() || ''}
          onChangeText={v => setProfil({ ...profil, yas: parseInt(v) || '' })}
          placeholder="your age"
          placeholderTextColor="#444"
          keyboardType="numeric"
        />
      </View>
      <View style={s.inputGroup}>
        <Text style={s.label}>city</Text>
        <TextInput
          style={s.input}
          value={profil.sehir || ''}
          onChangeText={v => setProfil({ ...profil, sehir: v })}
          placeholder="where are you?"
          placeholderTextColor="#444"
        />
      </View>
      <View style={s.inputGroup}>
        <Text style={s.label}>bio</Text>
        <TextInput
          style={[s.input, s.bioInput]}
          value={profil.bio || ''}
          onChangeText={v => setProfil({ ...profil, bio: v })}
          placeholder="a few words about you..."
          placeholderTextColor="#444"
          multiline
          maxLength={150}
        />
        <Text style={s.charCount}>{(profil.bio || '').length}/150</Text>
      </View>
    </View>,

    // Adım 2 - Diller
    <View key="2" style={s.adimContainer}>
      <Text style={s.adimBaslik}>languages</Text>
      <Text style={s.adimAlt}>what do you speak? 🗣️</Text>
      <View style={s.chipGrid}>
        {diller.map(dil => (
          <TouchableOpacity
            key={dil}
            style={[s.chip, (profil.diller || []).includes(dil) && s.chipSecili]}
            onPress={() => dilToggle(dil)}
          >
            <Text style={[s.chipYazi, (profil.diller || []).includes(dil) && s.chipYaziSecili]}>
              {dil}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>,

    // Adım 3 - Eğlenceli sorular
    <View key="3" style={s.adimContainer}>
      <Text style={s.adimBaslik}>quick questions</Text>
      <Text style={s.adimAlt}>for better matches 🎯</Text>

      <View style={s.soruKart}>
        <Text style={s.soruBaslik}>🌙 night owl or morning person?</Text>
        <View style={s.soruButonlar}>
          <TouchableOpacity
            style={[s.soruButon, profil.gece_kusu === true && s.soruButonSecili]}
            onPress={() => setProfil({ ...profil, gece_kusu: true })}
          >
            <Text style={[s.soruButonYazi, profil.gece_kusu === true && s.soruButonYaziSecili]}>🌙 night owl</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.soruButon, profil.gece_kusu === false && s.soruButonSecili]}
            onPress={() => setProfil({ ...profil, gece_kusu: false })}
          >
            <Text style={[s.soruButonYazi, profil.gece_kusu === false && s.soruButonYaziSecili]}>☀️ morning person</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={s.soruKart}>
        <Text style={s.soruBaslik}>☕ coffee or tea?</Text>
        <View style={s.soruButonlar}>
          <TouchableOpacity
            style={[s.soruButon, profil.kahve_mi === true && s.soruButonSecili]}
            onPress={() => setProfil({ ...profil, kahve_mi: true })}
          >
            <Text style={[s.soruButonYazi, profil.kahve_mi === true && s.soruButonYaziSecili]}>☕ coffee</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.soruButon, profil.kahve_mi === false && s.soruButonSecili]}
            onPress={() => setProfil({ ...profil, kahve_mi: false })}
          >
            <Text style={[s.soruButonYazi, profil.kahve_mi === false && s.soruButonYaziSecili]}>🍵 tea</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={s.soruKart}>
        <Text style={s.soruBaslik}>🌆 city or nature?</Text>
        <View style={s.soruButonlar}>
          <TouchableOpacity
            style={[s.soruButon, profil.sehir_mi === true && s.soruButonSecili]}
            onPress={() => setProfil({ ...profil, sehir_mi: true })}
          >
            <Text style={[s.soruButonYazi, profil.sehir_mi === true && s.soruButonYaziSecili]}>🌆 city</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.soruButon, profil.sehir_mi === false && s.soruButonSecili]}
            onPress={() => setProfil({ ...profil, sehir_mi: false })}
          >
            <Text style={[s.soruButonYazi, profil.sehir_mi === false && s.soruButonYaziSecili]}>🌿 nature</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>,

    // Adım 4 - Müzik & Mutfak
    <View key="4" style={s.adimContainer}>
      <Text style={s.adimBaslik}>your taste</Text>
      <Text style={s.adimAlt}>music & food 🎵🍕</Text>

      <Text style={s.label}>favorite music</Text>
      <View style={s.chipGrid}>
        {muzikler.map(m => (
          <TouchableOpacity
            key={m}
            style={[s.chip, profil.muzik === m && s.chipSecili]}
            onPress={() => setProfil({ ...profil, muzik: m })}
          >
            <Text style={[s.chipYazi, profil.muzik === m && s.chipYaziSecili]}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[s.label, { marginTop: 24 }]}>favorite cuisine</Text>
      <View style={s.chipGrid}>
        {mutfaklar.map(m => (
          <TouchableOpacity
            key={m}
            style={[s.chip, profil.mutfak === m && s.chipSecili]}
            onPress={() => setProfil({ ...profil, mutfak: m })}
          >
            <Text style={[s.chipYazi, profil.mutfak === m && s.chipYaziSecili]}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>,
  ];

  return (
    <View style={s.tam}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={onKapat} style={s.geriButon}>
          <Text style={s.geriYazi}>✕</Text>
        </TouchableOpacity>
        <Text style={s.headerBaslik}>edit profile</Text>
        <TouchableOpacity onPress={kaydet} style={s.kaydetButon}>
          <Text style={s.kaydetYazi}>{kaydediliyor ? '...' : 'save'}</Text>
        </TouchableOpacity>
      </View>

      {/* İlerleme */}
      <View style={s.progress}>
        {adimlar.map((_, i) => (
          <View key={i} style={[s.progressDot, i === adim && s.progressDotAktif, i < adim && s.progressDotTamam]}/>
        ))}
      </View>

      <ScrollView style={s.icerik} contentContainerStyle={{ paddingBottom: 100 }}>
        {adimlar[adim]}
      </ScrollView>

      {/* Alt navigasyon */}
      <View style={s.altNav}>
        {adim > 0 && (
          <TouchableOpacity style={s.geriNavButon} onPress={() => setAdim(adim - 1)}>
            <Text style={s.geriNavYazi}>← back</Text>
          </TouchableOpacity>
        )}
        {adim < adimlar.length - 1 ? (
          <TouchableOpacity style={s.ileriButon} onPress={() => setAdim(adim + 1)}>
            <Text style={s.ileriYazi}>next →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={s.ileriButon} onPress={kaydet}>
            <Text style={s.ileriYazi}>{kaydediliyor ? 'saving...' : 'done ✓'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tam: { flex: 1, backgroundColor: '#0a0a0a', height: '100vh' },
  yukleniyorYazi: { color: '#555', textAlign: 'center', marginTop: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, borderBottomWidth: 0.5, borderBottomColor: '#1a1a1a' },
  headerBaslik: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  geriButon: { padding: 8 },
  geriYazi: { color: '#555', fontSize: 18 },
  kaydetButon: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff' },
  kaydetYazi: { color: '#0a0a0a', fontSize: 14, fontWeight: 'bold' },
  progress: { flexDirection: 'row', justifyContent: 'center', gap: 8, padding: 16 },
  progressDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#222' },
  progressDotAktif: { backgroundColor: '#fff', width: 24 },
  progressDotTamam: { backgroundColor: '#555' },
  icerik: { flex: 1 },
  adimContainer: { padding: 24 },
  adimBaslik: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  adimAlt: { fontSize: 14, color: '#555', marginBottom: 32 },
  fotoGrid: { flexDirection: 'row', gap: 12, justifyContent: 'center' },
  fotoKart: { width: 100, height: 130, borderRadius: 12, overflow: 'hidden', borderWidth: 0.5, borderColor: '#222' },
  fotoImg: { width: '100%', height: '100%' },
  fotoPlaceholder: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', gap: 8 },
  fotoPlaceholderIcon: { fontSize: 28, color: '#333' },
  fotoPlaceholderYazi: { fontSize: 12, color: '#333' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 12, color: '#555', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' },
  input: { backgroundColor: '#0f0f0f', borderRadius: 12, padding: 14, color: '#fff', fontSize: 15, borderWidth: 0.5, borderColor: '#222' },
  bioInput: { height: 100, textAlignVertical: 'top' },
  charCount: { fontSize: 11, color: '#333', textAlign: 'right', marginTop: 4 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 0.5, borderColor: '#222', backgroundColor: '#0f0f0f' },
  chipSecili: { backgroundColor: '#fff', borderColor: '#fff' },
  chipYazi: { color: '#555', fontSize: 14 },
  chipYaziSecili: { color: '#0a0a0a', fontWeight: 'bold' },
  soruKart: { backgroundColor: '#0f0f0f', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 0.5, borderColor: '#1a1a1a' },
  soruBaslik: { fontSize: 15, color: '#fff', marginBottom: 14 },
  soruButonlar: { flexDirection: 'row', gap: 10 },
  soruButon: { flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 0.5, borderColor: '#222', alignItems: 'center' },
  soruButonSecili: { backgroundColor: '#fff', borderColor: '#fff' },
  soruButonYazi: { color: '#555', fontSize: 14 },
  soruButonYaziSecili: { color: '#0a0a0a', fontWeight: 'bold' },
  altNav: { flexDirection: 'row', justifyContent: 'flex-end', padding: 20, gap: 12, borderTopWidth: 0.5, borderTopColor: '#1a1a1a' },
  geriNavButon: { paddingHorizontal: 24, paddingVertical: 14, borderRadius: 24, borderWidth: 0.5, borderColor: '#222' },
  geriNavYazi: { color: '#555', fontSize: 15 },
  ileriButon: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 24, backgroundColor: '#fff' },
  ileriYazi: { color: '#0a0a0a', fontSize: 15, fontWeight: 'bold' },
});
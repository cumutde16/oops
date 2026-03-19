import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from './supabase';

export default function Auth({ onGiris }: { onGiris: (nick: string, cinsiyet: string, tercih: string) => void }) {
  const [nickname, setNickname] = useState('');
  const [cinsiyet, setCinsiyet] = useState('');
  const [tercih, setTercih] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');

  const kayitOl = async () => {
    if (nickname.trim().length < 2) {
      setHata('Nickname en az 2 karakter olmalı');
      return;
    }
    if (!cinsiyet) {
      setHata('Cinsiyetini seç');
      return;
    }
    if (!tercih) {
      setHata('Kiminle buluşmak istediğini seç');
      return;
    }
    setYukleniyor(true);
    setHata('');
    try {
      const { error: authError } = await supabase.auth.signInAnonymously();
      if (authError) throw authError;
      sessionStorage.setItem('oops_nickname', nickname.trim());
      sessionStorage.setItem('oops_cinsiyet', cinsiyet);
      sessionStorage.setItem('oops_tercih', tercih);
      onGiris(nickname.trim(), cinsiyet, tercih);
    } catch (e) {
      setHata('Bir hata oluştu, tekrar dene');
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.logo}>oops.</Text>
      <Text style={s.baslik}>who are you?</Text>
      <Text style={s.alt}>pick a nickname — no real names</Text>

      <TextInput
        style={s.input}
        value={nickname}
        onChangeText={setNickname}
        placeholder="your nickname..."
        placeholderTextColor="#444"
        maxLength={20}
        autoCapitalize="none"
      />

      <Text style={s.secimBaslik}>i am a...</Text>
      <View style={s.row}>
        {[
          { id: 'woman', emoji: '👩', label: 'woman' },
          { id: 'man', emoji: '👨', label: 'man' },
          { id: 'other', emoji: '🌈', label: 'other' },
        ].map(item => (
          <TouchableOpacity
            key={item.id}
            style={[s.kart, cinsiyet === item.id && s.kartSecili]}
            onPress={() => setCinsiyet(item.id)}
          >
            <Text style={s.kartEmoji}>{item.emoji}</Text>
            <Text style={[s.kartYazi, cinsiyet === item.id && s.kartYaziSecili]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.secimBaslik}>i want to meet...</Text>
      <View style={s.row}>
        {[
          { id: 'woman', emoji: '👩', label: 'women' },
          { id: 'man', emoji: '👨', label: 'men' },
          { id: 'everyone', emoji: '✨', label: 'everyone' },
        ].map(item => (
          <TouchableOpacity
            key={item.id}
            style={[s.kart, tercih === item.id && s.kartSecili]}
            onPress={() => setTercih(item.id)}
          >
            <Text style={s.kartEmoji}>{item.emoji}</Text>
            <Text style={[s.kartYazi, tercih === item.id && s.kartYaziSecili]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {hata ? <Text style={s.hata}>{hata}</Text> : null}

      <TouchableOpacity
        style={[s.buton, (yukleniyor || !cinsiyet || !tercih) && s.butonDisabled]}
        onPress={kayitOl}
        disabled={yukleniyor || !cinsiyet || !tercih}
      >
        <Text style={s.butonYazi}>
          {yukleniyor ? 'joining...' : 'join oops →'}
        </Text>
      </TouchableOpacity>

      <Text style={s.not}>no email, no password. just a nickname.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center', padding: 32 },
  logo: { fontSize: 42, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  baslik: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  alt: { fontSize: 13, color: '#444', marginBottom: 32, textAlign: 'center' },
  input: { width: '100%', backgroundColor: '#111', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, color: '#fff', fontSize: 16, marginBottom: 28, borderWidth: 0.5, borderColor: '#222' },
  secimBaslik: { fontSize: 13, color: '#444', marginBottom: 12, alignSelf: 'flex-start' },
  row: { flexDirection: 'row', gap: 10, marginBottom: 24, width: '100%' },
  kart: { flex: 1, height: 80, borderRadius: 16, borderWidth: 0.5, borderColor: '#222', alignItems: 'center', justifyContent: 'center', gap: 6 },
  kartSecili: { borderColor: '#fff', backgroundColor: '#111' },
  kartEmoji: { fontSize: 22 },
  kartYazi: { fontSize: 12, color: '#555' },
  kartYaziSecili: { color: '#fff' },
  hata: { color: '#ff4444', fontSize: 13, marginBottom: 16 },
  buton: { width: '100%', backgroundColor: '#fff', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginBottom: 16 },
  butonDisabled: { opacity: 0.5 },
  butonYazi: { fontSize: 16, fontWeight: 'bold', color: '#0a0a0a' },
  not: { fontSize: 12, color: '#333', textAlign: 'center' },
});
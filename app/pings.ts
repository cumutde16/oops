import { supabase } from './supabase';

const mesafeHesapla = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

const konumAl = (): Promise<{latitude: number, longitude: number}> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ latitude: 41.0082, longitude: 28.9784 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => resolve({ latitude: 41.0082, longitude: 28.9784 }),
      { timeout: 5000 }
    );
  });
};

export const pingGonder = async (nickname: string, intention: string, cinsiyet: string, tercih: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const konum = await konumAl();
  console.log('Konum alındı:', konum);

  await supabase.from('pings').delete().eq('user_id', user.id);

  const { data, error } = await supabase
    .from('pings')
    .insert({
      user_id: user.id,
      nickname,
      intention,
      latitude: konum.latitude,
      longitude: konum.longitude,
      is_active: true,
      cinsiyet,
      tercih,
    })
    .select()
    .single();

  if (error) { console.log('Ping hatasi:', error); return null; }
  console.log('Ping gonderildi:', data);
  return data;
};

export const eslesmeBul = async (intention: string, benimId: string, benimCinsiyet: string, benimTercih: string) => {
  for (let i = 0; i < 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Esleme aranıyor (deneme ${i + 1}):`, intention, benimId);

    const benimPing = await supabase
      .from('pings').select('*').eq('user_id', benimId).maybeSingle();

    const { data, error } = await supabase
      .from('pings').select('*')
      .eq('is_active', true)
      .eq('intention', intention)
      .neq('user_id', benimId)
      .limit(20);

    if (!error && data && data.length > 0) {
      const uygunlar = data.filter(p => {
        const onlarBeniIstiyor = p.tercih === benimCinsiyet || p.tercih === 'everyone';
        const benOnlariIstiyorum = benimTercih === p.cinsiyet || benimTercih === 'everyone';
        return onlarBeniIstiyor && benOnlariIstiyorum;
      });

      if (uygunlar.length === 0) continue;

      if (benimPing.data?.latitude) {
        const yakin = uygunlar.filter(p =>
          p.latitude && mesafeHesapla(benimPing.data.latitude, benimPing.data.longitude, p.latitude, p.longitude) < 5000
        );
        if (yakin.length > 0) return yakin[0];
      } else {
        return uygunlar[0];
      }
    }
  }
  return null;
};

export const pingKapat = async (pingId: string) => {
  await supabase.from('pings').update({ is_active: false }).eq('id', pingId);
};

export const mesajGonderGercek = async (matchId: string, nickname: string, icerik: string) => {
  const { error } = await supabase
    .from('messages')
    .insert({ match_id: matchId, sender_nickname: nickname, content: icerik });
  if (error) console.log('Mesaj hatasi:', error);
};

export const mesajlariDinle = (matchId: string, callback: (mesaj: any) => void) => {
  let sonMesajZamani = new Date().toISOString();
  const interval = setInterval(async () => {
    const { data } = await supabase
      .from('messages').select('*')
      .eq('match_id', matchId)
      .gt('created_at', sonMesajZamani)
      .order('created_at', { ascending: true });
    if (data && data.length > 0) {
      sonMesajZamani = data[data.length - 1].created_at;
      data.forEach(mesaj => callback(mesaj));
    }
  }, 2000);
  return { unsubscribe: () => clearInterval(interval) };
};

export const teklifGonder = async (matchId: string, nickname: string, yer: string) => {
  await supabase.from('proposals').delete().eq('match_id', matchId);
  const { data, error } = await supabase
    .from('proposals')
    .insert({ match_id: matchId, sender_nickname: nickname, yer, durum: 'bekliyor' })
    .select().single();
  if (error) { console.log('Teklif hatasi:', error); return null; }
  return data;
};

export const teklifleriDinle = (matchId: string, callback: (teklif: any) => void) => {
  let sonZaman = new Date().toISOString();
  const interval = setInterval(async () => {
    const { data } = await supabase
      .from('proposals').select('*')
      .eq('match_id', matchId)
      .order('created_at', { ascending: false })
      .limit(1);
    if (data && data.length > 0) {
      const teklif = data[0];
      if (teklif.created_at > sonZaman) {
        sonZaman = teklif.created_at;
        callback(teklif);
      }
    }
  }, 2000);
  return { unsubscribe: () => clearInterval(interval) };
};

export const teklifGuncelle = async (teklifId: string, durum: string) => {
  const { error } = await supabase
    .from('proposals').update({ durum }).eq('id', teklifId);
  if (error) console.log('Teklif guncelleme hatasi:', error);
};
export const raporGonder = async (matchId: string, reportedNickname: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from('reports').insert({
    reporter_id: user.id,
    reported_nickname: reportedNickname,
    match_id: matchId,
    tip: 'report',
  });
};

export const engelleKullanici = async (blockedNickname: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from('blocks').insert({
    blocker_id: user.id,
    blocked_nickname: blockedNickname,
  });
};

export const engelliMi = async (nickname: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await supabase
    .from('blocks')
    .select('id')
    .eq('blocker_id', user.id)
    .eq('blocked_nickname', nickname)
    .maybeSingle();
  return !!data;
};
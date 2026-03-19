import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Auth from './auth';
import { DunyaTuru } from './DunyaTuru';
import { engelleKullanici, eslesmeBul, karsiProfilGetir, mesajGonderGercek, mesajlariDinle, pingGonder, raporGonder, teklifGonder, teklifGuncelle, teklifleriDinle } from './pings';
import Profil from './profil';
import { supabase } from './supabase';

const niyetler = [
  { id: 'coffee', emoji: '☕', yazi: 'Coffee' },
  { id: 'walk', emoji: '🚶', yazi: 'Walk' },
  { id: 'date', emoji: '✨', yazi: 'Date' },
  { id: 'drinks', emoji: '🍸', yazi: 'Drinks' },
  { id: 'chat', emoji: '💬', yazi: 'Chat' },
  { id: 'network', emoji: '🤝', yazi: 'Network' },
];

// Her anıt için SVG komponenti
const anitlar = [
  {
    isim: 'Hagia Sophia',
    sehir: 'Istanbul',
    renk: '#e0a030',
    svg: () => (
      <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
        <defs><style>{`@keyframes glow{0%,100%{opacity:0.4}50%{opacity:1}} .w1{animation:glow 3s ease-in-out infinite} .w2{animation:glow 4s ease-in-out infinite 1s}`}</style></defs>
        <rect x="0" y="0" width="680" height="420" fill="#1a1a2e"/>
        <rect x="0" y="0" width="680" height="200" fill="#0f0f20"/>
        {/* Yıldızlar */}
        <circle cx="50" cy="30" r="1" fill="#fff" opacity="0.6"/>
        <circle cx="150" cy="55" r="1.2" fill="#fff" opacity="0.5"/>
        <circle cx="300" cy="25" r="0.9" fill="#fff" opacity="0.7"/>
        <circle cx="450" cy="40" r="1" fill="#fff" opacity="0.5"/>
        <circle cx="580" cy="20" r="1.2" fill="#fff" opacity="0.6"/>
        <circle cx="630" cy="60" r="0.8" fill="#fff" opacity="0.4"/>
        {/* Ay */}
        <circle cx="600" cy="65" r="30" fill="#d4c88a"/>
        <circle cx="588" cy="55" r="26" fill="#1a1a2e"/>
        {/* Arka tepeler */}
        <path d="M0 240 Q120 210 240 228 Q360 208 480 222 Q580 210 680 220 L680 280 L0 280 Z" fill="#0d1520"/>
        {/* Ayasofya */}
        <rect x="190" y="195" width="300" height="160" fill="#c89030"/>
        <ellipse cx="340" cy="188" rx="80" ry="32" fill="#b88020"/>
        <ellipse cx="340" cy="172" rx="55" ry="21" fill="#c89030"/>
        <ellipse cx="340" cy="158" rx="34" ry="14" fill="#b88020"/>
        <rect x="188" y="148" width="20" height="207" fill="#d4a040"/>
        <polygon points="188,148 198,118 208,148" fill="#c09030"/>
        <rect x="472" y="148" width="20" height="207" fill="#d4a040"/>
        <polygon points="472,148 482,118 492,148" fill="#c09030"/>
        <rect x="218" y="165" width="18" height="190" fill="#c8982e"/>
        <polygon points="216,165 227,138 238,165" fill="#b88828"/>
        <rect x="444" y="165" width="18" height="190" fill="#c8982e"/>
        <polygon points="442,165 453,138 464,165" fill="#b88828"/>
        <ellipse cx="200" cy="178" rx="13" ry="5" fill="#a07818"/>
        <ellipse cx="480" cy="178" rx="13" ry="5" fill="#a07818"/>
        <rect className="w1" x="220" y="222" width="18" height="26" rx="9" fill="#884808"/>
        <rect className="w2" x="258" y="222" width="18" height="26" rx="9" fill="#884808"/>
        <rect className="w1" x="404" y="222" width="18" height="26" rx="9" fill="#884808"/>
        <rect className="w2" x="442" y="222" width="18" height="26" rx="9" fill="#884808"/>
        <rect x="302" y="255" width="76" height="100" rx="38" fill="#7a4808"/>
        {/* Su */}
        <rect x="0" y="330" width="680" height="90" fill="#0a1628"/>
        <path d="M0 345 Q170 338 340 345 Q510 352 680 345" stroke="#1a2e4a" strokeWidth="1.5" fill="none"/>
        {/* Yansıma */}
        <rect x="335" y="338" width="4" height="50" fill="#c89030" opacity="0.3"/>
        {/* Zemin */}
        <rect x="0" y="310" width="680" height="24" fill="#1a2a1a"/>
        <circle cx="150" cy="318" r="16" fill="#2a6020"/><rect x="147" y="318" width="6" height="14" fill="#5a3010"/>
        <circle cx="530" cy="315" r="14" fill="#2a6020"/><rect x="527" y="315" width="5" height="12" fill="#5a3010"/>
        <text x="340" y="410" textAnchor="middle" fill="#5a4820" fontSize="12" fontFamily="serif" letterSpacing="3">HAGIA SOPHIA · ISTANBUL</text>
      </svg>
    )
  },
  {
    isim: 'Eiffel Tower',
    sehir: 'Paris',
    renk: '#8a8070',
    svg: () => (
      <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
        <defs><style>{`@keyframes twinkle{0%,100%{opacity:0.2}50%{opacity:1}} .t1{animation:twinkle 2s ease-in-out infinite} .t2{animation:twinkle 3s ease-in-out infinite 1s} .t3{animation:twinkle 2.5s ease-in-out infinite 0.5s}`}</style></defs>
        <rect x="0" y="0" width="680" height="420" fill="#1a1a2e"/>
        <rect x="0" y="0" width="680" height="200" fill="#0f0f22"/>
        <circle className="t1" cx="80" cy="40" r="1.2" fill="#fff"/>
        <circle className="t2" cx="200" cy="25" r="1" fill="#fff"/>
        <circle className="t3" cx="350" cy="45" r="1.3" fill="#fff"/>
        <circle className="t1" cx="500" cy="30" r="1" fill="#fff"/>
        <circle className="t2" cx="620" cy="50" r="1.2" fill="#fff"/>
        <circle cx="580" cy="70" r="28" fill="#d4c88a"/>
        <circle cx="568" cy="60" r="24" fill="#1a1a2e"/>
        <path d="M0 250 Q150 225 300 238 Q450 220 600 232 L680 228 L680 280 L0 280 Z" fill="#0d1520"/>
        {/* Eiffel */}
        <polygon points="340,65 295,310 385,310" fill="#6a6858"/>
        <polygon points="340,65 302,310 378,310" fill="#7a7868"/>
        <rect x="296" y="218" width="88" height="10" fill="#5a5848"/>
        <rect x="300" y="208" width="80" height="14" rx="2" fill="#6a6858"/>
        <rect x="308" y="165" width="64" height="10" fill="#5a5848"/>
        <rect x="311" y="155" width="58" height="14" rx="2" fill="#6a6858"/>
        <rect x="321" y="120" width="38" height="8" fill="#5a5848"/>
        <line x1="340" y1="65" x2="296" y2="218" stroke="#5a5848" strokeWidth="2"/>
        <line x1="340" y1="65" x2="384" y2="218" stroke="#5a5848" strokeWidth="2"/>
        <line x1="340" y1="65" x2="308" y2="218" stroke="#4a4838" strokeWidth="1"/>
        <line x1="340" y1="65" x2="372" y2="218" stroke="#4a4838" strokeWidth="1"/>
        <rect x="337" y="38" width="6" height="30" fill="#6a6858"/>
        <rect x="338" y="28" width="4" height="14" fill="#7a7868"/>
        <rect x="188" y="296" width="304" height="18" fill="#2a2a1e"/>
        <circle cx="140" cy="295" r="18" fill="#2a7020"/><rect x="137" y="295" width="7" height="15" fill="#5a3010"/>
        <circle cx="540" cy="292" r="15" fill="#2a7020"/><rect x="537" y="292" width="6" height="13" fill="#5a3010"/>
        <rect x="0" y="320" width="680" height="100" fill="#0a1020"/>
        <path d="M0 335 Q170 328 340 335 Q510 342 680 335" stroke="#1a2840" strokeWidth="1.5" fill="none"/>
        <rect x="338" y="332" width="3" height="50" fill="#7a7060" opacity="0.3"/>
        <text x="340" y="412" textAnchor="middle" fill="#5a5040" fontSize="12" fontFamily="serif" letterSpacing="3">EIFFEL TOWER · PARIS</text>
      </svg>
    )
  },
  {
    isim: 'Cologne Cathedral',
    sehir: 'Cologne',
    renk: '#5a5870',
    svg: () => (
      <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
        <defs><style>{`@keyframes win{0%,100%{opacity:0.3}50%{opacity:0.9}} .w1{animation:win 3s ease-in-out infinite} .w2{animation:win 4.2s ease-in-out infinite 1s} .w3{animation:win 2.8s ease-in-out infinite 0.5s}`}</style></defs>
        <rect x="0" y="0" width="680" height="420" fill="#1a1a2e"/>
        <circle cx="580" cy="60" r="25" fill="#d4c88a"/>
        <circle cx="570" cy="52" r="22" fill="#1a1a2e"/>
        <circle cx="80" cy="35" r="1" fill="#fff" opacity="0.6"/>
        <circle cx="200" cy="20" r="1.2" fill="#fff" opacity="0.5"/>
        <circle cx="420" cy="42" r="1" fill="#fff" opacity="0.6"/>
        <path d="M0 260 Q120 238 240 250 Q360 232 480 244 L680 238 L680 290 L0 290 Z" fill="#0d1520"/>
        {/* Köln Dom */}
        <rect x="205" y="195" width="270" height="170" fill="#4a4860"/>
        <rect x="192" y="228" width="296" height="112" fill="#424058"/>
        <rect x="192" y="128" width="106" height="242" fill="#4a4860"/>
        <rect x="382" y="128" width="106" height="242" fill="#4a4860"/>
        <rect x="198" y="96" width="94" height="42" fill="#585878"/>
        <rect x="204" y="72" width="82" height="32" fill="#4a4860"/>
        <polygon points="192,72 245,18 298,72" fill="#3a3850"/>
        <polygon points="196,72 245,22 294,72" fill="#484868"/>
        <rect x="388" y="96" width="94" height="42" fill="#585878"/>
        <rect x="394" y="72" width="82" height="32" fill="#4a4860"/>
        <polygon points="382,72 435,18 488,72" fill="#3a3850"/>
        <polygon points="386,72 435,22 484,72" fill="#484868"/>
        <rect x="198" y="158" width="92" height="8" fill="#383858"/>
        <rect x="198" y="180" width="92" height="8" fill="#383858"/>
        <rect x="390" y="158" width="92" height="8" fill="#383858"/>
        <rect x="390" y="180" width="92" height="8" fill="#383858"/>
        <circle cx="340" cy="215" r="22" fill="#28283e"/>
        <circle cx="340" cy="215" r="15" fill="#c8a828" opacity="0.7"/>
        <circle cx="340" cy="215" r="7" fill="#28283e"/>
        <rect className="w1" x="202" y="135" width="13" height="20" rx="7" fill="#c8a828"/>
        <rect className="w2" x="222" y="135" width="13" height="20" rx="7" fill="#c8a828"/>
        <rect className="w3" x="392" y="135" width="13" height="20" rx="7" fill="#c8a828"/>
        <rect className="w1" x="412" y="135" width="13" height="20" rx="7" fill="#c8a828"/>
        <rect className="w2" x="245" y="242" width="22" height="50" rx="11" fill="#28283e"/>
        <rect className="w3" x="313" y="238" width="54" height="55" rx="27" fill="#28283e"/>
        <rect x="245" y="242" width="22" height="50" rx="11" fill="#28283e"/>
        <rect x="413" y="242" width="22" height="50" rx="11" fill="#28283e"/>
        <rect x="0" y="328" width="680" height="92" fill="#0a1020"/>
        <path d="M0 342 Q170 335 340 342 Q510 349 680 342" stroke="#1a2840" strokeWidth="1.5" fill="none"/>
        <rect x="337" y="338" width="3" height="45" fill="#c8a828" opacity="0.25"/>
        <circle cx="155" cy="302" r="15" fill="#2a7020"/><rect x="152" y="302" width="6" height="13" fill="#5a3010"/>
        <circle cx="525" cy="300" r="13" fill="#2a7020"/><rect x="522" y="300" width="5" height="11" fill="#5a3010"/>
        <text x="340" y="412" textAnchor="middle" fill="#484868" fontSize="12" fontFamily="serif" letterSpacing="3">COLOGNE CATHEDRAL</text>
      </svg>
    )
  },
  {
    isim: 'Pyramids of Giza',
    sehir: 'Egypt',
    renk: '#e8c060',
    svg: () => (
      <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
        <defs><style>{`@keyframes star{0%,100%{opacity:0.3}50%{opacity:1}} .s1{animation:star 2s ease-in-out infinite} .s2{animation:star 3.5s ease-in-out infinite 1s}`}</style></defs>
        <rect x="0" y="0" width="680" height="420" fill="#1a0f08"/>
        <rect x="0" y="0" width="680" height="200" fill="#100a04"/>
        <circle className="s1" cx="60" cy="30" r="1.2" fill="#fff"/>
        <circle className="s2" cx="180" cy="18" r="1" fill="#fff"/>
        <circle className="s1" cx="320" cy="38" r="1.3" fill="#fff"/>
        <circle className="s2" cx="480" cy="22" r="1" fill="#fff"/>
        <circle className="s1" cx="610" cy="42" r="1.1" fill="#fff"/>
        <circle cx="580" cy="65" r="32" fill="#d4c070"/>
        <circle cx="567" cy="54" r="28" fill="#1a0f08"/>
        <rect x="0" y="285" width="680" height="135" fill="#c8a030"/>
        <rect x="0" y="295" width="680" height="125" fill="#d4aa38"/>
        {/* Piramitler */}
        <polygon points="340,92 155,295 525,295" fill="#e8c060"/>
        <polygon points="340,92 162,295 518,295" fill="#f0c868"/>
        <line x1="200" y1="295" x2="340" y2="118" stroke="#d8b050" strokeWidth="1" opacity="0.5"/>
        <line x1="340" y1="295" x2="340" y2="92" stroke="#d8b050" strokeWidth="1" opacity="0.5"/>
        <line x1="480" y1="295" x2="340" y2="118" stroke="#d8b050" strokeWidth="1" opacity="0.5"/>
        <line x1="100" y1="245" x2="580" y2="245" stroke="#d8b050" strokeWidth="0.8" opacity="0.4"/>
        <line x1="130" y1="205" x2="550" y2="205" stroke="#d8b050" strokeWidth="0.8" opacity="0.4"/>
        <line x1="165" y1="168" x2="515" y2="168" stroke="#d8b050" strokeWidth="0.8" opacity="0.4"/>
        <polygon points="340,295 590,295 558,215" fill="#d8b040" opacity="0.6"/>
        {/* Küçük piramit */}
        <polygon points="100,295 30,295 58,238" fill="#e0b848"/>
        <polygon points="620,295 650,295 635,252" fill="#e0b848"/>
        {/* Sfenks */}
        <ellipse cx="560" cy="288" rx="55" ry="14" fill="#c8a030"/>
        <rect x="515" y="276" width="95" height="22" fill="#c8a030"/>
        <rect x="580" y="262" width="30" height="36" rx="6" fill="#b89020"/>
        <circle cx="595" cy="258" r="16" fill="#c8a030"/>
        <rect x="589" y="250" width="14" height="10" rx="2" fill="#b89020"/>
        <rect x="590" y="244" width="12" height="8" fill="#c8a838"/>
        {/* Gece gökyüzü yansıması çöl */}
        <rect x="0" y="352" width="680" height="68" fill="#d4aa38"/>
        <text x="340" y="412" textAnchor="middle" fill="#8a6820" fontSize="12" fontFamily="serif" letterSpacing="3">PYRAMIDS OF GIZA · EGYPT</text>
      </svg>
    )
  },
  {
    isim: 'Burj Khalifa',
    sehir: 'Dubai',
    renk: '#c8d0d8',
    svg: () => (
      <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
        <defs><style>{`@keyframes citylight{0%,100%{opacity:0.4}50%{opacity:0.9}} .cl1{animation:citylight 3s ease-in-out infinite} .cl2{animation:citylight 4s ease-in-out infinite 1s} .cl3{animation:citylight 2.5s ease-in-out infinite 0.8s}`}</style></defs>
        <rect x="0" y="0" width="680" height="420" fill="#0a1628"/>
        <rect x="0" y="0" width="680" height="180" fill="#050e1e"/>
        <circle cx="580" cy="55" r="26" fill="#d4c88a"/>
        <circle cx="570" cy="46" r="22" fill="#0a1628"/>
        <circle cx="80" cy="30" r="1" fill="#fff" opacity="0.6"/>
        <circle cx="220" cy="18" r="1.2" fill="#fff" opacity="0.5"/>
        <circle cx="380" cy="35" r="1" fill="#fff" opacity="0.6"/>
        <circle cx="500" cy="22" r="1.1" fill="#fff" opacity="0.5"/>
        {/* City skyline background */}
        <rect x="0" y="220" width="680" height="200" fill="#0d1a30"/>
        <rect x="20" y="240" width="55" height="160" fill="#1a2a40"/>
        <rect x="85" y="255" width="40" height="145" fill="#162238"/>
        <rect x="580" y="235" width="50" height="165" fill="#1a2a40"/>
        <rect x="635" y="250" width="35" height="150" fill="#162238"/>
        {/* Burj Khalifa */}
        <polygon points="340,22 316,295 364,295" fill="#b8c0c8"/>
        <polygon points="340,22 320,295 360,295" fill="#c8d0d8"/>
        <rect x="322" y="268" width="36" height="6" fill="#a8b0b8"/>
        <rect x="324" y="238" width="32" height="6" fill="#a8b0b8"/>
        <rect x="326" y="210" width="28" height="5" fill="#a8b0b8"/>
        <rect x="328" y="184" width="24" height="5" fill="#a8b0b8"/>
        <rect x="330" y="160" width="20" height="4" fill="#a8b0b8"/>
        <rect x="332" y="138" width="16" height="4" fill="#a8b0b8"/>
        <rect x="334" y="118" width="12" height="4" fill="#a8b0b8"/>
        <rect x="335" y="100" width="10" height="3" fill="#a8b0b8"/>
        <rect x="336" y="84" width="8" height="3" fill="#a8b0b8"/>
        <line x1="335" y1="22" x2="322" y2="268" stroke="#b0b8c0" strokeWidth="1"/>
        <line x1="335" y1="22" x2="348" y2="268" stroke="#b0b8c0" strokeWidth="1"/>
        <rect x="337" y="8" width="6" height="18" fill="#c8d0d8"/>
        <rect x="338" y="2" width="4" height="10" fill="#d0d8e0"/>
        <circle cx="340" cy="1" r="3" fill="#e0d020"/>
        {/* Base */}
        <rect x="308" y="285" width="64" height="18" fill="#b0b8c0"/>
        {/* City lights */}
        <rect className="cl1" x="28" y="252" width="8" height="10" rx="2" fill="#f0d060"/>
        <rect className="cl2" x="42" y="248" width="8" height="10" rx="2" fill="#f0d060"/>
        <rect className="cl3" x="56" y="255" width="8" height="10" rx="2" fill="#f0d060"/>
        <rect className="cl1" x="588" y="248" width="8" height="10" rx="2" fill="#f0d060"/>
        <rect className="cl2" x="602" y="255" width="8" height="10" rx="2" fill="#f0d060"/>
        <rect className="cl3" x="642" y="262" width="8" height="10" rx="2" fill="#f0d060"/>
        {/* Palm trees */}
        <rect x="148" y="268" width="6" height="28" fill="#8a6030"/>
        <ellipse cx="151" cy="265" rx="18" ry="10" fill="#2a9020"/>
        <rect x="520" y="268" width="6" height="28" fill="#8a6030"/>
        <ellipse cx="523" cy="265" rx="18" ry="10" fill="#2a9020"/>
        {/* Water reflection */}
        <rect x="0" y="332" width="680" height="88" fill="#060e1e"/>
        <path d="M0 348 Q170 342 340 348 Q510 354 680 348" stroke="#1a2e4a" strokeWidth="1.5" fill="none"/>
        <rect x="338" y="340" width="3" height="50" fill="#c8d0d8" opacity="0.2"/>
        <text x="340" y="412" textAnchor="middle" fill="#4a5868" fontSize="12" fontFamily="serif" letterSpacing="3">BURJ KHALIFA · DUBAI</text>
      </svg>
    )
  },
  {
    isim: 'Colosseum',
    sehir: 'Rome',
    renk: '#d4b870',
    svg: () => (
      <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
        <defs><style>{`@keyframes gw{0%,100%{opacity:0.35}50%{opacity:0.85}} .gw1{animation:gw 3s ease-in-out infinite} .gw2{animation:gw 4s ease-in-out infinite 1.2s}`}</style></defs>
        <rect x="0" y="0" width="680" height="420" fill="#1a1208"/>
        <circle cx="580" cy="60" r="28" fill="#d4c88a"/>
        <circle cx="569" cy="50" r="24" fill="#1a1208"/>
        <circle cx="80" cy="32" r="1" fill="#fff" opacity="0.5"/>
        <circle cx="220" cy="20" r="1.2" fill="#fff" opacity="0.6"/>
        <circle cx="380" cy="38" r="1" fill="#fff" opacity="0.5"/>
        <path d="M0 255 Q120 232 240 245 Q360 228 480 240 L680 235 L680 285 L0 285 Z" fill="#100e06"/>
        {/* Colosseum */}
        <ellipse cx="340" cy="258" rx="225" ry="118" fill="#c8a848"/>
        <ellipse cx="340" cy="258" rx="192" ry="98" fill="#b89030"/>
        <ellipse cx="340" cy="258" rx="158" ry="80" fill="#a88020"/>
        <ellipse cx="340" cy="258" rx="120" ry="60" fill="#987018"/>
        {/* Outer arches */}
        <rect x="120" y="228" width="18" height="42" rx="9" fill="#987018"/>
        <rect x="148" y="218" width="18" height="52" rx="9" fill="#987018"/>
        <rect x="178" y="210" width="18" height="60" rx="9" fill="#987018"/>
        <rect x="210" y="204" width="18" height="66" rx="9" fill="#987018"/>
        <rect x="244" y="200" width="18" height="70" rx="9" fill="#987018"/>
        <rect x="280" y="198" width="18" height="72" rx="9" fill="#987018"/>
        <rect x="318" y="197" width="18" height="73" rx="9" fill="#987018"/>
        <rect x="344" y="197" width="18" height="73" rx="9" fill="#987018"/>
        <rect x="382" y="198" width="18" height="72" rx="9" fill="#987018"/>
        <rect x="418" y="200" width="18" height="70" rx="9" fill="#987018"/>
        <rect x="452" y="204" width="18" height="66" rx="9" fill="#987018"/>
        <rect x="484" y="210" width="18" height="60" rx="9" fill="#987018"/>
        <rect x="514" y="218" width="18" height="52" rx="9" fill="#987018"/>
        <rect x="542" y="228" width="18" height="42" rx="9" fill="#987018"/>
        {/* Top wall */}
        <ellipse cx="340" cy="200" rx="220" ry="28" fill="#c8a848"/>
        <ellipse cx="340" cy="194" rx="192" ry="20" fill="#b89030"/>
        {/* Window lights */}
        <rect className="gw1" x="170" y="222" width="10" height="14" rx="5" fill="#f0d060"/>
        <rect className="gw2" x="240" y="212" width="10" height="14" rx="5" fill="#f0d060"/>
        <rect className="gw1" x="310" y="208" width="10" height="14" rx="5" fill="#f0d060"/>
        <rect className="gw2" x="380" y="208" width="10" height="14" rx="5" fill="#f0d060"/>
        <rect className="gw1" x="450" y="212" width="10" height="14" rx="5" fill="#f0d060"/>
        <rect className="gw2" x="510" y="222" width="10" height="14" rx="5" fill="#f0d060"/>
        {/* Ground */}
        <rect x="0" y="322" width="680" height="98" fill="#100e06"/>
        <circle cx="140" cy="315" r="16" fill="#2a7020"/><rect x="137" y="315" width="6" height="14" fill="#5a3010"/>
        <circle cx="540" cy="312" r="14" fill="#2a7020"/><rect x="537" y="312" width="5" height="12" fill="#5a3010"/>
        <text x="340" y="412" textAnchor="middle" fill="#6a5820" fontSize="12" fontFamily="serif" letterSpacing="3">COLOSSEUM · ROME</text>
      </svg>
    )
  },
  {
    isim: 'Mount Fuji',
    sehir: 'Japan',
    renk: '#e0d8d0',
    svg: () => (
      <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
        <defs><style>{`@keyframes cherry{0%,100%{opacity:0.7}50%{opacity:1}} .ch{animation:cherry 3s ease-in-out infinite}`}</style></defs>
        <rect x="0" y="0" width="680" height="420" fill="#1a0818"/>
        <rect x="0" y="0" width="680" height="200" fill="#12060e"/>
        <circle cx="580" cy="55" r="30" fill="#d4c88a"/>
        <circle cx="568" cy="45" r="26" fill="#1a0818"/>
        <circle cx="80" cy="28" r="1" fill="#fff" opacity="0.6"/>
        <circle cx="240" cy="42" r="1.2" fill="#fff" opacity="0.5"/>
        <circle cx="420" cy="22" r="1" fill="#fff" opacity="0.6"/>
        {/* Mount Fuji */}
        <polygon points="340,68 95,295 585,295" fill="#c8c0b8"/>
        <polygon points="340,68 120,295 560,295" fill="#d8d0c8"/>
        <polygon points="340,68 310,135 370,135" fill="#f0f0f0"/>
        <polygon points="340,68 315,128 365,128" fill="#ffffff"/>
        <path d="M310 135 Q325,122 340,116 Q355,122 370,135" fill="#f8f8f8" opacity="0.8"/>
        <polygon points="340,68 95,295 170,295" fill="#b8b0a8" opacity="0.4"/>
        {/* Torii gate */}
        <rect x="288" y="255" width="10" height="50" fill="#c82820"/>
        <rect x="382" y="255" width="10" height="50" fill="#c82820"/>
        <rect x="280" y="250" width="120" height="12" rx="4" fill="#c82820"/>
        <rect x="285" y="238" width="110" height="10" rx="3" fill="#e03028"/>
        {/* Lake */}
        <ellipse cx="340" cy="305" rx="220" ry="40" fill="#1a3850"/>
        <path d="M120 305 Q230 295 340 305 Q450 315 560 305" stroke="#2a4860" strokeWidth="2" fill="none"/>
        {/* Fuji reflection in lake */}
        <polygon points="340,310 200,348 480,348" fill="#b8b0a8" opacity="0.2"/>
        {/* Cherry blossom trees */}
        <rect x="80" y="270" width="8" height="40" fill="#5a3010"/>
        <ellipse className="ch" cx="84" cy="262" rx="22" ry="16" fill="#f090a0"/>
        <ellipse className="ch" cx="72" cy="270" rx="14" ry="10" fill="#e87090"/>
        <rect x="590" y="270" width="8" height="40" fill="#5a3010"/>
        <ellipse className="ch" cx="594" cy="262" rx="22" ry="16" fill="#f090a0"/>
        <ellipse className="ch" cx="606" cy="270" rx="14" ry="10" fill="#e87090"/>
        {/* Ground */}
        <rect x="0" y="335" width="680" height="85" fill="#0e0610"/>
        <text x="340" y="412" textAnchor="middle" fill="#5a5048" fontSize="12" fontFamily="serif" letterSpacing="3">MOUNT FUJI · JAPAN</text>
      </svg>
    )
  },
  {
    isim: 'Sagrada Família',
    sehir: 'Barcelona',
    renk: '#c8c082',
    svg: () => (
      <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
        <defs><style>{`@keyframes sf{0%,100%{opacity:0.35}50%{opacity:0.9}} .sf1{animation:sf 3s ease-in-out infinite} .sf2{animation:sf 4s ease-in-out infinite 1s} .sf3{animation:sf 2.6s ease-in-out infinite 0.6s}`}</style></defs>
        <rect x="0" y="0" width="680" height="420" fill="#1a1208"/>
        <circle cx="580" cy="55" r="26" fill="#d4c88a"/>
        <circle cx="569" cy="46" r="22" fill="#1a1208"/>
        <circle cx="80" cy="30" r="1" fill="#fff" opacity="0.5"/>
        <circle cx="260" cy="18" r="1.2" fill="#fff" opacity="0.6"/>
        <circle cx="440" cy="38" r="1" fill="#fff" opacity="0.5"/>
        <path d="M0 258 Q120 235 240 248 Q360 230 480 242 L680 236 L680 285 L0 285 Z" fill="#100e06"/>
        {/* Sagrada Familia */}
        <rect x="175" y="190" width="330" height="175" fill="#c8c080"/>
        {/* Spires */}
        <rect x="188" y="128" width="36" height="120" fill="#c0b878"/>
        <polygon points="184,128 206,78 228,128" fill="#b0a868"/>
        <rect x="203" y="72" width="6" height="14" fill="#a09858"/>
        <rect x="240" y="118" width="32" height="130" fill="#ccc882"/>
        <polygon points="236,118 256,65 276,118" fill="#bab870"/>
        <rect x="253" y="59" width="6" height="12" fill="#a09858"/>
        <rect x="292" y="108" width="36" height="140" fill="#c8c080"/>
        <polygon points="288,108 310,52 332,108" fill="#b8b070"/>
        <rect x="307" y="46" width="6" height="14" fill="#a09858"/>
        <rect x="352" y="108" width="36" height="140" fill="#c8c080"/>
        <polygon points="348,108 370,52 392,108" fill="#b8b070"/>
        <rect x="367" y="46" width="6" height="14" fill="#a09858"/>
        <rect x="412" y="118" width="32" height="130" fill="#ccc882"/>
        <polygon points="408,118 428,65 448,118" fill="#bab870"/>
        <rect x="425" y="59" width="6" height="12" fill="#a09858"/>
        <rect x="456" y="128" width="36" height="120" fill="#c0b878"/>
        <polygon points="452,128 474,78 496,128" fill="#b0a868"/>
        <rect x="471" y="72" width="6" height="14" fill="#a09858"/>
        {/* Rose window */}
        <circle cx="340" cy="218" r="22" fill="#b89830" opacity="0.8"/>
        <circle cx="340" cy="218" r="14" fill="#c8aa40" opacity="0.6"/>
        <circle cx="340" cy="218" r="6" fill="#b89830"/>
        {/* Entrance arches */}
        <rect className="sf1" x="210" y="245" width="30" height="50" rx="15" fill="#a09040"/>
        <rect className="sf2" x="252" y="240" width="30" height="55" rx="15" fill="#a09040"/>
        <rect className="sf3" x="325" y="238" width="30" height="57" rx="15" fill="#a09040"/>
        <rect className="sf1" x="398" y="240" width="30" height="55" rx="15" fill="#a09040"/>
        <rect className="sf2" x="440" y="245" width="30" height="50" rx="15" fill="#a09040"/>
        {/* Window lights */}
        <rect className="sf1" x="198" y="152" width="12" height="18" rx="6" fill="#c8a828"/>
        <rect className="sf2" x="254" y="140" width="12" height="18" rx="6" fill="#c8a828"/>
        <rect className="sf3" x="464" y="140" width="12" height="18" rx="6" fill="#c8a828"/>
        <rect className="sf1" x="468" y="152" width="12" height="18" rx="6" fill="#c8a828"/>
        {/* Ground */}
        <rect x="0" y="325" width="680" height="95" fill="#0e0c04"/>
        <circle cx="140" cy="316" r="15" fill="#2a7020"/><rect x="137" y="316" width="6" height="13" fill="#5a3010"/>
        <circle cx="540" cy="314" r="13" fill="#2a7020"/><rect x="537" y="314" width="5" height="11" fill="#5a3010"/>
        <text x="340" y="412" textAnchor="middle" fill="#6a6030" fontSize="12" fontFamily="serif" letterSpacing="3">SAGRADA FAMÍLIA · BARCELONA</text>
      </svg>
    )
  },
];

export default function Index() {
  const [kullanici, setKullanici] = useState(null);
  const [nickname, setNickname] = useState('');
  const [cinsiyet, setCinsiyet] = useState('');
  const [tercih, setTercih] = useState('');
  const [ekran, setEkran] = useState('ana');
  const [niyet, setNiyet] = useState(null);
  const [sure, setSure] = useState(10);
  const [mesajlar, setMesajlar] = useState([]);
  const [yazilan, setYazilan] = useState('');
  const [eslesen, setEslesen] = useState(null);
  const [matchId, setMatchId] = useState(null);
  const [checkinSure, setCheckinSure] = useState(0);
  const [teklifYer, setTeklifYer] = useState('');
  const [mevcutTeklif, setMevcutTeklif] = useState(null);
  const [teklifDurum, setTeklifDurum] = useState('');
  const [sallaniyorMu, setSallaniyorMu] = useState(false);
  const [karsiBekliyor, setKarsiBekliyor] = useState(false);
  const [menuAcik, setMenuAcik] = useState(false);
  const [raporGonderildi, setRaporGonderildi] = useState(false);
  const [randomAnitIndex] = useState(() => Math.floor(Math.random() * anitlar.length));
  const [animasyonOffset] = useState(() => Math.floor(Math.random() * anitlar.length));
  const [profilAcik, setProfilAcik] = useState(false);
  const [karsiProfil, setKarsiProfil] = useState<any>(null);

  const channelRef = useRef(null);
  const teklifChannelRef = useRef(null);
  const scrollRef = useRef(null);
  const nicknameRef = useRef('');
  const cinsiyetRef = useRef('');
  const tercihRef = useRef('');
  const matchIdRef = useRef('');
  const sonSallama = useRef(0);

  const saat = new Date().getHours();
  const gunduzMu = saat >= 6 && saat < 18;

  const RandomAnit = anitlar[randomAnitIndex].svg;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setKullanici(session.user);
        const savedNickname = sessionStorage.getItem('oops_nickname');
        const savedCinsiyet = sessionStorage.getItem('oops_cinsiyet');
        const savedTercih = sessionStorage.getItem('oops_tercih');
        if (savedNickname) { setNickname(savedNickname); nicknameRef.current = savedNickname; }
        if (savedCinsiyet) { setCinsiyet(savedCinsiyet); cinsiyetRef.current = savedCinsiyet; }
        if (savedTercih) { setTercih(savedTercih); tercihRef.current = savedTercih; }
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setKullanici(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (ekran !== 'arama') return;
    let iptal = false;
    const aramaBaslat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      await pingGonder(nicknameRef.current || 'stranger', niyet || 'coffee', cinsiyetRef.current, tercihRef.current);
      setTimeout(async () => {
        if (iptal) return;
        const eslesme = await eslesmeBul(niyet || 'coffee', user?.id || '', cinsiyetRef.current, tercihRef.current);
        if (iptal) return;
        const yeniMatchId = eslesme
          ? [user?.id, eslesme.user_id].sort().join('-')
          : `solo-${user?.id}`;
        matchIdRef.current = yeniMatchId;
        const channel = mesajlariDinle(yeniMatchId, (yeniMesaj) => {
          if (yeniMesaj.sender_nickname !== nicknameRef.current) {
            setMesajlar(prev => [...prev, {
              kim: 'onlar',
              yazi: yeniMesaj.content,
              id: yeniMesaj.id || Date.now(),
            }]);
          }
        });
        channelRef.current = channel;
        setMatchId(yeniMatchId);
        setEslesen(eslesme || null);
        setMesajlar(
          eslesme
            ? [{ kim: 'onlar', yazi: `hey 👋 i'm ${eslesme.nickname}`, id: Date.now() }]
            : [{ kim: 'onlar', yazi: 'hey 👋', id: Date.now() }]
        );
        setEkran('chat');
      }, 3000);
    };
    aramaBaslat();
    return () => { iptal = true; };
  }, [ekran]);

  useEffect(() => {
    if (ekran === 'chat' && sure > 0) {
      const t = setTimeout(() => setSure(sure - 1), 1000);
      return () => clearTimeout(t);
    }
    if (ekran === 'chat' && sure === 0) setEkran('karar');
  }, [ekran, sure]);

  useEffect(() => {
    if (ekran !== 'bulusma') return;
    setCheckinSure(30);
  }, [ekran]);

  useEffect(() => {
    if (ekran !== 'bulusma') return;
    if (checkinSure > 0) {
      const t = setTimeout(() => setCheckinSure(checkinSure - 1), 1000);
      return () => clearTimeout(t);
    }
    if (checkinSure === 0) setEkran('checkin');
  }, [ekran, checkinSure]);

  useEffect(() => {
    if (ekran !== 'teklif') return;
    const mId = matchIdRef.current;
    if (!mId) return;
    const ch = teklifleriDinle(mId, (teklif) => {
      if (teklif.sender_nickname !== nicknameRef.current) {
        setMevcutTeklif(teklif);
        setTeklifDurum('gelen');
      } else if (teklif.durum === 'kabul') {
        setTeklifDurum('kabul');
        setTimeout(() => setEkran('bulusma'), 1500);
      } else if (teklif.durum === 'red') {
        setTeklifDurum('red');
      }
    });
    teklifChannelRef.current = ch;
    return () => ch.unsubscribe();
  }, [ekran]);

  useEffect(() => {
    if (ekran !== 'bulusma') return;
    const handleMotion = (e: any) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const toplam = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
      const simdi = Date.now();
      if (toplam > 30 && simdi - sonSallama.current > 1000) {
        sonSallama.current = simdi;
        setSallaniyorMu(true);
        setKarsiBekliyor(true);
        setTimeout(() => setSallaniyorMu(false), 500);
      }
    };
    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [ekran]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollToEnd({ animated: true });
  }, [mesajlar]);

  const mesajGonder = async () => {
    if (yazilan.trim() === '') return;
    const yazi = yazilan.trim();
    setYazilan('');
    setMesajlar(prev => [...prev, { kim: 'ben', yazi, id: Date.now() }]);
    if (matchId) await mesajGonderGercek(matchId, nicknameRef.current || 'stranger', yazi);
  };

  const teklifGonderFn = async () => {
    if (!teklifYer.trim()) return;
    const mId = matchIdRef.current || matchId;
    if (!mId) return;
    matchIdRef.current = mId as string;
    await teklifGonder(mId as string, nicknameRef.current, teklifYer.trim());
    setTeklifDurum('bekleniyor');
    setTeklifYer('');
  };

  const teklifKabul = async () => {
    if (!mevcutTeklif) return;
    await teklifGuncelle(mevcutTeklif.id, 'kabul');
    setTeklifDurum('kabul');
    setTimeout(() => setEkran('bulusma'), 1500);
  };

  const teklifReddet = async () => {
    if (!mevcutTeklif) return;
    await teklifGuncelle(mevcutTeklif.id, 'red');
    setMevcutTeklif(null);
    setTeklifDurum('');
  };

  const sifirla = () => {
    setEkran('ana');
    setNiyet(null);
    setSure(120);
    setEslesen(null);
    setMatchId(null);
    setMesajlar([]);
    setCheckinSure(0);
    setTeklifYer('');
    setMevcutTeklif(null);
    setTeklifDurum('');
    setKarsiBekliyor(false);
    setMenuAcik(false);
    setRaporGonderildi(false);
    setKarsiProfil(null);
    matchIdRef.current = '';
    if (channelRef.current) { channelRef.current.unsubscribe(); channelRef.current = null; }
    if (teklifChannelRef.current) { teklifChannelRef.current.unsubscribe(); teklifChannelRef.current = null; }
  };

  const dakika = Math.floor(sure / 60);
  const saniye = sure % 60;
  const sureYazi = `${dakika}:${saniye < 10 ? '0' : ''}${saniye}`;
  const seciliNiyet = niyetler.find(n => n.id === niyet);

  if (!kullanici) {
    return <Auth onGiris={(nick, cins, terc) => {
      setNickname(nick); nicknameRef.current = nick;
      setCinsiyet(cins); cinsiyetRef.current = cins;
      setTercih(terc); tercihRef.current = terc;
    }} />;
  }

  if (ekran === 'niyet') {
    return (
      <View style={s.tam}>
        <Text style={s.ustBaslik}>what are you up for?</Text>
        <Text style={s.ustAlt}>hey {nickname} — pick your vibe</Text>
        <View style={s.niyetGrid}>
          {niyetler.map(n => (
            <TouchableOpacity
              key={n.id}
              style={[s.niyetKart, niyet === n.id && s.niyetKartSecili]}
              onPress={() => setNiyet(n.id)}
            >
              <Text style={s.niyetEmoji}>{n.emoji}</Text>
              <Text style={[s.niyetYazi, niyet === n.id && s.niyetYaziSecili]}>{n.yazi}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {niyet && (
          <TouchableOpacity style={s.baslatButon} onPress={() => setEkran('arama')}>
            <Text style={s.baslatYazi}>ping →</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (ekran === 'arama') {
    return (
      <View style={{ flex: 1, height: '100vh', overflow: 'hidden' }}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <DunyaTuru startOffset={animasyonOffset} />
        </View>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'rgba(10,10,10,0.7)', borderRadius: 24, padding: 32, alignItems: 'center', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.15)' }}>
            <Text style={{ fontSize: 36, marginBottom: 16 }}>🔍</Text>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>looking around...</Text>
            <Text style={{ fontSize: 14, color: '#888' }}>finding someone nearby</Text>
          </View>
        </View>
      </View>
    );
  }

  if (ekran === 'chat') {
    return (
      <View style={[s.tam, { padding: 0 }]}>
        <View style={s.chatUst}>
          <View>
            <Text style={s.nick}>{eslesen ? eslesen.nickname : 'stranger'}</Text>
            <Text style={s.niyetBadge}>{seciliNiyet?.emoji} {seciliNiyet?.yazi}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={[s.sure, sure < 30 && s.sureSon]}>{sureYazi}</Text>
            <TouchableOpacity onPress={() => setMenuAcik(!menuAcik)} style={{ padding: 8 }}>
              <Text style={{ color: '#555', fontSize: 22 }}>⋯</Text>
            </TouchableOpacity>
          </View>
        </View>

        {menuAcik && (
          <View style={{
            position: 'absolute', top: 80, right: 16, zIndex: 100,
            backgroundColor: '#111', borderRadius: 16, borderWidth: 0.5,
            borderColor: '#222', overflow: 'hidden',
          }}>
            <TouchableOpacity
              style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 10 }}
              onPress={async () => {
                setMenuAcik(false);
                if (matchId && eslesen) {
                  await raporGonder(matchId, eslesen.nickname);
                  setRaporGonderildi(true);
                }
              }}
            >
              <Text style={{ fontSize: 18 }}>🚩</Text>
              <Text style={{ color: raporGonderildi ? '#555' : '#fff', fontSize: 15 }}>
                {raporGonderildi ? 'Reported ✓' : 'Report'}
              </Text>
            </TouchableOpacity>
            <View style={{ height: 0.5, backgroundColor: '#222' }}/>
            <TouchableOpacity
              style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 10 }}
              onPress={async () => {
                setMenuAcik(false);
                if (eslesen) {
                  await engelleKullanici(eslesen.nickname);
                  sifirla();
                }
              }}
            >
              <Text style={{ fontSize: 18 }}>🚫</Text>
              <Text style={{ color: '#ff4444', fontSize: 15 }}>Block</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView ref={scrollRef} style={s.mesajlar} contentContainerStyle={{ padding: 20, gap: 8 }}>
          {mesajlar.map((m) => (
            <View key={m.id} style={[s.mesajSatir, m.kim === 'ben' && s.sagSatir]}>
              <View style={[s.balon, m.kim === 'ben' ? s.benBalon : s.onlarBalon]}>
                <Text style={[s.balonYazi, m.kim === 'ben' && s.benYazi]}>{m.yazi}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={s.chatAlt}>
          <TextInput
            style={s.input}
            value={yazilan}
            onChangeText={setYazilan}
            placeholder="say something..."
            placeholderTextColor="#444"
            onSubmitEditing={mesajGonder}
          />
          <TouchableOpacity style={s.gonderButon} onPress={mesajGonder}>
            <Text style={s.gonderYazi}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (ekran === 'karar') {
    return (
      <View style={s.tam}>
        <Text style={s.emoji}>⏱️</Text>
        <Text style={s.baslik}>time's up.</Text>
        <Text style={s.alt}>check out their profile!</Text>
        <TouchableOpacity style={s.meet} onPress={async () => {
          const mId = matchIdRef.current || matchId;
          if (mId) matchIdRef.current = mId as string;
          if (eslesen) {
            const p = await karsiProfilGetir(eslesen.nickname);
            setKarsiProfil(p);
          }
          setEkran('profil_goster');
        }}>
          <Text style={s.meetYazi}>see profile →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.pass, { marginTop: 16 }]} onPress={sifirla}>
          <Text style={s.passYazi}>pass</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (ekran === 'profil_goster') {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0a' }} contentContainerStyle={{ padding: 24, paddingTop: 60 }}>
        <Text style={{ fontSize: 13, color: '#555', textAlign: 'center', marginBottom: 24, letterSpacing: 2 }}>
          {eslesen?.nickname}
        </Text>
        {karsiProfil?.foto1 && (
          <View style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 12 }}>
            <img src={karsiProfil.foto1} style={{ width: '100%', height: 320, objectFit: 'cover' }}/>
          </View>
        )}
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 24 }}>
          {karsiProfil?.foto2 && (
            <View style={{ flex: 1, borderRadius: 16, overflow: 'hidden' }}>
              <img src={karsiProfil.foto2} style={{ width: '100%', height: 160, objectFit: 'cover' }}/>
            </View>
          )}
          {karsiProfil?.foto3 && (
            <View style={{ flex: 1, borderRadius: 16, overflow: 'hidden' }}>
              <img src={karsiProfil.foto3} style={{ width: '100%', height: 160, objectFit: 'cover' }}/>
            </View>
          )}
        </View>
        {karsiProfil?.motto && (
          <View style={{ backgroundColor: '#0f0f0f', borderRadius: 16, padding: 20, marginBottom: 12, borderWidth: 0.5, borderColor: '#1a1a1a' }}>
            <Text style={{ fontSize: 11, color: '#555', letterSpacing: 2, marginBottom: 8 }}>✦ MOTTO</Text>
            <Text style={{ fontSize: 16, color: '#fff', fontStyle: 'italic' }}>\{karsiProfil.motto}\</Text>
          </View>
        )}
        {karsiProfil?.sevdikleri && (
          <View style={{ backgroundColor: '#0f0f0f', borderRadius: 16, padding: 20, marginBottom: 12, borderWidth: 0.5, borderColor: '#1a1a1a' }}>
            <Text style={{ fontSize: 11, color: '#555', letterSpacing: 2, marginBottom: 8 }}>♥ LOVES</Text>
            <Text style={{ fontSize: 15, color: '#fff' }}>{karsiProfil.sevdikleri}</Text>
          </View>
        )}
        {karsiProfil?.surpriz && (
          <View style={{ backgroundColor: '#0f0f0f', borderRadius: 16, padding: 20, marginBottom: 32, borderWidth: 0.5, borderColor: '#1a1a1a' }}>
            <Text style={{ fontSize: 11, color: '#555', letterSpacing: 2, marginBottom: 8 }}>✦ SURPRISE</Text>
            <Text style={{ fontSize: 15, color: '#fff' }}>{karsiProfil.surpriz}</Text>
          </View>
        )}
        {!karsiProfil?.foto1 && !karsiProfil?.motto && (
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Text style={{ fontSize: 32, marginBottom: 16 }}>🌚</Text>
            <Text style={{ color: '#555', fontSize: 14, textAlign: 'center' }}>they haven't filled their profile yet</Text>
          </View>
        )}
        <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center', paddingBottom: 40 }}>
          <TouchableOpacity style={s.pass} onPress={sifirla}>
            <Text style={s.passYazi}>Pass</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.meet} onPress={() => setEkran('teklif')}>
            <Text style={s.meetYazi}>Meet ✓</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  if (ekran === 'teklif') {
    const benKadinim = cinsiyetRef.current === 'woman';
    return (
      <View style={s.tam}>
        <Text style={s.emoji}>📍</Text>
        <Text style={s.baslik}>where to meet?</Text>
        <Text style={s.alt}>
          {benKadinim ? 'you choose the spot 🙌' : 'waiting for them to pick a spot...'}
        </Text>
        {teklifDurum === 'gelen' && mevcutTeklif && (
          <View style={s.teklifKart}>
            <Text style={s.teklifIsim}>{mevcutTeklif.sender_nickname} suggests:</Text>
            <Text style={s.teklifYer}>📍 {mevcutTeklif.yer}</Text>
            <View style={s.teklifButonlar}>
              <TouchableOpacity style={s.teklifEvet} onPress={teklifKabul}>
                <Text style={s.teklifEvetYazi}>yes, let's go! ✓</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.teklifHayir} onPress={teklifReddet}>
                <Text style={s.teklifHayirYazi}>not feeling it</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {teklifDurum === 'bekleniyor' && (
          <View style={s.teklifBekle}>
            <Text style={s.teklifBekleYazi}>waiting for their response...</Text>
          </View>
        )}
        {teklifDurum === 'kabul' && (
          <View style={s.teklifBekle}>
            <Text style={s.teklifKabulYazi}>✓ it's on! heading there...</Text>
          </View>
        )}
        {teklifDurum === 'red' && benKadinim && (
          <Text style={s.teklifRedYazi}>they want somewhere else — suggest another spot</Text>
        )}
        {teklifDurum === 'red' && !benKadinim && (
          <View style={s.teklifBekle}>
            <Text style={s.teklifBekleYazi}>waiting for a new suggestion...</Text>
          </View>
        )}
        {benKadinim && (teklifDurum === '' || teklifDurum === 'red') && (
          <View style={s.teklifInput}>
            <TextInput
              style={s.input}
              value={teklifYer}
              onChangeText={setTeklifYer}
              placeholder="suggest a place..."
              placeholderTextColor="#444"
              onSubmitEditing={teklifGonderFn}
            />
            <TouchableOpacity style={s.gonderButon} onPress={teklifGonderFn}>
              <Text style={s.gonderYazi}>→</Text>
            </TouchableOpacity>
          </View>
        )}
        {!benKadinim && teklifDurum === '' && (
          <View style={s.teklifBekle}>
            <Text style={s.teklifBekleYazi}>waiting for them to pick a spot... 🙏</Text>
          </View>
        )}
        <TouchableOpacity style={[s.pass, { marginTop: 24 }]} onPress={sifirla}>
          <Text style={s.passYazi}>cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (ekran === 'bulusma') {
    return (
      <View style={s.tam}>
        <Text style={[s.emoji, sallaniyorMu && { fontSize: 72 }]}>
          {sallaniyorMu ? '💥' : '🤝'}
        </Text>
        <Text style={s.baslik}>on your way!</Text>
        <Text style={s.alt}>
          {karsiBekliyor ? 'waiting for them to shake too...' : 'when you meet — shake your phones together!'}
        </Text>
        <View style={s.sallamaKart}>
          <Text style={s.sallamaYazi}>📱 shake to confirm meeting</Text>
          <Text style={s.sallamaAlt}>both phones need to shake at the same time</Text>
        </View>
        <Text style={s.checkinBilgi}>we'll check in with you in 30 min 🙏</Text>
        <TouchableOpacity style={s.pass} onPress={sifirla}>
          <Text style={s.passYazi}>done</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (ekran === 'checkin') {
    return (
      <View style={s.tam}>
        <Text style={s.checkinEmoji}>🙏</Text>
        <Text style={s.baslik}>are you safe?</Text>
        <Text style={s.alt}>just checking in — how's it going?</Text>
        <View style={s.butonlar}>
          <TouchableOpacity style={s.meet} onPress={sifirla}>
            <Text style={s.meetYazi}>all good ✓</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.acilButon} onPress={() => setEkran('acil')}>
            <Text style={s.acilYazi}>need help</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (ekran === 'acil') {
    return (
      <View style={s.tam}>
        <Text style={s.acilEmoji}>🆘</Text>
        <Text style={s.baslik}>stay calm.</Text>
        <Text style={s.alt}>you're not alone. here's what to do:</Text>
        <View style={s.acilKart}>
          <Text style={s.acilAdim}>1. Go to a busy, public place</Text>
          <Text style={s.acilAdim}>2. Call someone you trust</Text>
          <Text style={s.acilAdim}>3. Call emergency: 112</Text>
        </View>
        <TouchableOpacity
          style={s.araButon}
          onPress={() => { if (typeof window !== 'undefined') window.location.href = 'tel:112'; }}
        >
          <Text style={s.araYazi}>call 112 now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.pass, { marginTop: 16 }]} onPress={sifirla}>
          <Text style={s.passYazi}>i'm safe now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (profilAcik) {
    return <Profil onKapat={() => setProfilAcik(false)} />;
  }

  return (
    <View style={s.container}>
      <View style={s.harita}>
        <RandomAnit />
      </View>
      <View style={s.panel}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 4 }}>
          <Text style={s.logo}>oops.</Text>
          <TouchableOpacity onPress={() => setProfilAcik(true)} style={{ padding: 8 }}>
            <Text style={{ fontSize: 24 }}>👤</Text>
          </TouchableOpacity>
        </View>
        <Text style={s.nick2}>hey, {nickname}</Text>
        <Text style={s.alt}>someone nearby is waiting</Text>
        <TouchableOpacity style={s.buton} onPress={() => setEkran('niyet')}>
          <Text style={s.passYazi}>PING</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', height: '100vh', flexDirection: 'column' },
  harita: { flexGrow: 1, backgroundColor: '#0a0a0a', minHeight: 300, overflow: 'hidden' },
  panel: { padding: 36, alignItems: 'center', backgroundColor: '#0a0a0a', borderTopWidth: 0.5, borderTopColor: '#1a1a1a' },
  logo: { fontSize: 36, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  nick2: { fontSize: 13, color: '#444', marginBottom: 4 },
  tam: { flex: 1, backgroundColor: '#0a0a0a', height: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 },
  ustBaslik: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: 80, marginBottom: 8 },
  ustAlt: { fontSize: 13, color: '#444', textAlign: 'center', marginBottom: 48 },
  niyetGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, paddingHorizontal: 24 },
  niyetKart: { width: 140, height: 100, borderRadius: 16, borderWidth: 0.5, borderColor: '#222', alignItems: 'center', justifyContent: 'center', gap: 8 },
  niyetKartSecili: { borderColor: '#fff', backgroundColor: '#111' },
  niyetEmoji: { fontSize: 28 },
  niyetYazi: { fontSize: 14, color: '#555' },
  niyetYaziSecili: { color: '#fff' },
  baslatButon: { marginTop: 48, paddingHorizontal: 40, paddingVertical: 16, borderRadius: 30, backgroundColor: '#fff' },
  baslatYazi: { fontSize: 16, fontWeight: 'bold', color: '#0a0a0a' },
  chatUst: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, borderBottomWidth: 0.5, borderBottomColor: '#1a1a1a', width: '100%' },
  nick: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 2 },
  niyetBadge: { fontSize: 12, color: '#444' },
  sure: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  sureSon: { color: '#ff4444' },
  mesajlar: { flex: 1, width: '100%' },
  mesajSatir: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 8 },
  sagSatir: { justifyContent: 'flex-end' },
  balon: { maxWidth: '70%', padding: 12, borderRadius: 18 },
  onlarBalon: { backgroundColor: '#141414', borderWidth: 0.5, borderColor: '#2a2a2a' },
  benBalon: { backgroundColor: '#ffffff' },
  balonYazi: { fontSize: 15, color: '#fff' },
  benYazi: { color: '#0a0a0a' },
  chatAlt: { flexDirection: 'row', padding: 16, gap: 10, borderTopWidth: 0.5, borderTopColor: '#1a1a1a', width: '100%' },
  input: { flex: 1, backgroundColor: '#0f0f0f', borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, color: '#fff', fontSize: 15, borderWidth: 0.5, borderColor: '#222' },
  gonderButon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  gonderYazi: { fontSize: 18, color: '#0a0a0a' },
  emoji: { fontSize: 48, textAlign: 'center', marginBottom: 24 },
  checkinEmoji: { fontSize: 64, textAlign: 'center', marginBottom: 24 },
  acilEmoji: { fontSize: 64, textAlign: 'center', marginBottom: 24 },
  baslik: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 8 },
  alt: { fontSize: 14, color: '#444', textAlign: 'center', marginBottom: 24 },
  checkinBilgi: { fontSize: 13, color: '#333', textAlign: 'center', marginBottom: 24 },
  butonlar: { flexDirection: 'row', gap: 16, justifyContent: 'center' },
  buton: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  pass: { paddingHorizontal: 32, height: 52, borderRadius: 26, borderWidth: 0.5, borderColor: '#2a2a2a', alignItems: 'center', justifyContent: 'center' },
  meet: { paddingHorizontal: 32, height: 52, borderRadius: 26, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  passYazi: { color: '#444', fontSize: 16 },
  meetYazi: { color: '#0a0a0a', fontSize: 16, fontWeight: 'bold' },
  acilButon: { paddingHorizontal: 32, height: 52, borderRadius: 26, backgroundColor: '#ff3333', alignItems: 'center', justifyContent: 'center' },
  acilYazi: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  acilKart: { width: '100%', backgroundColor: '#111', borderRadius: 16, padding: 24, marginBottom: 32, gap: 16, borderWidth: 0.5, borderColor: '#222' },
  acilAdim: { fontSize: 15, color: '#fff', lineHeight: 24 },
  araButon: { width: '100%', backgroundColor: '#ff3333', borderRadius: 16, paddingVertical: 18, alignItems: 'center' },
  araYazi: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  teklifKart: { width: '100%', backgroundColor: '#111', borderRadius: 20, padding: 24, marginBottom: 24, borderWidth: 0.5, borderColor: '#222', gap: 12 },
  teklifIsim: { fontSize: 13, color: '#555' },
  teklifYer: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  teklifButonlar: { flexDirection: 'column', gap: 10, marginTop: 8 },
  teklifEvet: { backgroundColor: '#fff', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  teklifEvetYazi: { color: '#0a0a0a', fontSize: 15, fontWeight: 'bold' },
  teklifHayir: { borderWidth: 0.5, borderColor: '#333', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  teklifHayirYazi: { color: '#555', fontSize: 15 },
  teklifBekle: { backgroundColor: '#111', borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 0.5, borderColor: '#222', width: '100%' },
  teklifBekleYazi: { color: '#555', fontSize: 14, textAlign: 'center' },
  teklifKabulYazi: { color: '#4caf50', fontSize: 15, textAlign: 'center', fontWeight: 'bold' },
  teklifRedYazi: { color: '#ff4444', fontSize: 13, textAlign: 'center', marginBottom: 16 },
  teklifInput: { flexDirection: 'row', gap: 10, width: '100%' },
  sallamaKart: { width: '100%', backgroundColor: '#111', borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 0.5, borderColor: '#222', alignItems: 'center', gap: 8 },
  sallamaYazi: { fontSize: 16, color: '#fff' },
  sallamaAlt: { fontSize: 12, color: '#444', textAlign: 'center' },
});
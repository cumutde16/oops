// Her şehrin animasyondaki yaklaşık başlangıç offseti (px)
const sehirOffsetleri = [0, 262, 554, 838, 1108, 1408, 1740, 1952, 2282, 2600, 2940, 3138, 3408];

export const DunyaTuru = ({ startOffset = 0 }: { startOffset?: number }) => {
  const offset = sehirOffsetleri[startOffset % sehirOffsetleri.length];
  const animStyle = `
    @keyframes scroll{0%{transform:translateX(-${offset}px)}100%{transform:translateX(-${4200 + offset}px)}}
    @keyframes cloud1{0%,100%{transform:translateX(0)}50%{transform:translateX(22px)}}
    @keyframes cloud2{0%,100%{transform:translateX(0)}50%{transform:translateX(-16px)}}
    @keyframes plane{0%{transform:translateX(-70px)}100%{transform:translateX(750px)}}
    @keyframes balloon{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    .sahne{animation:scroll 72s linear infinite}
    .cl1{animation:cloud1 13s ease-in-out infinite}
    .cl2{animation:cloud2 19s ease-in-out infinite}
    .cl3{animation:cloud1 26s ease-in-out infinite 5s}
    .pln{animation:plane 18s linear infinite}
    .bl1{animation:balloon 4s ease-in-out infinite}
    .bl2{animation:balloon 5.5s ease-in-out infinite 1.5s}
    .bl3{animation:balloon 3.8s ease-in-out infinite 2.8s}
  `;

  return (
    <svg width="100%" height="100%" viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><style>{animStyle}</style></defs>

      <rect x="0" y="0" width="680" height="360" fill="#5ab8f0"/>
      <rect x="0" y="0" width="680" height="90" fill="#72c8f8"/>
      <circle cx="625" cy="48" r="34" fill="#ffd030"/>
      <circle cx="625" cy="48" r="25" fill="#ffe050"/>

      <g className="cl1"><ellipse cx="88" cy="48" rx="66" ry="20" fill="#fff" opacity="0.95"/><ellipse cx="62" cy="58" rx="36" ry="15" fill="#fff" opacity="0.95"/><ellipse cx="114" cy="58" rx="40" ry="14" fill="#fff" opacity="0.95"/></g>
      <g className="cl2"><ellipse cx="350" cy="36" rx="56" ry="18" fill="#fff" opacity="0.9"/><ellipse cx="325" cy="45" rx="30" ry="13" fill="#fff" opacity="0.9"/><ellipse cx="374" cy="45" rx="34" ry="13" fill="#fff" opacity="0.9"/></g>
      <g className="cl3"><ellipse cx="530" cy="55" rx="48" ry="16" fill="#fff" opacity="0.85"/><ellipse cx="508" cy="63" rx="27" ry="12" fill="#fff" opacity="0.85"/><ellipse cx="553" cy="63" rx="29" ry="11" fill="#fff" opacity="0.85"/></g>

      <g className="pln"><rect x="0" y="30" width="52" height="10" rx="5" fill="#f0f0f0"/><polygon points="52,35 68,35 61,30" fill="#e0e0e0"/><rect x="12" y="22" width="22" height="6" rx="3" fill="#e8e8e8"/><rect x="8" y="40" width="16" height="4" rx="2" fill="#d0d0d0"/></g>

      <g className="bl1" transform="translate(200,28)"><ellipse cx="0" cy="0" rx="17" ry="22" fill="#e02020"/><line x1="-17" y1="0" x2="17" y2="0" stroke="#b81818" strokeWidth="1.5"/><line x1="0" y1="-22" x2="0" y2="22" stroke="#b81818" strokeWidth="1.5"/><line x1="-7" y1="20" x2="-6" y2="30" stroke="#7a4010" strokeWidth="2"/><line x1="7" y1="20" x2="6" y2="30" stroke="#7a4010" strokeWidth="2"/><rect x="-6" y="30" width="12" height="7" rx="2" fill="#7a4010"/></g>
      <g className="bl2" transform="translate(430,22)"><ellipse cx="0" cy="0" rx="14" ry="18" fill="#f09020"/><line x1="-14" y1="0" x2="14" y2="0" stroke="#d07010" strokeWidth="1.2"/><line x1="0" y1="-18" x2="0" y2="18" stroke="#d07010" strokeWidth="1.2"/><line x1="-6" y1="16" x2="-5" y2="24" stroke="#7a4010" strokeWidth="1.5"/><line x1="6" y1="16" x2="5" y2="24" stroke="#7a4010" strokeWidth="1.5"/><rect x="-5" y="24" width="10" height="7" rx="2" fill="#7a4010"/></g>
      <g className="bl3" transform="translate(560,32)"><ellipse cx="0" cy="0" rx="12" ry="16" fill="#30b040"/><line x1="-12" y1="0" x2="12" y2="0" stroke="#208030" strokeWidth="1"/><line x1="0" y1="-16" x2="0" y2="16" stroke="#208030" strokeWidth="1"/><line x1="-5" y1="14" x2="-4" y2="22" stroke="#7a4010" strokeWidth="1.5"/><line x1="5" y1="14" x2="4" y2="22" stroke="#7a4010" strokeWidth="1.5"/><rect x="-5" y="22" width="10" height="6" rx="2" fill="#7a4010"/></g>

      <path d="M0 248 Q100 218 200 232 Q300 212 400 226 Q500 210 600 222 L680 218 L680 270 L0 270 Z" fill="#5a9840"/>
      <path d="M0 260 Q100 242 200 252 Q300 238 400 250 Q500 236 600 246 L680 242 L680 270 L0 270 Z" fill="#4a8830"/>
      <rect x="0" y="266" width="680" height="94" fill="#c8a840"/>
      <rect x="0" y="290" width="680" height="70" fill="#b89830"/>
      <rect x="0" y="316" width="680" height="18" fill="#a08828"/>

      <g className="sahne">
        <g transform="translate(15,0)">
          <rect x="55" y="246" width="162" height="24" fill="#8a7840"/>
          <rect x="65" y="186" width="116" height="90" fill="#5a5870"/>
          <rect x="56" y="216" width="134" height="58" fill="#4e4c68"/>
          <rect x="58" y="118" width="46" height="156" fill="#5a5870"/>
          <rect x="142" y="118" width="46" height="156" fill="#5a5870"/>
          <rect x="60" y="88" width="42" height="36" fill="#686880"/>
          <rect x="63" y="65" width="36" height="28" fill="#585870"/>
          <polygon points="58,65 82,12 106,65" fill="#48486a"/>
          <polygon points="62,65 82,16 102,65" fill="#585878"/>
          <rect x="144" y="88" width="42" height="36" fill="#686880"/>
          <rect x="147" y="65" width="36" height="28" fill="#585870"/>
          <polygon points="142,65 166,12 190,65" fill="#48486a"/>
          <polygon points="146,65 166,16 186,65" fill="#585878"/>
          <rect x="60" y="145" width="42" height="7" fill="#484868"/>
          <rect x="60" y="168" width="42" height="7" fill="#484868"/>
          <rect x="144" y="145" width="42" height="7" fill="#484868"/>
          <rect x="144" y="168" width="42" height="7" fill="#484868"/>
          <circle cx="124" cy="200" r="17" fill="#28283e"/>
          <circle cx="124" cy="200" r="12" fill="#c8a828" opacity="0.8"/>
          <circle cx="124" cy="200" r="6" fill="#28283e"/>
          <rect x="64" y="124" width="10" height="16" rx="5" fill="#c8a828" opacity="0.85"/>
          <rect x="148" y="124" width="10" height="16" rx="5" fill="#c8a828" opacity="0.85"/>
          <rect x="103" y="224" width="30" height="50" rx="15" fill="#28283e"/>
          <circle cx="40" cy="268" r="12" fill="#2a9020"/><rect x="37" y="268" width="5" height="10" fill="#5a3010"/>
          <text x="120" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Cologne Cathedral</text>
        </g>

        <g transform="translate(262,0)">
          <rect x="10" y="246" width="220" height="24" fill="#c4a840"/>
          <rect x="10" y="212" width="58" height="62" fill="#c8c0a0"/>
          <rect x="10" y="204" width="58" height="12" fill="#d0c8a8"/>
          <rect x="10" y="195" width="14" height="12" rx="2" fill="#c8c0a0"/>
          <rect x="28" y="195" width="14" height="12" rx="2" fill="#c8c0a0"/>
          <rect x="46" y="195" width="14" height="12" rx="2" fill="#c8c0a0"/>
          <rect x="14" y="218" width="48" height="32" fill="#c0b8a0"/>
          <rect x="16" y="220" width="10" height="8" rx="2" fill="#e03030" opacity="0.75"/>
          <rect x="30" y="222" width="9" height="7" rx="2" fill="#3080e0" opacity="0.75"/>
          <rect x="43" y="219" width="12" height="10" rx="2" fill="#30b040" opacity="0.75"/>
          <text x="37" y="236" textAnchor="middle" fill="#1a1a1a" fontSize="7" fontFamily="sans-serif" fontWeight="bold">FREIHEIT</text>
          <rect x="58" y="150" width="148" height="38" fill="#d8c888"/>
          <rect x="67" y="136" width="134" height="18" fill="#c8b870"/>
          <rect x="90" y="122" width="88" height="17" fill="#c0b068"/>
          <rect x="64" y="188" width="18" height="82" fill="#d4c880"/>
          <rect x="88" y="188" width="18" height="82" fill="#ccc078"/>
          <rect x="112" y="188" width="18" height="82" fill="#d4c880"/>
          <rect x="136" y="188" width="18" height="82" fill="#ccc078"/>
          <rect x="160" y="188" width="18" height="82" fill="#d4c880"/>
          <rect x="184" y="188" width="18" height="82" fill="#ccc078"/>
          <rect x="60" y="267" width="148" height="8" fill="#c8bc70"/>
          <rect x="80" y="216" width="36" height="64" rx="18" fill="#a09848"/>
          <rect x="152" y="216" width="36" height="64" rx="18" fill="#a09848"/>
          <rect x="204" y="212" width="22" height="62" fill="#c8c0a0"/>
          <text x="120" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Berlin Wall</text>
        </g>

        <g transform="translate(554,0)">
          <rect x="28" y="250" width="212" height="20" fill="#b89030"/>
          <rect x="48" y="188" width="158" height="86" fill="#e0a030"/>
          <ellipse cx="127" cy="181" rx="58" ry="23" fill="#d09020"/>
          <ellipse cx="127" cy="170" rx="40" ry="16" fill="#e09828"/>
          <ellipse cx="127" cy="159" rx="26" ry="11" fill="#c88018"/>
          <rect x="125" y="142" width="5" height="20" fill="#a06810"/>
          <circle cx="127" cy="140" r="6" fill="#e8a020"/>
          <ellipse cx="48" cy="212" rx="26" ry="10" fill="#c88018"/>
          <ellipse cx="206" cy="212" rx="26" ry="10" fill="#c88018"/>
          <rect x="30" y="133" width="14" height="140" fill="#d4b048"/>
          <rect x="28" y="125" width="18" height="12" fill="#c8a038"/>
          <polygon points="28,125 37,100 46,125" fill="#b88828"/>
          <rect x="198" y="133" width="14" height="140" fill="#d4b048"/>
          <rect x="196" y="125" width="18" height="12" fill="#c8a038"/>
          <polygon points="196,125 205,100 214,125" fill="#b88828"/>
          <rect x="52" y="150" width="12" height="122" fill="#d0a840"/>
          <polygon points="50,150 58,126 66,150" fill="#b88828"/>
          <rect x="178" y="150" width="12" height="122" fill="#d0a840"/>
          <polygon points="176,150 184,126 192,150" fill="#b88828"/>
          <rect x="68" y="205" width="13" height="21" rx="7" fill="#884808"/>
          <rect x="92" y="205" width="13" height="21" rx="7" fill="#884808"/>
          <rect x="148" y="205" width="13" height="21" rx="7" fill="#884808"/>
          <rect x="172" y="205" width="13" height="21" rx="7" fill="#884808"/>
          <rect x="107" y="236" width="34" height="52" rx="17" fill="#784208"/>
          <circle cx="24" cy="266" r="13" fill="#2a9020"/><rect x="21" y="266" width="6" height="12" fill="#5a3010"/>
          <text x="127" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Hagia Sophia</text>
        </g>

        <g transform="translate(838,0)">
          <rect x="10" y="250" width="200" height="20" fill="#d4a840"/>
          <ellipse cx="40" cy="240" rx="18" ry="35" fill="#d49560"/>
          <rect x="35" y="205" width="11" height="40" fill="#c88548"/>
          <ellipse cx="40" cy="204" rx="16" ry="10" fill="#c88548"/>
          <ellipse cx="80" cy="235" rx="14" ry="28" fill="#e0a868"/>
          <rect x="76" y="208" width="9" height="32" fill="#d09858"/>
          <ellipse cx="80" cy="207" rx="12" ry="8" fill="#d09858"/>
          <ellipse cx="120" cy="230" rx="20" ry="40" fill="#cc8850"/>
          <rect x="115" y="190" width="12" height="45" fill="#c07840"/>
          <ellipse cx="120" cy="188" rx="18" ry="11" fill="#c07840"/>
          <ellipse cx="160" cy="238" rx="15" ry="30" fill="#d8a060"/>
          <rect x="156" y="210" width="9" height="35" fill="#c89050"/>
          <ellipse cx="160" cy="208" rx="13" ry="9" fill="#c89050"/>
          <rect x="36" y="228" width="8" height="10" rx="4" fill="#7a5030"/>
          <rect x="116" y="215" width="9" height="12" rx="4" fill="#7a5030"/>
          <g transform="translate(50,130)">
            <ellipse cx="0" cy="0" rx="14" ry="18" fill="#e83020"/>
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#b81818" strokeWidth="1.2"/>
            <line x1="0" y1="-18" x2="0" y2="18" stroke="#b81818" strokeWidth="1.2"/>
            <line x1="-6" y1="16" x2="-5" y2="24" stroke="#7a4010" strokeWidth="1.5"/>
            <line x1="6" y1="16" x2="5" y2="24" stroke="#7a4010" strokeWidth="1.5"/>
            <rect x="-5" y="24" width="10" height="6" rx="2" fill="#7a4010"/>
          </g>
          <g transform="translate(120,118)">
            <ellipse cx="0" cy="0" rx="12" ry="15" fill="#f09020"/>
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#c07010" strokeWidth="1"/>
            <line x1="0" y1="-15" x2="0" y2="15" stroke="#c07010" strokeWidth="1"/>
            <line x1="-5" y1="13" x2="-4" y2="20" stroke="#7a4010" strokeWidth="1.5"/>
            <line x1="5" y1="13" x2="4" y2="20" stroke="#7a4010" strokeWidth="1.5"/>
            <rect x="-4" y="20" width="8" height="5" rx="2" fill="#7a4010"/>
          </g>
          <text x="100" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Cappadocia</text>
        </g>

        <g transform="translate(1108,0)">
          <rect x="10" y="250" width="230" height="20" fill="#c4a840"/>
          <rect x="82" y="158" width="50" height="118" fill="#b09878"/>
          <rect x="88" y="138" width="38" height="26" fill="#b8a080"/>
          <rect x="94" y="120" width="26" height="22" fill="#a89070"/>
          <polygon points="99,85 107,57 115,85" fill="#9a8060"/>
          <rect x="105" y="51" width="4" height="12" fill="#806828"/>
          <rect x="10" y="188" width="28" height="88" fill="#c05030"/>
          <polygon points="10,188 24,165 38,188" fill="#a04028"/>
          <rect x="14" y="202" width="8" height="12" rx="2" fill="#f0b830" opacity="0.8"/>
          <rect x="26" y="202" width="8" height="12" rx="2" fill="#f0b830" opacity="0.6"/>
          <rect x="42" y="196" width="26" height="80" fill="#b84828"/>
          <polygon points="42,196 55,173 68,196" fill="#a03820"/>
          <rect x="140" y="192" width="26" height="84" fill="#8a6040"/>
          <polygon points="140,192 153,170 166,192" fill="#785030"/>
          <rect x="175" y="185" width="22" height="90" fill="#c8a060"/>
          <rect x="172" y="178" width="28" height="10" fill="#b89050"/>
          <line x1="186" y1="178" x2="186" y2="130" stroke="#a08040" strokeWidth="5"/>
          <line x1="186" y1="178" x2="186" y2="226" stroke="#a08040" strokeWidth="5"/>
          <line x1="186" y1="178" x2="140" y2="178" stroke="#a08040" strokeWidth="5"/>
          <line x1="186" y1="178" x2="232" y2="178" stroke="#a08040" strokeWidth="5"/>
          <line x1="186" y1="178" x2="158" y2="150" stroke="#a08040" strokeWidth="4"/>
          <line x1="186" y1="178" x2="214" y2="206" stroke="#a08040" strokeWidth="4"/>
          <line x1="186" y1="178" x2="214" y2="150" stroke="#a08040" strokeWidth="4"/>
          <line x1="186" y1="178" x2="158" y2="206" stroke="#a08040" strokeWidth="4"/>
          <circle cx="186" cy="178" r="6" fill="#806020"/>
          <rect x="10" y="262" width="230" height="14" fill="#4878a8"/>
          <text x="120" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Amsterdam</text>
        </g>

        <g transform="translate(1408,0)">
          <rect x="10" y="250" width="260" height="20" fill="#c4a840"/>
          <rect x="15" y="185" width="110" height="90" fill="#e8d080"/>
          <rect x="23" y="163" width="94" height="26" fill="#f0d888"/>
          <rect x="10" y="140" width="34" height="135" fill="#e0c870"/>
          <polygon points="8,132 27,107 46,132" fill="#c8b050"/>
          <rect x="90" y="140" width="34" height="135" fill="#e0c870"/>
          <polygon points="88,132 107,107 126,132" fill="#c8b050"/>
          <rect x="46" y="125" width="42" height="150" fill="#ead088"/>
          <polygon points="42,117 67,90 92,117" fill="#d0b860"/>
          <rect x="55" y="215" width="28" height="48" rx="14" fill="#907020"/>
          <circle cx="12" cy="260" r="11" fill="#f090a0"/><rect x="9" y="260" width="5" height="10" fill="#5a3010"/>
          <rect x="148" y="175" width="110" height="100" fill="#d4c890"/>
          <rect x="152" y="120" width="22" height="90" fill="#c8c080"/>
          <polygon points="150,120 163,80 176,120" fill="#b8b070"/>
          <rect x="180" y="115" width="20" height="95" fill="#ccc882"/>
          <polygon points="178,115 190,72 202,115" fill="#bcb872"/>
          <rect x="206" y="120" width="22" height="90" fill="#c8c080"/>
          <polygon points="204,120 217,78 230,120" fill="#b8b070"/>
          <rect x="232" y="128" width="18" height="82" fill="#ccc882"/>
          <polygon points="230,128 241,90 252,128" fill="#bcb872"/>
          <rect x="158" y="228" width="24" height="47" rx="12" fill="#a09040"/>
          <rect x="190" y="224" width="24" height="51" rx="12" fill="#a09040"/>
          <rect x="222" y="228" width="24" height="47" rx="12" fill="#a09040"/>
          <text x="135" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Alcázar · Sagrada Família</text>
        </g>

        <g transform="translate(1740,0)">
          <rect x="30" y="250" width="140" height="20" fill="#c4a840"/>
          <polygon points="100,82 75,275 125,275" fill="#8a8070"/>
          <polygon points="100,82 80,275 120,275" fill="#9a9080"/>
          <rect x="76" y="195" width="48" height="8" fill="#7a7060"/>
          <rect x="80" y="185" width="40" height="12" rx="2" fill="#888070"/>
          <rect x="84" y="145" width="32" height="8" fill="#7a7060"/>
          <rect x="86" y="135" width="28" height="12" rx="2" fill="#888070"/>
          <line x1="100" y1="82" x2="76" y2="195" stroke="#7a7060" strokeWidth="1.5"/>
          <line x1="100" y1="82" x2="124" y2="195" stroke="#7a7060" strokeWidth="1.5"/>
          <rect x="98" y="56" width="4" height="28" fill="#7a7060"/>
          <rect x="99" y="48" width="2" height="12" fill="#888070"/>
          <circle cx="38" cy="262" r="12" fill="#2a9020"/><rect x="35" y="262" width="5" height="11" fill="#5a3010"/>
          <circle cx="162" cy="260" r="11" fill="#2a9020"/><rect x="159" y="260" width="5" height="10" fill="#5a3010"/>
          <text x="100" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Eiffel Tower</text>
        </g>

        <g transform="translate(1952,0)">
          <rect x="10" y="250" width="260" height="20" fill="#c4a840"/>
          <ellipse cx="90" cy="230" rx="80" ry="50" fill="#d4b870"/>
          <ellipse cx="90" cy="230" rx="65" ry="38" fill="#c4a040"/>
          <ellipse cx="90" cy="230" rx="50" ry="28" fill="#b89030"/>
          <rect x="18" y="210" width="12" height="30" rx="6" fill="#b09028"/>
          <rect x="34" y="205" width="12" height="35" rx="6" fill="#b09028"/>
          <rect x="50" y="200" width="12" height="40" rx="6" fill="#b09028"/>
          <rect x="66" y="198" width="12" height="42" rx="6" fill="#b09028"/>
          <rect x="82" y="197" width="12" height="42" rx="6" fill="#b09028"/>
          <rect x="98" y="198" width="12" height="42" rx="6" fill="#b09028"/>
          <rect x="114" y="200" width="12" height="40" rx="6" fill="#b09028"/>
          <rect x="130" y="205" width="12" height="35" rx="6" fill="#b09028"/>
          <rect x="146" y="210" width="12" height="30" rx="6" fill="#b09028"/>
          <ellipse cx="90" cy="195" rx="78" ry="18" fill="#d4b870"/>
          <ellipse cx="90" cy="190" rx="65" ry="12" fill="#c8a858"/>
          <g transform="rotate(-4, 210, 248)">
            <rect x="178" y="125" width="74" height="130" fill="#e8dca8"/>
            <rect x="178" y="145" width="74" height="5" fill="#d8cc98"/>
            <rect x="178" y="163" width="74" height="5" fill="#d8cc98"/>
            <rect x="178" y="181" width="74" height="5" fill="#d8cc98"/>
            <rect x="178" y="199" width="74" height="5" fill="#d8cc98"/>
            <rect x="182" y="127" width="7" height="20" rx="2" fill="#d0c490"/>
            <rect x="193" y="127" width="7" height="20" rx="2" fill="#d0c490"/>
            <rect x="204" y="127" width="7" height="20" rx="2" fill="#d0c490"/>
            <rect x="215" y="127" width="7" height="20" rx="2" fill="#d0c490"/>
            <rect x="226" y="127" width="7" height="20" rx="2" fill="#d0c490"/>
            <rect x="237" y="127" width="7" height="20" rx="2" fill="#d0c490"/>
            <rect x="180" y="107" width="70" height="22" fill="#e0d4a0"/>
            <rect x="178" y="102" width="74" height="8" fill="#d8cc98"/>
            <ellipse cx="215" cy="103" rx="34" ry="7" fill="#d8cc98"/>
          </g>
          <rect x="172" y="248" width="86" height="12" fill="#c8b870"/>
          <text x="135" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Colosseum · Tower of Pisa</text>
        </g>

        <g transform="translate(2282,0)">
          <rect x="10" y="250" width="250" height="20" fill="#c4a840"/>
          <rect x="20" y="162" width="52" height="115" fill="#c8c890"/>
          <rect x="17" y="154" width="58" height="12" fill="#d0d098"/>
          <rect x="22" y="135" width="48" height="24" fill="#c8c890"/>
          <rect x="18" y="128" width="56" height="10" fill="#d0d098"/>
          <rect x="25" y="108" width="42" height="25" fill="#c8c890"/>
          <circle cx="46" cy="115" r="14" fill="#d8d8a0"/>
          <circle cx="46" cy="115" r="10" fill="#e8e8b0"/>
          <line x1="46" y1="108" x2="46" y2="115" stroke="#282820" strokeWidth="1.5"/>
          <line x1="46" y1="115" x2="52" y2="115" stroke="#282820" strokeWidth="1.5"/>
          <rect x="38" y="72" width="16" height="32" fill="#d0d098"/>
          <polygon points="35,72 46,45 57,72" fill="#c0c088"/>
          <rect x="44" y="39" width="4" height="12" fill="#a0a060"/>
          <rect x="100" y="215" width="16" height="62" fill="#c0a878"/>
          <rect x="216" y="215" width="16" height="62" fill="#c0a878"/>
          <rect x="96" y="168" width="24" height="52" fill="#c8b080"/>
          <rect x="212" y="168" width="24" height="52" fill="#c8b080"/>
          <polygon points="96,168 108,145 120,168" fill="#b8a070"/>
          <polygon points="212,168 224,145 236,168" fill="#b8a070"/>
          <rect x="96" y="235" width="140" height="10" fill="#b8a878"/>
          <path d="M108 165 Q170 235 232 165" stroke="#9a8860" strokeWidth="2" fill="none"/>
          <rect x="90" y="250" width="165" height="16" fill="#4878a8"/>
          <text x="135" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Big Ben · Tower Bridge</text>
        </g>

        <g transform="translate(2600,0)">
          <rect x="10" y="250" width="270" height="20" fill="#c4a840"/>
          <rect x="30" y="232" width="40" height="36" fill="#9a9888"/>
          <rect x="35" y="200" width="30" height="38" fill="#70a898"/>
          <rect x="38" y="178" width="24" height="28" fill="#68a090"/>
          <rect x="42" y="155" width="16" height="28" fill="#70a898"/>
          <ellipse cx="50" cy="148" rx="12" ry="10" fill="#78b0a0"/>
          <rect x="45" y="138" width="10" height="14" fill="#68a090"/>
          <line x1="46" y1="138" x2="43" y2="125" stroke="#78b0a0" strokeWidth="2.5"/>
          <line x1="50" y1="136" x2="50" y2="122" stroke="#78b0a0" strokeWidth="2.5"/>
          <line x1="54" y1="138" x2="57" y2="125" stroke="#78b0a0" strokeWidth="2.5"/>
          <rect x="60" y="158" width="6" height="16" fill="#80b8a8"/>
          <ellipse cx="63" cy="157" rx="5" ry="7" fill="#f0c840"/>
          <rect x="28" y="232" width="44" height="12" fill="#b0a888"/>
          <rect x="24" y="244" width="52" height="22" fill="#a89878"/>
          <rect x="105" y="228" width="160" height="8" fill="#c04020"/>
          <rect x="118" y="148" width="16" height="88" fill="#c04020"/>
          <rect x="226" y="148" width="16" height="88" fill="#c04020"/>
          <path d="M105 232 Q175 185 265 232" stroke="#c84828" strokeWidth="2.5" fill="none"/>
          <line x1="130" y1="212" x2="130" y2="232" stroke="#c04020" strokeWidth="1.5"/>
          <line x1="155" y1="200" x2="155" y2="232" stroke="#c04020" strokeWidth="1.5"/>
          <line x1="175" y1="195" x2="175" y2="232" stroke="#c04020" strokeWidth="1.5"/>
          <line x1="200" y1="200" x2="200" y2="232" stroke="#c04020" strokeWidth="1.5"/>
          <line x1="225" y1="212" x2="225" y2="232" stroke="#c04020" strokeWidth="1.5"/>
          <rect x="100" y="245" width="175" height="20" fill="#4878a8"/>
          <text x="150" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Statue of Liberty · Golden Gate</text>
        </g>

        <g transform="translate(2940,0)">
          <rect x="30" y="250" width="130" height="20" fill="#c4a840"/>
          <polygon points="95,25 78,275 112,275" fill="#c8d0d8"/>
          <polygon points="95,25 82,275 108,275" fill="#d8e0e8"/>
          <rect x="80" y="240" width="30" height="6" fill="#b8c0c8"/>
          <rect x="82" y="210" width="26" height="6" fill="#b8c0c8"/>
          <rect x="84" y="180" width="22" height="5" fill="#b8c0c8"/>
          <rect x="86" y="152" width="18" height="5" fill="#b8c0c8"/>
          <rect x="87" y="128" width="16" height="5" fill="#b8c0c8"/>
          <rect x="88" y="108" width="14" height="4" fill="#b8c0c8"/>
          <rect x="89" y="90" width="12" height="4" fill="#b8c0c8"/>
          <line x1="90" y1="25" x2="82" y2="240" stroke="#c0c8d0" strokeWidth="1"/>
          <line x1="90" y1="25" x2="98" y2="240" stroke="#c0c8d0" strokeWidth="1"/>
          <rect x="93" y="10" width="4" height="18" fill="#d0d8e0"/>
          <rect x="72" y="265" width="46" height="15" fill="#c0c8d0"/>
          <rect x="40" y="255" width="5" height="20" fill="#8a6030"/>
          <ellipse cx="42" cy="252" rx="14" ry="8" fill="#2a9020"/>
          <rect x="148" y="255" width="5" height="20" fill="#8a6030"/>
          <ellipse cx="150" cy="252" rx="14" ry="8" fill="#2a9020"/>
          <text x="95" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Burj Khalifa</text>
        </g>

        <g transform="translate(3138,0)">
          <rect x="10" y="250" width="200" height="20" fill="#c4a840"/>
          <polygon points="110,62 20,268 200,268" fill="#d8d0c8"/>
          <polygon points="110,62 40,268 180,268" fill="#e0d8d0"/>
          <polygon points="110,62 85,125 135,125" fill="#f0f0f0"/>
          <polygon points="110,62 90,118 130,118" fill="#ffffff"/>
          <polygon points="110,62 20,268 70,268" fill="#c8c0b8" opacity="0.3"/>
          <rect x="22" y="255" width="180" height="15" fill="#3a7828" opacity="0.7"/>
          <circle cx="46" cy="252" r="10" fill="#38882e"/>
          <circle cx="174" cy="252" r="10" fill="#38882e"/>
          <rect x="10" y="262" width="200" height="14" fill="#6898c0"/>
          <text x="110" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Mount Fuji</text>
        </g>

        <g transform="translate(3408,0)">
          <rect x="0" y="250" width="260" height="20" fill="#e8c840"/>
          <rect x="0" y="258" width="260" height="12" fill="#d8b830"/>
          <polygon points="100,102 20,268 180,268" fill="#e8c060"/>
          <polygon points="100,102 25,268 175,268" fill="#f0c868"/>
          <line x1="60" y1="268" x2="100" y2="118" stroke="#d8b050" strokeWidth="0.8" opacity="0.5"/>
          <line x1="100" y1="268" x2="100" y2="102" stroke="#d8b050" strokeWidth="0.8" opacity="0.5"/>
          <line x1="140" y1="268" x2="100" y2="118" stroke="#d8b050" strokeWidth="0.8" opacity="0.5"/>
          <line x1="45" y1="225" x2="155" y2="225" stroke="#d8b050" strokeWidth="0.8" opacity="0.5"/>
          <line x1="62" y1="190" x2="138" y2="190" stroke="#d8b050" strokeWidth="0.8" opacity="0.5"/>
          <polygon points="20,268 220,268 185,185" fill="#e0b848"/>
          <polygon points="223,268 260,268 245,220" fill="#e0b848"/>
          <ellipse cx="210" cy="260" rx="38" ry="11" fill="#d8b840"/>
          <rect x="176" y="249" width="70" height="18" fill="#d8b840"/>
          <rect x="230" y="238" width="22" height="28" fill="#c8a830" rx="4"/>
          <circle cx="241" cy="234" r="12" fill="#d8b840"/>
          <rect x="236" y="227" width="10" height="8" rx="2" fill="#c8a030"/>
          <text x="125" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Pyramids of Giza</text>
        </g>

        <g transform="translate(3738,0)">
          <rect x="55" y="246" width="162" height="24" fill="#8a7840"/>
          <rect x="65" y="186" width="116" height="90" fill="#5a5870"/>
          <rect x="56" y="216" width="134" height="58" fill="#4e4c68"/>
          <rect x="58" y="118" width="46" height="156" fill="#5a5870"/>
          <rect x="142" y="118" width="46" height="156" fill="#5a5870"/>
          <polygon points="58,65 82,12 106,65" fill="#48486a"/>
          <polygon points="142,65 166,12 190,65" fill="#48486a"/>
          <circle cx="124" cy="200" r="17" fill="#28283e"/>
          <circle cx="124" cy="200" r="12" fill="#c8a828" opacity="0.8"/>
          <circle cx="124" cy="200" r="6" fill="#28283e"/>
          <rect x="103" y="224" width="30" height="50" rx="15" fill="#28283e"/>
          <text x="120" y="348" textAnchor="middle" fill="#5a4820" fontSize="9" fontFamily="serif" letterSpacing="1" fontWeight="bold">Cologne Cathedral</text>
        </g>
      </g>

      <rect x="0" y="340" width="680" height="3" fill="#806820" opacity="0.5"/>
    </svg>
  );
};
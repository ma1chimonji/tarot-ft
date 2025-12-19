(function(){
  const $ = (s)=>document.querySelector(s);
  
  /* --- 1. Data Definitions --- */
  const baseDeck = [
    {suit:'major', name:'0. 愚者', icon:'🤡', advice:'冒険心、自由', advice_rev:'無計画、軽率'},
    {suit:'major', name:'I. 魔術師', icon:'🧙', advice:'創造性、準備完了', advice_rev:'準備不足、悪用'},
    {suit:'major', name:'II. 女教皇', icon:'🌙', advice:'直感、静寂', advice_rev:'神経質、批判'},
    {suit:'major', name:'III. 女帝', icon:'👑', advice:'豊かさ、母性', advice_rev:'わがまま、浪費'},
    {suit:'major', name:'IV. 皇帝', icon:'🏛️', advice:'責任感、安定', advice_rev:'横暴、未熟'},
    {suit:'major', name:'V. 教皇', icon:'📜', advice:'信頼、慈悲', advice_rev:'狭い視野、孤立'},
    {suit:'major', name:'VI. 恋人', icon:'💞', advice:'合意、調和', advice_rev:'迷い、誘惑'},
    {suit:'major', name:'VII. 戦車', icon:'🚀', advice:'勝利、前進', advice_rev:'暴走、停滞'},
    {suit:'major', name:'VIII. 力', icon:'🦁', advice:'忍耐、勇気', advice_rev:'自信過剰、恐怖'},
    {suit:'major', name:'IX. 隠者', icon:'🔦', advice:'内省、探究', advice_rev:'孤独、偏屈'},
    {suit:'major', name:'X. 運命の輪', icon:'🎡', advice:'好転、チャンス', advice_rev:'悪化、不運'},
    {suit:'major', name:'XI. 正義', icon:'⚖️', advice:'公平、バランス', advice_rev:'不正、偏見'},
    {suit:'major', name:'XII. 吊られた男', icon:'🙃', advice:'試練、視点の変化', advice_rev:'徒労、痩せ我慢'},
    {suit:'major', name:'XIII. 死神', icon:'💀', advice:'終焉、刷新', advice_rev:'未練、停滞'},
    {suit:'major', name:'XIV. 節制', icon:'🏺', advice:'循環、調整', advice_rev:'不均衡、極端'},
    {suit:'major', name:'XV. 悪魔', icon:'😈', advice:'欲望、執着', advice_rev:'束縛からの解放'},
    {suit:'major', name:'XVI. 塔', icon:'⚡', advice:'崩壊、変化', advice_rev:'緊迫、誤解'},
    {suit:'major', name:'XVII. 星', icon:'🌟', advice:'希望、理想', advice_rev:'幻滅、高望み'},
    {suit:'major', name:'XVIII. 月', icon:'🦞', advice:'不安、潜在意識', advice_rev:'不安の解消'},
    {suit:'major', name:'XIX. 太陽', icon:'☀️', advice:'成功、祝福', advice_rev:'延期、中止'},
    {suit:'major', name:'XX. 審判', icon:'🎺', advice:'復活、覚醒', advice_rev:'悔恨、迷い'},
    {suit:'major', name:'XXI. 世界', icon:'🌍', advice:'完成、ハッピーエンド', advice_rev:'未完成、スランプ'},
  ];
  const suits = [
    {id:'wands', icon:'🔥', name:'ワンド', k_up:'情熱', k_rev:'空回り'},
    {id:'cups', icon:'🍷', name:'カップ', k_up:'感情', k_rev:'情緒不安定'},
    {id:'swords', icon:'⚔️', name:'ソード', k_up:'思考', k_rev:'混乱'},
    {id:'pentacles', icon:'🪙', name:'ペンタクル', k_up:'物質', k_rev:'損失'}
  ];
  const numbers = [
    {n:'A', up:'始まり', rev:'遅れ'}, {n:'2', up:'バランス', rev:'不和'},
    {n:'3', up:'発展', rev:'停止'}, {n:'4', up:'安定', rev:'固執'},
    {n:'5', up:'葛藤', rev:'敗北'}, {n:'6', up:'勝利', rev:'後退'},
    {n:'7', up:'優位', rev:'不利'}, {n:'8', up:'急展開', rev:'停滞'},
    {n:'9', up:'備え', rev:'消耗'}, {n:'10', up:'完了', rev:'崩壊'},
    {n:'Page', up:'学習', rev:'未熟'}, {n:'Knight', up:'行動', rev:'暴走'},
    {n:'Queen', up:'受容', rev:'嫉妬'}, {n:'King', up:'統率', rev:'独裁'}
  ];
  suits.forEach(s => { numbers.forEach(num => { baseDeck.push({suit:s.id, name:`${s.name} ${num.n}`, icon:s.icon, advice:`${s.k_up}の${num.up}`, advice_rev:`${s.k_rev}または${num.rev}`}); }); });

  const spreads = {
    oneCard: { name: "1枚引き", positions: [ {id:1, mean:"今日のFocus", pos:[50,50]} ] },
    letGoGrow: { name: "手放す/育てる", positions: [ {id:1, mean:"手放すべきもの", pos:[50, 30]}, {id:2, mean:"育てるべき本質", pos:[50, 70]} ]},
    pastPresentFuture: { name: "過去/現在/未来", positions: [ {id:1, mean:"過去の状況", pos:[50, 20]}, {id:2, mean:"現在の状況", pos:[50, 50]}, {id:3, mean:"未来の状況", pos:[50, 80]} ]},
    essentialKey: { name: "不可欠な鍵", positions: [ {id:1, mean:"現在の状況", pos:[45, 40]}, {id:2, mean:"過去の出来事", pos:[55, 20]}, {id:3, mean:"自分の能力", pos:[30, 60]}, {id:4, mean:"情熱・興味", pos:[35, 80], rotate: 20}, {id:5, mean:"起こりうる結果", pos:[65, 60]} ]},
    triquetra: { name: "トリケトラ", positions: [ {id:1, mean:"自己・無意識", pos:[35, 50]}, {id:2, mean:"集合体・社会", pos:[65, 30]}, {id:3, mean:"直感・保護", pos:[65, 70]} ]},
    hexagram: { name: "ヘキサグラム(恋)", positions: [ {id:1, mean:"過去", pos:[20, 50]}, {id:2, mean:"現在", pos:[80, 50]}, {id:3, mean:"未来", pos:[50, 20]}, {id:4, mean:"対策・環境", pos:[80, 80]}, {id:5, mean:"相手の状況", pos:[80, 20]}, {id:6, mean:"自分の状況", pos:[20, 80]}, {id:7, mean:"最終結果", pos:[50, 50], z:2} ]},
    celticCross: { name: "ケルト十字", positions: [ {id:1, mean:"現状", pos:[50, 35]}, {id:2, mean:"障害/支援", pos:[50, 35], rotate: 90, z:1}, {id:3, mean:"顕在意識", pos:[20, 35]}, {id:4, mean:"潜在意識", pos:[80, 35]}, {id:5, mean:"過去の原因", pos:[50, 10]}, {id:6, mean:"近い未来", pos:[50, 60]}, {id:7, mean:"本人の姿勢", pos:[85, 85]}, {id:8, mean:"周囲の環境", pos:[65, 85]}, {id:9, mean:"希望/不安", pos:[45, 85]}, {id:10, mean:"最終結果", pos:[25, 85]} ]},
    findingLove: { name: "新しい恋", positions: [ {id:1, mean:"現状", pos:[50, 50]}, {id:2, mean:"相手の特徴", pos:[25, 20]}, {id:3, mean:"出会う場所", pos:[25, 80]}, {id:4, mean:"課題・障害", pos:[75, 20]}, {id:5, mean:"結果", pos:[75, 80]} ]},
    diamondCross: { name: "ダイヤモンド", positions: [ {id:1, mean:"自分", pos:[50, 20]}, {id:2, mean:"相手", pos:[50, 80]}, {id:3, mean:"二人の現状", pos:[20, 50]}, {id:4, mean:"未来", pos:[80, 50]} ]},
    twoPaths: { name: "⚖️ 二者択一 (進路選択)", positions: [ {id:1, mean:"現在の岐路", pos:[80, 50]}, {id:2, mean:"選択肢Aの未来", pos:[30, 25]}, {id:3, mean:"選択肢Bの未来", pos:[30, 75]}, {id:4, mean:"Aへのアドバイス", pos:[55, 25]}, {id:5, mean:"Bへのアドバイス", pos:[55, 75]} ]},
    interview: { name: "🎯 面接・試験攻略", positions: [ {id:1, mean:"自分の強み・状態", pos:[50, 20]}, {id:2, mean:"相手(企業)が求めるもの", pos:[50, 80]}, {id:3, mean:"攻略の鍵・アピール点", pos:[20, 50]}, {id:4, mean:"結果・次のステップ", pos:[80, 50]} ]},
    careerPath: { name: "🚀 キャリア・サクセス", positions: [ {id:1, mean:"現在の職業的実力", pos:[50, 15]}, {id:2, mean:"理想・目標", pos:[30, 25]}, {id:3, mean:"隠れた才能・強み", pos:[20, 50]}, {id:4, mean:"克服すべき課題", pos:[30, 75]}, {id:5, mean:"周囲の評価・環境", pos:[50, 85]}, {id:6, mean:"具体的なアクション", pos:[70, 50]}, {id:7, mean:"最終的な成果", pos:[50, 50], z:2} ]}
  };

  /* --- 2. Particle System --- */
  class ParticleSystem {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.resize();
      
      window.addEventListener('resize', () => this.resize());
      
      // Ambient Particles
      this.ambientParticles = [];
      for(let i=0; i<30; i++) {
        this.ambientParticles.push(this.createAmbient());
      }

      this.animate();
    }

    resize() {
      this.canvas.width = this.canvas.parentElement.offsetWidth;
      this.canvas.height = this.canvas.parentElement.offsetHeight;
    }

    createAmbient() {
      return {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        life: Infinity
      };
    }

    createExplosion(x, y) {
      const count = 40; 
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.particles.push({
          x: x, y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.01,
          color: Math.random() > 0.5 ? '#64b5f6' : '#64f6c2'
        });
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Ambient
      this.ambientParticles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0) p.x = this.canvas.width; if(p.x > this.canvas.width) p.x = 0;
        if(p.y < 0) p.y = this.canvas.height; if(p.y > this.canvas.height) p.y = 0;
        
        this.ctx.fillStyle = `rgba(160, 200, 255, ${p.alpha})`;
        this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); this.ctx.fill();
      });

      // Explosion
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx; p.y += p.vy; p.alpha -= p.decay; p.size *= 0.96;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
        } else {
          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = p.alpha;
          this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); this.ctx.fill();
          this.ctx.globalAlpha = 1.0;
        }
      }
      requestAnimationFrame(() => this.animate());
    }
  }

  /* --- 3. App Logic --- */
  const el = { select: $('#spreadSelect'), btn: $('#deployBtn'), saveBtn: $('#saveBtn'), container: $('#spread-container'), list: $('#history'), main: $('main') };
  let currentDeck = [];
  const particles = new ParticleSystem('particle-canvas');

  function init(){
    for(const key in spreads){
      const opt = document.createElement('option');
      opt.value = key; opt.textContent = spreads[key].name;
      el.select.appendChild(opt);
    }
    el.select.value = 'oneCard';
    deploySpread();
  }

  function prepareDeck(){
    currentDeck = [...baseDeck];
    for (let i = currentDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
    }
  }

  function drawCard(){
    if(currentDeck.length === 0) prepareDeck();
    const card = currentDeck.pop();
    const isRev = Math.random() < 0.5;
    return { ...card, isReversed: isRev };
  }

  function deploySpread(){
    const spreadKey = el.select.value;
    const spreadData = spreads[spreadKey];
    prepareDeck();
    el.container.innerHTML = '';
    addLog('System', `Spread: ${spreadData.name}`);

    spreadData.positions.forEach(pos => {
      createCardSlot(pos, spreadKey === 'celticCross');
    });
  }

  function createCardSlot(posInfo, isCeltic){
    const slot = document.createElement('div');
    slot.className = 'card-slot';
    slot.style.top = `${posInfo.pos[0]}%`;
    slot.style.left = `${posInfo.pos[1]}%`;
    if(posInfo.rotate) slot.style.transform = `rotate(${posInfo.rotate}deg)`;
    if(posInfo.z) slot.style.zIndex = posInfo.z;

    slot.innerHTML = `
      <div class="card">
        <div class="card-face card-back">
          <span>${posInfo.id}</span>
          <span style="font-size:10px; margin-top:4px; text-align:center;">${posInfo.mean}</span>
        </div>
        <div class="card-face card-front"></div>
      </div>
    `;

    slot.onclick = function(e){
      if(this.classList.contains('flipped')) return;
      
      const rect = el.main.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      particles.createExplosion(x, y);

      const c = drawCard();
      const frontFace = this.querySelector('.card-front');
      const mean = c.isReversed ? c.advice_rev : c.advice;
      const revTag = c.isReversed ? '<span class="reversed-tag">▼REVERSED</span>' : '';
      
      if(c.isReversed) frontFace.classList.add('reversed-state');

      frontFace.innerHTML = `
        <div class="pos-badge">${posInfo.id}. ${posInfo.mean}</div>
        <div class="card-content-wrap">
          ${revTag}
          <span class="suit-icon suit-${c.suit}">${c.icon}</span>
          <span class="card-name">${c.name}</span>
          <div class="card-meaning">${mean}</div>
        </div>
      `;
      
      this.classList.add('flipped');
      addLog('Reveal', `${posInfo.mean}: ${c.name}`, c.isReversed);
    };

    el.container.appendChild(slot);
  }

  function addLog(header, detail, isRev=false){
    const li = document.createElement('li');
    if(isRev) li.className = 'rev';
    li.innerHTML = `<span class="log-header">${header}</span><span class="log-detail">${detail}</span>`;
    el.list.prepend(li);
  }

  el.saveBtn.onclick = function(){
    const target = el.main;
    const originalText = el.saveBtn.textContent;
    el.saveBtn.textContent = "Saving...";
    html2canvas(target, { backgroundColor: '#0b0f14', scale: 2, useCORS: true, logging: false }).then(canvas => {
      const link = document.createElement('a');
      link.download = `tarot_result_${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      el.saveBtn.textContent = originalText;
    }).catch(err => {
      console.error(err);
      alert('保存に失敗しました。');
      el.saveBtn.textContent = originalText;
    });
  };

  el.btn.onclick = deploySpread;
  init();
})();
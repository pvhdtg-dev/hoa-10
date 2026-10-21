// ==========================================================================
// HÓA HỌC 10 - SIMULATION & INTERACTIVE TOOLS (BẢNG TUẦN HOÀN 118 NGUYÊN TỐ & MÔ HÌNH BOHR)
// ==========================================================================

let activeBohrZ = 11; // Mặc định Sodium (Na, Z=11)
let bohrAnimationId = null;

// ==========================================================================
// 1. DỮ LIỆU BẢNG TUẦN HOÀN 118 NGUYÊN TỐ (IUPAC)
// ==========================================================================

// Dữ liệu 118 nguyên tố: [số hiệu, ký hiệu, tên, khối lượng, loại, chu kỳ, nhóm]
const elements = [
  [1,"H","Hydro","1.008","nonmetal",1,1],
  [2,"He","Heli","4.0026","noble-gas",1,18],
  [3,"Li","Lithi","6.94","alkali-metal",2,1],
  [4,"Be","Berili","9.0122","alkaline-earth",2,2],
  [5,"B","Bo","10.81","metalloid",2,13],
  [6,"C","Carbon","12.011","nonmetal",2,14],
  [7,"N","Nitơ","14.007","nonmetal",2,15],
  [8,"O","Oxy","15.999","nonmetal",2,16],
  [9,"F","Flo","18.998","halogen",2,17],
  [10,"Ne","Neon","20.180","noble-gas",2,18],
  [11,"Na","Natri","22.990","alkali-metal",3,1],
  [12,"Mg","Magie","24.305","alkaline-earth",3,2],
  [13,"Al","Nhôm","26.982","post-transition",3,13],
  [14,"Si","Silic","28.085","metalloid",3,14],
  [15,"P","Photpho","30.974","nonmetal",3,15],
  [16,"S","Lưu huỳnh","32.06","nonmetal",3,16],
  [17,"Cl","Clo","35.45","halogen",3,17],
  [18,"Ar","Argon","39.948","noble-gas",3,18],
  [19,"K","Kali","39.098","alkali-metal",4,1],
  [20,"Ca","Canxi","40.078","alkaline-earth",4,2],
  [21,"Sc","Scandi","44.956","transition-metal",4,3],
  [22,"Ti","Titan","47.867","transition-metal",4,4],
  [23,"V","Vanadi","50.942","transition-metal",4,5],
  [24,"Cr","Crom","51.996","transition-metal",4,6],
  [25,"Mn","Mangan","54.938","transition-metal",4,7],
  [26,"Fe","Sắt","55.845","transition-metal",4,8],
  [27,"Co","Coban","58.933","transition-metal",4,9],
  [28,"Ni","Niken","58.693","transition-metal",4,10],
  [29,"Cu","Đồng","63.546","transition-metal",4,11],
  [30,"Zn","Kẽm","65.38","transition-metal",4,12],
  [31,"Ga","Gali","69.723","post-transition",4,13],
  [32,"Ge","Gecmani","72.630","metalloid",4,14],
  [33,"As","Asen","74.922","metalloid",4,15],
  [34,"Se","Selen","78.971","nonmetal",4,16],
  [35,"Br","Brom","79.904","halogen",4,17],
  [36,"Kr","Krypton","83.798","noble-gas",4,18],
  [37,"Rb","Rubidi","85.468","alkali-metal",5,1],
  [38,"Sr","Stronti","87.62","alkaline-earth",5,2],
  [39,"Y","Yttri","88.906","transition-metal",5,3],
  [40,"Zr","Zirconi","91.224","transition-metal",5,4],
  [41,"Nb","Niobi","92.906","transition-metal",5,5],
  [42,"Mo","Molypden","95.95","transition-metal",5,6],
  [43,"Tc","Tecneti","[98]","transition-metal",5,7],
  [44,"Ru","Rutheni","101.07","transition-metal",5,8],
  [45,"Rh","Rhodi","102.91","transition-metal",5,9],
  [46,"Pd","Paladi","106.42","transition-metal",5,10],
  [47,"Ag","Bạc","107.87","transition-metal",5,11],
  [48,"Cd","Cadimi","112.41","transition-metal",5,12],
  [49,"In","Indi","114.82","post-transition",5,13],
  [50,"Sn","Thiếc","118.71","post-transition",5,14],
  [51,"Sb","Antimon","121.76","metalloid",5,15],
  [52,"Te","Telu","127.60","metalloid",5,16],
  [53,"I","Iot","126.90","halogen",5,17],
  [54,"Xe","Xenon","131.29","noble-gas",5,18],
  [55,"Cs","Xesi","132.91","alkali-metal",6,1],
  [56,"Ba","Bari","137.33","alkaline-earth",6,2],
  // 57-71: Lanthanide (đặt riêng ở hàng dưới)
  [72,"Hf","Hafni","178.49","transition-metal",6,4],
  [73,"Ta","Tantan","180.95","transition-metal",6,5],
  [74,"W","Vonfram","183.84","transition-metal",6,6],
  [75,"Re","Reni","186.21","transition-metal",6,7],
  [76,"Os","Osimi","190.23","transition-metal",6,8],
  [77,"Ir","Iridi","192.22","transition-metal",6,9],
  [78,"Pt","Bạch kim","195.08","transition-metal",6,10],
  [79,"Au","Vàng","196.97","transition-metal",6,11],
  [80,"Hg","Thuỷ ngân","200.59","transition-metal",6,12],
  [81,"Tl","Thali","204.38","post-transition",6,13],
  [82,"Pb","Chì","207.2","post-transition",6,14],
  [83,"Bi","Bitmut","208.98","post-transition",6,15],
  [84,"Po","Poloni","[209]","post-transition",6,16],
  [85,"At","Astatin","[210]","halogen",6,17],
  [86,"Rn","Radon","[222]","noble-gas",6,18],
  [87,"Fr","Franxi","[223]","alkali-metal",7,1],
  [88,"Ra","Radi","[226]","alkaline-earth",7,2],
  // 89-103: Actinide (đặt riêng ở hàng dưới)
  [104,"Rf","Rutherfordi","[267]","transition-metal",7,4],
  [105,"Db","Dubni","[268]","transition-metal",7,5],
  [106,"Sg","Seaborgi","[269]","transition-metal",7,6],
  [107,"Bh","Bohri","[270]","transition-metal",7,7],
  [108,"Hs","Hassi","[277]","transition-metal",7,8],
  [109,"Mt","Meitneri","[278]","unknown",7,9],
  [110,"Ds","Darmstati","[281]","unknown",7,10],
  [111,"Rg","Roentgeni","[282]","unknown",7,11],
  [112,"Cn","Copernici","[285]","transition-metal",7,12],
  [113,"Nh","Nihoni","[286]","unknown",7,13],
  [114,"Fl","Flerovi","[289]","unknown",7,14],
  [115,"Mc","Moscovi","[290]","unknown",7,15],
  [116,"Lv","Livermori","[293]","unknown",7,16],
  [117,"Ts","Tennessi","[294]","unknown",7,17],
  [118,"Og","Oganesson","[294]","noble-gas",7,18]
];

// Lanthanide (57-71) và Actinide (89-103)
const lanthanides = [
  [57,"La","Lantan","138.91","lanthanide",6,3],
  [58,"Ce","Xeri","140.12","lanthanide",6,4],
  [59,"Pr","Praseodym","140.91","lanthanide",6,5],
  [60,"Nd","Neodym","144.24","lanthanide",6,6],
  [61,"Pm","Promethi","[145]","lanthanide",6,7],
  [62,"Sm","Samari","150.36","lanthanide",6,8],
  [63,"Eu","Europi","151.96","lanthanide",6,9],
  [64,"Gd","Gadolini","157.25","lanthanide",6,10],
  [65,"Tb","Terbi","158.93","lanthanide",6,11],
  [66,"Dy","Dysprosi","162.50","lanthanide",6,12],
  [67,"Ho","Honmi","164.93","lanthanide",6,13],
  [68,"Er","Erbium","167.26","lanthanide",6,14],
  [69,"Tm","Thuli","168.93","lanthanide",6,15],
  [70,"Yb","Ytterbi","173.05","lanthanide",6,16],
  [71,"Lu","Luteti","174.97","lanthanide",6,17]
];

const actinides = [
  [89,"Ac","Actini","[227]","actinide",7,3],
  [90,"Th","Thori","232.04","actinide",7,4],
  [91,"Pa","Protactini","231.04","actinide",7,5],
  [92,"U","Urani","238.03","actinide",7,6],
  [93,"Np","Neptuni","[237]","actinide",7,7],
  [94,"Pu","Plutoni","[244]","actinide",7,8],
  [95,"Am","Americi","[243]","actinide",7,9],
  [96,"Cm","Curi","[247]","actinide",7,10],
  [97,"Bk","Berkenli","[247]","actinide",7,11],
  [98,"Cf","Californi","[251]","actinide",7,12],
  [99,"Es","Einsteinium","[252]","actinide",7,13],
  [100,"Fm","Fermi","[257]","actinide",7,14],
  [101,"Md","Mendelevi","[258]","actinide",7,15],
  [102,"No","Nobeli","[259]","actinide",7,16],
  [103,"Lr","Lawrenci","[266]","actinide",7,17]
];

// Hàm tạo ô nguyên tố DOM
function createElement(data) {
  const [num, sym, name, mass, cat] = data;
  const div = document.createElement('div');
  div.className = `element ${cat}`;
  div.dataset.num = num;
  div.dataset.cat = cat;
  div.dataset.name = name.toLowerCase();
  div.dataset.sym = sym.toLowerCase();
  div.innerHTML = `
    <div class="number">${num}</div>
    <div class="symbol">${sym}</div>
    <div class="name">${name}</div>
    <div class="mass">${mass}</div>
  `;
  div.addEventListener('click', () => showElementModal(data));
  return div;
}

// Xây dựng bảng tuần hoàn 118 nguyên tố
function initPeriodicTable() {
  const mainTable = document.getElementById('mainTable');
  const lantDiv = document.getElementById('lanthanides');
  const actDiv = document.getElementById('actinides');
  if (!mainTable || !lantDiv || !actDiv) return;

  mainTable.innerHTML = '';
  lantDiv.innerHTML = '';
  actDiv.innerHTML = '';

  const grid = Array(7).fill().map(() => Array(18).fill(null));

  elements.forEach(el => {
    const [num, sym, name, mass, cat, period, group] = el;
    grid[period-1][group-1] = el;
  });

  // Render bảng chính (18 cột x 7 hàng)
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 18; c++) {
      if (grid[r][c]) {
        mainTable.appendChild(createElement(grid[r][c]));
      } else {
        const empty = document.createElement('div');
        mainTable.appendChild(empty);
      }
    }
  }

  // Thêm 2 placeholder ô trống ở cột 1-2 cho Lanthanide và Actinide
  for (let i = 0; i < 2; i++) {
    lantDiv.appendChild(document.createElement('div'));
    actDiv.appendChild(document.createElement('div'));
  }

  lanthanides.forEach(el => lantDiv.appendChild(createElement(el)));
  actinides.forEach(el => actDiv.appendChild(createElement(el)));

  setupPeriodicControls();
}

// Modal xem thông số chi tiết nguyên tố
function showElementModal(data) {
  const [num, sym, name, mass, cat, period, group] = data;
  const catNames = {
    'alkali-metal': 'Kim loại kiềm',
    'alkaline-earth': 'Kim loại kiềm thổ',
    'transition-metal': 'Kim loại chuyển tiếp',
    'post-transition': 'Kim loại sau chuyển tiếp',
    'metalloid': 'Á kim',
    'nonmetal': 'Phi kim',
    'halogen': 'Halogen',
    'noble-gas': 'Khí hiếm',
    'lanthanide': 'Lanthanide (Họ Lantan)',
    'actinide': 'Actinide (Họ Actini)',
    'unknown': 'Chưa xác định'
  };

  const modal = document.getElementById('ptModal');
  const modalBody = document.getElementById('ptModalBody');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <h2>${name}</h2>
    <div class="big-symbol ${cat}">${sym}</div>
    <div class="info-row"><span>Số hiệu nguyên tử (Z)</span><strong>${num}</strong></div>
    <div class="info-row"><span>Khối lượng nguyên tử</span><strong>${mass} amu</strong></div>
    <div class="info-row"><span>Chu kỳ</span><strong>${period}</strong></div>
    <div class="info-row"><span>Nhóm</span><strong>${group}</strong></div>
    <div class="info-row"><span>Phân loại</span><strong>${catNames[cat] || cat}</strong></div>
    <div class="pt-4 mt-3">
      <button onclick="launchBohrWithZ(${num})" class="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition active:scale-95">
        <span>🔬</span>
        <span>Mở Mô Phỏng Bohr Của ${name} (Z = ${num})</span>
      </button>
    </div>
  `;
  modal.classList.add('active');
}

// Thiết lập tìm kiếm và lọc danh mục
function setupPeriodicControls() {
  const searchInput = document.getElementById('pt-search');
  if (searchInput && !searchInput.dataset.initialized) {
    searchInput.dataset.initialized = 'true';
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.element').forEach(el => {
        const match = !q || el.dataset.name.includes(q) ||
                      el.dataset.sym.includes(q) ||
                      el.dataset.num === q;
        el.classList.toggle('dimmed', !match);
      });
    });
  }

  const filterBtns = document.querySelectorAll('.pt-filter-btn');
  filterBtns.forEach(btn => {
    if (!btn.dataset.initialized) {
      btn.dataset.initialized = 'true';
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active', 'bg-emerald-600', 'text-white', 'font-bold');
          b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'font-semibold');
        });
        btn.classList.add('active', 'bg-emerald-600', 'text-white', 'font-bold');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'font-semibold');

        const cat = btn.dataset.cat;
        document.querySelectorAll('.element').forEach(el => {
          el.classList.toggle('dimmed', cat !== 'all' && el.dataset.cat !== cat);
        });
      });
    }
  });

  const closeBtn = document.getElementById('closePtModal');
  const modal = document.getElementById('ptModal');
  if (closeBtn) closeBtn.onclick = () => modal && modal.classList.remove('active');
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove('active');
    };
  }
}

function launchBohrWithZ(z) {
  const modal = document.getElementById('ptModal');
  if (modal) modal.classList.remove('active');
  switchSimulationSubTab('bohr');
  setBohrZ(z);
}

// ==========================================================================
// 2. MÔ PHỎNG NGUYÊN TỬ BOHR-RUTHERFORD (ATOMIC BOHR MODEL SIMULATION)
// ==========================================================================

function initBohrSimulation() {
  const canvas = document.getElementById("bohr-canvas");
  if (!canvas) return;

  const slider = document.getElementById("bohr-z-slider");
  if (slider) {
    slider.value = activeBohrZ;
    slider.oninput = (e) => setBohrZ(parseInt(e.target.value));
  }

  updateBohrDisplay();
  startBohrCanvasAnimation();
}

function setBohrZ(z) {
  activeBohrZ = Math.max(1, Math.min(36, z));
  const slider = document.getElementById("bohr-z-slider");
  if (slider) slider.value = activeBohrZ;
  updateBohrDisplay();
}

// Tính toán phân bố electron theo các lớp K, L, M, N (tối đa Z=36)
function calculateShellDistribution(z) {
  // Thứ tự điền Klechkowski: 1s(2) 2s(2) 2p(6) 3s(2) 3p(6) 4s(2) 3d(10) 4p(6)
  // Đặc biệt: Cr(24): 3d⁵ 4s¹; Cu(29): 3d¹⁰ 4s¹
  let k = 0, l = 0, m = 0, n = 0;
  
  if (z === 24) { // Cr
    return [2, 8, 13, 1];
  }
  if (z === 29) { // Cu
    return [2, 8, 18, 1];
  }

  let remain = z;
  // Lớp 1 (K): 1s (max 2)
  k = Math.min(remain, 2);
  remain -= k;
  if (remain === 0) return [k];

  // Lớp 2 (L): 2s(2) 2p(6) (max 8)
  l = Math.min(remain, 8);
  remain -= l;
  if (remain === 0) return [k, l];

  // Điền 3s² 3p⁶ (tối đa 8 vào M trước)
  let m_sp = Math.min(remain, 8);
  m += m_sp;
  remain -= m_sp;
  if (remain === 0) return [k, l, m];

  // Điền 4s² (tối đa 2 vào N)
  n = Math.min(remain, 2);
  remain -= n;
  if (remain === 0) return [k, l, m, n];

  // Điền tiếp 3d¹⁰ (vào lớp M)
  let m_d = Math.min(remain, 10);
  m += m_d;
  remain -= m_d;
  if (remain === 0) return [k, l, m, n];

  // Điền tiếp 4p⁶ (vào lớp N)
  let n_p = Math.min(remain, 6);
  n += n_p;
  return [k, l, m, n];
}

function updateBohrDisplay() {
  const elem = ELEMENTS_DATA.find(e => e.z === activeBohrZ) || {
    z: activeBohrZ, s: "X", nameVi: "Nguyên tố " + activeBohrZ, mass: activeBohrZ * 2, config: ""
  };

  const shells = calculateShellDistribution(activeBohrZ);

  // Cập nhật text hiển thị
  const nameEl = document.getElementById("bohr-element-name");
  if (nameEl) nameEl.textContent = `${elem.nameVi} (${elem.s}) - Z = ${elem.z}`;

  const configEl = document.getElementById("bohr-element-config");
  if (configEl) configEl.textContent = elem.config || `Cấu hình e: ${shells.join(' - ')}`;

  const shellsTextEl = document.getElementById("bohr-shells-text");
  if (shellsTextEl) {
    const shellNames = ["K", "L", "M", "N"];
    shellsTextEl.innerHTML = shells.map((count, idx) => `
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold border border-slate-200 dark:border-slate-700">
        <span class="text-emerald-500 font-extrabold">${shellNames[idx]}:</span>
        <span class="text-slate-900 dark:text-slate-100">${count}e</span>
      </span>
    `).join(' ');
  }

  // Đánh giá tính kim loại / phi kim
  const valanceE = shells[shells.length - 1];
  const typeBadgeEl = document.getElementById("bohr-element-type-badge");
  if (typeBadgeEl) {
    let typeText = "Kim loại (dễ nhường e)";
    let typeClass = "bg-rose-500/20 text-rose-300 border-rose-500/40";
    if (activeBohrZ === 2 || valanceE === 8) {
      typeText = "Khí hiếm (cấu hình bền vững)";
      typeClass = "bg-purple-500/20 text-purple-300 border-purple-500/40";
    } else if (valanceE >= 5 && activeBohrZ !== 1) {
      typeText = "Phi kim (dễ nhận e)";
      typeClass = "bg-blue-500/20 text-blue-300 border-blue-500/40";
    } else if (valanceE === 4) {
      typeText = "Có thể là Phi kim hoặc Kim loại";
      typeClass = "bg-amber-500/20 text-amber-300 border-amber-500/40";
    }
    typeBadgeEl.className = `px-3 py-1 rounded-full text-xs font-bold border ${typeClass}`;
    typeBadgeEl.textContent = typeText;
  }
}

function startBohrCanvasAnimation() {
  const canvas = document.getElementById("bohr-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const subtabBohr = document.getElementById("sim-subtab-bohr");
  if (subtabBohr && subtabBohr.classList.contains("hidden")) {
    if (bohrAnimationId) {
      cancelAnimationFrame(bohrAnimationId);
      bohrAnimationId = null;
    }
    return;
  }

  // Đảm bảo canvas sắc nét trên màn hình Retina/High-DPI
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const displayWidth = rect.width > 0 ? rect.width : (canvas.clientWidth || 360);
  const displayHeight = rect.height > 0 ? rect.height : (canvas.clientHeight || displayWidth || 360);
  const width = Math.min(displayWidth, 360);
  const height = Math.min(displayHeight, 360);

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  if (ctx.resetTransform) {
    ctx.resetTransform();
  } else {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  ctx.scale(dpr, dpr);

  let angle = 0;

  function renderFrame() {
    if (subtabBohr && subtabBohr.classList.contains("hidden")) {
      if (bohrAnimationId) {
        cancelAnimationFrame(bohrAnimationId);
        bohrAnimationId = null;
      }
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const shells = calculateShellDistribution(activeBohrZ);

    // 1. Vẽ hạt nhân nguyên tử ở tâm (Nucleus)
    const nucleusRadius = 22;
    const grad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, nucleusRadius);
    grad.addColorStop(0, "#34d399");
    grad.addColorStop(0.7, "#059669");
    grad.addColorStop(1, "#064e3b");

    ctx.save();
    ctx.shadowColor = "#10b981";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // Text ở tâm: Ký hiệu & Z
    const elem = ELEMENTS_DATA.find(e => e.z === activeBohrZ) || { s: activeBohrZ };
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(elem.s, centerX, centerY - 4);
    ctx.font = "bold 9px monospace";
    ctx.fillText(`+${activeBohrZ}`, centerX, centerY + 8);

    // 2. Vẽ các vòng quỹ đạo electron đồng tâm
    const baseRadius = 36;
    const shellGap = 28;

    shells.forEach((electronCount, shellIdx) => {
      const radius = baseRadius + shellIdx * shellGap;

      // Vẽ đường quỹ đạo mờ
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(100, 116, 139, 0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Nhãn lớp (K, L, M, N)
      const shellLabels = ["K", "L", "M", "N"];
      ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
      ctx.font = "bold 9px sans-serif";
      ctx.fillText(shellLabels[shellIdx], centerX + radius + 8, centerY);

      // Vẽ các electron quay xung quanh
      const speed = (0.015 / (shellIdx + 1));
      const currentAngle = angle * (shellIdx % 2 === 0 ? 1 : -1) * (1 / (shellIdx + 1));

      for (let i = 0; i < electronCount; i++) {
        const theta = currentAngle + (i * 2 * Math.PI / electronCount);
        const ex = centerX + Math.cos(theta) * radius;
        const ey = centerY + Math.sin(theta) * radius;

        // Vẽ vệt sáng và hạt electron neon
        ctx.save();
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#0284c7";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#e0f2fe";
        ctx.fill();
        ctx.restore();
      }
    });

    angle += 0.02;
    bohrAnimationId = requestAnimationFrame(renderFrame);
  }

  if (bohrAnimationId) cancelAnimationFrame(bohrAnimationId);
  renderFrame();
}

// ==========================================================================
// 3. BỘ CÔNG CỤ TÍNH TOÁN & GIẢI TOÁN HÓA HỌC THÔNG MINH
// ==========================================================================

function solveParticleSystem() {
  const sInput = parseFloat(document.getElementById("solver-particle-s").value);
  const diffInput = parseFloat(document.getElementById("solver-particle-diff").value);
  const resultDiv = document.getElementById("solver-particle-result");

  if (isNaN(sInput) || sInput <= 0) {
    resultDiv.innerHTML = `<div class="p-3 bg-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold">Vui lòng nhập tổng số hạt S hợp lệ (> 0)!</div>`;
    return;
  }

  // TH1: Có nhập hiệu số hạt mang điện và không mang điện (2Z - N = diff)
  if (!isNaN(diffInput)) {
    // 2Z + N = S
    // 2Z - N = diff
    // => 4Z = S + diff => Z = (S + diff) / 4
    const z = (sInput + diffInput) / 4;
    const n = sInput - 2 * z;
    const a = z + n;

    if (!Number.isInteger(z) || z <= 0 || n < 0) {
      resultDiv.innerHTML = `
        <div class="p-4 bg-amber-500/20 text-amber-300 rounded-xl text-xs space-y-2">
          <p class="font-bold">⚠️ Kết quả không nguyên (Z = ${z.toFixed(2)}, N = ${n.toFixed(2)})</p>
          <p>Hãy kiểm tra lại số liệu đề bài đã cung cấp xem có sai sót không nhé.</p>
        </div>
      `;
      return;
    }

    const elem = ELEMENTS_DATA.find(e => e.z === z) || { nameVi: "Nguyên tố Z=" + z, s: "X" };

    resultDiv.innerHTML = `
      <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-3 animate-fade-in text-xs sm:text-sm">
        <div class="flex items-center justify-between pb-2 border-b border-emerald-500/20">
          <span class="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">🎉 Đã tìm ra nguyên tố: ${elem.nameVi} (${elem.s})</span>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-xs">Z = ${z}</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
          <div class="p-2 bg-slate-100 dark:bg-slate-900 rounded-xl text-center"><span class="text-slate-400 block text-[10px]">Proton (p)</span><span class="font-black text-indigo-500 text-base">${z}</span></div>
          <div class="p-2 bg-slate-100 dark:bg-slate-900 rounded-xl text-center"><span class="text-slate-400 block text-[10px]">Electron (e)</span><span class="font-black text-indigo-500 text-base">${z}</span></div>
          <div class="p-2 bg-slate-100 dark:bg-slate-900 rounded-xl text-center"><span class="text-slate-400 block text-[10px]">Neutron (n)</span><span class="font-black text-emerald-500 text-base">${n}</span></div>
          <div class="p-2 bg-slate-100 dark:bg-slate-900 rounded-xl text-center"><span class="text-slate-400 block text-[10px]">Số khối (A)</span><span class="font-black text-rose-500 text-base">${a}</span></div>
        </div>
        <div class="space-y-1 text-slate-600 dark:text-slate-300">
          <p><strong>Cấu hình electron:</strong> <code class="font-mono text-indigo-500 font-bold">${elem.config || 'Đang cập nhật'}</code></p>
          <p><strong>Các bước biến đổi:</strong></p>
          <p class="pl-3 font-mono text-xs">1) 2Z + N = ${sInput} và 2Z - N = ${diffInput}</p>
          <p class="pl-3 font-mono text-xs">2) Cộng 2 vế: 4Z = ${sInput + diffInput} => Z = ${z}</p>
          <p class="pl-3 font-mono text-xs">3) Neutron: N = ${sInput} - 2(${z}) = ${n} => Số khối A = ${a}</p>
        </div>
      </div>
    `;
  } else {
    // TH2: Áp dụng điều kiện bền 1 <= N/Z <= 1.5 => S/3.5 <= Z <= S/3
    const minZ = Math.ceil(sInput / 3.5);
    const maxZ = Math.floor(sInput / 3.0);

    let candidates = [];
    for (let z = minZ; z <= maxZ; z++) {
      const n = sInput - 2 * z;
      const a = z + n;
      const elem = ELEMENTS_DATA.find(e => e.z === z) || { nameVi: "Z=" + z, s: "X" };
      candidates.push({ z, n, a, elem });
    }

    resultDiv.innerHTML = `
      <div class="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-500/40 rounded-2xl space-y-3 text-xs sm:text-sm">
        <p class="font-bold text-blue-600 dark:text-blue-400">Áp dụng bất đẳng thức bền: S/3.5 ≤ Z ≤ S/3</p>
        <p>Với tổng số hạt S = ${sInput} => ${ (sInput/3.5).toFixed(2) } ≤ Z ≤ ${ (sInput/3).toFixed(2) } => Z ∈ [${minZ}, ${maxZ}].</p>
        <div class="space-y-2">
          ${candidates.map(c => `
            <div class="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-slate-900 dark:text-slate-100">${c.elem.nameVi} (${c.elem.s})</span>
                <span class="text-xs text-slate-500 dark:text-slate-400">· Z = ${c.z}, N = ${c.n}, A = ${c.a}</span>
              </div>
              <button onclick="setBohrZ(${c.z}); switchSimulationSubTab('bohr')" class="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-xs font-semibold">Xem Z=${c.z}</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

function solveIsotopeCalc() {
  const a1 = parseFloat(document.getElementById("solver-iso-a1").value);
  const a2 = parseFloat(document.getElementById("solver-iso-a2").value);
  const p1 = parseFloat(document.getElementById("solver-iso-p1").value);
  const avg = parseFloat(document.getElementById("solver-iso-avg").value);
  const resultDiv = document.getElementById("solver-iso-result");

  if (isNaN(a1) || isNaN(a2)) {
    resultDiv.innerHTML = `<div class="p-3 bg-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold">Vui lòng nhập số khối 2 đồng vị A₁ và A₂!</div>`;
    return;
  }

  if (!isNaN(p1)) {
    // Đã biết % của đồng vị 1
    const p2 = 100 - p1;
    const calcAvg = (a1 * p1 + a2 * p2) / 100;
    resultDiv.innerHTML = `
      <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-2 text-xs sm:text-sm">
        <h5 class="font-bold text-emerald-600 dark:text-emerald-400">Kết quả tính Nguyên tử khối trung bình:</h5>
        <p>• Đồng vị 1 ($^{${a1}}\\text{X}$): <strong>${p1}%</strong></p>
        <p>• Đồng vị 2 ($^{${a2}}\\text{X}$): <strong>${p2.toFixed(2)}%</strong></p>
        <p class="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
          $$\\overline{A} = \\frac{${a1} \\times ${p1} + ${a2} \\times ${p2.toFixed(2)}}{100} = ${calcAvg.toFixed(4)}$$
        </p>
      </div>
    `;
    if (window.renderMathInElement) renderMathInElement(resultDiv);
  } else if (!isNaN(avg)) {
    // Đã biết A_trung_bình, tìm % mỗi đồng vị
    // A_tb = (A1*x + A2*(100-x))/100 => 100*A_tb = (A1 - A2)*x + 100*A2
    const x = (100 * avg - 100 * a2) / (a1 - a2);
    const y = 100 - x;

    resultDiv.innerHTML = `
      <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-2 text-xs sm:text-sm">
        <h5 class="font-bold text-emerald-600 dark:text-emerald-400">Kết quả phần trăm số nguyên tử các đồng vị:</h5>
        <p>• Đồng vị $^{${a1}}\\text{X}$: <strong class="text-indigo-500 text-base">${x.toFixed(2)}%</strong></p>
        <p>• Đồng vị $^{${a2}}\\text{X}$: <strong class="text-emerald-500 text-base">${y.toFixed(2)}%</strong></p>
        <p class="text-slate-500 text-xs">Phương trình: ${a1}·x + ${a2}·(100 - x) = 100 · ${avg}</p>
      </div>
    `;
  } else {
    resultDiv.innerHTML = `<div class="p-3 bg-amber-500/20 text-amber-300 rounded-xl text-xs font-semibold">Vui lòng nhập thêm % của A₁ hoặc Nguyên tử khối trung bình A_tb để tính toán!</div>`;
  }
}

// Chuyển đổi giữa các tab con trong Phòng Thí Nghiệm & Công Cụ
function switchSimulationSubTab(tab) {
  document.querySelectorAll(".sim-subtab-btn").forEach(btn => {
    if (btn.dataset.subtab === tab) {
      btn.className = "sim-subtab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white shadow-md transition";
    } else {
      btn.className = "sim-subtab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition";
    }
  });

  document.querySelectorAll(".sim-subtab-content").forEach(c => c.classList.add("hidden"));
  const target = document.getElementById(`sim-subtab-${tab}`);
  if (target) target.classList.remove("hidden");

  // Luôn reset cuộn ngang về 0 để tránh bảng tuần hoàn kéo trôi màn hình
  window.scrollTo({ left: 0, top: 0, behavior: "instant" });

  if (tab === "bohr") {
    setTimeout(startBohrCanvasAnimation, 50);
  } else {
    // Dừng loop canvas Bohr khi không hiển thị tab Bohr
    if (bohrAnimationId) {
      cancelAnimationFrame(bohrAnimationId);
      bohrAnimationId = null;
    }
    if (tab === "periodic") {
      setTimeout(initPeriodicTable, 50);
    }
  }
}

// Lắng nghe thay đổi kích thước cửa sổ để vẽ lại Canvas sắc nét
let bohrResizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(bohrResizeTimer);
  bohrResizeTimer = setTimeout(() => {
    const subtabBohr = document.getElementById("sim-subtab-bohr");
    if (subtabBohr && !subtabBohr.classList.contains("hidden")) {
      startBohrCanvasAnimation();
    }
  }, 120);
});

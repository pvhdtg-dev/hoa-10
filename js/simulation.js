// ==========================================================================
// HÓA HỌC 10 - SIMULATION & INTERACTIVE TOOLS (BẢNG TUẦN HOÀN, MÔ HÌNH NGUYÊN TỬ & BỘ GIẢI)
// ==========================================================================

let activeBohrZ = 11; // Mặc định Sodium (Na, Z=11)
let bohrAnimationId = null;
let currentHeatmap = "category"; // category | en | radius | state
let selectedPeriodicElement = null;

// ==========================================================================
// 1. BẢNG TUẦN HOÀN TƯƠNG TÁC (INTERACTIVE PERIODIC TABLE)
// ==========================================================================

// Bảng tọa độ vị trí 118 nguyên tố trên lưới 18 cột x 7 hàng
const PERIODIC_GRID = [
  // Chu kỳ 1
  { z: 1, r: 1, c: 1 }, { z: 2, r: 1, c: 18 },
  // Chu kỳ 2
  { z: 3, r: 2, c: 1 }, { z: 4, r: 2, c: 2 },
  { z: 5, r: 2, c: 13 }, { z: 6, r: 2, c: 14 }, { z: 7, r: 2, c: 15 }, { z: 8, r: 2, c: 16 }, { z: 9, r: 2, c: 17 }, { z: 10, r: 2, c: 18 },
  // Chu kỳ 3
  { z: 11, r: 3, c: 1 }, { z: 12, r: 3, c: 2 },
  { z: 13, r: 3, c: 13 }, { z: 14, r: 3, c: 14 }, { z: 15, r: 3, c: 15 }, { z: 16, r: 3, c: 16 }, { z: 17, r: 3, c: 17 }, { z: 18, r: 3, c: 18 },
  // Chu kỳ 4
  { z: 19, r: 4, c: 1 }, { z: 20, r: 4, c: 2 }, { z: 21, r: 4, c: 3 }, { z: 22, r: 4, c: 4 }, { z: 23, r: 4, c: 5 }, { z: 24, r: 4, c: 6 },
  { z: 25, r: 4, c: 7 }, { z: 26, r: 4, c: 8 }, { z: 27, r: 4, c: 9 }, { z: 28, r: 4, c: 10 }, { z: 29, r: 4, c: 11 }, { z: 30, r: 4, c: 12 },
  { z: 31, r: 4, c: 13 }, { z: 32, r: 4, c: 14 }, { z: 33, r: 4, c: 15 }, { z: 34, r: 4, c: 16 }, { z: 35, r: 4, c: 17 }, { z: 36, r: 4, c: 18 },
  // Chu kỳ 5
  { z: 37, r: 5, c: 1 }, { z: 38, r: 5, c: 2 }, { z: 47, r: 5, c: 11 }, { z: 50, r: 5, c: 14 }, { z: 53, r: 5, c: 17 }, { z: 54, r: 5, c: 18 },
  // Chu kỳ 6
  { z: 55, r: 6, c: 1 }, { z: 56, r: 6, c: 2 }, { z: 79, r: 6, c: 11 }, { z: 80, r: 6, c: 12 }, { z: 82, r: 6, c: 14 },
  // Chu kỳ 7
  { z: 92, r: 7, c: 3 }
];

function initPeriodicTable() {
  const container = document.getElementById("periodic-grid-container");
  if (!container) return;

  renderPeriodicTableGrid();
  selectElementByZ(11); // Khởi tạo với Sodium
}

function getCategoryColor(cat) {
  switch (cat) {
    case "alkali": return { bg: "bg-rose-500/20 border-rose-500/40 text-rose-300", tag: "Kim loại kiềm" };
    case "alkaline": return { bg: "bg-orange-500/20 border-orange-500/40 text-orange-300", tag: "Kiềm thổ" };
    case "transition": return { bg: "bg-amber-500/20 border-amber-500/40 text-amber-300", tag: "Chuyển tiếp" };
    case "post-transition": return { bg: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300", tag: "Kim loại sau chuyển tiếp" };
    case "metalloid": return { bg: "bg-teal-500/20 border-teal-500/40 text-teal-300", tag: "Á kim" };
    case "nonmetal": return { bg: "bg-blue-500/20 border-blue-500/40 text-blue-300", tag: "Phi kim" };
    case "halogen": return { bg: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300", tag: "Halogen" };
    case "noble": return { bg: "bg-purple-500/20 border-purple-500/40 text-purple-300", tag: "Khí hiếm" };
    case "actinide": return { bg: "bg-pink-500/20 border-pink-500/40 text-pink-300", tag: "Actinide" };
    default: return { bg: "bg-slate-700/20 border-slate-600 text-slate-300", tag: "Khác" };
  }
}

function getHeatmapColorStyle(elem, mode) {
  if (mode === "category") {
    return ""; // Dùng class Tailwind
  }
  if (mode === "en") {
    // Độ âm điện Pauling (0.7 -> 4.0)
    if (!elem.en) return "background: rgba(100, 116, 139, 0.2); border-color: rgba(100, 116, 139, 0.4);";
    const ratio = Math.max(0, Math.min(1, (elem.en - 0.7) / (4.0 - 0.7)));
    // Gradient từ xanh lam sang vàng cam sang đỏ tươi
    const r = Math.round(255 * ratio);
    const g = Math.round(220 * (1 - Math.abs(ratio - 0.5) * 2));
    const b = Math.round(255 * (1 - ratio));
    return `background: rgba(${r}, ${g}, ${b}, 0.25); border-color: rgba(${r}, ${g}, ${b}, 0.6); color: #fff;`;
  }
  if (mode === "radius") {
    // Bán kính nguyên tử pm (30 -> 300)
    const ratio = Math.max(0, Math.min(1, (elem.r - 30) / (300 - 30)));
    const g = Math.round(100 + 155 * ratio);
    return `background: rgba(16, ${g}, 220, 0.25); border-color: rgba(16, ${g}, 220, 0.6); color: #fff;`;
  }
  if (mode === "state") {
    if (elem.state === "gas") return "background: rgba(168, 85, 247, 0.25); border-color: rgba(168, 85, 247, 0.6); color: #c084fc;";
    if (elem.state === "liquid") return "background: rgba(6, 182, 212, 0.25); border-color: rgba(6, 182, 212, 0.6); color: #67e8f9;";
    return "background: rgba(59, 130, 246, 0.25); border-color: rgba(59, 130, 246, 0.6); color: #93c5fd;";
  }
  return "";
}

function renderPeriodicTableGrid(filterCategory = "all") {
  const container = document.getElementById("periodic-grid-container");
  if (!container) return;

  container.innerHTML = "";

  // Tạo khung lưới CSS Grid 18 cột
  PERIODIC_GRID.forEach(pos => {
    const elem = ELEMENTS_DATA.find(e => e.z === pos.z);
    if (!elem) return;

    if (filterCategory !== "all" && elem.cat !== filterCategory) {
      // Làm mờ nguyên tố không khớp bộ lọc
    }

    const catStyle = getCategoryColor(elem.cat);
    const customStyle = getHeatmapColorStyle(elem, currentHeatmap);

    const cell = document.createElement("button");
    cell.className = `p-1.5 sm:p-2 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-sm ${currentHeatmap === 'category' ? catStyle.bg : ''} ${selectedPeriodicElement && selectedPeriodicElement.z === elem.z ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900 scale-105' : ''}`;
    
    cell.style.gridRow = pos.r;
    cell.style.gridColumn = pos.c;
    if (customStyle) cell.setAttribute("style", `${cell.getAttribute("style") || ''} ${customStyle}`);

    cell.innerHTML = `
      <span class="text-[9px] sm:text-[10px] opacity-75 font-mono leading-none">${elem.z}</span>
      <span class="text-sm sm:text-base font-extrabold leading-none my-0.5">${elem.s}</span>
      <span class="text-[8px] sm:text-[9px] opacity-80 truncate max-w-[48px] hidden sm:block">${currentHeatmap === 'en' ? (elem.en || '-') : (currentHeatmap === 'radius' ? elem.r + 'pm' : elem.nameVi)}</span>
    `;

    cell.onclick = () => selectElementByZ(elem.z);
    container.appendChild(cell);
  });
}

function setHeatmapMode(mode) {
  currentHeatmap = mode;
  document.querySelectorAll(".heatmap-btn").forEach(btn => {
    if (btn.dataset.mode === mode) {
      btn.className = "heatmap-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm transition";
    } else {
      btn.className = "heatmap-btn px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition";
    }
  });
  renderPeriodicTableGrid();
}

function filterPeriodicTable(cat) {
  renderPeriodicTableGrid(cat);
}

function selectElementByZ(z) {
  const elem = ELEMENTS_DATA.find(e => e.z === z);
  if (!elem) return;
  selectedPeriodicElement = elem;
  renderElementInspectorCard(elem);
  renderPeriodicTableGrid();
}

function renderElementInspectorCard(elem) {
  const card = document.getElementById("element-inspector-card");
  if (!card) return;

  const catInfo = getCategoryColor(elem.cat);

  card.innerHTML = `
    <div class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <div class="w-16 h-16 rounded-2xl ${catInfo.bg} border flex flex-col items-center justify-center shadow-lg">
            <span class="text-xs opacity-70 font-mono">${elem.z}</span>
            <span class="text-2xl font-black">${elem.s}</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-lg font-black text-slate-900 dark:text-slate-100">${elem.nameVi}</h3>
              <span class="text-xs px-2 py-0.5 rounded-full ${catInfo.bg} font-semibold">${catInfo.tag}</span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 italic">${elem.nameEn} · Nguyên tử khối: ${elem.mass}</p>
          </div>
        </div>

        <button onclick="launchBohrWithZ(${elem.z})" class="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition active:scale-95">
          <span>🔬</span>
          <span>Xem Mô Phỏng Bohr</span>
        </button>
      </div>

      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
        ${elem.desc}
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span class="text-slate-400 block text-[10px] uppercase font-bold">Vị trí BTH</span>
          <span class="font-extrabold text-indigo-600 dark:text-indigo-400">Chu kỳ ${elem.period} · Nhóm ${elem.group}</span>
        </div>
        <div class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span class="text-slate-400 block text-[10px] uppercase font-bold">Cấu hình e</span>
          <span class="font-bold text-slate-900 dark:text-slate-100 font-mono">${elem.config}</span>
        </div>
        <div class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span class="text-slate-400 block text-[10px] uppercase font-bold">Độ âm điện</span>
          <span class="font-extrabold text-emerald-600 dark:text-emerald-400">${elem.en ? elem.en : 'Không xác định'}</span>
        </div>
        <div class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span class="text-slate-400 block text-[10px] uppercase font-bold">Bán kính nguyên tử</span>
          <span class="font-bold text-slate-900 dark:text-slate-100">${elem.r} pm</span>
        </div>
      </div>
    </div>
  `;
}

function launchBohrWithZ(z) {
  // Chuyển sang sub-tab mô phỏng Bohr và đặt activeBohrZ
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

  // Đảm bảo canvas sắc nét trên màn hình Retina/High-DPI
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 360;
  const height = canvas.clientHeight || 360;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  let angle = 0;

  function renderFrame() {
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

  if (tab === "bohr") {
    setTimeout(startBohrCanvasAnimation, 50);
  } else if (tab === "periodic") {
    setTimeout(renderPeriodicTableGrid, 50);
  }
}

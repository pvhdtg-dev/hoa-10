// ==========================================================================
// HÓA HỌC 10 - MAIN APPLICATION CONTROLLER
// Quản lý Tabs, Bài học, Luyện đề, Thi thử, Sổ tay câu sai & KaTeX Rendering
// ==========================================================================

let activeTab = "theory";
let selectedLessonId = "bai-1";
let practiceMode = "mcq"; // mcq | tf | sa | essay | exam
let practiceFilterLesson = "all";
let practiceFilterLevel = "all";
let examQuestions = [];
let examUserAnswers = {};
let examTimeRemaining = 900; // 15 phút = 900s
let examTimerInterval = null;
let mistakeQuestions = JSON.parse(localStorage.getItem("hoa10_mistakes") || "[]");

// Âm thanh Web Audio API
const audioCtx = (typeof AudioContext !== "undefined" || typeof webkitAudioContext !== "undefined")
  ? new (window.AudioContext || window.webkitAudioContext)()
  : null;

function playSound(type) {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === "correct") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.1); // A5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "wrong") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(164.81, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "complete") {
      // Fanfare chord
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = "triangle";
        o.frequency.setValueAtTime(freq, now + i * 0.08);
        g.gain.setValueAtTime(0.2, now + i * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        o.start(now + i * 0.08);
        o.stop(now + 0.6);
      });
    }
  } catch (e) {
    console.error("Audio error", e);
  }
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupNavigation();
  renderLessonsNavList();
  renderSelectedLesson();
  renderPracticeContent();
  renderFormulasTab();
  renderMistakeStats();

  // Khởi tạo Bảng tuần hoàn & Mô phỏng Bohr
  if (typeof initPeriodicTable === "function") initPeriodicTable();
  if (typeof initBohrSimulation === "function") initBohrSimulation();

  triggerKaTeX();
});

// ==========================================================================
// 1. GIAO DIỆN SÁNG / TỐI (THEME MANAGER)
// ==========================================================================

function initTheme() {
  const savedTheme = localStorage.getItem("hoa10_theme") || "dark"; // Mặc định dark mode khoa học
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const toggleBtn = document.getElementById("btn-toggle-theme");
  if (toggleBtn) {
    toggleBtn.onclick = () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("hoa10_theme", isDark ? "dark" : "light");
    };
  }
}

// ==========================================================================
// 2. ĐIỀU HƯỚNG TABS (TAB CONTROLLER)
// ==========================================================================

function setupNavigation() {
  document.querySelectorAll("[data-tab-target]").forEach(btn => {
    btn.onclick = () => {
      const target = btn.dataset.tabTarget;
      switchTab(target);
    };
  });
}

function switchTab(tab) {
  activeTab = tab;

  // Cập nhật trạng thái nút Desktop & Mobile
  document.querySelectorAll("[data-tab-target]").forEach(b => {
    const isTarget = b.dataset.tabTarget === tab;
    if (isTarget) {
      b.className = b.className.replace(/text-slate-\w+/g, "").replace(/hover:bg-slate-\w+/g, "");
      b.classList.add("bg-emerald-600", "text-white", "shadow-md");
    } else {
      b.classList.remove("bg-emerald-600", "text-white", "shadow-md");
      b.classList.add("text-slate-600", "dark:text-slate-300");
    }
  });

  // Hiển thị nội dung tab tương ứng
  document.querySelectorAll(".tab-content").forEach(content => {
    content.classList.remove("active");
    content.classList.add("hidden");
  });

  const activeContent = document.getElementById(`tab-${tab}`);
  if (activeContent) {
    activeContent.classList.remove("hidden");
    activeContent.classList.add("active");
  }

  if (tab === "simulations") {
    setTimeout(() => {
      const activeSubtab = document.querySelector(".sim-subtab-btn.bg-emerald-600");
      const subtabName = activeSubtab ? activeSubtab.dataset.subtab : "periodic";
      if (subtabName === "periodic" && typeof initPeriodicTable === "function") initPeriodicTable();
      if (subtabName === "bohr" && typeof startBohrCanvasAnimation === "function") startBohrCanvasAnimation();
    }, 50);
  } else {
    if (typeof bohrAnimationId !== "undefined" && bohrAnimationId) {
      cancelAnimationFrame(bohrAnimationId);
      bohrAnimationId = null;
    }
  }

  triggerKaTeX();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

// ==========================================================================
// 3. TAB LÝ THUYẾT (THEORY LESSONS)
// ==========================================================================

function renderLessonsNavList() {
  const container = document.getElementById("lessons-nav-list");
  if (!container) return;

  container.innerHTML = LESSONS_DATA.map(lesson => `
    <button onclick="selectLesson('${lesson.id}')" 
      class="w-full text-left p-3 rounded-xl mb-1.5 transition-all duration-200 border ${lesson.id === selectedLessonId ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500/50 shadow-sm text-emerald-900 dark:text-emerald-300 font-semibold' : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}">
      <div class="flex items-center justify-between mb-1">
        <span class="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">${lesson.badge}</span>
      </div>
      <div class="text-xs sm:text-sm font-bold line-clamp-2">${lesson.title}</div>
    </button>
  `).join("");
}

function selectLesson(id) {
  selectedLessonId = id;
  renderLessonsNavList();
  renderSelectedLesson();
  triggerKaTeX();
}

function renderSelectedLesson() {
  const container = document.getElementById("lesson-detail-container");
  if (!container) return;

  const lesson = LESSONS_DATA.find(l => l.id === selectedLessonId) || LESSONS_DATA[0];

  container.innerHTML = `
    <div class="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">${lesson.chapter}</span>
          <h2 class="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">${lesson.title}</h2>
        </div>
        <button onclick="filterPracticeByLesson('${lesson.chapter}')" class="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 hover:opacity-95 transition flex items-center gap-1.5 active:scale-95 shrink-0">
          <span>✍️</span>
          <span>Luyện Bài Tập Ngay</span>
        </button>
      </div>

      <div class="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h4 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">Mục tiêu & Tóm tắt cốt lõi</h4>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${lesson.summary}</p>
      </div>

      ${lesson.keyFormulas && lesson.keyFormulas.length > 0 ? `
        <div class="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 space-y-3">
          <h4 class="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <span>📐</span> Công Thức Cốt Lõi
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${lesson.keyFormulas.map(f => `
              <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span class="text-xs font-semibold text-slate-500 block mb-1">${f.name}</span>
                <div class="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 py-1 overflow-x-auto">
                  ${formatLatex(f.formula, true)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="pt-2">
        ${lesson.contentHtml}
      </div>
    </div>
  `;
}

function filterPracticeByLesson(chapterName) {
  switchTab("practice");
  const chShort = chapterName.includes("Chương 1") ? "Chương 1" : "Chương 2";
  setPracticeFilterLesson(chShort);
}

// ==========================================================================
// 4. TAB LUYỆN BÀI TẬP (PRACTICE CONTROLLER)
// ==========================================================================

function setPracticeMode(mode) {
  practiceMode = mode;
  document.querySelectorAll(".practice-mode-btn").forEach(btn => {
    if (btn.dataset.mode === mode) {
      btn.className = "practice-mode-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white shadow-md transition";
    } else {
      btn.className = "practice-mode-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition";
    }
  });

  renderPracticeContent();
}

function setPracticeFilterLesson(ch) {
  practiceFilterLesson = ch;
  renderPracticeContent();
}

function setPracticeFilterLevel(lvl) {
  practiceFilterLevel = lvl;
  renderPracticeContent();
}

function renderPracticeContent() {
  const container = document.getElementById("practice-questions-list");
  if (!container) return;

  if (practiceMode === "essay") {
    renderEssayList(container);
    return;
  }

  if (practiceMode === "exam") {
    renderExamSetup(container);
    return;
  }

  // Lọc theo dạng câu hỏi: mcq, tf, sa
  let list = QUIZZES_DATA.filter(q => q.type === practiceMode);

  if (practiceFilterLesson !== "all") {
    list = list.filter(q => q.chapter === practiceFilterLesson);
  }
  if (practiceFilterLevel !== "all") {
    list = list.filter(q => q.level === practiceFilterLevel);
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center glass-card rounded-2xl border border-slate-200 dark:border-slate-800">
        <p class="text-slate-400 text-sm">Không tìm thấy câu hỏi phù hợp với bộ lọc đã chọn.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((q, idx) => {
    if (q.type === "mcq") return renderMcqCard(q, idx + 1);
    if (q.type === "tf") return renderTfCard(q, idx + 1);
    if (q.type === "sa") return renderSaCard(q, idx + 1);
    return "";
  }).join("");

  triggerKaTeX();
}

function renderMcqCard(q, num) {
  return `
    <div id="card-${q.id}" class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">${num}</span>
          <span class="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">${q.chapter}</span>
          <span class="text-xs px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-500 font-semibold">${q.level}</span>
        </div>
      </div>

      <div class="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
        ${q.q}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
        ${q.options.map((opt, oIdx) => `
          <button onclick="checkMcqAnswer('${q.id}', ${oIdx})" id="btn-${q.id}-${oIdx}"
            class="quiz-option opt-btn-${q.id}">
            <span class="opt-badge">${String.fromCharCode(65 + oIdx)}</span>
            <span class="opt-text">${opt}</span>
          </button>
        `).join('')}
      </div>

      <div id="exp-${q.id}" class="hidden p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        <!-- Explanation populated on answer -->
      </div>
    </div>
  `;
}

function checkMcqAnswer(qId, selectedIdx) {
  const q = QUIZZES_DATA.find(item => item.id === qId);
  if (!q) return;

  const isCorrect = selectedIdx === q.answer;
  const expEl = document.getElementById(`exp-${qId}`);

  // Disable all option buttons for this question & mark correct / wrong / dimmed
  document.querySelectorAll(`.opt-btn-${qId}`).forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.answer) {
      btn.classList.add("correct");
    } else if (idx === selectedIdx && !isCorrect) {
      btn.classList.add("wrong");
    } else {
      btn.classList.add("dimmed");
    }
  });

  if (expEl) {
    expEl.classList.remove("hidden");
    expEl.innerHTML = `
      <p class="font-bold ${isCorrect ? 'text-emerald-500' : 'text-rose-500'} mb-1.5 flex items-center gap-1.5 text-sm">
        <span>${isCorrect ? '✅' : '❌'}</span>
        <span>${isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}</span>
      </p>
      <div class="text-slate-700 dark:text-slate-300">${q.explanation}</div>
    `;
    triggerKaTeX();
  }

  if (isCorrect) {
    playSound("correct");
  } else {
    playSound("wrong");
    recordMistake(q);
  }
}

function renderTfCard(q, num) {
  return `
    <div id="card-${q.id}" class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">${num}</span>
        <span class="text-xs px-2 py-0.5 rounded-md bg-teal-500 text-white font-bold">ĐÚNG / SAI (Format 2025)</span>
        <span class="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">${q.chapter}</span>
      </div>

      <div class="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
        ${q.q}
      </div>

      <div class="space-y-2">
        ${q.subQuestions.map((sub, sIdx) => `
          <div class="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span class="flex-1 font-medium text-slate-800 dark:text-slate-200"><span class="font-bold">${String.fromCharCode(97 + sIdx)})</span> ${sub.text}</span>
            <div class="flex items-center gap-2 shrink-0">
              <button onclick="checkTfSubAnswer('${q.id}', ${sIdx}, true)" id="btn-${q.id}-${sIdx}-true" class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:border-emerald-500 hover:text-emerald-500 transition">Đúng</button>
              <button onclick="checkTfSubAnswer('${q.id}', ${sIdx}, false)" id="btn-${q.id}-${sIdx}-false" class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:border-rose-500 hover:text-rose-500 transition">Sai</button>
            </div>
          </div>
          <div id="tf-exp-${q.id}-${sIdx}" class="hidden px-3 py-2 text-[11px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800 mt-1"></div>
        `).join('')}
      </div>
    </div>
  `;
}

function checkTfSubAnswer(qId, subIdx, userChoice) {
  const q = QUIZZES_DATA.find(item => item.id === qId);
  if (!q) return;
  const sub = q.subQuestions[subIdx];
  const isCorrect = userChoice === sub.answer;

  const btnTrue = document.getElementById(`btn-${qId}-${subIdx}-true`);
  const btnFalse = document.getElementById(`btn-${qId}-${subIdx}-false`);
  const expDiv = document.getElementById(`tf-exp-${qId}-${subIdx}`);

  btnTrue.disabled = true;
  btnFalse.disabled = true;

  if (userChoice) {
    btnTrue.className = `px-3 py-1.5 rounded-lg font-bold text-white shadow-sm ${isCorrect ? 'bg-emerald-600 border border-emerald-500' : 'bg-rose-600 border border-rose-500'}`;
  } else {
    btnFalse.className = `px-3 py-1.5 rounded-lg font-bold text-white shadow-sm ${isCorrect ? 'bg-emerald-600 border border-emerald-500' : 'bg-rose-600 border border-rose-500'}`;
  }

  if (expDiv) {
    expDiv.classList.remove("hidden");
    expDiv.innerHTML = `<span class="${isCorrect ? 'text-emerald-500' : 'text-rose-500'} font-bold">${isCorrect ? '✅ Đúng' : '❌ Sai'}:</span> ${sub.exp}`;
  }

  if (isCorrect) playSound("correct");
  else {
    playSound("wrong");
    recordMistake(q);
  }
}

function renderSaCard(q, num) {
  return `
    <div id="card-${q.id}" class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs">${num}</span>
        <span class="text-xs px-2 py-0.5 rounded-md bg-purple-600 text-white font-bold">TRẢ LỜI NGẮN (Format 2025)</span>
        <span class="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">${q.chapter}</span>
      </div>

      <div class="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
        ${q.q}
      </div>

      <div class="flex items-center gap-2">
        <input type="text" id="input-${q.id}" placeholder="Nhập đáp số..." 
          class="w-48 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-mono font-bold focus:outline-none focus:border-emerald-500" />
        <button onclick="checkSaAnswer('${q.id}')" class="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition">
          Kiểm tra
        </button>
      </div>

      <div id="exp-${q.id}" class="hidden p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed"></div>
    </div>
  `;
}

function checkSaAnswer(qId) {
  const q = QUIZZES_DATA.find(item => item.id === qId);
  if (!q) return;

  const input = document.getElementById(`input-${qId}`);
  const userVal = input.value.trim();
  const isCorrect = userVal.toLowerCase() === q.answer.toLowerCase();
  const expEl = document.getElementById(`exp-${qId}`);

  if (expEl) {
    expEl.classList.remove("hidden");
    expEl.innerHTML = `
      <p class="font-bold ${isCorrect ? 'text-emerald-500' : 'text-rose-500'} mb-1">${isCorrect ? '✅ Chính xác tuyệt đối!' : '❌ Chưa chính xác!'}</p>
      <p><strong>Đáp án đúng:</strong> <span class="font-mono font-bold text-emerald-500">${q.answer}</span></p>
      <p class="mt-1">${q.explanation}</p>
    `;
    triggerKaTeX();
  }

  if (isCorrect) playSound("correct");
  else {
    playSound("wrong");
    recordMistake(q);
  }
}

function renderEssayList(container) {
  container.innerHTML = ESSAY_DATA.map((item, idx) => `
    <div class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800">${item.chapter}</span>
          <h3 class="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">${item.title}</h3>
        </div>
      </div>

      <div class="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
        ${item.problem}
      </div>

      <button onclick="toggleEssaySolution('${item.id}')" class="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5">
        <span>📖</span>
        <span id="btn-text-${item.id}">Xem Lời Giải & Barem Chấm Điểm</span>
      </button>

      <div id="essay-sol-${item.id}" class="hidden p-4 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-300/40 dark:border-emerald-800 text-xs sm:text-sm leading-relaxed animate-fade-in">
        ${item.solution}
      </div>
    </div>
  `).join("");
}

function toggleEssaySolution(id) {
  const solEl = document.getElementById(`essay-sol-${id}`);
  const btnText = document.getElementById(`btn-text-${id}`);
  if (!solEl) return;

  const isHidden = solEl.classList.toggle("hidden");
  if (btnText) {
    btnText.textContent = isHidden ? "Xem Lời Giải & Barem Chấm Điểm" : "Thu Gọn Lời Giải";
  }
  if (!isHidden) triggerKaTeX();
}

// ==========================================================================
// 5. CHẾ ĐỘ THI THỬ TÍNH GIỜ (TIMED EXAM MODE)
// ==========================================================================

function renderExamSetup(container) {
  container.innerHTML = `
    <div class="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-lg mx-auto space-y-4">
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center text-3xl mx-auto shadow-lg shadow-emerald-500/20">
        ⏱️
      </div>
      <h3 class="text-xl font-black text-slate-900 dark:text-slate-100">Đề Thi Thử Hóa Học 10 (15 Phút)</h3>
      <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        Hệ thống tự động trộn ngẫu nhiên 10 câu hỏi bao gồm đầy đủ trắc nghiệm 4 lựa chọn, đúng/sai và trả lời ngắn. Tự động chấm thang điểm 10 và lưu kết quả.
      </p>
      <button onclick="startTimedExam()" class="px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/30 hover:opacity-95 transition active:scale-95">
        Bắt Đầu Làm Bài Ngay
      </button>
    </div>
  `;
}

function startTimedExam() {
  // Trộn 10 câu ngẫu nhiên
  const shuffled = [...QUIZZES_DATA].sort(() => 0.5 - Math.random());
  examQuestions = shuffled.slice(0, 10);
  examUserAnswers = {};
  examTimeRemaining = 900;

  const container = document.getElementById("practice-questions-list");
  if (!container) return;

  container.innerHTML = `
    <div class="sticky top-20 z-30 p-4 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
        <span class="text-xs font-bold text-slate-300">Đang thi: 10 Câu</span>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-base font-mono font-black text-emerald-400" id="exam-timer-display">15:00</div>
        <button onclick="submitTimedExam()" class="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-md transition">
          Nộp Bài
        </button>
      </div>
    </div>

    <div class="space-y-6">
      ${examQuestions.map((q, idx) => `
        <div class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">${idx + 1}</span>
            <span class="text-xs font-bold text-slate-400">${q.chapter}</span>
          </div>
          <div class="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">${q.q}</div>

          ${q.type === 'mcq' ? `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              ${q.options.map((opt, oIdx) => `
                <label class="quiz-option cursor-pointer">
                  <input type="radio" name="exam_q_${q.id}" value="${oIdx}" onchange="recordExamAnswer('${q.id}', ${oIdx})" class="accent-emerald-500 w-4 h-4 mt-0.5 shrink-0" />
                  <span class="opt-badge">${String.fromCharCode(65 + oIdx)}</span>
                  <span class="opt-text">${opt}</span>
                </label>
              `).join('')}
            </div>
          ` : (q.type === 'sa' ? `
            <input type="text" placeholder="Nhập đáp số..." onchange="recordExamAnswer('${q.id}', this.value.trim())" 
              class="w-48 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-mono font-bold" />
          ` : `
            <div class="space-y-2 text-xs">
              ${q.subQuestions.map((sub, sIdx) => `
                <div class="p-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                  <span class="text-slate-800 dark:text-slate-200 font-medium">${sub.text}</span>
                  <div class="flex items-center gap-3 text-xs font-semibold">
                    <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="exam_q_${q.id}_${sIdx}" value="true" onchange="recordExamTfAnswer('${q.id}', ${sIdx}, true)" class="accent-emerald-500" /> Đúng</label>
                    <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="exam_q_${q.id}_${sIdx}" value="false" onchange="recordExamTfAnswer('${q.id}', ${sIdx}, false)" class="accent-rose-500" /> Sai</label>
                  </div>
                </div>
              `).join('')}
            </div>
          `)}
        </div>
      `).join('')}
    </div>
  `;

  triggerKaTeX();

  if (examTimerInterval) clearInterval(examTimerInterval);
  examTimerInterval = setInterval(() => {
    examTimeRemaining--;
    const mins = Math.floor(examTimeRemaining / 60);
    const secs = examTimeRemaining % 60;
    const display = document.getElementById("exam-timer-display");
    if (display) display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (examTimeRemaining <= 0) {
      clearInterval(examTimerInterval);
      submitTimedExam();
    }
  }, 1000);
}

function recordExamAnswer(qId, val) {
  examUserAnswers[qId] = val;
}

function recordExamTfAnswer(qId, subIdx, val) {
  if (!examUserAnswers[qId]) examUserAnswers[qId] = {};
  examUserAnswers[qId][subIdx] = val;
}

function submitTimedExam() {
  if (examTimerInterval) clearInterval(examTimerInterval);

  let correctCount = 0;
  examQuestions.forEach(q => {
    const userVal = examUserAnswers[q.id];
    if (q.type === "mcq" && userVal === q.answer) correctCount++;
    else if (q.type === "sa" && userVal && userVal.toLowerCase() === q.answer.toLowerCase()) correctCount++;
    else if (q.type === "tf" && userVal) {
      let allSubCorrect = true;
      q.subQuestions.forEach((sub, sIdx) => {
        if (userVal[sIdx] !== sub.answer) allSubCorrect = false;
      });
      if (allSubCorrect) correctCount++;
    }
  });

  const score = (correctCount / examQuestions.length) * 10;
  playSound("complete");
  if (score >= 8) launchConfetti();

  const container = document.getElementById("practice-questions-list");
  if (container) {
    container.innerHTML = `
      <div class="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl text-center max-w-lg mx-auto space-y-4 animate-fade-in">
        <div class="text-4xl">🏆</div>
        <h3 class="text-2xl font-black text-slate-900 dark:text-slate-100">KẾT QUẢ THI THỬ</h3>
        <div class="text-5xl font-black text-emerald-500 font-mono">${score.toFixed(1)} / 10</div>
        <p class="text-xs text-slate-500 dark:text-slate-400">Đúng <strong>${correctCount} / ${examQuestions.length}</strong> câu hỏi.</p>
        <div class="flex items-center justify-center gap-3 pt-2">
          <button onclick="startTimedExam()" class="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition">Thi Đề Khác</button>
          <button onclick="setPracticeMode('mcq')" class="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition">Trở Về Luyện Tập</button>
        </div>
      </div>
    `;
  }
}

// ==========================================================================
// 6. SỔ TAY CÂU SAI & THỐNG KÊ (MISTAKE NOTEBOOK)
// ==========================================================================

function recordMistake(q) {
  if (!mistakeQuestions.some(m => m.id === q.id)) {
    mistakeQuestions.push({ id: q.id, q: q.q, chapter: q.chapter, explanation: q.explanation || "Xem lại bài học liên quan" });
    localStorage.setItem("hoa10_mistakes", JSON.stringify(mistakeQuestions));
    renderMistakeStats();
  }
}

function clearMistakes() {
  mistakeQuestions = [];
  localStorage.removeItem("hoa10_mistakes");
  renderMistakeStats();
}

function renderMistakeStats() {
  const container = document.getElementById("mistakes-list-container");
  const countBadge = document.getElementById("mistakes-count-badge");
  if (countBadge) countBadge.textContent = mistakeQuestions.length;

  if (!container) return;
  if (mistakeQuestions.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-slate-400 text-xs">
        🎉 Tuyệt vời! Bạn chưa có câu hỏi nào cần ôn tập lại.
      </div>
    `;
    return;
  }

  container.innerHTML = mistakeQuestions.map(m => `
    <div class="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
      <div class="flex items-center justify-between">
        <span class="font-bold text-rose-500">${m.chapter}</span>
      </div>
      <p class="font-semibold text-slate-800 dark:text-slate-200">${m.q}</p>
      <p class="text-slate-500 text-[11px]">${m.explanation}</p>
    </div>
  `).join('');
}

// ==========================================================================
// 7. TAB CÔNG THỨC & BẢNG TRA CỨU (FORMULAS)
// ==========================================================================

function renderFormulasTab() {
  const container = document.getElementById("formulas-list-container");
  if (!container) return;

  container.innerHTML = FORMULAS_DATA.map(cat => `
    <div class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <h3 class="text-base font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
        <span>📌</span> ${cat.category}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        ${cat.items.map(item => `
          <div class="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <span class="font-bold text-slate-800 dark:text-slate-200">${item.name}</span>
            <div class="text-sm font-bold text-indigo-600 dark:text-indigo-400 py-1 overflow-x-auto">
              ${formatLatex(item.formula, true)}
            </div>
            <p class="text-slate-400 text-[11px] italic">${item.note}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// 8. TÌM KIẾM NHANH (LIVE SEARCH)
// ==========================================================================

function handleGlobalSearch(keyword) {
  if (!keyword || keyword.trim() === "") return;
  const kw = keyword.toLowerCase().trim();

  // Tìm trong nguyên tố
  const matchElem = ELEMENTS_DATA.find(e => e.nameVi.toLowerCase().includes(kw) || e.s.toLowerCase() === kw);
  if (matchElem) {
    switchTab("simulations");
    switchSimulationSubTab("periodic");
    selectElementByZ(matchElem.z);
    return;
  }

  // Tìm trong bài học
  const matchLesson = LESSONS_DATA.find(l => l.title.toLowerCase().includes(kw) || l.summary.toLowerCase().includes(kw));
  if (matchLesson) {
    switchTab("theory");
    selectLesson(matchLesson.id);
    return;
  }
}

// ==========================================================================
// 9. TIỆN ÍCH KATEX & PHÁO HOA (CONFETTI)
// ==========================================================================

// Hàm render công thức LaTeX tức thì thành HTML bằng KaTeX
function formatLatex(tex, isDisplay = true) {
  if (!tex) return "";
  let cleanTex = tex.trim();
  if (cleanTex.startsWith("$$") && cleanTex.endsWith("$$")) {
    cleanTex = cleanTex.slice(2, -2).trim();
  } else if (cleanTex.startsWith("$") && cleanTex.endsWith("$")) {
    cleanTex = cleanTex.slice(1, -1).trim();
  }

  if (window.katex && typeof window.katex.renderToString === "function") {
    try {
      return window.katex.renderToString(cleanTex, {
        displayMode: isDisplay,
        throwOnError: false
      });
    } catch (e) {
      console.warn("KaTeX render error:", e);
    }
  }
  return isDisplay ? `$$${cleanTex}$$` : `$${cleanTex}$`;
}

// Duyệt cây DOM và render các đoạn $...$ và $$...$$ còn lại trong văn bản
function walkAndRenderMath(root) {
  if (!window.katex || typeof window.katex.renderToString !== "function") return;
  
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        if (!node.nodeValue || !node.nodeValue.includes('$')) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toLowerCase();
        if (['script', 'style', 'textarea', 'code', 'pre'].includes(tag) || parent.closest('.katex')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    },
    false
  );

  const textNodes = [];
  let n;
  while ((n = walker.nextNode())) {
    textNodes.push(n);
  }

  textNodes.forEach(node => {
    const text = node.nodeValue;
    const regex = /(\$\$[\s\S]+?\$\$|\$(?!\$)[^$\n]+?\$)/g;
    if (!regex.test(text)) return;
    regex.lastIndex = 0;

    const span = document.createElement('span');
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        span.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
      }
      const raw = match[0];
      const isDisplay = raw.startsWith('$$');
      const formula = isDisplay ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();

      try {
        const mathEl = document.createElement('span');
        mathEl.innerHTML = window.katex.renderToString(formula, {
          displayMode: isDisplay,
          throwOnError: false
        });
        span.appendChild(mathEl);
      } catch (e) {
        span.appendChild(document.createTextNode(raw));
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      span.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    if (node.parentNode) {
      node.parentNode.replaceChild(span, node);
    }
  });
}

function triggerKaTeX(container) {
  const root = container || document.body;

  // 1. Thử dùng renderMathInElement chính thức nếu có
  if (typeof renderMathInElement === "function") {
    try {
      renderMathInElement(root, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"],
        throwOnError: false
      });
      return;
    } catch (err) {
      console.warn("renderMathInElement error, falling back to manual walker:", err);
    }
  }

  // 2. Fallback thủ công nếu renderMathInElement chưa sẵn sàng
  walkAndRenderMath(root);
}

function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  canvas.classList.remove("hidden");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    r: Math.random() * 5 + 3,
    color: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"][Math.floor(Math.random() * 5)],
    vx: (Math.random() - 0.5) * 6,
    vy: Math.random() * 4 + 2
  }));

  let frames = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
    });
    frames++;
    if (frames < 120) requestAnimationFrame(animate);
    else canvas.classList.add("hidden");
  }
  animate();
}

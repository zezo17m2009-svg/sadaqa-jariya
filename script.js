/* =========================
   السبحة
========================= */

const button = document.getElementById("tasbeehBtn");
const counter = document.getElementById("tasbeehCount");
const rounds = document.getElementById("roundCount");
const reset = document.getElementById("resetTasbeeh");
const dhikr = document.getElementById("dhikr");
const selected = document.getElementById("selectedDhikr");

let count = 0;
let round = 0;

button.addEventListener("click", function () {
  count++;
  counter.textContent = count;

  if (count % 33 === 0) {
    round++;
    rounds.textContent = round;
  }
});

reset.addEventListener("click", function () {
  count = 0;
  round = 0;

  counter.textContent = 0;
  rounds.textContent = 0;
});

dhikr.addEventListener("change", function () {
  selected.textContent = dhikr.value;
});


/* =========================
   الختمة المشتركة
========================= */

const juzGrid = document.getElementById("juzGrid");
const juzCount = document.getElementById("juzCount");
const progress = document.getElementById("progress");
const khatmaMessage = document.getElementById("khatmaMessage");

let selectedJuz = [];

function updateKhatma() {

  juzCount.textContent = selectedJuz.length;

  progress.style.width =
    (selectedJuz.length / 30 * 100) + "%";

  if (selectedJuz.length === 0) {

    khatmaMessage.textContent =
      "لم يتم اختيار أي جزء حتى الآن";

  } else if (selectedJuz.length === 30) {

    khatmaMessage.textContent =
      "ما شاء الله، اكتملت الختمة 🤲";

  } else {

    khatmaMessage.textContent =
      "تم اختيار " + selectedJuz.length + " جزء من 30 🤲";
  }
}


for (let i = 1; i <= 30; i++) {

  const juz = document.createElement("button");

  juz.type = "button";
  juz.className = "juz";

  juz.innerHTML = `
    <strong>الجزء ${i}</strong>
    <small>اضغط للاختيار</small>
  `;

  juz.addEventListener("click", function () {

    if (selectedJuz.includes(i)) {

      selectedJuz =
        selectedJuz.filter(number => number !== i);

      juz.classList.remove("selected");

      juz.querySelector("small").textContent =
        "اضغط للاختيار";

    } else {

      selectedJuz.push(i);

      juz.classList.add("selected");

      juz.querySelector("small").textContent =
        "تمت القراءة ✓";
    }

    updateKhatma();

  });

  juzGrid.appendChild(juz);
}

updateKhatma();


/* =========================
   الأدعية
========================= */

const duaButtons =
  document.querySelectorAll(".read-dua");

duaButtons.forEach(function (btn) {

  btn.addEventListener("click", function () {

    btn.classList.toggle("done");

    if (btn.classList.contains("done")) {

      btn.textContent = "تمت القراءة ✓";

    } else {

      btn.textContent = "تمت القراءة ✓";

    }

  });

});
/* =========================
   مشاركة الصفحة
========================= */

const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {

  shareBtn.addEventListener("click", async function () {

    const shareData = {
      title: "صدقة جارية للمرحوم أحمد عباده شاور",
      text: "رحم الله أحمد عباده شاور، ادعُ له بالرحمة والمغفرة 🤲",
      url: window.location.href
    };

    /* لو الموبايل يدعم المشاركة */

    if (navigator.share) {

      try {
        await navigator.share(shareData);
      } catch (error) {
        // المستخدم قفل نافذة المشاركة
      }

    } else {

      /* لو المشاركة غير متاحة: نسخ الرابط */

      try {

        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("تم نسخ رابط الصفحة ✓");

      } catch (error) {

        alert("انسخ رابط الصفحة من المتصفح");

      }

    }

  });

}
/* =========================
   مشغل القرآن
========================= */

const openQuran = document.getElementById("openQuran");
const closeQuran = document.getElementById("closeQuran");
const quranPlayer = document.getElementById("quranPlayer");

const reciter = document.getElementById("reciter");
const surah = document.getElementById("surah");
const quranAudio = document.getElementById("quranAudio");
const playQuran = document.getElementById("playQuran");


/* فتح المشغل */

if (openQuran && quranPlayer) {

  openQuran.addEventListener("click", function () {

    quranPlayer.classList.add("open");

  });

}


/* إغلاق المشغل */

if (closeQuran && quranPlayer) {

  closeQuran.addEventListener("click", function () {

    quranPlayer.classList.remove("open");

    if (quranAudio) {
      quranAudio.pause();
    }

  });

}


/* اختيار ملف التلاوة */

function getQuranURL() {

  const number = surah.value.padStart(3, "0");

  if (reciter.value === "maher") {

    return "https://server12.mp3quran.net/maher/" + number + ".mp3";

  }

  if (reciter.value === "basit") {

    return "https://server7.mp3quran.net/basit/" + number + ".mp3";

  }

}


/* تحميل التلاوة */

function loadQuran() {

  if (!quranAudio) return;

  quranAudio.src = getQuranURL();

  quranAudio.load();

}


/* تغيير القارئ */

if (reciter) {

  reciter.addEventListener("change", function () {

    loadQuran();

  });

}


/* تغيير السورة */

if (surah) {

  surah.addEventListener("change", function () {

    loadQuran();

  });

}


/* تشغيل وإيقاف */

if (playQuran && quranAudio) {

  playQuran.addEventListener("click", function () {

    if (quranAudio.paused) {

      quranAudio.play()
        .then(function () {

          playQuran.textContent = "⏸ إيقاف التلاوة";

        })
        .catch(function () {

          alert("اضغط زر ▶ الموجود في مشغل الصوت");

        });

    } else {

      quranAudio.pause();

    }

  });

}


/* تحديث زر التشغيل */

if (quranAudio) {

  quranAudio.addEventListener("play", function () {

    if (playQuran) {
      playQuran.textContent = "⏸ إيقاف التلاوة";
    }

  });


  quranAudio.addEventListener("pause", function () {

    if (playQuran) {
      playQuran.textContent = "▶ تشغيل التلاوة";
    }

  });

}


/* تحميل سورة الملك افتراضيًا */

loadQuran();

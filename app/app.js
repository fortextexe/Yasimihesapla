const daySelect = document.getElementById("day")
const monthSelect = document.getElementById("month")
const yearSelect = document.getElementById("year")
const resultDiv = document.getElementById("result")
const currentYearMonthSpan = document.getElementById("currentYearMonth")
let intervalId

const currentDate = new Date()
const year = currentDate.getFullYear()
const monthNames = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
]
const currentMonth = monthNames[currentDate.getMonth()]

currentYearMonthSpan.textContent = `${year} ${currentMonth}`

function populateSelects() {
  const currentYear = new Date().getFullYear()
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ]

  for (let i = 1; i <= 31; i++) {
    daySelect.innerHTML += `<option value="${i}">${i}</option>`
  }

  months.forEach((month, index) => {
    monthSelect.innerHTML += `<option value="${index + 1}">${month}</option>`
  })

  for (let i = currentYear; i >= 1900; i--) {
    yearSelect.innerHTML += `<option value="${i}">${i}</option>`
  }
}

function calculateTotalDays(birthDate) {
  const now = new Date()
  const diffTime = Math.abs(now - birthDate)
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

function getZodiacSign(day, month) {
  const signs = [
    { name: "Kova", icon: "fa-solid fa-water", start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
    { name: "Balık", icon: "fa-solid fa-fish", start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
    { name: "Koç", icon: "fa-solid fa-horse-head", start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
    { name: "Boğa", icon: "fa-solid fa-bullseye", start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
    { name: "İkizler", icon: "fa-solid fa-user-friends", start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
    { name: "Yengeç", icon: "fa-solid fa-moon", start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
    { name: "Aslan", icon: "fa-solid fa-crown", start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
    { name: "Başak", icon: "fa-solid fa-seedling", start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
    { name: "Terazi", icon: "fa-solid fa-balance-scale", start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
    { name: "Akrep", icon: "fa-solid fa-spider", start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
    { name: "Yay", icon: "fa-solid fa-y", start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
    { name: "Oğlak", icon: "fa-solid fa-mountain", start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
  ]

  for (const sign of signs) {
    if (
      (month === sign.start.month && day >= sign.start.day) ||
      (month === sign.end.month && day <= sign.end.day) ||
      (sign.start.month > sign.end.month &&
        ((month >= sign.start.month && day >= sign.start.day) || (month <= sign.end.month && day <= sign.end.day)))
    ) {
      return sign
    }
  }
  return null
}

function calculateAge() {
  clearInterval(intervalId)

  const day = Number.parseInt(daySelect.value)
  const month = Number.parseInt(monthSelect.value) - 1
  const year = Number.parseInt(yearSelect.value)

  const birthDate = new Date(year, month, day)
  const zodiacSign = getZodiacSign(day, month + 1)

  function updateAge() {
    const now = new Date()
    const diffTime = Math.abs(now - birthDate)
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44))
    const diffWeeks = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7))
    const diffDays = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
    const totalDays = calculateTotalDays(birthDate)

    resultDiv.innerHTML = `
            <div class="result-item"><i class="fas fa-birthday-cake icon"></i><span class="result-text">Yıl: <span class="result-value">${diffYears}</span></span></div>
            <div class="result-item"><i class="fas fa-calendar-alt icon"></i><span class="result-text">Ay: <span class="result-value">${diffMonths}</span></span></div>
            <div class="result-item"><i class="fas fa-calendar-week icon"></i><span class="result-text">Hafta: <span class="result-value">${diffWeeks}</span></span></div>
            <div class="result-item"><i class="fas fa-calendar-day icon"></i><span class="result-text">Gün: <span class="result-value">${diffDays}</span></span></div>
            <div class="result-item"><i class="fas fa-clock icon"></i><span class="result-text">Saat: <span class="result-value">${diffHours}</span></span></div>
            <div class="result-item"><i class="fas fa-stopwatch icon"></i><span class="result-text">Dakika: <span class="result-value">${diffMinutes}</span></span></div>
            <div class="result-item"><i class="fas fa-calendar-check icon"></i><span class="result-text">Toplam yaşadığınız gün: <span class="result-value">${totalDays}</span></span></div>
            <div class="result-item"><i class="${zodiacSign.icon} icon"></i><span class="result-text">Burcunuz: <span class="result-value">${zodiacSign.name}</span></span></div>
            <div class="result-item">
                <i class="fas fa-star icon"></i>
                <span class="result-text">Sonuç: 
                    <span class="result-value">
                        ${diffYears} yaşındasın. İlerideki yaşın ${diffYears + 1}. Şimdiden doğum günün kutlu olsun :)
                    </span>
                </span>
            </div>
        `

    resultDiv.classList.add("show")
  }

  updateAge()
  intervalId = setInterval(updateAge, 60000)
}

function isWinter() {
  const date = new Date()
  const month = date.getMonth() + 1
  return month === 12 || month === 1 || month === 2
}

function initSnowEffect() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  const snowDiv = document.createElement("div")
  snowDiv.style.position = "fixed"
  snowDiv.style.top = "0"
  snowDiv.style.left = "0"
  snowDiv.style.width = "100%"
  snowDiv.style.height = "100%"
  snowDiv.style.pointerEvents = "none"
  snowDiv.style.zIndex = "1000"
  document.body.appendChild(snowDiv)
  snowDiv.appendChild(renderer.domElement)

  const snowflakes = []
  const maxFlakes = 200

  const geometry = new THREE.SphereGeometry(0.2, 8, 8)
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
  })

  function createSnowflakes() {
    for (let i = 0; i < maxFlakes; i++) {
      const snowflake = new THREE.Mesh(geometry, material)
      snowflake.position.set(Math.random() * 400 - 200, Math.random() * 400 - 200, Math.random() * 400 - 200)
      snowflake.speed = Math.random() * 0.1 + 0.05
      snowflakes.push(snowflake)
      scene.add(snowflake)
    }
  }

  function animate() {
    requestAnimationFrame(animate)

    camera.position.z = 5

    snowflakes.forEach((snowflake) => {
      snowflake.position.y -= snowflake.speed

      if (snowflake.position.y < -200) {
        snowflake.position.y = 200
      }
    })

    renderer.render(scene, camera)
  }

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })

  createSnowflakes()
  animate()
}

window.onload = () => {
  populateSelects()
  document.querySelector("button").classList.add("pulse")

  if (isWinter()) {
    initSnowEffect()
  } else {
    console.log("Şu anda kış mevsiminde değiliz, kar efekti devre dışı bırakıldı.")
  }
}


# ✅ Verification Checklist - Cara Cek Semua Berfungsi
## Lapak Bang Ade - Marketing Psychology Components

**Gunakan checklist ini untuk memastikan semua komponen berjalan dengan baik!**

---

## 🚀 Quick Start - 5 Menit Test

### 1. **Buka Landing Page**
```
http://localhost:5173
atau
https://lapakbangade.com
```

**Harus terlihat:**
- ✅ Hero section dengan calculator
- ✅ Badge "Admin Online • 15 Menit" (hijau dengan pulsing dot)
- ✅ Real-time proof badge di bawahnya (berganti setiap 5 detik)
- ✅ Rate volatility alert (jika rate berubah)
- ✅ Social proof ticker scrolling horizontal
- ✅ Fee section dengan "Just $4.97"
- ✅ Friday countdown (jika hari Jumat)

**Screenshot untuk referensi:**
```
Buka browser → Klik kanan → Inspect → Console
Ketik: document.querySelectorAll('[class*="bg-green-50"]')
Harus ada beberapa element hijau (badges)
```

---

## 📱 Test Per Komponen

### Sprint 1: Quick Wins

#### ✅ **Test 1: Charm Pricing**

**Langkah:**
1. Scroll ke section "Biaya Convert (Fee)"
2. Lihat di card "Nominal Besar"

**Harus terlihat:**
```
Nominal Besar
Convert >= $50
[Just $4.97]  ← HARUS INI (bukan "Flat $5")
```

**Jika gagal:**
- Cek file: `build/constants.ts` line 35
- Cek file: `build/components/FeeSection.tsx` line 66

---

#### ✅ **Test 2: Bank Dropdown**

**Langkah:**
1. Login ke dashboard (atau buat transaksi baru)
2. Klik "Transaksi Baru" atau "Convert"
3. Isi nominal USD
4. Klik "Lanjut" sampai step "Details"
5. Lihat field "Bank / E-Wallet"

**Harus terlihat:**
- Dropdown (bukan text input)
- Ada section "Bank" dengan: BCA, Mandiri, BNI, BRI, BSI
- Ada section "E-Wallet" dengan: DANA, OVO, GoPay, ShopeePay, LinkAja

**Test:**
```
Klik dropdown → Harus muncul list
Tidak bisa ketik bebas → Hanya bisa pilih dari list
```

**Jika gagal:**
- Cek file: `build/components/TransactionWizard.tsx` line 241-268
- Pastikan ada `<select>` bukan `<input type="text">`

---

#### ✅ **Test 3: Friday Countdown**

**Langkah:**
1. Scroll ke section "Biaya Convert"
2. Lihat card "Promo Jumat Spesial" (warna ungu/brand)
3. Lihat badge di bawah judul

**Jika hari Jumat:**
```
Badge harus tampil: "Berakhir dalam 04:32:15" (countdown real-time)
Tunggu 5 detik → Angka harus berkurang
```

**Jika BUKAN hari Jumat:**
```
Badge harus tampil: "Promo berikutnya: X hari Y jam"
```

**Force test (change date):**
```javascript
// Buka Console browser
localStorage.clear()
// Refresh page
// Lihat countdown
```

**Jika gagal:**
- Cek file: `build/components/FeeSection.tsx`
- Pastikan ada `useEffect` untuk countdown
- Cek browser console untuk errors

---

### Sprint 2: Medium Impact

#### ✅ **Test 4: Real-Time Proof**

**Langkah:**
1. Buka landing page
2. Scroll ke Hero section
3. Lihat di bawah badge "Admin Online"

**Harus terlihat:**
```
Badge hijau dengan pulsing dot + icon + message
Message berganti setiap 5 detik:
- "3 pengguna convert $50+ dalam 1 jam terakhir"
- "12 transaksi selesai hari ini"
- "5 pengguna baru bergabung minggu ini"
- "Rate terakhir diupdate 15 menit lalu"
```

**Test:**
```
Tunggu 5 detik → Message harus berubah
Tunggu 20 detik → Harus cycle semua 4 message
```

**Check via Console:**
```javascript
// Buka Console
document.querySelector('[data-testid="realtime-proof"]')
// atau
document.querySelectorAll('span').forEach(el => {
  if(el.textContent.includes('pengguna')) console.log('✅ Found:', el.textContent)
})
```

**Jika gagal:**
- Cek file: `build/components/RealtimeProof.tsx`
- Cek file: `build/components/Hero.tsx` (pastikan imported)
- Cek console untuk errors

---

#### ✅ **Test 5: Milestone Badges**

**Langkah:**
1. Login ke dashboard
2. Scroll ke section "Achievements"

**Harus terlihat:**
```
Header: "Achievements"
Subtitle: "X dari 6 badges terbuka"
Grid 2x3 dengan 6 badges:
- First Step (blue)
- Power User (yellow)
- $100 Milestone (green)
- Veteran Trader (purple)
- $500 Champion (indigo)
- Elite Member (pink)
```

**Test Locked Badge:**
```
Badge yang belum unlock:
- Grayscale (opacity 60%)
- Progress bar di bawah
- Text: "X / Y" (e.g., "3 / 5")
```

**Test Unlocked Badge:**
```
Badge yang sudah unlock:
- Full color
- Checkmark ✓ di pojok kanan atas
- Tidak ada progress bar
```

**Check via Console:**
```javascript
// Buka Console
document.querySelectorAll('[class*="badge"]').length
// Harus return minimal 6
```

**Test dengan data:**
```javascript
// Simulate 5 completed transactions
// Edit localStorage (advanced)
// Atau gunakan real transactions
```

**Jika gagal:**
- Cek file: `build/components/MilestoneBadges.tsx`
- Cek file: `build/components/Dashboard.tsx` (pastikan imported)
- Cek props: completedCount, totalVolume

---

#### ✅ **Test 6: Goal Progress Bars**

**Langkah:**
1. Login ke dashboard
2. Scroll ke section "Target & Progress"

**Harus terlihat:**
```
3 goal cards:
1. Transaksi Bulanan (target 10)
2. Volume Bulanan (target $500)
3. Target Mingguan (target 3)

Setiap card punya:
- Progress bar dengan shimmer animation
- Percentage (X%)
- Current / Target (e.g., "5 / 10 transaksi")
```

**Test Progress:**
```
Jika 5 completed transactions:
- Transaksi Bulanan: 50%
- Progress bar: setengah penuh
- Text: "5 / 10 transaksi"
```

**Test Motivational Text:**
```
Jika progress > 50%:
Harus muncul: "💪 Hampir sampai! Tinggal X lagi"
```

**Test Completed Goal:**
```
Jika >= target:
- Badge hijau: "✓ Selesai"
- Progress bar: 100% (full)
```

**Check via Console:**
```javascript
// Count progress bars
document.querySelectorAll('[role="progressbar"]').length
// Harus 3 atau lebih
```

**Jika gagal:**
- Cek file: `build/components/GoalProgress.tsx`
- Cek props dari Dashboard
- Cek console untuk calculation errors

---

#### ✅ **Test 7: Social Proof Ticker**

**Langkah:**
1. Buka landing page
2. Scroll ke bawah Hero section

**Harus terlihat:**
```
Full-width bar dengan gradient (brand → blue)
Scrolling horizontal otomatis
Events: "User dari Jakarta • $100 • 5 menit lalu"
```

**Test:**
```
Tunggu 5 detik → Harus scroll otomatis
Hover mouse → Scrolling pause (desktop only)
Lepas hover → Scrolling lanjut
```

**Test Infinite Loop:**
```
Tunggu sampai event terakhir
Harus seamless loop (tidak patah-patah)
```

**Check via Console:**
```javascript
// Lihat animation
document.querySelector('[class*="animate-marquee"]')
```

**Jika gagal:**
- Cek file: `build/components/SocialProofTicker.tsx`
- Cek file: `build/components/LandingPage.tsx` (posisi setelah Hero)
- Cek CSS animation di component

---

### Sprint 3: Advanced Features

#### ✅ **Test 8: Status Tier System**

**Langkah:**
1. Login ke dashboard
2. Scroll ke bagian atas (setelah greeting)

**Harus terlihat:**
```
Card dengan gradient header
Header color sesuai tier:
- Bronze: Amber/orange gradient
- Silver: Gray gradient
- Gold: Yellow gradient
- Platinum: Purple gradient

Info yang tampil:
- "Status Anda: [Tier Name]"
- Tier icon (🌟 Bronze, ⚡ Silver, 📈 Gold, 👑 Platinum)
- Benefits list dengan checkmarks
- Progress bars (jika belum max tier)
```

**Test New User (Bronze):**
```
Tier: Bronze
Progress: Shows 0/5 transactions, $0/$250
Next tier: Silver
Benefits: 3 items dengan checkmark
```

**Test Progress Calculation:**
```
User dengan 3 transactions, $150:
- Transaction progress: 60% (3/5)
- Volume progress: 60% ($150/$250)
- Overall: 60%
```

**Check via Console:**
```javascript
// Check tier data
localStorage.getItem('user_tier') // Atau dari props
```

**Jika gagal:**
- Cek file: `build/components/StatusTier.tsx`
- Cek calculation logic di component
- Verify props dari Dashboard

---

#### ✅ **Test 9: Pending Transaction Urgency**

**Langkah:**
1. Login ke dashboard
2. Buat 1 pending transaction (atau lihat existing)
3. Component harus muncul di dashboard

**Harus terlihat:**
```
Card dengan border kuning
Header: "Transaksi Pending"
"X transaksi menunggu penyelesaian"

Setiap pending transaction card:
- Urgency badge (Baru/Pending/Urgent!)
- Color: Blue → Yellow → Red (berdasarkan waktu)
- Circular progress indicator
- Time elapsed: "2 jam yang lalu"
- CTA button: "Chat Admin" atau "Follow Up Sekarang"
```

**Test Urgency Levels:**
```
< 6 hours: Blue, badge "Baru"
6-24 hours: Yellow, badge "Pending"
> 24 hours: Red, badge "Urgent!", pulsing alert
```

**Test Circular Progress:**
```
Harus ada SVG circle
Progress meningkat seiring waktu
Capped at 95%
```

**Simulate pending:**
```javascript
// Create mock pending transaction
// Lihat di Dashboard props
```

**Jika tidak muncul:**
- Pastikan ada pending transactions (pendingCount > 0)
- Cek file: `build/components/PendingTransactionUrgency.tsx`
- Cek conditional rendering di Dashboard

**Jika gagal:**
- Cek time calculation logic
- Verify urgency level logic
- Check console errors

---

#### ✅ **Test 10: Referral Program**

**Langkah:**
1. Login ke dashboard
2. Scroll ke section "Referral Program"

**Harus terlihat:**
```
Card dengan gradient ungu
Header: "Referral Program"
Kode referral: "LBA-XXXXXXXX" (8 characters)
Button "Copy"
Stats grid:
- Total Referrals
- Converted
- Earned

Share buttons:
- WhatsApp (green)
- Facebook (blue)
- Twitter (sky blue)
```

**Test Copy Button:**
```
1. Klik "Copy"
2. Button text berubah: "Copy" → "Copied!"
3. Paste di text editor
4. Harus dapat full link: "https://lapakbangade.com/?ref=LBA-XXXXXXXX"
```

**Test Share Buttons:**
```
WhatsApp: Opens wa.me dengan pre-filled message
Facebook: Opens Facebook share dialog
Twitter: Opens Twitter compose with pre-filled tweet
```

**Check via Console:**
```javascript
// Get referral code
document.querySelector('code').textContent
// Harus format: LBA-XXXXXXXX
```

**Jika gagal:**
- Cek file: `build/components/ReferralProgram.tsx`
- Verify userId props
- Check share URL encoding

---

#### ✅ **Test 11: Rate Volatility Alert**

**Langkah:**
1. Buka landing page (fresh/clear localStorage)
2. Note current rate
3. Refresh page (no alert - first visit)
4. Manually change rate (simulate)

**Simulate Rate Change:**
```javascript
// Buka Console
localStorage.setItem('lapakbangade_previous_rate', '15450')
// Refresh page
// Jika current rate berbeda > 0.5%, alert harus muncul
```

**Rate Naik (Red Alert):**
```
Previous: 15,450
Current: 15,500
Alert: Red/Orange gradient
Title: "Rate Naik! 📈"
Message: "Rate naik Rp 50 dari kemarin (+0.32%)"
Recommendation: "Tunggu rate turun"
```

**Rate Turun (Green Alert):**
```
Previous: 15,500
Current: 15,425
Alert: Green gradient
Title: "Rate Turun! 💰"
Message: "Rate turun Rp 75 dari kemarin (-0.48%)"
Button: "Lock Rate Sekarang" (links to #calculator)
```

**Test Dismissible:**
```
Klik X button → Alert disappears
Refresh → Alert tidak muncul lagi (same session)
```

**Check via Console:**
```javascript
localStorage.getItem('lapakbangade_previous_rate')
// Harus return number string
```

**Jika gagal:**
- Cek file: `build/components/RateVolatilityAlert.tsx`
- Verify threshold (0.5%)
- Check localStorage access

---

#### ✅ **Test 12: Saved Drafts**

**Langkah:**
1. Login ke dashboard
2. Klik "Transaksi Baru"
3. Isi amount: $75
4. Isi some details
5. Close modal (jangan complete)
6. Refresh dashboard

**Harus terlihat:**
```
Section "Draft Transaksi"
"X transaksi belum selesai"

Draft card:
- Type icon (Convert/Top-up)
- Amount: $75 USD
- Time ago: "2 menit yang lalu"
- Bank/wallet (jika diisi)
- Progress indicator mini
- Button "Lanjutkan"
- Button delete (trash icon)
```

**Test Resume:**
```
Klik "Lanjutkan"
→ TransactionWizard opens
→ Pre-filled dengan draft data
```

**Test Delete:**
```
Klik trash icon
→ Draft hilang dari list
```

**Test Limit:**
```
Create 6 drafts
→ Hanya 5 terbaru yang tampil
```

**Check via Console:**
```javascript
JSON.parse(localStorage.getItem('lapakbangade_drafts'))
// Harus return array of drafts
```

**Jika gagal:**
- Cek file: `build/components/SavedDrafts.tsx`
- Verify localStorage read/write
- Check draft save function

---

### Additional Features

#### ✅ **Test 13: Exit-Intent Popup**

**Langkah:**
1. Buka landing page (fresh session)
2. Tunggu 5 detik
3. Gerakkan mouse ke **atas** (menuju browser tab/close button)
4. Mouse harus keluar dari viewport (clientY <= 10)

**Harus terlihat:**
```
Modal popup muncul:
- Backdrop blur hitam
- Card putih di center
- Gradient header (red-orange)
- Icon gift 🎁
- Title: "Tunggu Dulu! 🎁"
- Offer: "+10% BONUS"
- Contoh: "$100 + $10 bonus = $110 IDR"
- Urgency: Clock icon dengan "SEKARANG"
- 3 buttons:
  1. "Klaim Bonus 10% Sekarang" (orange, large)
  2. "Chat Admin untuk Info" (gray)
  3. "Tidak, terima kasih" (text only)
```

**Test Trigger:**
```
Harus trigger hanya SEKALI per session
Jika sudah muncul, tidak muncul lagi (session storage)
```

**Test Buttons:**
```
Button 1: Navigate to /#calculator?promo=EXIT10
Button 2: Open Messenger in new tab
Button 3: Close popup
X button: Close popup
```

**Force test:**
```javascript
// Clear session
sessionStorage.clear()
// Refresh
// Move mouse to top
```

**Check via Console:**
```javascript
sessionStorage.getItem('exit_intent_shown')
// Null = belum shown
// 'true' = sudah shown
```

**Jika tidak muncul:**
- Tunggu 5 detik dulu (delay protection)
- Mouse HARUS ke atas (clientY <= 10)
- Check session storage

**Jika gagal:**
- Cek file: `build/components/ExitIntentPopup.tsx`
- Cek file: `build/components/LandingPage.tsx` (import)
- Verify mouseleave event listener

---

#### ✅ **Test 14: Streak Counter**

**Langkah:**
1. Login ke dashboard (first time)
2. Scroll ke section tier/streak

**Harus terlihat:**
```
Card dengan gradient orange-red
Header: "Streak Counter"
Level badge: "Starting Level 🌱"
Large number: "1" (hari)
Progress bar to 7 days
Stats grid:
- Total Hari: 1
- Longest: 1
- Consistency: 100%
Milestone rewards:
- 7 hari: Bonus rate +0.5% (locked)
- 14 hari: Priority support (locked)
- 30 hari: VIP tier upgrade (locked)
```

**Test Day 2:**
```
Kembali besok (24 jam later)
Streak harus jadi: 2
Level: Building ⚡
Progress: 2/7
```

**Test Broken Streak:**
```
Skip 2+ hari
Streak reset to: 1
Longest tetap: [previous max]
```

**Force test (simulate):**
```javascript
// Clear streak
localStorage.removeItem('streak_[userId]')
// Or manually edit
const streak = {
  currentStreak: 7,
  longestStreak: 10,
  lastVisit: new Date().toDateString(),
  totalDays: 15
}
localStorage.setItem('streak_[userId]', JSON.stringify(streak))
// Refresh
```

**Check via Console:**
```javascript
// Get streak data
const userId = 'test' // Or real userId
JSON.parse(localStorage.getItem(`streak_${userId}`))
```

**Jika gagal:**
- Cek file: `build/components/StreakCounter.tsx`
- Verify date calculation logic
- Check localStorage key format

---

#### ✅ **Test 15: Referral Leaderboard**

**Langkah:**
1. Login ke dashboard
2. Scroll ke referral section

**Harus terlihat:**
```
Card dengan header gradient (purple-pink)
Title: "Referral Leaderboard"
Prize pool banner:
- 🥇 1st: $100
- 🥈 2nd: $50
- 🥉 3rd: $25

Leaderboard list (10 entries):
Rank 1-3 dengan special styling:
- Gold background untuk rank 1
- Silver background untuk rank 2
- Bronze background untuk rank 3
- Trophy icons animated (wiggle)

Each entry shows:
- Rank icon/number
- Avatar
- Name
- Tier badge
- Referral count
- Earnings
```

**Test Animation:**
```
Top 3 trophies harus wiggle animation
Hover tidak pause (ini bukan ticker)
```

**Test Gradient:**
```
Rank 1: Yellow/orange gradient background
Rank 2: Gray background
Rank 3: Orange background
Rank 4-10: White background
```

**Check via Console:**
```javascript
// Count leaderboard entries
document.querySelectorAll('[class*="leaderboard"]').length
// Atau lihat visual
```

**Jika gagal:**
- Cek file: `build/components/ReferralLeaderboard.tsx`
- Cek file: `build/components/Dashboard.tsx` (import & placement)
- Verify mock data renders

---

## 🔍 Browser DevTools - Advanced Testing

### Check Analytics Events

**Langkah:**
1. Buka DevTools (F12)
2. Go to **Network** tab
3. Filter: `google-analytics.com` atau `facebook.net`
4. Interact dengan component (klik CTA, unlock badge, etc.)
5. Lihat network requests

**Events yang harus fire:**

```javascript
// Page View
gtag('event', 'page_view')

// CTA Clicks
trackEvent('cta_hero_click', { amount, mode, rate })
trackEvent('cta_footer_click')

// Badge Unlocks
trackEvent('badge_unlocked', { badge_id, badge_name })

// Tier Upgrades
trackEvent('tier_upgraded', { from_tier, to_tier })

// Referral Actions
trackEvent('referral_share', { platform })
trackEvent('referral_code_copied')

// Exit Intent
trackEvent('exit_intent_triggered')
trackEvent('exit_intent_accepted')
```

**Check via Console:**
```javascript
// Monitor all events
window.dataLayer = window.dataLayer || []
console.log(window.dataLayer)
// Harus ada array of events
```

---

### Check localStorage Data

**Open Console:**
```javascript
// 1. Rate History
localStorage.getItem('lapakbangade_previous_rate')
// Expected: "15450" (number as string)

// 2. Drafts
JSON.parse(localStorage.getItem('lapakbangade_drafts'))
// Expected: Array of draft objects

// 3. Streak (replace 'userId' with actual)
JSON.parse(localStorage.getItem('streak_userId'))
// Expected: { currentStreak, longestStreak, lastVisit, totalDays }

// 4. Session flags
sessionStorage.getItem('exit_intent_shown')
// Expected: 'true' or null
```

---

### Check Component Rendering

**Console Commands:**
```javascript
// 1. Count all custom components
document.querySelectorAll('[class*="rounded-xl"]').length
// Harus banyak (20+)

// 2. Find specific components
document.querySelector('[class*="gradient"]')
// Harus ada tier/streak/ticker

// 3. Check animations
document.querySelector('[class*="animate-"]')
// Harus ada pulse/spin/marquee

// 4. Verify badges
document.querySelectorAll('span:contains("✓")').length
// Check unlocked items
```

---

## 📊 Performance Checks

### Page Load Speed

**Tools:**
- Chrome DevTools → Lighthouse
- https://pagespeed.web.dev/

**Target Metrics:**
```
✅ First Contentful Paint: < 1.5s
✅ Largest Contentful Paint: < 2.5s
✅ Time to Interactive: < 3.5s
✅ Cumulative Layout Shift: < 0.1
```

**Run Test:**
1. Open DevTools
2. Lighthouse tab
3. Generate report
4. Check scores

---

### Animation Smoothness

**Visual Test:**
```
✅ Progress bars: Smooth fill (no jank)
✅ Shimmer effects: Continuous flow
✅ Ticker: Smooth scroll (no stutter)
✅ Badges: Smooth fade in/out
✅ Popups: Smooth scale animation
```

**Check FPS:**
```
DevTools → Performance → Record
Interact with components
Stop recording
Check FPS graph (should be 60 FPS)
```

---

## 🐛 Common Issues & Fixes

### Issue 1: Component Tidak Muncul

**Debug Steps:**
```javascript
// 1. Check import
import { ComponentName } from './ComponentName'

// 2. Check component usage
<ComponentName props={...} />

// 3. Check console errors
// Press F12 → Console tab
// Look for red errors

// 4. Check props
console.log(props)
```

**Common Causes:**
- Import statement missing
- Component not added to parent
- Props undefined
- Conditional rendering (component hidden by condition)

---

### Issue 2: Analytics Tidak Fire

**Debug Steps:**
```javascript
// 1. Check GA/Pixel loaded
window.gtag // Should be function
window.fbq // Should be function

// 2. Check tracking calls
// Add console.log in trackEvent function

// 3. Monitor dataLayer
window.dataLayer.forEach(e => console.log(e))

// 4. Use GA DebugView (in GA4 dashboard)
```

---

### Issue 3: localStorage Tidak Save

**Debug Steps:**
```javascript
// 1. Check quota
if (typeof(Storage) !== "undefined") {
  console.log("✅ localStorage supported")
} else {
  console.log("❌ localStorage NOT supported")
}

// 2. Check privacy mode
// localStorage disabled in incognito/private

// 3. Manually test
localStorage.setItem('test', 'value')
localStorage.getItem('test') // Should return 'value'

// 4. Check errors
// Try-catch around localStorage calls
```

---

### Issue 4: Animations Patah-Patah

**Fixes:**
```css
/* Add to component */
.smooth-animation {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

**Or use:**
```javascript
// Reduce animation complexity
// Lower frame rate for non-critical animations
// Use CSS transforms instead of position changes
```

---

## ✅ Final Checklist - Semua Harus ✓

### Landing Page:
- [ ] Charm pricing tampil ($4.97)
- [ ] Real-time proof berputar setiap 5 detik
- [ ] Rate volatility alert (jika ada perubahan)
- [ ] Social ticker scrolling smooth
- [ ] Friday countdown (jika Jumat)
- [ ] Exit-intent popup trigger (mouse to top)

### Dashboard:
- [ ] Status tier card dengan gradient
- [ ] Streak counter dengan fire emoji
- [ ] Pending transaction urgency (jika ada pending)
- [ ] Goal progress bars (3 goals)
- [ ] Milestone badges (6 badges)
- [ ] Saved drafts (jika ada drafts)
- [ ] Referral program dengan code
- [ ] Referral leaderboard dengan top 10

### Transaction Wizard:
- [ ] Bank dropdown (bukan text input)
- [ ] All banks & e-wallets listed
- [ ] Required validation works

### Analytics:
- [ ] Page views tracked
- [ ] CTA clicks tracked
- [ ] Badge unlocks tracked
- [ ] Tier upgrades tracked
- [ ] Referral shares tracked

### Performance:
- [ ] Page load < 3s
- [ ] Animations smooth (60 FPS)
- [ ] No console errors
- [ ] Mobile responsive

---

## 📞 Quick Support Commands

### Clear All Data (Reset Test)
```javascript
// Buka Console
localStorage.clear()
sessionStorage.clear()
location.reload()
```

### Force Show Exit Intent
```javascript
sessionStorage.removeItem('exit_intent_shown')
// Refresh page
// Move mouse to top
```

### Simulate User with Data
```javascript
// Mock completed transactions
const mockUser = {
  completedCount: 7,
  totalVolume: 350,
  transactions: [...]
}
```

### Check All Components Loaded
```javascript
// Count components
const components = [
  'RealtimeProof',
  'MilestoneBadges',
  'GoalProgress',
  'SocialProofTicker',
  'StatusTier',
  'PendingTransactionUrgency',
  'ReferralProgram',
  'RateVolatilityAlert',
  'SavedDrafts',
  'ExitIntentPopup',
  'StreakCounter',
  'ReferralLeaderboard'
]

components.forEach(c => {
  const found = document.body.innerHTML.includes(c)
  console.log(found ? '✅' : '❌', c)
})
```

---

## 🎯 Success Criteria

**Jika SEMUA checklist ✓, maka implementation SUKSES!**

**Expected Results:**
- 20 components visible & functional
- All psychology principles working
- Analytics tracking all events
- Performance meets targets
- No console errors
- Mobile responsive

**Ready for production deployment! 🚀**

---

**Need Help?**
- Check console for errors (F12)
- Review component files in `/build/components/`
- Check documentation in root folder
- Verify props being passed correctly

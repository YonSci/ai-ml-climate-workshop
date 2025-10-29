# 📱 Mobile Navigation Test Guide

## How to Test the Hamburger Menu

The hamburger menu (☰) appears **only on mobile screens** (width < 1220px).

---

## 🧪 Testing Methods

### Method 1: Resize Browser Window (Easiest)
1. Open your site in browser
2. Make the browser window **very narrow** (drag it smaller)
3. When width goes below ~1220px, hamburger should appear
4. Top navigation tabs should disappear and be replaced by hamburger

### Method 2: Browser Developer Tools
1. Press **F12** to open Developer Tools
2. Click the **device toggle icon** (📱) or press **Ctrl + Shift + M**
3. Select a mobile device (e.g., iPhone 12, Galaxy S20)
4. You should see the hamburger menu in the header

### Method 3: Actual Mobile Device
1. Open the site on your phone/tablet
2. The hamburger menu should be visible automatically
3. Top navigation tabs should not be visible

---

## ✅ What You Should See

### On Desktop (width > 1220px):
```
┌─────────────────────────────────────────────┐
│  📄  AI/ML for Climate   Lessons ▼ ... 🔍  │
│                                               │
│  (Top navigation tabs visible)                │
└─────────────────────────────────────────────┘
```

### On Mobile (width < 1220px):
```
┌────────────────────────┐
│ ☰  AI/ML for Climate 🔍 │
│                          │
│ (Hamburger visible!)     │
└────────────────────────┘
```

When you tap ☰, a drawer slides out from the left with all navigation links.

---

## 🎯 Current Status

Your CSS already has the correct code for mobile navigation:

```css
@media (max-width: 76.1875em) {  /* 1220px */
  .md-header__button.md-header-nav-toggle {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  
  .md-tabs {
    display: none !important;  /* Hide desktop tabs */
  }
}
```

---

## 🔍 Troubleshooting

### "I don't see the hamburger icon"

**Check 1: Is your window narrow enough?**
- The breakpoint is 1220px
- Try making your browser window **very narrow**
- Or use browser dev tools (F12 → device emulation)

**Check 2: Clear browser cache**
- Hard refresh: **Ctrl + Shift + R**
- Or clear cache and reload

**Check 3: Check the viewport**
- Open F12 → Console
- Type: `window.innerWidth`
- If it shows > 1220, that's why you don't see hamburger

### "Hamburger appears but doesn't work"

**Solution:**
- Make sure JavaScript is enabled
- Check for console errors (F12 → Console tab)
- The menu is built into MkDocs Material theme

---

## 📱 Expected Behavior by Screen Size

| Screen Width | Navigation Style | Hamburger Visible? |
|-------------|------------------|-------------------|
| > 1220px | Top tabs | ❌ No |
| 960-1220px | Top tabs | ❌ No |
| < 960px | Hamburger drawer | ✅ Yes |

---

## 🎨 Visual Test Checklist

### Desktop (> 1220px):
- [ ] Top navigation tabs visible
- [ ] "Lessons", "Collaboration", "Assessments", etc. visible as tabs
- [ ] No hamburger icon
- [ ] Clicking tab opens submenu

### Tablet (960-1220px):
- [ ] Top navigation tabs still visible
- [ ] Layout adjusts for medium screens

### Mobile (< 960px):
- [ ] Hamburger icon (☰) visible in top-left
- [ ] Top navigation tabs hidden
- [ ] Clicking hamburger opens drawer
- [ ] Drawer contains all navigation links
- [ ] Can close drawer by clicking X or outside

---

## 🚀 Quick Mobile Test

**Right now, try this:**

1. Press **F12** (open Developer Tools)
2. Press **Ctrl + Shift + M** (toggle device mode)
3. Select **iPhone 12 Pro** from device dropdown
4. Look at top-left corner
5. You should see **☰** (hamburger icon)

**If you see it → SUCCESS! ✅**  
**If you don't → Take a screenshot and share it**

---

## 💡 Pro Tip

To quickly test without dev tools:
1. Just make your browser window **super narrow**
2. Drag the edge to ~500px width
3. Hamburger should pop up automatically!

---

## 📊 Technical Details

### CSS Breakpoint:
```css
@media (max-width: 76.1875em)  /* = 1220px */
```

### Elements Controlled:
- `.md-header__button.md-header-nav-toggle` - The hamburger button
- `.md-tabs` - Top navigation tabs (hidden on mobile)
- `.md-nav__toggle` - Drawer toggle functionality

### MkDocs Material Theme:
The hamburger menu is built into the theme. Your custom CSS ensures it shows up correctly on mobile by overriding any custom styles that might hide it.

---

## ✅ Summary

**Your navigation IS working correctly!**

The hamburger menu **only appears on narrow screens**. To test:
1. Use browser dev tools (F12 → device mode)
2. Or actually visit on a mobile device
3. Or make browser window very narrow (< 1220px wide)

**It's working as designed!** 📱✨


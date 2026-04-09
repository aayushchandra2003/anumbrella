# Ammasthota — Premium Mango Landing Page

## Project Overview
This is a premium, scroll-driven animated landing page for **Ammasthota** — a brand selling Ratnagiri Hapus (Alphonso) mangoes. The site must feel like a luxury product launch, not a grocery store. Think Apple product pages meets tropical indulgence.

**Stack**: Next.js 14+ (App Router) + Tailwind CSS + Framer Motion + GSAP (ScrollTrigger)
**Deployment**: Vercel

---

## Design Reference

All design screenshots and assets are in the `/designs/` and `/assets/` folders.

### CRITICAL: Match the reference designs EXACTLY
- **Desktop layout**: See `designs/desktop-hero.png` and `designs/desktop-order.png`
- **Mobile layout**: See `designs/mobile.png`
- **Assets to use**: All images in `/assets/` — floating mangoes, hero splash, mango burst, wide banner
- Do NOT use placeholder images. Use the actual product images provided.
- Do NOT deviate from the color palette, layout proportions, or typography style shown in the screenshots.

---

## Brand Identity

### Color Palette
```css
:root {
  --mango-gold: #F5A623;        /* Primary — warm mango gold */
  --mango-deep: #E8920E;        /* Darker gold for depth */
  --saffron: #FF8C00;           /* Accent — saffron orange */
  --cream: #FFF8E7;             /* Background — warm cream */
  --bark: #3D2B1F;              /* Text — rich dark brown */
  --bark-light: #6B4C3B;       /* Secondary text */
  --leaf-green: #4A7C3F;        /* Accent — natural green */
  --white: #FFFFFF;
  --hero-bg: #FFB800;           /* Hero section yellow */
}
```

### Typography
- **Display/Headings**: Use a bold serif or display font — something premium like `Playfair Display`, `DM Serif Display`, or `Instrument Serif`. NOT generic sans-serif.
- **Body**: A clean, modern sans-serif — `DM Sans`, `Outfit`, or `General Sans`. NOT Inter, Roboto, or Arial.
- **Accent/Labels**: Consider a handwritten or script font for "Ammasthota" brand feel — something warm and organic.
- Headings should be LARGE and impactful (clamp(2.5rem, 5vw, 5rem) for hero)
- Letter-spacing on headings: tight (-0.02em to -0.04em)

### Voice & Copy Style
- "RATNAGIRI HAPUS, PURE GOLD." — bold, confident, premium
- Short punchy headlines. Minimal body text.
- Price display must be clear and prominent with ₹ symbol

---

## Animation & Interaction Design

### SCROLL-DRIVEN ANIMATIONS (This is the hero feature)

#### Hero Section — Mango Scatter Effect
When user scrolls DOWN from the hero:
1. The central mango splash image stays fixed initially
2. Individual floating mango elements **scatter outward** in different directions (translateX + translateY + rotate + scale down + opacity fade)
3. Each mango has a DIFFERENT trajectory — some go left, some right, some up — like an explosion in slow motion
4. Use `useScroll` + `useTransform` from Framer Motion, OR GSAP ScrollTrigger `scrub: true`
5. The scatter should feel **organic and physics-based** — not linear. Use spring/elastic easing.

```
Scroll Progress: 0% → 100%
Mango 1: (center) → flies top-left, rotates -45deg, scale 0.3, opacity 0
Mango 2: (center) → flies top-right, rotates 30deg, scale 0.5, opacity 0
Mango 3: (center) → flies bottom-left, rotates -60deg, scale 0.2, opacity 0
Mango 4: (center) → drops down-right, rotates 15deg, scale 0.4, opacity 0
```

#### Section Transitions
- Each section fades/slides in as it enters viewport
- Use `IntersectionObserver` or Framer Motion `whileInView`
- Stagger child elements: 0.1s delay between siblings
- Preferred easing: `[0.25, 0.46, 0.45, 0.94]` (smooth deceleration)

#### Micro-Interactions
- **Buttons**: Scale 1.05 on hover, subtle shadow expansion, golden glow
- **Product cards**: Lift on hover (translateY: -8px, shadow increase)
- **Mango images**: Gentle floating animation (translateY oscillation, 3s loop) when idle
- **Price tags**: Counter animation on scroll-into-view
- **CTA "Order Now"**: Pulse animation every 3 seconds (subtle scale 1.02 → 1.0)

#### Page Load
- Hero content fades in with staggered timing:
  1. Background color/gradient (instant)
  2. Main heading slides up (0.2s delay)
  3. Subheading slides up (0.4s delay)
  4. CTA button slides up (0.6s delay)
  5. Mango images scale in from 0.8 → 1.0 with slight rotation (0.3s delay, spring physics)

### Animation Technical Rules
- ALWAYS use `will-change: transform` on animated elements
- Use `transform` and `opacity` ONLY for animations (GPU-accelerated)
- No layout-triggering animations (no animating width, height, top, left)
- Mobile: Reduce animation complexity — disable parallax, simplify scatter to fade-out
- Respect `prefers-reduced-motion` — provide fallback static layout
- Target 60fps — test with Chrome DevTools Performance tab

---

## Layout & Sections

### Section 1: Hero
- Full viewport height (100dvh)
- Bright mango-gold background (#FFB800)
- Large bold headline: "RATNAGIRI HAPUS, PURE GOLD."
- "ORDER NOW" CTA button (green or dark brown)
- Floating mango images positioned absolutely around the text
- Mango splash image as the centerpiece

### Section 2: Product / Why Ammasthota
- Clean cream/white background
- USP points with icons (organic, farm-fresh, Ratnagiri-sourced)
- Horizontal scroll or grid of product features
- Mango cross-section or detail images

### Section 3: Order Section
- Product cards with:
  - Pack image
  - Pack name ("Premium Pack - 12", "Grand Pack - 24")
  - Weight info
  - Price in ₹ (large, bold)
  - Quantity selector (+ / - buttons)
  - "Add to Cart" or "Order Now" button
- Reference: `designs/desktop-order.png`

### Section 4: Footer
- Minimal footer with brand name, contact, social links
- Warm dark background (bark brown)

### Responsive Breakpoints
```
Mobile:   < 640px  (single column, stacked layout)
Tablet:   640-1024px (2-column where appropriate)  
Desktop:  > 1024px (full layout as per desktop design)
```

---

## Code Quality Rules

### File Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── FloatingMango.tsx      (reusable animated mango element)
│   ├── MangoScatter.tsx       (scroll-driven scatter controller)
│   ├── ProductSection.tsx
│   ├── OrderSection.tsx
│   ├── ProductCard.tsx
│   ├── Footer.tsx
│   └── AnimatedSection.tsx    (reusable scroll-reveal wrapper)
├── hooks/
│   └── useScrollProgress.ts
├── lib/
│   └── animations.ts          (shared animation variants/configs)
└── assets/                    (all mango images)
```

### Component Rules
- Every section is its own component
- Animations are defined in `lib/animations.ts` as reusable Framer Motion variants
- No inline styles — use Tailwind classes or CSS modules
- Images: Use `next/image` with proper `sizes`, `priority` on hero images
- All images must have meaningful `alt` text

### Performance
- Lazy load below-fold images
- Hero images: `priority={true}`, preloaded
- Use `loading="lazy"` on order section images
- Bundle size: No unnecessary libraries. Framer Motion + GSAP are the only animation deps.
- Lighthouse target: 90+ Performance, 95+ Accessibility

---

## What NOT To Do

❌ Don't use generic templates or component libraries (no Bootstrap, no Material UI)
❌ Don't use placeholder/stock images — only use the provided mango assets
❌ Don't use boring flat layouts — this needs depth, layers, overlap
❌ Don't make animations janky — if it can't run at 60fps, simplify it
❌ Don't use Inter, Roboto, Arial, or system fonts
❌ Don't make the page feel like a Shopify default theme
❌ Don't ignore the mobile design — it must match the mobile screenshot
❌ Don't use purple/blue/generic gradients — stay in the warm gold/orange/cream palette
❌ Don't add unnecessary sections not shown in the design reference
❌ Don't compromise on scroll animation quality — the mango scatter is THE signature feature

---

## Reference Prompt for Claude Code

When starting the project, use this prompt:

> Build the Ammasthota mango landing page. Read CLAUDE.md first for all design specs, animation details, and brand guidelines. Reference the design screenshots in /designs/ and use all mango images from /assets/. The hero section must have a scroll-driven mango scatter animation where individual floating mangoes fly apart in different directions as the user scrolls. Match the designs pixel-for-pixel. Make it production-ready, fast, and beautiful.

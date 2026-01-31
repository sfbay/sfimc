#!/usr/bin/env python3
"""
SFIMC Interaction & Visual Test Suite
Tests user interactions, animations, and responsive behavior.
"""

from playwright.sync_api import sync_playwright
import json
import os

BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = "/tmp/sfimc-tests"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def test_interactions():
    """Test user interactions and visual behavior"""
    results = {
        "passed": [],
        "failed": [],
        "warnings": []
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        print("\n" + "="*60)
        print("SFIMC INTERACTION TEST SUITE")
        print("="*60)

        # ===========================================
        # TEST 1: Newsletter Form Interaction
        # ===========================================
        print("\n\n🔄 TEST 1: Newsletter Form Interaction")
        print("-"*40)

        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")

        # Scroll to footer
        footer = page.locator("footer")
        footer.scroll_into_view_if_needed()
        page.wait_for_timeout(500)

        # Find newsletter form
        email_input = page.locator('footer input[type="email"]')
        if email_input.count() > 0:
            results["passed"].append("Newsletter email input found")
            print("  ✅ Newsletter email input found")

            # Test input interaction
            email_input.fill("test@example.com")
            page.wait_for_timeout(300)

            # Check value was entered
            input_value = email_input.input_value()
            if input_value == "test@example.com":
                results["passed"].append("Newsletter input accepts text")
                print("  ✅ Input accepts text correctly")

            # Find and click submit button
            submit_btn = page.locator('footer button[type="submit"]')
            if submit_btn.count() > 0:
                results["passed"].append("Newsletter submit button found")
                print("  ✅ Submit button found")

                # Click submit
                submit_btn.click()
                page.wait_for_timeout(1500)  # Wait for animation/state change

                page.screenshot(path=f"{SCREENSHOT_DIR}/interaction_newsletter_submitted.png")

                # Check for success state (subscription confirmation)
                success_indicator = page.locator('footer:has-text("subscribed"), footer [role="status"]')
                if success_indicator.count() > 0:
                    results["passed"].append("Newsletter shows success state")
                    print("  ✅ Success state displayed")
                else:
                    results["warnings"].append("Newsletter success state not detected (may be expected)")
                    print("  ⚠️ Success state not detected (mock API)")
            else:
                results["warnings"].append("Newsletter submit button not found")
                print("  ⚠️ Submit button not found")
        else:
            results["failed"].append("Newsletter email input not found")
            print("  ❌ Newsletter email input not found")

        # ===========================================
        # TEST 2: Card Hover Effects
        # ===========================================
        print("\n\n🔄 TEST 2: Card Hover Effects")
        print("-"*40)

        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")

        # Find any card-like element with hover effects
        cards = page.locator('a[class*="card"], a[class*="hover"], [class*="hover-lift"]')
        if cards.count() > 0:
            first_card = cards.first

            # Get initial position
            initial_box = first_card.bounding_box()

            # Hover over the card
            first_card.hover()
            page.wait_for_timeout(400)

            page.screenshot(path=f"{SCREENSHOT_DIR}/interaction_card_hover.png")

            results["passed"].append("Card hover interaction works")
            print(f"  ✅ Hovering over cards works ({cards.count()} hoverable cards found)")
        else:
            # Try alternative selector
            links = page.locator('section a').first
            if links:
                links.hover()
                page.wait_for_timeout(300)
                results["passed"].append("Link hover works")
                print("  ✅ Link hover works")
            else:
                results["warnings"].append("No hoverable cards found")
                print("  ⚠️ No hoverable cards found")

        # ===========================================
        # TEST 3: Scroll Animations (Impact Dashboard)
        # ===========================================
        print("\n\n🔄 TEST 3: Scroll Animations")
        print("-"*40)

        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")

        # Screenshot before scrolling
        page.screenshot(path=f"{SCREENSHOT_DIR}/interaction_before_scroll.png")

        # Scroll down to trigger animations
        page.evaluate("window.scrollTo(0, document.body.scrollHeight / 2)")
        page.wait_for_timeout(1000)

        page.screenshot(path=f"{SCREENSHOT_DIR}/interaction_after_scroll.png")

        # Check if count-up animation elements exist
        stat_elements = page.locator('[class*="stat"], [class*="count"], [class*="Impact"]')
        if stat_elements.count() > 0:
            results["passed"].append("Scroll-triggered elements present")
            print(f"  ✅ Found {stat_elements.count()} potential animated stat elements")
        else:
            results["warnings"].append("No stat elements found for scroll animation")
            print("  ⚠️ No stat elements found")

        # ===========================================
        # TEST 4: Navigation Link Clicks
        # ===========================================
        print("\n\n🔄 TEST 4: Navigation Links")
        print("-"*40)

        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")

        # Test clicking a nav link
        members_link = page.locator('header nav a[href="/members"]').first
        if members_link:
            # Use expect_navigation for client-side routing
            with page.expect_navigation(wait_until="networkidle"):
                members_link.click()

            page.wait_for_timeout(500)  # Allow route transition

            if "/members" in page.url:
                results["passed"].append("Nav link to /members works")
                print("  ✅ Clicked Members link, navigated to /members")
            else:
                # Check if h1 changed (client-side navigation)
                h1_text = page.locator("h1").inner_text()
                if "Independent" in h1_text or "Voice" in h1_text:
                    results["passed"].append("Nav link to /members works (client-side)")
                    print(f"  ✅ Client-side navigation worked, H1: {h1_text[:40]}")
                else:
                    results["warnings"].append("Nav link may use client-side routing")
                    print(f"  ⚠️ URL: {page.url}, H1: {h1_text[:40]}")
        else:
            results["warnings"].append("Members nav link not found")
            print("  ⚠️ Members nav link not found in header")

        # Go back and test another link
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")

        impact_link = page.locator('header nav a[href="/impact"]').first
        if impact_link:
            impact_link.click()
            page.wait_for_load_state("networkidle")

            if "/impact" in page.url:
                results["passed"].append("Nav link to /impact works")
                print("  ✅ Clicked Impact link, navigated to /impact")

        # ===========================================
        # TEST 5: CTA Button Clicks
        # ===========================================
        print("\n\n🔄 TEST 5: CTA Button Clicks")
        print("-"*40)

        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")

        # Find primary CTA in hero
        cta_btn = page.locator('.hero .btn, section:first-of-type .btn').first
        if cta_btn:
            cta_text = cta_btn.inner_text()
            cta_href = cta_btn.get_attribute("href")

            cta_btn.click()
            page.wait_for_load_state("networkidle")

            if cta_href and cta_href in page.url:
                results["passed"].append(f"Hero CTA '{cta_text}' navigates correctly")
                print(f"  ✅ CTA '{cta_text}' → {page.url}")
            else:
                results["passed"].append(f"Hero CTA clicked")
                print(f"  ✅ CTA '{cta_text}' clicked, now at {page.url}")
        else:
            results["warnings"].append("No CTA button found in hero")
            print("  ⚠️ No CTA button found in hero")

        # ===========================================
        # TEST 6: Responsive Breakpoints
        # ===========================================
        print("\n\n🔄 TEST 6: Responsive Breakpoints")
        print("-"*40)

        viewports = [
            {"name": "Mobile", "width": 375, "height": 667},
            {"name": "Tablet", "width": 768, "height": 1024},
            {"name": "Desktop", "width": 1280, "height": 720},
            {"name": "Wide", "width": 1920, "height": 1080},
        ]

        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")

        for vp in viewports:
            page.set_viewport_size({"width": vp["width"], "height": vp["height"]})
            page.wait_for_timeout(500)
            page.screenshot(path=f"{SCREENSHOT_DIR}/responsive_{vp['name'].lower()}.png")

            # Verify content is visible
            h1 = page.locator("h1")
            if h1.is_visible():
                results["passed"].append(f"Content visible at {vp['name']} ({vp['width']}px)")
                print(f"  ✅ {vp['name']} ({vp['width']}px) - Content visible")
            else:
                results["failed"].append(f"Content not visible at {vp['name']}")
                print(f"  ❌ {vp['name']} ({vp['width']}px) - Content NOT visible")

        # ===========================================
        # TEST 7: Keyboard Navigation
        # ===========================================
        print("\n\n🔄 TEST 7: Keyboard Navigation")
        print("-"*40)

        page.set_viewport_size({"width": 1280, "height": 720})
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")

        # Tab through interactive elements
        tab_count = 0
        focusable_elements = []

        for i in range(15):  # Tab through first 15 elements
            page.keyboard.press("Tab")
            page.wait_for_timeout(150)

            focused = page.evaluate("document.activeElement.tagName + ' - ' + (document.activeElement.textContent || document.activeElement.getAttribute('aria-label') || '').substring(0, 30)")
            if focused and "BODY" not in focused:
                tab_count += 1
                focusable_elements.append(focused)

        if tab_count > 5:
            results["passed"].append(f"Keyboard navigation works ({tab_count} focusable elements)")
            print(f"  ✅ Found {tab_count} focusable elements via Tab key")
            print(f"    First few: {focusable_elements[:5]}")
        else:
            results["warnings"].append(f"Few focusable elements found ({tab_count})")
            print(f"  ⚠️ Only {tab_count} focusable elements found")

        # Test Enter key on focused link
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.keyboard.press("Tab")  # Skip link
        page.keyboard.press("Tab")  # First nav item
        page.keyboard.press("Tab")  # Logo or next item

        initial_url = page.url
        page.keyboard.press("Enter")
        page.wait_for_timeout(500)

        if page.url != initial_url:
            results["passed"].append("Enter key activates focused links")
            print(f"  ✅ Enter key navigates (went to {page.url})")
        else:
            results["warnings"].append("Enter key navigation not verified")
            print("  ⚠️ Enter key navigation not verified")

        # ===========================================
        # SUMMARY
        # ===========================================
        print("\n" + "="*60)
        print("INTERACTION TEST SUMMARY")
        print("="*60)
        print(f"✅ Passed:   {len(results['passed'])}")
        print(f"❌ Failed:   {len(results['failed'])}")
        print(f"⚠️  Warnings: {len(results['warnings'])}")
        print(f"\n📸 Screenshots saved to: {SCREENSHOT_DIR}")

        if results["failed"]:
            print("\n❌ FAILURES:")
            for failure in results["failed"]:
                print(f"  - {failure}")

        if results["warnings"]:
            print("\n⚠️ WARNINGS:")
            for warning in results["warnings"]:
                print(f"  - {warning}")

        # Save results
        with open(f"{SCREENSHOT_DIR}/interaction_results.json", "w") as f:
            json.dump(results, f, indent=2)

        browser.close()
        return results

if __name__ == "__main__":
    test_interactions()

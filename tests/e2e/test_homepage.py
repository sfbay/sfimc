#!/usr/bin/env python3
"""
SFIMC Homepage E2E Test Suite
Tests navigation, accessibility, visual components, and interactions.
"""

from playwright.sync_api import sync_playwright, expect
import json
import os

# Test configuration
BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = "/tmp/sfimc-tests"

# Ensure screenshot directory exists
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def test_homepage():
    """Main test runner for homepage"""
    results = {
        "passed": [],
        "failed": [],
        "warnings": []
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1280, "height": 720}
        )
        page = context.new_page()

        # Collect console errors
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        print("\n" + "="*60)
        print("SFIMC HOMEPAGE TEST SUITE")
        print("="*60 + "\n")

        # Navigate to homepage
        print("📍 Navigating to homepage...")
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.screenshot(path=f"{SCREENSHOT_DIR}/01_homepage_loaded.png", full_page=True)

        # ===========================================
        # TEST 1: Page Structure & SEO
        # ===========================================
        print("\n🔍 TEST 1: Page Structure & SEO")

        # Check title
        title = page.title()
        if "SFIMC" in title or "Independent Media" in title:
            results["passed"].append("Page title contains brand name")
            print("  ✅ Page title: " + title)
        else:
            results["failed"].append(f"Page title missing brand: {title}")
            print("  ❌ Page title missing brand: " + title)

        # Check meta description
        meta_desc = page.locator('meta[name="description"]').get_attribute("content")
        if meta_desc and len(meta_desc) > 50:
            results["passed"].append("Meta description present and adequate length")
            print("  ✅ Meta description present")
        else:
            results["warnings"].append("Meta description may need improvement")
            print("  ⚠️ Meta description may need improvement")

        # Check lang attribute
        lang = page.locator("html").get_attribute("lang")
        if lang == "en":
            results["passed"].append("HTML lang attribute set correctly")
            print("  ✅ HTML lang='en' set")
        else:
            results["failed"].append(f"HTML lang attribute incorrect: {lang}")
            print(f"  ❌ HTML lang attribute: {lang}")

        # ===========================================
        # TEST 2: Skip Link Accessibility
        # ===========================================
        print("\n🔍 TEST 2: Skip Link Accessibility")

        skip_link = page.locator(".skip-link")
        if skip_link.count() > 0:
            results["passed"].append("Skip link exists")
            print("  ✅ Skip link found")

            # Check skip link is hidden by default but focusable
            skip_link_box = skip_link.bounding_box()
            if skip_link_box and skip_link_box["y"] < 0:
                results["passed"].append("Skip link hidden by default")
                print("  ✅ Skip link hidden by default (negative position)")

            # Focus the skip link
            skip_link.focus()
            page.wait_for_timeout(300)
            page.screenshot(path=f"{SCREENSHOT_DIR}/02_skip_link_focused.png")

            # Check if visible when focused
            skip_link_box_focused = skip_link.bounding_box()
            if skip_link_box_focused and skip_link_box_focused["y"] >= 0:
                results["passed"].append("Skip link visible when focused")
                print("  ✅ Skip link visible when focused")
            else:
                results["failed"].append("Skip link not visible when focused")
                print("  ❌ Skip link not visible when focused")
        else:
            results["failed"].append("Skip link not found")
            print("  ❌ Skip link not found")

        # Check main content target
        main_content = page.locator("#main-content")
        if main_content.count() > 0:
            results["passed"].append("Main content landmark exists")
            print("  ✅ Main content landmark (#main-content) exists")
        else:
            results["failed"].append("Main content landmark missing")
            print("  ❌ Main content landmark (#main-content) missing")

        # ===========================================
        # TEST 3: Header Navigation
        # ===========================================
        print("\n🔍 TEST 3: Header Navigation")

        header = page.locator("header")
        if header.count() > 0:
            results["passed"].append("Header element exists")
            print("  ✅ Header element exists")
        else:
            results["failed"].append("Header element missing")
            print("  ❌ Header element missing")

        # Check logo link
        logo_link = page.locator('header a[href="/"]')
        if logo_link.count() > 0:
            results["passed"].append("Logo link to homepage exists")
            print("  ✅ Logo link to homepage exists")
        else:
            results["warnings"].append("Logo link to homepage not found")
            print("  ⚠️ Logo link to homepage not found")

        # Check nav links
        nav_links = page.locator("header nav a, header a").all()
        print(f"  📋 Found {len(nav_links)} navigation links")

        expected_links = ["/about", "/members", "/impact", "/news", "/join"]
        for expected in expected_links:
            link = page.locator(f'header a[href="{expected}"]')
            if link.count() > 0:
                results["passed"].append(f"Nav link {expected} exists")
                print(f"    ✅ {expected}")
            else:
                results["warnings"].append(f"Nav link {expected} not found")
                print(f"    ⚠️ {expected} not found")

        # ===========================================
        # TEST 4: Hero Section
        # ===========================================
        print("\n🔍 TEST 4: Hero Section")

        hero = page.locator(".hero, section:first-of-type")
        if hero.count() > 0:
            results["passed"].append("Hero section exists")
            print("  ✅ Hero section exists")

        # Check h1
        h1 = page.locator("h1")
        if h1.count() > 0:
            h1_text = h1.inner_text()
            results["passed"].append("H1 heading exists")
            print(f"  ✅ H1: '{h1_text[:50]}...'")
        else:
            results["failed"].append("H1 heading missing")
            print("  ❌ H1 heading missing")

        # Check CTA buttons in hero
        cta_buttons = page.locator(".hero .btn, section:first-of-type .btn")
        if cta_buttons.count() > 0:
            results["passed"].append("Hero CTA buttons exist")
            print(f"  ✅ Found {cta_buttons.count()} CTA buttons in hero")
        else:
            results["warnings"].append("No CTA buttons found in hero")
            print("  ⚠️ No CTA buttons found in hero")

        # ===========================================
        # TEST 5: Member Cards
        # ===========================================
        print("\n🔍 TEST 5: Member Cards Section")

        member_cards = page.locator('[class*="MemberCard"], .card')
        card_count = member_cards.count()
        print(f"  📋 Found {card_count} cards")

        if card_count > 0:
            results["passed"].append(f"Found {card_count} member/content cards")

            # Check first card structure
            first_card = member_cards.first

            # Check for heading in card
            card_heading = first_card.locator("h3, h4")
            if card_heading.count() > 0:
                results["passed"].append("Cards have headings")
                print("  ✅ Cards have headings")

            # Check for links
            card_link = first_card.locator("a")
            if card_link.count() > 0:
                results["passed"].append("Cards are interactive (have links)")
                print("  ✅ Cards are interactive")
        else:
            results["warnings"].append("No member/content cards found")
            print("  ⚠️ No member/content cards found")

        # ===========================================
        # TEST 6: Impact Dashboard
        # ===========================================
        print("\n🔍 TEST 6: Impact Dashboard")

        # Look for impact section or stats
        impact_section = page.locator('[class*="Impact"], [class*="impact"], section:has-text("Impact")')
        if impact_section.count() > 0:
            results["passed"].append("Impact section exists")
            print("  ✅ Impact section exists")

            # Check for stat numbers
            stat_values = page.locator('[class*="stat"], [class*="count"]')
            if stat_values.count() > 0:
                print(f"  ✅ Found {stat_values.count()} stat displays")
        else:
            results["warnings"].append("Impact section not immediately visible")
            print("  ⚠️ Impact section not immediately visible")

        # ===========================================
        # TEST 7: Footer
        # ===========================================
        print("\n🔍 TEST 7: Footer")

        footer = page.locator("footer")
        if footer.count() > 0:
            results["passed"].append("Footer element exists")
            print("  ✅ Footer element exists")

            # Scroll to footer
            footer.scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            page.screenshot(path=f"{SCREENSHOT_DIR}/03_footer.png")

            # Check footer navigation
            footer_links = footer.locator("a").all()
            print(f"  📋 Found {len(footer_links)} footer links")

            # Check for newsletter form
            newsletter_form = footer.locator('form, input[type="email"]')
            if newsletter_form.count() > 0:
                results["passed"].append("Newsletter signup form exists")
                print("  ✅ Newsletter signup form exists")

                # Check form accessibility
                email_input = footer.locator('input[type="email"]')
                if email_input.count() > 0:
                    # Check for label
                    input_id = email_input.get_attribute("id")
                    if input_id:
                        label = page.locator(f'label[for="{input_id}"]')
                        if label.count() > 0:
                            results["passed"].append("Email input has associated label")
                            print("  ✅ Email input has associated label")
                        else:
                            # Check for sr-only label
                            sr_label = page.locator(f'label.sr-only[for="{input_id}"]')
                            if sr_label.count() > 0:
                                results["passed"].append("Email input has sr-only label")
                                print("  ✅ Email input has sr-only label (accessible)")
                            else:
                                results["warnings"].append("Email input may need visible or sr-only label")
                                print("  ⚠️ Email input may need label")
            else:
                results["warnings"].append("Newsletter form not found in footer")
                print("  ⚠️ Newsletter form not found")

            # Check social links have aria-labels
            social_links = footer.locator('a[aria-label]')
            if social_links.count() > 0:
                results["passed"].append("Social links have aria-labels")
                print(f"  ✅ Found {social_links.count()} links with aria-labels")
        else:
            results["failed"].append("Footer element missing")
            print("  ❌ Footer element missing")

        # ===========================================
        # TEST 8: Mobile Menu
        # ===========================================
        print("\n🔍 TEST 8: Mobile Menu (Responsive)")

        # Resize to mobile
        page.set_viewport_size({"width": 375, "height": 667})
        page.wait_for_timeout(500)
        page.screenshot(path=f"{SCREENSHOT_DIR}/04_mobile_view.png")

        # Look for hamburger menu button
        menu_button = page.locator('button[aria-label*="menu" i], button[aria-expanded]')
        if menu_button.count() > 0:
            results["passed"].append("Mobile menu button exists")
            print("  ✅ Mobile menu button exists")

            # Check aria-expanded
            aria_expanded = menu_button.first.get_attribute("aria-expanded")
            if aria_expanded == "false":
                results["passed"].append("Mobile menu aria-expanded correctly set to false")
                print("  ✅ aria-expanded='false' when closed")

            # Click to open menu
            menu_button.first.click()
            page.wait_for_timeout(500)
            page.screenshot(path=f"{SCREENSHOT_DIR}/05_mobile_menu_open.png")

            # Check aria-expanded after opening
            aria_expanded_after = menu_button.first.get_attribute("aria-expanded")
            if aria_expanded_after == "true":
                results["passed"].append("Mobile menu aria-expanded updates to true")
                print("  ✅ aria-expanded='true' when open")
            else:
                results["failed"].append("aria-expanded not updating when menu opens")
                print("  ❌ aria-expanded not updating")

            # Check mobile menu has role="dialog"
            mobile_menu = page.locator('[role="dialog"]')
            if mobile_menu.count() > 0:
                results["passed"].append("Mobile menu has role='dialog'")
                print("  ✅ Mobile menu has role='dialog'")
            else:
                results["warnings"].append("Mobile menu missing role='dialog'")
                print("  ⚠️ Mobile menu missing role='dialog'")

            # Test Escape key closes menu
            page.keyboard.press("Escape")
            page.wait_for_timeout(300)
            aria_expanded_escaped = menu_button.first.get_attribute("aria-expanded")
            if aria_expanded_escaped == "false":
                results["passed"].append("Escape key closes mobile menu")
                print("  ✅ Escape key closes menu")
            else:
                results["failed"].append("Escape key doesn't close mobile menu")
                print("  ❌ Escape key doesn't close menu")
        else:
            results["warnings"].append("Mobile menu button not found")
            print("  ⚠️ Mobile menu button not found")

        # Reset viewport
        page.set_viewport_size({"width": 1280, "height": 720})
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")

        # ===========================================
        # TEST 9: Focus Indicators
        # ===========================================
        print("\n🔍 TEST 9: Focus Indicators")

        # Tab through a few elements and check focus visibility
        page.keyboard.press("Tab")  # Skip link
        page.keyboard.press("Tab")  # First nav item
        page.wait_for_timeout(300)
        page.screenshot(path=f"{SCREENSHOT_DIR}/06_focus_indicator.png")

        # Check focus-visible styles are applied
        focused_element = page.locator(":focus-visible")
        if focused_element.count() > 0:
            results["passed"].append("Focus-visible styles working")
            print("  ✅ Focus-visible styles working")
        else:
            results["warnings"].append("Could not verify focus-visible styles")
            print("  ⚠️ Could not verify focus-visible styles")

        # ===========================================
        # TEST 10: Images & Performance
        # ===========================================
        print("\n🔍 TEST 10: Images & Performance")

        # Check for Next.js Image components (they use specific attributes)
        next_images = page.locator('img[loading="lazy"], img[decoding="async"]')
        img_count = next_images.count()
        all_images = page.locator("img").count()

        print(f"  📋 Total images: {all_images}")
        print(f"  📋 Lazy-loaded images: {img_count}")

        if img_count > 0:
            results["passed"].append(f"{img_count} images use lazy loading")
            print("  ✅ Images use lazy loading")

        # Check for images without alt text
        images_without_alt = page.locator('img:not([alt])')
        if images_without_alt.count() == 0:
            results["passed"].append("All images have alt attributes")
            print("  ✅ All images have alt attributes")
        else:
            results["failed"].append(f"{images_without_alt.count()} images missing alt text")
            print(f"  ❌ {images_without_alt.count()} images missing alt text")

        # ===========================================
        # TEST 11: Console Errors
        # ===========================================
        print("\n🔍 TEST 11: Console Errors")

        if len(console_errors) == 0:
            results["passed"].append("No console errors")
            print("  ✅ No console errors detected")
        else:
            results["failed"].append(f"{len(console_errors)} console errors")
            print(f"  ❌ {len(console_errors)} console errors:")
            for error in console_errors[:5]:  # Show first 5
                print(f"    - {error[:100]}")

        # ===========================================
        # SUMMARY
        # ===========================================
        print("\n" + "="*60)
        print("TEST SUMMARY")
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

        # Save results to JSON
        with open(f"{SCREENSHOT_DIR}/test_results.json", "w") as f:
            json.dump(results, f, indent=2)
        print(f"\n📄 Results saved to: {SCREENSHOT_DIR}/test_results.json")

        browser.close()

        return results

if __name__ == "__main__":
    test_homepage()

#!/usr/bin/env python3
"""
SFIMC Multi-Page E2E Test Suite
Tests key content pages: Members, News, Events, Action, Impact
"""

from playwright.sync_api import sync_playwright
import json
import os

BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = "/tmp/sfimc-tests"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def test_all_pages():
    """Test all major pages"""
    results = {
        "passed": [],
        "failed": [],
        "warnings": []
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append({"page": page.url, "msg": msg.text}) if msg.type == "error" else None)

        print("\n" + "="*60)
        print("SFIMC MULTI-PAGE TEST SUITE")
        print("="*60)

        # ===========================================
        # TEST: Members Page
        # ===========================================
        print("\n\n📄 TESTING: /members")
        print("-"*40)

        page.goto(f"{BASE_URL}/members")
        page.wait_for_load_state("networkidle")
        page.screenshot(path=f"{SCREENSHOT_DIR}/page_members.png", full_page=True)

        # Check page loaded
        h1 = page.locator("h1")
        if h1.count() > 0:
            results["passed"].append("/members: H1 exists")
            print(f"  ✅ H1: {h1.inner_text()[:50]}")
        else:
            results["failed"].append("/members: Missing H1")
            print("  ❌ Missing H1")

        # Check for member cards or list
        member_items = page.locator('[class*="card"], [class*="member"], article')
        if member_items.count() > 0:
            results["passed"].append(f"/members: Found {member_items.count()} member items")
            print(f"  ✅ Found {member_items.count()} member items")
        else:
            results["warnings"].append("/members: No member cards found")
            print("  ⚠️ No member cards found")

        # ===========================================
        # TEST: News Page
        # ===========================================
        print("\n\n📄 TESTING: /news")
        print("-"*40)

        page.goto(f"{BASE_URL}/news")
        page.wait_for_load_state("networkidle")
        page.screenshot(path=f"{SCREENSHOT_DIR}/page_news.png", full_page=True)

        h1 = page.locator("h1")
        if h1.count() > 0:
            results["passed"].append("/news: H1 exists")
            print(f"  ✅ H1: {h1.inner_text()[:50]}")
        else:
            results["failed"].append("/news: Missing H1")
            print("  ❌ Missing H1")

        # Check for news/story cards
        story_items = page.locator('[class*="card"], [class*="story"], article')
        if story_items.count() > 0:
            results["passed"].append(f"/news: Found {story_items.count()} story items")
            print(f"  ✅ Found {story_items.count()} story items")
        else:
            results["warnings"].append("/news: No story cards found")
            print("  ⚠️ No story cards found")

        # Check filter/tabs if present
        filters = page.locator('[role="tablist"], [class*="filter"], [class*="tab"]')
        if filters.count() > 0:
            results["passed"].append("/news: Filter/tab controls present")
            print(f"  ✅ Filter controls present")

        # ===========================================
        # TEST: Events Page
        # ===========================================
        print("\n\n📄 TESTING: /events")
        print("-"*40)

        page.goto(f"{BASE_URL}/events")
        page.wait_for_load_state("networkidle")
        page.screenshot(path=f"{SCREENSHOT_DIR}/page_events.png", full_page=True)

        h1 = page.locator("h1")
        if h1.count() > 0:
            results["passed"].append("/events: H1 exists")
            print(f"  ✅ H1: {h1.inner_text()[:50]}")
        else:
            results["failed"].append("/events: Missing H1")
            print("  ❌ Missing H1")

        # Check for event cards
        event_items = page.locator('[class*="card"], [class*="event"], article')
        if event_items.count() > 0:
            results["passed"].append(f"/events: Found {event_items.count()} event items")
            print(f"  ✅ Found {event_items.count()} event items")

            # Check event card has date
            date_display = page.locator('[class*="date"], time')
            if date_display.count() > 0:
                results["passed"].append("/events: Date displays present")
                print("  ✅ Date displays present")
        else:
            results["warnings"].append("/events: No event cards found")
            print("  ⚠️ No event cards found")

        # ===========================================
        # TEST: Action Page
        # ===========================================
        print("\n\n📄 TESTING: /action")
        print("-"*40)

        page.goto(f"{BASE_URL}/action")
        page.wait_for_load_state("networkidle")
        page.screenshot(path=f"{SCREENSHOT_DIR}/page_action.png", full_page=True)

        h1 = page.locator("h1")
        if h1.count() > 0:
            results["passed"].append("/action: H1 exists")
            print(f"  ✅ H1: {h1.inner_text()[:50]}")
        else:
            results["failed"].append("/action: Missing H1")
            print("  ❌ Missing H1")

        # Check for action cards
        action_items = page.locator('[class*="card"], [class*="action"], article')
        if action_items.count() > 0:
            results["passed"].append(f"/action: Found {action_items.count()} action items")
            print(f"  ✅ Found {action_items.count()} action items")

            # Check for progress bars (actions often have them)
            progress_bars = page.locator('[role="progressbar"], [class*="progress"]')
            if progress_bars.count() > 0:
                results["passed"].append("/action: Progress bars present")
                print(f"  ✅ Found {progress_bars.count()} progress bars")

                # Check ARIA attributes on progress bars
                first_progress = progress_bars.first
                aria_value = first_progress.get_attribute("aria-valuenow")
                if aria_value:
                    results["passed"].append("/action: Progress bars have ARIA attributes")
                    print("  ✅ Progress bars have ARIA attributes")
                else:
                    results["warnings"].append("/action: Progress bars may need ARIA attributes")
                    print("  ⚠️ Progress bars may need ARIA attributes")
        else:
            results["warnings"].append("/action: No action cards found")
            print("  ⚠️ No action cards found")

        # ===========================================
        # TEST: Impact Page
        # ===========================================
        print("\n\n📄 TESTING: /impact")
        print("-"*40)

        page.goto(f"{BASE_URL}/impact")
        page.wait_for_load_state("networkidle")
        page.screenshot(path=f"{SCREENSHOT_DIR}/page_impact.png", full_page=True)

        h1 = page.locator("h1")
        if h1.count() > 0:
            results["passed"].append("/impact: H1 exists")
            print(f"  ✅ H1: {h1.inner_text()[:50]}")
        else:
            results["failed"].append("/impact: Missing H1")
            print("  ❌ Missing H1")

        # Check for impact cards
        impact_items = page.locator('[class*="card"], [class*="impact"], article')
        if impact_items.count() > 0:
            results["passed"].append(f"/impact: Found {impact_items.count()} impact items")
            print(f"  ✅ Found {impact_items.count()} impact items")

        # ===========================================
        # TEST: About Page
        # ===========================================
        print("\n\n📄 TESTING: /about")
        print("-"*40)

        page.goto(f"{BASE_URL}/about")
        page.wait_for_load_state("networkidle")
        page.screenshot(path=f"{SCREENSHOT_DIR}/page_about.png", full_page=True)

        h1 = page.locator("h1")
        if h1.count() > 0:
            results["passed"].append("/about: H1 exists")
            print(f"  ✅ H1: {h1.inner_text()[:50]}")
        else:
            results["failed"].append("/about: Missing H1")
            print("  ❌ Missing H1")

        # ===========================================
        # TEST: Join Page
        # ===========================================
        print("\n\n📄 TESTING: /join")
        print("-"*40)

        page.goto(f"{BASE_URL}/join")
        page.wait_for_load_state("networkidle")
        page.screenshot(path=f"{SCREENSHOT_DIR}/page_join.png", full_page=True)

        h1 = page.locator("h1")
        if h1.count() > 0:
            results["passed"].append("/join: H1 exists")
            print(f"  ✅ H1: {h1.inner_text()[:50]}")
        else:
            results["failed"].append("/join: Missing H1")
            print("  ❌ Missing H1")

        # Check for form
        form = page.locator("form")
        if form.count() > 0:
            results["passed"].append("/join: Form present")
            print("  ✅ Form present")

            # Check form accessibility
            inputs = form.locator("input, textarea, select")
            inputs_without_labels = 0
            for i in range(inputs.count()):
                input_elem = inputs.nth(i)
                input_id = input_elem.get_attribute("id")
                input_type = input_elem.get_attribute("type")

                # Skip hidden inputs
                if input_type == "hidden":
                    continue

                if input_id:
                    label = page.locator(f'label[for="{input_id}"]')
                    if label.count() == 0:
                        inputs_without_labels += 1

            if inputs_without_labels == 0:
                results["passed"].append("/join: All form inputs have labels")
                print("  ✅ All form inputs have labels")
            else:
                results["warnings"].append(f"/join: {inputs_without_labels} inputs may need labels")
                print(f"  ⚠️ {inputs_without_labels} inputs may need labels")
        else:
            results["warnings"].append("/join: No form found")
            print("  ⚠️ No form found (may be expected)")

        # ===========================================
        # CHECK: Cross-page Console Errors
        # ===========================================
        print("\n\n🔍 CONSOLE ERRORS ACROSS ALL PAGES")
        print("-"*40)

        if len(console_errors) == 0:
            results["passed"].append("No console errors across all pages")
            print("  ✅ No console errors detected")
        else:
            results["failed"].append(f"{len(console_errors)} console errors across pages")
            print(f"  ❌ {len(console_errors)} console errors:")
            for error in console_errors[:10]:
                print(f"    [{error['page']}] {error['msg'][:80]}")

        # ===========================================
        # SUMMARY
        # ===========================================
        print("\n" + "="*60)
        print("MULTI-PAGE TEST SUMMARY")
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
        with open(f"{SCREENSHOT_DIR}/multipage_results.json", "w") as f:
            json.dump(results, f, indent=2)

        browser.close()
        return results

if __name__ == "__main__":
    test_all_pages()

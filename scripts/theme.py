#!/usr/bin/env python3
import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

THEME_FILES = [
    os.path.join(REPO_ROOT, "apps", "admin", "theme", "dark.css"),
    os.path.join(REPO_ROOT, "apps", "admin", "theme", "light.css"),
    os.path.join(REPO_ROOT, "apps", "web", "theme", "dark.css"),
    os.path.join(REPO_ROOT, "apps", "web", "theme", "light.css"),
]

PROP_RE = re.compile(r'^\s*(--[\w-]+)\s*:\s*(.+?)\s*;', re.MULTILINE)


def label(filepath):
    parts = filepath.replace("\\", "/").split("/")
    return "/".join(parts[-3:])


def parse_vars(filepath):
    with open(filepath, "r") as f:
        content = f.read()
    return {m.group(1): m.group(2) for m in PROP_RE.finditer(content)}


def check():
    file_vars = {f: parse_vars(f) for f in THEME_FILES}
    all_vars = set(v for vars in file_vars.values() for v in vars)

    issues_found = False
    for filepath in THEME_FILES:
        missing = sorted(all_vars - set(file_vars[filepath]))
        if not missing:
            continue
        issues_found = True
        print(f"\n{label(filepath)} is missing {len(missing)} variable(s):")
        for var in missing:
            sources = [label(f) for f, v in file_vars.items() if var in v]
            print(f"  {var}  (defined in: {', '.join(sources)})")

    if not issues_found:
        print("All theme files are in sync. No missing variables found.")
    else:
        print("\nRun 'yarn theme:fix' to automatically add missing variables.")

    return issues_found


def fix():
    file_vars = {f: parse_vars(f) for f in THEME_FILES}
    all_vars = set(v for vars in file_vars.values() for v in vars)

    total_fixed = 0
    for filepath in THEME_FILES:
        missing = sorted(all_vars - set(file_vars[filepath]))
        if not missing:
            continue

        variant = "dark" if "dark" in os.path.basename(filepath) else "light"
        merged = dict(file_vars[filepath])
        for var in missing:
            # Prefer same-variant file from the other app
            value = next(
                (v[var] for p, v in file_vars.items() if var in v and variant in os.path.basename(p) and p != filepath),
                None,
            )
            # Fall back to any file that has it
            if value is None:
                value = next(v[var] for v in file_vars.values() if var in v)
            merged[var] = value

        sorted_lines = "\n".join(f"    {k}: {v};" for k, v in sorted(merged.items()))
        root_block = re.compile(r'(:root \{)[^}]*(  \})', re.DOTALL)

        with open(filepath, "r") as f:
            content = f.read()

        new_content = root_block.sub(rf'\1\n{sorted_lines}\n\2', content)
        if new_content == content:
            print(f"Could not find :root block in {label(filepath)}, skipping.")
            continue

        with open(filepath, "w") as f:
            f.write(new_content)

        total_fixed += len(missing)
        print(f"{label(filepath)}: added {len(missing)} variable(s): {', '.join(missing)}")

    if total_fixed == 0:
        print("Nothing to fix. All theme files are already in sync.")
    else:
        print(f"\nFixed {total_fixed} missing variable(s) across theme files.")


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in ("check", "fix"):
        print("Usage:")
        print("  python scripts/theme.py check   check for missing variables")
        print("  python scripts/theme.py fix     add missing variables")
        sys.exit(1)

    if sys.argv[1] == "check":
        sys.exit(1 if check() else 0)
    else:
        fix()


if __name__ == "__main__":
    main()

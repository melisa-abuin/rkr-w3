#!/usr/bin/env python3
"""
Checks that every util exported from utils/ is actually imported somewhere
in the non-utils source files (app/, components/, hooks/, pages/, constants/).

A util is considered used when at least one of the following is true:
  - Its folder path is directly imported:  from '@/utils/<folder>'
  - One of its exported names is imported via the barrel:  from '@/utils'
  - It is loaded with a dynamic import:  import('@/utils/<folder>')
"""
import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB_APP   = os.path.join(REPO_ROOT, "apps", "web")
DLS_SRC   = os.path.join(REPO_ROOT, "packages", "dls", "src")

# Absolute paths of all source directories to scan across workspaces
SEARCH_DIRS = [
    os.path.join(WEB_APP, "app"),
    os.path.join(WEB_APP, "pages"),
    os.path.join(DLS_SRC, "components"),
    os.path.join(DLS_SRC, "hooks"),
    os.path.join(DLS_SRC, "constants"),
]


def get_util_entries():
    """Return a list of (folder_name, [exported_names]) for every util."""
    utils_path = os.path.join(DLS_SRC, "utils")
    entries = []
    for folder_name in sorted(os.listdir(utils_path)):
        folder_path = os.path.join(utils_path, folder_name)
        index_path = os.path.join(folder_path, "index.ts")
        if not os.path.isdir(folder_path) or not os.path.isfile(index_path):
            continue
        exported = get_exported_names(index_path)
        entries.append((folder_name, exported))
    return entries


def get_exported_names(index_path):
    """Extract names of top-level exports from an index.ts file."""
    try:
        with open(index_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
    except Exception as e:
        print(f"\033[91mError reading {index_path}: {e}\033[0m")
        return []
    pattern = r"^export\s+(?:const|function|class|interface|type|enum)\s+(\w+)"
    return re.findall(pattern, content, re.MULTILINE)


def make_patterns(folder_name, exported_names):
    """
    Return a list of regexes that constitute proof the util is used:
      1. Direct path import (static or dynamic)
      2. One of the exported names imported from the barrel '@/utils'
    """
    q = r"['\"]"
    direct_path = f"@/utils/{folder_name}"
    escaped = direct_path.replace(".", r"\.")

    patterns = [
        # static:  import X from '@/utils/folderName'
        r"from\s+" + q + escaped + q,
        # dynamic: import('@/utils/folderName')
        r"import\s*\(\s*" + q + escaped + q + r"\s*\)",
    ]

    # barrel:  import { exportedName } from '@/utils'
    barrel = r"@/utils"
    escaped_barrel = barrel.replace(".", r"\.")
    for name in exported_names:
        patterns.append(
            r"import\s*\{[^}]*\b" + name + r"\b[^}]*\}\s*from\s*" + q + escaped_barrel + q
        )

    return patterns


def collect_source_files():
    """Walk SEARCH_DIRS and return all .ts/.tsx files, skipping test folders."""
    files = []
    for dir_path in SEARCH_DIRS:
        if not os.path.isdir(dir_path):
            continue
        for folder_path, _dirs, dir_files in os.walk(dir_path):
            if "__tests__" in folder_path:
                continue
            for file in dir_files:
                if file.endswith(".ts") or file.endswith(".tsx"):
                    files.append(os.path.join(folder_path, file))
    return files


def is_util_used(patterns, source_files):
    """Return True as soon as any pattern matches in any source file."""
    for file_path in source_files:
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
        except Exception as e:
            print(f"\033[91mError reading {file_path}: {e}\033[0m")
            continue
        for pattern in patterns:
            if re.search(pattern, content):
                return True
    return False


def main():
    print("Scanning utils for unused exports...")

    entries = get_util_entries()
    source_files = collect_source_files()
    unused = []

    for folder_name, exported_names in entries:
        if not exported_names:
            # folder has an index.ts but nothing is exported — flag it
            unused.append((folder_name, []))
            continue
        patterns = make_patterns(folder_name, exported_names)
        if not is_util_used(patterns, source_files):
            unused.append((folder_name, exported_names))

    if not unused:
        print("\033[92mAll utils are used.\033[0m")
        sys.exit(0)

    print("\033[91mFound unused utils:\033[0m")
    for folder_name, names in unused:
        label = ", ".join(names) if names else "(no exports)"
        print(f"  \033[93m{folder_name}\033[0m — {label}")
    sys.exit(1)


if __name__ == "__main__":
    main()

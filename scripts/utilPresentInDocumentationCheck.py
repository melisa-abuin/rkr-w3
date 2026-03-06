#!/usr/bin/env python3
import os
import sys

def scan_utils_folder():
    utils_path = os.path.abspath("../utils")
    readme_path = os.path.abspath("../utils/README.md")

    if not os.path.exists(readme_path):
        print(f"\033[91m README.md not found at {readme_path} \033[0m")
        return {}

    with open(readme_path, "r", encoding="utf-8") as f:
        readme_content = f.read()

    missing_functions = {}
    for folder_name in os.listdir(utils_path):
        folder_path = os.path.join(utils_path, folder_name)
        if not os.path.isdir(folder_path):
            continue

        # Only check the util entrypoint directly inside each util folder.
        index_path = os.path.join(folder_path, "index.ts")
        if not os.path.isfile(index_path):
            continue

        if folder_name not in readme_content:
            relative_index_path = os.path.relpath(index_path, utils_path)
            missing_functions[relative_index_path] = [folder_name]

    return missing_functions

def report_violations(violations, message):
    if violations:
        print("\033[91m" + message + "\033[0m")
        for file, lines in violations.items():
            print(f"\033[93m:\033[0m {file}")
            for line in lines:
                print(f"  - {line}")

def main():
    print("Scanning...")
    missing_functions = scan_utils_folder()

    if not missing_functions:
        print("No functions missing in readme.md.")
        sys.exit(0)

    report_violations(missing_functions, "\nFunctions missing in readme.md:")

    sys.exit(1)

if __name__ == "__main__":
    main()
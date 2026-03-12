#!/usr/bin/env python3

import os
import re
import sys

def find_forbidden_lines(file_path, patterns):
    """Find all lines in a file that match any forbidden pattern."""
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            lines = f.readlines()
            matches = [line.strip() for line in lines if any(re.search(pattern, line) for pattern in patterns)]
            return matches
    except Exception as e:
        print(f"\033[91m Error reading {file_path}: {e} \033[0m")
        return []

def find_forbidden_imports(root_folder, patterns):
    """Recursively scan .tsx files for forbidden patterns and return matching lines."""
    violations = {}

    for folder_path, _, files in os.walk(root_folder):
        for file in files:
            if file.endswith(".tsx"):
                file_path = os.path.join(folder_path, file)
                print(file_path)
                forbidden_lines = find_forbidden_lines(file_path, patterns)
                if forbidden_lines:
                    violations[file_path] = forbidden_lines

    return violations

def scan_atoms():
    """Set rules for files inside atoms folder and returns a dictionary with errors"""
    forbidden_patterns = [
        r"import\s+.*\s+from\s+['\"]@/components/atoms/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]@/components/molecules/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]@/components/organisms/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]@/components/templates/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]\.\./[^'\"]+['\"]" 
    ]
    atoms_path = os.path.abspath("../components/atoms")
    return find_forbidden_imports(atoms_path, forbidden_patterns)

def scan_molecules():
    """Set rules for files inside molecules folder and returns a dictionary with errors"""
    forbidden_patterns = [
        r"import\s+.*\s+from\s+['\"]@/components/molecules/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]@/components/organisms/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]@/components/templates/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]@/components/[^'\"]+/[^'\"]+/components/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]\.\./\.\./atoms/[^'\"]+['\"]"
    ]
    atoms_path = os.path.abspath("../components/molecules")
    return find_forbidden_imports(atoms_path, forbidden_patterns)

def scan_organisms():
    """Set rules for files inside organisims folder and returns a dictionary with errors"""
    forbidden_patterns = [
        r"import\s+.*\s+from\s+['\"]@/components/organisms/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]@/components/templates/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]@/components/[^'\"]+/[^'\"]+/components/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]\.\./\.\./molecules/[^'\"]+['\"]",
        r"import\s+.*\s+from\s+['\"]\.\./\.\./atoms/[^'\"]+['\"]"
    ]
    atoms_path = os.path.abspath("../components/organisms")
    return find_forbidden_imports(atoms_path, forbidden_patterns)

def report_violations(violations, message):
    if violations:
        print("\033[91m" + message + "\033[0m")
        for file, lines in violations.items():
            print(f"\033[93mForbidden import found in:\033[0m {file}")
            for line in lines:
                print(f"  - {line}")

def main():
    print("Scanning...")
    atoms_violations = scan_atoms()
    molecules_violations = scan_molecules()
    organisms_violations = scan_organisms()
    if not atoms_violations and not molecules_violations and not organisms_violations:
      print("No forbidden patterns found.")
      sys.exit(0)

    report_violations(atoms_violations, "\nAtoms with forbidden imports found:")
    report_violations(molecules_violations, "\nMolecules with forbidden imports found:")
    report_violations(organisms_violations, "\nOrganisms with forbidden imports found:")
    sys.exit(1)

if __name__ == "__main__":
    main()
#!/usr/bin/env python3
import os
import re
import sys
import argparse

def get_resources_relative_paths():
  base_path = os.path.abspath("../public")
  resources_relative_paths = []
  for folder_path, _, files in os.walk(base_path):
    # Skip the public/awards folder since their are access dinamically
    if os.path.abspath(folder_path).startswith(os.path.join(base_path, "awards")):
      continue
    for file in files:
      if file.endswith('.w3x') or file.endswith('.xml') or file == 'robots.txt':
        continue
      full_path = os.path.join(folder_path, file)
      relative_path = os.path.relpath(full_path, base_path).replace(os.sep, "/")
      resources_relative_paths.append(relative_path)
  return resources_relative_paths

def find_matching_patterns(file_path, forbidden_substrings):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            lines = f.readlines()
            matches = set()
            for line in lines:
                for substr in forbidden_substrings:
                    pattern = re.escape(substr)
                    if re.search(pattern, line):
                        matches.add(substr)
            return list(matches)
    except Exception as e:
        print(f"\033[91m Error reading {file_path}: {e} \033[0m")
        return []

def find_imports(resources):
  mutable_resources = resources
  for folder_path, root, files in os.walk(os.path.abspath("..")):
    for file in files:
        if (file.endswith(".tsx") or file.endswith(".ts")) and "__test__" not in root:
          file_path = os.path.join(folder_path, file)
          matches = find_matching_patterns(file_path, mutable_resources)
          for match in matches:
            mutable_resources.remove(match)
  return mutable_resources

def deleteUnusedResources(resources):
  base_path = os.path.abspath("../public")
  for resource in resources:
    fixed_path = resource.replace("/", os.sep)
    full_path = os.path.join(base_path, fixed_path)
    if os.path.isfile(full_path):
      os.remove(full_path)

def main():
  print("Scanning")
  parser = argparse.ArgumentParser(description="Delete resources after finding them.")
  parser.add_argument("-d", action="store_true", help="Delete unused resources")

  resources = get_resources_relative_paths()
  unused_resources = find_imports(resources)
  if unused_resources:
    for unused_resource in unused_resources:
      print(f"Unused resource: {unused_resource}")
    args = parser.parse_args()
    if args.d:
      deleteUnusedResources(unused_resources)
    sys.exit("\033[91mUnused resources found \033[0m")
  else:
    print("No unused resources where found")
    sys.exit(0)

if __name__ == "__main__":
    main()
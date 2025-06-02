#!/usr/bin/env python3
import os
import re
import sys

def get_paths(directory):
  black_listed_folders = ["components", "atoms", "molecules", "icons", "organisms", "templates", "__tests__"]
  components_list = []
  for root, dirs, files in os.walk(directory):
    for name in dirs:
      if name not in black_listed_folders and not files:
        components_list.append(os.path.join(root, name))
  filtered_paths = replace_root_with_alias(components_list)
  filtered_paths = make_relative_if_needed(filtered_paths)
  print(filtered_paths)
  return filtered_paths

def replace_root_with_alias(path_lists):
  pattern = r"^.*?(?=\\components)"
  return [re.sub(pattern, "@", path, count=1) for path in path_lists]

def make_relative_if_needed(path_lists):
  pattern = r"^(.*?\\components\\.*?\\components\\)"
  return [re.sub(pattern, r"./components/", path, count=1) for path in path_lists]

def make_regex_for_paths(paths):
    regex_list = []
      
    for path in paths:
      escaped_path = path.replace("\\", "/")
      escaped_path = escaped_path.replace(".", r"\.")
      regex_pattern = rf"import\s+.*\s+from\s+['\"]{escaped_path}['\"]"
      regex_list.append(regex_pattern)
    return regex_list
  
  
def find_matching_patterns(file_path, patterns):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            lines = f.readlines()
            matches = []
            for line in lines:
              for pattern in patterns:
                if re.search(pattern, line):
                  matches.append(pattern)
                elif "./components" in pattern:
                  alternative_pattern = pattern.replace("./components", "..")
                  if re.search(alternative_pattern, line):
                    matches.append(pattern)
            return matches
    except Exception as e:
        print(f"\033[91m Error reading {file_path}: {e} \033[0m")
        return []

def find_imports(patterns, paths):
  mutable_patterns = patterns
  for folder_path, root, files in os.walk(os.path.abspath("..")):
    for file in files:
        if file.endswith(".tsx") and "__test__" not in root:
          file_path = os.path.join(folder_path, file)
          matches = find_matching_patterns(file_path, mutable_patterns)
          remaining_patterns = [pattern for pattern in mutable_patterns if pattern not in matches]
          mutable_patterns = remaining_patterns
  if mutable_patterns:
    for pattern in mutable_patterns:
      try:
        index = patterns.index(pattern)
        print(f"\033[91m Found unused component {paths[index]} \033[0m")
      except ValueError:
       print(f"Found unused component with regex: {pattern}")
  sys.exit(1)


def main():
  print("Scanning...")
  directory_path = os.path.abspath("../components")
  paths = get_paths(directory_path)
  regexs = make_regex_for_paths(paths)
  find_imports(regexs, paths)

if __name__ == "__main__":
    main()
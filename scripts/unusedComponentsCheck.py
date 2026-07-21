#!/usr/bin/env python3
import json
import os
import re
import sys

REPO_ROOT        = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DLS_SRC          = os.path.join(REPO_ROOT, "packages", "dls", "src")
DLS_PACKAGE_JSON = os.path.join(REPO_ROOT, "packages", "dls", "package.json")

def get_dls_package_name():
  with open(DLS_PACKAGE_JSON, "r") as f:
    return json.load(f)["name"]

IGNORED_PATHS = {
  "components/molecules/table/components/tableData/index.tsx",
  "components/molecules/table/components/tableData",
  "components/molecules/downloadModal",
}

def get_paths(directory):
  black_listed_folders = ["components", "atoms", "molecules", "icons", "organisms", "templates", "__tests__"]
  components_list = []
  for root, dirs, files in os.walk(directory):
    for name in dirs:
      if name not in black_listed_folders and not files:
        folder_path = os.path.join(root, name)
        normalized_folder_path = folder_path.replace("\\", "/")
        relative_folder_path = os.path.relpath(normalized_folder_path, REPO_ROOT).replace("\\", "/")
        index_file_path = f"{relative_folder_path}/index.tsx"

        if relative_folder_path in IGNORED_PATHS or index_file_path in IGNORED_PATHS:
          continue

        components_list.append(folder_path)
  filtered_paths = replace_root_with_alias(components_list)
  filtered_paths = make_relative_if_needed(filtered_paths)
  return filtered_paths

def replace_root_with_alias(path_lists):
  pattern = r"^.*?(?=(/|\\)components)"
  return [re.sub(pattern, "@", path, count=1) for path in path_lists]

def make_relative_if_needed(path_lists):
    normalized = [p.replace("\\", "/") for p in path_lists]
    pattern = r"^(.*?/components/.*/components/)"
    return [re.sub(pattern, "./components/", path, count=1) for path in normalized]

def make_regex_for_paths(paths, package_name):
    regex_list = []

    for path in paths:
      escaped_path = path.replace("\\", "/").replace(".", r"\.")
      quote = r"['\"]"
      static_pattern = r"import\s+.*\s+from\s+" + quote + escaped_path + quote
      dynamic_pattern = r"import\(" + quote + escaped_path + quote + r"\)"
      internal_pattern = f"({static_pattern}|{dynamic_pattern})"

      if path.startswith("@/"):
        # Also match package-name based imports used by apps (e.g., @rkr/dls/components/...)
        pkg_path = path.replace("@/", f"{package_name}/", 1).replace(".", r"\.")
        pkg_static = r"import\s+.*\s+from\s+" + quote + pkg_path + quote
        pkg_dynamic = r"import\(" + quote + pkg_path + quote + r"\)"
        pkg_pattern = f"({pkg_static}|{pkg_dynamic})"
        regex_list.append(f"({internal_pattern}|{pkg_pattern})")
      elif path.startswith("./components/"):
        # Nested sub-component — also match the full alias form:
        # e.g. @/components/<parent>/components/<name>
        component_name = path[len("./components/"):].replace(".", r"\.")
        alias_path = r"@/components/.+/components/" + component_name
        alias_static = r"import\s+.*\s+from\s+" + quote + alias_path + quote
        alias_dynamic = r"import\(" + quote + alias_path + quote + r"\)"
        alias_pattern = f"({alias_static}|{alias_dynamic})"
        regex_list.append(f"({internal_pattern}|{alias_pattern})")
      else:
        regex_list.append(internal_pattern)

    return regex_list
  
  
def find_matching_patterns(file_path, patterns):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            matches = []
            for pattern in patterns:
              if re.search(pattern, content, re.DOTALL):
                matches.append(pattern)
              elif "./components" in pattern:
                alternative_pattern = pattern.replace("./components", "..")
                if re.search(alternative_pattern, content, re.DOTALL):
                  matches.append(pattern)
            return matches
    except Exception as e:
        print(f"\033[91m Error reading {file_path}: {e} \033[0m")
        return []

def find_imports(patterns, paths):
  mutable_patterns = patterns
  for folder_path, root, files in os.walk(REPO_ROOT):
    for file in files:
        if (file.endswith(".tsx") or file.endswith(".ts")) and "__test__" not in root:
          file_path = os.path.join(folder_path, file)
          matches = find_matching_patterns(file_path, mutable_patterns)
          remaining_patterns = [pattern for pattern in mutable_patterns if pattern not in matches]
          mutable_patterns = remaining_patterns
  if mutable_patterns:
    for pattern in mutable_patterns:
      try:
        index = patterns.index(pattern)
        print(f"\033[91mFound unused component {paths[index]} \033[0m")
      except ValueError:
       print(f"Found unused component with regex: {pattern}")
    sys.exit("\033[91mUnused components found \033[0m")


def main():
  print("Scanning...")
  package_name = get_dls_package_name()
  directory_path = os.path.join(DLS_SRC, "components")
  paths = get_paths(directory_path)
  regexs = make_regex_for_paths(paths, package_name)
  find_imports(regexs, paths)

if __name__ == "__main__":
    main()
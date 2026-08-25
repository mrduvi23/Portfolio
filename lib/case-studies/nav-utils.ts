import type { CaseStudyNavItem } from "@/lib/case-studies/types";

export function flattenCaseStudyNavIds(items: CaseStudyNavItem[]): string[] {
  return items.flatMap((item) => [
    item.id,
    ...(item.children?.map((child) => child.id) ?? []),
  ]);
}

export function getCaseStudyNavChildIds(
  items: CaseStudyNavItem[],
  parentId: string,
): string[] {
  const parent = items.find((item) => item.id === parentId);
  return parent?.children?.map((child) => child.id) ?? [];
}

export function getExpandedNavParentId(
  items: CaseStudyNavItem[],
  activeId: string | null,
): string | null {
  if (!activeId) return null;

  for (const item of items) {
    if (!item.children?.length) continue;
    if (item.id === activeId) return item.id;
    if (item.children.some((child) => child.id === activeId)) return item.id;
  }

  return null;
}

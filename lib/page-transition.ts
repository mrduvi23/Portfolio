type NavigateFn = (href: string) => Promise<void>;

let navigateFn: NavigateFn | null = null;

export function registerPageTransition(fn: NavigateFn) {
  navigateFn = fn;
}

export function unregisterPageTransition() {
  navigateFn = null;
}

export async function navigateWithPageTransition(href: string): Promise<void> {
  if (navigateFn) {
    await navigateFn(href);
    return;
  }
  window.location.assign(href);
}

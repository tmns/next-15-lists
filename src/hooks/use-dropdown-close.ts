import { useEffect, useRef } from "react";

interface Params {
  /**
   * Whether the dialog is open.
   */
  open: boolean;
  closeDropdown: () => void;
}

/**
 * Ensures Radix dropdown closes when a Radix dialog opened from within it closes,
 * That is, when `open` goes from `true` to `false`.
 */
export function useDropdownClose({ open, closeDropdown }: Params) {
  const lastOpenRef = useRef(open);

  useEffect(() => {
    // If the dialog was open and is now closed, close the dropdown as well.
    if (lastOpenRef.current && !open) {
      closeDropdown();
    }

    lastOpenRef.current = open;
  }, [open, closeDropdown]);
}

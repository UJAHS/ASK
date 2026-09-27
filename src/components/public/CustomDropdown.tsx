"use client";

import {
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

export type CustomDropdownOption = {
  value: string;
  label: string;
};

type CustomDropdownProps = {
  id: string;
  value: string;
  options: CustomDropdownOption[];
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export default function CustomDropdown({
  id,
  value,
  options,
  placeholder,
  disabled = false,
  onChange,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] =
    useState(-1);

  const searchBufferRef = useRef("");
  const searchTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedIndex = options.findIndex(
    (option) => option.value === value
  );

  const selected = options.find(
    (option) => option.value === value
  );

  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  useEffect(() => {
    if (!open) {
      setHighlightedIndex(-1);
      return;
    }

    setHighlightedIndex(
      selectedIndex >= 0 ? selectedIndex : 0
    );

    const handleOutsideClick = () => {
      setOpen(false);
    };

    document.addEventListener(
      "click",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleOutsideClick
      );
    };
  }, [open, selectedIndex]);

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  const selectOption = (index: number) => {
    const option = options[index];

    if (!option) {
      return;
    }

    onChange(option.value);
    setHighlightedIndex(index);
    setOpen(false);
  };

  const handleKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>
  ) => {
    if (disabled || options.length === 0) {
      return;
    }

    const key = event.key;

    /*
     * ALPHABETICAL TYPE-AHEAD
     *
     * Examples:
     * A       -> first option starting with A
     * G       -> first option starting with G
     * Gu      -> Gujarat / matching option
     * Uni     -> United...
     *
     * Repeated letters within a short period are also
     * supported.
     */
    if (
      key.length === 1 &&
      /^[a-zA-Z]$/.test(key)
    ) {
      event.preventDefault();

      const nowBuffer =
        searchBufferRef.current + key.toLowerCase();

      searchBufferRef.current = nowBuffer;

      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }

      searchTimerRef.current = setTimeout(() => {
        searchBufferRef.current = "";
      }, 700);

      const normalizedSearch =
        nowBuffer.trim().toLowerCase();

      /*
       * First search using the complete typed text.
       */
      let matchIndex = options.findIndex((option) =>
        option.label
          .trim()
          .toLowerCase()
          .startsWith(normalizedSearch)
      );

      /*
       * If "gg" or another repeated sequence doesn't match,
       * fall back to the last typed character.
       */
      if (matchIndex < 0) {
        const lastCharacter =
          key.toLowerCase();

        matchIndex = options.findIndex((option) =>
          option.label
            .trim()
            .toLowerCase()
            .startsWith(lastCharacter)
        );

        searchBufferRef.current = lastCharacter;
      }

      if (matchIndex >= 0) {
        setHighlightedIndex(matchIndex);

        /*
         * When the dropdown is closed, typing a letter
         * should open it and highlight the matching item.
         */
        if (!open) {
          setOpen(true);
        }

        requestAnimationFrame(() => {
          const element = document.querySelector(
            `[data-custom-dropdown-option-index="${matchIndex}"]`
          );

          element?.scrollIntoView({
            block: "nearest",
          });
        });
      }

      return;
    }

    /*
     * BACKSPACE clears the current type-ahead buffer.
     */
    if (key === "Backspace") {
      event.preventDefault();

      searchBufferRef.current =
        searchBufferRef.current.slice(0, -1);

      return;
    }

    /*
     * ESC closes the dropdown.
     */
    if (key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }

    /*
     * ENTER selects highlighted option.
     */
    if (key === "Enter") {
      event.preventDefault();

      if (open && highlightedIndex >= 0) {
        selectOption(highlightedIndex);
      } else {
        setOpen(true);
      }

      return;
    }

    /*
     * ARROW DOWN
     */
    if (key === "ArrowDown") {
      event.preventDefault();

      if (!open) {
        setOpen(true);
        setHighlightedIndex(
          selectedIndex >= 0 ? selectedIndex : 0
        );
        return;
      }

      setHighlightedIndex((current) => {
        const next =
          current < options.length - 1
            ? current + 1
            : 0;

        return next;
      });

      return;
    }

    /*
     * ARROW UP
     */
    if (key === "ArrowUp") {
      event.preventDefault();

      if (!open) {
        setOpen(true);
        setHighlightedIndex(
          selectedIndex >= 0
            ? selectedIndex
            : options.length - 1
        );
        return;
      }

      setHighlightedIndex((current) => {
        const next =
          current > 0
            ? current - 1
            : options.length - 1;

        return next;
      });

      return;
    }

    /*
     * HOME -> first option
     */
    if (key === "Home") {
      event.preventDefault();

      if (!open) {
        setOpen(true);
      }

      setHighlightedIndex(0);
      return;
    }

    /*
     * END -> last option
     */
    if (key === "End") {
      event.preventDefault();

      if (!open) {
        setOpen(true);
      }

      setHighlightedIndex(options.length - 1);
    }
  };

  return (
    <div
      data-custom-dropdown="true"
      className="relative w-full"
      onClick={(event) =>
        event.stopPropagation()
      }
    >
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() =>
          setOpen((current) => !current)
        }
        onKeyDown={handleKeyboard}
        className={[
          "custom-location-dropdown-trigger",
          "flex w-full items-center justify-between",
          "rounded-lg border px-4 py-3 text-left",
          "outline-none transition-all",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={
            selected
              ? "custom-location-dropdown-value"
              : "custom-location-dropdown-placeholder"
          }
        >
          {selected?.label || placeholder}
        </span>

        <svg
          className={[
            "h-5 w-5 shrink-0 transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 011.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && !disabled && (
        <div
          className="custom-location-dropdown-panel absolute left-0 right-0 z-[300] mt-1 max-h-64 overflow-y-auto rounded-lg border p-1"
          role="listbox"
        >
          {options.length === 0 ? (
            <div className="custom-location-dropdown-empty px-3 py-2 text-sm">
              No options available
            </div>
          ) : (
            options.map((option, index) => {
              const selectedOption =
                option.value === value;

              const highlighted =
                index === highlightedIndex;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selectedOption}
                  data-custom-dropdown-option-index={
                    index
                  }
                  onMouseEnter={() =>
                    setHighlightedIndex(index)
                  }
                  onClick={() =>
                    selectOption(index)
                  }
                  className={[
                    "custom-location-dropdown-option",
                    "block w-full rounded-md px-3 py-2",
                    "text-left text-sm transition-colors",
                    highlighted
                      ? "is-keyboard-highlighted"
                      : "",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
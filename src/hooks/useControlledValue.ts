import { useState, useCallback } from "react";

/**
 * Options for the useControlledValue hook
 * @template T - The type of the value being managed
 */
interface ControlledValueOptions<T> {
  value?: T; // Controlled value from props (optional)
  defaultValue: T; // Fallback value when value is undefined
  onChange?: (value: T) => void; // Callback to handle value changes
}

/**
 * A custom hook to manage a value that can be controlled externally via props
 * or handled internally with a default value.
 *
 * @template T - The type of the value being managed
 * @param {ControlledValueOptions<T>} options - Configuration object with value and defaultValue
 * @returns {[T, (newValue: T) => void]} - A tuple containing the current value and a setter function
 */
export function useControlledValue<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: ControlledValueOptions<T>): [T, (newValue: T) => void] {
  // Determine if the value is controlled externally
  const isControlled = controlledValue !== undefined;

  // Initialize internal state with controlledValue or defaultValue
  const [internalValue, setInternalValue] = useState<T>(
    isControlled ? controlledValue : defaultValue
  );

  // Memoized setter function to update the value only if uncontrolled
  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    },
    [isControlled, onChange] // Dependency: re-create only if control status changes
  );

  // Use controlledValue if provided, otherwise fall back to internalValue
  const currentValue = isControlled ? controlledValue : internalValue;

  return [currentValue, setValue];
}

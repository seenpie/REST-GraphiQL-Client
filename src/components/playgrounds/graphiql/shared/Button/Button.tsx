type SendButtonProps = {
  label: string;
  isLoading: boolean;
  isAvailable: boolean;
  callback: () => void;
};

export function Button({
  callback,
  isLoading,
  isAvailable,
  label
}: SendButtonProps) {
  const handleClick = () => {
    callback();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading || !isAvailable}
    >
      {label}
    </button>
  );
}

export function HourButton({ time, busy, past, selected, onClick }) {
  return (
    <button
      onClick={() => onClick(time)}
      className={`px-3 py-2 rounded-md border  ${
        busy
          ? "bg-red-200 text-red-800 cursor-not-allowed"
          : past
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : selected
              ? "bg-[#d7ff00] text-black "
              : "bg-white hover:bg-blue-950 hover:text-white"
      }`}
      disabled={busy || past}
    >
      {time}
    </button>
  );
}
